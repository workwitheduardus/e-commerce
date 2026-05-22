"use client";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, clear, totalQty, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center">
        <h1 className="text-xl font-semibold">Keranjang masih kosong</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Tambahkan produk dari halaman detail produk
        </p>

        <Link
          className="mt-4 inline-block rounded-md bg-black px-4 py-2 text-sm text-white"
          href="/products"
        >
          Lihat produk
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <h1 className="text-2xl font-semibold">Keranjang ({totalQty})</h1>
        <button
          className="text-sm text-red-600 hover:underline"
          onClick={clear}
        >
          Kosongkan Keranjang
        </button>
      </div>

      <ul className="divide-y divide-zinc-200 rounded-lg border border-zinc-200 bg-white">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-4 p-4">
            <div className="h-16 w-16 relative shrink-0">
              <Image
                fill
                alt={item.title}
                src={item.image}
                sizes="64px"
                className="object-contain"
              />
            </div>
            <div className="min-2-0 flex-1">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-zinc-500">
                {item.quantity} x {formatPrice(item.price)}
              </p>
            </div>

            <p>{formatPrice(item.price * item.quantity)}</p>

            <button
              className="text-xs text-red-600 hover:underline"
              onClick={() => removeItem(item.id)}
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4">
        <span className="text-sm text-zinc-600">Total</span>
        <span className="text-xl font-bold">{formatPrice(totalPrice)}</span>
      </div>
    </div>
  );
}
