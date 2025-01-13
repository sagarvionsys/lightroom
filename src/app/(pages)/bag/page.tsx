"use client";

import BagSection from "@/components/home/BagSection";
import { useQueryFunction } from "@/features/useQuery";
import { getOrdersApi } from "@/services/orderApi";

const CartPage = () => {
  const { data: bagData, isLoading: bagDataLoading } = useQueryFunction(
    ["cart"],
    getOrdersApi
  );

  if (bagDataLoading) return <h1>Loading....</h1>;
  const { userOrder } = bagData;

  return <BagSection items={userOrder} />;
};

export default CartPage;
