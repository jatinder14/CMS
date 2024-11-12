'use client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import parse from 'html-react-parser';
import { Button, TextField } from '@mui/material';
import { pluginManager } from '@/app/plugins/PluginManager';

type Props = {
  title?: string;
  slug?: string;
  content?: string;
  [key: string]: any; // Allow additional fields dynamically
  onSubmit?: (postData: any) => void;
};

export default function PostForm(props: Props) {
  const [customFields, setCustomFields] = useState<JSX.Element[]>([]);
  const [post, setPost] = useState<Props>({
    title: props.title || '',
    slug: props.slug || '',
    content: props.content || '',
    images: props.images || [],
  });

  useEffect(() => {
    if (
      props.title !== undefined &&
      props.title !== post.title &&
      props.slug !== undefined &&
      props.slug !== post.slug &&
      props.content !== undefined &&
      props.content !== post.content
    ) {
      setPost({
        title: props.title || '',
        slug: props.slug || '',
        content: props.content || '',
        images: props.images || [],
      });
    }
  }, [props]);

  const handleTitleChange = (value: string) => {
    const newSlug = slugify(value);
    setPost({
      ...post,
      title: value,
      slug: newSlug,
    });
  };

  const slugify = (value: string) => {
    return value
      .toLowerCase() // Convert to lowercase
      .trim() // Remove leading and trailing whitespace
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except for spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
  };

  const handleCustomFieldChange = (key: string, value: any) => {
    setPost((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    pluginManager
      .getCustomFields(post, handleCustomFieldChange)
      .then((fieldComponents) => {
        setCustomFields(fieldComponents);
      });
  }, [post]);

  return (
    <div className="flex flex-col gap-y-8 p-6 md:p-10 rounded-lg shadow-md">
      {/* Title Section */}
      <div>
        <span className="text-lg font-semibold ">Title</span>
        <TextField
          value={post.title}
          onChange={(e: any) => handleTitleChange(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          placeholder="Enter post title"
          InputProps={{
            style: {
              borderRadius: '8px',
              backgroundColor: "white"
            },
          }}
        />
      </div>

      {/* Slug Section */}
      <div>
        <span className="text-lg font-semibold ">Slug</span>
        <TextField
          value={post.slug}
          onChange={(e: any) => {
            const newSlug = slugify(e.target.value);
            setPost({
              ...post,
              slug: newSlug,
            });
          }}
          variant="outlined"
          fullWidth
          margin="normal"
          placeholder="Generated slug"
          InputProps={{
            style: {
              borderRadius: '8px',
              backgroundColor: "white"
            },
          }}
        />
      </div>

      {/* Content Editor and Preview */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Editor */}
        <div className="w-full">
          <span className="text-lg font-semibold ">Content</span>
          <ReactQuill
            theme="snow"
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ color: [] }, { background: [] }],
                ['link', 'image'],
              ],
            }}
            value={post.content}
            onChange={(e: string) => {
              setPost({
                ...post,
                content: e,
              });
            }}
            className="mt-2 rounded-lg shadow-sm text-white"
          />
        </div>

        {/* Preview */}
        <div className="w-full">
          <span className="text-lg font-semibold ">Preview</span>
          {post.content ? (
            <div className="mt-3 min-h-20  border border-gray-300  rounded-lg p-3 shadow-sm">
              {parse(post.content)}
            </div>
          ) : (
            <div className="mt-3 p-3 ">No content to preview</div>
          )}
        </div>
      </div>

      {/* Custom Fields */}
      <div className="w-full">
        {customFields.map((fieldComponent, index) => (
          <div key={`custom-field-${index}`} className="mb-6">
            {fieldComponent}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => props && props.onSubmit && props.onSubmit(post)}
          style={{ borderRadius: '8px', padding: '10px 20px' }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
