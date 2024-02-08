"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import axios from "axios"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"




export type userType = {
  _id: string,
  name: string,
  slug: string,
  coverImage: string,
  link: string,
  createdAt: string,
  status: string,
  verified: boolean,
  pricing_type: string,
}


export const columns: ColumnDef<userType>[] = [
  {
    id: "select",
    accessorKey: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return <div className="text-left font-medium">
        <Link href={`/admin/tools/${row.original._id}`} className="hover:underline">
          {row.getValue("name")}
        </Link>

      </div>
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
    id: "pricing_type",
    accessorKey: "pricing_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pricing Type" />
    ),
    cell: ({ row }) => {
      return <Badge className="text-left font-medium" variant="default_light">{row.getValue("pricing_type")}</Badge>
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
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const formatted = new Date(row.getValue("createdAt")).toLocaleDateString("en-US", {
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
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => toast.promise(navigator.clipboard.writeText(tool._id), {
              loading: 'Copying...',
              success: 'ID copied to clipboard',
              error: 'Failed to copy ID'
            })}> Copy ID </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              console.log("deleting tool ", tool);
              toast.promise(axios.delete(`/api/tool/delete?userId=${tool._id}`), {
                loading: 'Deleting...',
                success: 'User deleted',
                error: (error) => error.response.data.message
              })
            }}>
              <span className="text-red-600">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
