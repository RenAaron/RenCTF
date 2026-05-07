const InventoryItem = ({type, count, icon}) => {

    const isTeamItem = (type == 'Blue' || type == 'Red');
    const opacity = count > 0 ? '100%': '40%';

    if(isTeamItem){icon = type}

    return(
        <div style={{opacity: opacity, margin: '5px'}}>
            <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex', margin: '2px'}}>
                {<img src={`/icons/${icon}.gif`} alt="Pixel Art" className="pixel-art" width={30} height={30}/>}
                <h3>: {count}</h3>
            </div>
            <hr style={{color: '#ffffff2c'}}/>
        </div>
    );

};

export default InventoryItem;