"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import UserLayout from "@/components/user/UserLayout";
import { useSession } from "next-auth/react";
import React from "react";

const AccountPage = () => {
  const { data: session } = useSession();

  if (!session?.user.role) return null;

  return session?.user?.role === "admin" ? (
    <AdminLayout />
  ) : (
    <UserLayout session={session} />
  );
};

export default AccountPage;
