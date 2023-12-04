import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Pagination } from "../../components";
import IssuesAction from "./IssuesAction";
import NextLink from "next/link";
import { Link } from "../../components";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string;
  };
}

const PAGE_SIZE = 10;

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  {
    label: "Issue",
    value: "title",
  },
  {
    label: "Status",
    value: "status",
    className: "hidden md:table-cell",
  },
  {
    label: "Created",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columns
    .map((item) => item.value)
    .includes(searchParams.orderBy)
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
    <div>
      <IssuesAction />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {searchParams.orderBy === column.value && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>
                <Link href={`/issues/${item.id}`}>{item.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={item.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={item.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {item.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        totalItems={toltaIssues}
        pageSize={PAGE_SIZE}
        currentPage={currentPage}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
