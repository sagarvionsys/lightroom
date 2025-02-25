"use client";

import { toINR } from "@/utils/converteToINR";
import React, { useState } from "react";
import { MoveRight, X } from "lucide-react";
import Link from "next/link";
import useVerifyVoucher from "@/features/voucherMutations/useVerifyVoucher";
import Spinner from "../Spinner";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { addOrderApi } from "@/services/orderApi";
import { useRouter } from "next/navigation";

const CheckOut = ({ variant, product }: { variant: any; product: any }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { verifyVoucher, verifyVoucherPending } = useVerifyVoucher();

  const totalBill = variant?.price || 0;
  const [voucherName, setVoucherName] = useState<string>("");
  const [voucherAmount, setVoucherAmount] = useState<number>(0);
  const [voucherId, setVoucherId] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(totalBill);

  // Handle verifying voucher
  const handleVoucher = (data: FormData) => {
    const code = data.get("voucher") as string;
    verifyVoucher(code, {
      onSuccess: (res) => {
        const { name, amount, _id } = res.voucher;
        setVoucherName(name);
        setVoucherAmount(amount);
        setVoucherId(_id);

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
          variant,
          voucherAmount,
          voucherId,
        });

        const { orderId, amount } = data;
        const rzpOptions = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: amount,
          currency: "INR",
          name: "LightRoom Shop",
          description: `${product?.name} - ${variant?.type} Version`,
          order_id: orderId,
          handler: () => {
            toast.success("Payment successful!");
            router.push("/account");
          },
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
    <div className="max-w-5xl space-y-6 sm:p-6 md:w-full">
      {/* Order Summary */}
      <div className="space-y-4 rounded-lg bg-white">
        <p className="text-xl font-semibold text-black">Order Summary</p>

        <div className="space-y-4">
          {/* Original Price */}
          <dl className="flex items-center justify-between">
            <dt className="text-base text-gray-800">Original price</dt>
            <dd className="text-base font-medium text-gray-500">
              {toINR(totalBill)}
            </dd>
          </dl>

          {/* Voucher Applied */}
          {voucherName && (
            <dl className="flex items-center justify-between">
              <dt className="text-base text-gray-500">Voucher</dt>
              <dd className="flex items-center text-red-600 gap-2">
                - {toINR(voucherAmount)}
                <span className="text-sm bg-gray-200 text-black px-2 py-1 rounded-lg flex items-center gap-2">
                  <p>{voucherName}</p>
                  <button onClick={resetVoucher}>
                    <X size={12} />
                  </button>
                </span>
              </dd>
            </dl>
          )}

          {/* Savings */}
          <dl className="flex items-center justify-between">
            <dt className="text-base text-gray-600">Savings</dt>
            <dd className="text-base text-green-600">{toINR(voucherAmount)}</dd>
          </dl>

          {/* Total Amount */}
          <dl className="flex items-center justify-between border-t pt-2 border-gray-300">
            <dt className="text-lg font-bold text-black">Total</dt>
            <dd className="text-lg font-bold text-black">
              {toINR(totalAmount)}
            </dd>
          </dl>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handlePurchase}
          className="w-full rounded-lg bg-blue-500 px-5 py-3 text-white text-lg font-semibold transition hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
        >
          Proceed to Checkout
        </button>

        {/* Continue Shopping Link */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <span className="text-sm text-gray-500">or</span>
          <Link
            href="/"
            className="text-sm text-blue-600 underline hover:no-underline flex items-center gap-2"
          >
            Continue Shopping <MoveRight />
          </Link>
        </div>
      </div>

      {/* Voucher Section */}
      <div className="space-y-4 rounded-lg border bg-white p-4 shadow-sm sm:p-6">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleVoucher(new FormData(e.currentTarget));
          }}
        >
          <label className="text-sm text-black block">
            Do you have a voucher or gift card?
          </label>
          <input
            name="voucher"
            type="text"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
            placeholder="Enter voucher code"
            required
          />

          <button
            disabled={verifyVoucherPending}
            type="submit"
            className="w-full flex justify-center rounded-lg bg-green-500 px-5 text-center py-2.5 text-white font-semibold transition hover:bg-green-600 focus:ring-4 focus:ring-green-600"
          >
            {verifyVoucherPending ? <Spinner /> : "Apply Code"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
