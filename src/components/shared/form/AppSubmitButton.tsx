import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type AppSubmitButtonProps = React.ComponentProps<typeof Button> & {
    isPending?: boolean;
    pendingLabel?: string;
    loader?: React.ReactNode;
};

const AppSubmitButton = ({
    isPending = false,
    disabled,
    className,
    children,
    pendingLabel = "Submitting...",
    loader,
    ...props
}: AppSubmitButtonProps) => {
    const isDisabled = disabled || isPending;

    return (
        <Button
            type="submit"
            disabled={isDisabled}
            aria-busy={isPending}
            className={cn("w-full", className)}
            {...props}
        >
            <span className="flex items-center justify-center">
                {isPending && (
                    <span className="mr-2">
                        {loader || (
                            <Loader2
                                className="h-4 w-4 animate-spin"
                                aria-hidden="true"
                            />
                        )}
                    </span>
                )}
                {isPending ? pendingLabel : children}
            </span>
        </Button>
    );
};

export default AppSubmitButton;