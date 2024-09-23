import React, { useState, useContext } from "react";

import classes from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
   signInWithEmailAndPassword,
   createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import { ClipLoader } from "react-spinners";

function Auth() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const [{ user }, dispatch] = useContext(DataContext);
   const [loading, setLoading] = useState({
      signIn: false,
      signUp: false,
   });
   const navigate = useNavigate()
  //  console.log(user);

   //console.log(password, email);

   //the authHandeler function is fired when the submit button is clicked
   const authHandler = async (e) => {
      e.preventDefault();
      //console.log(e.target.name);
      if (e.target.name == "signin") {
         setLoading({ ...loading, signIn: true }); //this is for visual purposes to show the page is loading during login, for ex. by spiining
         // we use firebase auth to sign-in the user
         //auth uses our firebase credentials to idnetify the amazon page and to login the user with
         //thier email and password if account exists
         signInWithEmailAndPassword(auth, email, password)
            .then((userInfo) => {
               //console.log(userInfo);
               dispatch({
                  type: Type.SET_USER,
                  user: userInfo.user,
               });
               setLoading({ ...loading, signIn: false }); //stop page laoding/spining after sucessfull login
               navigate("/") //page navigates to home page after sucessfull login
            })
            .catch((err) => {
               setError(err.message);
               setLoading({ ...loading, signIn: false }); //stop loading sing-in page if err
            });
      } else {
         setLoading({ ...loading, signUp: true });
         createUserWithEmailAndPassword(auth, email, password)
            .then((userInfo) => {
               //console.log(userInfo);
               dispatch({
                  type: Type.SET_USER,
                  user: userInfo.user,
               });
               setLoading({ ...loading, signUp: false });
               navigate("/");//page navigates to home after user sign-up
            })
            .catch((err) => {
               setError(err.message);
               setLoading({ ...loading, signUp: false });
            });
      }
   };

   return (
      <section className={classes.login}>
         {/* logo */}
         {/* navigate to homepage when the logo is clicked */}
         <Link to={"/"} > 
            <img
               src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
               alt=""
            />
         </Link>

         {/* form/login */}

         <div className={classes.login_container}>
            <h1>Sign In</h1>

            <form action="">
               <div>
                  <label htmlFor="email">Email</label>
                  <input
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     type="email"
                     id="email"
                  />
               </div>

               <div>
                  <label htmlFor="password">Password</label>
                  <input
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     type="password"
                     id="password"
                  />
               </div>

               <button
                  type="submit"
                  onClick={authHandler}
                  name="signin"
                  className={classes.login_signInButton}
               >
                  {" "}
                  {loading.signIn ? (
                     <ClipLoader color="#000" size={"15"}></ClipLoader>
                  ) : (
                     "Sign In"
                  )}
               </button>
            </form>

            {/* agreement section */}
            <p>
               By singing-in you agree to the AMAZON FAKE CLONE Conditions of
               Use & Sale. Please see our Privacy Notice, our Cookes Notice and
               our Interest Based Ads Notice.
            </p>

            {/* create account button section */}
            <button
               type="submit"
               onClick={authHandler}
               name="signup"
               className={classes.login_registerButton}
            >
               {loading.signUp ? (
                  <ClipLoader color="#000" size={"15"}></ClipLoader>
               ) : (
                  "Create your Amazon Account"
               )}
            </button>

            {error && (
               <small style={{ paddingTop: "5px", color: "red" }}>
                  {error}
               </small>
            )}
            {/* display error message if there is an error during login
           this error message comes from Firebase itself */}
         </div>
      </section>
   );
}

export default Auth;
