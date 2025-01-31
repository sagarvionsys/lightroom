"use client";

import useDeleteCartItem from "@/features/cartMutations/useDeleteCartItem";
import { IMAGE_VARIANTS } from "@/types/product.types";
import { IKImage } from "imagekitio-next";
import { Heart, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Spinner from "../Spinner";
import { Button, Modal } from "antd";
import CheckOut from "./CheckOut";
import ItemPreview from "./ItemPreview";

const CartCard = ({ variant, product }: { variant: any; product: any }) => {
  const [purchaseModal, setPurchaseModal] = useState(false);
  const p = product;
  const { deleteItem, deleteItemPending } = useDeleteCartItem();
  const variantDimensions =
    IMAGE_VARIANTS[variant.type.toUpperCase() as keyof typeof IMAGE_VARIANTS]
      .dimensions;
  return (
    <>
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
              alt={`cart ${variant._id?.toString().slice(-6)}`}
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

          <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
            <div>
              <Link
                href={`product/${p._id}`}
                className="text-xl font-medium text-white hover:underline"
              >
                {product?.name}
              </Link>
              <p>{product?.product?.description}</p>
            </div>
            <Button
              type="primary"
              onClick={(e) => {
                e.stopPropagation();
                setPurchaseModal(true);
              }}
            >
              Buy Now
            </Button>
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
      {/* Purchase Modal */}
      <Modal
        width={800}
        open={purchaseModal}
        onCancel={() => setPurchaseModal(false)}
        footer={null}
      >
        <div className="space-y-6">
          <ItemPreview variant={variant} product={p} />
          <CheckOut variant={variant} product={p} />
        </div>
      </Modal>
    </>
  );
};

export default CartCard;
