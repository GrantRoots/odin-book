import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function FollowReqs() {
  const [reqs, setReqs] = useState([]);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  async function showReqs() {
    try {
      const response = await fetch(
        `http://localhost:3000/user/requests?id=${userId}`,
        {
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) return;
      const data = await response.json();
      if (!data.success) {
        setError(data.message);
      }
      setReqs(data.reqs);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    showReqs();
  }, []);

  async function acceptReq(username) {
    try {
      const data = { username: username, userId: userId };
      const response = await fetch(
        `http://localhost:3000/user/requests/accept`,
        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) return;
      showReqs();
    } catch (error) {
      console.error(error);
    }
  }

  async function declineReq(username) {
    try {
      const data = { username: username, userId: userId };
      const response = await fetch(
        `http://localhost:3000/user/requests/decline`,
        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) return;
      showReqs();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Follow Requests</h1>
      {reqs.length < 1 && <div>No reqeusts</div>}
      {reqs &&
        reqs.map((req) => {
          return (
            <div key={req}>
              <div>{req}</div>
              <button
                onClick={() => {
                  acceptReq(req);
                }}
              >
                Accept
              </button>
              <button
                onClick={() => {
                  declineReq(req);
                }}
              >
                Decline
              </button>
            </div>
          );
        })}
      <Link to={"/"}>
        <button>Home</button>
      </Link>
    </div>
  );
}

export { FollowReqs };
