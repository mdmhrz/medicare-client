import { Button } from '@/components/ui/button';
import { getDefaultDashboardRoute } from '@/lib/authUtils';
// import { env } from '@/env';
// import { authClient } from '@/lib/authClient';

import Image from 'next/image';


const SocialLogin = ({ redirectPath }: { redirectPath: string | null }) => {
    const handleGoogleLogin = async () => {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

        const googleAuthUrl = `${baseUrl}/auth/login/google`;

        // Redirect the user to the Google authentication URL
        window.location.href = googleAuthUrl + `?redirect=${encodeURIComponent(redirectPath || getDefaultDashboardRoute("PATIENT"))}`;
    };

    return (
        <div className="w-full space-y-4 mt-2">


            {/* Google Button */}
            <Button
                onClick={handleGoogleLogin}
                variant="outline"
                type="button"
                className="w-full flex items-center gap-2 py-5.5"
            >
                <Image priority src="/google_logo.svg" alt="google" width={20} height={20} />
                <span>Continue with Google</span>
            </Button>

            {/* OR Divider */}
            <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground uppercase">
                    or
                </span>
                <div className="h-px flex-1 bg-border" />
            </div>
        </div>
    );
};

export default SocialLogin;