import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp, getDocs  } from "firebase/firestore";

const keysCollectionRef = collection(db, "keys");

async function getAllKeys() {
  try {
    const querySnapshot = await getDocs(keysCollectionRef);
    const keysList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return keysList;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async (event) => {

    event.preventDefault(); // prevent page from refreshing 

    if (message.trim() === "") {
      
      return;
    }
    
    if(message.startsWith("/guess")){

      let guess = message.substring(7);

      if(guess.trim() !== ""){
        let keys = await getAllKeys();
        let flags = keys.map(obj => obj.flag);

        if(flags.includes(guess)){
          alert("Correct")
        } else{
          alert("Incorrect")
        }
        
      } else{
        alert("Enter a valid guess pls!");
      }

      setMessage("");
      return;
      
    }

    if(message.startsWith("/submit")){

      let image = message.substring(8);

      const { uid, displayName, photoURL } = auth.currentUser; 

      await addDoc(collection(db, "images"), {
        text: image,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid,
      });

      setMessage("");
    }
    
    const { uid, displayName, photoURL } = auth.currentUser; 

    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });

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