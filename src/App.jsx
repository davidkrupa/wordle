import { useState } from "react";
// import "./App.css";
import WordLine from "./WordLine";

function App() {
  return (
    <main className="site-wrapper">
      <h1>Wordle</h1>
      <div className="board">
        <WordLine />
        <WordLine />
        <WordLine />
        <WordLine />
        <WordLine />
      </div>
    </main>
  );
}

export default App;
