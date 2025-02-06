import { IKImage } from "imagekitio-next";
import Link from "next/link";
import { IMAGE_VARIANTS, IProduct } from "@/types/product.types";
import { useSession } from "next-auth/react";
import useDeleteProduct from "@/features/productMutations/useDeleteProduct";

export default function ProductCard({ product }: { product: IProduct }) {
  const { data: session } = useSession();
  const { deleteProduct, deleteProductPending } = useDeleteProduct();

  const lowestPrice = product.variants.reduce(
    (min, variant) => (variant.price < min ? variant.price : min),
    product.variants[0]?.price || 0
  );

  return (
    <div className="card bg-gray-900 text-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden">
      {/* Image Section */}
      <figure className="relative">
        <Link
          href={`/product/${product._id}`}
          className="group w-full relative"
        >
          <div
            className="relative w-full"
            style={{
              aspectRatio:
                IMAGE_VARIANTS.SQUARE.dimensions.width /
                IMAGE_VARIANTS.SQUARE.dimensions.height,
            }}
          >
            <IKImage
              path={product.imageUrl}
              alt={product.name}
              loading="eager"
              transformation={[
                {
                  height: IMAGE_VARIANTS.WIDE.dimensions.height.toString(),
                  width: IMAGE_VARIANTS.WIDE.dimensions.width.toString(),
                  cropMode: "extract",
                  focus: "center",
                  quality: "80",
                },
              ]}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
            />
          </div>
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-xl" />
        </Link>
        {session?.user?.role === "admin" && (
          <button
            type="button"
            disabled={deleteProductPending}
            onClick={() => deleteProduct(product?._id)}
            className=" mt-5 w-full flex justify-center items-center bg-red-500 text-gray-700 p-2 rounded-lg"
          >
            {deleteProductPending ? "DELETING..." : "REMOVE"}
          </button>
        )}
      </figure>

      {/* Body Section */}
      <div className="card-body p-2 flex gap-6">
        <Link
          href={`/product/${product._id}`}
          className="hover:opacity-80 transition-opacity"
        >
          <h2 className="card-title text-l font-semibold mb-2">
            {product.name}
          </h2>
        </Link>

        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-md font-bold text-yellow-400">
              From Rs. {lowestPrice.toFixed(2)}
            </span>
            <span className="text-xs text-gray-500">
              {product.variants.length} sizes available
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
