import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containerData: { label: string; count: number; status: Status }[] = [
    {
      label: "Open Issues",
      count: open,
      status: Status.OPEN,
    },
    {
      label: "In-progress Issues",
      count: inProgress,
      status: Status.IN_PROGRESS,
    },
    {
      label: "Closed Issues",
      count: closed,
      status: Status.CLOSED,
    },
  ];

  return (
    <Flex gap="4">
      {containerData.map((item) => (
        <Card key={item.label}>
          <Flex direction="column" gap="1">
            <Link
              href={`/issues/list?status=${item.status}`}
              className="text-sm font-medium"
            >
              {item.label}
            </Link>
            <Text size="5" className="font-bold">
              {item.count}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
