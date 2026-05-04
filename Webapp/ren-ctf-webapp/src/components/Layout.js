import React, { useEffect, useRef, useState } from "react";
import Challenges from "./Challenges";
import ChatBox from "./ChatBox";
import ProfileAndChat from "./ProfileAndChat";
import TeamTrace from "./TeamTrace";

const Layout = () => {
  return (
    <main>

        <div class="container">
            {/* <div class="section section-left"> words</div> */}
            {/* <div class="section section-middle">words</div> */}
            {/* <div class="section section-right">words</div> */}

            <div class="section section-left"><TeamTrace/></div> 
            <div class="section section-middle"><Challenges/></div>
            <div class="section section-right"><ProfileAndChat/></div>
        </div>
    </main>
  );
};

export default Layout;