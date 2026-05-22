"use client";

import { ProductCard } from "@/components/ProductCard";
import { productsQuery } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function CatalogClient() {
  const [keyword, setKeyword] = useState("");
  const {
    data: products,
    isPending,
    isError,
    error,
    isFetching,
    refetch,
    dataUpdatedAt,
  } = useQuery(productsQuery());

  if (isPending) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-64 animate-pulse rounded-lg bg-zinc-200" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-m text-red-700">
        <p className="font-semibold">gagal memuat produk</p>
        <p className="mt-1">{(error as Error).message}</p>
        <button
          className="mt-3 rounded-md bg-red-600 px-3 py-1.5 text-white hover:bg-red-700"
          onClick={() => refetch()}
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(keyword.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-zinc-200 bg-white p-3 text-sm">
        <input
          type="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Cari produk"
          className="min-w-0 flex-1 rounded-md border border-zinc-300 px-3 py-1.5"
        />
        <button className="rounded-md border border-zinc-300 px-3 py-1.5 hover:bg-zinc-100 disabled:opacity-50">
          {isFetching ? "Memuat ulang..." : "Refetch"}
        </button>
        <span className="text-xs text-zinc-500">
          {filtered.length} produk diperbarui
        </span>
        {new Date(dataUpdatedAt).toLocaleTimeString()}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-zinc-200 bg-white p-6 text-center text-sm text-zinc-500">
          tidak ada produk yang cocok dengan {keyword}.
        </p>
      ) : (
        <div className="grid grid-cols-2 gapt-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
