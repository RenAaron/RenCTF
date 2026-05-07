import InventoryItem from "./InventoryItem";

const MoveInventory = ({moves, team}) => {
    return (
        <div style={{width:"20%", height: '70%', marginLeft: '20px', padding: '5px', border: '1px dashed #ffffff64'}}>
            
            <div style={{height: '10%'}}>
                <h2 style={{textAlign: 'center'}}>YOUR MOVES</h2>
                <hr/>
            </div>
            
            <div style={{height: '90%'}}>
                <InventoryItem type={team} count={moves}/>
                <InventoryItem type={'Skull'} count={0} icon={"Skull"}/>
                <InventoryItem type={'CBlue'} count={0} icon={"Home"}/>
                <InventoryItem type={'Skull'} count={0} icon={"Matrix"}/>
                <InventoryItem type={'Skull'} count={0} icon={"Emerald"}/>
                <InventoryItem type={'Skull'} count={0} icon={"Fire"}/>
                <InventoryItem type={'Skull'} count={0} icon={"Diamond"}/>
            </div>
            
        </div>
    );
};

export default MoveInventory;