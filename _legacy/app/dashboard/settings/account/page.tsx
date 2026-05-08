import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Session } from "src/auth";
import dbConnect from "src/lib/db";
import User from "src/models/user";
import { getSession } from "~/auth/server";
import { AccountForm } from "./account";

export const metadata: Metadata = {
  title: "Account Settings - NexoNauts",
  description: "Manage your personal account details.",
};

export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  const session = (await getSession()) as Session;

  // --- SERVER ACTIONS ---
  async function handleUpdateName(newName: string) {
    "use server";
    await dbConnect();
    const user = await User.findById(session.user.id);
    if (!user) throw new Error("User not found");
    user.name = newName;
    await user.save();
    return { result: "success", message: "Name updated successfully" };
  }

  async function handleUpdatePassword(oldPassword: string, newPassword: string) {
    "use server";
    await dbConnect();
    const user = await User.findById(session.user.id);
    if (!user) throw new Error("User not found");
    if (!user.comparePassword(oldPassword)) throw new Error("Invalid password");
    user.password = newPassword;
    await user.save();
    return { result: "success", message: "Password updated successfully" };
  }

  return (
    <div className="min-h-screen w-full">


      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">

        {/* --- Header --- */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild className="h-9 w-9 rounded-full border border-border/50">
            <Link href="/dashboard/settings">
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Account</h1>
            <p className="text-sm text-muted-foreground">Manage your personal details and security.</p>
          </div>
        </div>

        <Separator className="mb-8 opacity-50" />

        <AccountForm
          user={session.user}
          serverActions={{ handleUpdateName, handleUpdatePassword }}
        />
      </div>
    </div>
  );
}