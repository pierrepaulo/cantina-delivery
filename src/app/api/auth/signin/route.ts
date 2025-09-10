import { createUserToken, validadeAuth } from "@/services/auth";
import { create } from "domain";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Campos incompletos" });
  }

  const user = await validadeAuth(email, password);
  if (!user) {
    return NextResponse.json({ error: "Email ou senha incorretos" });
  }
  const token = await createUserToken(user.id);

  return NextResponse.json({ user, token });
}
