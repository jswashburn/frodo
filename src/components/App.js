import React, { useState } from "react";
import "../styles/App.css";

import { client } from "../utils/lotrClient.js";
import Character from "./Character";
import Quote from "./Quote";

export default function App() {
  const [dialog, setDialog] = useState("...");
  const [characterName, setCharacterName] = useState("...");

  const getRandomQuoteAndCharacter = async () => {
    const characterQuote = await client.fetchRandomCharacterQuote();
    setDialog(characterQuote.quote.docs[0].dialog);
    setCharacterName(characterQuote.character.docs[0].name);
  };

  React.useEffect(() => {
    getRandomQuoteAndCharacter();
  }, []);

  return (
    <div className="App">
      <button onClick={getRandomQuoteAndCharacter}>
        Click here for a random Lord of the Rings quote
      </button>
      <Character name={characterName} />
      <Quote dialog={dialog} />
    </div>
  );
}
