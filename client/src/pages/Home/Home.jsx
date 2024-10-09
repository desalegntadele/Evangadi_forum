// import React from 'react'
// import { useContext } from 'react'
// import {AppState} from "../App"

// function Home() {
//   const {user} =useContext(AppState)
//   return (
//     <div>
//       Home

//       <h2>welcom: {user.username}</h2>
//     </div>
//   )
// }

// export default Home

import React from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import "./home.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div className="bg">
      {/* <Login /> */}
      {/* <Header/> */}
      <Register />
      {/* <Footer/> */}
    </div>
  );
};
export default Home;


