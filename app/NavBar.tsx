"use client";

import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classnames from "classnames";

const NavBar = () => {
  const links = [
    {
      title: "Dashboard",
      href: "/",
    },
    {
      title: "Issues",
      href: "/issues/list",
    },
  ];

  const pathname = usePathname();

  return (
    <nav className="flex border-b space-x-6 h-14 items-center px-5">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              className={classnames({
                "text-zinc-900": item.href === pathname,
                "text-zinc-500": item.href !== pathname,
                "hover:text-zinc-800 transition-colors": true,
              })}
              href={item.href}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
