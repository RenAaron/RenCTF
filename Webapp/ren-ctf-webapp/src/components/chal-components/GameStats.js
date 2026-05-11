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
    );
};

export default GameStats;