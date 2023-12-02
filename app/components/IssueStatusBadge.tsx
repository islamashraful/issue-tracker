import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const issueRecord: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => (
  <Badge color={issueRecord[status].color}>{issueRecord[status].label}</Badge>
);

export default IssueStatusBadge;
