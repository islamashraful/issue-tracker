import { Button } from "@radix-ui/themes";

const IssueDeleteButton = ({ issueId }: { issueId: number }) => (
  <Button color="red">Delete Issue</Button>
);

export default IssueDeleteButton;
