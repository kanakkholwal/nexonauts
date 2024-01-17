import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { ChevronLeft } from 'lucide-react';
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { notFound } from "next/navigation";
import dbConnect from "src/lib/dbConnect";
import AppModel from "src/models/app";
import { sessionType } from "src/types/session";

import InfoTab from "./builder/info-tab";
import AppProvider from "./store";
const STEPS = [{
    title: "Meta Data",
    id: "app-info",
}, {
    title: "Inputs",
    id: "app-input",
}, {
    title: "Logic",
    id: "app-logic",
}, {
    title: "Output",
    id: "app-output",
}];
export default async function EditApplicationPage({ params }: {
    params: {
        slug: string
    }
}) {
    const session = await getServerSession(authOptions) as sessionType;

    await dbConnect();

    const app = await AppModel.findOne({
        appId: params.slug,
        "developer.userId": session.user._id
    }).lean();
    console.log(app);
    if (!app) return notFound();





    return (
        <div className="space-y-4 mt-5">
            <div className="flex justify-between items-center p-3 flex-wrap">
                <Button variant="dark" asChild>
                    <Link href={`/dashboard/apps`}>
                        <ChevronLeft className="w-6 h-6 mr-2" />
                        Back
                    </Link>
                </Button>
            </div>
            <h2 className="text-3xl font-semibold">
                {app.name}
            </h2>
            <p className="pl-2 text-sm">
                <Badge variant={(app.status === "published" ? "success_light" : app.status === "declined" ? "destructive_light" : app.status === "pending" ? "warning_light" : "default_light")} className="uppercase">
                    {app.status}
                </Badge>
            </p>
            <div className="flex gap-1 items-start justify-between w-full h-full ">
                <div>

                </div>
                <AppProvider app={app}>
                    <Tabs defaultValue="app-info" className="w-[500px]">
                        <TabsList className="grid w-full grid-cols-4 rounded-3xl shadow">
                            {STEPS.map((step) => (<TabsTrigger value={step.id} key={step.id} className="rounded-3xl">{step.title}</TabsTrigger>))}
                        </TabsList>
                        <TabsContent value="app-info">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Meta Data
                                    </CardTitle>
                                    <CardDescription>
                                        Change meta information about your app here
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <InfoTab/>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="app-input">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        App Inputs
                                    </CardTitle>
                                    <CardDescription>
                                        Add input fields to your app here
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {/* <InputTab inputs={app.formFlow.inputs} /> */}
                                </CardContent>

                            </Card>
                        </TabsContent>
                        <TabsContent value="app-logic">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        App Logic
                                    </CardTitle>
                                    <CardDescription>
                                        Add logic to your app here
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {/* <LogicTab app={app} /> */}
                                </CardContent>

                            </Card>
                        </TabsContent>
                        <TabsContent value="app-output">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        App Output
                                    </CardTitle>
                                    <CardDescription>
                                        Add output fields to your app here
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* <OutputTab app={app} mode={mode} user={user} /> */}
                                </CardContent>

                            </Card>
                        </TabsContent>
                    </Tabs>
                </AppProvider>

            </div>

        </div>
    );
}