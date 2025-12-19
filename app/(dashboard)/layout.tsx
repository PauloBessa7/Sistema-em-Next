import "../globals.css";
import SidebarWrapper from "./components/Sidebar.tsx/SidebarWrapper";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session) {
    redirect("/auth") // Se não estiver logado, manda para o login
  }

  return (
    <div className="flex min-h-screen">
      <SidebarWrapper />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
