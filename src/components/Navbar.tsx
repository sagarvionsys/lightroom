"use client";
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  BellDot,
  CircleUser,
  House,
  Info,
  LogIn,
  LogOut,
  Mail,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";

export function Navbar() {
  const isLogin = true;

  const links = [
    {
      title: "Home",
      icon: <House size={28} absoluteStrokeWidth />,
      href: "/",
    },
    {
      title: "About",
      icon: <Info size={28} absoluteStrokeWidth />,
      href: "about",
    },
    {
      title: "Contact",
      icon: <Mail size={28} absoluteStrokeWidth />,
      href: "contact",
    },
    ...(isLogin
      ? [
          {
            title: "Notifications",
            icon: <BellDot size={28} absoluteStrokeWidth />,
            href: "notifications",
          },
          {
            title: "Bag",
            icon: <ShoppingBag size={28} absoluteStrokeWidth />,
            href: "bag",
          },
          {
            title: "Account",
            icon: <CircleUser size={28} absoluteStrokeWidth />,
            href: "account",
          },
          {
            title: "LogOut",
            icon: <LogOut size={28} absoluteStrokeWidth />,
            href: "sign-out",
          },
        ]
      : [
          {
            title: "Login",
            icon: <LogIn size={28} absoluteStrokeWidth />,
            href: "sign-in",
          },
        ]),
  ];

  return (
    <div className="flex items-center justify-center h-[8rem] w-full">
      <FloatingDock items={links} />
    </div>
  );
}
