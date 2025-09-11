import { getLoggedUserFromheader } from "@/services/auth";
import { createNewOrder } from "@/services/oder";
import { NextResponse } from "next/server";

export async function POST(requeste: Request) {
  const { cart } = await requeste.json();
  const loggedUser = await getLoggedUserFromheader();

  if (!loggedUser) return NextResponse.json({ error: "Usuário não logado" });
  if (!cart || (cart && cart.length <= 0))
    return NextResponse.json({ error: "Carrinho vazio" });
  const order = await createNewOrder(loggedUser.id, cart);
  if (!order) return NextResponse.json({ error: "Erro ao criar pedido" });

  return NextResponse.json({ order }, { status: 201 });
}
