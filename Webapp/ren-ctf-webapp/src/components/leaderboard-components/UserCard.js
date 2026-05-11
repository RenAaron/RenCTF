import React from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const colors = {
    Red: '#ff0080',
    Blue: '#006eff',
    Hard: '#ff0022',
    Medium: '#ffa600',
    Easy: '#77ff00',
    Purple: '#ce79ff'
}

const borderStyles = {
    Red: '2px solid #ff006f',
    Blue: '2px solid #0066ff',
}

const borderFill = {
    Red: '#ff00951f',
    Blue: '#0059ff12'
}

const User = ({ user }) => {

    function getRandomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }
    const userTeam = user.team;

    return (
        <div style={{border: borderStyles[userTeam], margin: '10px', padding: '5px', backgroundColor: borderFill[userTeam], borderRadius: '10px', overflowX: 'auto'}}>
            <div style={{display: 'flex', alignItems: 'center', margin: '5px'}}>
                <img className="pixel-art" style ={{width: '120px', marginRight: '10px'}} src={`https://raw.githubusercontent.com/RenAaron/RenCTF/refs/heads/main/Webapp/ren-ctf-webapp/public/icons/pfps/face_${getRandomInt(1,10)}/${userTeam}.gif`}></img>
                <h1>{user.display_name}</h1>

                <h2 style={{color: colors[userTeam]}}>&nbsp;({userTeam})</h2>
            </div>

            <hr style={{color: colors[userTeam], margin: '5px', opacity: '50%'}}/>

            <h2>
                Season Score:  <t style={{color: colors['Purple']}}>{user.total_moves} Pts.</t>
            </h2>

            <hr style={{color: colors[userTeam], margin: '5px', opacity: '50%'}}/>

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

            <h2 style={{display: 'flex', alignItems: 'center', margin: '5px'}}>
                Badges: 
                <img src={`/icons/${userTeam}.gif`} alt="Pixel Art" className="pixel-art" width={30} height={30}/>
                <img src={`/icons/Fire.gif`} alt="Pixel Art" className="pixel-art" width={30} height={30}/>
                <img src={`/icons/Discord.gif`} alt="Pixel Art" className="pixel-art" width={30} height={30}/>
                <img src={`/icons/Diamond.gif`} alt="Pixel Art" className="pixel-art" width={30} height={30}/>
                <img src={`/icons/Github.gif`} alt="Pixel Art" className="pixel-art" width={30} height={30}/>
                <img src={`/icons/CRed.gif`} alt="Pixel Art" className="pixel-art" width={30} height={30}/>
                <img src={`/icons/Matrix.gif`} alt="Pixel Art" className="pixel-art" width={30} height={30}/>
                <img src={`/icons/cube_2.gif`} alt="Pixel Art" className="pixel-art" width={30} height={30}/>
                <img src={`/icons/Home.gif`} alt="Pixel Art" className="pixel-art" width={30} height={30}/>
                <img src={`/icons/Emerald.gif`} alt="Pixel Art" className="pixel-art" width={30} height={30}/>
                <img src={`/icons/Skull.gif`} alt="Pixel Art" className="pixel-art" width={30} height={30}/>
                <img src={`/icons/parts.gif`} alt="Pixel Art" className="pixel-art" width={30} height={30}/>
            </h2>
        </div>
    );
};

export default User;
