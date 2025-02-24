"use client";

import CartCard from "@/components/cart/CartCard";
import { CartCardSkeleton } from "@/components/Skeletons";
import { useQueryFunctionWithId } from "@/features/useQuery";
import { getCartItems } from "@/services/cartApi";
import { useSession } from "next-auth/react";
import React from "react";

const Cart = () => {
  const { data: session } = useSession();
  const id = session?.user?.id;

  const { data, isLoading } = useQueryFunctionWithId(
    ["cart"],
    id || "", // Ensure it's always a string
    getCartItems
  );

  const cartItems = data?.cartItems || [];

  return (
    <section className="py-4">
      <div className="px-2 sm:px-3 md:px-6">
        <h2 className="text-2xl font-bold text-white sm:text-3xl mb-6 text-center">
          Shopping Cart
        </h2>

        {/* Cart Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading &&
            Array.from({ length: 4 }).map((_, idx) => (
              <CartCardSkeleton key={idx} />
            ))}

          {!isLoading && cartItems.length > 0
            ? cartItems.map((item: any, index: number) => (
                <CartCard
                  key={index}
                  variant={item?.variant}
                  product={item?.productId}
                />
              ))
            : !isLoading && (
                <p className="text-gray-400 text-sm text-center w-full">
                  No items in the cart.
                </p>
              )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
