import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import ShopItem from "./ShopItem";
import SendMessage from "./SendMessage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Shop = () => {

  const [user] = useAuthState(auth);

  const [messages, setMessages] = useState([]);
  
  const scroll = useRef();
  

  useEffect(() => {

  }, []);

  return (
    <main>
      <div className="messages-wrapper">

        
        <ShopItem description={"This item is used to do something super important ~ or it is a cosmetic for bragging rigths or something idk."} image={"/icons/Skull.gif"}/>
        <ShopItem description={"This item is used to do something super important ~ or it is a cosmetic for bragging rigths or something idk."} image={"/icons/CBlue.gif"}/>
        <ShopItem description={"This item is used to do something super important ~ or it is a cosmetic for bragging rigths or something idk."} image={"/icons/Fire.gif"}/>
        <ShopItem description={"This item is used to do something super important ~ or it is a cosmetic for bragging rigths or something idk."} image={"/icons/Discord.gif"}/>
        <ShopItem description={"This item is used to do something super important ~ or it is a cosmetic for bragging rigths or something idk."} image={"/icons/Emerald.gif"}/>
        <ShopItem description={"This item is used to do something super important ~ or it is a cosmetic for bragging rigths or something idk."} image={"/icons/parts.gif"}/>
        <ShopItem description={"This item is used to do something super important ~ or it is a cosmetic for bragging rigths or something idk."} image={"/icons/home.gif"}/>
        <ShopItem description={"This item is used to do something super important ~ or it is a cosmetic for bragging rigths or something idk."} image={"/icons/MATRIX.gif"}/>
          
        
      </div>
      <span ref={scroll}></span>
    </main>
  );
};

export default Shop;