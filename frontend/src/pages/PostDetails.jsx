import Advertise from "@/components/shared/Advertise";
import RightAdvertisement from "@/components/shared/RightAdvertisement";
import CommentSection from "@/components/shared/CommentSection";
import PostCard from "@/components/shared/PostCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const { postSlug } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentArticles, setRecentArticles] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);

        const data = await res.json();

        if (!res.ok) {
          setError(true);
          setLoading(false);

          return;
        }

        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);

        const data = await res.json();

        if (res.ok) {
          setRecentArticles(data.posts);
        }
      };

      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <img
          src="https://cdn-icons-png.flaticon.com/128/39/39979.png"
          alt="loading"
          className="w-20 animate-spin"
        />
      </div>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl mt-10 p-3 text-center font-bold max-w-3xl mx-auto lg:text-4xl text-gray-800 dark:text-gray-200 underline">
        {post && post.title}
      </h1>

      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button
          variant="outline"
          className="border border-gray-500 dark:border-gray-600 text-gray-800 dark:text-gray-200"
        >
          {post && post.category}
        </Button>
      </Link>

      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[500px] w-full object-cover"
      />

      <div className="flex justify-between p-3 mx-auto w-full max-w-2xl text-xs text-gray-600 dark:text-gray-400">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>

        <span className="italic">
          {post && (post.content.length / 100).toFixed(0)} mins read
        </span>
      </div>

      <Separator className="bg-gray-500 dark:bg-gray-600" />

      <div className="flex max-w-6xl mx-auto w-full gap-6">
        {/* Post Content */}
        <div
          className="p-3 w-full post-content text-gray-800 dark:text-gray-200"
          dangerouslySetInnerHTML={{ __html: post && post.content }}
        ></div>

        {/* Right Advertisement (Hidden on Mobile) */}
        <div className="hidden lg:block w-1/4 md:block">
          <RightAdvertisement />
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full">
        <Advertise />
      </div>

      <CommentSection postId={post._id} />

      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl font-semibold mt-5 text-gray-800 dark:text-gray-200">
          Recently published articles
        </h1>

        <div className="flex flex-wrap gap-5 my-5 justify-center">
          {recentArticles &&
            recentArticles.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
        </div>
      </div>
    </main>
  );
};

export default PostDetails;
