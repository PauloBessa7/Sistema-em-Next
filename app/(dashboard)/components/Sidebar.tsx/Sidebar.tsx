"use client";
import { useState } from "react";
import TabSidebar from "../TabsSidebar.tsx/TabSidebar";
import { ArrowBigLeft, ArrowBigRight, LayoutDashboard, LogOut, Settings, User } from "lucide-react";

interface SidebarProps {
  userRole?: string;
  userSetor?: string;
}

export default function Sidebar({ userRole, userSetor }: SidebarProps) {
  const [sideOpen, setSideOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");

  function toggleSidebar() {
    setSideOpen(!sideOpen);
  }

  function handleTabClick(tab: string) {
    setActiveTab(tab);
  }
  return (
    <div className={`min-h-screen p-5 bg-gray-900 text-white transition-all duration-300 shrink-0 ${sideOpen ? 'w-54' : 'w-20'}`}>
    <div className="flex items-center justify-between mb-6">
      {sideOpen && <h2 className="text-xl font-bold">Sistema</h2>}
      {sideOpen ? (
        <ArrowBigLeft onClick={toggleSidebar} className="cursor-pointer hover:text-gray-400 transition-colors shrink-0" size={24} />
      ) : (
        <ArrowBigRight onClick={toggleSidebar} className="cursor-pointer hover:text-gray-400 transition-colors mx-auto shrink-0" size={24} />
      )}
    </div>
    <ul className="space-y-2">
      <TabSidebar text="Dashboard" href="/dashboard" icon={<LayoutDashboard />} active={activeTab === "Dashboard"} setActiveTab={handleTabClick} isOpenSidebar={sideOpen} />
      <TabSidebar text="Profile" href="/profile" icon={<User />} active={activeTab === "Profile"} setActiveTab={handleTabClick} isOpenSidebar={sideOpen} />
      <TabSidebar text="Settings" href="#" icon={<Settings />} active={activeTab === "Settings"} setActiveTab={handleTabClick} isOpenSidebar={sideOpen} />
      {userRole === 'ADMIN' && (
        <TabSidebar text="Admin" href="/admin" icon={<Settings />} active={activeTab === "Admin"} setActiveTab={handleTabClick} isOpenSidebar={sideOpen} />
      )}
      <TabSidebar text="Logout" href="#" icon={<LogOut />} active={activeTab === "Logout"} setActiveTab={handleTabClick} isOpenSidebar={sideOpen} />
    </ul>
    </div>
  );
}
