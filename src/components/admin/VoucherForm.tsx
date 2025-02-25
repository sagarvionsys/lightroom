import { useQueryFunction } from "@/features/useQuery";
import useAddVoucher from "@/features/voucherMutations/useAddVoucher";
import { getVouchers } from "@/services/voucher";
import { IVoucher } from "@/types/voucher.types";
import { Edit2, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Spinner from "../Spinner";
import useDeleteVoucher from "@/features/voucherMutations/useDeleteVoucher";
import useUpdateVoucher from "@/features/voucherMutations/useUpdateVoucher";

const VoucherForm = () => {
  const { data, isLoading } = useQueryFunction(["voucher"], getVouchers);
  const { addVoucher, addVoucherPending } = useAddVoucher();
  const { deleteVoucher, deleteVoucherPending } = useDeleteVoucher();
  const { updatedVoucher, updatedVoucherPending } = useUpdateVoucher();

  const [editVoucherId, setEditVoucherId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const hasPending =
    isLoading ||
    addVoucherPending ||
    deleteVoucherPending ||
    updatedVoucherPending;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<IVoucher>({
    defaultValues: {
      name: "",
      voucherNumber: 0,
      code: "",
      amount: 0,
      isActive: true,
    },
  });

  // Function to handle form submission
  const onSubmit = (formData: IVoucher) => {
    if (editVoucherId) {
      updatedVoucher(
        { id: editVoucherId, data: formData },
        { onSuccess: () => reset() }
      );
      setEditVoucherId(null);
    } else {
      addVoucher(formData, { onSuccess: () => reset() });
    }
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    deleteVoucher(id, {
      onSettled: () => setDeleteId(null),
    });
  };

  const handleUpdate = (voucher: IVoucher) => {
    setEditVoucherId(voucher._id as string);
    setValue("name", voucher.name);
    setValue("voucherNumber", voucher.voucherNumber);
    setValue("code", voucher.code);
    setValue("amount", voucher.amount);
    setValue("isActive", voucher.isActive);
  };

  return (
    <div className="max-w-xl mx-auto bg-white  rounded-md">
      {/* Voucher Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700">Voucher Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 border rounded-lg"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="flex-1">
            <label className="block text-gray-700">Voucher Number</label>
            <input
              type="number"
              {...register("voucherNumber", {
                required: "Voucher Number is required",
              })}
              className="w-full p-2 border rounded-lg"
            />
            {errors.voucherNumber && (
              <p className="text-red-500 text-sm">
                {errors.voucherNumber.message}
              </p>
            )}
          </div>
        </div>

        {/* Code & Amount */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700">Code</label>
            <input
              type="text"
              {...register("code", { required: "Code is required" })}
              className="w-full p-2 border rounded-lg"
            />
            {errors.code && (
              <p className="text-red-500 text-sm">{errors.code.message}</p>
            )}
          </div>

          <div className="flex-1">
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              {...register("amount", {
                required: "Amount is required",
                min: { value: 1, message: "Amount must be greater than 0" },
              })}
              className="w-full p-2 border rounded-lg"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount.message}</p>
            )}
          </div>
        </div>

        {/* Is Active */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register("isActive")}
            className="w-5 h-5"
          />
          <label className="text-gray-700">Is Active</label>
        </div>

        {/* Submit Button */}
        <button
          disabled={hasPending}
          type="submit"
          className="w-full flex justify-center bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          {addVoucherPending || updatedVoucherPending ? (
            <Spinner />
          ) : (
            <>{editVoucherId ? "Update Voucher" : "Add Voucher"}</>
          )}
        </button>
      </form>

      {/* Voucher List */}
      <div className="mt-6 ">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Available Vouchers
        </h3>

        {data?.length > 0 ? (
          <div className="max-h-[15rem] overflow-y-scroll hideBar">
            <table className="w-full border-collapse bg-white rounded-md">
              <thead className="text-black bg-gray-200">
                <tr>
                  <th className="p-2 text-left">#</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">limit</th>
                  <th className="p-2 text-left">Code</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((voucher: IVoucher, index: number) => (
                  <tr
                    key={voucher._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{voucher.name}</td>
                    <td className="p-2">{voucher.voucherNumber}</td>
                    <td className="p-2">{voucher.code}</td>
                    <td className="p-2">Rs.{voucher.amount}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          voucher.isActive
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {voucher.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-2 flex space-x-4">
                      <button
                        onClick={() => handleUpdate(voucher)}
                        disabled={hasPending}
                        className="border p-2 rounded-md bg-gray-100 hover:bg-white transition-colors"
                      >
                        <Edit2 color="blue" />
                      </button>
                      <button
                        onClick={() => handleDelete(voucher._id as string)}
                        disabled={hasPending}
                        className="border p-2 rounded-md bg-gray-100 hover:bg-white transition-colors"
                      >
                        {deleteVoucherPending && deleteId === voucher?._id ? (
                          <Spinner />
                        ) : (
                          <Trash2 color="red" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">
            No vouchers available.
          </p>
        )}
      </div>
    </div>
  );
};

export default VoucherForm;
