"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    unstable_retry,
}: {
    error: Error & { digest?: string };
    unstable_retry: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
            <div className="max-w-lg w-full text-center animate-[fadeIn_0.5s_ease-out]">
                {/* Illustration */}
                <div className="mx-auto mb-10 w-64 h-64 relative">
                    <svg viewBox="0 0 280 280" fill="none" className="w-full h-full">
                        {/* Background circle */}
                        <circle
                            cx="140"
                            cy="140"
                            r="130"
                            className="fill-destructive/5"
                        />
                        <circle
                            cx="140"
                            cy="140"
                            r="100"
                            className="fill-destructive/[0.07]"
                        />

                        {/* Monitor body */}
                        <rect
                            x="80"
                            y="70"
                            width="120"
                            height="90"
                            rx="10"
                            className="fill-card stroke-border"
                            strokeWidth="2"
                        />
                        {/* Screen */}
                        <rect
                            x="90"
                            y="80"
                            width="100"
                            height="66"
                            rx="4"
                            className="fill-muted/80"
                        />
                        {/* Monitor stand */}
                        <rect
                            x="130"
                            y="160"
                            width="20"
                            height="16"
                            className="fill-border"
                        />
                        <rect
                            x="115"
                            y="174"
                            width="50"
                            height="6"
                            rx="3"
                            className="fill-border"
                        />

                        {/* Heartbeat line on screen */}
                        <polyline
                            points="100,118 118,118 124,100 130,130 136,108 142,118 160,118"
                            className="stroke-primary"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        />
                        {/* Flatline after */}
                        <line
                            x1="160"
                            y1="118"
                            x2="180"
                            y2="118"
                            className="stroke-destructive/50"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeDasharray="4 4"
                        />

                        {/* Warning badge */}
                        <g className="animate-pulse" style={{ animationDuration: "3s" }}>
                            <circle cx="210" cy="85" r="22" className="fill-destructive/10" />
                            <path
                                d="M210 72l-14 24h28l-14-24z"
                                className="fill-destructive/80"
                                strokeLinejoin="round"
                            />
                            <text
                                x="210"
                                y="93"
                                textAnchor="middle"
                                fontSize="12"
                                fontWeight="800"
                                className="fill-card"
                                fontFamily="system-ui, sans-serif"
                            >
                                !
                            </text>
                        </g>
                    </svg>
                </div>

                {/* Text content */}
                <h1 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
                    Something went wrong
                </h1>
                <p className="text-muted-foreground text-base leading-relaxed max-w-sm mx-auto mb-4">
                    An unexpected error occurred. Your data is safe &mdash;
                    please try again or return to the home page.
                </p>

                {/* Error digest */}
                {error.digest && (
                    <p className="text-xs font-mono text-muted-foreground/50 mb-8 bg-muted inline-block px-3 py-1.5 rounded-md">
                        Error ID: {error.digest}
                    </p>
                )}

                {!error.digest && <div className="mb-8" />}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button size="lg" onClick={() => unstable_retry()}>
                        <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                fillRule="evenodd"
                                d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H4.598a.75.75 0 00-.75.75v3.634a.75.75 0 001.5 0v-2.033l.312.311a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm-10.624-2.85a5.5 5.5 0 019.201-2.466l.312.311H11.77a.75.75 0 000 1.5h3.634a.75.75 0 00.75-.75V3.535a.75.75 0 00-1.5 0v2.033l-.312-.311A7 7 0 002.63 8.396a.75.75 0 001.449.39z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Try Again
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/">
                            Back to Home
                        </Link>
                    </Button>
                </div>

                {/* Footer */}
                <p className="mt-16 text-xs text-muted-foreground/60">
                    Medicare &middot; If this persists, please contact support
                </p>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
