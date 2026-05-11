import React from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const colors = {
    Red: '#ff2200',
    Blue: '#00aeff',
    Hard: '#ff0022',
    Medium: '#ffa600',
    Easy: '#77ff00',
}

const borderStyles = {
    Red: '1px dashed #ff2200',
    Blue: '1px dashed #0066ff',
}

const borderFill = {
    Red: '#ff22001f',
    Blue: '#0059ff12'
}

const User = ({ user }) => {
    const userTeam = user.team;

    return (
        <div style={{border: borderStyles[userTeam], margin: '10px', padding: '5px', backgroundColor: borderFill[userTeam], borderRadius: '10px'}}>
            <div style={{display: 'flex', alignItems: 'center', margin: '5px'}}>
                <img style ={{width: '90px', marginRight: '10px'}} src="https://reptichip.com/cdn/shop/articles/Best_substrate_for_a_Red-eyed_tree_frog_Agalychnis_callidryas_ReptiChip_80942433-5f3f-4b05-865e-c6a8d49ad24b_600x.png?v=1755698331"></img>
                <h1>{user.display_name}</h1>

                <h2 style={{color: colors[userTeam]}}>&nbsp;({userTeam})</h2>
            </div>

            <hr/>

        <h2>
            Completed:  
        </h2>

        {user.comp_chal["easy"].length > 0 && <h3>
            <t style={{color: colors['Easy']}}>Easy: </t> {user.comp_chal["easy"]}
        </h3>}

        {user.comp_chal["medium"].length > 0 && <h3>
            <t style={{color: colors['Medium']}}>Medium: </t> {user.comp_chal["medium"]}
        </h3>}

        {user.comp_chal["hard"].length > 0 && <h3>
            <t style={{color: colors['Hard']}}>Hard: </t> {user.comp_chal["hard"]}
        </h3>}

            {/* <t className="user-stat" style={{ color: colors[user.team[0]] }}>
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
            )} */}
        </div>
    );
};

export default User;
