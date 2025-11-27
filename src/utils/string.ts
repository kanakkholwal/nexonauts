import { appConfig } from "@root/project.config";
import { customAlphabet } from "nanoid";
import TurndownService from "turndown";
import { z } from "zod";

export function slugify(text: string): string {
  let slug = text.toString().toLowerCase().trim();

  // Remove non-alphanumeric characters
  slug = slug.replace(/[^a-z0-9\s-]/g, "");

  // Replace whitespace with hyphens
  slug = slug.replace(/\s+/g, "-");

  // Remove duplicate hyphens
  slug = slug.replace(/-{2,}/g, "-");

  // Remove leading and trailing hyphens
  slug = slug.replace(/^-+|-+$/g, "");

  return slug;
}
// Utility to decode HTML entities
export const decodeHTMLEntities = (text: string) => {
  return text.replace(/&amp;/g, '&')
             .replace(/&lt;/g, '<')
             .replace(/&gt;/g, '>')
             .replace(/&quot;/g, '"')
             .replace(/&#039;/g, "'");
};

export function generateSlug(length = 8): string {
  return customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    length
  )();
}

export function createSlug(text: string): string {
  return slugify(text) + "-" + generateSlug();
}
export type RoutePattern = string | RegExp;

export const toRegex = (route: RoutePattern): RegExp => {
  if (route instanceof RegExp) return route;
  if (route === "/") return /^\/?$/; // Special case for root

  const parts = route.split("/").filter((part) => part !== ""); // Remove empty parts

  if (parts.length === 0) return /^\/?$/; // Handle cases like empty string
  // handle "!" as a negation

  const regexStr = parts
    .map((part) => {
      if (part === "*") return ".*";
      if (part.startsWith(":")) return "[a-z0-9-_]+";
      return part.replace(/[-[\]{}()+?.,\\^$|#\s]/g, "\\$&");
    })
    .join("\\/");

  return new RegExp(`^\\/${regexStr}\\/?$`, "i");
};
export function changeCase(
  str: string,
  type: "upper" | "lower" | "title" | "sentence" | "camel_to_title"
) {
  switch (type) {
    case "upper":
      return str.toUpperCase();
    case "lower":
      return str.toLowerCase();
    case "title":
      return str
        .replaceAll("_", " ")
        .replaceAll("-", " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    case "sentence":
      return str.charAt(0).toUpperCase() + str.slice(1);
    case "camel_to_title": {
      // Convert camelCase to Title Case
      // Example: "helloWorld" -> "Hello World"
      const result = str.replace(/([A-Z])/g, " $1");
      return result.charAt(0).toUpperCase() + result.slice(1);
    }

    default:
      return str;
  }
}
const appUrl = new URL(appConfig.url);

type UTMSource = string; // usually hostname or campaign source
type UTMMedium = "app" | "email" | "social" | "cpc" | "affiliate";
type UTMParams = {
  utm_medium?: UTMMedium;
  utm_campaign?: string;
  utm_source?: UTMSource;
  utm_path?: string;
};

export function marketwiseLink(link: string, options: UTMParams = {}) {
  const url = new URL(link);

  const {
    utm_medium = "app",
    utm_campaign = "/resources",
    utm_source = appUrl.hostname,
    utm_path = "/resources",
  } = options;

  const campaignPath = new URL(utm_path, appUrl).toString();

  url.searchParams.set("utm_source", utm_source);
  url.searchParams.set("utm_medium", utm_medium);
  url.searchParams.set("utm_campaign", utm_campaign || campaignPath);
  url.searchParams.set("ref", campaignPath);

  return url.toString();
}
export function validatePassword(password: string) {
  const minLength = 8;
  const minUppercase = 1;
  const minLowercase = 1;
  const minNumbers = 1;
  const minSpecialChars = 1;
  const specialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

  const uppercaseRegex = /[A-Z]/g;
  const lowercaseRegex = /[a-z]/g;
  const numbersRegex = /[0-9]/g;
  const passwordSchema = z
    .string()
    .min(minLength)
    .refine(
      (password) =>
        (password.match(uppercaseRegex) || []).length >= minUppercase,
      {
        message: `Password must contain at least ${minUppercase} uppercase letter`,
      }
    )
    .refine(
      (password) =>
        (password.match(lowercaseRegex) || []).length >= minLowercase,
      {
        message: `Password must contain at least ${minLowercase} lowercase letter`,
      }
    )
    .refine(
      (password) => (password.match(numbersRegex) || []).length >= minNumbers,
      {
        message: `Password must contain at least ${minNumbers} number`,
      }
    )
    .refine(
      (password) =>
        specialChars.test(password) &&
        (password.match(specialChars) || []).length >= minSpecialChars,
      {
        message: `Password must contain at least ${minSpecialChars} special character`,
      }
    );
  const result = passwordSchema.safeParse(password);
  if (!result.success) {
    return {
      valid: false,
      message: result.error.errors[0].message,
    };
  }

  return {
    valid: true,
    message: "Password is strong",
  };
}
export function HtmlToMarkdown(inputString: string): string {
  const turndownService = new TurndownService();
  return turndownService.turndown(inputString);
}
