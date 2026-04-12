import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { MoreHorizontal, Eye, Pencil, Trash2, Inbox } from "lucide-react";

interface DataTableActions<TData> {
    onView?: (data: TData) => void;
    onEdit?: (data: TData) => void;
    onDelete?: (data: TData) => void;
}


interface DataTableProps<TData> {
    data: TData[];
    columns: ColumnDef<TData>[];
    actions?: DataTableActions<TData>;
    emptyMessage?: string;
    isLoading: boolean;
}

export default function DataTable<TData>({
    data,
    columns,
    actions,
    emptyMessage,
    isLoading
}: DataTableProps<TData>) {

    const tableCoumns: ColumnDef<TData>[] = actions ? [...columns, {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                        >
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className=""
                        align="end"
                    >

                        {/* View */}
                        {actions?.onView &&
                            <DropdownMenuItem
                                className="cursor-pointer flex items-center gap-2 hover:bg-gray-100"
                                onClick={() => actions.onView?.(row.original)}
                            >
                                <Eye />
                                <span>View</span>
                            </DropdownMenuItem>
                        }

                        {/* Edit */}
                        {actions?.onEdit && <DropdownMenuItem
                            className="cursor-pointer flex items-center gap-2 hover:bg-gray-100"
                            onClick={() => actions.onEdit?.(row.original)}
                        >
                            <Pencil />
                            <span>Edit</span>
                        </DropdownMenuItem>
                        }

                        {/* Delete */}
                        {actions?.onDelete && <DropdownMenuItem
                            className="cursor-pointer flex items-center gap-2 hover:bg-gray-100"
                            onClick={() => actions.onDelete?.(row.original)}
                        >
                            <Trash2 className="text-red-500" />
                            <span>Delete</span>
                        </DropdownMenuItem>
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }] : columns;

    const { getHeaderGroups, getRowModel } = useReactTable({
        data,
        columns: tableCoumns,
        getCoreRowModel: getCoreRowModel(),
    })


    const columnCount = tableCoumns.length;
    const skeletonRowCount = Math.max(10, data.length);

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        // Skeleton rows
                        Array.from({ length: skeletonRowCount }).map((_, index) => (
                            <TableRow key={`skeleton-${index}`}>
                                {Array.from({ length: columnCount }).map((_, cellIndex) => (
                                    <TableCell key={`skeleton-cell-${cellIndex}`}>
                                        <Skeleton className="h-4 w-full" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : getRowModel().rows.length ? (
                        // Data rows
                        getRowModel().rows.map(row => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        // Empty state
                        <TableRow>
                            <TableCell colSpan={columnCount} className="h-24 text-center">
                                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                                    <Inbox className="h-8 w-8" />
                                    <span>{emptyMessage || "No data found"}</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}