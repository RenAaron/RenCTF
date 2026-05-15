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

    Hard_d: '2px dashed #ff006f',
    Medium_d: '2px dashed #ffa600',
    Easy_d: '2px dashed #77ff00'
}

const fillColors = {
    Hard: '#ff00951f',
    Medium: '#ffbf001f',
    Easy: '#00ff661f'
}

const submitIcons = {
    Hard: '/icons/EHard.gif',
    Medium: '/icons/EMed.gif',
    Easy: '/icons/EEas.gif',
}

const ChallengeModal = ({ onGuess }) => {
    const { ctfId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [description, setDescription] = useState("");
    const [iconLink, setIconLink] = useState("");
    const [date, setDate] = useState("");
    const [badges, setBadges] = useState([]);
    const [grant, setGrant] = useState(0);
    const [guide, setGuide] = useState("");
    const [download, setDownload] = useState("");
    const [chalColor, setColor] = useState("");

    const fillColor = `${chalColor}1f`; 
    const solidBorder = `2px solid ${chalColor}`;
    const dashedBorder = `2px dashed ${chalColor}`;

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
                setBadges(snap.data().badges);
                setGrant(snap.data().grant_count);
                setGuide(snap.data().guide_link);
                setDownload(snap.data().download_link);
                setColor(snap.data().color);
            } else {
                console.log("Could not find ctf", ctfId);
            }
        })();
    }, [ctfId]);

    if (!ctfId) return null;

    return (
        <div onClick={() => navigate("/")} style={{backgroundColor: '#00000000', position: 'fixed', zIndex: 1, width: '100%', height: '100%', left: 0, top: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)'}}>
            <div onClick={(e) => e.stopPropagation()} style={{backgroundColor: '#000000f3', width: '50%', height: '80%', borderRadius: '20px', backdropFilter: 'blur(20px)', border: solidBorder, padding: '30px'}}>
                <div style={{fontSize: '3rem', height: '12%', margin: '5px'}}>

                    <div>
                        {title} - <t style={{color: colors[difficulty]}}>{difficulty}</t>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <t style={{fontSize: '1rem', opacity: '50%'}}> ID: {ctfId} - Date Added: {date?.seconds ? new Date(date.seconds * 1000).toLocaleString() : ""}</t>
                    </div>
                    
                    <hr style={{color: chalColor, margin: '5px', opacity: '100%'}}/>
                </div>
                

                <div style={{width: '100%', height: '88%'}}>
                    <div style={{display: 'flex', flexDirection: 'row', height: '50%', margin: '5px'}}>
                        <div style={{width: '40%', display: 'flex', justifyContent: 'center', padding: '5px'}}>
                            {<img src={`/icons/chal_icons/${iconLink}.gif`} alt="Pixel Art" className="pixel-art"/>}
                        </div>

                        <div style={{width: '60%', margin: '5px'}}>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: '10px', height: '10%'}}>
                                <h1 style={{fontSize: '2rem', margin: 0}}>Description/Hint</h1>
                                {guide && (
                                    <a href={guide} target="_blank" rel="noreferrer" style={{fontSize: '2rem', opacity: '50%', color: 'inherit'}}>(Guide)</a>
                                )}
                            </div>
                            <hr style={{color: chalColor, margin: '5px', opacity: '30%'}}/>
                            <h2 style={{height: '90%', overflowY: 'auto'}}>{description}</h2>
                        </div>
                    </div>

                    <hr style={{color: chalColor, opacity: '100%', marginBottom: '20px', marginTop: '20px'}}/>

                    <div style={{display: 'flex', gap: '20px'}}>
                        <div style={{width: '30%', padding: '10px', borderRadius: '10px', paddingLeft: '10px', border: dashedBorder, backgroundColor: fillColor}}>
                            <h1>Challenge Rewards</h1>
                            <hr style={{color: chalColor, opacity: '30%', marginBottom: '10px', marginTop: '10px'}}/>

                            <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center', width: 'auto', margin: '10px'}}>
                                    {<img src={`/icons/Purple.gif`} alt="Pixel Art" className="pixel-art" width={40} height={40}/>}
                                    <h2> &nbsp; (+{grant}) Moves</h2>
                            </div>
                            
                            {badges.map(badge =>
                                <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center', width: 'auto', margin: '10px'}}>
                                    {<img src={`/icons/badges/${badge}.gif`} alt="Pixel Art" className="pixel-art" width={40} height={40}/>}
                                    <h2> &nbsp; {badge} Badge</h2>
                                </div>
                            )}
                        </div>

                        <div style={{width: '70%', display: 'flex', flexDirection: 'column', gap: '15px'}}>
                            <div
                                onClick={() => download && window.open(download, '_blank')}
                                style={{padding: '15px', borderRadius: '10px', border: solidBorder, backgroundColor: fillColor, cursor: download ? 'pointer' : 'default', textAlign: 'center', fontSize: '2rem'}}
                            >
                                Download Challenge Files
                            </div>

                            <div style={{padding: '10px', borderRadius: '10px', paddingLeft: '10px', border: dashedBorder, backgroundColor: fillColor}}>
                                <h1>Think you got the flag? SUBMIT HERE!!!</h1>
                                <hr style={{color: chalColor, opacity: '30%', marginBottom: '10px', marginTop: '10px'}}/>
                                <div className="chal-input-row" style={{alignItems: 'center'}}>
                                    <form onSubmit={(event) => onGuess && onGuess(event, difficulty?.toLowerCase(), 'guess_modal')} className="chal-form"> {/* pls fix this garbage */}
                                        <input id="guess_modal" placeholder="Paste Flag..." className="chal-flag-input" style={{padding: '14px 16px', fontSize: '1.25rem', width: '100%'}} />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    

                    

                    {/* <hr style={{color: colors[difficulty], margin: '5px', opacity: '30%'}}/> */}

                    
                </div>
                
            </div>
        </div>
    );
};

export default ChallengeModal;
