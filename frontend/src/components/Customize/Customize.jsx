import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "../Header/Header";
import { Home } from "../Icons/Icons";
import styles from "./Customize.module.css";

function Customize() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [bio, setBio] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
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
      setUsername(data.user.username);
      setProfilePic(data.user.profilePic);
      setFirstName(data.user.firstName);
      setLastName(data.user.lastName);
      setBio(data.user.bio);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUser(userId);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const response = await fetch(`${API_URL}/user`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        mode: "cors",
      });
      const responseData = await response.json();

      if (responseData.success) {
        navigate("/");
      } else {
        setError(responseData.message);
      }
    } catch (err) {
      console.error("Network or server error:", err);
    }
  }

  return (
    <>
      <Header></Header>
      <main className={styles.main}>
        <h1>Update Profile</h1>
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          <label htmlFor="username">
            <h2>Username: </h2>
          </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <label htmlFor="firstName">
            <h2>First Name: </h2>
          </label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />

          <label htmlFor="lastName">
            <h2>Last Name: </h2>
          </label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />

          <label htmlFor="bio">
            <h2>Bio: </h2>
          </label>
          <textarea
            type="text"
            name="bio"
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}
            className={styles.bio}
          />

          <label htmlFor="profilePic">
            <h2>Profile Picture: </h2>
          </label>
          <input type="file" name="profilePic" />

          <input type="hidden" value={userId} name="userId" />

          <button type="Submit" className={styles.update}>
            <h3>Update</h3>
          </button>
        </form>
        {error && <div>{error}</div>}
        <Link to={"/"}>
          <button className={styles.home}>
            <Home></Home>
          </button>
        </Link>
      </main>
    </>
  );
}

export { Customize };
