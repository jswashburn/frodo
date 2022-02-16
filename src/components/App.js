import React, { useState } from 'react';
import '../styles/App.css';

import { client } from "../utils/lotrClient.js";
import Quote from './Quote';

export default function App() {
  const [dialog, setDialog] = useState('...');

  React.useEffect(() => {
    const getJsonResponse = async () => {
      const responseJson = await client.fetchQuotes();
      setDialog(responseJson.docs[0].dialog);
    };
    getJsonResponse();
  }, []);

  return (
    <div className="App">
      <button
        onClick={() =>
          client.fetchQuotes().then((quotes) => {
            setDialog(quotes.docs[0].dialog)
          })
        }
      >
        Click here for a random Lord of the Rings quote
      </button>
      <Quote dialog={dialog}/>
    </div>
  );
}