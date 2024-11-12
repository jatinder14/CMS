import { db } from '@/db';
import { posts } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const allPosts = await db.select().from(posts).execute();
    return NextResponse.json(allPosts);
  } catch (error: any) {
    console.log('Error while fetching all posts ', error);
    return NextResponse.json(
      {
        error: error?.message,
      },
      {
        status: 500,
      }
    );
  }
}
