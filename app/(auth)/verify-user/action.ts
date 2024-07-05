"use server";
import { verifyToken } from "emails/helper";
import dbConnect from "src/lib/dbConnect";
import UserModel from "src/models/user";

export async function verifyUser(token: string) {
  const payload = verifyToken(token);
  console.log(`payload`, payload);
  if (!payload) {
    return {
      success: false,
      message: "invalid token",
    };
  }
  //  check if token is expired
  if (payload && payload?.exp && Date.now() >= payload.exp * 1000) {
    return {
      success: false,
      message: "token expired",
    };
  }
  console.log("Token is valid. payload:", payload);
  // verify user
  await dbConnect();
  const user = await UserModel.findOneAndUpdate(
    {
      email: payload.email,
    },
    {
      verified: true,
      verificationToken: null,
    }
  ).exec();
  if (!user) {
    return {
      success: false,
      message: "user not found",
    };
  }
  console.log("User verified successfully");
  return {
    success: true,
    message: "User verified successfully",
  };
}
