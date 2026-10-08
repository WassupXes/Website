import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-ink pt-20 text-white">
      <div className="container-x">
        <p className="font-mono text-lime">404</p>
        <h1 className="h-display mt-4 text-5xl sm:text-7xl">Halaman tidak ditemukan.</h1>
        <p className="mt-4 text-white/60">Page not found — sapi ini mungkin keluar geofence. 🐄</p>
        <Link href="/" className="btn-lime mt-8">Kembali ke beranda</Link>
      </div>
    </section>
  );
}
