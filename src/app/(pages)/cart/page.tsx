"use client";

import CartCard from "@/components/cart/CartCard";
import CheckOut from "@/components/cart/CheckOut";
import { useQueryFunctionWithId } from "@/features/useQuery";
import { getCartItems } from "@/services/cartApi";
import { ICart } from "@/types/cart.types";
import { useSession } from "next-auth/react";
import React from "react";

const cart = () => {
  const { data: session } = useSession();

  const id = session?.user.id;
  const { data, isLoading } = useQueryFunctionWithId(
    ["cart"],
    id as string,
    getCartItems
  );

  if (isLoading)
    return <h1 className="text-center text-xl text-gray-300">Loading...</h1>;
  const { cartItems } = data;

  return (
    <section className="py-4 antialiased bg-dark ">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          Shopping Cart
        </h2>
        {/* shopping cart card */}
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cartItems &&
                cartItems?.map((p: ICart, index: number) => (
                  <CartCard key={index} product={p} />
                ))}
            </div>
          </div>
          <CheckOut product={cartItems} />
        </div>
      </div>
    </section>
  );
};

export default cart;
