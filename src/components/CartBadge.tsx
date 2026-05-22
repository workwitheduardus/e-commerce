"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export function CartBadge() {
  const { totalQty } = useCart();
  return (
    <Link href="/cart">
      Cart
      {totalQty > 0 && (
        <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-xs text-white">
          {totalQty}
        </span>
      )}
    </Link>
  );
}
