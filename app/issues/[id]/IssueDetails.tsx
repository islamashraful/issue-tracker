import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import Markdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => (
  <>
    <Heading>{issue.title}</Heading>
    <Flex my="2" className="space-x-3">
      <Text>{issue.createdAt.toDateString()}</Text>
      <IssueStatusBadge status={issue.status} />
    </Flex>
    <Card className="prose max-w-full" mt="4">
      <Markdown>{issue.description}</Markdown>
    </Card>
  </>
);

export default IssueDetails;
