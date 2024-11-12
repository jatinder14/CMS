'use client';
import { useEffect, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import PostForm from '@/components/PostForm';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { Alert, CircularProgress } from '@mui/material';

interface Post {
  id?: string;
  title?: string;
  slug?: string;
  content?: string;
  [key: string]: any; // Allow additional fields dynamically
}

export default function Update() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post>({
    id: '',
    title: '',
    slug: '',
    content: '',
  });
  const [error, setError] = useState<string | null>(null); // Error state

  const postId = params.id as string;

  useEffect(() => {
    if (!postId) return;
    fetchPost(postId);
  }, [postId]);

  const fetchPost = async (id: string) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/get?id=${id}`
      );
      const imagesPlugin = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/images/get?entityId=${id}&entityType=post`
      );
      let payload: any = {
        id: res.data[0].id,
        title: res.data[0].title,
        slug: res.data[0].slug,
        content: res.data[0].content,
      };
      if (
        imagesPlugin &&
        imagesPlugin.data &&
        imagesPlugin.data.images &&
        imagesPlugin.data.images.length > 0
      ) {
        const images = imagesPlugin.data.images.map(
          (image: any) => image.images
        );
        payload = {
          ...payload,
          images: images[0],
        };
      }
      setPost(payload);
    } catch (error) {
      console.log('Error getting post ', error);
      setError('Failed to fetch post. Please try again.'); // Set error message
    }
  };

  const updatePost = async (data: any) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/update`,
        {
          id: postId,
          ...data,
        }
      );
      if (data.images) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/images/update`, {
          images: data.images,
          entityType: 'post',
          entityId: postId,
        });
      }
      if (res.status === 200) {
        router.push(`/posts/${postId}`);
      }
    } catch (error: any) {
      console.log('Error updating post ', error);
      setError(
        error.response?.data?.error ||
          'An error occurred while updating the post.'
      ); // Set error message
    }
  };

  return (
    <div className="w-full p-4 mx-auto flex max-w-screen-xl flex-col">
      <div className="text-2xl font-bold mb-6">Update Post</div>

      {/* Display alert if there's an error */}
      {error && (
        <Alert variant="filled" severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      {post.title || post.slug || post.content ? (
        <PostForm
          title={post.title}
          slug={post.slug}
          content={post.content}
          onSubmit={(data: any) => updatePost(data)}
          images={post.images}
        />
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
