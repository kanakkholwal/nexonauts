import { FormProvider } from "./form-context";

import { AppType } from "src/types/app";
import { SessionUserType } from "src/types/user";
import AppView from "./app-view";

export default function AppplicationLayout({ user, app }: { user: SessionUserType, app: AppType }) {

    console.log(app);


    return (<FormProvider app={app} >
        <div className="w-full h-full justify-center items-center">
            <AppView user={user} />
        </div>

    </FormProvider>)
}