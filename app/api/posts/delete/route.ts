import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('id') as string;
    if (!postId) {
      return NextResponse.json(
        { error: 'Bad request postId missing.' },
        { status: 400 }
      );
    }
    const deletedPost = await db
      .delete(posts)
      .where(eq(posts.id, parseInt(postId)))
      .returning();
    return NextResponse.json({ status: 200, data: deletedPost });
  } catch (error: any) {
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
