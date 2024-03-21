import {
    Card,
    CardDescription,
    CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
//   import Image from "next/image";
import { User, Workflow } from 'lucide-react';
import Link from "next/link";

export const metadata: Metadata = {
    title: "Settings",
    description: "Settings page"
}
const list = [
    {
        label: "Account",
        description: "Manage your account settings",
        icon: User,
        href: "/settings/account",
    },
    {
        label: "Integrations",
        description:"Manage your integrations",
        icon: Workflow,
        href: "/settings/integrations",
    }
] as const;

export default async function SettingsPage() {


    return (<div className="space-y-6 p-4 md:p-10 pb-16 w-full  rounded-3xl mt-5">
        <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
                Manage your account settings, site appearance and set e-mail preferences.
            </p>
        </div>
        <Separator className="my-6" />
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {list.map((link) => {
                return <Link key={link.href} href={link.href}>
                    <Card variant="glass" className='transition transform duration-300 hover:translate-x-1 hover:-translate-y-1 hover:shadow-lg cursor-pointer border p-10 h-full flex content-center flex-wrap'>
                        <div className='h-fit w-full'>
                            <div className='flex justify-center w-full'>
                                <link.icon className='h-10 w-10' />
                            </div>
                            <CardTitle className='text-center mt-2'>
                                {link.label}
                            </CardTitle>
                            <CardDescription className='text-center mt-4'>
                                {link.description}
                            </CardDescription>

                        </div>
                    </Card>
                </Link>
            })}

        </div>

    </div>)
}