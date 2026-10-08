#!/usr/bin/env bash
# Run ON the VPS. First time:  git clone <repo> /opt/ternakin && cd /opt/ternakin && cp .env.example .env && nano .env
# Then every deploy:           cd /opt/ternakin && ./deploy/deploy.sh [branch]
set -euo pipefail
BRANCH="${1:-main}"
cd "$(dirname "$0")/.."
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"
docker compose up -d --build
docker image prune -f >/dev/null
sleep 3
curl -fsS -o /dev/null -w "health: %{http_code}\n" http://127.0.0.1:3010/id
