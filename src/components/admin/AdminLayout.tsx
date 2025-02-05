"use client";

import React, { useState } from "react";
import AdminProductForm from "./ProductForm";
import { useQueryFunction } from "@/features/useQuery";
import { getProductApi } from "@/services/productApi";
import { IProduct } from "@/types/product.types";
import ProductCard from "../home/ProductCard";
import { ProductCardSkeleton } from "../Skeletons";
import { Modal } from "antd";

const AdminLayout = () => {
  const [ModalOpen, setModalOpen] = useState(false);
  const { data, isLoading: productIsLoading } = useQueryFunction(
    ["query"],
    getProductApi
  );
  const productList: IProduct[] = data?.productList || [];

  return (
    <>
      <button
        onClick={() => setModalOpen(!ModalOpen)}
        className="shadow-[0_0_0_3px_#000000_inset] ml-3 m-2 flex items-end px-6 py-2 bg-transparent border border-white text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
      >
        Add Product
      </button>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 px-4">
        {productIsLoading
          ? Array(4)
              .fill(null)
              .map((_, idx) => <ProductCardSkeleton key={idx} />)
          : productList?.map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))}
      </div>
      <Modal
        width={700}
        footer={null}
        open={ModalOpen}
        onCancel={() => setModalOpen(!ModalOpen)}
      >
        <AdminProductForm />
      </Modal>
    </>
  );
};

export default AdminLayout;
