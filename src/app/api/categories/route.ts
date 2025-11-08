import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    // TODO: Implement get all categories
    return NextResponse.json({ message: "Get all categories" })
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
    // TODO: Implement create category
    return NextResponse.json({ message: "Create category" })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}