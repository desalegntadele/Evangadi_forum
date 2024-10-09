import { useContext, useState, useEffect } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/evangadi-logo-black.png";
import { AppState } from "../../App";

const Header = () => {
  const { user, setUser } = useContext(AppState); // Make sure you have setUser available
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    setIsLoggedIn(!!user); // Set true or false based on user existence
  }, [user]);

    const handleButtonClick = () => {
      if (isLoggedIn) {
        // If the user is logged in, handle logout
        setUser(null); // Clear user context or state
        navigate("/"); // Navigate to home page after logout
      } else {
        // If the user is not logged in, navigate to the register page
        navigate("/register");
      }
    };

//   const handleButtonClick = () => {
//     setIsLoggedIn((prevIsLoggedIn) => !isLoggedIn);
//   };

  return (
    <section className="Header">
      <div className="Header_container">
        <div className="logo_container">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="Header_linkBtn">
          <div className="Header_container_link">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">How it Works</Link>
              </li>
            </ul>
          </div>
          <button onClick={handleButtonClick}>
            {isLoggedIn ? "Logout" : "Sign In"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Header;
