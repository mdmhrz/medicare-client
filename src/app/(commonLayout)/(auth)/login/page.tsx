import LoginForm from '@/components/modules/Auth/LoginForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const LoginPage = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[calc(100dvh-30px)] px-6'>
            <div className='bg-primary h-full flex flex-col items-center justify-center gap-4 text-white p-6 rounded-e-[30%]'>
                <h1 className='text-4xl font-semibold'>Hello Friend!</h1>
                <p>Register with your personal details to all sites features</p>
                <Link href={"/register"}>
                    <Button className='text-white bg-transparent md:px-10 font-medium' variant={"outline"}>Sign Up</Button>
                </Link>
            </div>
            <div>
                <LoginForm></LoginForm>
            </div>
        </div>
    );
};

export default LoginPage;