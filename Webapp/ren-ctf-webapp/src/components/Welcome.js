import React from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import io from 'socket.io-client';

// const socket = io.connect("https://renctf-server-bbb0e859baa9.herokuapp.com/");
const socket = io.connect("http://localhost:3001")

const Welcome = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      console.log("User signed in!");
      socket.emit("signed_in", auth.currentUser);
    });
  };

  return (
    <main className="welcome">
      <h1>Welcome to RenCTF</h1>
      <img src="/icons/By.gif" alt="Pixel Art" className="pixel-art" width={500} height={380} />
      <h1>Sign in with Google to participate!</h1>
      <h2 className="welcome-rit-notice">[ RIT emails only ]</h2>
      <button className="sign-in">
        <img
          onClick={googleSignIn}
          src={GoogleSignin}
          alt="sign in with google"
          type="button"
        />
      </button>
    </main>
  );
};

export default Welcome;
