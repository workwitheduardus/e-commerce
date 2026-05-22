import { queryOptions } from "@tanstack/react-query";
import { getProducts } from "./api";

export function productsQuery(limit?: number) {
  return queryOptions({
    queryKey: ["products", { limit: limit ?? null }],
    queryFn: () => getProducts(limit),
  });
}
