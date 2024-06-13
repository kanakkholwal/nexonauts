import { AppUsage } from 'models/app';
import mongoose from 'mongoose';
import { CgWorkAlt } from 'react-icons/cg';
import { FcSalesPerformance } from 'react-icons/fc';
import { GoPerson } from 'react-icons/go';
import { LiaMoneyBillWaveSolid } from 'react-icons/lia';
import { MdBusiness, MdOutlineAutoGraph } from 'react-icons/md';
import { PiStudentFill } from 'react-icons/pi';
import { TbHealthRecognition, TbSocial } from 'react-icons/tb';
import { AppType } from 'types/app';

export const CATEGORIES = [
  { label: 'Education', value: 'education', Icon: PiStudentFill },
  { label: 'Personal', value: 'personal', Icon: GoPerson },
  { label: 'Career', value: 'career', Icon: CgWorkAlt },
  { label: 'Business', value: 'business', Icon: MdBusiness },
  { label: 'Health', value: 'health', Icon: TbHealthRecognition },
  // { label: "Lifestyle", value: "lifestyle" },
  {
    label: 'Sales & Marketing',
    value: 'sales_and_marketing',
    Icon: FcSalesPerformance,
  },
  { label: 'Finance', value: 'finance', Icon: LiaMoneyBillWaveSolid },
  { label: 'Productivity', value: 'productivity', Icon: MdOutlineAutoGraph },
  { label: 'Social', value: 'social', Icon: TbSocial },
] as {
  label: string;
  value: string;
  Icon: React.ElementType;
}[];

export async function getUsageData(apps: AppType[], userId: string) {
  const today = new Date().toISOString().split('T')[0]; // Get today's date

  // Use MongoDB aggregation to aggregate userUsage data
  const userUsage = await AppUsage.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        createdAt: {
          $gte: new Date(today),
        },
      },
    },
    {
      $group: {
        _id: {
          appId: '$appId',
          date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        },
        count: { $sum: 1 },
      },
    },
  ]);

  // Create a mapping of userUsage data
  const userUsageMap = {};
  userUsage.forEach((item) => {
    const appId = item._id.appId;
    const date = item._id.date;
    const count = item.count;

    if (!userUsageMap[appId]) {
      userUsageMap[appId] = {};
    }

    userUsageMap[appId][date] = count;
  });

  // Calculate usage for each app
  const usageData = apps.map((app) => {
    const appId = app.appId;
    const appName = app.name;

    const usageToday = userUsageMap[appId]
      ? userUsageMap[appId][today] || 0
      : 0;
    const totalUsage = Object.values(userUsageMap[appId] || {}).reduce(
      (acc: any, cur: any) => acc + cur,
      0
    );

    return {
      name: appName,
      appId: appId,
      usage: userUsageMap[appId] || {},
      usageToday: usageToday,
      totalUsage: totalUsage,
    };
  });

  // Calculate total usage for today and overall
  const totalUsageToday = usageData.reduce(
    (acc, app) => acc + app.usageToday,
    0
  );
  const totalUsage = usageData.reduce(
    (acc, app) =>
      acc +
      Object.values(
        app.usage as {
          [key: string]: number;
        }
      ).reduce((a: any, b: any) => a + b, 0),
    0
  );

  const usage = {
    totalUsageToday,
    totalUsage,
    usageLimit: 5,
  };

  return usage;
}

export async function getMostUsedApp(apps: AppType[], userId: string) {
  // Use MongoDB aggregation to find the most used app by the user
  const mostUsedApp = await AppUsage.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $addFields: {
        totalUsage: { $sum: { $objectToArray: '$usage.v' } },
      },
    },
    {
      $sort: {
        totalUsage: -1,
      },
    },
    {
      $limit: 1,
    },
    {
      $project: {
        _id: 0,
        name: 1,
        appId: 1,
        totalUsage: 1,
      },
    },
  ]);

  return mostUsedApp[0] || { name: '', appId: '', totalUsage: 0 };
}
