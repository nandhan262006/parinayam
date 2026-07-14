import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "../Sidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-[#f5f5f5]">{children}</main>
    </div>
  );
}
