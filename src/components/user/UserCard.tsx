import Image from "next/image";
import React from "react";

const UserCard = ({ user }: { user: any }) => {
  return (
    <header className="bg-white shadow-lg rounded-lg p-2 flex items-center justify-between w-full max-w-sm mx-auto border border-gray-200 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center gap-6">
        <div className="relative w-20 h-20">
          <Image
            alt="User Avatar"
            src={user?.image ?? "/user.png"}
            layout="fill"
            objectFit="cover"
            className="rounded-full border-4 border-primary shadow-md"
          />
        </div>
        <div className="flex flex-col text-gray-800">
          <span className="text-2xl font-semibold text-gray-900">
            {user?.name ?? "User Name"}
          </span>
          <span className="text-sm text-gray-500 mt-1">
            {user?.email ?? "user@example.com"}
          </span>
        </div>
      </div>
    </header>
  );
};

export default UserCard;
