
import { useState } from "react"
import { 
  Bell, 
  Globe, 
  Shield, 
  CreditCard, 
  Download, 
  Trash2, 
  User,
  Eye,
  EyeOff,
  Save,
  RefreshCw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

interface SettingsProps {
  isDark: boolean
  toggleTheme: () => void
}

export function Settings({ isDark, toggleTheme }: SettingsProps) {
  const { toast } = useToast()
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    currency: "USD"
  })
  
  const [notifications, setNotifications] = useState({
    budgetAlerts: true,
    goalReminders: true,
    weeklyReports: false,
    emailNotifications: true
  })
  
  const [privacy, setPrivacy] = useState({
    showBalance: true,
    dataSharing: false,
    analytics: true
  })
  
  const [showPassword, setShowPassword] = useState(false)

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved successfully.",
    })
  }

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your financial data export will be ready shortly.",
    })
  }

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion",
      description: "Please contact support to delete your account.",
      variant: "destructive"
    })
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
            <CardDescription>
              Update your personal information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Change Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Default Currency</Label>
              <Select value={profile.currency} onValueChange={(value) => setProfile({ ...profile, currency: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                  <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSaveProfile} className="w-full md:w-auto">
              <Save className="h-4 w-4 mr-2" />
              Save Profile
            </Button>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Appearance
            </CardTitle>
            <CardDescription>
              Customize how the app looks and feels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark themes
                </p>
              </div>
              <Switch checked={isDark} onCheckedChange={toggleTheme} />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Control what notifications you receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Budget Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when you exceed budget limits
                </p>
              </div>
              <Switch 
                checked={notifications.budgetAlerts}
                onCheckedChange={(checked) => 
                  setNotifications({ ...notifications, budgetAlerts: checked })
                }
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Goal Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Reminders to help you reach your savings goals
                </p>
              </div>
              <Switch 
                checked={notifications.goalReminders}
                onCheckedChange={(checked) => 
                  setNotifications({ ...notifications, goalReminders: checked })
                }
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">
                  Receive weekly spending summaries
                </p>
              </div>
              <Switch 
                checked={notifications.weeklyReports}
                onCheckedChange={(checked) => 
                  setNotifications({ ...notifications, weeklyReports: checked })
                }
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send notifications to your email
                </p>
              </div>
              <Switch 
                checked={notifications.emailNotifications}
                onCheckedChange={(checked) => 
                  setNotifications({ ...notifications, emailNotifications: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>
              Control your privacy and data sharing preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Balance on Dashboard</Label>
                <p className="text-sm text-muted-foreground">
                  Display your account balance prominently
                </p>
              </div>
              <Switch 
                checked={privacy.showBalance}
                onCheckedChange={(checked) => 
                  setPrivacy({ ...privacy, showBalance: checked })
                }
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Anonymous Analytics</Label>
                <p className="text-sm text-muted-foreground">
                  Help improve the app with usage analytics
                </p>
              </div>
              <Switch 
                checked={privacy.analytics}
                onCheckedChange={(checked) => 
                  setPrivacy({ ...privacy, analytics: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Data Management
            </CardTitle>
            <CardDescription>
              Export or delete your financial data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleExportData} variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button onClick={() => window.location.reload()} variant="outline" className="flex-1">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Data
              </Button>
            </div>
            
            <Separator />
            
            <div className="bg-destructive/10 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-destructive mb-2">Danger Zone</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Once you delete your account, all your data will be permanently removed.
              </p>
              <Button onClick={handleDeleteAccount} variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
