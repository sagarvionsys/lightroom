import React, { useState } from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
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

function NavItem({ children, href }: NavItemProps) {
  return (
    <li>
      <Link
        href={href || "/"}
        className="flex items-center justify-center gap-2 font-medium text-white"
      >
        <Typography variant="small" color="white">
          {children}
        </Typography>
      </Link>
    </li>
  );
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
      className=" bg-black border-0 sticky top-0 z-50"
    >
      <div className="flex items-center justify-between ">
        <Typography color="white" className="text-xl mt-5 font-bold">
          LightRoom
        </Typography>
        <IconButton variant="text" color="white" onClick={handleOpen}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
          <ul className="flex flex-col gap-4">
            {links.map(({ title, icon: Icon, href }) => (
              <NavItem key={title} href={href}>
                <Icon size={20} />
                {title}
              </NavItem>
            ))}
          </ul>
          <div className="mt-6 mb-4 flex flex-col gap-2">
            <Button variant="text" color="white" onClick={handleAuthAction}>
              {isLogin ? "Log Out" : "Sign In"}
            </Button>
          </div>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar_MT;
