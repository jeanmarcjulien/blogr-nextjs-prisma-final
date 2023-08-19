import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";

const Draft: React.FC = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const [business, setBusiness] = useState("");
  const [fashion, setFashion] = useState("");
  const [food, setFood] = useState("");
  const [health, setHealth] = useState("");
  const [movie, setMovie] = useState("");
  const [music, setMusic] = useState("");
  const [news, setNews] = useState("");
  const [sports, setSports] = useState("");
  const [technology, setTechnology] = useState("");
  const [travel, setTravel] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, image, content,business,fashion,food,health,movie,music,news,sports,technology,travel };
      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>

          <h1>New Draft</h1>

          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />

          <input
            autoFocus
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image"
            type="text"
            value={image}
          />

          <input
            type="checkbox" 
            value="Business"
            onChange={(e) => setBusiness(e.target.value)}
            /> Business &nbsp;

          <input
            type="checkbox" 
            value="Fashion"
            onChange={(e) => setFashion(e.target.value)}
            /> Fashion &nbsp;

          <input
            type="checkbox" 
            value="Food"
            onChange={(e) => setFood(e.target.value)}
            /> Food &nbsp;

          <input
            type="checkbox" 
            value="Health"
            onChange={(e) => setHealth(e.target.value)}
            /> Health &nbsp;

          <input
            type="checkbox" 
            value="Movie"
            onChange={(e) => setMovie(e.target.value)}
            /> Movie &nbsp;

          <input
            type="checkbox" 
            value="Music"
            onChange={(e) => setMusic(e.target.value)}
            /> Music &nbsp;

          <input
            type="checkbox" 
            value="News"
            onChange={(e) => setNews(e.target.value)}
            /> News &nbsp;

          <input
            type="checkbox" 
            value="Sports"
            onChange={(e) => setSports(e.target.value)}
            /> Sports &nbsp;

          <input
            type="checkbox" 
            value="Technology"
            onChange={(e) => setTechnology(e.target.value)}
            /> Technology &nbsp;

          <input
            type="checkbox" 
            value="Travel"
            onChange={(e) => setTravel(e.target.value)}
            /> Travel

          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />

          <input disabled={!content || !title} type="submit" value="Create" />
          
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>

        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;