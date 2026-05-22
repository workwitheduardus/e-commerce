import { productsQuery } from "@/lib/queries";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { CatalogClient } from "./CatalogClient";

export default async function CatalogPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(productsQuery());
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Catalog Produk</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Data di prefetch di server, lalu di hydrate ke react query di browser.
          HTML awalnya udah berisi produk, tapi karena ada interaksi tetap jalan
          di client
        </p>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <CatalogClient />
      </HydrationBoundary>
    </div>
  );
}
