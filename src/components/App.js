import React, { useState } from "react";
import "../styles/App.css";

import { client } from "../utils/lotrClient.js";
import Character from "./Character";
import Quote from "./Quote";

export default function App() {
  const [dialog, setDialog] = useState("...");
  const [characterName, setCharacterName] = useState("...");

  const getRandomQuoteAndCharacter = async () => {
    const responseJson = await client.fetchQuotes();
    const quote = responseJson.docs[0];
    setDialog(quote.dialog);

    const characterResponseJson = await client.fetchCharacterById(
      quote.character
    );
    setCharacterName(characterResponseJson.docs[0].name);
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
