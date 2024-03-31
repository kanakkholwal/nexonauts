"use client";

import { UserRound } from 'lucide-react';
import { useState } from 'react';

import { Button } from "@/components/ui/button";
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
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import { LuMail } from "react-icons/lu";
import * as z from "zod";


const FormSchema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters long' }).max(100, { message: 'Name cannot exceed 100 characters' }),
    email: z
        .string()
        .email({
            message: 'Please enter a valid email address'
        })
        .min(5, { message: 'Email must be at least 5 characters long' })
        .max(100, { message: 'Email cannot exceed 100 characters' }),
});
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    joinWaitList: (data: z.infer<typeof FormSchema>) => Promise<boolean>
}

export default function WaitListForm({ className,joinWaitList, ...props }: UserAuthFormProps) {
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

        toast.promise(joinWaitList(data), {
            loading: 'Adding to Waitlist...',
            success: (data) => {
                console.log(data);
                setIsLoading(false);
                return "Added to waitlist successfully"
            },
            error: (err) => {
                console.log(err);
                setIsLoading(false)
                return err.message || "An error occurred"
            }
        })
    }

    return (
        <div className={cn("grid gap-6 w-full text-left", className)} {...props}>
            <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <div className='relative group'>
                                    <FormLabel className='absolute top-1/2 -translate-y-1/2 left-4 z-50'>
                                        <UserRound className='w-4 h-4' />
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your Name"
                                            type="text"
                                            autoCapitalize="words"
                                            autoComplete="name"
                                            autoCorrect="off"   
                                            disabled={isLoading}
                                            className='pl-10'

                                            {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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
                                            placeholder="name@example.com"
                                            type="email"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            className='pl-10'
                                            {...field} />
                                    </FormControl>

                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={isLoading} type="submit" className="mt-2" width="sm">
                        {isLoading && (
                            <AiOutlineLoading className="animate-spin" />
                        )}
                        Join Waitlist
                    </Button>

                </form>
            </Form>

        </div>)
}