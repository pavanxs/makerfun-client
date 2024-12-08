import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.Username || !body.botkey || !body.System || !body.Behavior || !body.RulesAndActions) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save to Redis using Username as keyCAacacacsa
    await redis.set(body.Username, JSON.stringify(body))
    await redis.set( 'bot', body.Username)

    return NextResponse.json(
      { message: 'Bot configuration saved successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error saving bot configuration:', error)
    return NextResponse.json(
      { error: 'Failed to save bot configuration' },
      { status: 500 }
    )
  }
} 