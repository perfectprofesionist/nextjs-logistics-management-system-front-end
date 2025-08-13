"use client";

import { UserTable } from "@/components/user-table";
import React, { useEffect, useState } from "react";
import { UsersListing } from "@/lib/user/users";

type UserApiResponse = {
  id: string | number;
  name?: string;
  email?: string;
  organization?: { name?: string };
  role?: { name?: string };
  [key: string]: unknown;
};

// Match the UserTableRow type to what UserTable expects (id: string | number)
type UserTableRow = {
  id: string | number;
  name: string;
  email: string;
  organization: string;
  role: string;
};

const Users = () => {
  const [data, setData] = useState<UserTableRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const users = await UsersListing();
        // Map the response to only include name, email, organization.name, role.name
        const mappedData: UserTableRow[] = Array.isArray(users)
          ? users.map((user: UserApiResponse) => ({
              id: user.id ?? "",
              name: user.name ?? "",
              email: user.email ?? "",
              organization: user.organization?.name ?? "",
              role: user.role?.name ?? "",
            }))
          : [];
        setData(mappedData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Failed to fetch users");
        } else {
          setError("Failed to fetch users");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="p-8">Loading users...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <UserTable data={data} />
        </div>
      </div>
    </div>
  );
};

export default Users;
