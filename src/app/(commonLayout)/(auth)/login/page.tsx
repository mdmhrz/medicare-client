'use client';

import LoginForm from '@/components/modules/Auth/LoginForm';
import ShieldIllustration from '@/components/modules/Auth/ShieldIllustration';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const LoginPage = () => {
    return (
        <>
            {/* Left - Branded panel */}
            <div className="relative flex flex-col items-center justify-center text-white p-8 md:p-12 animate-[fadeSlideIn_0.6s_ease-out]">
                <div className="flex flex-col items-center text-center max-w-sm">
                    <ShieldIllustration />
                    <h1 className="text-3xl md:text-4xl font-bold mt-6 tracking-tight">
                        Welcome to Medicare
                    </h1>
                    <p className="mt-3 text-white/70 text-sm leading-relaxed max-w-xs">
                        Don&apos;t have an account yet? Create one now and start managing your healthcare journey.
                    </p>
                    <Link href="/register" className="mt-6">
                        <Button
                            variant="outline"
                            className="text-white bg-white/10 hover:bg-white/20 border-white/30 px-8 font-medium transition-all duration-300"
                        >
                            Create Account
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Right - Form panel */}
            <div className="flex items-center justify-center bg-background p-6 md:p-12 animate-[fadeIn_0.5s_ease-out_0.2s_both]">
                <LoginForm />
            </div>
        </>
    );
};

export default LoginPage;
