import * as React from "react"
import { useNavigate } from "react-router-dom"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { MdEdit } from "react-icons/md"
import { FaPlay } from "react-icons/fa"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { Quiz } from "@/types/Quiz.ts"
import QuizOptions from "@/components/custom/quiz_overview/QuizOptions.tsx"
import NewQuizButton from "@/components/custom/quiz_overview/NewQuizButton.tsx"

interface QuizSessionOverviewTableProps {
  data: Quiz[]
  loading?: boolean
}

export default function QuizOverviewTable({ data, loading = false }: QuizSessionOverviewTableProps) {
  const navigate = useNavigate()

  const columns: ColumnDef<Quiz>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: "lastModified",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Modified <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = row.getValue("lastModified") as Date
        return (
          <span>
            {new Date(date).toLocaleDateString()} {new Date(date).toLocaleTimeString()}
          </span>
        )
      },
      sortingFn: "datetime",
    },
    {
      id: "edit",
      header: () => <span className="pl-4">Edit</span>,
      cell: ({ row }) => (
        <Button variant="outline" onClick={() => navigate(`/editor/${row.original.id}`)}>
          <MdEdit className="mr-2" />
          Edit
        </Button>
      ),
    },
    {
      id: "start",
      header: () => <span className="pl-4">Start</span>,
      cell: ({ row }) => (
        <Button variant="outline" onClick={() => navigate(`/play/${row.original.id}`)}>
          <FaPlay className="mr-2" />
          Start
        </Button>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const session = row.original
        return <QuizOptions QuizQuestionSession={session} />
      },
    },
  ]

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm mr-2"
          autoComplete="off"
        />
        <NewQuizButton />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  // Decide classes based on column ID
                  // - Name: always visible (no special class)
                  // - Actions: visible on small only -> "block md:hidden"
                  // - Everything else: hidden on small -> "hidden md:table-cell"
                  let headerClasses = ""
                  if (header.column.id === "actions") {
                    headerClasses = "block md:hidden"
                  } else if (header.column.id !== "name") {
                    headerClasses = "hidden md:table-cell"
                  }

                  return (
                    <TableHead key={header.id} className={headerClasses}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    // Apply the same responsive classes to cells
                    let cellClasses = ""
                    if (cell.column.id === "actions") {
                      cellClasses = "block md:hidden"
                    } else if (cell.column.id !== "name") {
                      cellClasses = "hidden md:table-cell"
                    }

                    return (
                      <TableCell key={cell.id} className={cellClasses}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                {loading ? (
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    <Skeleton className="h-24 -m-4" />
                  </TableCell>
                ) : (
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No sessions found.
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}