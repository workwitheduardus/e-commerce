import { ProductCard } from "@/components/ProductCard";
import { getProductsByCategory } from "@/lib/api";
import Link from "next/link";

type Params = { slug: string };
export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const name = decodeURIComponent(slug);

  const products = await getProductsByCategory(name);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold capitalize">{name}</h1>
        <Link className="text-sm underline" href="/categories">
          Semua Kategori
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-sm text-zinc-500">
          Tidak ada produk di kategori ini
        </p>
      ) : (
        <div className="grid grid-cols-2 gap sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
