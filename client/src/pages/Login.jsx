


import { useRef } from "react";
import axios from "../axiosConfig";
import { useNavigate,Link } from "react-router-dom";


function Login() {

  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();


  async function handleSubmit(e) {
    e.preventDefault();
  
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (
      !emailValue ||
      !passValue
    ) {
      alert("please provide all required fields");
      return;
    }
    try {
    const {data}=  await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      alert("logged in successfuly");

      localStorage.setItem('token',data.token)
      // navigate("/");
      console.log(data);
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response);
    }
  }
  return (
    <section>
      <form onSubmit={handleSubmit} action="">
     
        <div>
          <span>Email:----</span>
          <input type="text" placeholder="email" ref={emailDom} />
        </div>
        <br />
        <div>
          <span>Password:----</span>
          <input type="password" placeholder="password" ref={passwordDom} />
        </div>
        <br />
        <button type="submit">Login</button>
      </form>
      <Link to={"/register"}> register </Link>
    </section>
  );
}

export default Login
