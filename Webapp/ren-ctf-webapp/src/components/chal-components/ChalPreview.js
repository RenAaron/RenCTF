import React from "react";

const ChalPreview = ({ diff, icon, submitIcon, inputId, desc, movesClass, movesCount, onOpen, onGuess }) => {
  return (
    <div className="chal-col">
      <img src={icon} alt="Pixel Art" className="pixel-art-button" width={200} height={120} onClick={() => onOpen(diff)} />

      <div className="chal-input-row">
        <form onSubmit={(event) => onGuess(event, diff, inputId)} className="chal-form">
          <input id={inputId} placeholder="Paste Flag..." className="chal-flag-input" />
        </form>
        <img src={submitIcon} alt="Pixel Art" className="pixel-art-button" width={30} height="auto" onClick={(event) => onGuess(event, diff, inputId)} />
      </div>

      <div className="chal-desc">
        <t className="chal-hint-label">Challenge Desc:</t> {desc} <br /><br />
        Grants <t className={movesClass}> +{movesCount} moves!</t>
      </div>
    </div>
  );
};

export default ChalPreview;
