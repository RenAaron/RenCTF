import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import ConsoleMessage from "./ConsoleMessage";
import SendMessage from "./SendMessage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Console = () => {

  const [user] = useAuthState(auth);

  const [messages, setMessages] = useState([]);
  
  const scroll = useRef();
  

  useEffect(() => {
    
    if (!user) return; 

    

    const q = query(
      collection(db, 'console-messages'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {

      const fetchedMessages = [];
      

      QuerySnapshot.forEach((doc) => {
        const data = doc.data();
          fetchedMessages.push({ ...data, id: doc.id });
        
      });

      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );

      setMessages(sortedMessages);

      scroll.current.scrollIntoView({ behavior: "smooth" });

    });

    return () => unsubscribe;

  }, []);

  return (
    <main>
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <ConsoleMessage key={message.id} message={message} />
        ))}
      </div>
      <span ref={scroll}></span>
    </main>
  );
};

export default Console;