import { db } from '@/db';
import { imageSlider, imageSliderLink } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const entityId = searchParams.get('entityId') as string;
    const entityType = searchParams.get('entityType') as string;
    const imagesLink = await db
      .select()
      .from(imageSliderLink)
      .where(
        and(
          eq(imageSliderLink.entityId, parseInt(entityId)),
          eq(imageSliderLink.entityType, entityType)
        )
      )
      .execute();
    const images: any = [];
    for (const imageLink of imagesLink) {
      const fetchedImages = await db
        .select()
        .from(imageSlider)
        .where(eq(imageSlider.id, imageLink.imageSliderId));
      images.push(fetchedImages);
    }
    return NextResponse.json({
      status: 200,
      images: images[0],
    });
  } catch (error: any) {
    console.log('Error getting images ', error);
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
