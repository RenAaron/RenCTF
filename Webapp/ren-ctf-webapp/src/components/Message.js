// Message.jsx
import React, { useMemo } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import DOMPurify from "dompurify";
import { marked } from "marked";

const renderer = new marked.Renderer();

// replace <br> with a custom class we can style
renderer.br = () => '<br class="softbreak">';

marked.setOptions({
  gfm: true,
  breaks: true,
  renderer
})

// Configure marked once
marked.setOptions({
  gfm: true,   // tables, strikethrough, task lists
  breaks: true // single newlines -> <br>, like Discord/ChatGPT
});

function MarkdownText({ text }) {
  const html = useMemo(() => {
    const raw = marked.parse(text || "");
    return DOMPurify.sanitize(raw, { USE_PROFILES: { html: true } });
  }, [text]);

  return (
    // Using a div because markdown can output block elements
    <div
      className="message-text"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

const Message = ({ message }) => {
  const [user] = useAuthState(auth);

  const isSelf =
    message.uid === user?.uid && message.name === user?.displayName;

  return (
    <div className={`chat-bubble ${isSelf ? "right" : ""}`}>
      <img className="chat-bubble__left" src={message.avatar} alt="user avatar" />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>

        {/* Replace this: <p>{message.text}</p> */}
        <MarkdownText text={message.text} />
      </div>
    </div>
  );
};

export default Message;
