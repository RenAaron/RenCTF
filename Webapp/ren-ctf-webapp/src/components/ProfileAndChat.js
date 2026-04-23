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
    <main className="activity-main">
      <div className="section-header">
        <h2 className="section-title"> Activity </h2>
      </div>

      <div className="section-body">
        <div className="tab">
          <button className="tablinks" onClick={(e) => openCity(e, 'Console')} id="defaultOpen">📟 Console</button>
          <button className="tablinks" onClick={(e) => openCity(e, 'Chat')}>💬 Chat</button>
          <button className="tablinks" onClick={(e) => openCity(e, 'Shop')}>✨ Shop (WIP)</button>
        </div>

        <div id="Console" className="tabcontent">
          <Console/>
        </div>

        <div id="Chat" className="tabcontent">
          <div><ChatBox/></div>
        </div>

        <div id="Shop" className="tabcontent">
          <div><Shop/></div>
        </div>
      </div>
    </main>
  );
};

export default ProfileAndChat;
