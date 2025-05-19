import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../index.css";

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
    <main>
      {profile && (
        <div>
          <h1>{profile.username}</h1>
          <img
            className="profilePic"
            src={`${API_URL}/${profile.profilePic}`}
            alt="Profile Picture"
          />
          <div>
            {profile.firstName} {profile.lastName}
          </div>
          <div>{profile.bio}</div>
          {profile.posts.map((post) => {
            return (
              <div key={post.id}>
                {post.image && (
                  <img
                    className="postImg"
                    src={`${API_URL}/${post.image}`}
                    alt="Post Image"
                  />
                )}
                <div>{post.content}</div>
                <div>{post.createdAt}</div>
                <div>Likes: {post.likes}</div>
                <Link to={`/post/${post.id}`}>
                  <button>View Comments</button>
                </Link>
              </div>
            );
          })}
        </div>
      )}
      <Link to={"/"}>
        <button>Home</button>
      </Link>
    </main>
  );
}

export { Profile };
