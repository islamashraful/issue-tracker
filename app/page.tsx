import { Status } from "@prisma/client";
import IssueSummary from "./IssueSummary";
// import LatestIssues from "./LatestIssues";
import prisma from "@/prisma/client";

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
    <IssueSummary
      inProgress={inProgressCount}
      closed={closedCount}
      open={openCount}
    />
  );
};

export default Home;
