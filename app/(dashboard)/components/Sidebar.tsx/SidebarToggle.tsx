"use client";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
  sideOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
}

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [sideOpen, setSideOpen] = useState(true);

  const toggleSidebar = () => {
    setSideOpen(!sideOpen);
  };

  return (
    <SidebarContext.Provider value={{ sideOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function SidebarToggleButton() {
  const { sideOpen, toggleSidebar } = useSidebar();

  return sideOpen ? (
    <ArrowBigLeft onClick={toggleSidebar} className="cursor-pointer hover:text-gray-400 transition-colors shrink-0" size={24} />
  ) : (
    <ArrowBigRight onClick={toggleSidebar} className="cursor-pointer hover:text-gray-400 transition-colors mx-auto shrink-0" size={24} />
  );
}

export function SidebarTitle({ title }: { title: string }) {
  const { sideOpen } = useSidebar();

  return sideOpen ? <h2 className="text-xl font-bold">{title}</h2> : null;
}

export function SidebarContainer({ children }: { children: ReactNode }) {
  const { sideOpen } = useSidebar();

  return (
    <div className={`min-h-screen p-5 bg-gray-900 text-white transition-all duration-300 shrink-0 ${sideOpen ? 'w-54' : 'w-20'}`}>
      {children}
    </div>
  );
}
