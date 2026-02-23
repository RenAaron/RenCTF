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

const ShopItem = ({ image, description }) => {

  return (
    <div>
        <div style ={{marginTop: "20px", fontSize: 19, justifyContent: "center", display: "flex", alignItems: "center", color: "#ffffffff"}}>
            <img src={image} class="pixel-art" width={60} height={60} style={{marginRight: "20px", borderRadius: "5%", backgroundColor: "#000000ff", borderStyle: "double", borderColor: "#2100c9ff"}}/>
            <MarkdownText text={ description } />
        </div>

        {/* <button style={{backgroundColor: "black", borderRadius: "5%", color: "white"}}> Buy </button> */}

        <hr style={{color: "#181880ff", marginTop: "20px"}}></hr>
        
    </div>
    
  );
};

export default ShopItem;
