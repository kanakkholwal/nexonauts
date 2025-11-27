import { z } from "zod";

export const ROLES_ENUMS = {
  ADMIN: "admin",
  USER: "user",
  PUBLISHER: "publisher",
} as const;

export const ROLES: readonly string[] = Object.values(ROLES_ENUMS);

export const ROLES_MAP = Object.fromEntries(
  Object.entries(ROLES).map(([key, value]) => [value, key])
);

export const ALLOWED_ROLES = [
  "dashboard"
];

// export const DASHBOARD_ROLES = [

// ]
export const GENDER = {
  MALE: "male",
  FEMALE: "female",
  NOT_SPECIFIED: "not_specified",
};
export const GENDER_ENUMS = Object.values(GENDER);
export const genderSchema = z.enum(["male", "female", "not_specified"]);




const passwordSettings = {
  minLength: 8,
  minUppercase: 1,
  minLowercase: 1,
  minNumbers: 1,
  minSpecialChars: 1,
  specialChars: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/,
  uppercaseRegex: /[A-Z]/g,
  lowercaseRegex: /[a-z]/g,
  numbersRegex: /[0-9]/g,
};

export const passwordSchema = z
  .string()
  .min(passwordSettings.minLength)
  .refine(
    (password) =>
      (password.match(passwordSettings.uppercaseRegex) || []).length >=
      passwordSettings.minUppercase,
    {
      message: `Password must contain at least ${passwordSettings.minUppercase} uppercase letter`,
    }
  )
  .refine(
    (password) =>
      (password.match(passwordSettings.lowercaseRegex) || []).length >=
      passwordSettings.minLowercase,
    {
      message: `Password must contain at least ${passwordSettings.minLowercase} lowercase letter`,
    }
  )
  .refine(
    (password) =>
      (password.match(passwordSettings.numbersRegex) || []).length >=
      passwordSettings.minNumbers,
    {
      message: `Password must contain at least ${passwordSettings.minNumbers} number`,
    }
  )
  .refine(
    (password) =>
      passwordSettings.specialChars.test(password) &&
      (password.match(passwordSettings.specialChars) || []).length >=
        passwordSettings.minSpecialChars,
    {
      message: `Password must contain at least ${passwordSettings.minSpecialChars} special character`,
    }
  );

