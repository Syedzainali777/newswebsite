import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden relative w-full sm:w-[330px] transition-transform duration-300 hover:scale-105">
      {/* Image with overlay for gradient effect */}
      <div className="relative h-[250px] w-[340] overflow-hidden">
        <img
          src={post.image}
          alt="post cover"
          className="w-full h-full object-cover"
        />
        {/* Semi-transparent overlay for gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        {/* Post Title */}
        <p className="text-lg font-semibold line-clamp-1">{post.title}</p>

        {/* Post Description (first 2 lines with ellipsis) */}
        <p className="text-sm mt-1 line-clamp-2">{post.content}</p>
      </div>

      {/* Hidden link for full article */}
      <Link
        to={`/post/${post.slug}`}
        className="absolute inset-0"
        aria-label={`Read ${post.title}`}
      />
    </div>
  );
};

export default PostCard;
