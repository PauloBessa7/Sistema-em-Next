"use client";
import { signOut } from "next-auth/react";
import { TabSidebarItem } from "./TabSidebarItem";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  function handleLogout() {
    signOut({ callbackUrl: "/auth" });
  }

  return (
    <TabSidebarItem
      text="Logout"
      href="#"
      icon={<LogOut />}
      onClick={handleLogout}
    />
  );
}
