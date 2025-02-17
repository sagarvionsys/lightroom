"use client";

import { toINR } from "@/utils/converteToINR";
import React, { useState } from "react";
import _ from "lodash";
import { MoveRight, X } from "lucide-react";
import Link from "next/link";
import useVerifyVoucher from "@/features/voucherMutations/useVerifyVoucher";
import Spinner from "../Spinner";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { addOrderApi } from "@/services/orderApi";

const CheckOut = ({ variant, product }: { variant: any; product: any }) => {
  const { data: session } = useSession();
  const { verifyVoucher, verifyVoucherPending } = useVerifyVoucher();

  const totalBill = variant?.price || 0;

  const [voucherName, setVoucherName] = useState<string>("");
  const [voucherAmount, setVoucherAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(totalBill);

  // Handle verifying voucher
  const handleVoucher = (data: FormData) => {
    const code = data.get("voucher") as string;
    verifyVoucher(code, {
      onSuccess: (res) => {
        const { name, amount } = res.voucher;
        setVoucherName(name);
        setVoucherAmount(amount);
        setTotalAmount(totalBill - amount);
      },
    });
  };

  // Handle resetting voucher
  const resetVoucher = () => {
    setVoucherName("");
    setVoucherAmount(0);
    setTotalAmount(totalBill);
  };

  // Handle purchase action
  const handlePurchase = async () => {
    if (!session) {
      toast.error("Please log in to purchase the item");
      return;
    }

    if (variant)
      try {
        const data = await addOrderApi({
          productId: product?._id,
          variant: variant,
        });

        const { orderId, amount } = data;
        const rzpOptions = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: amount,
          currency: "INR",
          name: "LightRoom Shop",
          description: `${product?.name} - ${variant?.type} Version`,
          order_id: orderId,
          handler: () => toast.success("Payment successful!"),
          prefill: {
            email: session.user.email,
          },
        };

        const rzp = new (window as any).Razorpay(rzpOptions);
        rzp.open();
      } catch (error) {
        console.error("Purchase failed:", error);
        toast.error("Purchase failed. Please try again.");
      }
  };

  return (
    <div className="mx-auto mt-6 max-w-4xl space-y-6 lg:w-full">
      <div className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6">
        <p className="text-xl font-semibold text-white">Order summary</p>
        <div className="space-y-4">
          <dl className="flex items-center justify-between">
            <dt className="text-base text-gray-400">Original price</dt>
            <dd className="text-base text-white">{toINR(totalBill)}</dd>
          </dl>

          {voucherName && (
            <dl className="flex items-center justify-between">
              <dt className="text-base text-gray-400">Voucher</dt>
              <dd className="flex items-center text-red-600 gap-2">
                - {toINR(voucherAmount)}
                <span className="text-sm text-gray-400 bg-black p-1 rounded-lg flex gap-2">
                  <p>{voucherName}</p>
                  <button onClick={resetVoucher}>
                    <X size={12} />
                  </button>
                </span>
              </dd>
            </dl>
          )}

          <dl className="flex items-center justify-between">
            <dt className="text-base text-gray-400">Savings</dt>
            <dd className="text-base text-green-600">{toINR(voucherAmount)}</dd>
          </dl>

          <dl className="flex items-center justify-between border-t border-gray-700 pt-2">
            <dt className="text-base font-bold text-white">Total</dt>
            <dd className="text-base font-bold text-white">
              {toINR(totalAmount)}
            </dd>
          </dl>
        </div>

        <button
          onClick={handlePurchase}
          className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-800"
        >
          Proceed to Checkout
        </button>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm text-gray-400">or</span>
          <Link
            href="/"
            className="text-sm text-primary-500 underline hover:no-underline flex items-center gap-2"
          >
            Continue Shopping <MoveRight />
          </Link>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleVoucher(new FormData(e.currentTarget));
          }}
        >
          <label className="text-sm text-white block">
            Do you have a voucher or gift card?
          </label>
          <input
            name="voucher"
            type="text"
            className="w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500"
            placeholder="Enter voucher code"
            required
          />

          <button
            disabled={verifyVoucherPending}
            type="submit"
            className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-800"
          >
            {verifyVoucherPending ? <Spinner /> : "Apply Code"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
