import {
  integer,
  jsonb,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  content: varchar('content'),
  slug: varchar('slug').unique(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const imageSlider = pgTable('image_slider', {
  id: serial('id').primaryKey(),
  images: jsonb('images'), // Array of image URLs
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const imageSliderLink = pgTable('image_slider_link', {
  id: serial('id').primaryKey(),
  entityId: integer('entity_id').notNull(), // This stores the ID of the entity (e.g., post ID or comment ID)
  entityType: varchar('entity_type').notNull(), // The type of entity (e.g., 'post', 'comment')
  imageSliderId: integer('image_slider_id')
    .notNull()
    .references(() => imageSlider.id), // Foreign key to the ImageSlider
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});
