'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { InfoIcon, Loader2, Copy, Check } from "lucide-react"

export default function Component() {
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    description: '',
    initialSupply: '',
    decimals: '9', // Default for Supra
    uri: ''
  })

  // Example address - replace with actual address
  const receivingAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate token creation - replace with actual Supra Network integration
    setTimeout(() => {
      setIsLoading(false)
      // Add actual token creation logic here
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(receivingAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left side - Token Creation Form */}
        <div className="md:col-span-2">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Create Token on Supra Network</CardTitle>
              <CardDescription>
                Fill in the details below to create your custom token on Supra Network
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <Alert>
                  <InfoIcon className="h-4 w-4" />
                  <AlertDescription>
                    Make sure you have sufficient SUPRA tokens to cover the creation fee
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Token Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Supra Gold"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="symbol">Token Symbol</Label>
                  <Input
                    id="symbol"
                    name="symbol"
                    placeholder="e.g., SGLD"
                    maxLength={6}
                    value={formData.symbol}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter token description"
                    value={formData.description}
                    onChange={handleChange}
                    className="resize-none"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="initialSupply">Initial Supply</Label>
                    <Input
                      id="initialSupply"
                      name="initialSupply"
                      type="number"
                      placeholder="e.g., 1000000"
                      value={formData.initialSupply}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="decimals">Decimals</Label>
                    <Input
                      id="decimals"
                      name="decimals"
                      type="number"
                      min="0"
                      max="18"
                      value={formData.decimals}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="uri">Token URI (Optional)</Label>
                  <Input
                    id="uri"
                    name="uri"
                    placeholder="https://..."
                    value={formData.uri}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>

              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Token...
                    </>
                  ) : (
                    'Create Token'
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        {/* Right side - QR Code and Address */}
        <div>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>send Address</CardTitle>
              <CardDescription>
                Scan QR code or copy address to send tokens
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* QR Code */}
              <div className="flex justify-center p-4 bg-white rounded-lg">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${receivingAddress}`}
                  alt="QR Code for receiving address"
                  className="w-48 h-48"
                />
              </div>

              {/* Copyable Address */}
              <div className="space-y-2">
                <Label>Token Sending Address</Label>
                <div className="flex gap-2">
                  <Input 
                    readOnly 
                    value={receivingAddress}
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyToClipboard}
                    className="shrink-0"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}