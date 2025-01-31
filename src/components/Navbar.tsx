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
import { signOut, useSession } from "next-auth/react";

export function Navbar() {
  const { data: session } = useSession();
  const isLogin = session?.user;

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
            icon: <BellDot size={28} absoluteStrokeWidth />,
            href: "/notifications",
          },
          {
            title: "cart",
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
    <div className="flex items-center justify-center h-[8rem] w-full">
      <FloatingDock items={links} />

      {isLogin && (
        <div className="group relative p-6">
          <button onClick={() => signOut()}>
            <LogOut />
          </button>
        </div>
      )}
    </div>
  );
}
