import React, { useState } from "react";
import { auth, db } from "../firebase";
import { doc, addDoc, collection, serverTimestamp, getDoc, updateDoc } from "firebase/firestore";
import Swal from 'sweetalert2'


const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async (event) => {

    event.preventDefault(); // prevent page from refreshing 

    if (message.trim() === "") {
      return;
    }

    const { uid, displayName, photoURL } = auth.currentUser;

    console.log(auth.currentUser);

    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if('saw_notice' in userSnap.data()){
      console.log("User has seen notice!")
    } else{
      Swal.fire({
        icon: "info",
        title: "Notice!",
        iconColor: "#f803fc",
        color: '#f803fc',
        background: 'black',
        text: "This feature is a work in progress. To help us improve this feature, we may collect limited usage data when you interact in this chat. We may use this information in aggregated and anonymized form for reporting, analysis, and research publications, in ways designed to protect your privacy. By continuing, you acknowledge this notice.",
        showCloseButton: false,
        confirmButtonColor: "#f803fc",
        confirmButtonText: "👍"
      });
      await updateDoc(userRef, {
      saw_notice: 1
    });
    }


    if(true){
      await addDoc(collection(db, "messages"), {
        text: message,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid,
      });
    }

    setMessage("");

    // scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)} // sets the message to whatever the field is 
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;