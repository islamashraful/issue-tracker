"use client";

import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const { status, data } = useSession();
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
    <nav className="border-b px-5">
      <Container>
        <Flex py="3" justify="between">
          <Flex align="center" gap="2">
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
          </Flex>
          <Box>
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={data.user?.image || undefined}
                    fallback="?"
                    radius="full"
                    size="2"
                    className="cursor-pointer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{data.user?.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Log out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};
{
}

export default NavBar;
