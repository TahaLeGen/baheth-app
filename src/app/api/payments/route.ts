import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    // TODO: Implement get all payments
    return NextResponse.json({ message: "Get all payments" })
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
    // TODO: Implement create payment
    return NextResponse.json({ message: "Create payment" })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}