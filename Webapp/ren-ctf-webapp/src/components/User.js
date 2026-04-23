import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const colors = {
    R: '#ff2200',
    B: '#00aeff'
}

const User = ({ user }) => {
  return (
    <div className="user-row">

        <t className="user-stat" style={{ color: colors[user.team[0]] }}>
            {"("}
            &nbsp;
            {user.total_moves}
            &nbsp;
            {" Pts. )"}
            &nbsp;
        </t>

        <t className="user-stat"> {" -"} &nbsp;</t>

        <h2 className="user-display-name">{user.display_name}</h2>

        &nbsp;

        {user.comp_chal["easy"].length >= 1 && (
            <div className="hover-container">
                <t className="user-stat color-green">E</t>
                <div className="hover-text">
                    <t className="color-blue">{user.display_name}</t>
                    &nbsp;
                     has completed easy challenge{"(s)"}:
                    <t className="color-green"> {user.comp_chal["easy"]} </t>
                </div>
            </div>
        )}

        &nbsp;

        {user.comp_chal["medium"].length >= 1 && (
            <div className="hover-container">
                <t className="user-stat color-orange">M</t>
                <div className="hover-text">
                    <t className="color-blue">{user.display_name}</t>
                    &nbsp;
                    has completed medium challenge{"(s)"}:
                    <t className="color-orange"> {user.comp_chal["medium"]} </t>
                </div>
            </div>
        )}

        &nbsp;

        {user.comp_chal["hard"].length >= 1 && (
            <div className="hover-container">
                <t className="user-stat color-pink">H</t>
                <div className="hover-text">
                    <t className="color-blue">{user.display_name}</t>
                    &nbsp;
                    has completed easy challenge{"(s)"}:
                    <t className="color-pink"> {user.comp_chal["hard"]} </t>
                </div>
            </div>
        )}
    </div>
  );
};

export default User;
