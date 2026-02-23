import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const ChatBox = () => {

  const [user] = useAuthState(auth);

  const [messages, setMessages] = useState([]);
  
  const scroll = useRef();

  useEffect(() => {
    
    if (!user) return; 

    const q = query(
      collection(db, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(30)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {

      const fetchedMessages = [];
      const filteredMessages = [];
      

      QuerySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.uid === user.uid) {

          fetchedMessages.push({ ...data, id: doc.id });
        }
      });

      for (let i = fetchedMessages.length - 1; i > 0; i--) {
        if(fetchedMessages[i].uid == user.uid){
          filteredMessages.push(fetchedMessages[i]);
        }
      }

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
          <Message key={message.id} message={message} />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </main>
  );
};

export default ChatBox;