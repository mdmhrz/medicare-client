'use client'

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    debounceMs?: number;
    className?: string;
}

export default function Search({
    value,
    onChange,
    placeholder = "Search...",
    debounceMs = 300,
    className = "",
}: SearchProps) {

    const [localValue, setLocalValue] = useState(value);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Sync local value with prop value when it changes from outside
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    // Handle input change with debounce
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setLocalValue(newValue);

        // Clear existing timer
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        // Set new timer
        timerRef.current = setTimeout(() => {
            onChange(newValue);
        }, debounceMs);
    };

    // Clear search
    const handleClear = () => {
        setLocalValue('');

        // Clear existing timer
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        onChange('');
    };

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return (
        <div className={`relative ${className}`}>
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
                type="text"
                value={localValue}
                onChange={handleChange}
                placeholder={placeholder}
                className="pl-9 pr-9"
            />
            {localValue && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center rounded-full text-muted-foreground hover:bg-muted-foreground/10 hover:text-foreground transition-colors duration-200"
                    aria-label="Clear search"
                >
                    <X className="h-3 w-3" />
                </button>
            )}
        </div>
    );
}
