# Database Client Configuration Documentation

This document explains the setup and usage of the database client in the project, including how Drizzle ORM and PostgreSQL are integrated.

---

## Overview

This configuration file sets up the database client to connect to a PostgreSQL database using the `drizzle-orm` and `postgres` libraries. The `drizzle` ORM provides a way to interact with the database in a type-safe manner, while `postgres` is used to establish the connection.

### Key Elements

- **`postgres`**: A lightweight PostgreSQL client for Node.js.
- **`drizzle-orm`**: An Object-Relational Mapping (ORM) library that offers type-safe queries and integrations with PostgreSQL.
- **`process.env.DATABASE_URL`**: The environment variable holding the PostgreSQL database connection string.

---

## Code Breakdown

### 1. Importing Required Modules

```typescript
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
```

- `schema`: Imports all the defined database schemas from the `schema.ts` file. These schemas define the structure of the tables in the database.
- `drizzle`: The Drizzle ORM that will be used for querying the database.
- `postgres`: The PostgreSQL client for establishing a connection with the database.

### 2. Database Client Initialization

```typescript
export const client = postgres(process.env.DATABASE_URL as string);
```

- This line initializes the PostgreSQL client using the connection URL stored in the environment variable `DATABASE_URL`. The connection string is essential for connecting to the correct PostgreSQL instance.
- `postgres`: The `postgres` library is used here to set up the connection, allowing database operations.

### 3. Drizzle ORM Setup

```typescript
export const db = drizzle(client, { schema });
```

- `drizzle(client, { schema })`: This line sets up Drizzle ORM by passing in the `client` (the PostgreSQL client) and `schema` (the database schema definitions).
- The `drizzle` function configures the ORM to use the provided client and schema for type-safe queries and operations.

---

## Environment Variables

- **`DATABASE_URL`**: The environment variable that contains the connection string for the PostgreSQL database. It is crucial to configure this environment variable in the project for the connection to work properly.

### Example:

```env
DATABASE_URL=postgres://user:password@host:port/database
```

This URL format typically includes the username, password, host, port, and database name.

---

## Summary

This file initializes the PostgreSQL connection using the `postgres` library and configures Drizzle ORM to perform type-safe database operations. The schema file contains the table definitions, and the environment variable `DATABASE_URL` is used to securely configure the database connection.

This setup provides an easy-to-use, type-safe way to interact with the PostgreSQL database in the application.

---

# Project Schema Documentation

This document provides an overview of the database schemas used in the project.

## Table of Contents

- [Posts](#posts)
- [Image Slider](#image-slider)
- [Image Slider Link](#image-slider-link)

---

## Posts

The `posts` table stores information about blog posts or articles in the application.

| Column       | Type        | Description                                                                                                |
| ------------ | ----------- | ---------------------------------------------------------------------------------------------------------- |
| `id`         | `serial`    | Primary key. Unique identifier for each post.                                                              |
| `title`      | `varchar`   | The title of the post. Maximum length is 256 characters.                                                   |
| `content`    | `varchar`   | The content of the post.                                                                                   |
| `slug`       | `varchar`   | The slug for the post (unique). Used for URL generation.                                                   |
| `created_at` | `timestamp` | The timestamp of when the post was created. Defaults to the current time.                                  |
| `updated_at` | `timestamp` | The timestamp of when the post was last updated. Defaults to the current time and updates on modification. |

### Notes

- The `slug` field is unique, meaning no two posts can have the same slug.
- `created_at` and `updated_at` are automatically populated with the current timestamp when a post is created or updated.

---

## Image Slider

The `image_slider` table stores image URLs for the image slider feature.

| Column       | Type        | Description                                                                                                        |
| ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------ |
| `id`         | `serial`    | Primary key. Unique identifier for each image slider.                                                              |
| `images`     | `jsonb`     | An array of image URLs in JSON format.                                                                             |
| `created_at` | `timestamp` | The timestamp of when the image slider was created. Defaults to the current time.                                  |
| `updated_at` | `timestamp` | The timestamp of when the image slider was last updated. Defaults to the current time and updates on modification. |

### Notes

- The `images` field contains an array of URLs (in JSON format), allowing for flexible storage of image data for each slider.
- `created_at` and `updated_at` are automatically populated with the current timestamp when an image slider is created or updated.

---

## Image Slider Link

The `image_slider_link` table links an image slider to a specific entity (such as a post or comment).

| Column          | Type        | Description                                                                                                |
| --------------- | ----------- | ---------------------------------------------------------------------------------------------------------- |
| `id`            | `serial`    | Primary key. Unique identifier for each image slider link.                                                 |
| `entityId`      | `integer`   | The ID of the entity (e.g., post ID or comment ID).                                                        |
| `entityType`    | `varchar`   | The type of entity (e.g., 'post', 'comment').                                                              |
| `imageSliderId` | `integer`   | Foreign key linking to the `image_slider` table. References `image_slider.id`.                             |
| `created_at`    | `timestamp` | The timestamp of when the link was created. Defaults to the current time.                                  |
| `updated_at`    | `timestamp` | The timestamp of when the link was last updated. Defaults to the current time and updates on modification. |

### Notes

- `entityId` and `entityType` define which entity (post, comment, etc.) the image slider is associated with.
- `imageSliderId` is a foreign key that links to the `image_slider` table, associating the entity with a particular slider.
- `created_at` and `updated_at` are automatically populated with the current timestamp when a link is created or updated.

---

## Summary

This schema defines the core tables for managing posts and image sliders in the project. Each table is equipped with automatic timestamps for creation and updates, and the `image_slider_link` table creates relationships between sliders and entities like posts or comments.
