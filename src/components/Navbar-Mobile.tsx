import React, { useState } from "react";
import { Navbar as MTNavbar, Collapse } from "@material-tailwind/react";
import { signOut, useSession } from "next-auth/react";
import {
  BellDot,
  CircleUser,
  House,
  Menu,
  ShoppingCart,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQueryFunction } from "@/features/useQuery";
import { getNotifications } from "@/services/NotificationsApi";
import { INotification } from "@/types/notification.types";

export function Navbar_MT() {
  const { data: session } = useSession();
  const isLogin = Boolean(session?.user);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { data: notifications = [] } = useQueryFunction(
    ["notifications"],
    getNotifications
  );

  const hasUnread = Array.isArray(notifications)
    ? notifications?.some((note: INotification) => !note?.isRead)
    : false;

  const links = [
    { title: "Home", icon: <House />, href: "/" },
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
          { title: "Cart", icon: <ShoppingCart />, href: "/cart" },
          { title: "Account", icon: <CircleUser />, href: "/account" },
        ]
      : []),
  ];

  const handleOpen = () => setOpen((cur) => !cur);
  const handleAuthAction = () =>
    isLogin ? signOut() : router.push("/sign-in");

  return (
    <MTNavbar
      shadow={false}
      fullWidth
      className="bg-black border-0 sticky top-0 z-50"
      placeholder=""
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
    >
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-white">LightRoom</h1>

        <button onClick={handleOpen}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <Collapse open={open}>
        <div className="container mx-auto mt-3 border-y border-gray-200 px-2 pt-4">
          <div className="flex flex-col gap-4 justify-start">
            {links.map(({ title, icon, href }, index) => (
              <Link
                key={index}
                href={href || "/"}
                className="flex gap-2 font-medium text-white"
              >
                <div className="w-full flex items-center gap-3">
                  {icon}
                  <span className="text-sm">{title}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 mb-4 flex flex-col gap-2">
            <button onClick={handleAuthAction}>
              {isLogin ? "Log Out" : "Sign In"}
            </button>
          </div>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar_MT;
