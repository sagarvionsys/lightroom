"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import FileUpload from "@/components/FileUpload";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2, Plus, Trash2 } from "lucide-react";
import {
  IMAGE_VARIANTS,
  ImageVariant,
  ImageVariantType,
  IProduct,
} from "@/types/product.types";
import { Types } from "mongoose";
import useAddProduct from "@/features/productMutations/useAddProduct";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export interface CreateOrderData {
  productId: Types.ObjectId | string;
  variant: ImageVariant;
}

export type ProductFormData = Omit<IProduct, "_id">;

export default function AdminProductForm() {
  const { addProduct, addProductLoading } = useAddProduct();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      variants: [
        {
          type: "SQUARE" as ImageVariantType,
          price: 9.99,
          license: "personal",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const handleUploadSuccess = (response: IKUploadResponse) => {
    setValue("imageUrl", response.filePath);
    // showNotification("Image uploaded successfully!", "success");
  };

  const onSubmit = async (data: ProductFormData) => {
    addProduct(data);
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-neutral-800 mb-3">
        Create New Product
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Product Details Section */}
        <div className="space-y-3">
          <div>
            <Label htmlFor="name" className="text-neutral-800 ">
              Product Name *
            </Label>
            <Input
              id="name"
              placeholder="e.g. Modern Abstract Artwork"
              className="bg-white text-gray-700 placeholder-gray-400"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description" className="text-neutral-800 ">
              Description *
            </Label>
            <Input
              className="w-full px-4 py-2 border rounded-lg bg-white text-gray-700 placeholder-gray-400"
              placeholder="Describe your product in detail..."
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="productImage" className="text-neutral-800 ">
              Product Image *
            </Label>
            <FileUpload onSuccess={handleUploadSuccess} />
          </div>
        </div>

        {/* Variants Section */}
        <div className="border-t pt-3">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Pricing Variants
          </h3>

          {fields.map((field, index) => (
            <div key={field.id} className="mb-4 p-4 border rounded-lg bg-white">
              <div className="flex justify-center items-center gap-3">
                <div className="flex items-center justify-center gap-4">
                  {/* Size & Aspect Ratio */}
                  <div>
                    <Label
                      htmlFor={`variants.${index}.type`}
                      className="text-neutral-800 "
                    >
                      Size & Format *
                    </Label>
                    <select
                      className="w-full px-4 py-2 border  rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
                      {...register(`variants.${index}.type`)}
                    >
                      {Object.entries(IMAGE_VARIANTS).map(([key, value]) => (
                        <option key={key} value={value.type}>
                          {value.label} ({value.dimensions.width}x
                          {value.dimensions.height})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* License Type */}
                  <div>
                    <Label className="text-neutral-800 ">License Type *</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center text-gray-700">
                        <input
                          type="radio"
                          value="personal"
                          {...register(`variants.${index}.license`)}
                          className="h-4 w-4 text-blue-600 border-gray-700"
                        />
                        <span className="ml-2 text-sm">Personal</span>
                      </label>
                      <label className="flex items-center text-gray-700">
                        <input
                          type="radio"
                          value="commercial"
                          {...register(`variants.${index}.license`)}
                          className="h-4 w-4 text-blue-600 border-gray-700"
                        />
                        <span className="ml-2 text-sm">Commercial</span>
                      </label>
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <Label
                      htmlFor={`variants.${index}.price`}
                      className="text-neutral-800 "
                    >
                      Price *
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-700">
                        $
                      </span>
                      <Input
                        type="number"
                        step="0.01"
                        min="0.01"
                        className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500  text-black"
                        placeholder="0.00"
                        {...register(`variants.${index}.price`, {
                          valueAsNumber: true,
                          required: "Price is required",
                          min: {
                            value: 0.01,
                            message: "Price must be greater than 0",
                          },
                        })}
                      />
                    </div>
                    {errors.variants?.[index]?.price && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.variants[index]?.price?.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                  className=" mt-5 text-gray-700 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          <button
            disabled={fields.length === 3}
            type="button"
            onClick={() =>
              append({
                type: "SQUARE" as ImageVariantType,
                price: 9.99,
                license: "personal",
              })
            }
            className="w-full mt-4 disabled:cursor-not-allowed flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-gray-600 rounded-lg text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Another Variant
          </button>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <button
            type="submit"
            disabled={addProductLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {addProductLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              "Publish Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
