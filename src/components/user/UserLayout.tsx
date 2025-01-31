import React from "react";
import UserCard from "./UserCard";
import { useQueryFunction } from "@/features/useQuery";
import { getOrdersApi } from "@/services/orderApi";
import BagSection from "../home/BagSection";

const UserLayout = ({ session }: any) => {
  const { data: bagData, isLoading: bagDataLoading } = useQueryFunction(
    ["cart"],
    getOrdersApi
  );

  if (bagDataLoading) return <h1>Loading....</h1>;
  const { userOrder } = bagData;

  return (
    <>
      <UserCard user={session?.user} />
      <BagSection items={userOrder} />;
    </>
  );
};

export default UserLayout;
