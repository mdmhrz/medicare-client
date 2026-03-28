import React from 'react';
import SocialLogin from './SocialLogin';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const LoginForm = () => {
    return (
        <div className='max-w-xl mx-auto h-full'>
            <div className='p-6 flex flex-col items-center justify-center gap-4 h-full '>
                <h1 className='text-3xl font-semibold text-accent-foreground/80'>SignIn</h1>
                <SocialLogin></SocialLogin>
                <Input
                    alt='Email'
                    placeholder='Enter your email'
                    className='p-4 py-6'
                ></Input>
                <Input
                    alt='Password'
                    placeholder='Enter your password'
                    className='p-4 py-6'
                ></Input>
                <div className='self-start text-accent-foreground text-sm'>
                    <span className='mr-2'>Forgot password?</span>
                    <Link className='text-underline text-secondary' href={"/reset-password"}>Click here</Link>
                </div>
                <Button className='md:px-10 font-medium'>Sign In</Button>

            </div>
        </div>
    );
};

export default LoginForm;