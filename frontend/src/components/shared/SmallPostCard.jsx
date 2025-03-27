import React from "react";
import { Link } from "react-router-dom";

const SmallPostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg lg:w-[550px] sm:w-[450px] overflow-hidden relative shadow-lg grid grid-cols-2 transition-transform duration-300 hover:scale-105">
      {/* Image (Left Side) */}
      <div className="relative h-[190px]">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content (Right Side) */}
      <div className="p-4">
        <h5 className="text-lg font-semibold mb-2 line-clamp-1">
          {post.title}
        </h5>
        <p className="text-base text-gray-600 mb-4 line-clamp-4">
          {post.content}
        </p>
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

export default SmallPostCard;
