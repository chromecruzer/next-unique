"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/post")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
        <p>Discover the latest articles published by Darwin Committee!</p>

        <div className="flex justify-end px-4">
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Search..."
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4">
            Search
          </button>
        </div>
        <br />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, index) => (
            <Link href={"/post/" + post._id}>
              <div key={index._id} className="border border-gray-200 p-4">
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
        </div>
      </main>
    </>
  );
}
