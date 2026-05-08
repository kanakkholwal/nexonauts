import mongoose from "mongoose";
import dbConnect from "$lib/db";
import type { RatingTypeWithId, rawRatingType } from "src/models/tool-rating";
import RatingModel from "src/models/tool-rating";
import type { PublicToolPricingType, PublicToolTypeWithId, rawCategory } from "src/models/tool";
import PublicToolModel from "src/models/tool";

const SCOUT_VISIBLE_STATUSES = ["published", "approved"] as const;
const RESULTS_PER_PAGE = 69;

export type ScoutCategory = rawCategory;

export type ScoutTool = PublicToolTypeWithId;

export type ScoutCategoryGroup = {
	name: string;
	slug: string;
	tools: ScoutTool[];
};

export type ScoutBrowseFilter = {
	pricing_type: PublicToolPricingType | "all";
	category: string;
};

export type ScoutBrowseResult = {
	tools: ScoutTool[];
	categories: ScoutCategory[];
	totalPages: number;
	totalResults: number;
	pricingTypes: PublicToolPricingType[];
};

export type ScoutRating = RatingTypeWithId;

function normalize<T>(value: T): T {
	return JSON.parse(JSON.stringify(value)) as T;
}

function toolVisibilityFilter() {
	return { status: { $in: [...SCOUT_VISIBLE_STATUSES] } };
}

export async function getScoutToolCount(): Promise<number> {
	await dbConnect();
	return PublicToolModel.countDocuments(toolVisibilityFilter());
}

export async function getScoutLandingCategories(): Promise<ScoutCategoryGroup[]> {
	await dbConnect();

	const categories = normalize(
		await PublicToolModel.aggregate([
			{ $match: toolVisibilityFilter() },
			{ $unwind: "$categories" },
			{
				$group: {
					_id: "$categories.slug",
					name: { $first: "$categories.name" },
					slug: { $first: "$categories.slug" },
					count: { $sum: 1 }
				}
			},
			{ $sort: { count: -1, name: 1 } },
			{ $limit: 5 },
			{ $project: { _id: 0, name: 1, slug: 1 } }
		]).exec()
	) as ScoutCategory[];

	return Promise.all(
		categories.map(async (category) => ({
			...category,
			tools: normalize(
				await PublicToolModel.find({
					...toolVisibilityFilter(),
					"categories.slug": category.slug
				})
					.sort({ createdAt: -1 })
					.limit(6)
					.lean()
					.exec()
			) as unknown as ScoutTool[]
		}))
	);
}

export async function getScoutTools(
	query: string,
	currentPage: number,
	filter: ScoutBrowseFilter,
	offset: number
): Promise<ScoutBrowseResult> {
	await dbConnect();

	const page = Math.max(1, Number(currentPage) || 1);
	const skip = (page - 1) * RESULTS_PER_PAGE + Math.max(0, Number(offset) || 0);

	const filterQuery: Record<string, unknown> = {
		...toolVisibilityFilter()
	};

	if (query) {
		filterQuery.$or = [
			{ slug: { $regex: query, $options: "i" } },
			{ name: { $regex: query, $options: "i" } },
			{ description: { $regex: query, $options: "i" } },
			{ "categories.name": { $regex: query, $options: "i" } },
			{ tags: { $regex: query, $options: "i" } }
		];
	}

	if (filter.pricing_type && filter.pricing_type !== "all") {
		filterQuery.pricing_type = filter.pricing_type;
	}

	if (filter.category && filter.category !== "all") {
		filterQuery["categories.slug"] = filter.category;
	}

	const [tools, categories, pricingTypes, totalResults] = await Promise.all([
		PublicToolModel.find(filterQuery)
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(RESULTS_PER_PAGE)
			.lean()
			.exec(),
		PublicToolModel.aggregate([
			{ $match: toolVisibilityFilter() },
			{ $unwind: "$categories" },
			{
				$group: {
					_id: "$categories.slug",
					name: { $first: "$categories.name" },
					slug: { $first: "$categories.slug" }
				}
			},
			{ $sort: { name: 1 } },
			{ $project: { _id: 0, name: 1, slug: 1 } }
		]).exec(),
		PublicToolModel.distinct("pricing_type", toolVisibilityFilter()),
		PublicToolModel.countDocuments(filterQuery)
	]);

	return {
		tools: normalize(tools) as unknown as ScoutTool[],
		categories: normalize(categories) as ScoutCategory[],
		totalPages: Math.max(1, Math.ceil(totalResults / RESULTS_PER_PAGE)),
		totalResults,
		pricingTypes: normalize(pricingTypes) as PublicToolPricingType[]
	};
}

export async function getScoutToolBySlug(
	slug: string,
	options?: { incrementView?: boolean }
): Promise<ScoutTool | null> {
	await dbConnect();

	const tool = normalize(
		await PublicToolModel.findOne({
			slug,
			...toolVisibilityFilter()
		})
			.lean()
			.exec()
	) as ScoutTool | null;

	if (!tool) return null;

	if (options?.incrementView ?? true) {
		await PublicToolModel.updateOne({ _id: tool._id }, { $inc: { views: 1 } }).exec();
		tool.views = (tool.views ?? 0) + 1;
	}

	return tool;
}

export async function getScoutSimilarTools(tool: ScoutTool): Promise<ScoutTool[]> {
	await dbConnect();

	return normalize(
		await PublicToolModel.find({
			...toolVisibilityFilter(),
			_id: { $ne: tool._id },
			"categories.slug": { $in: (tool.categories ?? []).map((category) => category.slug) }
		})
			.sort({ createdAt: -1 })
			.limit(6)
			.lean()
			.exec()
	) as unknown as ScoutTool[];
}

export async function getScoutRatingsAndReviews(
	toolId: string,
	options?: { limit?: number }
): Promise<ScoutRating[]> {
	await dbConnect();

	return normalize(
		await RatingModel.find({ toolId })
			.sort({ createdAt: -1 })
			.select("toolId rating comment createdAt")
			.populate("userId", "name username profilePicture")
			.limit(options?.limit ?? 5)
			.lean()
			.exec()
	) as unknown as ScoutRating[];
}

export async function toggleScoutBookmark(toolId: string, profileId: string): Promise<boolean> {
	await dbConnect();

	const tool = await PublicToolModel.findById(toolId).select("bookmarks").exec();
	if (!tool) {
		throw new Error("Tool not found");
	}

	const isBookmarked = tool.bookmarks.some((bookmark) => String(bookmark) === profileId);
	const profileObjectId = new mongoose.Types.ObjectId(profileId);

	const updatedTool = await PublicToolModel.findByIdAndUpdate(
		toolId,
		{
			[isBookmarked ? "$pull" : "$addToSet"]: {
				bookmarks: profileObjectId
			}
		},
		{ new: true }
	)
		.select("bookmarks")
		.exec();

	if (!updatedTool) {
		throw new Error("Tool not found");
	}

	return updatedTool.bookmarks.some((bookmark) => String(bookmark) === profileId);
}

export async function postScoutRatingAndReview(data: rawRatingType): Promise<ScoutRating> {
	await dbConnect();
	const rating = new RatingModel(data);
	await rating.save();

	return normalize(
		await RatingModel.findById(rating._id)
			.select("toolId rating comment createdAt")
			.populate("userId", "name username profilePicture")
			.lean()
			.exec()
	) as unknown as ScoutRating;
}
