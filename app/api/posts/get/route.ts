import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('id') as string;
    if (!postId) {
      return NextResponse.json(
        { error: 'Bad request postId missing.' },
        { status: 400 }
      );
    }
    const post = await db
      .select()
      .from(posts)
      .where(eq(posts.id, parseInt(postId)))
      .execute();
    return NextResponse.json(post);
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
