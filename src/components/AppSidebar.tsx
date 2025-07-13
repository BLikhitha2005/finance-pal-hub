
import { useState } from "react"
import { 
  BarChart3, 
  CreditCard, 
  Target, 
  PieChart, 
  FileText,
  Home,
  Settings,
  Moon,
  Sun
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Transactions", url: "/transactions", icon: CreditCard },
  { title: "Budget Planner", url: "/budget", icon: BarChart3 },
  { title: "Savings Goals", url: "/savings", icon: Target },
  { title: "Reports", url: "/reports", icon: FileText },
]

interface AppSidebarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export function AppSidebar({ isDark, toggleTheme }: AppSidebarProps) {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-muted/50"

  const isCollapsed = state === "collapsed"

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarHeader className="p-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <PieChart className="h-8 w-8 text-primary" />
            <div>
              <h2 className="text-lg font-bold">FinanceTracker</h2>
              <p className="text-xs text-muted-foreground">Personal Finance</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <PieChart className="h-8 w-8 text-primary mx-auto" />
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-full"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {!isCollapsed && <span className="ml-2">{isDark ? "Light" : "Dark"}</span>}
          </Button>
        </div>
        {!isCollapsed && (
          <div className="mt-2">
            <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
              <NavLink to="/settings">
                <Settings className="h-4 w-4" />
                <span className="ml-2">Settings</span>
              </NavLink>
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
