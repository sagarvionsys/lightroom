"use client";

import { ICart } from "@/types/cart.types";
import { IMAGE_VARIANTS } from "@/types/product.types";
import { IKImage } from "imagekitio-next";
import Link from "next/link";
import React from "react";

const CartCard = ({ product }: { product: ICart }) => {
  console.log(product);
  const variantDimensions =
    IMAGE_VARIANTS[
      product.variant.type.toUpperCase() as keyof typeof IMAGE_VARIANTS
    ].dimensions;

  const p = product?.productId as any;
  return (
    <div className="rounded-lg border p-4 shadow-sm border-gray-700 bg-gray-800 md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <div
          className="relative rounded-lg overflow-hidden bg-neutral-focus"
          style={{
            width: "120px",
            aspectRatio: `${variantDimensions.width} / ${variantDimensions.height}`,
          }}
        >
          <IKImage
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
            path={p.imageUrl}
            alt={`cart ${product._id?.toString().slice(-6)}`}
            transformation={[
              {
                quality: "60",
                width: variantDimensions.width.toString(),
                height: variantDimensions.height.toString(),
                cropMode: "extract",
                focus: "center",
              },
            ]}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <label className="sr-only">Choose quantity:</label>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center">
            <button
              type="button"
              id="decrement-button"
              data-input-counter-decrement="counter-input"
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700"
            >
              <svg
                className="h-2.5 w-2.5 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              type="text"
              id="counter-input"
              data-input-counter
              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-white focus:outline-none focus:ring-0"
              placeholder=""
              value="2"
              required
            />
            <button
              type="button"
              id="increment-button"
              data-input-counter-increment="counter-input"
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700"
            >
              <svg
                className="h-2.5 w-2.5 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-white">
              {product.variant.price}
            </p>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <div>
            <Link
              href={`product/${p._id}`}
              className="text-xl font-medium text-white hover:underline"
            >
              {product?.productId?.name}
            </Link>
            <p>{product?.productId?.description}</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white hover:underline"
            >
              <svg
                className="me-1.5 h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                />
              </svg>
              Add to Favorites
            </button>

            <button
              type="button"
              className="inline-flex items-center text-sm font-medium text-red-500 hover:underline"
            >
              <svg
                className="me-1.5 h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
