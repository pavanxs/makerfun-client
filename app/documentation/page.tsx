"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocumentationPage() {
  const docs = [
    {
      title: "Getting Started",
      description: "Learn the basics and set up your first AI agent",
      href: "/documentation/getting-started",
    },
    {
      title: "API Reference",
      description: "Detailed API documentation and endpoints",
      href: "/documentation/api-reference",
    },
    {
      title: "Guides",
      description: "Step-by-step guides and tutorials",
      href: "/documentation/guides",
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Documentation</h1>
        <p className="text-muted-foreground mt-2">
          Everything you need to know about using and configuring AI agents
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {docs.map((doc) => (
          <Card key={doc.title} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{doc.title}</CardTitle>
              <CardDescription>{doc.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
} 