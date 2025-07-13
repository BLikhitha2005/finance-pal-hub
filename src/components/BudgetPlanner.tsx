
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Edit, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react"

const budgetCategories = [
  { id: 1, name: "Housing", budgeted: 1200, spent: 1200, color: "bg-blue-500" },
  { id: 2, name: "Food", budgeted: 600, spent: 485, color: "bg-green-500" },
  { id: 3, name: "Transport", budgeted: 300, spent: 245, color: "bg-yellow-500" },
  { id: 4, name: "Entertainment", budgeted: 200, spent: 175, color: "bg-purple-500" },
  { id: 5, name: "Utilities", budgeted: 150, spent: 125, color: "bg-orange-500" },
  { id: 6, name: "Shopping", budgeted: 250, spent: 320, color: "bg-pink-500" },
  { id: 7, name: "Health", budgeted: 100, spent: 65, color: "bg-red-500" },
  { id: 8, name: "Savings", budgeted: 800, spent: 800, color: "bg-emerald-500" },
]

export function BudgetPlanner() {
  const [budgets, setBudgets] = useState(budgetCategories)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.budgeted, 0)
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0)
  const totalRemaining = totalBudgeted - totalSpent

  const getBudgetStatus = (budgeted: number, spent: number) => {
    const percentage = (spent / budgeted) * 100
    if (percentage >= 100) return { status: "over", color: "text-red-600", icon: AlertTriangle }
    if (percentage >= 80) return { status: "warning", color: "text-yellow-600", icon: AlertTriangle }
    return { status: "good", color: "text-green-600", icon: CheckCircle }
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return "bg-red-500"
    if (percentage >= 80) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Budget Planner</h1>
          <p className="text-muted-foreground">Set and track your monthly spending budgets.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Budget
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Budget Category</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Input id="category" placeholder="Category name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="budget-amount" className="text-right">Budget</Label>
                <Input id="budget-amount" type="number" placeholder="0.00" className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Add Budget</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Budget Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budgeted</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudgeted.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Monthly budget</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{((totalSpent / totalBudgeted) * 100).toFixed(1)}% of budget</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalRemaining.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Available to spend</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{budgets.length}</div>
            <p className="text-xs text-muted-foreground">Budget categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.budgeted) * 100
          const status = getBudgetStatus(budget.budgeted, budget.spent)
          const StatusIcon = status.icon

          return (
            <Card key={budget.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded ${budget.color}`} />
                  <CardTitle className="text-lg">{budget.name}</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <StatusIcon className={`w-4 h-4 ${status.color}`} />
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Spent: ${budget.spent.toFixed(2)}</span>
                  <span>Budget: ${budget.budgeted.toFixed(2)}</span>
                </div>
                <div className="space-y-2">
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className="h-3"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{percentage.toFixed(1)}% used</span>
                    <span>${(budget.budgeted - budget.spent).toFixed(2)} remaining</span>
                  </div>
                </div>
                {percentage > 100 && (
                  <Badge variant="destructive" className="w-fit">
                    Over budget by ${(budget.spent - budget.budgeted).toFixed(2)}
                  </Badge>
                )}
                {percentage >= 80 && percentage < 100 && (
                  <Badge variant="secondary" className="w-fit bg-yellow-100 text-yellow-800">
                    {(100 - percentage).toFixed(1)}% remaining
                  </Badge>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
