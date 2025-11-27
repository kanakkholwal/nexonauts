import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import dbConnect from "src/lib/db";
import User from "src/models/user";
import { getSession } from "~/auth/server";

import { Session } from "src/auth";
import { AccountForm } from "./account";

export const metadata: Metadata = {
  title: "Account",
  description: "Account Settings page",
};

export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  const session = (await getSession()) as Session;


  async function handleUpdateName(newName: string): Promise<{
    result: string;
    message: string;
  }> {
    "use server";
  await dbConnect();

    const user = await User.findById(session.user.id);
    if (!user) {
      return Promise.reject({
        result: "fail",
        message: "User not found",
      });
    }
    user.name = newName;
    await user.save();

    return Promise.resolve({
      result: "success",
      message: "Name updated successfully",
    });
  }

 
  async function handleUpdatePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<{
    result: string;
    message: string;
  }> {
    "use server";
  await dbConnect();

    const user = await User.findById(session.user.id);
    if (!user) {
      return Promise.reject({
        result: "fail",
        message: "User not found",
      });
    }
    if (!user.comparePassword(oldPassword)) {
      return Promise.reject({
        result: "fail",
        message: "Invalid password",
      });
    }
    user.password = newPassword;

    await user.save();

    return Promise.resolve({
      result: "success",
      message: "Password updated successfully",
    });
  }

  return (
    <div className="space-y-6 p-4 md:p-10 pb-16 w-full rounded-3xl mt-5">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Account</h2>
        <p className="text-muted-foreground">Manage your account settings.</p>
      </div>
      <Separator className="my-6" />
      <div className="mt-5">
        <AccountForm
          user={session.user}
          serverActions={{ handleUpdateName, handleUpdatePassword }}
        />
      </div>
    </div>
  );
}
