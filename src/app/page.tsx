"use client";

import ProductCard from "@/components/home/ProductCard";
import { ProductCardSkeleton } from "@/components/Skeletons";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { useQueryFunction } from "@/features/useQuery";
import { getProductApi } from "@/services/productApi";
import { IProduct } from "@/types/product.types";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState<FormDataEntryValue | null>(null);

  const { data, isLoading: productIsLoading } = useQueryFunction(
    ["query"],
    getProductApi
  );
  const productList: IProduct[] = query
    ? data.productList.filter((d: IProduct) =>
        d?.name.toLowerCase().includes(query.toString().toLowerCase())
      )
    : data?.productList || [];

  const handleSearchProduct = (data: FormData) => setQuery(data?.get("query"));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-18 mt-6">
      {/* search Bar */}
      <form
        action={handleSearchProduct}
        className="w-full max-w-md pb-4 px-3 flex justify-center items-center gap-3"
      >
        <input
          name="query"
          required
          className=" text-white w-full bg-transparent placeholder:text-slate-400 text-sm border border-slate-300 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Search for..."
        />
        <button
          className="border-slate-300 border p-1 rounded-md"
          type="submit"
        >
          Search
        </button>
      </form>

      {query && productList && (
        <div className="flex gap-2 justify-center items-center">
          <span>Result for {query.toString()}</span>
          <button
            onClick={() => setQuery(null)}
            className="border-slate-300 border p-1 rounded-md"
          >
            Clear
          </button>
        </div>
      )}
      {productList?.length === 0 && (
        <p className="text-white py-12 text-lg">No Images found</p>
      )}
      {/* product list */}
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
