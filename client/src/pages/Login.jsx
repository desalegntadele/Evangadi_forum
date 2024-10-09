import React from 'react'
import { useRef } from 'react';
import axios from'../axiosConfig'
import { Link, useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate();
     const emailDom = useRef();
     const passwordDom = useRef();
     async function handleSubmit(e) {
       e.preventDefault();

    
       const emailValue = emailDom.current.value;
       const passwordValue = passwordDom.current.value;

       // Log the values you're sending
       //

       if (
         !emailValue ||
         !passwordValue
       ) {
         alert("please provide all required information");
         return;
       }

       try {
        const {data} = await axios.post("/users/login", {
           email: emailValue,
           password: passwordValue,
         });
         alert("login successfully");
         localStorage.setItem('token', data.token)
         //console.log(data);
         navigate("/");
       } catch (error) {
         alert(error?.response.data?.msg);
         console.log(error.response.data);
       }
     }
  return (
    <section>
      <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
        <Link to={"/register"}>register</Link>
      </section>
  
  )
}

export default Login
