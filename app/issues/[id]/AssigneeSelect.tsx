"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/components";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({
  issue: { id, assignedToUserId },
}: {
  issue: Issue;
}) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return null;
  }

  return (
    <>
      <Select.Root
        defaultValue={assignedToUserId || ""}
        onValueChange={(val) => {
          axios
            .patch("/api/issues/" + id, {
              assignedToUserId: val || null,
            })
            .catch(() => toast.error("Changes could not be saved."));
        }}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Group>
              <Select.Label>Suggestions</Select.Label>
              <Select.Item value="">Unassigned</Select.Item>
              {users?.map((item) => (
                <Select.Item value={item.id} key={item.id}>
                  {item.name}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
