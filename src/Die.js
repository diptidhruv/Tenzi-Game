import React from "react";

export default function die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div
      onClick={() => props.holdDice(props.id)}
      style={styles}
      className="die-face"
    >
      <div className="die-num">{props.value}</div>
    </div>
  );
}
