"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import FileUpload from "@/components/FileUpload";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2, Trash2 } from "lucide-react";
import {
  IMAGE_VARIANTS,
  ImageVariant,
  ImageVariantType,
  IProduct,
} from "@/types/product.types";
import { Types } from "mongoose";
import useAddProduct from "@/features/productMutations/useAddProduct";

export interface CreateOrderData {
  productId: Types.ObjectId | string;
  variant: ImageVariant;
}

export type ProductFormData = Omit<IProduct, "_id">;

export default function AdminProductForm() {
  const { addProduct, addProductLoading } = useAddProduct();
  const [loading, setLoading] = useState(false);

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
    <div className="container mx-auto px-6 py-10 ">
      <div className="max-w-xl mx-auto bg-gray-800 text-white shadow-xl rounded-xl p-8">
        <h1 className="text-xl font-semibold text-center mb-4">
          Add New Product
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-4">
            {/* Product Name */}
            <div className="form-control">
              <label className="label font-medium text-gray-300">
                Product Name
              </label>
              <input
                type="text"
                className={`input input-bordered w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-600"
                }`}
                placeholder="Enter product name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label font-medium text-gray-300">
                Description
              </label>
              <textarea
                className={`textarea p-3 textarea-bordered w-full h-28 bg-gray-700 text-white placeholder-gray-400 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? "border-red-500" : "border-gray-600"
                }`}
                placeholder="Enter product description"
                {...register("description", {
                  required: "Description is required",
                })}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Product Image */}
          <div className="form-control">
            <label className="label font-medium text-gray-300">
              Product Image
            </label>
            <FileUpload onSuccess={handleUploadSuccess} />
          </div>

          <div className="divider text-gray-300">Image Variants</div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="bg-gray-700 p-6 rounded-lg shadow-lg space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Variant Size & Aspect Ratio */}
                <div className="form-control">
                  <label className="label font-medium text-gray-300">
                    Size & Aspect Ratio
                  </label>
                  <select
                    className="select select-bordered w-full bg-gray-700 text-white border-gray-600 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                {/* License */}
                <div className="form-control">
                  <label className="label font-medium text-gray-300">
                    License
                  </label>
                  <select
                    className="select select-bordered w-full bg-gray-700 text-white border-gray-600 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register(`variants.${index}.license`)}
                  >
                    <option value="personal">Personal Use</option>
                    <option value="commercial">Commercial Use</option>
                  </select>
                </div>

                {/* Price */}
                <div className="form-control">
                  <label className="label font-medium text-gray-300">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    className="input input-bordered w-full bg-gray-700 text-white placeholder-gray-400 border-gray-600 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register(`variants.${index}.price`, {
                      valueAsNumber: true,
                      required: "Price is required",
                      min: {
                        value: 0.01,
                        message: "Price must be greater than 0",
                      },
                    })}
                  />
                  {errors.variants?.[index]?.price && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.variants[index]?.price?.message}
                    </p>
                  )}
                </div>

                {/* Remove Variant Button */}
                <div className="flex items-end justify-end">
                  <button
                    type="button"
                    className="btn btn-error btn-sm bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between gap-4">
            {/* Add Variant Button */}
            <button
              type="button"
              className="btn p-3 btn-outline btn-block bg-gray-700 text-white border-gray-600 rounded-lg hover:bg-gray-600 transition-all"
              onClick={() =>
                append({
                  type: "SQUARE" as ImageVariantType,
                  price: 9.99,
                  license: "personal",
                })
              }
            >
              Add Variant
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn p-3 btn-primary btn-block bg-blue-600 hover:bg-blue-500 rounded-lg transition-all"
              disabled={addProductLoading}
            >
              {addProductLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                "Create Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
