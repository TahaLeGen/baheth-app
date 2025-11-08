import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    // TODO: Implement get all equipment
    return NextResponse.json({ message: "Get all equipment" })
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
    // TODO: Implement create equipment
    return NextResponse.json({ message: "Create equipment" })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}