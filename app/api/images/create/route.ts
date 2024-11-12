import { db } from '@/db';
import { imageSlider, imageSliderLink } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const storedImage = await db
      .insert(imageSlider)
      .values({
        images: body.images,
      })
      .returning();
    console.log('storedImages ', storedImage);
    await db
      .insert(imageSliderLink)
      .values({
        entityType: body.type,
        imageSliderId: storedImage[0].id,
        entityId: body.entityId,
      })
      .returning();
    return NextResponse.json({ status: 200, message: 'Successful' });
  } catch (error: any) {
    console.log('Error creating/storing images in images->create ', error);
    return NextResponse.json(
      {
        message: error?.message,
      },
      {
        status: 500,
      }
    );
  }
}
