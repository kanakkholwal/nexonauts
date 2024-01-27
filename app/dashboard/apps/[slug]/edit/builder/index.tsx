"use client";

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
import { AppType } from "src/types/app";
import { SessionUserType } from "src/types/user";

// import { BuilderProvider } from "../common/context/builder-context";
// import InfoTab from "./info-tab";
// import InputTab from "./inputs-tab";
// import LogicTab from "./logic-tab";
// import OutputTab from "./output-tab";

// import AppEdit from "../app-edit";




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

export default function Builder({
    user,
    app,
    mode = "submit"

}: {
    user: SessionUserType,
    app: AppType,
    mode: "edit" | "submit"
}) {

    console.log(user);
    console.log(app);
    console.log(mode);

    


    return (
    <>
        <div className="flex gap-1 items-start justify-around w-full h-full">
            {/* <AppEdit
            user={user}
            /> */}
            <div role="toolbar" className="p-2">
                <Tabs defaultValue="app-info" className="w-[500px]">
                    <TabsList className="grid w-full grid-cols-4 rounded-3xl shadow">
                        {STEPS.map((step) => (<TabsTrigger value={step.id} key={step.id} className="rounded-3xl">{step.title}</TabsTrigger>))}
                    </TabsList>
                    <TabsContent value="app-info">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-black font-semibold">
                                    Meta Data
                                </CardTitle>
                                <CardDescription>
                                    Change meta information about your app here
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* <InfoTab app={app}/> */}

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

            </div>

        </div>

    </>
    )
}



