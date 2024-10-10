import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { AppState } from "../App";
import axiosBase from "../axiosConfig";

function Home() {
  const { user } = useContext(AppState);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosBase.get("/questions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions(response.data.questions);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching questions:", err.response || err.message);
        setError("Failed to load questions. Error: " + (err.response?.data?.msg || err.message));
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Home</h1>
      <h2>Welcome: {user.username}</h2>

      <h3>Questions</h3>
      {questions.length > 0 ? (
        <ul>
          {questions.map((q) => (
            <li key={q.question_id} style={{ marginBottom: "1rem" }}>
              {/* Make the entire div a clickable link */}
              <Link to={`/question/${q.question_id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div
                  style={{
                    border: "1px solid #ddd",
                    padding: "1rem",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                    cursor: "pointer",
                  }}
                >
                  <strong>{q.username} asked:</strong> {/* Show the user who asked */}
                  <h4>{q.question}</h4> {/* Show the question */}
                  <p>{q.content}</p> {/* Show the question content */}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions found.</p>
      )}
    </div>
  );
}

export default Home;
