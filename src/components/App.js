import React, { useState } from "react";
import "../styles/App.css";

import { fetchQuotes, fetchAllCharacters } from "../utils/lotrClient.js";
import { QuoteDisplay } from "./QuoteDisplay";

export default function App() {
  const [quoteDisplay, setQuoteDisplay] = useState({
    name: null,
    dialogText: null,
  });
  const [characters, setCharacters] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [ready, setReady] = useState(false);

  const updateQuoteDisplay = (quoteArray, characterArray) => {
    // grab random quote
    const randomlyPickedQuote =
      quoteArray[Math.floor(Math.random() * quoteArray.length)];

    // find characters name that said the quote
    const found = characterArray.filter(
      (character) => character._id === randomlyPickedQuote.character
    );
    const characterName = found[0]?.name ?? "Unknown Character";

    setQuoteDisplay({
      name: characterName,
      dialogText: randomlyPickedQuote.dialog,
    });
  };

  const renderQuoteDisplay = () => {
    if (!ready) return (
      <p>Loading...</p>
    );

    return (
      <>
        <QuoteDisplay
          name={quoteDisplay.name}
          dialogText={quoteDisplay.dialogText}
        />
        <p>Click anywhere for next quote...</p>
      </>
    );
  }

  React.useEffect(() => {
    const init = async () => {
      const fetchedQuotes = await fetchQuotes();
      const fetchedCharacters = await fetchAllCharacters();

      setQuotes(fetchedQuotes);
      setCharacters(fetchedCharacters);
      updateQuoteDisplay(fetchedQuotes, fetchedCharacters);

      setReady(true);
    };
    init();
  }, []);

  return (
    <div className="App" onClick={() => updateQuoteDisplay(quotes, characters)}>
      {renderQuoteDisplay()}
    </div>
  );
}
