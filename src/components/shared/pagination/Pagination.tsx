'use client'

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
    totalItems?: number;
    pageSizeOptions?: number[];
    siblingCount?: number;
}

export default function Pagination({
    currentPage,
    totalPages,
    pageSize,
    onPageChange,
    onPageSizeChange,
    totalItems,
    pageSizeOptions = [10, 20, 30, 50, 100],
    siblingCount = 1,
}: PaginationProps) {

    const [customPageSize, setCustomPageSize] = useState('');
    const [isCustomInput, setIsCustomInput] = useState(false);

    const handleCustomPageSizeChange = (value: string) => {
        setCustomPageSize(value);
    };

    const handleCustomPageSizeSubmit = () => {
        const newSize = parseInt(customPageSize);
        if (!isNaN(newSize) && newSize > 0 && newSize <= 1000) {
            onPageSizeChange(newSize);
            setIsCustomInput(false);
            setCustomPageSize('');
        }
    };

    const handleCustomPageSizeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCustomPageSizeSubmit();
        }
    };

    const handleSelectChange = (value: string) => {
        if (value === 'custom') {
            setIsCustomInput(true);
            setCustomPageSize(pageSize.toString());
        } else {
            setIsCustomInput(false);
            setCustomPageSize('');
            onPageSizeChange(parseInt(value));
        }
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            // Show all pages if total pages is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            // Show left ellipsis if needed
            if (currentPage - siblingCount > 2) {
                pages.push("...");
            }

            // Show pages around current page
            const startPage = Math.max(2, currentPage - siblingCount);
            const endPage = Math.min(totalPages - 1, currentPage + siblingCount);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            // Show right ellipsis if needed
            if (currentPage + siblingCount < totalPages - 1) {
                pages.push("...");
            }

            // Always show last page
            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handleFirst = () => {
        onPageChange(1);
    };

    const handleLast = () => {
        onPageChange(totalPages);
    };

    const startItem = totalItems ? (currentPage - 1) * pageSize + 1 : 0;
    const endItem = totalItems ? Math.min(currentPage * pageSize, totalItems) : 0;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
            {/* Page Size Selector */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Show</span>
                {isCustomInput ? (
                    <div className="flex items-center gap-2">
                        <Input
                            type="number"
                            value={customPageSize}
                            onChange={(e) => handleCustomPageSizeChange(e.target.value)}
                            onKeyDown={handleCustomPageSizeKeyDown}
                            onBlur={handleCustomPageSizeSubmit}
                            className="h-8 w-[70px]"
                            min="1"
                            max="1000"
                            placeholder="Custom"
                            autoFocus
                        />
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2"
                            onClick={() => {
                                setIsCustomInput(false);
                                setCustomPageSize('');
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                ) : (
                    <Select
                        value={pageSizeOptions.includes(pageSize) ? pageSize.toString() : undefined}
                        onValueChange={handleSelectChange}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={pageSize.toString()} />
                        </SelectTrigger>
                        <SelectContent>
                            {pageSizeOptions.map((size) => (
                                <SelectItem key={size} value={size.toString()}>
                                    {size}
                                </SelectItem>
                            ))}
                            <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                    </Select>
                )}
                <span>per page</span>
            </div>



            {/* Items Info */}
            {totalItems && (
                <div className="text-sm text-muted-foreground">
                    Showing {startItem} to {endItem} of {totalItems} items
                </div>
            )}

            {/* Pagination Controls */}
            <div className="flex items-center gap-1">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleFirst}
                    disabled={currentPage === 1}
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-1">
                    {pageNumbers.map((page, index) => (
                        page === "..." ? (
                            <span
                                key={`ellipsis-${index}`}
                                className="h-8 w-8 flex items-center justify-center text-muted-foreground"
                            >
                                ...
                            </span>
                        ) : (
                            <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                size="icon"
                                className={cn(
                                    "h-8 w-8",
                                    currentPage === page && "bg-primary text-primary-foreground hover:bg-primary/90"
                                )}
                                onClick={() => onPageChange(page as number)}
                            >
                                {page}
                            </Button>
                        )
                    ))}
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleLast}
                    disabled={currentPage === totalPages}
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
