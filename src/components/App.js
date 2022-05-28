import React, { useState } from "react";
import "../styles/App.scss";

import { getAllDocs } from "../utils/lotrClient.js";
import { QuoteDisplay } from "./QuoteDisplay";

function PickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function App() {
  const [state, setState] = useState({
    quoteDisplay: <QuoteDisplay name={null} dialogText={null} />,
    allCharacters: [],
    allQuotes: [],
  });

  React.useEffect(() => {
    const init = async () => {
      const fetchedQuotes = await getAllDocs("quote");
      const fetchedCharacters = await getAllDocs("character");

      setState({
        quoteDisplay: RenderRandomQuoteDisplay(
          fetchedQuotes,
          fetchedCharacters
        ),
        allCharacters: fetchedCharacters,
        allQuotes: fetchedQuotes,
      });
    };
    init();
  }, []);

  function RenderRandomQuoteDisplay(quotes, characters) {
    const randomlyPickedQuote = PickRandom(quotes);
    const character = characters.filter(
      (c) => c._id === randomlyPickedQuote.character
    );
    const characterName = character[0]?.name ?? "Unknown Character";

    return (
      <QuoteDisplay
        name={characterName}
        dialogText={randomlyPickedQuote.dialog}
      />
    );
  }

  return (
    <div
      className="App DisableTextSelection"
      onClick={() =>
        setState((prev) => ({
          ...prev,
          quoteDisplay: RenderRandomQuoteDisplay(
            prev.allQuotes,
            prev.allCharacters
          ),
        }))
      }
    >
      {state.quoteDisplay}
      <p>Click anywhere for next quote...</p>
    </div>
  );
}

