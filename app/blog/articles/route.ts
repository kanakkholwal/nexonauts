import { NextResponse } from "next/server";
import { getAllPublishedPostsForMapping } from "src/lib/blog/actions";

export async function GET(req) {
  const posts = await getAllPublishedPostsForMapping();

  return NextResponse.json(posts, {
    headers: {
      "Cache-Control": "s-maxage=1, stale-while-revalidate",
    },
    status: 200,
  });
}
