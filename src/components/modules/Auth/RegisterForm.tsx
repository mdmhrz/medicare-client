import React from 'react';
import SocialLogin from './SocialLogin';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const RegisterForm = () => {
    return (
        <div className='max-w-xl mx-auto h-full'>
            <div className='p-6 flex flex-col items-center justify-center gap-4 h-full '>
                <h1 className='text-3xl font-semibold text-accent-foreground/80'>SignUp</h1>
                <SocialLogin></SocialLogin>
                <Input
                    type='text'
                    placeholder='Enter your name'
                    className='p-4 py-6'
                ></Input>
                <Input
                    alt='Email'
                    type='email'
                    placeholder='Enter your email'
                    className='p-4 py-6'
                ></Input>
                <Input
                    alt='Password'
                    type='password'
                    placeholder='Enter your password'
                    className='p-4 py-6'
                ></Input>

                <Button className='md:px-10 font-medium'>Sign Up</Button>

            </div>
        </div>
    );
};

export default RegisterForm;