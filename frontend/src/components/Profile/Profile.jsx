import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../index.css";
import styles from "./Profile.module.css";
import { Header } from "../Header/Header";
import { Home } from "../Icons/Icons";

function Profile() {
  const { userId } = useParams();
  const token = localStorage.getItem("token");
  const [profile, setProfile] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  async function getUser(userId) {
    try {
      const response = await fetch(`${API_URL}/user/${userId}`, {
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) return;
      const data = await response.json();
      setProfile(data.user);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUser(userId);
  }, []);

  return (
    <>
      <Header></Header>
      <main className={styles.main}>
        {profile && (
          <>
            <h1>{profile.username}</h1>
            <img
              className="profilePic"
              src={`${API_URL}/${profile.profilePic}`}
              alt="Profile Picture"
            />
            <h2>
              {profile.firstName} {profile.lastName}
            </h2>
            <h4>{profile.bio}</h4>
            <h1>Posts</h1>
            {profile.posts.length < 1 && <h2>No Posts Yet. Create One!</h2>}
            {profile.posts.map((post) => {
              return (
                <div key={post.id} className={styles.post}>
                  {post.image && (
                    <img
                      className="postImg"
                      src={`${API_URL}/${post.image}`}
                      alt="Post Image"
                    />
                  )}
                  <h1>{post.content}</h1>
                  <div>
                    {new Date(post.createdAt).toLocaleTimeString([], {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div>Likes: {post.likes}</div>
                  <Link to={`/post/${post.id}`}>
                    <button>
                      <h3>View Post / Comments</h3>
                    </button>
                  </Link>
                </div>
              );
            })}
          </>
        )}
        <Link to={"/"}>
          <button className={styles.home}>
            <Home></Home>
          </button>
        </Link>
      </main>
    </>
  );
}

export { Profile };
