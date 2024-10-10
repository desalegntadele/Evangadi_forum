import "bootstrap/dist/css/bootstrap.css"; // Keeping this import
import { createContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "./axiosConfig";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Question from "./pages/Question/Question"; // Merging from getsinglequestion

export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUser() {
      try {
        const { data } = await axios.get("/users/check", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(data);
        setUser(data);
      } catch (error) {
        console.log(error.response);
        navigate("/login");
      }
    }
    checkUser();
  }, [navigate, token]);

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/question" element={<Register />} />{/* Check if this route is needed */}
        <Route path="/question/:id" element={<Question />} />
      </Routes>
    </AppState.Provider>
  );
}

export default App;
