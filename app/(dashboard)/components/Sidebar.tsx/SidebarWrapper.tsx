import { auth } from "@/lib/auth";
import Sidebar from "./Sidebar";

export default async function SidebarWrapper() {
  const session = await auth();
  const user = session?.user as any;

  return <Sidebar userRole={user?.role} userSetor={user?.setor} />;
}
