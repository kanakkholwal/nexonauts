import dbConnect from "$lib/db";
import MessageModel from "src/models/message";
import ProductModel from "src/models/product";
import ProfileModel from "src/models/profile";
import PublicToolModel from "src/models/tool";
import UserModel from "src/models/user";

export type AdminUserRow = {
	_id: string;
	name: string;
	username: string;
	email: string;
	role: string;
	verified: boolean;
	profilePicture: string;
	createdAt: string;
};

export type AdminProductRow = {
	_id: string;
	name: string;
	slug: string;
	published: boolean;
	price: number;
	categories: string[];
	creator: {
		_id: string;
		username: string;
	};
	createdAt: string;
};

export type AdminToolRow = {
	_id: string;
	name: string;
	slug: string;
	status: string;
	verified: boolean;
	pricing_type: string;
	categories: { name: string; slug: string }[];
	createdAt: string;
};

export type AdminMessageRow = {
	_id: string;
	name: string;
	email: string;
	subject: string;
	type: string;
	read: boolean;
	createdAt: string;
};

export type DashboardProfileRow = {
	_id: string;
	username: string;
	bio: string;
	interests: string[];
	socials: { name: string; url: string }[];
	followers: string[];
	following: string[];
};

export type DashboardAccountRow = {
	_id: string;
	name: string;
	username: string;
	email: string;
	role: string;
	account_type: string;
	verified: boolean;
	profilePicture: string;
	createdAt: string;
	updatedAt: string;
};

export type DashboardIntegrationsRow = {
	github: {
		integrated: boolean;
		scope: string | null;
		lastAuthorized: string | null;
	};
	gumroad: {
		integrated: boolean;
		scope: string | null;
		lastAuthorized: string | null;
	};
};

export async function getAdminUsers(limit = 50): Promise<AdminUserRow[]> {
	await dbConnect();
	const users = await UserModel.find({})
		.select("name username email role verified profilePicture createdAt")
		.sort({ createdAt: -1 })
		.limit(limit)
		.lean()
		.exec();

	return JSON.parse(JSON.stringify(users));
}

export async function getAdminProducts(limit = 50): Promise<AdminProductRow[]> {
	await dbConnect();
	const products = await ProductModel.find({})
		.populate("creator", "username")
		.select("name slug published price categories creator createdAt")
		.sort({ createdAt: -1 })
		.limit(limit)
		.lean()
		.exec();

	return JSON.parse(JSON.stringify(products));
}

export async function getAdminTools(limit = 50): Promise<AdminToolRow[]> {
	await dbConnect();
	const tools = await PublicToolModel.find({})
		.select("name slug status verified pricing_type categories createdAt")
		.sort({ createdAt: -1 })
		.limit(limit)
		.lean()
		.exec();

	return JSON.parse(JSON.stringify(tools));
}

export async function getAdminMessages(limit = 50): Promise<AdminMessageRow[]> {
	await dbConnect();
	const messages = await MessageModel.find({})
		.select("name email subject type read createdAt")
		.sort({ createdAt: -1 })
		.limit(limit)
		.lean()
		.exec();

	return JSON.parse(JSON.stringify(messages));
}

export async function getDashboardProducts(profileId: string): Promise<AdminProductRow[]> {
	await dbConnect();
	const products = await ProductModel.find({ creator: profileId })
		.populate("creator", "username")
		.select("name slug published price categories creator createdAt")
		.sort({ createdAt: -1 })
		.lean()
		.exec();

	return JSON.parse(JSON.stringify(products));
}

export async function getDashboardTools(profileId: string): Promise<AdminToolRow[]> {
	await dbConnect();
	const tools = await PublicToolModel.find({ author: profileId })
		.select("name slug status verified pricing_type categories createdAt")
		.sort({ createdAt: -1 })
		.lean()
		.exec();

	return JSON.parse(JSON.stringify(tools));
}

export async function getDashboardProfile(profileId: string): Promise<DashboardProfileRow | null> {
	await dbConnect();
	const profile = await ProfileModel.findById(profileId)
		.select("username bio interests socials followers following")
		.lean()
		.exec();

	return profile ? JSON.parse(JSON.stringify(profile)) : null;
}

export async function getDashboardAccount(userId: string): Promise<DashboardAccountRow | null> {
	await dbConnect();
	const user = await UserModel.findById(userId)
		.select("name username email role account_type verified profilePicture createdAt updatedAt")
		.lean()
		.exec();

	return user ? JSON.parse(JSON.stringify(user)) : null;
}

export async function getDashboardIntegrations(
	userId: string
): Promise<DashboardIntegrationsRow | null> {
	await dbConnect();
	const user = await UserModel.findById(userId)
		.select("+integrations")
		.lean()
		.exec();

	if (!user || !("integrations" in user) || !user.integrations) {
		return null;
	}

	const integrations = user.integrations as {
		github?: { integrated?: boolean; scope?: string | null; lastAuthorized?: Date | null };
		gumroad?: { integrated?: boolean; scope?: string | null; lastAuthorized?: Date | null };
	};

	return {
		github: {
			integrated: integrations.github?.integrated ?? false,
			scope: integrations.github?.scope ?? null,
			lastAuthorized: integrations.github?.lastAuthorized?.toISOString() ?? null
		},
		gumroad: {
			integrated: integrations.gumroad?.integrated ?? false,
			scope: integrations.gumroad?.scope ?? null,
			lastAuthorized: integrations.gumroad?.lastAuthorized?.toISOString() ?? null
		}
	};
}
