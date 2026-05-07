const GameStats = ({team, moves, multiplier, RedScore, BlueScore}) => {

    const isValidTeam = team === "Red" || team === "Blue";

    const colors = {
        Blue: '#0080ff',
        Red: '#ff0077'
    }



    return (
        <div style={{ width: '100%', height: '20%', justifyContent: 'space-between', alignItems: 'center', display: 'flex'}}>
            
            <div style={{display: 'flex', alignItems: 'center'}}>
                <h1 style={{margin: '5px', color: colors['Red']}}>RED TEAM: <t style={{color: 'white'}}>{RedScore}</t></h1> {RedScore >= BlueScore && <img src={`/icons/CRed.gif`} alt="Pixel Art" className="pixel-art" width={25} height={25}/>}
            </div>

            <div style={{display: 'flex', alignItems: 'center'}}>
                <h1 style={{margin: '5px', color: colors['Blue']}}>BLUE TEAM: <t style={{color: 'white'}}>{BlueScore}</t></h1> {RedScore <= BlueScore && <img src={`/icons/CBlue.gif`} alt="Pixel Art" className="pixel-art" width={25} height={25}/>}
            </div>
            
        </div>
        // <div style={{width: "20%", height: "100%", marginLeft: "10px", justifyContent: 'center', alignItems: 'center', display: 'felx'}}>

        //     <h1 style={{margin: '5px'}}>Stats</h1>

        //     <h1 style={{margin: '5px'}}>Red Team Score: 10</h1> <img src={`/icons/C${team}.gif`} alt="Pixel Art" className="pixel-art" width={25} height={25}/>

        //     <h1 style={{margin: '5px'}}>Red Team Score: 10</h1>




            /* {isValidTeam ? (
                <t className={`team-label ${teamClass}`}>
                    YOUR MOVES: &nbsp;<t className="text-white">{moves}</t>
                    &nbsp;
                    <img src={`/icons/${team}.gif`} alt="Pixel Art" className="pixel-art" width={25} height={25}/>
                </t>
            ) : (
                <t className="chal-warning">
                    USE YOUR RIT EMAIL! SIGN OUT AND SIGN BACK IN!
                </t>
            )}

            <div className="chal-multiplier">
                <t>CURRENT MULTIPLIER: </t>{multiplier}<t>x!</t>
            </div>

            <div>
                <t className="team-label team-red">RED: &nbsp;<t className="text-white">{RedScore}</t></t>
                &nbsp;&mdash;&nbsp;
                <t className="team-label team-blue">BLUE: &nbsp;<t className="text-white">{BlueScore}</t></t>
            </div> */
    );
};

export default GameStats;