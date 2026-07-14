import Sidebar from "../Sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-[#f5f5f5]">{children}</main>
    </div>
  );
}
