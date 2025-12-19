import "../globals.css";
import Sidebar from "./components/Sidebar.tsx/Sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session) {
    redirect("/auth") // Se não estiver logado, manda para o login
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
