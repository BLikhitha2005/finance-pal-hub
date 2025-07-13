
import { useState, useEffect } from "react"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/AppSidebar"
import { Dashboard } from "./components/Dashboard"
import { Transactions } from "./components/Transactions"
import { BudgetPlanner } from "./components/BudgetPlanner"
import { SavingsGoals } from "./components/SavingsGoals"
import { Reports } from "./components/Reports"
import NotFound from "./pages/NotFound"

const queryClient = new QueryClient()

const App = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider collapsedWidth={56}>
            <div className="min-h-screen flex w-full bg-background">
              <AppSidebar isDark={isDark} toggleTheme={toggleTheme} />
              
              <div className="flex-1 flex flex-col">
                <header className="h-14 flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
                  <SidebarTrigger className="ml-4" />
                  <div className="flex-1 flex items-center justify-between px-4">
                    <div className="text-sm text-muted-foreground">
                      Personal Finance Tracker
                    </div>
                  </div>
                </header>

                <main className="flex-1 overflow-auto">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/budget" element={<BudgetPlanner />} />
                    <Route path="/savings" element={<SavingsGoals />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
