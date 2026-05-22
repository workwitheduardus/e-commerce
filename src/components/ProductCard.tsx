import { formatPrice } from "@/lib/format";
import { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col rounded-lg border border-zinc-200 bg-white p-3 hover:border-zinc-400"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-zinc-50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-contain p-3 transition group-hover:scale-105"
        />
      </div>

      <div className="mt-3 flex flex-1 flex-col gap-1">
        <p className="text-xs text-zinc-500 capitalize">{product.category}</p>
        <h3 className="line-clamp-2 text-sm font-medium">{product.title}</h3>
        <p className="mt-auto font-semibold">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
