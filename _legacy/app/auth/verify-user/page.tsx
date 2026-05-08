import { Metadata } from "next";
import { getSession } from "~/auth/server";
import { verifyUser } from "./action";
import { UserAuthForm } from "./verify-form";

export const metadata: Metadata = {
  title: "Verify Email | NexoNauts",
  description: "Login to an account on NexoNauts",
  keywords: "register, account, NexoNauts",
  publisher: "noindex, nofollow",
};

export default async function Page() {
  const session = await getSession();

  return (
    <UserAuthForm
      className="flex-auto w-full"
      key={"form"}
      loggedIn={!!session?.user}
      verifyUser={verifyUser}
    />
  );
}
