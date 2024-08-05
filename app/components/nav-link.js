"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useCart } from "../user/_utils/cart-context";

export default function NavLink() {
  const pathname = usePathname();
  console.log(pathname);
  const links = [
    { href: "/user/order", label: "Order" },
    { href: "/user/profile", label: "Profile" },
  ];
  const { cartCount } = useCart();

  return (
    <nav className="flex justify-between p-4  border-2">
      <Link
        className={clsx("bg-slate-500 text-center p-2 rounded-2xl", {
          "bg-blue-300": pathname === "/user",
        })}
        href="/user"
      >
        e-commerce store
      </Link>
      <ul className="flex justify-around">
        <li>
          <Link
            className={clsx("bg-slate-500 text-center rounded-full p-2 m-2", {
              "bg-blue-300": pathname === "/user/cart",
            })}
            href="/user/cart"
          >
            Cart ({cartCount})
          </Link>
        </li>
        {links.map(({ href, label }) => (
          <li key={`${href}${label}`}>
            <Link
              className={clsx(
                "bg-slate-500 text-center rounded-full p-2 m-2    ",
                {
                  "bg-blue-300 ": pathname === href,
                }
              )}
              href={href}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
