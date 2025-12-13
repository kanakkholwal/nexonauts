import mongoose from "mongoose";
import dbConnect from "src/lib/db";
import ProfileModel from "src/models/profile";

async function fixProfiles() {
    if (prompt("Are you sure you want to fix Profile references? This action is irreversible. (yes/no)") !== "yes") {
        console.log("Operation aborted by user.");
        process.exit(0);
    }
    try {
        await dbConnect("production");
        const profiles = await ProfileModel.find({}).exec();

        for await (const profile of profiles) {
            // If already an ObjectId, skip

            // Convert string to ObjectId
            try {
                profile.user = new mongoose.Types.ObjectId(profile.user);
                await profile.save();
            } catch (err) {
                console.error("Invalid user value in profile:", profile._id, profile.user);
            }
        }

        console.log("Fixed Profile.user types.");
        process.exit(0);
    } catch (error) {
        console.error("Error fixing Profile references:", error);
        process.exit(1);
    }
}
fixProfiles();