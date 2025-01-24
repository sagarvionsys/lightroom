"use client";

import Spinner from "@/components/Spinner";
import useItemToCart from "@/features/cartMutations/useItemToCart";
import { useQueryFunctionWithId } from "@/features/useQuery";
import { addOrderApi } from "@/services/orderApi";
import { getProductApiById } from "@/services/productApi";
import {
  IMAGE_VARIANTS,
  ImageVariant,
  ImageVariantType,
} from "@/types/product.types";
import { IKImage } from "imagekitio-next";
import { Check, ImageIcon, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const getTransformation = (variantType: ImageVariantType) => {
  const { dimensions } = IMAGE_VARIANTS[variantType];
  return [
    {
      width: dimensions?.width.toString(),
      height: dimensions?.height.toString(),
      cropMode: "extract",
      focus: "center",
      quality: "80",
    },
  ];
};

const Product = () => {
  const { id } = useParams();
  const { data: product, isLoading: productLoading } = useQueryFunctionWithId(
    ["query"],
    id as string,
    getProductApiById
  );
  const { addItemToCart, addItemToPending } = useItemToCart();
  const { data: session } = useSession();
  const [selectedVariant, setSelectedVariant] = useState<ImageVariant | null>(
    null
  );

  if (productLoading)
    return <h1 className="text-center text-xl text-gray-300">Loading...</h1>;
  if (!product)
    return (
      <h1 className="text-center text-xl text-gray-300">Product not found</h1>
    );

  const { product: productData } = product;

  const handlePurchase = async () => {
    if (!session) {
      console.error("User is not logged in.");
      return;
    }

    if (selectedVariant)
      try {
        const data = await addOrderApi({
          productId: productData?._id,
          variant: selectedVariant,
        });

        const { orderId, amount } = data;
        const rzpOptions = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: amount,
          currency: "INR",
          name: "LightRoom Shop",
          description: `${productData?.name} - ${selectedVariant?.type} Version`,
          order_id: orderId,
          handler: () => toast.success("Payment successful!"),
          prefill: {
            email: session.user.email,
          },
        };

        const rzp = new (window as any).Razorpay(rzpOptions);
        rzp.open();
      } catch (error) {
        console.error("Purchase failed:", error);
        toast.error("Purchase failed. Please try again.");
      }
  };

  const handleAddToCart = async () => {
    if (!session) {
      console.error("User is not logged in.");
      return;
    }

    if (selectedVariant)
      addItemToCart({ productId: productData?._id, variant: selectedVariant });
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-black text-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div
            className="relative rounded-lg overflow-hidden shadow-lg bg-gray-800"
            style={{
              aspectRatio: selectedVariant
                ? `${IMAGE_VARIANTS[selectedVariant.type].dimensions.width} / ${
                    IMAGE_VARIANTS[selectedVariant.type].dimensions.height
                  }`
                : "1 / 1",
            }}
          >
            <IKImage
              urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
              path={productData?.imageUrl}
              alt={productData?.name}
              transformation={
                selectedVariant
                  ? getTransformation(selectedVariant?.type)
                  : getTransformation("SQUARE")
              }
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>

          {selectedVariant && (
            <div className="text-sm text-center text-gray-400">
              Preview: {IMAGE_VARIANTS[selectedVariant?.type]?.dimensions.width}{" "}
              x {IMAGE_VARIANTS[selectedVariant?.type]?.dimensions.height}px
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white">
              {productData?.name}
            </h1>
            <p className="text-lg text-gray-400 mt-2">
              {productData?.description}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">
              Available Versions
            </h2>
            {productData?.variants?.map((variant: ImageVariant) => (
              <div
                key={variant.type}
                className={`card bg-neutral-800 border border-gray-700 rounded-lg cursor-pointer transition-transform transform ${
                  selectedVariant?.type === variant.type
                    ? "ring-2 ring-blue-500 scale-105"
                    : "hover:scale-105"
                }`}
                onClick={() => setSelectedVariant(variant)}
              >
                <div className="card-body p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <ImageIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <h3 className="font-semibold text-white">
                          {
                            IMAGE_VARIANTS[
                              variant.type.toUpperCase() as keyof typeof IMAGE_VARIANTS
                            ].label
                          }
                        </h3>
                        <p className="text-sm text-gray-400">
                          {
                            IMAGE_VARIANTS[
                              variant.type.toUpperCase() as keyof typeof IMAGE_VARIANTS
                            ].dimensions.width
                          }{" "}
                          x{" "}
                          {
                            IMAGE_VARIANTS[
                              variant.type.toUpperCase() as keyof typeof IMAGE_VARIANTS
                            ].dimensions.height
                          }
                          px • {variant.license} license
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-bold text-white">
                        ${variant.price.toFixed(2)}
                      </span>
                      <button
                        disabled={addItemToPending}
                        className="btn btn-primary btn-sm"
                        onClick={(e) => {
                          setSelectedVariant(variant);
                          e.stopPropagation();
                          handlePurchase();
                        }}
                      >
                        Buy Now
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVariant(variant);
                          handleAddToCart();
                        }}
                      >
                        {addItemToPending &&
                        variant.type === selectedVariant?.type ? (
                          <Spinner />
                        ) : (
                          <ShoppingCart size={28} absoluteStrokeWidth />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card bg-neutral-800 border border-gray-700 rounded-lg">
            <div className="card-body p-4">
              <h3 className="font-semibold text-white mb-2">
                License Information
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Personal: Use in personal projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Commercial: Use in commercial projects</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
