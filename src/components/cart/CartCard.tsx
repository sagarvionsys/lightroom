"use client";

import useDeleteCartItem from "@/features/cartMutations/useDeleteCartItem";
import { ICart } from "@/types/cart.types";
import { IMAGE_VARIANTS } from "@/types/product.types";
import { IKImage } from "imagekitio-next";
import { CircleMinus, CirclePlus, Heart, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import Spinner from "../Spinner";
import { toINR } from "@/utils/converteToINR";

const CartCard = ({ product }: { product: ICart }) => {
  const { deleteItem, deleteItemPending } = useDeleteCartItem();
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
              className="inline-flex h-5 w-5 items-center justify-center"
            >
              <CircleMinus />
            </button>
            <input
              type="text"
              id="counter-input"
              data-input-counter
              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-white focus:outline-none focus:ring-0"
              placeholder=""
              value="1"
              required
            />
            <button
              type="button"
              id="increment-button"
              data-input-counter-increment="counter-input"
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center"
            >
              <CirclePlus />
            </button>
          </div>
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-white">
              {toINR(product.variant.price)}
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
              className="inline-flex items-center text-sm font-medium text-gray-400  hover:underline"
            >
              <span className="flex justify-center items-center">
                <Heart className="p-1" />
                <span> Add to Favorites</span>
              </span>
            </button>

            <button
              disabled={deleteItemPending}
              onClick={() => deleteItem(product?._id)}
              type="button"
              className="inline-flex items-center text-sm font-medium text-red-500 "
            >
              {deleteItemPending ? (
                <Spinner />
              ) : (
                <span className="flex justify-center items-center">
                  <Trash2 color="red" className="p-1" />
                  <span>Remove</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
