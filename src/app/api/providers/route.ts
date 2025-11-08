import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    // TODO: Implement get all providers
    return NextResponse.json({ message: "Get all providers" })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // TODO: Implement create provider
    return NextResponse.json({ message: "Create provider" })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}