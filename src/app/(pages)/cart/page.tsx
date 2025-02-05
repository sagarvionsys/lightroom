"use client";

import CartCard from "@/components/cart/CartCard";
import { CartCardSkeleton } from "@/components/Skeletons";
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

  const { cartItems } = data || {};

  if (!cartItems && !isLoading)
    return (
      <h1 className="text-center text-xl text-gray-300">No Product in Cart</h1>
    );

  return (
    <section className="py-4 ">
      <div className=" px-2 sm:px-3 md:px-6">
        <h2 className="text-2xl font-bold text-white sm:text-3xl mb-6 text-center">
          Shopping Cart
        </h2>

        {/* Cart Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading &&
            Array(4)
              .fill(null)
              .map((_, idx) => <CartCardSkeleton key={idx} />)}

          {cartItems &&
            cartItems?.map((item: any, index: number) => (
              <CartCard
                key={index}
                variant={item?.variant}
                product={item?.productId}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Cart;
