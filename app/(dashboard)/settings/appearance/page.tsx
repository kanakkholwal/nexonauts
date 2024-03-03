
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { AppearanceForm } from './appearance';
export const metadata: Metadata = {
    title: "Account",
    description: "Account Settings page"
}


export default async function AppearancePage() {


    return (<div className="space-y-6 p-10 pb-16 w-full bg-white dark:bg-slate-800 rounded-3xl mt-5">
        <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">
                Appearance
            </h2>
            <p className="text-muted-foreground">
                Customize the appearance of the site.
            </p>
        </div>
        <Separator className="my-6" />
            <AppearanceForm />

    </div>)
}
