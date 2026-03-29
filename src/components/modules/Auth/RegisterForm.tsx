import React from 'react';
import SocialLogin from './SocialLogin';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const RegisterForm = () => {
    return (
        <div className='w-full max-w-md mx-auto'>
            <div className='space-y-6'>
                <div className='space-y-2'>
                    <h1 className='text-2xl md:text-3xl font-bold text-foreground'>Create Account</h1>
                    <p className='text-muted-foreground text-sm'>Fill in your details to get started</p>
                </div>
                <SocialLogin />
                <div className='space-y-4'>
                    <div className='space-y-1.5'>
                        <label className='text-sm font-medium text-foreground'>Full Name</label>
                        <Input
                            type='text'
                            placeholder='John Doe'
                            className='h-11'
                        />
                    </div>
                    <div className='space-y-1.5'>
                        <label className='text-sm font-medium text-foreground'>Email</label>
                        <Input
                            type='email'
                            placeholder='you@example.com'
                            className='h-11'
                        />
                    </div>
                    <div className='space-y-1.5'>
                        <label className='text-sm font-medium text-foreground'>Password</label>
                        <Input
                            type='password'
                            placeholder='Create a password'
                            className='h-11'
                        />
                    </div>
                </div>
                <Button className='w-full h-11 font-medium'>Create Account</Button>
                <p className='text-center text-sm text-muted-foreground md:hidden'>
                    Already have an account?{' '}
                    <Link href='/login' className='text-primary font-medium hover:underline'>
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;
