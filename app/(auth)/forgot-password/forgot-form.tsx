"use client";

import { useState } from 'react';

import { Button } from "@/components/ui/button";
import { LuMail } from "react-icons/lu";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from '@/lib/utils';
import { zodResolver } from "@hookform/resolvers/zod";
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import * as z from "zod";
const FormSchema = z.object({
    email: z
        .string()
        .min(5, { message: 'Email must be at least 5 characters long' })
        .email({ message: 'Invalid email format' })
        .max(100, { message: 'Email cannot exceed 100 characters' }),
});


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
        },
    });
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
        setIsLoading(true)



    }





    return (
        <div className={cn("grid gap-6 lg:max-w-lg text-left", className)} {...props}>

            <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <div className='relative group'>

                                    <FormLabel className='absolute top-1/2 -translate-y-1/2 left-4 z-50'>
                                        <LuMail className='w-4 h-4' />
                                    </FormLabel>
                                    <FormControl className='relative'>
                                        <Input
                                            id="email"
                                            placeholder="name@example.com"
                                            type="email"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            variant="fluid"
                                            disabled={isLoading}
                                            className='pl-12 !py-6 pr-5 !mt-0'
                                            {...field} />
                                    </FormControl>

                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <Button disabled={isLoading} type="submit" className="mt-2 tracking-wide" size="lg">
                        {isLoading && (
                            <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Send reset link
                    </Button>
                    <p className='text-left text-sm font-medium text-slate-500 dark:text-slate-300 mt-2'>
                        Remembered your password? <Link href="/login" className='text-primary hover:underline'>Login</Link>
                    </p>
                </form>
            </Form>


        </div>
    )
}


