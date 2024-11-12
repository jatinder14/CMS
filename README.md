This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

Ensure you have the following installed on your local development environment:

- [Node.js](https://nodejs.org/) (recommended version 16.x or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager

### Project Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/jatinder14/CMS.git
   cd CMS
   ```

2. **Install dependencies:**

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

3. **Set up environment variables:**

Create a `.env.local` file in the root directory and add the following environment variables. Update the values as necessary for your local setup.

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Database configuration
DATABASE_URL=your_database_url
DATABASE_HOST=your_database_host
DATABASE_PORT=your_database_port
DATABASE_NAME=your_database_name
DATABASE_USERNAME=your_database_username
DATABASE_PASSWORD=your_database_password
```

4. **Initialize the database:**

### use these queries to get your db schema ready or treat it as migrations file

```bash

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(256) NOT NULL,
  content VARCHAR,
  slug VARCHAR UNIQUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE image_slider (
  id SERIAL PRIMARY KEY,
  images JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE image_slider_link (
  id SERIAL PRIMARY KEY,
  entity_id INTEGER NOT NULL,
  entity_type VARCHAR NOT NULL,
  image_slider_id INTEGER NOT NULL REFERENCES image_slider(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

```

## Running the Development Server

Start the development server with the following command:

```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:3000. Open this URL in your browser to view the project.

### The server will start on http://localhost:3000 by default.

### I deployed the application on our aws instance 
### The server base url is http://3.81.90.125:3001/
