"use client";

import ProductCard from "@/components/home/ProductCard";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { useQueryFunction } from "@/features/useQuery";
import { getProductApi } from "@/services/productApi";
import { IProduct } from "@/types/product.types";

export default function Home() {
  const { data: products, isLoading: productIsLoading } = useQueryFunction(
    ["query"],
    getProductApi
  );
  const { productList } = products || {};

  if (productIsLoading) return <h1>Loading....</h1>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-18 mt-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList &&
          productList?.map((product: IProduct, idx: number) => (
            <ProductCard key={idx} product={product} />
          ))}
      </div>
      <div className="h-[30rem] flex justify-center">
        <TextHoverEffect duration={5} text="LIGHTROOM" />
      </div>
    </main>
  );
}
