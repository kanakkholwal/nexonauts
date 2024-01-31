"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioStyle } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, ExternalLink, Send } from 'lucide-react';
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuMail } from "react-icons/lu";
import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { GoPerson } from "react-icons/go";
const FormSchema = z.object({
    name: z.string().min(1, { message: 'Name must be between 1 and 100 characters' })
        .max(100, { message: 'Name must be between 1 and 100 characters' }),
    email: z
        .string()
        .email({ message: 'Invalid email format' })
        .min(5, { message: 'Email must be at least 5 characters long' })
        .max(100, { message: 'Email cannot exceed 100 characters' }),
    message: z.string().min(30, { message: 'Message should be atleast 30 characters long' })
        .max(500, { message: 'Message cannot exceed 500 characters' }),
    category: z.string().min(1, { message: 'Please select a category' })
        .max(100, { message: 'Please select a category' }),
    companyName: z.string().max(100, { message: 'Company name cannot exceed 100 characters' }),
    website: z.string().max(100, { message: 'Website cannot exceed 100 characters' }),
});

export function ContactForm() {
    const { data: session,status } = useSession();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: session?.user?.name || "",
            email: session?.user?.email || "",
            message: "",
            category: "",
            companyName: "",
            website: "",
        },
    });



    async function onSubmit(data: z.infer<typeof FormSchema>) {
        // validate the inputs first before sending the request
        console.log(data)

        await fetch("/api/contact",{

        })





    }
    return (<Form  {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 w-full">
        <div className="flex gap-4 w-full items-center justify-evenly flex-col lg:flex-row">

            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem className="grid gap-1.5 grow w-full">
                        <div className='relative group'>
                            <FormLabel className='absolute top-1/2 -translate-y-1/2 left-4 z-50'>
                                <GoPerson className='w-4 h-4' />
                            </FormLabel>
                            <FormControl className='relative'>
                                <Input
                                    id="name"
                                    placeholder="Enter your name"
                                    type="text"
                                    autoCapitalize="none"
                                    autoComplete="name"
                                    autoCorrect="off"
                                    required
                                    disabled={isLoading} variant="fluid"
                                    className='pl-12 !py-6 pr-5 !mt-0'
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
                    <FormItem className="grid gap-1.5 grow w-full">
                        <div className='relative group'>

                            <FormLabel className='absolute top-1/2 -translate-y-1/2 left-4 z-50'>
                                <LuMail className='w-4 h-4' />
                            </FormLabel>
                            <FormControl className='relative'>
                                <Input
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    required
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    disabled={isLoading} variant="fluid"
                                    className='pl-12 !py-6 pr-5 !mt-0'
                                    {...field} />
                            </FormControl>

                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        <div className="flex gap-4 w-full items-center justify-evenly flex-col lg:flex-row">
            <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                    <FormItem className="grid gap-1.5 grow w-full">
                        <div className='relative group'>
                            <FormLabel className='absolute top-1/2 -translate-y-1/2 left-4 z-50'>
                                <Building2 className='w-4 h-4' />
                            </FormLabel>
                            <FormControl className='relative'>
                                <Input
                                    id="companyName"
                                    placeholder="Enter your Company Name"
                                    type="text"
                                    autoCapitalize="none"
                                    autoComplete="name"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                    variant="fluid"
                                    className='pl-12 !py-6 pr-5 !mt-0'
                                    {...field} />
                            </FormControl>
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                    <FormItem className="grid gap-1.5 grow w-full">
                        <div className='relative group'>
                            <FormLabel className='absolute top-1/2 -translate-y-1/2 left-4 z-50'>
                                <ExternalLink className='w-4 h-4' />
                            </FormLabel>
                            <FormControl className='relative'>
                                <Input
                                    id="website"
                                    placeholder="Enter your website url"
                                    type="url"
                                    autoCapitalize="none"
                                    autoComplete="name"
                                    autoCorrect="off"
                                    disabled={isLoading} variant="fluid"
                                    className='pl-12 !py-6 pr-5 !mt-0'
                                    {...field} />
                            </FormControl>
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />

        </div>
        <div className="grid gap-1.5">
            <FormField
                control={form.control}
                name="category"
                
                render={({ field }) => (
                    <FormItem>

                        <FormLabel>
                            What would you like to chat about?
                        </FormLabel>
                        <FormControl className='flex flex-wrap gap-4 w-full justify-around'>

                            <div className="flex flex-wrap gap-4 w-full justify-around">
                                {[
                                    "Brand Strategy", "Marketing / Ads", "Careers", "Development", "Design / UX&UI", "Other"
                                ].map((item, index) => {
                                    return (<label key={index} className={RadioStyle.label}>
                                        {item}
                                        <input type="radio" required  {...field} disabled={isLoading} name="category"  value={item} className={RadioStyle.input}/>
                                    </label>)
                                })}
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {/* <Label htmlFor="chat_about">What would you like to chat about?</Label>
            <div className="flex flex-wrap gap-4 w-full justify-around">
                {[
                    "Brand Strategy", "Marketing / Ads", "Careers", "Development", "Design / UX&UI", "Other"
                ].map((item, index) => {
                    return (<label key={index} className="text-slate-700 cursor-pointer has-[:checked]:ring-primary/50 has-[:checked]:text-primary has-[:checked]:bg-primary/10 flex justify-between items-center gap-6 rounded-lg p-4 ring-1 ring-transparent hover:bg-slate-100">
                        {item}
                        <input type="radio" onChange={(e) => {

                        }} name="chat_about" value={item} className={RadioStyle.input}/>
                    </label>)
                })}
            </div> */}
        </div>


        <div className="grid gap-1.5">
            <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                    <FormItem>

                        <FormLabel >
                            Your Message
                        </FormLabel>
                        <FormControl>
                            <Textarea
                                id="message" placeholder="Enter your message"
                                cols={60}
                                rows={10}
                                autoCapitalize="none"
                                autoComplete="name"
                                autoCorrect="off"
                                disabled={isLoading}
                                variant="fluid"
                                required

                                {...field} />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        <div className="flex items-center justify-center">
            <Button type="submit" size="lg" className="tracking-wide text-lg rounded-full mx-auto w-full max-w-md relative before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95" disabled={isLoading}>
                <span className="relative text-base font-semibold text-white">
                    Send Message <Send className="w-5 h-5 ml-2 inline-block" />
                </span>
            </Button>
        </div>

    </form>
    </Form>)
}
