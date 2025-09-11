import { PizzaList } from "@/components/home/pizza-list";
import { Header } from "@/components/layout/header";
import { api } from "@/lib/axios";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ searchParams }: Props) {
  const sessionId = (await searchParams).session_id as string;

  if (!sessionId) return redirect("/");

  const paymentSession = await stripe.checkout.sessions.retrieve(sessionId);
  if (!paymentSession) return redirect("/");

  const customerEmail = paymentSession.customer_email;

  return (
    <div>
      <Header />
      <main className="container mx-auto mb-10 text-center">
        <h1 className="text-2xl">Parabens pela compra!</h1>
        <h3 className="text-xl">
          Em breve nos vamos te enviar um email para{" "}
          <strong> {customerEmail}</strong> mais informações
        </h3>
      </main>
    </div>
  );
}
