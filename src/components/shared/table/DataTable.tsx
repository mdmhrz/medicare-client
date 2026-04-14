import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, PaginationState, SortingState, useReactTable } from "@tanstack/react-table";
import { MoreHorizontal, Eye, Pencil, Trash2, Inbox, Settings2, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Pagination from "@/components/shared/pagination/Pagination";
import Search from "@/components/shared/search/Search";

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
    sorting?: {
        state: SortingState;
        onSortingChange: (state: SortingState) => void;
    }
    pagination?: {
        state: PaginationState;
        onPaginationChange: (state: PaginationState) => void;
        pageCount?: number;
        totalItems?: number;
    }
    search?: {
        value: string;
        onChange: (value: string) => void;
        placeholder?: string;
    }
}

export default function DataTable<TData>({
    data,
    columns,
    actions,
    emptyMessage,
    isLoading,
    sorting,
    pagination,
    search,
}: DataTableProps<TData>) {

    const tableColumns: ColumnDef<TData>[] = actions ? [...columns, {
        id: 'actions',
        enableSorting: false,
        header: () => (
            <div className="flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-muted-foreground" />
                <span>Actions</span>
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none flex items-center justify-center" asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="bg-accent shadow-sm border h-8 w-8 data-[state=open]:bg-accent hover:bg-accent/50 transition-colors"
                            >
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-[160px] border-border/50 shadow-lg"
                        >
                            {actions?.onView && (
                                <>
                                    <DropdownMenuItem
                                        className="cursor-pointer flex items-center gap-2 focus:bg-accent/50 transition-colors"
                                        onClick={() => actions.onView?.(row.original)}
                                    >
                                        <Eye className="h-4 w-4 text-muted-foreground" />
                                        <span>View</span>
                                    </DropdownMenuItem>
                                    {actions.onEdit && <DropdownMenuSeparator className="bg-border/50" />}
                                </>
                            )}
                            {actions?.onEdit && (
                                <>
                                    <DropdownMenuItem
                                        className="cursor-pointer flex items-center gap-2 focus:bg-accent/50 transition-colors"
                                        onClick={() => actions.onEdit?.(row.original)}
                                    >
                                        <Pencil className="h-4 w-4 text-muted-foreground" />
                                        <span>Edit</span>
                                    </DropdownMenuItem>
                                    {actions.onDelete && <DropdownMenuSeparator className="bg-border/50" />}
                                </>
                            )}
                            {actions?.onDelete && (
                                <DropdownMenuItem
                                    className="cursor-pointer flex items-center gap-2 focus:bg-destructive/10 focus:text-destructive transition-colors"
                                    onClick={() => actions.onDelete?.(row.original)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                    <span>Delete</span>
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        }
    }] : columns;

    const { getHeaderGroups, getRowModel, getPageCount } = useReactTable({
        data,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualSorting: Boolean(sorting),
        manualPagination: Boolean(pagination),
        onSortingChange: sorting ? ((updater) => {
            const currentSorting = sorting.state;
            // @ts-ignore
            const newSorting = typeof updater === 'function' ? updater(currentSorting) : updater;
            sorting.onSortingChange(newSorting);
        }) : undefined as any,
        onPaginationChange: pagination ? ((updater) => {
            const currentPagination = pagination.state;
            // @ts-ignore
            const newPagination = typeof updater === 'function' ? updater(currentPagination) : updater;
            pagination.onPaginationChange(newPagination);
        }) : undefined as any,
        state: {
            ...sorting ? { sorting: sorting.state } : {},
            ...pagination ? { pagination: pagination.state } : {}
        },
        pageCount: pagination?.pageCount
    });

    const columnCount = tableColumns.length;
    const skeletonRowCount = Math.max(8, data.length);

    return (
        <div className="w-full">
            {/* Search Bar */}
            {search && (
                <div className="mb-4">
                    <Search
                        value={search.value}
                        onChange={search.onChange}
                        placeholder={search.placeholder}
                        className={"max-w-md"}
                    />
                </div>
            )}

            <div
                className="relative w-full rounded-xl bg-card overflow-clip"
                style={{
                    boxShadow: '0 1px 3px rgb(0 0 0 / 0.08), 0 0 0 1px rgb(0 0 0 / 0.06)'
                }}
            >
                {/* Primary color top border accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary/40" />

                <div className="data-table-wrapper">
                    <Table className="min-w-full">
                        <TableHeader>
                            {getHeaderGroups().map(headerGroup => (
                                <TableRow
                                    key={headerGroup.id}
                                    className="hover:bg-transparent border-b border-border/60 bg-primary/5"
                                >
                                    {headerGroup.headers.map(header => (
                                        <TableHead
                                            key={header.id}
                                            className="h-12 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground first:pl-5 last:pr-5"
                                        >
                                            {
                                                header.isPlaceholder ? null : header.column.getCanSort() ?
                                                    (
                                                        <Button
                                                            variant={"ghost"}
                                                            className="h-auto p-0 cursor-pointer font-semibold hover:bg-transparent hover:text-inherit focus-visible:ring-0 focus-visible:ring-offset-0"
                                                            onClick={header.column.getToggleSortingHandler()}
                                                        >
                                                            {flexRender(header.column.columnDef.header, header.getContext())}

                                                            {header.column.getIsSorted() === 'asc' ? (
                                                                <ArrowUp className="h-3 w-3" />
                                                            ) : header.column.getIsSorted() === 'desc' ? (
                                                                <ArrowDown className="h-3 w-3" />
                                                            ) : (
                                                                <ArrowUpDown className="h-3 w-3 opacity-50" />
                                                            )}
                                                        </Button>

                                                    ) : (
                                                        flexRender(header.column.columnDef.header, header.getContext())
                                                    )
                                            }


                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody className="[&_tr:last-child]:border-0">
                            {isLoading ? (
                                Array.from({ length: skeletonRowCount }).map((_, index) => (
                                    <TableRow
                                        key={`skeleton-${index}`}
                                        className={cn(
                                            "border-b border-border/30 hover:bg-transparent",
                                            index % 2 === 0 && "bg-muted/[0.02]"
                                        )}
                                    >
                                        {Array.from({ length: columnCount }).map((_, cellIndex) => (
                                            <TableCell
                                                key={`skeleton-cell-${cellIndex}`}
                                                className="px-4 py-4 first:pl-5 last:pr-5"
                                            >
                                                <Skeleton
                                                    className={cn(
                                                        "h-4 w-full bg-muted/50",
                                                        cellIndex === columnCount - 1 ? "w-16" : ""
                                                    )}
                                                />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : getRowModel().rows.length ? (
                                getRowModel().rows.map((row, index) => (
                                    <TableRow
                                        key={row.id}
                                        className={cn(
                                            "border-b border-border/30 transition-colors duration-150",
                                            "hover:bg-primary/[0.03]",
                                            index % 2 === 0 && "bg-muted/[0.02]"
                                        )}
                                    >
                                        {row.getVisibleCells().map(cell => (
                                            <TableCell
                                                key={cell.id}
                                                className="px-4 py-3.5 align-middle text-sm first:pl-5 last:pr-5"
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow className="hover:bg-transparent">
                                    <TableCell colSpan={columnCount} className="h-80">
                                        <div className="flex flex-col items-center justify-center gap-5 py-14">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl" />
                                                <div className="relative bg-muted/60 rounded-full p-7 border border-border/50">
                                                    <Inbox className="h-11 w-11 text-muted-foreground/60" />
                                                </div>
                                            </div>
                                            <div className="text-center space-y-1.5">
                                                <p className="text-sm font-semibold text-foreground">
                                                    {emptyMessage ?? "No data found"}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    There are no records to display at this time
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {pagination && (
                    <div className="px-4 py-4 border-t border-border/30">
                        <Pagination
                            currentPage={pagination.state.pageIndex + 1}
                            totalPages={pagination.pageCount || getPageCount()}
                            pageSize={pagination.state.pageSize}
                            onPageChange={(page) => pagination.onPaginationChange({ pageIndex: page - 1, pageSize: pagination.state.pageSize })}
                            onPageSizeChange={(pageSize) => pagination.onPaginationChange({ pageIndex: 0, pageSize })}
                            totalItems={pagination.totalItems}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
