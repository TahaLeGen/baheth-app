import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    // TODO: Implement get all chats
    return NextResponse.json({ message: "Get all chats" })
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
    // TODO: Implement create chat
    return NextResponse.json({ message: "Create chat" })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}