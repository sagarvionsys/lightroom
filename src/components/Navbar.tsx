"use client";

import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  BellDot,
  CircleUser,
  House,
  LogIn,
  LogOut,
  ShoppingCart,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useQueryFunction } from "@/features/useQuery";
import { getNotifications } from "@/services/NotificationsApi";
import { INotification } from "@/types/notification.types";
import useLogOut from "@/features/authMutations/useLogout";
import Spinner from "./Spinner";
import Link from "next/link";

export function Navbar() {
  const { data: session } = useSession();
  const isLogin = session?.user;
  const { logOut, logOutPending } = useLogOut();

  // Fetch notifications
  const { data: notifications = [] } = useQueryFunction(
    ["notifications"],
    getNotifications
  );
  const hasUnread = Array.isArray(notifications)
    ? notifications?.some((note: INotification) => !note?.isRead)
    : false;

  const links = [
    {
      title: "Home",
      icon: <House size={28} absoluteStrokeWidth />,
      href: "/",
    },
    ...(isLogin
      ? [
          {
            title: "Notifications",
            icon: (
              <div className="relative">
                <BellDot size={28} absoluteStrokeWidth />
                {hasUnread && (
                  <span className="absolute top-1 right-0.5 w-3 h-3 bg-red-500 rounded-full"></span>
                )}
              </div>
            ),
            href: "/notifications",
          },
          {
            title: "Cart",
            icon: <ShoppingCart size={28} absoluteStrokeWidth />,
            href: "/cart",
          },
          {
            title: "Account",
            icon: <CircleUser size={28} absoluteStrokeWidth />,
            href: "/account",
          },
        ]
      : [
          {
            title: "Login",
            icon: <LogIn size={28} absoluteStrokeWidth />,
            href: "/sign-in",
          },
        ]),
  ];

  return (
    <>
      <div className="flex items-center justify-between h-[8rem] w-full px-12">
        <Link href={"/"} className="hidden md:flex">
          <h1 className=" text-2xl font-bold text-white">LightRoom</h1>
        </Link>
        <FloatingDock items={links} />

        {isLogin && (
          <div className="group relative p-6">
            <button onClick={() => logOut()}>
              {logOutPending ? <Spinner /> : <LogOut />}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
