import React from 'react';
import PostList from './PostList';

const PostLists = ({ posts }: any) => {
  return (
    <div className="block max-h-[75vh] overflow-y-auto rounded-lg desktop:max-h-[80vh] w-full">
      {posts.length ? (
        posts.map((i: any) => <PostList key={i.id} {...i} />)
      ) : (
        <div className="h-[100px] w-full text-center font-bold ">
          Add some posts to see the data.
        </div>
      )}
    </div>
  );
};

export default PostLists;
