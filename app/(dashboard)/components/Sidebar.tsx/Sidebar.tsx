import { CircleAlert, LayoutDashboard, Settings, User } from "lucide-react";
import { SidebarProvider, SidebarContainer, SidebarToggleButton, SidebarTitle } from "./SidebarToggle";
import { TabSidebarItem } from "./TabSidebarItem";
import { LogoutButton } from "./LogoutButton";
import AccessGate from "@/components/AcessGate/AccessGate";

export default function Sidebar() {
  return (
    <SidebarProvider>
      <SidebarContainer>
        <div className="flex items-center justify-between mb-6">
          <SidebarTitle title="Sistema" />
          <SidebarToggleButton />
        </div>
        <ul className="space-y-2">
          <TabSidebarItem text="Dashboard" href="/dashboard" icon={<LayoutDashboard />} />
          <TabSidebarItem text="Profile" href="/profile" icon={<User />} />
          <TabSidebarItem text="Settings" href="/settings" icon={<Settings />} />

          <AccessGate allowedRoles={["ADMIN"]} >
            <TabSidebarItem text="Admin" href="/admin" icon={<Settings />} />
          </AccessGate>

          <AccessGate featureKey="GENERATE_POSTS">
            <TabSidebarItem text="Generate Posts" href="/reports" icon={<CircleAlert />} />
          </AccessGate>

          <LogoutButton />
        </ul>
      </SidebarContainer>
    </SidebarProvider>
  );
}
