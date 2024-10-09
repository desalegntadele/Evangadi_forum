import React from "react";
import { useRef } from "react";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";


function Register() {
  const navigate =useNavigate();
  const userNameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();
 async function handleSubmit(e) {
   e.preventDefault();

   const usernameValue = userNameDom.current.value;
   const firstNameValue = firstNameDom.current.value;
   const lastNameValue = lastNameDom.current.value;
   const emailValue = emailDom.current.value;
   const passwordValue = passwordDom.current.value;

   // Log the values you're sending
//   

   if (
     !usernameValue ||
     !firstNameValue ||
     !lastNameValue ||
     !emailValue ||
     !passwordValue
   ) {
     alert("please provide all required information");
     return;
   }

   try {
     await axios.post("/users/register", {
       username: usernameValue,
       first_name: firstNameValue, 
       last_name: lastNameValue, 
       email: emailValue,
       password: passwordValue,
     });
     alert("registered successfully please login");
     navigate("/login");
   } catch (error) {
     alert("something went wrong");
     console.log(error.response);
   }
 }

  return (
    <div>
      <section>
        <form onSubmit={handleSubmit}>
          <div>
            <span>User name:---</span>
            <input type="text" ref={userNameDom} placeholder="user name" />
          </div>
          <br />
          <div>
            <span>First name :---</span>
            <input type="text" ref={firstNameDom} placeholder="first name" />
          </div>
          <br />
          <div>
            <span>Last name :---</span>
            <input type="text" ref={lastNameDom} placeholder="last name" />
          </div>
          <br />
          <div>
            <span>email :---</span>
            <input
              type="email"
              ref={emailDom}
              placeholder="email"
              autoComplete="new-password"
            />
          </div>
          <br />
          <div>
            <span>password :---</span>
            <input
              type="password"
              ref={passwordDom}
              placeholder="password"
              autoComplete="new-password"
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <Link to={"/login"}>Login</Link>
      </section>
    </div>
  );
}

export default Register;
