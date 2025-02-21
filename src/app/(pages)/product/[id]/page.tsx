"use client";

import Spinner from "@/components/Spinner";
import useItemToCart from "@/features/cartMutations/useItemToCart";
import { useQueryFunctionWithId } from "@/features/useQuery";
import { getProductApiById } from "@/services/productApi";
import {
  IMAGE_VARIANTS,
  ImageVariant,
  ImageVariantType,
} from "@/types/product.types";
import { IKImage } from "imagekitio-next";
import { ImageIcon, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Modal, Button } from "antd";
import CheckOut from "@/components/cart/CheckOut";
import ItemPreview from "@/components/cart/ItemPreview";
import { ProductSkeleton } from "@/components/Skeletons";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [purchaseModal, setPurchaseModal] = useState(false);
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

  if (productLoading) return <ProductSkeleton />;
  if (!product && !productLoading)
    return (
      <h1 className="text-center text-xl text-gray-300">Product not found</h1>
    );

  const { product: productData } = product;

  const handleAddToCart = async () => {
    if (!session) return router.push("/sign-in");

    if (selectedVariant) {
      addItemToCart({ productId: productData?._id, variant: selectedVariant });
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 bg-black text-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Display */}
          <div className="space-y-4">
            <div
              className="relative rounded-lg overflow-hidden shadow-lg bg-gray-800"
              style={{
                aspectRatio: selectedVariant
                  ? `${
                      IMAGE_VARIANTS[selectedVariant.type].dimensions.width
                    } / ${
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
                Preview:{" "}
                {IMAGE_VARIANTS[selectedVariant?.type]?.dimensions.width} x{" "}
                {IMAGE_VARIANTS[selectedVariant?.type]?.dimensions.height}px
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-white">
              {productData?.name}
            </h1>
            <p className="text-lg text-gray-400">{productData?.description}</p>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">
                Available Versions
              </h2>
              {productData?.variants?.map((variant: ImageVariant) => (
                <div
                  key={variant.type}
                  className={`card bg-neutral-800 border border-gray-700 rounded-lg cursor-pointer transition-transform ${
                    selectedVariant?.type === variant.type
                      ? "ring-2 ring-blue-500 scale-105"
                      : "hover:scale-105"
                  }`}
                  onClick={() => setSelectedVariant(variant)}
                >
                  <div className="card-body p-4 flex justify-between items-center">
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
                        &#8377;{variant.price.toFixed(2)}
                      </span>
                      <Button
                        type="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVariant(variant);
                          setPurchaseModal(true);
                        }}
                      >
                        Buy Now
                      </Button>
                      <Button
                        onClick={(e) => {
                          if (!session) return router.push("/sign-in");
                          e.stopPropagation();
                          setSelectedVariant(variant);
                          handleAddToCart();
                        }}
                      >
                        {addItemToPending &&
                        variant.type === selectedVariant?.type ? (
                          <Spinner />
                        ) : (
                          <ShoppingCart size={24} />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
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
          <ItemPreview variant={selectedVariant} product={productData} />
          <CheckOut variant={selectedVariant} product={productData} />
        </div>
      </Modal>
    </>
  );
};

export default Product;
