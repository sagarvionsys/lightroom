import React from "react";
import UserCard from "./UserCard";

const UserLayout = ({ session }: any) => {
  return <UserCard user={session?.user} />;
};

export default UserLayout;
