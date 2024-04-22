"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"




export type toolType = {
  _id: string,
  name: string,
  slug: string,
  coverImage: string,
  link: string,
  updatedAt: string,
  status: string,
  verified: boolean,
  views: number,
  bookmarks: string[],
}


export const columns: ColumnDef<toolType>[] = [
  // {
  //   id: "select",
  //   accessorKey: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.getValue("name")}</div>
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "link",
    accessorKey: "link",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Links" />
    ),
    cell: ({ row }) => {
      return <Link className="text-left font-medium text-primary hover:underline" href={row.getValue("link")} target="_blank" >{row.getValue("link")}</Link>
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return <div className="text-left font-medium" >
        <Badge variant={row.getValue("status") === "published" ? "success_light" : "warning_light"}>
          {row.getValue("status")}
        </Badge>
      </div>
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "views",
    accessorKey: "views",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Views" />
    ),
    cell: ({ row }) => {
      return <Badge className="text-left font-medium" variant="default_light">{row.getValue("views")}</Badge>
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "verified",
    accessorKey: "verified",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Verified" />
    ),
    cell: ({ row }) => {
      return <div className="text-left font-medium">
        <Badge variant={row.getValue("verified") ? "success_light" : "destructive_light"}>
          {row.getValue("verified") ? "Yes" : "No"}
        </Badge>
      </div>
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "updatedAt",
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => {
      const formatted = new Date(row.getValue("updatedAt")).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      return <div className="text-left font-medium">{formatted}</div>
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: "Actions",
    enableSorting: false,
    enableHiding: true,
    cell: ({ row }) => {
      const tool = row.original;
      return (<Button variant="link" size="sm" asChild>
        <Link href={`/admin/tools/${tool.slug}/edit`}>
          Edit
        </Link>
      </Button>)
    },
  },
]
