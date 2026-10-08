#!/usr/bin/env bash
# Ternakin.ai one-shot VPS installer (idempotent). Run as root:
#   curl -fsSL https://raw.githubusercontent.com/WassupXes/Website/claude/amazing-hopper-u1rz7c/deploy/vps-install.sh | bash
# Leaves existing sites/containers alone: app on 127.0.0.1:3010, public on :8080.
set -euo pipefail

REPO="https://github.com/WassupXes/Website.git"
BRANCH="${BRANCH:-claude/amazing-hopper-u1rz7c}"
DIR="/opt/ternakin"
APP_PORT=3010
PUBLIC_PORT=8080

log() { printf '\n\033[1;32m==> %s\033[0m\n' "$*"; }
die() { printf '\n\033[1;31mERROR: %s\033[0m\n' "$*"; exit 1; }

[ "$(id -u)" -eq 0 ] || die "run as root"

log "Pre-flight"
. /etc/os-release 2>/dev/null && echo "OS: ${PRETTY_NAME:-unknown}"
echo "RAM: $(free -m | awk '/Mem:/{print $2" MB total, "$7" MB available"}')"
echo "Disk: $(df -h / | awk 'NR==2{print $4" free of "$2}')"
command -v ss >/dev/null && { echo "Listening ports:"; ss -ltnp | awk 'NR>1{print "  "$4"  "$6}' | sort -u; }
port_owner() { ss -ltnp 2>/dev/null | grep -E "[:.]$1 " || true; }
if [ -n "$(port_owner $APP_PORT)" ] && ! docker ps --format '{{.Names}}' 2>/dev/null | grep -qx ternakin-web; then
  die "port $APP_PORT already used by another service"
fi

log "Packages"
export DEBIAN_FRONTEND=noninteractive
command -v git >/dev/null || { apt-get update -qq && apt-get install -y -qq git; }
command -v curl >/dev/null || apt-get install -y -qq curl
if ! command -v docker >/dev/null; then
  echo "Installing Docker…"; curl -fsSL https://get.docker.com | sh
fi
docker compose version >/dev/null 2>&1 || apt-get install -y -qq docker-compose-plugin
systemctl enable --now docker >/dev/null 2>&1 || true

# Small VPS: make sure the Next.js build has memory headroom.
MEM_MB=$(free -m | awk '/Mem:/{print $2}')
if [ "$MEM_MB" -lt 2000 ] && ! swapon --show | grep -q .; then
  log "Adding 2G swap (RAM ${MEM_MB}MB)"
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
  grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

log "Code → $DIR ($BRANCH)"
if [ -d "$DIR/.git" ]; then
  git -C "$DIR" fetch -q origin "$BRANCH" && git -C "$DIR" checkout -q "$BRANCH" && git -C "$DIR" reset -q --hard "origin/$BRANCH"
else
  git clone -q --branch "$BRANCH" "$REPO" "$DIR"
fi
cd "$DIR"
[ -f .env ] || { cp .env.example .env; sed -i "s#^NEXT_PUBLIC_SITE_URL=.*#NEXT_PUBLIC_SITE_URL=http://$(curl -fsS4 ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}'):$PUBLIC_PORT#" .env; }

log "Build & run container (first build ~3–6 min)"
docker compose up -d --build
docker image prune -f >/dev/null

log "Wait for app"
for i in $(seq 1 30); do
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:$APP_PORT/id" || true)
  [ "$code" = "200" ] && break; sleep 2
done
[ "$code" = "200" ] || { docker compose logs --tail=50; die "app not healthy (HTTP $code)"; }
echo "app: HTTP 200 on 127.0.0.1:$APP_PORT"

log "nginx on :$PUBLIC_PORT"
command -v nginx >/dev/null || { apt-get update -qq && apt-get install -y -qq nginx; }
if [ -n "$(port_owner $PUBLIC_PORT | grep -v nginx)" ]; then die "port $PUBLIC_PORT used by a non-nginx service"; fi
CONF_DIR=/etc/nginx/sites-available; [ -d "$CONF_DIR" ] || CONF_DIR=/etc/nginx/conf.d
TARGET="$CONF_DIR/ternakin-ip.conf"
cp deploy/nginx-ip.conf "$TARGET"
[ -d /etc/nginx/sites-enabled ] && [ "$CONF_DIR" = /etc/nginx/sites-available ] && ln -sf "$TARGET" /etc/nginx/sites-enabled/ternakin-ip.conf
if ! nginx -t 2>/tmp/ternakin-nginx.err; then
  rm -f "$TARGET" /etc/nginx/sites-enabled/ternakin-ip.conf
  cat /tmp/ternakin-nginx.err; die "nginx config test failed — reverted, other sites untouched"
fi
systemctl reload nginx 2>/dev/null || systemctl restart nginx

if command -v ufw >/dev/null && ufw status | grep -q "Status: active"; then ufw allow $PUBLIC_PORT/tcp >/dev/null && echo "ufw: opened $PUBLIC_PORT"; fi

code=$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:$PUBLIC_PORT/id" || true)
IP=$(curl -fsS4 ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')
log "Done — nginx:$PUBLIC_PORT → HTTP $code"
echo "Open: http://$IP:$PUBLIC_PORT/id  (EN: /en)"
echo "Update later: re-run this same command."
echo "If it doesn't load from outside, open TCP $PUBLIC_PORT in the Nevacloud firewall/security group."
