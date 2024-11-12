import { db } from '@/db';
import { imageSlider, imageSliderLink } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const imageLink = await db
      .select()
      .from(imageSliderLink)
      .where(
        and(
          eq(imageSliderLink.entityId, body.entityId),
          eq(imageSliderLink.entityType, body.entityType)
        )
      );
    if (imageLink.length > 0 && imageLink[0].imageSliderId) {
      const updatedImage = await db
        .update(imageSlider)
        .set(body)
        .where(eq(imageSlider.id, imageLink[0].imageSliderId))
        .returning();

      return NextResponse.json({ status: 200, data: updatedImage });
    }

    // Create image records in table
    const storedImage = await db
      .insert(imageSlider)
      .values({
        images: body.images,
      })
      .returning();
    await db
      .insert(imageSliderLink)
      .values({
        entityType: body.entityType,
        imageSliderId: storedImage[0].id,
        entityId: body.entityId,
      })
      .returning();
    return NextResponse.json({ status: 200, message: 'Successful' });
  } catch (error: any) {
    console.log('Error in updating images ', error);
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
