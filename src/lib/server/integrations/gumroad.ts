import dbConnect from "$lib/db";
import ProductModel from "src/models/product";
import UserModel from "src/models/user";
import { generateSlug } from "src/utils/string";

export type GumroadProduct = {
	id: string;
	name: string;
	description: string;
	price: number;
	url: string;
	preview_url: string | null;
	tags: string[];
	categories: string[];
	published: boolean;
	third_party: { provider: "gumroad"; product_id: string };
};

type GumroadApiProduct = {
	id: string;
	name: string;
	description: string;
	price: number;
	short_url: string;
	preview_url: string | null;
	tags: string[];
	categories?: string[];
	published: boolean;
	deleted: boolean;
	is_tiered_membership: boolean;
};

const GUMROAD_PRODUCTS_ENDPOINT = "https://api.gumroad.com/v2/products";

async function getGumroadAccessToken(userId: string): Promise<string | null> {
	await dbConnect();
	const user = await UserModel.findById(userId).select("integrations").lean().exec();
	const integrations = user && "integrations" in user ? user.integrations : null;
	const token = (integrations as { gumroad?: { access_token?: string | null } } | null)?.gumroad
		?.access_token;
	return typeof token === "string" && token.length > 0 ? token : null;
}

function sanitizeProduct(product: GumroadApiProduct): GumroadProduct {
	return {
		id: product.id,
		name: product.name,
		description: product.description ?? "",
		price: Number((product.price / 100).toFixed(2)),
		url: product.short_url,
		preview_url: product.preview_url ?? null,
		tags: product.tags ?? [],
		categories: product.categories ?? [],
		published: product.published,
		third_party: { provider: "gumroad", product_id: product.id }
	};
}

export async function listGumroadProducts(
	userId: string
): Promise<{ ok: true; products: GumroadProduct[] } | { ok: false; message: string }> {
	const token = await getGumroadAccessToken(userId);
	if (!token) {
		return { ok: false, message: "Connect Gumroad in Settings → Integrations first." };
	}

	const url = new URL(GUMROAD_PRODUCTS_ENDPOINT);
	url.searchParams.set("access_token", token);

	let response: Response;
	try {
		response = await fetch(url.toString());
	} catch (err) {
		console.error("Gumroad fetch failed", err);
		return { ok: false, message: "Could not reach Gumroad." };
	}

	if (!response.ok) {
		return { ok: false, message: `Gumroad responded ${response.status}` };
	}

	const data = (await response.json()) as { success?: boolean; products?: GumroadApiProduct[] };
	if (!data.success || !data.products) {
		return { ok: false, message: "Gumroad rejected the request." };
	}

	const filtered = data.products.filter(
		(product) => product.deleted === false && product.is_tiered_membership === false
	);

	return { ok: true, products: filtered.map(sanitizeProduct) };
}

export async function importGumroadProduct(
	userId: string,
	creatorProfileId: string,
	gumroadProductId: string
): Promise<{ ok: true; slug: string } | { ok: false; message: string }> {
	const list = await listGumroadProducts(userId);
	if (!list.ok) return list;

	const product = list.products.find((p) => p.id === gumroadProductId);
	if (!product) return { ok: false, message: "Product not found in Gumroad library." };

	await dbConnect();

	const existing = await ProductModel.findOne({
		"third_party.provider": "gumroad",
		"third_party.product_id": product.id,
		creator: creatorProfileId
	}).exec();

	if (existing) {
		return { ok: false, message: "Product is already imported." };
	}

	const created = await ProductModel.create({
		name: product.name,
		description: product.description,
		price: product.price,
		url: product.url,
		preview_url: product.preview_url ?? "",
		tags: product.tags,
		categories: product.categories,
		published: product.published,
		slug: generateSlug(),
		creator: creatorProfileId,
		third_party: product.third_party
	});

	return { ok: true, slug: created.slug };
}
