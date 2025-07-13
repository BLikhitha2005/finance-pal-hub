
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Filter, Download, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const allTransactions = [
  { id: 1, date: "2024-07-12", description: "Whole Foods Market", category: "Food", amount: -125.50, type: "expense" },
  { id: 2, date: "2024-07-12", description: "Coffee Shop", category: "Food", amount: -4.75, type: "expense" },
  { id: 3, date: "2024-07-11", description: "Monthly Salary", category: "Salary", amount: 4500.00, type: "income" },
  { id: 4, date: "2024-07-11", description: "Uber Ride", category: "Transport", amount: -18.50, type: "expense" },
  { id: 5, date: "2024-07-10", description: "Gas Station", category: "Transport", amount: -45.20, type: "expense" },
  { id: 6, date: "2024-07-10", description: "Amazon Purchase", category: "Shopping", amount: -89.99, type: "expense" },
  { id: 7, date: "2024-07-09", description: "Netflix Subscription", category: "Entertainment", amount: -15.99, type: "expense" },
  { id: 8, date: "2024-07-09", description: "Freelance Project", category: "Freelance", amount: 750.00, type: "income" },
  { id: 9, date: "2024-07-08", description: "Rent Payment", category: "Housing", amount: -1200.00, type: "expense" },
  { id: 10, date: "2024-07-08", description: "Electricity Bill", category: "Utilities", amount: -85.30, type: "expense" },
]

const categories = ["All", "Food", "Transport", "Housing", "Utilities", "Entertainment", "Shopping", "Salary", "Freelance"]

export function Transactions() {
  const [transactions, setTransactions] = useState(allTransactions)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<any>(null)
  const [deletingTransactionId, setDeletingTransactionId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({
    amount: "",
    description: "",
    category: "",
    date: "",
    notes: ""
  })
  const { toast } = useToast()

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || transaction.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    const colors = {
      "Food": "bg-green-100 text-green-800",
      "Transport": "bg-blue-100 text-blue-800", 
      "Housing": "bg-purple-100 text-purple-800",
      "Utilities": "bg-yellow-100 text-yellow-800",
      "Entertainment": "bg-pink-100 text-pink-800",
      "Shopping": "bg-indigo-100 text-indigo-800",
      "Salary": "bg-emerald-100 text-emerald-800",
      "Freelance": "bg-cyan-100 text-cyan-800"
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const handleEditClick = (transaction: any) => {
    setEditingTransaction(transaction)
    setEditForm({
      amount: Math.abs(transaction.amount).toString(),
      description: transaction.description,
      category: transaction.category,
      date: transaction.date,
      notes: ""
    })
    setIsEditDialogOpen(true)
  }

  const handleEditSubmit = () => {
    if (!editingTransaction) return

    const updatedTransaction = {
      ...editingTransaction,
      amount: editingTransaction.type === 'expense' ? -Math.abs(parseFloat(editForm.amount)) : Math.abs(parseFloat(editForm.amount)),
      description: editForm.description,
      category: editForm.category,
      date: editForm.date,
    }

    setTransactions(transactions.map(t => 
      t.id === editingTransaction.id ? updatedTransaction : t
    ))

    toast({
      title: "Transaction Updated",
      description: "The transaction has been successfully updated.",
    })

    setIsEditDialogOpen(false)
    setEditingTransaction(null)
    setEditForm({ amount: "", description: "", category: "", date: "", notes: "" })
  }

  const handleDeleteClick = (transactionId: number) => {
    setDeletingTransactionId(transactionId)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (deletingTransactionId) {
      setTransactions(transactions.filter(t => t.id !== deletingTransactionId))
      toast({
        title: "Transaction Deleted",
        description: "The transaction has been successfully deleted.",
        variant: "destructive",
      })
    }
    setIsDeleteDialogOpen(false)
    setDeletingTransactionId(null)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">Manage and track all your financial transactions.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">Amount</Label>
                <Input id="amount" type="number" placeholder="0.00" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Input id="description" placeholder="Transaction description" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">Date</Label>
                <Input id="date" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">Notes</Label>
                <Textarea id="notes" placeholder="Additional notes" className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Add Transaction</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Transaction Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-amount" className="text-right">Amount</Label>
              <Input 
                id="edit-amount" 
                type="number" 
                value={editForm.amount}
                onChange={(e) => setEditForm({...editForm, amount: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-right">Description</Label>
              <Input 
                id="edit-description" 
                value={editForm.description}
                onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-category" className="text-right">Category</Label>
              <Select value={editForm.category} onValueChange={(value) => setEditForm({...editForm, category: value})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.slice(1).map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-date" className="text-right">Date</Label>
              <Input 
                id="edit-date" 
                type="date" 
                value={editForm.date}
                onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-notes" className="text-right">Notes</Label>
              <Textarea 
                id="edit-notes" 
                value={editForm.notes}
                onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                placeholder="Additional notes" 
                className="col-span-3" 
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditSubmit}>Update Transaction</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the transaction.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions ({filteredTransactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                  <Badge className={getCategoryColor(transaction.category)}>
                    {transaction.category}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`text-lg font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEditClick(transaction)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(transaction.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
