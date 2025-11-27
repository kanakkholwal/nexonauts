import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { getSession } from "~/auth/server";

import { getMessages } from "./actions";
import { MessageDisplay } from "./components/message-display";
import { MessageList } from "./components/message-list";
import { useMessagesStore } from "./store";
import StoreInitializer from "./store-initializer";

export default async function DashboardPage() {
  const session = (await getSession()) as Session;

  const { messages, totalPages } = await getMessages("", 1, {});

  useMessagesStore.setState({
    messages,
    selected: messages[0]._id,
    totalPages,
    currentPage: 1,
    query: "",
    filter: {},
  });

  return (
    <div className="space-y-6 my-5">
      <StoreInitializer messages={messages} />
      <div className="flex items-stretch gap-2 container mx-auto bg-glasss p-4">
        <div className="flex flex-col flex-auto max-w-lg">
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Inbox</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All mail
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Unread
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className=" p-4 backdrop-blur-sm mb-5">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <MessageList type="all" />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <MessageList type="unread" />
            </TabsContent>
          </Tabs>
        </div>
        <div className="flex-1 h-full w-full">
          <MessageDisplay />
        </div>
      </div>
    </div>
  );
}
