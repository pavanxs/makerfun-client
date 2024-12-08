import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, Bot, Coins, ArrowUpRight, MessageCircle } from "lucide-react"

export default function Component() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Distribution Metrics</h1>
        <p className="text-muted-foreground">
          Track your AI-powered token distribution and community engagement metrics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tokens Distributed</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">487,204</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active AI Agents</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 new agents deployed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">
              +180 new members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42.5%</div>
            <p className="text-xs text-muted-foreground">
              +12.3% increase
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Distribution Overview</CardTitle>
            <CardDescription>
              Token distribution across different contribution categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="flex-1">Content Creation</span>
                  <span className="text-muted-foreground">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="flex-1">Community Engagement</span>
                  <span className="text-muted-foreground">30%</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="flex-1">Technical Contributions</span>
                  <span className="text-muted-foreground">15%</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="flex-1">Governance Participation</span>
                  <span className="text-muted-foreground">10%</span>
                </div>
                <Progress value={10} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle> Activity</CardTitle>
            <CardDescription>
              AI agent interactions in community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <MessageCircle className="h-6 w-6 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Daily Active Users
                  </p>
                  <p className="text-sm text-muted-foreground">
                    875 members interacting
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-green-500">+12%</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <Bot className="h-6 w-6 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    AI Response Rate
                  </p>
                  <p className="text-sm text-muted-foreground">
                    98.5% accuracy
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-green-500">+3.2%</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-lg border p-4">
                <Coins className="h-6 w-6 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Rewards Distributed
                  </p>
                  <p className="text-sm text-muted-foreground">
                    15,420 tokens today
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-green-500">+8.1%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}