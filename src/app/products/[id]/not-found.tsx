import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center">
      <h2 className="text-xl font-semibold">Produk tidak ditemukan</h2>
      <Link
        className="bg-black px-4 py-2 rounded-md mt-4 inline-block text-white"
        href="/products"
      >
        Lihat semua Produk
      </Link>
    </div>
  );
}
