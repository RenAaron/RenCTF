import React, { useEffect, useRef, useState } from "react";
import Challenges from "./Challenges";
import ChatBox from "./ChatBox";
import Tutorial from "./Tutorial";
import ProfileAndChat from "./ProfileAndChat";

const Layout = () => {
  


  return (
    <main>
        <div class="container">
            {/* <div class="section section-left"><ChatBox/></div>
            <div class="section section-middle"><Challenges/></div>
            <div class="section section-right"><Profile/></div> */}

            <div class="section section-left"><Tutorial/></div>
            <div class="section section-middle"><Challenges/></div>
            <div class="section section-right"><ProfileAndChat/></div>
        </div>
    </main>
  );
};

export default Layout;