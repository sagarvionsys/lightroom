import Image from "next/image";
import React from "react";

const UserCard = ({ user }: { user: any }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-gray-700 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform">
        <div className="flex items-center gap-4">
          <Image
            alt="user"
            src={user?.image ?? "/user.png"}
            width={100}
            height={100}
            className="w-32 group-hover:w-36 group-hover:h-36 h-32 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
          />
          <div className="w-fit transition-all transform duration-500">
            {user?.email}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
