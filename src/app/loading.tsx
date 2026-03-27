export default function Loading() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-8">
            {/* Heartbeat monitor */}
            <div className="relative w-48 h-48">
                {/* Outer ring */}
                <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Background ring */}
                    <circle
                        cx="100"
                        cy="100"
                        r="88"
                        fill="none"
                        className="stroke-muted"
                        strokeWidth="3"
                    />
                    {/* Animated progress ring */}
                    <circle
                        cx="100"
                        cy="100"
                        r="88"
                        fill="none"
                        className="stroke-primary"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="553"
                        strokeDashoffset="553"
                        style={{
                            animation: "ringFill 2s ease-in-out infinite",
                            transformOrigin: "center",
                            transform: "rotate(-90deg)",
                        }}
                    />
                </svg>

                {/* Center content: medical cross + heartbeat */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                        {/* Medical cross */}
                        <svg viewBox="0 0 40 40" className="w-10 h-10">
                            <rect
                                x="15"
                                y="6"
                                width="10"
                                height="28"
                                rx="2"
                                className="fill-primary"
                            />
                            <rect
                                x="6"
                                y="15"
                                width="28"
                                height="10"
                                rx="2"
                                className="fill-primary"
                            />
                        </svg>

                        {/* Heartbeat line */}
                        <svg viewBox="0 0 80 24" className="w-20 h-6 overflow-visible">
                            <polyline
                                points="0,12 16,12 22,4 28,20 34,8 40,12 56,12"
                                fill="none"
                                className="stroke-primary"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeDasharray="80"
                                strokeDashoffset="80"
                                style={{
                                    animation: "drawLine 1.5s ease-in-out infinite",
                                }}
                            />
                            {/* Trailing dot */}
                            <circle
                                r="3"
                                className="fill-primary"
                                style={{
                                    animation: "moveDot 1.5s ease-in-out infinite",
                                }}
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Brand text */}
            <div className="flex flex-col items-center gap-2">
                <p className="text-sm font-medium text-muted-foreground tracking-wide">
                    Loading
                    <span
                        className="inline-block w-6 text-left"
                        style={{ animation: "dots 1.5s steps(4, end) infinite" }}
                    >
                        ...
                    </span>
                </p>
            </div>

            <style>{`
                @keyframes ringFill {
                    0% {
                        stroke-dashoffset: 553;
                    }
                    50% {
                        stroke-dashoffset: 0;
                    }
                    100% {
                        stroke-dashoffset: -553;
                    }
                }

                @keyframes drawLine {
                    0% {
                        stroke-dashoffset: 80;
                    }
                    50% {
                        stroke-dashoffset: 0;
                    }
                    50.1% {
                        stroke-dashoffset: 0;
                    }
                    100% {
                        stroke-dashoffset: -80;
                    }
                }

                @keyframes moveDot {
                    0% {
                        cx: 0;
                        cy: 12;
                        opacity: 0;
                    }
                    5% {
                        opacity: 1;
                    }
                    20% {
                        cx: 16;
                        cy: 12;
                    }
                    27.5% {
                        cx: 22;
                        cy: 4;
                    }
                    35% {
                        cx: 28;
                        cy: 20;
                    }
                    42.5% {
                        cx: 34;
                        cy: 8;
                    }
                    50% {
                        cx: 40;
                        cy: 12;
                    }
                    70% {
                        cx: 56;
                        cy: 12;
                        opacity: 1;
                    }
                    75% {
                        opacity: 0;
                    }
                    100% {
                        cx: 56;
                        cy: 12;
                        opacity: 0;
                    }
                }

                @keyframes dots {
                    0% { content: ''; clip-path: inset(0 100% 0 0); }
                    25% { clip-path: inset(0 66% 0 0); }
                    50% { clip-path: inset(0 33% 0 0); }
                    75% { clip-path: inset(0 0 0 0); }
                }
            `}</style>
        </div>
    );
}
