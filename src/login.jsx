import { React, useState, useEffect } from "react";
import img from "./assets/vips.webp";
import "./Login.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import logo from "./assets/vips_full_logo.png";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { Icon } from "react-icons-kit";
import app from "./firebase/app.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, SetCredentials] = useState({ email: "", password: "" });
  const [show, SetShow] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(app);

  useEffect(() => {
    async function checkUser() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate("/admin");
        }
      });
    }
    checkUser();
  }, []);

  function handleOnChange(event) {
    const { name, value } = event.target;
    SetCredentials((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function Submit() {
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        // Signed in
        alert("User Logged in");
        const user = userCredential.user;
        navigate("/admin");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  }

  return (
    <div className="main">
      <div className="image">
        <img src={img} alt="" />
      </div>
      <div className="form">
        <img src={logo} alt="" />
        <div className="input">
          <input
            type="text"
            placeholder="Email address"
            name="email"
            onChange={(event) => handleOnChange(event)}
            value={credentials.email}
          />
        </div>
        <div className="input">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            name="password"
            onChange={(event) => handleOnChange(event)}
            value={credentials.password}
          />
          <Icon
            className="icon"
            icon={show ? eye : eyeOff}
            size={20}
            onClick={() => SetShow((prev) => !prev)}
          />
        </div>
        <p>Forgot Password?</p>
        <button onClick={Submit}>Login</button>
      </div>
    </div>
  );
}


