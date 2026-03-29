'use client';

import MedicalIllustration from '@/components/modules/Auth/MedicalIllustration';
import RegisterForm from '@/components/modules/Auth/RegisterForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const RegisterPage = () => {
    return (
        <>
            {/* Left - Form panel */}
            <div className="flex items-center justify-center bg-background p-6 md:p-12 animate-[fadeIn_0.5s_ease-out_0.2s_both]">
                <RegisterForm />
            </div>

            {/* Right - Branded panel */}
            <div className="relative flex flex-col items-center justify-center text-white p-8 md:p-12 animate-[fadeSlideIn_0.6s_ease-out]">
                <div className="flex flex-col items-center text-center max-w-sm">
                    <MedicalIllustration />
                    <h1 className="text-3xl md:text-4xl font-bold mt-6 tracking-tight">
                        Welcome Back!
                    </h1>
                    <p className="mt-3 text-white/70 text-sm leading-relaxed max-w-xs">
                        Already have an account? Sign in to access your appointments, records, and health dashboard.
                    </p>
                    <Link href="/login" className="mt-6">
                        <Button
                            variant="outline"
                            className="text-white bg-white/10 hover:bg-white/20 border-white/30 px-8 font-medium transition-all duration-300"
                        >
                            Sign In
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
