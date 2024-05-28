// Import necessary modules
"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// Define the Home component
export default function Home() {
  // State to store posts data
  const [posts, setPosts] = useState([]);
  const inputRef = useRef("");
  const [search, setSearch] = useState(false);

  // Fetch posts data when component mounts
  useEffect(() => {
    fetch("/api/post")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const searchPost = (e: { type: string; key: string; }) => {
    if(e.type == 'keydown' && e.key !== 'Enter'){
      return;
    }
    setSearch(true);
    setTimeout(() => {
      fetch("/api/post?q=" + inputRef.current.value)
        .then((res) => res.json())
        .then((data) => setPosts(data))
        .finally(() => setSearch(false)); // Corrected syntax
    }, 500);
  };
  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Blog</h1>
        <p>Discover the latest articles published by Darwin Committee!</p>

        <div className="flex justify-end px-4">
          <input
            ref={inputRef}
            onKeyDown={searchPost}
            disabled={search}
            type="text"
            className="px-4 py-2 border border-black-300 rounded-md text-black"
            placeholder="Search..."
          />
          <button
            onClick={searchPost}
            disabled={search}
            className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4"
          >
            {search ? "..." : "Search"}
          </button>
        </div>
        <br />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <Link href={"/post/" + post._id} key={post._id}>
              <div className="border border-gray-200 p-4">
                <img
                  className="w-full h-48 object-cover mb-4"
                  src={post.image || "https://picsum.photos/200"}
                  alt="Post Image"
                />
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600">{post.short_description}</p>
              </div>
            </Link>
          ))}
          {!posts.length > 0 && (
            <p>
              No posts Found for: <b>{inputRef.current.value}</b>
            </p>
          )}
        </div>
      </main>
    </>
  );
}
