import dbConnect from "$lib/db";
import type { ProductType } from "src/models/product";
import ProductModel from "src/models/product";

type RawCreator = {
	_id?: string;
	username?: string;
	user?: {
		name?: string;
		username?: string;
		profilePicture?: string;
	};
};

export type MarketplaceProduct = Omit<ProductType, "creator"> & {
	creator?: {
		_id?: string;
		username: string;
		name?: string;
		profilePicture?: string;
	};
};

export type MarketplaceCategoryGroup = {
	category: string;
	products: MarketplaceProduct[];
};

export type MarketplaceSearchParams = {
	query?: string;
	category?: string;
	tags?: string;
	price?: string;
};

export type MarketplaceTagMeta = {
	tag: string;
	count: number;
};

function normalizeProduct<T>(input: T): T {
	return JSON.parse(JSON.stringify(input)) as T;
}

function normalizeCreator(rawCreator: RawCreator | undefined) {
	if (!rawCreator) return undefined;

	return {
		_id: rawCreator._id,
		username: rawCreator.username ?? rawCreator.user?.username ?? "unknown",
		name: rawCreator.user?.name,
		profilePicture: rawCreator.user?.profilePicture
	};
}

function normalizeMarketplaceProduct(product: MarketplaceProduct): MarketplaceProduct {
	return {
		...product,
		creator: normalizeCreator(product.creator as RawCreator | undefined)
	};
}

export async function getMarketplaceProductsByCategory(): Promise<MarketplaceCategoryGroup[]> {
	await dbConnect();

	const products = normalizeProduct(
		await ProductModel.find({ published: true })
			.populate({
				path: "creator",
				populate: {
					path: "user",
					select: "name username profilePicture"
				}
			})
			.sort({ createdAt: -1 })
			.lean()
			.exec()
	) as unknown as MarketplaceProduct[];

	const grouped = new Map<string, MarketplaceProduct[]>();

	for (const product of products) {
		for (const category of product.categories ?? []) {
			if (!grouped.has(category)) grouped.set(category, []);
			const bucket = grouped.get(category);
			if (bucket && bucket.length < 4) {
				bucket.push(normalizeMarketplaceProduct(product));
			}
		}
	}

	return [...grouped.entries()]
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([category, categoryProducts]) => ({
			category,
			products: categoryProducts
		}));
}

export async function searchMarketplaceProducts(
	searchParams: MarketplaceSearchParams
): Promise<MarketplaceProduct[]> {
	await dbConnect();

	const { query, category, tags, price } = searchParams;
	const filter: Record<string, unknown> = { published: true };

	if (query) {
		filter.$or = [
			{ name: { $regex: query, $options: "i" } },
			{ description: { $regex: query, $options: "i" } }
		];
	}

	if (category) {
		filter.categories = { $in: [new RegExp(category, "i")] };
	}

	if (tags) {
		filter.tags = { $all: tags.split(",").filter(Boolean) };
	}

	if (price) {
		if (price === "free") {
			filter.price = 0;
		} else if (price === "paid") {
			filter.price = { $gt: 0 };
		} else if (price === "under-20") {
			filter.price = { $gt: 0, $lte: 20 };
		} else if (price === "premium") {
			filter.price = { $gt: 20 };
		}
	}

	const products = normalizeProduct(
		await ProductModel.find(filter)
			.populate({
				path: "creator",
				populate: {
					path: "user",
					select: "name username profilePicture"
				}
			})
			.sort({ createdAt: -1 })
			.limit(36)
			.lean()
			.exec()
	) as unknown as MarketplaceProduct[];

	return products.map(normalizeMarketplaceProduct);
}

export async function getMarketplacePopularTags(): Promise<MarketplaceTagMeta[]> {
	await dbConnect();

	const products = normalizeProduct(
		await ProductModel.find({ published: true }).select("tags").lean().exec()
	) as { tags?: string[] }[];

	const counts = new Map<string, number>();

	for (const product of products) {
		for (const tag of product.tags ?? []) {
			const normalized = tag.trim();
			if (!normalized) continue;
			counts.set(normalized, (counts.get(normalized) ?? 0) + 1);
		}
	}

	return [...counts.entries()]
		.map(([tag, count]) => ({ tag, count }))
		.sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export async function getMarketplaceProductBySlug(
	slug: string
): Promise<MarketplaceProduct | null> {
	await dbConnect();

	const product = normalizeProduct(
		await ProductModel.findOne({ slug, published: true })
			.populate({
				path: "creator",
				populate: {
					path: "user",
					select: "name username profilePicture"
				}
			})
			.lean()
			.exec()
	) as MarketplaceProduct | null;

	return product ? normalizeMarketplaceProduct(product) : null;
}

export async function getMoreMarketplaceProductsByCreator(
	product: MarketplaceProduct
): Promise<MarketplaceProduct[]> {
	if (!product.creator?._id) return [];

	await dbConnect();

	const products = normalizeProduct(
		await ProductModel.find({
			published: true,
			creator: product.creator._id,
			_id: { $ne: product._id }
		})
			.populate({
				path: "creator",
				populate: {
					path: "user",
					select: "name username profilePicture"
				}
			})
			.sort({ createdAt: -1 })
			.limit(6)
			.lean()
			.exec()
	) as unknown as MarketplaceProduct[];

	return products.map(normalizeMarketplaceProduct);
}

export async function getSimilarMarketplaceProducts(
	product: MarketplaceProduct
): Promise<MarketplaceProduct[]> {
	await dbConnect();

	const candidates = normalizeProduct(
		await ProductModel.find({
			published: true,
			_id: { $ne: product._id },
			categories: { $in: product.categories ?? [] }
		})
			.populate({
				path: "creator",
				populate: {
					path: "user",
					select: "name username profilePicture"
				}
			})
			.lean()
			.exec()
	) as unknown as MarketplaceProduct[];

	const wantedTags = new Set(product.tags ?? []);

	return candidates
		.map((candidate) => ({
			product: normalizeMarketplaceProduct(candidate),
			score: (candidate.tags ?? []).filter((tag) => wantedTags.has(tag)).length
		}))
		.sort((a, b) => b.score - a.score)
		.slice(0, 6)
		.map(({ product: candidate }) => candidate);
}
