import { customAlphabet } from "nanoid";
import { z } from "zod";
import TurndownService from "turndown";

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

export function generateSlug(length = 8): string {
  return customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    length
  )();
}

export function createSlug(text: string): string {
  return slugify(text) + "-" + generateSlug();
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
