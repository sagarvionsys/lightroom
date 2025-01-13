"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import UserLayout from "@/components/user/UserLayout";
import { useSession } from "next-auth/react";
import React from "react";

const AccountPage = () => {
  const { data: session } = useSession();

  return session?.user?.role === "admin" ? (
    <AdminLayout />
  ) : (
    <UserLayout session={session} />
  );
};

export default AccountPage;
