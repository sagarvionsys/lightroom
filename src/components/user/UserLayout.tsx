import React from "react";
import UserCard from "./UserCard";
import { useQueryFunction } from "@/features/useQuery";
import { getOrdersApi } from "@/services/orderApi";
import BagSection from "../home/BagSection";
import { MyOrderCardSkeleton } from "../Skeletons";

const UserLayout = ({ session }: any) => {
  const { data: bagData, isLoading: bagDataLoading } = useQueryFunction(
    ["cart"],
    getOrdersApi
  );

  return (
    <>
      <UserCard user={session?.user} />
      <h1 className="text-4xl font-bold my-2 text-primary-content text-center">
        My Orders
      </h1>
      {bagDataLoading &&
        Array(2)
          .fill(null)
          .map((_, idx) => <MyOrderCardSkeleton key={idx} />)}
      {bagData?.userOrder && <BagSection items={bagData?.userOrder} />}
    </>
  );
};

export default UserLayout;
