import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updatedPost = await db
      .update(posts)
      .set(body)
      .where(eq(posts.id, body.id))
      .returning();
    return NextResponse.json({ status: 200, data: updatedPost });
  } catch (error: any) {
    if (error.code === '23505') {
      // Error code for unique violation in PostgreSQL
      console.log('Slug must be unique. Please choose a different slug.');
      return NextResponse.json(
        {
          error: 'Slug must be unique. Please choose a different slug.',
        },
        {
          status: 500,
        }
      );
      // Handle the duplicate slug error (e.g., notify the user)
    }
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
