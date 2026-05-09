import dbConnect from "$lib/db";
import MessageModel from "src/models/message";
import ProductModel from "src/models/product";
import ProfileModel from "src/models/profile";
import PublicToolModel from "src/models/tool";
import UserModel from "src/models/user";

export type ModerationResult = { success: boolean; message: string };

export async function deleteUserAsAdmin(
	adminUserId: string,
	targetUserId: string
): Promise<ModerationResult> {
	await dbConnect();

	const adminUser = await UserModel.findById(adminUserId).exec();
	if (!adminUser || adminUser.role !== "admin") {
		return { success: false, message: "Unauthorized" };
	}

	const target = await UserModel.findById(targetUserId).exec();
	if (!target) {
		return { success: false, message: "User not found" };
	}

	if (target.role === "admin") {
		const adminCount = await UserModel.countDocuments({ role: "admin" });
		if (adminCount <= 1) {
			return { success: false, message: "Cannot delete the only admin" };
		}
	}

	await UserModel.findByIdAndDelete(targetUserId).exec();
	await ProfileModel.findOneAndDelete({ user: targetUserId }).exec();

	return { success: true, message: "User deleted" };
}

export async function deleteProductAsAdmin(productId: string): Promise<ModerationResult> {
	await dbConnect();
	const result = await ProductModel.findByIdAndDelete(productId).exec();
	return result
		? { success: true, message: "Product deleted" }
		: { success: false, message: "Product not found" };
}

export async function deleteProductAsCreator(
	productId: string,
	creatorProfileId: string
): Promise<ModerationResult> {
	await dbConnect();
	const result = await ProductModel.findOneAndDelete({
		_id: productId,
		creator: creatorProfileId
	}).exec();
	return result
		? { success: true, message: "Product deleted" }
		: { success: false, message: "Product not found" };
}

export async function deleteToolAsAdmin(toolId: string): Promise<ModerationResult> {
	await dbConnect();
	const result = await PublicToolModel.findByIdAndDelete(toolId).exec();
	return result
		? { success: true, message: "Tool deleted" }
		: { success: false, message: "Tool not found" };
}

export async function setToolVerification(
	toolId: string,
	verified: boolean
): Promise<ModerationResult> {
	await dbConnect();
	const result = await PublicToolModel.findByIdAndUpdate(toolId, { verified }).exec();
	return result
		? { success: true, message: verified ? "Tool verified" : "Verification removed" }
		: { success: false, message: "Tool not found" };
}

export async function setToolStatus(
	toolId: string,
	status: "draft" | "published" | "archived"
): Promise<ModerationResult> {
	await dbConnect();
	const result = await PublicToolModel.findByIdAndUpdate(toolId, { status }).exec();
	return result
		? { success: true, message: `Tool status updated to ${status}` }
		: { success: false, message: "Tool not found" };
}

export async function deleteToolAsAuthor(
	toolId: string,
	authorProfileId: string
): Promise<ModerationResult> {
	await dbConnect();
	const result = await PublicToolModel.findOneAndDelete({
		_id: toolId,
		author: authorProfileId
	}).exec();
	return result
		? { success: true, message: "Tool deleted" }
		: { success: false, message: "Tool not found" };
}

export async function setMessageRead(
	messageId: string,
	read: boolean
): Promise<ModerationResult> {
	await dbConnect();
	const result = await MessageModel.findByIdAndUpdate(messageId, { read }).exec();
	return result
		? { success: true, message: read ? "Marked as read" : "Marked as unread" }
		: { success: false, message: "Message not found" };
}

export async function deleteMessage(messageId: string): Promise<ModerationResult> {
	await dbConnect();
	const result = await MessageModel.findByIdAndDelete(messageId).exec();
	return result
		? { success: true, message: "Message deleted" }
		: { success: false, message: "Message not found" };
}
