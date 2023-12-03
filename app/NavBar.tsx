"use client";

import Link from "next/link";
import { Skeleton } from "@/app/components";
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

const NavBar = () => {
  return (
    <nav className="border-b px-5">
      <Container>
        <Flex py="3" justify="between">
          <Flex align="center" gap="2">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <ul className="flex space-x-6">
      {links.map((item) => (
        <li key={item.href}>
          <Link
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": item.href === pathname,
            })}
            href={item.href}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data } = useSession();

  if (status === "loading") {
    return <Skeleton width="3rem" />;
  }

  if (status === "unauthenticated") {
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );
  }

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={data?.user?.image || undefined}
            fallback="?"
            radius="full"
            size="2"
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{data?.user?.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
