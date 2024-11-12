import Link from 'next/link';
import React from 'react';

const PostList = ({ id, title }: any) => {
  return (
    <div className="my-2 flex cursor-pointer rounded-md border px-3 py-4 shadow-sm hover:shadow lg:px-6">
      <p className="flex-1 truncate font-medium">{id}</p>
      <p className="flex-1 text-right lg:text-left">{title}</p>
      <div className="flex-1 text-right text-sm lg:text-left">
        <Link href={`/posts/${id}`}>
          <span className="hidden text-sm lg:inline-block text-sky-600 underline">
            View Details
          </span>
          <span className="inline-block text-sm lg:hidden text-sky-600 underline">
            Details
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PostList;
