import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const colors = {
    Hard: '#ff006f',
    Medium: '#ffa600',
    Easy: '#77ff00',
}

const borderStyles = {
    Hard: '2px solid #ff006f',
    Medium: '2px solid #ffa600',
    Easy: '2px solid #77ff00',
}

const borderFill = {
    Hard: '#ff00951f',
    Easy: '#0059ff12'
}

const ChallengeModal = () => {
    const { ctfId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [description, setDescription] = useState("");
    const [iconLink, setIconLink] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        if (!ctfId) return;
        (async () => {
            const snap = await getDoc(doc(db, "ctfs", ctfId));
            if (snap.exists()) {
                setTitle(snap.data().title);
                setDifficulty(snap.data().difficulty);
                setDescription(snap.data().long_desc);
                setIconLink(snap.data().icon_link);
                setDate(snap.data().date_added);
                
            } else {
                console.log("Could not find ctf", ctfId);
            }
        })();
    }, [ctfId]);

    if (!ctfId) return null;

    return (
        <div onClick={() => navigate("/")} style={{backgroundColor: '#00000000', position: 'fixed', zIndex: 1, width: '100%', height: '100%', left: 0, top: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)'}}>
            <div onClick={(e) => e.stopPropagation()} style={{backgroundColor: '#000000f3', width: '50%', height: '70%', borderRadius: '20px', backdropFilter: 'blur(20px)', border: borderStyles[difficulty], padding: '15px'}}>
                <div style={{fontSize: '4rem', height: '12%', margin: '5px'}}>

                    <div>
                        {title} - <t style={{color: colors[difficulty]}}>{difficulty}</t>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <t style={{fontSize: '1.5rem', opacity: '50%'}}> ID: {ctfId} - Date Added: {Date(date.seconds*1000)}</t>
                    </div>
                    
                    <hr style={{color: colors[difficulty], margin: '5px', opacity: '100%'}}/>
                </div>
                

                <div style={{width: '100%', height: '88%'}}>
                    <div style={{display: 'flex', flexDirection: 'row', height: '50%', margin: '5px'}}>
                        <div style={{width: '40%', display: 'flex', justifyContent: 'center', padding: '5px'}}>
                            {<img src={`${iconLink}`} alt="Pixel Art" className="pixel-art"/>}
                        </div>

                        <div style={{width: '60%', margin: '5px', overflowY: 'auto'}}>
                            <h1 style={{fontSize: '2.5rem', }}>Description/Hint</h1>
                            <hr style={{color: colors[difficulty], margin: '5px', opacity: '30%'}}/>
                            <h2>{description}</h2>
                        </div>  
                    </div>

                    {/* <hr style={{color: colors[difficulty], margin: '5px', opacity: '30%'}}/> */}

                    <div>
                        Badges
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default ChallengeModal;
