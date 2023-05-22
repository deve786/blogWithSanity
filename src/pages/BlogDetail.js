import React from "react";
import { useState, useEffect } from "react";
import client from "../client";
import { Link, useParams } from "react-router-dom";
import BlockContent from "@sanity/block-content-to-react";
import { format, parseISO } from "date-fns";
function BlogDetail() {
  const [singlePost, setSinglePost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();
  const date = singlePost.publishedAt;
  useEffect(() => {
    client
      .fetch(
        `*[slug.current=="${slug}"]{
          title,
          
          body,
          
          "name": author->name,
          mainImage {
            asset -> {
              _id,
              url
            },
            
            alt
          }
          
    }`
      )
      .then((data) => setSinglePost(data[0]))
      .catch((err) => console.error(err));
    setIsLoading(false);
  }, [slug]);

  console.log(date);
  return (
    <>
      {isLoading ? (
        <h1 className="uppercase font-bold text-4xl tracking-wide mb-5 md:text-6xl lg:text-8xl flex items-center justify-center h-screen">
          Loading....
        </h1>
      ) : (
        <section className="px-5 xl:max-w-6xl xl:mx-auto pb-20">
          <h1 className="uppercase font-bold text-4xl tracking-wide mb-5 md:text-4xl lg:text-6xl text-center mt-5 mb-10">
            {singlePost.title}
          </h1>
          {singlePost.mainImage && singlePost.mainImage.asset && (
            <img
              className="blog__image rounded-t"
              src={singlePost.mainImage.asset.url}
              alt={singlePost.title}
            />
          )}
          <h2>{singlePost.name}</h2>
          {/* <p>Published On:{format(parseISO(date), "dd-MM-yyyy")}</p> */}

          <div className="block__content my-4">
            <BlockContent
              blocks={singlePost.body}
              projectI="40rf11bs"
              dataset="production"
            />
          </div>
          <button>
            <Link
              to="/blog"
              className="py-2 px-6 rounded shadow text-white bg-black hover:bg-transparent border-2 border-black transition-all duration-500 hover:text-black font-bold "
            >
              Read more articles...
            </Link>
          </button>
        </section>
      )}
      ;
    </>
  );
}

export default BlogDetail;
