import React, { useEffect, useRef, useState } from "react";
import ChatBox from "./ChatBox";
import Console from "./Console";
import Shop from "./Shop";

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

const ProfileAndChat = () => {

  useEffect(() => {
    document.getElementById("defaultOpen").click();
  }, []);

  return (
    <main>
      <div style={{height: '10%', justifyContent: "center", width: '100%', alignItems: "center", display: "flex", marginTop: '30px', justifyContent: 'center'}}>
        <h2 style ={{fontSize: 50, marginRight: '10px'}}> Activity </h2>
      </div>

      <div>
        <div class="tab">
          <button className="tablinks" onClick={(e) => openCity(e, 'Console')} id="defaultOpen">📟 Console</button>
          <button className="tablinks" onClick={(e) => openCity(e, 'Chat')}>💬 Chat</button>
          <button className="tablinks" onClick={(e) => openCity(e, 'Shop')}>✨ Shop (WIP)</button>
        </div>

        
        <div id="Console" class="tabcontent">
          {/* <div class="section section-left"><Profile/></div> */}
          <div><Console/></div>
        </div>

        <div id="Chat" class="tabcontent">
            {/* <div class="section section-left"><ChatBox/></div> */}
            <div><ChatBox/></div>
        </div>

        <div id="Shop" class="tabcontent">
            <div><Shop/></div>
        </div>

      </div>
      

     
      
    </main>
  );
};

export default ProfileAndChat;