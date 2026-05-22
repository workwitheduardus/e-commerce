import Link from "next/link";
import { CartBadge } from "./CartBadge";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
  { href: "/catalog", label: "Catalog" },
];
export function Navbar() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-5xl px-4 py-3 items-center justify-between">
        <Link className="text-lg font-semibold" href="/">
          HenryPedia
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-zinc-600 hover:text-black"
            >
              {l.label}
            </Link>
          ))}
          <CartBadge />
        </nav>
      </div>
    </header>
  );
}
