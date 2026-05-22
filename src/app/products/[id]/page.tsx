//halaman per id products
import { AddToCartButton } from "@/components/AddToCartButton";
import { getProduct } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = { id: string };

//params adalah Promise, cara aksesnya dari props, kita harus await
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) notFound();

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-lg border border-zinc-200 bg-white">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-contain p-6 "
        />
      </div>

      <div className="space-y-4">
        <p className="text-xs uppercase tracking-wide text-zinc-500">
          {product.description}
        </p>
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p className="text-2xl font-bold">{formatPrice(product.price)}</p>
        <p className="text-sm text-zinc-600">
          ⭐ {product.rating.rate} {product.rating.count} ulasan
        </p>
        <p className="leading-relaxed text-zinc-700">{product.description}</p>

        <AddToCartButton product={product} />
        <div>
          <Link href="/products">Kembali</Link>
        </div>
      </div>
    </div>
  );
}
