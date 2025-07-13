
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
import { Textarea } from "@/components/ui/textarea"
import { Plus, Target, Edit, Trash2, Calendar, DollarSign } from "lucide-react"

const savingsGoals = [
  {
    id: 1,
    name: "Emergency Fund",
    target: 10000,
    current: 6500,
    deadline: "2024-12-31",
    description: "6 months of living expenses",
    priority: "high"
  },
  {
    id: 2,
    name: "Vacation to Europe",
    target: 3500,
    current: 1200,
    deadline: "2024-09-15",
    description: "2-week trip to Europe",
    priority: "medium"
  },
  {
    id: 3,
    name: "New Laptop",
    target: 2000,
    current: 1800,
    deadline: "2024-08-01",
    description: "MacBook Pro for work",
    priority: "high"
  },
  {
    id: 4,
    name: "Car Down Payment",
    target: 5000,
    current: 2300,
    deadline: "2025-03-01",
    description: "Down payment for new car",
    priority: "medium"
  },
  {
    id: 5,
    name: "Investment Fund",
    target: 15000,
    current: 8500,
    deadline: "2025-06-01",
    description: "Stock market investments",
    priority: "low"
  }
]

export function SavingsGoals() {
  const [goals, setGoals] = useState(savingsGoals)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const totalTargets = goals.reduce((sum, goal) => sum + goal.target, 0)
  const totalSaved = goals.reduce((sum, goal) => sum + goal.current, 0)
  const overallProgress = (totalSaved / totalTargets) * 100

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-500"
    if (percentage >= 50) return "bg-blue-500"
    return "bg-orange-500"
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Savings Goals</h1>
          <p className="text-muted-foreground">Track your progress towards financial goals.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Savings Goal</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="goal-name" className="text-right">Name</Label>
                <Input id="goal-name" placeholder="Goal name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="target-amount" className="text-right">Target</Label>
                <Input id="target-amount" type="number" placeholder="0.00" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="current-amount" className="text-right">Current</Label>
                <Input id="current-amount" type="number" placeholder="0.00" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deadline" className="text-right">Deadline</Label>
                <Input id="deadline" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea id="description" placeholder="Goal description" className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Add Goal</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Goals</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goals.length}</div>
            <p className="text-xs text-muted-foreground">Active savings goals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Target</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalTargets.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Combined goal amount</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalSaved.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{overallProgress.toFixed(1)}% of total goals</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total Progress</span>
              <span>{overallProgress.toFixed(1)}%</span>
            </div>
            <Progress value={overallProgress} className="h-4" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>${totalSaved.toLocaleString()} saved</span>
              <span>${(totalTargets - totalSaved).toLocaleString()} remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const percentage = (goal.current / goal.target) * 100
          const remaining = goal.target - goal.current
          const daysLeft = getDaysUntilDeadline(goal.deadline)

          return (
            <Card key={goal.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg">{goal.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(goal.priority)}>
                    {goal.priority}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-green-600">${goal.current.toLocaleString()}</span>
                  <span className="text-muted-foreground">/ ${goal.target.toLocaleString()}</span>
                </div>
                
                <div className="space-y-2">
                  <Progress value={Math.min(percentage, 100)} className="h-3" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{percentage.toFixed(1)}% complete</span>
                    <span>${remaining.toLocaleString()} remaining</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{goal.deadline}</span>
                  </div>
                  <div className="text-sm">
                    {daysLeft > 0 ? (
                      <span className={daysLeft < 30 ? "text-red-600" : "text-muted-foreground"}>
                        {daysLeft} days left
                      </span>
                    ) : (
                      <span className="text-red-600">Overdue</span>
                    )}
                  </div>
                </div>

                {percentage >= 100 && (
                  <Badge className="w-fit bg-green-100 text-green-800">
                    🎉 Goal Achieved!
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
