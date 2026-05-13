import React from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const colors = {
    Hard: '#ff0022',
    Medium: '#ffa600',
    Easy: '#77ff00',
}

const borderStyles = {
    Hard: '2px dashed #ff006f',
    Medium: '2px dashed #ffa600',
    Easy: '2px dashed #77ff00',
}

const borderFill = {
    Red: '#ff00951f',
    Blue: '#0059ff12'
}

const ChallengeModal = ({}) => {


    return (
        <div style={{backgroundColor: '#00000000', position: 'fixed', zIndex: 1, width: '100%', height: '100%', left: 0, top: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)'}}>
            <div style={{backgroundColor: '#000000f3', width: '50%', height: '70%', borderRadius: '20px', backdropFilter: 'blur(20px)', border: borderStyles['Easy'], padding: '20px'}}>
                <h1 style={{fontSize: '70px', height: '10%'}}>
                    Challenge Title &nbsp;
                    <t style={{color: colors['Easy']}}>(Easy)</t>
                </h1>

                <hr style={{color: colors['Easy'], margin: '5px', opacity: '50%'}}/>

                <div style={{display:'flex', flexDirection:'row', width: '100%', height: '90%'}}>
                    <div style={{backgroundColor: 'red', width: '50%', height: '50%'}}> stuff</div>
                    <div style={{backgroundColor: 'blue', width: '50%'}}> stuff</div>
                </div>
            </div>
        </div>
    );
};

export default ChallengeModal;
