import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

export default async function Products() {
  const products = await getProducts();
  return (
    <div className="grid grid-cols-2 gap sm:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
