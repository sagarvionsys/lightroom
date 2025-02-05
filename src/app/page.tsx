"use client";

import ProductCard from "@/components/home/ProductCard";
import { ProductCardSkeleton } from "@/components/Skeletons";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { useQueryFunction } from "@/features/useQuery";
import { getProductApi } from "@/services/productApi";
import { IProduct } from "@/types/product.types";

export default function Home() {
  const { data, isLoading: productIsLoading } = useQueryFunction(
    ["query"],
    getProductApi
  );

  const productList: IProduct[] = data?.productList || [];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-18 mt-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 px-4">
        {productIsLoading
          ? Array(8)
              .fill(null)
              .map((_, idx) => <ProductCardSkeleton key={idx} />)
          : productList?.map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))}
      </div>
      <div className="h-[30rem] flex justify-center">
        <TextHoverEffect duration={5} text="LIGHTROOM" />
      </div>
    </main>
  );
}
