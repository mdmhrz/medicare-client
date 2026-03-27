import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
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
                            className="fill-primary/5"
                        />
                        <circle
                            cx="140"
                            cy="140"
                            r="100"
                            className="fill-primary/[0.07]"
                        />

                        {/* Clipboard body */}
                        <rect
                            x="90"
                            y="70"
                            width="100"
                            height="140"
                            rx="10"
                            className="fill-card stroke-border"
                            strokeWidth="2"
                        />
                        {/* Clipboard clip */}
                        <rect
                            x="118"
                            y="60"
                            width="44"
                            height="20"
                            rx="6"
                            className="fill-primary/15 stroke-primary/30"
                            strokeWidth="1.5"
                        />
                        <circle cx="140" cy="70" r="3" className="fill-primary/40" />

                        {/* Lines on clipboard */}
                        <rect
                            x="110"
                            y="100"
                            width="60"
                            height="4"
                            rx="2"
                            className="fill-muted-foreground/15"
                        />
                        <rect
                            x="110"
                            y="114"
                            width="45"
                            height="4"
                            rx="2"
                            className="fill-muted-foreground/15"
                        />
                        <rect
                            x="110"
                            y="128"
                            width="52"
                            height="4"
                            rx="2"
                            className="fill-muted-foreground/15"
                        />

                        {/* Question mark */}
                        <text
                            x="140"
                            y="185"
                            textAnchor="middle"
                            className="fill-primary/60"
                            fontSize="36"
                            fontWeight="700"
                            fontFamily="system-ui, sans-serif"
                        >
                            ?
                        </text>

                        {/* Medical cross */}
                        <g className="animate-pulse" style={{ animationDuration: "3s" }}>
                            <circle cx="210" cy="90" r="22" className="fill-primary/10" />
                            <rect
                                x="205"
                                y="78"
                                width="10"
                                height="24"
                                rx="2"
                                className="fill-primary"
                            />
                            <rect
                                x="198"
                                y="85"
                                width="24"
                                height="10"
                                rx="2"
                                className="fill-primary"
                            />
                        </g>
                    </svg>
                </div>

                {/* Text content */}
                <h1 className="text-7xl sm:text-8xl font-extrabold tracking-tight text-primary mb-3">
                    404
                </h1>
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
                    Page not found
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed max-w-sm mx-auto mb-10">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    Please check the URL or navigate back.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild size="lg">
                        <Link href="/">
                            <svg
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Back to Home
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/consultation">
                            Contact Support
                        </Link>
                    </Button>
                </div>

                {/* Footer */}
                <p className="mt-16 text-xs text-muted-foreground/60">
                    Medicare &middot; Error 404
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
