import dbConnect from "src/lib/db";
import PublicTool from "src/models/tool";
import { z } from "zod";
// import data from "./data.json";

// ===== Types & Schemas =====

const publicToolSchema = z.object({
    name: z.string().min(1).max(100),
    coverImage: z.string().url(),
    bannerImage: z.string().url().optional(),
    description: z.string().min(1).max(5000),
    categories: z.array(
        z.object({
            name: z.string().min(1).max(50),
            slug: z.string().min(1).max(50),
        })
    ),
    tags: z.array(z.string().min(1).max(30)).max(20),
    link: z.string().url(),
    slug: z.string().min(1).max(100),
    status: z.enum(["public", "private", "draft"]),
    pricing_type: z.enum(["free", "paid", "freemium", "other"]),
    verified: z.boolean(),
});

type PublicTool = z.infer<typeof publicToolSchema>;
type PricingType = PublicTool["pricing_type"];
type StatusType = PublicTool["status"];

interface RawToolData {
    toolName?: string;
    thumbnail?: { asset?: { _ref?: string } };
    mainImage?: { asset?: { _ref?: string } };
    toolShortDescription?: string;
    toolCategories?: Array<{
        categoryName?: string;
        slug?: { current?: string };
    }>;
    tagsIndex?: string[];
    websiteUrl?: string;
    slug?: { current?: string };
    status?: string;
    pricing?: string[];
    verified?: boolean;
}

// ===== Image Processing =====

const IMAGE_EXTENSIONS = {
    png: '.png',
    jpg: '.jpg',
    webp: '.webp',
} as const;

const CDN_BASE_URL = 'https://cdn.<some-site>.com/';

function extractImageReference(ref: string): string {
    let cleanRef = ref.replace('image-', '');
    
    for (const ext of Object.values(IMAGE_EXTENSIONS)) {
        cleanRef = cleanRef.replace(`-${ext.slice(1)}`, ext);
    }
    
    return cleanRef;
}

function convertImageAssetToUrl(imageObj: any): string {
    const assetRef = imageObj?.asset?._ref;
    if (!assetRef) return '';
    
    const imageRef = extractImageReference(assetRef);
    return `${CDN_BASE_URL}${imageRef}`;
}

// ===== Data Mapping =====

function mapPricingType(pricing?: string[]): PricingType {
    if (!pricing?.length) return "other";
    
    const pricingMap: Record<string, PricingType> = {
        "Free Trial": "freemium",
        "Free": "free",
        "Paid": "paid",
    };
    
    for (const [key, value] of Object.entries(pricingMap)) {
        if (pricing.includes(key)) return value;
    }
    
    return "other";
}

function mapStatus(status?: string): StatusType {
    const statusMap: Record<string, StatusType> = {
        "In Review": "draft",
    };
    
    return statusMap[status || ''] || "public";
}

function sanitizeToolData(rawTool: RawToolData): PublicTool {
    const tool = {
        name: rawTool.toolName || '',
        coverImage: convertImageAssetToUrl(rawTool.thumbnail),
        bannerImage: rawTool.mainImage 
            ? convertImageAssetToUrl(rawTool.mainImage) 
            : undefined,
        description: rawTool.toolShortDescription || '',
        categories: (rawTool.toolCategories || []).map(cat => ({
            name: cat.categoryName || '',
            slug: cat.slug?.current || '',
        })),
        tags: rawTool.tagsIndex || [],
        link: rawTool.websiteUrl || '',
        slug: rawTool.slug?.current || '',
        status: mapStatus(rawTool.status),
        pricing_type: mapPricingType(rawTool.pricing),
        verified: rawTool.verified || false,
    };

    return publicToolSchema.parse(tool);
}

// ===== Database Operations =====

async function toolExists(slug: string): Promise<boolean> {
    const existingTool = await PublicTool.findOne({ slug }).lean().exec();
    return !!existingTool;
}

async function saveTool(tool: PublicTool): Promise<void> {
    const newTool = new PublicTool({
        ...tool,
        // TODO: Replace with actual author profile ID
        author:"SOME_PROFILE_ID",
    });
    await newTool.save();
}

async function processTool(rawTool: RawToolData): Promise<{ success: boolean; message: string }> {
    try {
        const sanitizedTool = sanitizeToolData(rawTool);
        
        if (await toolExists(sanitizedTool.slug)) {
            return {
                success: false,
                message: `Tool "${sanitizedTool.name}" (${sanitizedTool.slug}) already exists. Skipped.`
            };
        }
        
        await saveTool(sanitizedTool);
        return {
            success: true,
            message: `Successfully added: ${sanitizedTool.name}`
        };
    } catch (error) {
        const toolName = rawTool.toolName || 'Unknown';
        return {
            success: false,
            message: `Failed to process "${toolName}": ${error instanceof Error ? error.message : 'Unknown error'}`
        };
    }
}

// ===== Main Execution =====
const data = [] as any[]; // TODO: Load your raw tool data here
async function importTools(): Promise<void> {
    await dbConnect();
    
    console.log(`Starting import of ${data.length} tools...\n`);
    
    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;
    
    for (const rawTool of data) {
        const result = await processTool(rawTool);
        console.log(result.message);
        
        if (result.success) {
            successCount++;
        } else if (result.message.includes('already exists')) {
            skipCount++;
        } else {
            errorCount++;
        }
    }
    
    console.log('\n===== Import Summary =====');
    console.log(`✓ Successfully imported: ${successCount}`);
    console.log(`⊘ Skipped (already exists): ${skipCount}`);
    console.log(`✗ Failed: ${errorCount}`);
    console.log(`Total processed: ${data.length}`);
}

// ===== Entry Point =====

importTools()
    .then(() => {
        console.log('\nImport completed successfully.');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\nCritical error during import:', error);
        process.exit(1);
    });