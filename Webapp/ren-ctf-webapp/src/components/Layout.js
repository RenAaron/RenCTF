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
            {/* <div class="section section-left"> words</div> */}
            {/* <div class="section section-middle">words</div> */}
            {/* <div class="section section-right">words</div> */}

            <div class="section section-left" style={{backgroundImage: 'linear-gradient(rgb(0, 0, 0), rgb(0, 5, 90))'}}><Leaderboard/></div> 
            <div class="section section-middle"><Challenges/></div>
            <div class="section section-right" style={{backgroundImage: 'linear-gradient(rgb(0, 0, 0), rgb(0, 5, 90))'}}><ProfileAndChat/></div>
        </div>
    </main>
  );
};

export default Layout;