"use client";

import { IMAGE_VARIANTS } from "@/types/product.types";
import { IKImage } from "imagekitio-next";
import Link from "next/link";
import React from "react";

const ItemPreview = ({ variant, product }: { variant: any; product: any }) => {
  const p = product;
  const variantDimensions =
    IMAGE_VARIANTS[variant.type.toUpperCase() as keyof typeof IMAGE_VARIANTS]
      .dimensions;

  return (
    <>
      <div className=" bg-white p-4 ">
        <div className="space-y-4 md:flex md:items-center md:gap-6 md:space-y-0">
          <div
            className="relative rounded-lg overflow-hidden bg-neutral-focus"
            style={{
              width: "150px",
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
                className="text-xl font-medium text-black hover:underline"
              >
                {product?.name}
              </Link>
              <p>{product?.product?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemPreview;
