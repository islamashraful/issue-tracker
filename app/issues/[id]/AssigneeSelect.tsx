"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fn = async () => {
      const { data } = await axios.get<User[]>("/api/users");
      setUsers(data);
    };
    fn();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="1">Ashraful Islam</Select.Item>
          </Select.Group>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
