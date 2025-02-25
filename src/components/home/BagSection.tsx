"use client";
import { IMAGE_VARIANTS } from "@/types/product.types";
import { IKImage } from "imagekitio-next";
import { Download } from "lucide-react";
import React from "react";
import { Button } from "../ui/moving-border";
import { formatDate } from "@/utils/formatDate";
import { downloadImage } from "@/utils/downloadUrl";

const BagSection = ({ items }: any) => {
  return (
    <div className="container mx-auto px-4 py-8 bg-base-100">
      <div className="space-y-4">
        {items &&
          items?.map((order: any) => {
            const variantDimensions =
              IMAGE_VARIANTS[
                order.variant.type.toUpperCase() as keyof typeof IMAGE_VARIANTS
              ].dimensions;

            const product = order.productId as any;

            return (
              <div
                key={order._id}
                className="card bg-neutral-900 text-neutral-content rounded-xl shadow-lg"
              >
                <div className="card-body">
                  <div className="order-details flex flex-wrap items-center gap-8 py-4 px-6 bg-neutral-800 rounded-lg">
                    <div className="flex flex-col">
                      <p className="font-semibold text-sm text-neutral-400">
                        Order ID
                      </p>
                      <p className="text-lg">
                        #{order?._id?.toString().slice(-6)}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold text-sm text-neutral-400">
                        Order Date
                      </p>
                      <p className="text-lg">{formatDate(order.createdAt)}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold text-sm text-neutral-400">
                        Total Amount
                      </p>
                      <p className="text-lg">&#8377;{order?.amount}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold text-sm text-neutral-400">
                        Order Status
                      </p>
                      <p className="text-lg capitalize">{order?.status}</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start gap-6 p-6 bg-neutral-900 rounded-lg">
                    <div
                      className="relative rounded-lg overflow-hidden bg-neutral-focus"
                      style={{
                        width: "120px",
                        aspectRatio: `${variantDimensions.width} / ${variantDimensions.height}`,
                      }}
                    >
                      <IKImage
                        urlEndpoint={
                          process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
                        }
                        path={product.imageUrl}
                        alt={`Order ${order._id?.toString().slice(-6)}`}
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

                    <div className="flex-grow mt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-2">
                          <h2 className="text-2xl font-bold text-primary-content">
                            {product.name}
                          </h2>
                          <h2 className="text-2xl font-bold text-primary-content">
                            {product.razorpayOrderId}
                          </h2>
                          <p className="text-sm text-neutral-400">
                            Resolution: {variantDimensions.width} x{" "}
                            {variantDimensions.height}
                          </p>
                        </div>

                        {order?.status === "completed" && (
                          <Button
                            onClick={async () => {
                              const url = `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/tr:q-100,w-${variantDimensions.width},h-${variantDimensions.height},cm-extract,fo-center/${product.imageUrl}`;
                              const productName =
                                product?.name +
                                "_" +
                                variantDimensions?.width +
                                "x" +
                                variantDimensions?.height;
                              downloadImage(url, productName);
                            }}
                            borderRadius="0.5rem"
                            className="bg-slate-900 gap-3 flex text-white border-slate-600"
                          >
                            <Download />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        {items?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white text-lg">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BagSection;
