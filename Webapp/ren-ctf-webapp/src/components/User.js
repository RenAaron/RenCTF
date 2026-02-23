import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const colors = {
    R: '#ff2200',
    B: '#00aeff'
}

const User = ({ user }) => {
  return (
    <div style={{display: "flex", alignItems: 'center'}}>

        <t style={{color: colors[user.team[0]], fontSize: '19px'}}>
            {"("}
            &nbsp;
            {user.total_moves}
            &nbsp;
            {" Pts. )"}
            &nbsp;
        </t>

        <t style={{fontSize: '19px'}}> {" -"} &nbsp;</t>
            
        <h2 style={{paddingRight: '2px', fontSize: '19px'}}>{user.display_name}</h2>

        &nbsp;

        {user.comp_chal["easy"].length >= 1 && (
            <div class="hover-container">
                <t style={{color: '#00ff7b', fontSize: '19px'}}>E</t>
                <div class="hover-text">
                    <t style={{color: '#00aeff'}}>{user.display_name}</t>
                    &nbsp;
                     has completed easy challenge{"(s)"}: 
                    <t style={{color: '#00ff7b'}}> {user.comp_chal["easy"]} </t> 
                </div>
            </div>
        )}

        &nbsp;

        {user.comp_chal["medium"].length >= 1 && (
            <div class="hover-container">
                <t style={{color: '#fc9003', fontSize: '19px'}}>M</t>
                <div class="hover-text">
                    <t style={{color: '#00aeff'}}>{user.display_name}</t>
                    &nbsp;
                    has completed medium challenge{"(s)"}: 
                    <t style={{color: '#fc9003'}}> {user.comp_chal["medium"]} </t> 
                </div>
            </div>
        )}

        &nbsp;

        {user.comp_chal["hard"].length >= 1 && (
            <div class="hover-container">
                <t style={{color: '#ff1c77', fontSize: '19px'}}>H</t>
                <div class="hover-text">
                    <t style={{color: '#00aeff'}}>{user.display_name}</t>
                    &nbsp;
                    has completed easy challenge{"(s)"}: 
                    <t style={{color: '#ff1c77'}}> {user.comp_chal["hard"]} </t> 
                </div>
            </div>
        )}
    </div>
  );
};

export default User;