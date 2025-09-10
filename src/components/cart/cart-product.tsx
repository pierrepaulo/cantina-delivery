"use client";

import { decimalToMoney } from "@/lib/utils";
import { useProductsStore } from "@/stores/products";
import { CartItem } from "@/types/cart-item";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";

type Props = {
  data: CartItem;
};

export const CartProduct = ({ data }: Props) => {
  const [qt, setQt] = useState(data.quantity);

  const products = useProductsStore();
  let product = products.products.find((item) => item.id === data.productId);
  if (!product) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="w-10">
        <Image
          src={product.image}
          alt={product.name}
          width={100}
          height={100}
          className="w-full"
        />
      </div>
      <div className="flex-1">
        <div>{product.name} </div>
        <div className="text-sm">{decimalToMoney(product.price)} </div>
      </div>
      <div className="flex items-center bg-secondary p-2 rounded-md">
        <Button size="sm" variant="ghost">
          -
        </Button>
        <div className="mx-3">{qt} </div>
        <Button size="sm" variant="ghost">
          +
        </Button>
      </div>
    </div>
  );
};
