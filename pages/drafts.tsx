import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import { useSession, getSession } from "next-auth/react";
import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
      categories: {
        select: { category: true },
      },
    },
  });
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: PostProps[];
};

const Drafts: React.FC<Props> = (props) => {
  const {data: session} = useSession();

  if (!session) {
    return (
      <Layout>
        <div className="h-full bg-white rounded overflow-hidden shadow-lg border-2 border-gray-300 border-solid bg-white rounded-lg shadow">
          <a href="post.html" className="flex flex-wrap no-underline hover:no-underline">
            <div className="w-full md:w-2/3 rounded-t">	
              <img src="https://source.unsplash.com/collection/494263/800x600" className="h-full w-full shadow" />
            </div>

            <div className="w-full md:w-1/3 flex flex-col flex-grow flex-shrink">
              
              <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
                <div className="w-full font-bold text-xl text-gray-900 pt-6 px-6 ">👋 Welcome to the assessment</div>
                <p className="text-gray-800 font-serif text-base px-6 mb-5 ">
                  <div>You need to be authenticated to view this page. Please log in</div>
                </p>
              </div>

              <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <img className="w-8 h-8 rounded-full mr-4 avatar" data-tippy-content="Author Name" src="http://i.pravatar.cc/300" alt="Avatar of Author" />
                  <p className="text-gray-600 text-xs md:text-sm">Blog website</p>
                </div>
              </div>

            </div>
          </a>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <main className="page">
          {props.drafts.toReversed().map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Drafts;