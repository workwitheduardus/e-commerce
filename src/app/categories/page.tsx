import { getCategories } from "@/lib/api";
import Link from "next/link";

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Kategori</h1>
      <ul className="grid gap-3 sm:grid-cols-2">
        {categories.map((c) => (
          <li key={c}>
            <Link
              className="block rounded-lg border border-zinc-200 bg-white p-4 capitalize hover:border-zinc-400"
              href={`/categories/${encodeURIComponent(c)}`}
            >
              {c}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
