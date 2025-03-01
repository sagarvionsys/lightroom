"use client";

import React, { useState } from "react";
import AdminProductForm from "./ProductForm";
import { useQueryFunction } from "@/features/useQuery";
import { getProductApi } from "@/services/productApi";
import { IProduct } from "@/types/product.types";
import ProductCard from "../home/ProductCard";
import { ProductCardSkeleton } from "../Skeletons";
import { Modal } from "antd";
import AdminNotification from "./AdminNotification";
import { BadgeIndianRupee, PlusCircle } from "lucide-react";
import { IconNotification } from "@tabler/icons-react";
import VoucherForm from "./VoucherForm";

const AdminLayout = () => {
  const [ModalOpen, setModalOpen] = useState(false);
  const [NotificationModalOpen, setNotificationModalOpen] = useState(false);
  const [VoucherModal, setVoucherModal] = useState(false);

  const { data, isLoading: productIsLoading } = useQueryFunction(
    ["query"],
    getProductApi
  );

  const productList: IProduct[] = data?.productList || [];

  return (
    <>
      <div className="flex flex-wrap justify-center w-full items-center mx-auto px-2 py-6">
        <button
          onClick={() => setModalOpen(!ModalOpen)}
          className="w-full sm:w-auto shadow-[0_0_0_3px_#000000_inset] m-2 pr-9 text-center justify-center flex gap-2 items-center px-3 py-2 bg-transparent border border-gray-400  text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
        >
          <PlusCircle />
          Products
        </button>
        <button
          onClick={() => setNotificationModalOpen(!NotificationModalOpen)}
          className="w-full sm:w-auto shadow-[0_0_0_3px_#000000_inset] m-2 flex gap-2 justify-center items-center px-2 py-2 bg-transparent border border-gray-400 text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
        >
          <IconNotification />
          Notifications
        </button>
        <button
          onClick={() => setVoucherModal(!VoucherModal)}
          className="w-full sm:w-auto shadow-[0_0_0_3px_#000000_inset] m-2 pr-8 flex gap-2 justify-center items-center px-2 py-2 bg-transparent border border-gray-400 text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
        >
          <BadgeIndianRupee />
          Vouchers
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 px-4 hideBar">
        {productIsLoading
          ? Array(4)
              .fill(null)
              .map((_, idx) => <ProductCardSkeleton key={idx} />)
          : productList?.map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))}
      </div>

      {/* product create form */}
      <Modal
        width={700}
        footer={null}
        open={ModalOpen}
        onCancel={() => setModalOpen(!ModalOpen)}
      >
        <AdminProductForm />
      </Modal>

      {/* add Notifications modal */}
      <Modal
        width={600}
        footer={null}
        open={NotificationModalOpen}
        onCancel={() => setNotificationModalOpen(!NotificationModalOpen)}
      >
        <AdminNotification />
      </Modal>

      {/* add Voucher modal */}
      <Modal
        width={600}
        footer={null}
        open={VoucherModal}
        onCancel={() => setVoucherModal(!VoucherModal)}
      >
        <VoucherForm />
      </Modal>
    </>
  );
};

export default AdminLayout;
