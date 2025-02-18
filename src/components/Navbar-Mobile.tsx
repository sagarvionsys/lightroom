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

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}

export function Navbar_MT() {
  const { data: session } = useSession();
  const isLogin = Boolean(session?.user);

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const links = [
    { title: "Home", icon: House, href: "/" },
    ...(isLogin
      ? [
          { title: "Notifications", icon: BellDot, href: "/notifications" },
          { title: "Cart", icon: ShoppingCart, href: "/cart" },
          { title: "Account", icon: CircleUser, href: "/account" },
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
        {/* Updated Typography to h1 */}
        <h1 className="text-2xl font-bold text-white">LightRoom</h1>

        <button onClick={handleOpen}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <Collapse open={open}>
        <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
          <div className="flex flex-col gap-4 justify-start">
            {links.map(({ title, icon: Icon, href }) => (
              <Link
                href={href || "/"}
                className="flex gap-2 font-medium text-white"
              >
                <div className="w-full flex items-center gap-3">
                  <Icon />
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
