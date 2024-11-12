import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });
export default {
  schema: './db/schema.ts',
  out: './drizzle-migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DATABASE_HOST || 'ep-mute-hat-a5bjvifk.us-east-2.aws.neon.tech',
    port: parseInt(process.env.DATABASE_PORT as string) || 5432,
    database: process.env.DATABASE_NAME || 'neondb',
    user: process.env.DATABASE_USERNAME || 'neondb_owner',
    password: process.env.DATABASE_PASSWORD || 'hbNx7FWd6qvI',
    ssl: false,
  },
} satisfies Config;
