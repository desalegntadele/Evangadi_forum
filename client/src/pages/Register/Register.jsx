import { useRef, useState } from "react";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import LayOut from "../../components/LayOut/LayOut";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const usernameValue=e.target.value
    const usernameValue = usernameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !passValue
    ) {
      // alert("please provide all required fields !");
      setError("please provide all required fields !");
      return;
    }

    try {
      await axios.post("/users/register", {
        username: usernameValue,
        first_name: firstValue,
        last_name: lastValue,
        email: emailValue,
        password: passValue,
      });
      alert("register successfully.please login");
      navigate("/login");
    } catch (error) {
      // alert("something went wrong!");
      console.log(error.response);
      setError("something went wrong!");
    }
  };

  return (
    <LayOut>
      <div className="bg">
        <section className="both">
          <section className="register">
            <div className="register_container">
              <h2>Join the network</h2>
              {success && (
                <p
                  style={{
                    textAlign: "center",
                    color: "green",
                    marginBottom: "13px",
                  }}
                >
                  {success}
                </p>
              )}
              {error && (
                <p
                  style={{
                    textAlign: "center",
                    color: "red",
                    marginBottom: "13px",
                  }}
                >
                  {error}
                </p>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingBottom: "15px",
                }}
              >
                <span>Already have an account?</span>
                <Link to={"/login"} style={{ marginTop: "0px" }}>
                  sign in
                </Link>
              </div>
              <form onSubmit={handleSubmit} className="registration__form">
                <div>
                  <span>username </span>
                  <input
                    ref={usernameDom}
                    type="text"
                    placeholder="user name"
                  />
                </div>
                <br />
                <div className="register_first_last">
                  <div>
                    <span>First name </span>
                    <input
                      ref={firstnameDom}
                      type="text"
                      placeholder="first name"
                    />
                  </div>

                  <div>
                    <span>Last name </span>
                    <input
                      ref={lastnameDom}
                      type="text"
                      placeholder="last name"
                    />
                  </div>
                </div>

                <div>
                  <span>email </span>
                  <input ref={emailDom} type="email" placeholder="email" />
                </div>
                <br />
                <div>
                  <span>Password </span>
                  <input
                    ref={passwordDom}
                    type="password"
                    placeholder="password"
                  />
                </div>
                <br />
                <button className="btn" type="submit">
                  Register
                </button>
              </form>
              <Link to={"/"}>Already have an account</Link>
            </div>
          </section>
          <section className="para">
            <div className="para_container">
              <Link>About</Link>
              <div>
                <h1>Evangadi Networks Q&A</h1>
              </div>
              <div>
                <p>
                  No matter what stage of life you are in, whether you’re just
                  starting elementary school or being promoted to CEO of a
                  Fortune 500 company, you have much to offer to those who are
                  trying to follow in your footsteps.
                </p>
                <p>
                  Wheather you are willing to share your knowledge or you are
                  just looking to meet mentors of your own, please start by
                  joining the network here.
                </p>
              </div>
              <button>How it Works</button>
            </div>
          </section>
        </section>
      </div>
    </LayOut>
  );
};

export default Register;
