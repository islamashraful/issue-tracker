import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

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
    <Box>
      <Heading>{issue.title}</Heading>
      <Flex my="2" className="space-x-3">
        <Text>{issue.createdAt.toDateString()}</Text>
        <IssueStatusBadge status={issue.status} />
      </Flex>
      <Card className="prose" mt="4">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </Box>
  );
};

export default IssueDetailPage;
