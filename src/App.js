import logo from './logo.svg';
import './App.css';

const API_MANAGEMENT_ENDPOINT = 'https://api-mgmt-frodo.azure-api.net/theoneapi';

async function fetchQuotes() {
  let response = await fetch(`${API_MANAGEMENT_ENDPOINT}/quote`, {
    method: 'GET'
  });

  let quotes = await response.json();

  return quotes;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Happy Birthday Ethan! 🎂
        </p>
        <a
          className="App-link"
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cat pictures
        </a>
        <button onClick={() => fetchQuotes().then(quotes => console.log(quotes))}>
          Log Quotes
        </button>
      </header>
    </div>
  );
}

export default App;
