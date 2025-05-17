import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Profile() {
  //show username first name/last bio all posts

  //get params for userId
  const { userId } = useParams();
  const token = localStorage.getItem("token");
  const [profile, setProfile] = useState(null);

  async function getUser(userId) {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
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
    <div>
      <div>{profile.username}</div>
    </div>
  );
}

export { Profile };
