'use client'

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter as FilterIcon, X, ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export type FilterOperator = 'eq' | 'gt' | 'gte' | 'lt' | 'lte';

export interface FilterOption {
    value: string;
    label: string;
}

export interface SingleSelectFilter {
    type: 'single';
    field: string;
    label: string;
    options: FilterOption[];
    value?: string;
}

export interface MultiSelectFilter {
    type: 'multi';
    field: string;
    label: string;
    options: FilterOption[];
    values?: string[];
    isLoading?: boolean;
}

export interface RangeFilter {
    type: 'range';
    field: string;
    label: string;
    operator: FilterOperator;
    value?: number;
    minValue?: number;
    maxValue?: number;
}

export type FilterConfig = SingleSelectFilter | MultiSelectFilter | RangeFilter;

interface FilterProps {
    filters: FilterConfig[];
    onFilterChange: (field: string, value: any, operator?: FilterOperator) => void;
    onFilterRemove: (field: string) => void;
    debounceMs?: number;
    className?: string;
}

export default function Filter({
    filters,
    onFilterChange,
    onFilterRemove,
    debounceMs = 300,
    className = "",
}: FilterProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [localMultiSelectValues, setLocalMultiSelectValues] = useState<Record<string, string[]>>({});
    const [localRangeValues, setLocalRangeValues] = useState<Record<string, number>>({});
    const [localSingleValues, setLocalSingleValues] = useState<Record<string, string>>({});
    const timerRef = useRef<Record<string, NodeJS.Timeout>>({});

    // Initialize local state from filters
    useEffect(() => {
        filters.forEach(filter => {
            if (filter.type === 'multi') {
                setLocalMultiSelectValues(prev => ({
                    ...prev,
                    [filter.field]: filter.values || []
                }));
            } else if (filter.type === 'range') {
                setLocalRangeValues(prev => ({
                    ...prev,
                    [filter.field]: filter.value || 0
                }));
            } else if (filter.type === 'single') {
                setLocalSingleValues(prev => ({
                    ...prev,
                    [filter.field]: filter.value || ''
                }));
            }
        });
    }, [filters]);

    const handleSingleSelectChange = (field: string, value: string) => {
        setLocalSingleValues(prev => ({ ...prev, [field]: value }));
        onFilterChange(field, value, 'eq');
    };

    const handleMultiSelectChange = (field: string, value: string) => {
        setLocalMultiSelectValues(prev => {
            const currentValues = prev[field] || [];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
            return { ...prev, [field]: newValues };
        });
    };

    const handleRangeChange = (field: string, operator: FilterOperator, value: number) => {
        setLocalRangeValues(prev => ({
            ...prev,
            [field]: value
        }));

        // Debounce the filter change
        if (timerRef.current[field]) {
            clearTimeout(timerRef.current[field]);
        }

        timerRef.current[field] = setTimeout(() => {
            onFilterChange(field, value, operator);
        }, debounceMs);
    };

    const handleApplyAll = () => {
        // Apply all multi-select filters
        filters.forEach(filter => {
            if (filter.type === 'multi') {
                const values = localMultiSelectValues[filter.field] || [];
                onFilterChange(filter.field, values, 'eq');
            }
        });
        setIsOpen(false);
    };

    const handleClearAll = () => {
        filters.forEach(filter => {
            onFilterRemove(filter.field);
            if (filter.type === 'multi') {
                setLocalMultiSelectValues(prev => ({ ...prev, [filter.field]: [] }));
            } else if (filter.type === 'range') {
                setLocalRangeValues(prev => ({ ...prev, [filter.field]: 0 }));
            } else if (filter.type === 'single') {
                setLocalSingleValues(prev => ({ ...prev, [filter.field]: '' }));
            }
        });
        setIsOpen(false);
    };

    const handleRemoveFilter = (field: string) => {
        onFilterRemove(field);
        if (filters.find(f => f.field === field)?.type === 'multi') {
            setLocalMultiSelectValues(prev => ({ ...prev, [field]: [] }));
        } else if (filters.find(f => f.field === field)?.type === 'range') {
            setLocalRangeValues(prev => ({ ...prev, [field]: 0 }));
        } else if (filters.find(f => f.field === field)?.type === 'single') {
            setLocalSingleValues(prev => ({ ...prev, [field]: '' }));
        }
    };

    const hasActiveFilter = (filter: FilterConfig) => {
        if (filter.type === 'single') return !!filter.value;
        if (filter.type === 'multi') return filter.values && filter.values.length > 0;
        if (filter.type === 'range') return filter.value !== undefined && filter.value !== null && filter.value !== 0;
        return false;
    };

    const activeFilterCount = filters.filter(hasActiveFilter).length;

    const renderSingleSelect = (filter: SingleSelectFilter) => (
        <div className="space-y-2">
            <Label className="text-sm font-medium">{filter.label}</Label>
            <Select
                value={localSingleValues[filter.field] || filter.value || ''}
                onValueChange={(value) => handleSingleSelectChange(filter.field, value)}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                    {filter.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );

    const renderMultiSelect = (filter: MultiSelectFilter) => (
        <div className="space-y-2">
            <Label className="text-sm font-medium">{filter.label}</Label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
                {filter.isLoading ? (
                    <div className="space-y-2 py-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                ) : filter.options.length === 0 ? (
                    <div className="text-sm text-muted-foreground py-2">No options available</div>
                ) : (
                    filter.options.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                            <Checkbox
                                id={`${filter.field}-${option.value}`}
                                checked={(localMultiSelectValues[filter.field] || []).includes(option.value)}
                                onCheckedChange={() => handleMultiSelectChange(filter.field, option.value)}
                            />
                            <Label
                                htmlFor={`${filter.field}-${option.value}`}
                                className="text-sm cursor-pointer flex-1"
                            >
                                {option.label}
                            </Label>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    const renderRange = (filter: RangeFilter) => (
        <div className="space-y-2">
            <Label className="text-sm font-medium">{filter.label}</Label>
            <div className="flex items-center gap-2">
                <Select
                    value={filter.operator}
                    onValueChange={(value: FilterOperator) => {
                        const currentValue = localRangeValues[filter.field] || filter.value || 0;
                        handleRangeChange(filter.field, value, currentValue);
                    }}
                >
                    <SelectTrigger className="w-[140px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="gt">Greater than</SelectItem>
                        <SelectItem value="gte">Greater or equal</SelectItem>
                        <SelectItem value="lt">Less than</SelectItem>
                        <SelectItem value="lte">Less or equal</SelectItem>
                    </SelectContent>
                </Select>
                <Input
                    type="number"
                    value={localRangeValues[filter.field] || filter.value || ''}
                    onChange={(e) => handleRangeChange(filter.field, filter.operator, parseFloat(e.target.value) || 0)}
                    className="flex-1"
                    min={filter.minValue}
                    max={filter.maxValue}
                />
            </div>
        </div>
    );

    return (
        <div className={className}>
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                        <FilterIcon className="h-4 w-4 mr-2" />
                        Filters
                        {activeFilterCount > 0 && (
                            <span className="ml-2 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded">
                                {activeFilterCount}
                            </span>
                        )}
                        <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-96 p-4">
                    <ScrollArea className="max-h-[400px]">
                        <div className="space-y-4">
                            {filters.map((filter) => (
                                <div key={filter.field} className="border-b pb-4 last:border-0">
                                    {filter.type === 'single' && renderSingleSelect(filter)}
                                    {filter.type === 'multi' && renderMultiSelect(filter)}
                                    {filter.type === 'range' && renderRange(filter)}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                    <div className="flex gap-2 pt-4 border-t mt-4">
                        <Button
                            size="sm"
                            className="flex-1"
                            onClick={handleApplyAll}
                        >
                            Apply
                        </Button>
                        {activeFilterCount > 0 && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleClearAll}
                            >
                                Clear All
                            </Button>
                        )}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
