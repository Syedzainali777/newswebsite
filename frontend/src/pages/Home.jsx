import Advertise from "@/components/shared/Advertise";
import PostCard from "@/components/shared/PostCard";
import SmallPostCard from "@/components/shared/SmallPostCard";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  console.log("🚀 ~ Home ~ posts:", posts);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts?limit=6");

      const data = await res.json();

      if (res.ok) {
        setPosts(data.posts);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 text-slate-700 dark:text-gray-300">
      {/* First section of new posts */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-slate-700 dark:text-gray-300">
              Recent Posts
            </h2>

            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            <Link
              to={"/search"}
              className="text-lg hover:underline text-center font-semibold text-slate-700 dark:text-gray-300"
            >
              View all news
            </Link>
          </div>
        )}
      </div>

      {/* Advertisement Section */}
      <div className="p-3 bg-white dark:bg-gray-800">
        <Advertise />
      </div>

      {/* Second section: Sports News */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-slate-700 dark:text-gray-300">
              Sports News
            </h2>

            <div className="flex flex-wrap gap-4">
              {posts
                ?.filter((post) => post.category === "sportsnews")
                ?.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
            </div>

            <Link
              to={"/search"}
              className="text-lg hover:underline text-center font-semibold text-slate-700 dark:text-gray-300"
            >
              View all news
            </Link>
          </div>
        )}
      </div>

      {/* Third section: Entertainment News */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-slate-700 dark:text-gray-300">
              Entertainment News
            </h2>

            <div className="flex flex-wrap gap-4">
              {posts
                ?.filter((post) => post.category === "entertainmentnews")
                ?.map((post) => (
                  <SmallPostCard key={post._id} post={post} />
                ))}
            </div>

            <Link
              to={"/search"}
              className="text-lg hover:underline text-center font-semibold text-slate-700 dark:text-gray-300"
            >
              View all news
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
