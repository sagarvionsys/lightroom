"use client";

import useQueryFunction from "@/features/useQuery";
import { getProductApi } from "@/services/productApi";

export default function Home() {
  const { data: products, isLoading: productIsLoading } = useQueryFunction(
    ["query"],
    getProductApi
  );

  // if (!productIsLoading) return <h1>Loading....</h1>;
  return (
    <div className="flex flex-col ">
      <h1>{JSON.stringify(products)}</h1>
    </div>
  );
}
