import React,{useEffect} from "react";
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
  } from "firebase/auth";
import app from "./firebase/app";
import {useNavigate} from "react-router-dom"

const Admin = () => {
    const navigate = useNavigate();
    const auth = getAuth(app);
    
    async function logout() {
        const auth = getAuth(app);
        signOut(auth).then(() => {
          navigate("/")
        }).catch((error) => {
          // An error happened.
        });
      }
  
    useEffect(() => {
        async function checkUser() {
          onAuthStateChanged(auth, (user) => {
            if (user) {
              navigate("/admin");
            }
            else{
                navigate("/")
            }
          });
        }
        checkUser();
      }, []);
    return (
    <div>
      <h1>This is Admin Page after login</h1>
      <h3>you can't access without login</h3>
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}

export default Admin
