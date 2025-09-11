import { prisma } from "@/lib/prisma";
import { CartItem } from "@/types/cart-item";

export const createNewOrder = async (userId: number, cart: CartItem[]) => {
  const newOrder = await prisma.order.create({
    data: { userId },
  });

  for (let item of cart) {
    await prisma.orderProduct.create({
      data: {
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
      },
    });
  }

  return newOrder;
};
