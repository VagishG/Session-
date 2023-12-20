import React,{useEffect} from "react";
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
  } from "firebase/auth";
import app from "./firebase/app";
import {useNavigate} from "react-router-dom"
const Home = () => {
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
    return (
    <div>
      <h1>this is Home Page</h1>
      <button onClick={()=>navigate("/login")}>Login</button>
    </div>
  )
}

export default Home
