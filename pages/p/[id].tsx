import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import Router from "next/router";
import { PostProps } from "../../components/Post";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/drafts");
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  Router.push("/");
}

const Post: React.FC<PostProps> = (props) => {
  const {data: session, status} = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <img className="rounded-t-lg w-1/3" src={props.image} alt="" />
        <h2 className="mb-1 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{props.title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <br/>
        <ReactMarkdown children={props.content} />
        <br/><br/>
        {!props.published && userHasValidSession && postBelongsToUser && (
          <a onClick={() => publishPost(props.id)} href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Publish
          </a>
          
        )} 
        
        {" "}

        {userHasValidSession && postBelongsToUser && (
          <a onClick={() => deletePost(props.id)} href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Delete
          </a>
        )}

      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Post;
