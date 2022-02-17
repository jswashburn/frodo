import React, { useState } from "react";
import "../styles/App.css";

import { fetchQuotes, fetchAllCharacters } from "../utils/lotrClient.js";
import Character from "./Character";
import Quote from "./Quote";

export default function App() {
  const [quoteDisplay, setQuoteDisplay] = useState({
    name: null,
    dialogText: null,
  });
  const [characters, setCharacters] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [ready, setReady] = useState(false);

  const updateQuoteDisplay = () => {
    // grab random quote
    const randomlyPickedQuote =
      quotes[Math.floor(Math.random() * quotes.length)];

    // find characters name that said the quote
    const found = characters.filter(
      (character) => character._id === randomlyPickedQuote.character
    );
    const characterName = found[0]?.name ?? "Unknown Character";

    setQuoteDisplay({
      name: characterName,
      dialogText: randomlyPickedQuote.dialog,
    });
  };

  React.useEffect(() => {
    const init = async () => {
      const quotes = await fetchQuotes();
      const characters = await fetchAllCharacters();

      setQuotes(quotes);
      setCharacters(characters);
      setReady(true);
    };
    init();
  }, []);

  return (
    <div className="App">
      <button onClick={updateQuoteDisplay}>
        {ready
          ? "Click here for a random Lord of the Rings quote"
          : "Loading..."}
      </button>
      <Character name={quoteDisplay.name} />
      <Quote dialog={quoteDisplay.dialogText} />
    </div>
  );
}
