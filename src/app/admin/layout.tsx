import { requireAuth } from "@/lib/auth";
import Sidebar from "./Sidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await requireAuth();
  } catch {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-[#f5f5f5] min-h-screen">{children}</main>
    </div>
  );
}
