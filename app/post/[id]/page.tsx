'use client'

import React,{useState, useEffect} from "react";

const Post = ({params}) => {

  const[viewpost, setViewPost] = useState(null)
  const id = params.id
  useEffect(()=>{
    fetch('/api/viewpost/'+ id)
   .then(res => res.json())
   .then(res => setViewPost(res)) 
  }, [])
  return (
    <>
       {viewpost && <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4"><big>{viewpost.title}</big></h2>
        <p className="text-gray-500">{viewpost.date_of_publish}</p>
        <img width={300} height={200} src={viewpost.image || "https://picsum.photos/200"} alt="Post Image" className="my-4"/>
        <p>{viewpost.description}</p>
    </main> }
    </>
  );
};

export default Post;
