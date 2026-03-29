import React from 'react';
import SocialLogin from './SocialLogin';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const LoginForm = () => {
    return (
        <div className='w-full max-w-md mx-auto'>
            <div className='space-y-6'>
                <div className='space-y-2'>
                    <h1 className='text-2xl md:text-3xl font-bold text-foreground'>Sign In</h1>
                    <p className='text-muted-foreground text-sm'>Enter your credentials to access your account</p>
                </div>
                <SocialLogin />
                <div className='space-y-4'>
                    <div className='space-y-1.5'>
                        <label className='text-sm font-medium text-foreground'>Email</label>
                        <Input
                            type='email'
                            placeholder='you@example.com'
                            className='h-11'
                        />
                    </div>
                    <div className='space-y-1.5'>
                        <div className='flex items-center justify-between'>
                            <label className='text-sm font-medium text-foreground'>Password</label>
                            <Link className='text-xs text-primary hover:underline' href='/reset-password'>
                                Forgot password?
                            </Link>
                        </div>
                        <Input
                            type='password'
                            placeholder='Enter your password'
                            className='h-11'
                        />
                    </div>
                </div>
                <Button className='w-full h-11 font-medium'>Sign In</Button>
                <p className='text-center text-sm text-muted-foreground md:hidden'>
                    Don&apos;t have an account?{' '}
                    <Link href='/register' className='text-primary font-medium hover:underline'>
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
