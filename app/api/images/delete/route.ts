import { db } from '@/db';
import { imageSlider, imageSliderLink } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const entityId = searchParams.get('entityId') as string;
    const imageId = searchParams.get('imageId') as string;
    if (!entityId || !imageId) {
      return NextResponse.json(
        { error: 'Bad request entityId or imageId missing.' },
        { status: 400 }
      );
    }
    await db
      .delete(imageSlider)
      .where(eq(imageSlider.id, parseInt(imageId)))
      .returning();
    await db
      .delete(imageSliderLink)
      .where(
        and(
          eq(imageSliderLink.entityId, parseInt(entityId)),
          eq(imageSliderLink.imageSliderId, parseInt(imageId))
        )
      )
      .returning();
    return NextResponse.json({ status: 200, message: 'Successful' });
  } catch (error: any) {
    console.log('Error in delete the image images->delete: ', error);
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
