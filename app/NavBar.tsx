import Link from "next/link";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const links = [
    {
      title: "Dashboard",
      href: "/",
    },
    {
      title: "Issues",
      href: "/issues",
    },
  ];

  return (
    <nav className="flex border-b space-x-6 h-14 items-center px-5">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
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
