"use client"

import * as React from "react"
import { z } from "zod"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { IconDotsVertical } from "@tabler/icons-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import Link from "next/link"

export const schema = z.object({
  id: z.string().or(z.number()), // Add id to schema for navigation
  name: z.string(),
  email: z.string(),
  role: z.string(),
  organization: z.string(),
})

type UserRow = z.infer<typeof schema>

const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (user: UserRow) => user.name,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (user: UserRow) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {user.email}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "organization",
    header: "Organization",
    cell: (user: UserRow) => (
      <div className="w-32 truncate">{user.organization}</div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: (user: UserRow) => (
      <div className="w-32 truncate">{user.role}</div>
    ),
  },
  {
    id: "actions",
    cell: (user: UserRow) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem asChild>
            <Link href={`/admin/users/${user.id}`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

export function UserTable({
  data,
}: {
  data: (Omit<z.infer<typeof schema>, "id"> & { id: string | number })[]
}) {
  return (
    <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.accessorKey ?? col.id}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="**:data-[slot=table-cell]:first:w-8">
            {data && data.length > 0 ? (
              data.map((user, idx) => (
                <TableRow key={user.id ?? idx}>
                  {columns.map((col) => (
                    <TableCell key={col.accessorKey ?? col.id}>
                      {typeof col.cell === "function"
                        ? col.cell(user)
                        : user[col.accessorKey as keyof typeof user]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
