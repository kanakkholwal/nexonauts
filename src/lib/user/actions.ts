"use server";
import dbConnect from "src/lib/dbConnect";
import UserModel from "src/models/user";


export async function getUserByUserName(username:string){
    await dbConnect();

    const developer = await UserModel.findOne({ username: username })
    .select('username name profilePicture dev_account private verified following followers additional_info createdAt')
    .populate('following', 'username name profilePicture')
    .populate('followers', 'username name profilePicture')
    .exec();

    return developer;
}