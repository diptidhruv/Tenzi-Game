import React from "react";
import "./style1.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import Conffeti from "react-confetti";

function App() {
  const [diceArray, setDiceArray] = React.useState(newDiceArray());
  const [tenzies, setTenzies] = React.useState(false);
  const [countClick, setCountClick] = React.useState(0);

  React.useEffect(() => {
    let isAllheld = diceArray.every((die) => die.isHeld);
    let firstValue = diceArray[0].value;
    let isAllSameValue = diceArray.every((die) => die.value === firstValue);

    if (isAllSameValue && isAllheld) {
      setTenzies(true);
    }
  }, [diceArray]);

  const instructions =
    "Roll untill all dices are same. Click each dice to freeze it at its current value between rolls.";

  function generateDice() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }
  function newDiceArray() {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(generateDice());
    }
    return arr;
  }

  function rollAllDices() {
    if (!tenzies) {
      setCountClick(countClick + 1);
      setDiceArray((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateDice();
        })
      );
    } else {
      setTenzies(false);

      setDiceArray((oldDice) =>
        oldDice.map((die) => {
          return generateDice();
        })
      );
    }
  }

  function holdDice(id) {
    setDiceArray((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  const diceElements = diceArray.map((die) => {
    return (
      <Die
        key={die.id}
        id={die.id}
        isHeld={die.isHeld}
        holdDice={holdDice}
        value={die.value}
      />
    );
  });

  return (
    <main>
      {tenzies && <Conffeti />}
      {tenzies && (
        <h2 className="win-msg">Congratulations you won the game!!!!</h2>
      )}
      {tenzies && <div>Number of Rolls to win {countClick}</div>}
      <h1 className="title">Tenzies</h1>
      <div className="instructions">{instructions}</div>
      <div className="dice-container">
        {/* component */}
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollAllDices}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
