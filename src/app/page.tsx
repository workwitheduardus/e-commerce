import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await getProducts(8);

  return (
    <div className="space-y-10">
      <section className="rounded-xl border border-zinc-200 bg-white p-8">
        <h1 className="text-3xl font-semibold tracking-tight">Library Shop</h1>
        <p className="mt-2 max-w-xl text-zinc-600">
          Proyek demo untuk belajar Next.js App Router: routing, server vs
          client component, next/image, next/link, serta metadata SEO.
        </p>
        <div className="mt-4 flex gap-3 text-sm">
          <Link
            href="/products"
            className="rounded-md bg-black px-4 py-2 text-white hover:bg-zinc-800"
          >
            Lihat semua produk
          </Link>
          <Link
            href="/categories"
            className="rounded-md border border-zinc-300 px-4 py-2 hover:bg-zinc-100"
          >
            Telusuri kategori
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-semibold">Produk Pilihan</h2>
          <Link href="/products" className="text-sm underline">
            Selengkapnya →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
