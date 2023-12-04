import prisma from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import { IssueStatusBadge, Pagination } from "../../components";
import IssuesAction from "./IssuesAction";

import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import IssuesTable, { ISSUE_COLUMNS } from "./IssuesTable";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string;
  };
}

const PAGE_SIZE = 10;

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = ISSUE_COLUMNS.includes(searchParams.orderBy)
    ? {
        [searchParams.orderBy]: "asc",
      }
    : undefined;

  const currentPage = +searchParams.page || 1;
  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });
  const toltaIssues = await prisma.issue.count({ where: { status } });

  return (
    <Flex direction="column" gap="3">
      <IssuesAction />
      <IssuesTable searchParams={searchParams} issues={issues} />
      <Pagination
        totalItems={toltaIssues}
        pageSize={PAGE_SIZE}
        currentPage={currentPage}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
