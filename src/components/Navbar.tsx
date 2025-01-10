"use client";
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  BellDot,
  CircleUser,
  House,
  Info,
  LogOut,
  Mail,
  ShoppingCart,
} from "lucide-react";

export function Navbar() {
  const isLogin = true; // Change this to false to hide the account link
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
    {
      title: "Notifications",
      icon: <BellDot size={28} absoluteStrokeWidth />,
      href: "notifications",
    },
    {
      title: "Cart",
      icon: <ShoppingCart size={28} absoluteStrokeWidth />,
      href: "cart",
    },
    ...(isLogin
      ? [
          {
            title: "Account",
            icon: <CircleUser size={28} absoluteStrokeWidth />,
            href: "account",
          },
          {
            title: "LogOut",
            icon: <LogOut size={28} absoluteStrokeWidth />,
            href: "account",
          },
        ]
      : []),
  ];

  return (
    <div className="flex items-center justify-center h-[8rem] w-full">
      <FloatingDock items={links} />
    </div>
  );
}
