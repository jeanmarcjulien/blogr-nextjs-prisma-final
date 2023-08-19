import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  image:string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  categories:[]
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {

  let categoriesList="";
  post.categories?.map((categories) => {
    if(categories.category.name){
      categoriesList = categoriesList+categories.category.name+", "
    }
  })
  categoriesList = categoriesList.slice(0, -2);

  const authorName = post.author ? post.author.name : "Unknown author";

  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <div className="w-full border-2 border-gray-300 border-solid bg-white rounded-lg shadow">
          <a href="#">
              <img className="rounded-t-lg w-1/2" src={post.image} alt="" />
          </a>
          <div className="p-5">
              <a href="#">
                  <h2 className="mb-1 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h2>
                  <small>By {authorName}</small>
                  <br/><br/>
            <h3 className="mb-1 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">Categories</h3>
                {categoriesList}
                <br/><br/><br/>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><ReactMarkdown children={post.content} /></p>
          </div>
      </div>

      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
