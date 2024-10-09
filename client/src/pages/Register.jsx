
import { useRef } from "react";
import axios from "../axiosConfig";
import { useNavigate ,Link} from "react-router-dom";

function Register() {
 const navigate = useNavigate();


    const userNameDom = useRef();
    const firstNameDom = useRef();
    const lastNameDom = useRef();
    const emailDom = useRef();
    const passwordDom = useRef();

    async function handleSubmit(e){
        e.preventDefault()
            const usernameValue = userNameDom.current.value;
            const firstValue = firstNameDom.current.value;
            const lastValue = lastNameDom.current.value;
            const emailValue = emailDom.current.value;
            const passValue = passwordDom.current.value;

            if(!usernameValue || !firstValue || !lastValue || ! emailValue || !passValue){
      alert("please provide all required fields")
      return;
        }
      try {
         await axios.post("/users/register", {
           username: usernameValue,
           firstname: firstValue,
           lastname: lastValue,
           email: emailValue,
           password: passValue,
         });
         alert("register successfuly, please login");
         navigate("/login");


      } catch (error) {
        alert("something went wrong")
        console.log(error.response);
        
      } 
    }
  return (
    <section>
      <form onSubmit={handleSubmit} action="">
        <div>
          <span>Username:----</span>
          <input type="text" placeholder="username" ref={userNameDom} />
        </div>
        <br />

        <div>
          <span>FirstName:----</span>
          <input type="text" placeholder="firstname" ref={firstNameDom} />
        </div>
        <br />
        <div>
          <span>LastName:----</span>
          <input type="text" placeholder="lastname" ref={lastNameDom} />
        </div>
        <br />
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
        <button type="submit">Register</button>
      </form>
      <Link to={"/login"}> login</Link>
    </section>
  );
}

export default Register
