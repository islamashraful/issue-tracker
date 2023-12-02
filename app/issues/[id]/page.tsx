import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: +id,
    },
  });

  await delay(3000);

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex my="2" className="space-x-3">
        <Text>{issue.description}</Text>
        <IssueStatusBadge status={issue.status} />
      </Flex>
      <Card>{issue.createdAt.toDateString()}</Card>
    </div>
  );
};

export default IssueDetailPage;
