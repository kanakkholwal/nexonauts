import mongoose from "mongoose";
import dbConnect from "src/lib/db";
import PostModel from "src/models/post";
import ProductModel from "src/models/product";
import ProfileModel from "src/models/profile";
import PublicTool from "src/models/tool";
import PublicToolRating from "src/models/tool-rating";

async function migrateUsersToProfiles() {
    if (prompt("Are you sure you want to migrate User references to Profile references? This action is irreversible. (yes/no)") !== "yes") {
        console.log("Migration aborted by user.");
        process.exit(0);
    }
    try {
        await dbConnect("production");
        const profiles = await ProfileModel.find({}).select("_id user").lean().exec();
        const userIdToProfileIdMap: Record<string, string> = {};
        profiles.forEach(profile => {
            userIdToProfileIdMap[profile.user.toString()] = profile._id!.toString();
        });
        console.log("Fetched profiles and created userId to profileId map.");
        // Now migrate references in other collections
        const userIds = Object.keys(userIdToProfileIdMap);
        console.log(`Migrating references for ${userIds.length} users.`);

        // fetch all Products and change the original author field from User to Profile model
        const products = await ProductModel.find({}).exec();
        for await (const product of products) {
            const authorId = product.creator.toString();
            if (userIdToProfileIdMap[authorId]) {
                product.creator = new mongoose.Types.ObjectId(userIdToProfileIdMap[authorId]);
                await product.save();
            }
        }
        console.log("Updated Product authors.");
        // fetch all ToolRatings and change the original userId field from User to Profile model
        const ratings = await PublicToolRating.find({}).exec();
        for await (const rating of ratings) {
            const userId = rating.userId.toString();
            if (userIdToProfileIdMap[userId]) {
                rating.userId = new mongoose.Types.ObjectId(userIdToProfileIdMap[userId]);
                await rating.save();
            }
        }
        console.log("Updated ToolRating userIds.");

        // fetch all Posts and change the original author field from User to Profile model
        const posts = await PostModel.find({}).select("_id author").exec();
        for await (const post of posts) {
            const authorId = post.author.toString();
            if (userIdToProfileIdMap[authorId]) {
                post.author = new mongoose.Types.ObjectId(userIdToProfileIdMap[authorId]);
                await post.save();
            }
        }
        console.log("Updated Post authors.");
        // fetch all PublicTool and change the original author field and bookmarks from User to Profile model
        const tools = await PublicTool.find({}).exec();
        for await (const tool of tools) {
            const authorId = tool.author.toString();
            if (userIdToProfileIdMap[authorId]) {
                tool.author = new mongoose.Types.ObjectId(userIdToProfileIdMap[authorId]);
                await tool.save();
            }
            // update bookmarks
            const updatedBookmarks = tool.bookmarks
                .map(bookmarkId => bookmarkId.toString())
                .filter(bookmarkId => userIdToProfileIdMap[bookmarkId])
                .map(bookmarkId => new mongoose.Types.ObjectId(userIdToProfileIdMap[bookmarkId]));
            tool.bookmarks = updatedBookmarks;
            await tool.save();
        }
        console.log("Updated PublicTool author and bookmarks.");
        console.log("Migration completed successfully.");
        process.exit(0);
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
}
migrateUsersToProfiles();