import { createAuthClient } from "better-auth/svelte";
import { adminClient, usernameClient, inferAdditionalFields } from "better-auth/client/plugins";
import { env } from "$env/dynamic/public";
import type { auth } from "$lib/server/auth";

export const authClient = createAuthClient({
	baseURL: env.PUBLIC_BASE_URL ?? env.PUBLIC_NEXT_PUBLIC_BASE_URL,
	plugins: [
		usernameClient(),
		adminClient(),
		inferAdditionalFields<typeof auth>()
	]
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
