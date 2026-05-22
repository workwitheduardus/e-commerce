export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6 space-x-2">
      <div className="border-b border-zinc-200 pb-4">
        <h1 className="text-2xl font-semibold">Produk</h1>
        <p>Daftar Product diambil dari fakestore API</p>
      </div>
      {children}
    </div>
  );
}
