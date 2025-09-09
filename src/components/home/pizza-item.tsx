"use client";

import { Product } from "@/generated/prisma";
import Image from "next/image";
import { Button } from "../ui/button";
import { decimaToMoney } from "@/lib/utils";
import { useCart } from "@/stores/cart";

type Props = {
  data: Product;
};

export const PizzaItem = ({ data }: Props) => {
  const cart = useCart();
  const handleAddTocart = () => {
    cart.addItem({
      productId: data.id,
      quantity: 1,
    });
    cart.setOpen(true);
  };

  return (
    <div className="text-sm bg-secondary p-4 rounded-md">
      <Image
        src={data.image}
        alt={data.name}
        width={200}
        height={200}
        className="w-full mb-3"
      />
      <div className="text-lx font-bold">{data.name} </div>
      <div>{decimaToMoney(data.price)} </div>
      <div className="truncate mb-3">{data.ingredients} </div>
      <div className="text-center">
        <Button onClick={handleAddTocart}>Adicionar ao carirnho</Button>
      </div>
    </div>
  );
};
