import React from "react";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type AppFieldProps = {
    field: AnyFieldApi;
    label: string;
    labelAppend?: React.ReactNode;
    type?: "text" | "email" | "password" | "number";
    placeholder?: string;
    append?: React.ReactNode;
    prepend?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;

    // Advanced flexibility
    as?: React.ElementType;
};

const getErrorMessage = (error: unknown): string => {
    if (typeof error === "string") return error;

    if (error && typeof error === "object") {
        if ("message" in error && typeof error.message === "string") {
            return error.message;
        }

        if (
            "errors" in error &&
            Array.isArray(error.errors) &&
            error.errors.length > 0
        ) {
            const firstError = error.errors[0];

            if (typeof firstError === "string") return firstError;

            if (
                firstError &&
                typeof firstError === "object" &&
                "message" in firstError &&
                typeof firstError.message === "string"
            ) {
                return firstError.message;
            }
        }
    }

    return String(error) || "An unknown error occurred";
};

const AppField = ({
    field,
    label,
    labelAppend,
    type = "text",
    placeholder,
    append,
    prepend,
    className = "",
    disabled = false,
    onChange,
    as,
}: AppFieldProps) => {
    const Component = as || Input;

    const firstError =
        field.state.meta.isTouched && field.state.meta.errors.length > 0
            ? getErrorMessage(field.state.meta.errors[0])
            : null;

    const hasError = Boolean(firstError);

    return (
        <div className={cn("space-y-1.5", className)}>
            {/* Label */}
            <div className="flex items-center justify-between">
                <Label
                    htmlFor={field.name}
                    className={cn(
                        "font-medium transition-colors",
                        hasError ? "text-destructive" : "text-foreground",
                        disabled && "opacity-60 cursor-not-allowed"
                    )}
                >
                    {label}
                </Label>
                {labelAppend}
            </div>

            {/* Input Wrapper */}
            <div className="relative">
                {/* Prepend */}
                {prepend && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                        {prepend}
                    </div>
                )}

                {/* Input / Custom Component */}
                <Component
                    id={field.name}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? `${field.name}-error` : undefined}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        field.handleChange(e.target.value);
                        onChange?.(e.target.value);
                    }}
                    className={cn(
                        prepend && "pl-10",
                        append && "pr-10",
                        hasError &&
                        "border-destructive focus-visible:ring-destructive",
                        disabled && "opacity-60 cursor-not-allowed",
                        "h-11"
                    )}
                />

                {/* Append */}
                {append && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                        {append}
                    </div>
                )}
            </div>

            {/* Error Message */}
            {hasError && (
                <p
                    id={`${field.name}-error`}
                    role="alert"
                    className="text-sm text-destructive"
                >
                    {firstError}
                </p>
            )}
        </div>
    );
};

export default AppField;