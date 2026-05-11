import React, { useEffect, useRef, useState } from "react";
import Challenges from "./Challenges";
import ChatBox from "./ChatBox";
import Trace from "./chal-components/Trace";
import ProfileAndChat from "./ProfileAndChat";
import Leaderboard from "./Leaderboard";

const Layout = () => {
  return (
    <main>
        <div class="container">
            <div class="section section-left"><Leaderboard/></div> 
            <div class="section section-middle"><Challenges/></div>
            <div class="section section-right"><ProfileAndChat/></div>
        </div>
    </main>
  );
};

export default Layout;