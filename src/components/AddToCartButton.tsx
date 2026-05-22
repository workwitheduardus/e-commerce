"use client";

import { Product } from "@/lib/types";
import { useCart } from "./CartProvider";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  return (
    <button
      className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
      onClick={() =>
        addItem({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        })
      }
    >
      + Tambah ke Cart
    </button>
  );
}
