'use client';

import { usePathname } from 'next/navigation';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isLogin = pathname === '/login';

    return (
        <div className="min-h-[calc(100dvh-30px)] px-4 md:px-6 py-4">
            <div
                className={`
                    relative w-full min-h-[calc(100dvh-62px)] rounded-3xl overflow-hidden
                    grid grid-cols-1 md:grid-cols-2 shadow-xl
                    transition-all duration-700 ease-in-out
                `}
            >
                {/* Teal branded panel */}
                <div
                    className={`
                        absolute inset-y-0 w-full md:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-primary/80
                        transition-transform duration-700 ease-in-out z-10
                        ${isLogin ? 'translate-x-0' : 'md:translate-x-full translate-x-0'}
                    `}
                >
                    {/* Animated background elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/5 animate-[float_8s_ease-in-out_infinite]" />
                        <div className="absolute -bottom-16 -right-16 w-96 h-96 rounded-full bg-white/[0.03] animate-[float_10s_ease-in-out_infinite_reverse]" />
                        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-white/[0.04] animate-[float_6s_ease-in-out_infinite_1s]" />
                    </div>
                </div>

                {/* Content layer - always rendered in grid order */}
                <div className="relative z-20 col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 min-h-[calc(100dvh-62px)]">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
