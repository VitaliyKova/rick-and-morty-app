import React from "react";
import CharacterList from "./components/CharacterList";
import "./styles/App.css";

function App() {
  return (
    <div className="app">
      <header>
        <h1 className="heading">Rick and Morty Characters</h1>
      </header>
      <section className="character_cards">
        <div className="conteiner">
          <CharacterList />
        </div>
      </section>
    </div>
  );
}

export default App;
