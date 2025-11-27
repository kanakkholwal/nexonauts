import { appConfig } from "@root/project.config";
import { betterAuth, BetterAuthOptions } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { APIError } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { admin, haveIBeenPwned, username } from "better-auth/plugins";
import { mailFetch } from "src/lib/server-fetch";
import { client, db } from "~/lib/db";


const VERIFY_EMAIL_PATH_PREFIX = "/auth/verify-mail";
const RESET_PASSWORD_PATH_PREFIX = "/auth/reset-password";

const baseUrl = new URL(process.env.BASE_URL as string);

export const betterAuthOptions = {
  appName: appConfig.name,
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
  onAPIError: {
    throw: true,
    onError: (error, ctx) => {
      console.log("Auth error:", error);
      console.log("Auth error , context:", ctx);
    },
    // errorURL: "/auth/error",
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: true,

    sendResetPassword: async ({ user, url, token }, request) => {
      // const verification_url = `${baseUrl}${RESET_PASSWORD_PATH_PREFIX}${token}`;
      const reset_link = new URL(process.env.BASE_URL as string);
      reset_link.pathname = RESET_PASSWORD_PATH_PREFIX;
      reset_link.searchParams.set("token", token);

      try {
        const response = await mailFetch<{
          data: string[] | null;
          error?: string | null | object;
        }>("/api/send", {
          method: "POST",
          body: JSON.stringify({
            template_key: "reset-password",
            targets: [user.email],
            subject: "Reset Password",
            payload: {
              name: user.name,
              email: user.email,
              reset_link: reset_link.toString(),
            },
          }),
        });
        if (response.error) {
          throw new APIError("INTERNAL_SERVER_ERROR", {
            message: "Error sending email from mail server",
          });
        }
        console.log(response.data);
      } catch (err) {
        console.error(err);
        throw new APIError("INTERNAL_SERVER_ERROR", {
          message: "Error sending email",
        });
      }
    },
  },
  emailVerification: {
    sendOnSignUp: true,

    sendVerificationEmail: async ({ user, url, token }, request) => {
      const verification_url = new URL(process.env.BASE_URL as string);
      verification_url.pathname = VERIFY_EMAIL_PATH_PREFIX;
      verification_url.searchParams.set("token", token);
      try {
        const response = await mailFetch<{
          data: string[] | null;
          error?: string | null | object;
        }>("/api/send", {
          method: "POST",
          body: JSON.stringify({
            template_key: "welcome_verify",
            targets: [user.email],
            subject: `Welcome to ${appConfig.name}`,
            payload: {
              platform_name: appConfig.name,
              name: user.name,
              email: user.email,
              verification_url: baseUrl.toString(),
            },
          }),
        });
        if (response.error) {
          throw new APIError("INTERNAL_SERVER_ERROR", {
            message: "Error sending email",
          });
        }
        console.log(response);
      } catch (err) {
        console.error(err);
        throw new APIError("INTERNAL_SERVER_ERROR", {
          message: "Error sending email",
        });
      }
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      mapProfileToUser: async (profile) => {
        return {
          image: profile.picture,
        };
      },
    },
    github: {
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      mapProfileToUser: async (profile) => {
        return {
          image: profile.avatar_url,
        };
      },
    },
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: process.env.NODE_ENV === "production",
      domain: appConfig.appDomain,
    },
    cookiePrefix: "nexonauts",
  },
  trustedOrigins: [
    "nexonauts.com", // Trust all subdomains of nexonauts.com
    "auth.nexonauts.com", // Trust all subdomains of nexonauts.com
    "app.nexonauts.com", // Trust all subdomains of nexonauts.com
    "platform.nexonauts.com", // Trust all subdomains of nexonauts.com
    "https://nexonauts.com", // Trust only HTTPS subdomains
    "https://auth.nexonauts.com", // Trust only HTTPS subdomains
    "https://app.nexonauts.com", // Trust only HTTPS subdomains
    "https://platform.nexonauts.com", // Trust only HTTPS subdomains
    "*.nexonauts.com", // Trust all subdomains of nexonauts.com
    "https://*.nexonauts.com", // Trust only HTTPS subdomains
    "https://*.dev.nexonauts.com", // Trust HTTPS subdomains of dev.nexonauts.com
  ],
  // trustedOrigins: [appConfig.url, `https://${appConfig.appDomain}`,`https://*.nexonauts.com`],
  user: {
    modelName:"users",
    fields: {
      image: "profilePicture",
      emailVerified: "verified",
    },
    additionalFields: {
      role: {
        type: "string",
        required: true,
        input: false,
        defaultValue: "user",
      },
      other_roles: {
        type: "string[]",
        required: false,
        input: false,
      },
      account_type: {
        type: "string",
        required: true,
        input: false,
        defaultValue: "free",
      },

      gender: {
        type: "string",
        input: true,
        defaultValue: "not_specified",
      },
      username: {
        type: "string",
        required: true,
        unique: true,
        input: true,
      },
      integrations: {
        type: "json",
        input: false,
        defaultValue: {},
      },
      profile: {
        type: "string",
        input: false,
        defaultValue: null,
      }
    },
  },
  session: {
    expiresIn: 604800, // 7 days
    updateAge: 86400, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
      strategy: "compact" // or "jwt" or "jwe"
    },
  },
  account: {
    encryptOAuthTokens: true, // Encrypt OAuth tokens before storing them in the database

    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github", "email-password"],
      allowDifferentEmails: false,
    },
  },

  plugins: [
    username(),
    admin({
      defaultRole: "user",
      adminRole: ["admin"],
      defaultBanExpiresIn: 60 * 60 * 24 * 7, // 1 week
    }),
    haveIBeenPwned({
      customPasswordCompromisedMessage: "Please choose a more secure password.",
    }),
    nextCookies(),
  ], // make sure this is the last plugin (nextCookies) in the array
  telemetry: {
    enabled: false,
  },
} satisfies BetterAuthOptions;

export const auth = betterAuth(betterAuthOptions);





export type Session = typeof auth.$Infer.Session;
export type SessionUserType = typeof auth.$Infer.Session.user;
