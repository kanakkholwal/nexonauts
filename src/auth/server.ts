"use server";
import { headers } from "next/headers";
import { auth, Session } from ".";

export const getSession = async ():Promise<Session | null> => {
  try {
    const headersList = await headers();

    const session = await auth.api.getSession({
      headers: headersList,
    });
    
    return JSON.parse(JSON.stringify(session));
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
};
