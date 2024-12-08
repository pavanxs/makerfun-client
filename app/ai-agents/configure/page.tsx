"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function TelegramBotsPage() {
  const router = useRouter();

  // Dummy data for demonstration
  const bots = [
    {
      id: 1,
      name: "Customer Support Bot",
      description: "24/7 customer support automation bot",
      status: "Active",
      createdAt: "2024-03-15",
    },
    {
      id: 2,
      name: "Sales Assistant",
      description: "Bot for handling sales inquiries and lead generation",
      status: "Inactive",
      createdAt: "2024-03-10",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500/15 text-green-700 hover:bg-green-500/25';
      case 'inactive':
        return 'bg-gray-500/15 text-gray-700 hover:bg-gray-500/25';
      default:
        return 'bg-blue-500/15 text-blue-700 hover:bg-blue-500/25';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Telegram Agents</h1>
        <Button onClick={() => router.push("/ai-agents/configure/create")}>
          Create Bot
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bots.map((bot) => (
          <Card key={bot.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{bot.name}</CardTitle>
              <CardDescription>{bot.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm">
                <Badge className={`${getStatusColor(bot.status)}`}>
                  {bot.status}
                </Badge>
                <span className="text-muted-foreground">Created: {bot.createdAt}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
