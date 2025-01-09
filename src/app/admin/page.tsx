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

export interface CreateOrderData {
  productId: Types.ObjectId | string;
  variant: ImageVariant;
}

export type ProductFormData = Omit<IProduct, "_id">;

export default function AdminProductForm() {
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
    // API call to save product
    // showNotification("Product created successfully!", "success");
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-4xl font-semibold text-gray-800 mb-8 text-center">
          Add New Product
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="form-control">
            <label className="label font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              className={`input input-bordered w-full ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter product name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label font-medium text-gray-700">
              Description
            </label>
            <textarea
              className={`textarea textarea-bordered w-full h-28 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter product description"
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label font-medium text-gray-700">
              Product Image
            </label>
            <FileUpload onSuccess={handleUploadSuccess} />
          </div>

          <div className="divider">Image Variants</div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="bg-gray-100 p-4 rounded-md shadow-sm space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-control">
                  <label className="label font-medium text-gray-700">
                    Size & Aspect Ratio
                  </label>
                  <select
                    className="select select-bordered w-full"
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

                <div className="form-control">
                  <label className="label font-medium text-gray-700">
                    License
                  </label>
                  <select
                    className="select select-bordered w-full"
                    {...register(`variants.${index}.license`)}
                  >
                    <option value="personal">Personal Use</option>
                    <option value="commercial">Commercial Use</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label font-medium text-gray-700">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    className="input input-bordered w-full"
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors.variants[index]?.price?.message}
                    </p>
                  )}
                </div>

                <div className="flex items-end justify-end">
                  <button
                    type="button"
                    className="btn btn-error btn-sm"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-outline btn-block"
            onClick={() =>
              append({
                type: "SQUARE" as ImageVariantType,
                price: 9.99,
                license: "personal",
              })
            }
          >
            <Plus className="w-4 h-4 mr-2" /> Add Variant
          </button>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Product...
              </>
            ) : (
              "Create Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
