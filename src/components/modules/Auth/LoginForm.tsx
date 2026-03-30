'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import SocialLogin from './SocialLogin';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IloginPayload, loginZodSchema } from '@/zod/auth.validation';
import { loginAction } from '@/app/(commonLayout)/(auth)/login/_action';
import { useForm } from '@tanstack/react-form';
import AppField from '@/components/shared/form/AppField';
import { Eye, EyeOff } from 'lucide-react';
import AppSubmitButton from '@/components/shared/form/AppSubmitButton';

const LoginForm = () => {
    const [serverError, setServerError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: IloginPayload) => loginAction(payload)
    })

    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },

        onSubmit: async ({ value }) => {
            setServerError(null);
            try {
                const result = await mutateAsync(value) as any;
                if (!result.success) {
                    setServerError(result.message || 'Login failed');
                    return;
                }

            } catch (error: any) {
                setServerError(`Login failed: ${error.message}`);
                console.log(error)
            }
        }
    });


    return (
        <div className='w-full max-w-md mx-auto'>
            <div className='space-y-6'>
                <div className='space-y-2'>
                    <h1 className='text-2xl md:text-3xl font-bold text-foreground'>Sign In</h1>
                    <p className='text-muted-foreground text-sm'>Enter your credentials to access your account</p>
                </div>
                <SocialLogin />

                {serverError && (
                    <div className='flex items-start gap-2.5 rounded-md border border-destructive/40 bg-destructive/10 px-3.5 py-3 text-sm text-destructive'>
                        <span className='mt-0.5 shrink-0'>&#9888;</span>
                        <span>{serverError}</span>
                    </div>
                )}

                <form
                    method='POST'
                    action="#"
                    noValidate
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit()
                    }}
                    className='space-y-4'
                >


                    <form.Field
                        name='email'
                        validators={{ onChange: loginZodSchema.shape.email }}
                    >
                        {
                            (field) => (
                                <AppField
                                    field={field}
                                    label='Email'
                                    type='email'
                                    placeholder='you@example.com'
                                />
                            )
                        }
                    </form.Field>


                    <form.Field
                        name='password'
                        validators={{ onChange: loginZodSchema.shape.password }}
                    >
                        {
                            (field) => (
                                <AppField
                                    field={field}
                                    label='Password'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Enter your password'
                                    labelAppend={
                                        <Link
                                            href='/forgot-password'
                                            className='text-xs text-primary hover:underline'
                                        >
                                            Forgot password?
                                        </Link>
                                    }
                                    append={
                                        <Button
                                            variant='ghost'
                                            type='button'
                                            onClick={() => setShowPassword(!showPassword)}
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                            className='w-11 h-11 text-muted-foreground hover:text-foreground hover:bg-transparent focus:bg-transparent focus:ring-0 focus:ring-offset-0'
                                        >
                                            {showPassword ? <EyeOff size={16} aria-hidden='true' /> : <Eye size={16} aria-hidden='true' />}
                                        </Button>
                                    }
                                />
                            )
                        }
                    </form.Field>


                    <form.Subscribe
                        selector={(s) => [s.canSubmit, s.isSubmitting] as const}
                    >
                        {([canSubmit, isSubmitting]) => (
                            <AppSubmitButton
                                className='w-full h-11 font-medium'
                                disabled={!canSubmit || isSubmitting || isPending}
                                isPending={isSubmitting}
                                pendingLabel='Signing in...'
                            >
                                Sign In
                            </AppSubmitButton>
                        )}

                    </form.Subscribe>

                </form>

            </div>
        </div>
    );
};

export default LoginForm;
