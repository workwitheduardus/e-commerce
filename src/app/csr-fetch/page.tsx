"use client";

import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CsrProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Product[]>("https://fakestoreapi.com/products?limit=4")
      .then((res) => {
        setProducts(res.data);
        setFetchedAt(new Date().toLocaleTimeString());
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-2">
        {/* Skeleton — hanya tampil pada versi CSR karena SSR tidak punya fase loading di klien. */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-md bg-zinc-100" />
        ))}
        <p className="text-xs text-zinc-500">
          Memuat di browser… (perhatikan tab Network)
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <ul className="divide-y divide-zinc-200 rounded-md border border-zinc-200 bg-white">
        {products.map((p) => (
          <li key={p.id} className="flex items-center gap-3 p-2">
            <div className="relative h-12 w-12 shrink-0">
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>
            <p className="min-w-0 flex-1 truncate text-sm">{p.title}</p>
            <p className="text-sm font-semibold">{formatPrice(p.price)}</p>
          </li>
        ))}
      </ul>
      <p className="text-xs text-zinc-500">
        Fetched di <strong>browser</strong> pada {fetchedAt}
      </p>
    </div>
  );
}
