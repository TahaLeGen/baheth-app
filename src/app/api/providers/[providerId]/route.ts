import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { providerId: string } }
) {
  try {
    // TODO: Implement get provider by id
    return NextResponse.json({ message: `Get provider ${params.providerId}` })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { providerId: string } }
) {
  try {
    const body = await req.json()
    // TODO: Implement update provider
    return NextResponse.json({ message: `Update provider ${params.providerId}` })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { providerId: string } }
) {
  try {
    // TODO: Implement delete provider
    return NextResponse.json({ message: `Delete provider ${params.providerId}` })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}