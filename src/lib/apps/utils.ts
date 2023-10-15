import { CgWorkAlt } from 'react-icons/cg';
import { FcSalesPerformance } from 'react-icons/fc';
import { GoPerson } from 'react-icons/go';
import { LiaMoneyBillWaveSolid } from 'react-icons/lia';
import { MdBusiness, MdOutlineAutoGraph } from 'react-icons/md';
import { PiStudentFill } from 'react-icons/pi';
import { TbHealthRecognition, TbSocial } from 'react-icons/tb';
import type { App } from 'types/app';

export const CATEGORIES = [
    { label: "Education", value: "education",Icon:PiStudentFill },
    { label: "Personal", value: "personal" ,Icon:GoPerson},
    { label: "Career", value: "career",Icon:CgWorkAlt },
    { label: "Business", value: "business",Icon:MdBusiness },
    { label: "Health", value: "health",Icon:TbHealthRecognition },
    // { label: "Lifestyle", value: "lifestyle" },
    { label: "Sales & Marketing", value: "sales_and_marketing" ,Icon:FcSalesPerformance},
    { label: "Finance", value: "finance" ,Icon:LiaMoneyBillWaveSolid},
    { label: "Productivity", value: "productivity" ,Icon:MdOutlineAutoGraph},
    { label: "Social", value: "social",Icon:TbSocial },
] as {
    label: string;
    value: string;
    Icon:React.ElementType;
}[];

export function getUsageData(apps: App[], userId: string) {
    const today = new Date().toISOString().split('T')[0]; // Get today's date
    const userUsage = apps.map(app => {
        const usageToday = app.usage.filter(usage => {
            const date = new Date(usage.createdAt).toISOString().split('T')[0]; // Get the date portion of createdAt
            return usage.userId.toString() === userId && date === today; // Filter by userId and today's date
        })
        return {
            name: app.name,
            appId: app.appId,
            usage: app.usage.filter(usage => usage.userId.toString() === userId).reduce((acc, cur) => {
                const date = new Date(cur.createdAt).toISOString().split('T')[0]; // Get the date portion of createdAt
                acc[date] = (acc[date] || 0) + 1; // Count the number of usages per day
                return acc;
            }, {}),// Filter by userId,
            usageToday: usageToday.length,
        };
    });
    const totalUsageToday = userUsage.map(app => app.usageToday).reduce((acc, cur) => acc + cur, 0);
    const totalUsage = userUsage.map(app => Object.values(app.usage).reduce((acc: number, cur: number) => acc + cur, 0)).reduce((acc: number, cur: number) => acc + cur, 0);
    const usage = {
        totalUsageToday,
        totalUsage,
        usageLimit: 5
    }
    return usage;
}
// most used app
export function getMostUsedApp(apps: App[], userId: string) {

    const userUsage = apps.map(app => {
        return {
            name: app.name,
            appId: app.appId,
            usage: app.usage.filter(usage => usage.userId.toString() === userId).reduce((acc, cur) => {
                const date = new Date(cur.createdAt).toISOString().split('T')[0]; // Get the date portion of createdAt
                acc[date] = (acc[date] || 0) + 1; // Count the number of usages per day
                return acc;
            }, {}),// Filter by userId,
        };
    });
    const mostUsedApp = userUsage.reduce((acc, cur) => {
        const totalUsage = Object.values(cur.usage).reduce((acc: number, cur: number) => acc + cur, 0)  as number;
        if (totalUsage > acc.totalUsage) {
            acc = {
                name: cur.name,
                appId: cur.appId,
                totalUsage
            };
        }
        return acc;
    }, { name: '', appId: '', totalUsage: 0 });
    return mostUsedApp;
}


