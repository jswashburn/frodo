import { useState } from 'react';
import '../styles/App.css';

import { client } from "../utils/lotrClient.js";
import Quote from './Quote';

export default function App() {
  const [dialog, setDialog] = useState('No quote yet...');

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