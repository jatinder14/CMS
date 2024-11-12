'use client';
import PostHeader from '@/components/PostHeader';
import PostLists from '@/components/PostLists';
import { Button } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/all`
      );
      setPosts(res.data);
    } catch (error) {
      console.log('Error getting all posts ', error);
    }
  };
  return (
    <div className="w-full p-4 mx-auto flex max-w-screen-xl flex-col">
      <header className="mt-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Posts</h1>
        <div className="flex items-center space-x-2">
          <Button variant="contained">
            <Link href="/posts/create">Create Post</Link>
          </Button>
        </div>
      </header>
      <PostHeader />

      <PostLists posts={posts} />
    </div>
  );
}
