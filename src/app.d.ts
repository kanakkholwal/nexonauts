/// <reference path="../docvia-env.d.ts" />
import type { Session } from '$lib/server/auth';

declare global {
	namespace App {
		interface Error {
			message: string;
			code?: string;
		}
		interface Locals {
			session: Session | null;
			currentPath: string;
		}
		interface PageData {
			session: Session | null;
			meta?: {
				title?: string;
				description?: string;
				og?: Record<string, string>;
				twitter?: Record<string, string>;
			};
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
