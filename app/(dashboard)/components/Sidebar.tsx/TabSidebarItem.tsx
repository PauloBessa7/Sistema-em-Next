"use client";
import Link from "next/link";
import { useSidebar } from "./SidebarToggle";
import { usePathname } from "next/navigation";

interface TabSidebarItemProps {
  text: string;
  href: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export function TabSidebarItem({ text, href, icon, onClick }: TabSidebarItemProps) {
  const { sideOpen } = useSidebar();
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} onClick={onClick}>
      <li
        className={`flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-700 transition-all duration-200 mt-2 ${
          isActive ? "bg-gray-800 font-bold" : ""
        } ${sideOpen ? "gap-3" : "justify-center"}`}
      >
        <span className="w-5 h-5">
          {icon}
        </span>
        {sideOpen && <span className="truncate">{text}</span>}
      </li>
    </Link>
  );
}
