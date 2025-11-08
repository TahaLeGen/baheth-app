import { NextResponse } from "next/server";
import { db, users } from "@/server/db/index";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm"; // <-- importer eq

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, phone_number, organization, role } = body;

    // Vérifier que l'email n'existe pas déjà
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérer le nouvel utilisateur
    const insertedUser = await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      phone_number,
      organization: organization || null,
      role,
    }).returning();

    return NextResponse.json({ message: "User created", user: insertedUser[0] });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
