import { Status } from "@prisma/client";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import LatestIssues from "./LatestIssues";

const Home = async () => {
  const openCount = await prisma.issue.count({
    where: { status: Status.OPEN },
  });
  const inProgressCount = await prisma.issue.count({
    where: { status: Status.IN_PROGRESS },
  });
  const closedCount = await prisma.issue.count({
    where: { status: Status.CLOSED },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary
          inProgress={inProgressCount}
          closed={closedCount}
          open={openCount}
        />
        <IssueChart
          inProgress={inProgressCount}
          closed={closedCount}
          open={openCount}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  );
};

export default Home;
