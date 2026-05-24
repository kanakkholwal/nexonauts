import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "$env/dynamic/private";

const expiresInMinutes = 30;

function getSecret(): string {
	const secret = env.JWT_SECRET;
	if (!secret) {
		throw new Error("JWT_SECRET is not set in the environment.");
	}
	return secret;
}

export const generateToken = (payload: Record<string, string | number | boolean> | string) =>
	jwt.sign(payload, getSecret(), { expiresIn: `${expiresInMinutes}m` });

export const verifyToken = (token: string): JwtPayload | null => {
	try {
		return jwt.verify(token, getSecret()) as JwtPayload | null;
	} catch {
		return null;
	}
};
