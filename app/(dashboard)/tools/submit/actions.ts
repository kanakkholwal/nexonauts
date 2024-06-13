'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
// import mongoose from "mongoose";
import { getSession } from 'src/lib/auth';
import dbConnect from 'src/lib/dbConnect';
import PublicTool from 'src/models/tool';
export async function getCategories() {
  await dbConnect();

  const categories = await PublicTool.aggregate([
    { $unwind: '$categories' },
    {
      $group: {
        _id: '$categories.slug',
        name: { $first: '$categories.name' },
        slug: { $first: '$categories.slug' },
      },
    },
    { $project: { _id: 0, name: 1, slug: 1 } },
    //  sort by name
    { $sort: { name: 1 } },
  ]);
  return {
    available_categories: JSON.parse(JSON.stringify(categories)),
  };
}

export async function submitTool(data: Record<string, any>) {
  try {
    const session = await getSession();
    if (!session) return redirect('/login');
    await dbConnect();
    const tool = new PublicTool({
      name: data.name,
      description: data.description,
      coverImage: data.coverImage,
      categories: data.categories,
      tags: data.tags,
      link: data.link,
      slug: data.slug,
      status: data.status,
      pricing_type: data.pricing_type,
      verified: false,
      author: session.user._id,
    });
    await tool.save();

    revalidatePath('/tools/');
    return Promise.resolve(true);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}
