import Image from "next/image";
import React from "react";

const UserCard = ({ user }: { user: any }) => {
  return (
    <header className="bg-gray-900 shadow-md p-4 flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16">
          <Image
            alt="User Avatar"
            src={user?.image ?? "/user.png"}
            layout="fill"
            objectFit="cover"
            className="rounded-full border-2 border-gray-500"
          />
        </div>
        <div className="flex flex-col text-white">
          <span className="text-xl font-semibold">
            {user?.name ?? "User Name"}
          </span>
          <span className="text-sm text-gray-400">
            {user?.email ?? "user@example.com"}
          </span>
        </div>
      </div>
    </header>
  );
};

export default UserCard;
