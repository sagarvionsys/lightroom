"use client";

import CartCard from "@/components/cart/CartCard";
import Spinner from "@/components/Spinner";
import { useQueryFunctionWithId } from "@/features/useQuery";
import { getCartItems } from "@/services/cartApi";
import { useSession } from "next-auth/react";
import React from "react";

const Cart = () => {
  const { data: session } = useSession();
  const id = session?.user.id;
  const { data, isLoading } = useQueryFunctionWithId(
    ["cart"],
    id as string,
    getCartItems
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );

  const { cartItems } = data || {};

  return (
    <section className="py-8 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white sm:text-3xl mb-6 text-center">
          Shopping Cart
        </h2>

        {cartItems?.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item: any, index: number) => (
                <CartCard
                  key={index}
                  variant={item?.variant}
                  product={item?.productId}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 text-lg">
            Your cart is empty. <br /> Start adding some products!
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
