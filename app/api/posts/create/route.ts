import { db } from '@/db';
import { posts } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const createdPost = await db.insert(posts).values(body).returning();
    return NextResponse.json({ status: 200, data: createdPost });
  } catch (error: any) {
    if (error.code === '23505') {
      // Error code for unique violation in PostgreSQL
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
