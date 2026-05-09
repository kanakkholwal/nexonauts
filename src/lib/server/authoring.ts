import dbConnect from "$lib/db";
import ProductModel, { type ProductType } from "src/models/product";
import PublicToolModel, {
	type PublicToolPricingType,
	type PublicToolStatus,
	type PublicToolTypeWithId
} from "src/models/tool";
import { createSlug } from "src/utils/string";

export type ProductInput = {
	name: string;
	description: string;
	url: string;
	preview_url: string;
	tags: string[];
	categories: string[];
	price: number;
	published: boolean;
};

export type ToolCategoryInput = { name: string; slug: string };

export type ToolInput = {
	name: string;
	description: string;
	link: string;
	coverImage: string;
	bannerImage?: string;
	tags: string[];
	categories: ToolCategoryInput[];
	pricing_type: PublicToolPricingType;
	status: PublicToolStatus;
	verified?: boolean;
};

export type AuthoringResult<T> =
	| { success: true; data: T; message?: string }
	| { success: false; message: string };

function sanitizeTags(tags: string[]): string[] {
	return tags.map((tag) => tag.trim()).filter((tag) => tag.length >= 2);
}

export async function createProduct(
	creatorProfileId: string,
	input: ProductInput
): Promise<AuthoringResult<{ slug: string }>> {
	try {
		await dbConnect();
		const created = await ProductModel.create({
			...input,
			tags: sanitizeTags(input.tags),
			categories: input.categories,
			slug: createSlug(input.name),
			creator: creatorProfileId,
			third_party: { provider: null, product_id: null }
		});
		return { success: true, data: { slug: created.slug }, message: "Product created" };
	} catch (err) {
		console.error("createProduct failed", err);
		return { success: false, message: "Failed to create product" };
	}
}

export async function getProductForCreator(
	slug: string,
	creatorProfileId: string
): Promise<ProductType | null> {
	await dbConnect();
	const product = await ProductModel.findOne({ slug, creator: creatorProfileId }).lean().exec();
	return product ? (JSON.parse(JSON.stringify(product)) as ProductType) : null;
}

export async function getProductBySlug(slug: string): Promise<ProductType | null> {
	await dbConnect();
	const product = await ProductModel.findOne({ slug }).lean().exec();
	return product ? (JSON.parse(JSON.stringify(product)) as ProductType) : null;
}

export async function updateProductByCreator(
	productId: string,
	creatorProfileId: string,
	input: Partial<ProductInput>
): Promise<AuthoringResult<{ slug: string }>> {
	try {
		await dbConnect();
		const tags = input.tags ? sanitizeTags(input.tags) : undefined;
		const updated = await ProductModel.findOneAndUpdate(
			{ _id: productId, creator: creatorProfileId },
			{ ...input, ...(tags ? { tags } : {}) },
			{ new: true }
		)
			.lean()
			.exec();
		if (!updated) return { success: false, message: "Product not found" };
		return {
			success: true,
			data: { slug: (updated as unknown as ProductType).slug },
			message: "Product updated"
		};
	} catch (err) {
		console.error("updateProductByCreator failed", err);
		return { success: false, message: "Failed to update product" };
	}
}

export async function updateProductAsAdmin(
	productId: string,
	input: Partial<ProductInput>
): Promise<AuthoringResult<{ slug: string }>> {
	try {
		await dbConnect();
		const tags = input.tags ? sanitizeTags(input.tags) : undefined;
		const updated = await ProductModel.findByIdAndUpdate(
			productId,
			{ ...input, ...(tags ? { tags } : {}) },
			{ new: true }
		)
			.lean()
			.exec();
		if (!updated) return { success: false, message: "Product not found" };
		return {
			success: true,
			data: { slug: (updated as unknown as ProductType).slug },
			message: "Product updated"
		};
	} catch (err) {
		console.error("updateProductAsAdmin failed", err);
		return { success: false, message: "Failed to update product" };
	}
}

export async function getToolBySlug(slug: string): Promise<PublicToolTypeWithId | null> {
	await dbConnect();
	const tool = await PublicToolModel.findOne({ slug }).lean().exec();
	return tool ? (JSON.parse(JSON.stringify(tool)) as PublicToolTypeWithId) : null;
}

export async function listToolCategories(): Promise<ToolCategoryInput[]> {
	await dbConnect();
	const categories = await PublicToolModel.aggregate([
		{ $unwind: "$categories" },
		{
			$group: {
				_id: "$categories.slug",
				name: { $first: "$categories.name" },
				slug: { $first: "$categories.slug" }
			}
		},
		{ $project: { _id: 0, name: 1, slug: 1 } },
		{ $sort: { name: 1 } }
	]);
	return categories as ToolCategoryInput[];
}

export async function updateToolAsAdmin(
	toolId: string,
	input: Partial<ToolInput>
): Promise<AuthoringResult<{ slug: string }>> {
	try {
		await dbConnect();
		const tags = input.tags ? sanitizeTags(input.tags) : undefined;
		const updated = await PublicToolModel.findByIdAndUpdate(
			toolId,
			{ ...input, ...(tags ? { tags } : {}) },
			{ new: true, runValidators: true }
		)
			.lean()
			.exec();
		if (!updated) return { success: false, message: "Tool not found" };
		return {
			success: true,
			data: { slug: (updated as unknown as PublicToolTypeWithId).slug },
			message: "Tool updated"
		};
	} catch (err) {
		console.error("updateToolAsAdmin failed", err);
		return { success: false, message: "Failed to update tool" };
	}
}

export async function updateToolByAuthor(
	toolId: string,
	authorProfileId: string,
	input: Partial<ToolInput>
): Promise<AuthoringResult<{ slug: string }>> {
	try {
		await dbConnect();
		const tags = input.tags ? sanitizeTags(input.tags) : undefined;
		const updated = await PublicToolModel.findOneAndUpdate(
			{ _id: toolId, author: authorProfileId },
			{ ...input, ...(tags ? { tags } : {}) },
			{ new: true, runValidators: true }
		)
			.lean()
			.exec();
		if (!updated) return { success: false, message: "Tool not found" };
		return {
			success: true,
			data: { slug: (updated as unknown as PublicToolTypeWithId).slug },
			message: "Tool updated"
		};
	} catch (err) {
		console.error("updateToolByAuthor failed", err);
		return { success: false, message: "Failed to update tool" };
	}
}

export const PRODUCT_CATEGORIES = [
	"Course",
	"Design",
	"Productivity",
	"Templates",
	"Themes",
	"UI Kits"
] as const;

export const TOOL_PRICING_TYPES = [
	"free",
	"paid",
	"freemium",
	"one_time_license",
	"subscription",
	"open_source",
	"other"
] as const satisfies readonly PublicToolPricingType[];

export const TOOL_STATUSES = [
	"draft",
	"pending",
	"published",
	"archived",
	"rejected",
	"deleted"
] as const satisfies readonly PublicToolStatus[];
