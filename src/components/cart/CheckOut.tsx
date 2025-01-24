"use client";

import { ICart } from "@/types/cart.types";
import { toINR } from "@/utils/converteToINR";
import React, { useState } from "react";
import _ from "lodash";
import { MoveRight, X } from "lucide-react";
import Link from "next/link";
import useVerifyVoucher from "@/features/voucherMutations/useVerifyVoucher";
import Spinner from "../Spinner";

const CheckOut = ({ product }: { product: ICart[] }) => {
  const { verifyVoucher, verifyVoucherPending } = useVerifyVoucher();

  const [voucherName, setVoucherName] = useState<string>("");
  const [voucherAmount, setVoucherAmount] = useState<number>(0);

  const totalBill = _.sumBy(product, (item) => item?.variant?.price);

  const handleVoucher = (data: FormData) => {
    const code = data.get("voucher") as string;
    verifyVoucher(code, {
      onSuccess: (res) => {
        setVoucherName(res.voucher.name);
        setVoucherAmount(res.voucher.amount);
      },
    });
  };

  const resetVoucher = () => {
    setVoucherName("");
    setVoucherAmount(0);
  };

  return (
    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
      <div className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6">
        <p className="text-xl font-semibold text-white">Order summary</p>

        <div className="space-y-4">
          <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-400">
                Original price
              </dt>
              <dd className="text-base font-medium text-white">
                {toINR(totalBill)}
              </dd>
            </dl>

            {voucherName && (
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-400">Voucher</dt>
                <dd className="flex items-center text-base font-medium text-red-600 gap-2">
                  <div className="flex flex-col justify-center items-center">
                    - {toINR(voucherAmount)}
                    <span className="text-sm text-gray-400 flex gap-2 bg-black p-1 rounded-lg">
                      <p>{voucherName}</p>
                      <button onClick={resetVoucher}>
                        <X size={12} />
                      </button>
                    </span>
                  </div>
                </dd>
              </dl>
            )}

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-400">Savings</dt>
              <dd className="text-base font-medium text-green-600">
                {toINR(voucherAmount)}
              </dd>
            </dl>
          </div>

          <dl className="flex items-center justify-between gap-4 border-t border-gray-700 pt-2">
            <dt className="text-base font-bold text-white">Total</dt>
            <dd className="text-base font-bold text-white">
              {toINR(totalBill - voucherAmount)}
            </dd>
          </dl>
        </div>

        <a
          href="#"
          className="flex w-full items-center justify-center rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-800"
        >
          Proceed to Checkout
        </a>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-400"> or </span>
          <Link
            href={"/"}
            title=""
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-500 underline hover:no-underline"
          >
            Continue Shopping
            <MoveRight />
          </Link>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            handleVoucher(data);
          }}
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Do you have a voucher or gift card?
            </label>
            <input
              name="voucher"
              type="text"
              id="voucher"
              className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder:text-gray-400 focus:border-primary-500 focus:ring-primary-500"
              placeholder="Enter voucher code"
              required
            />
          </div>
          <button
            disabled={verifyVoucherPending}
            type="submit"
            className="flex w-full items-center justify-center rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-800"
          >
            {verifyVoucherPending ? <Spinner /> : "Apply Code"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
