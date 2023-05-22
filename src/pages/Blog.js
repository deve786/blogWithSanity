import React from "react";
import { useState, useEffect } from "react";
import client from "../client";
import { Link } from "react-router-dom";
function Blog() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type=='post']{
                title,
                slug,body,mainImage{
                    asset ->{
                        _id,
                        url
                    },
                    alt
                }
            }`
      )
      .then((data) => setPost(data))
      .catch(console.error);
  }, []);

  return (
    <>
      <section className="px-10 2xl:max-w-7xl 2xl:mx-auto">
        <h1 className="font-bold text-4xl mt-5 mb-10 tracking-widest text-center md:text-6xl lg:text-8xl">Blog</h1>
        
        <div className=" grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 ">
          {post.map((post) => (
            <article key={post.slug.current}>
              <img className="blogimg" src={post.mainImage.asset.url} alt={post.title} />
              <h4 className="text-xl mt-2">{post.title}</h4>
              <button className="mt-5 mb-10">
                <Link
                  to={`/blog/${post.slug.current}`}
                  className="py-2 px-6 rounded shadow text-white bg-black hover:bg-transparent border-2 border-black transition-all duration-500 hover:text-black font-bold"
                >
                  Read More
                </Link>
              </button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default Blog;
