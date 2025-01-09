"use client";

import useQueryFunction from "@/features/useQuery";
import { getProductApi } from "@/services/productApi";

export default function Home() {
  const { data: products, isLoading: productIsLoading } = useQueryFunction(
    ["query"],
    getProductApi
  );

  if (!productIsLoading) return <h1>Loading....</h1>;
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      data
    </div>
  );
}
