import { useEffect, useState } from "react";
import WordLine from "./WordLine";

const ROWS_NUMBER = 6;
const WORD_LENGTH = 5;

function App() {
  const [secretWord, setSecretWord] = useState("PRICE");
  const [chosenWords, setChosenWords] = useState(Array(ROWS_NUMBER).fill(null));
  const [currentWord, setCurrentWord] = useState(Array(WORD_LENGTH).fill(null));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  const regex = /^[A-Za-z]+$/;

  useEffect(() => {
    const handleKeyPress = (e) => {
      // checks if only letters are typed
      if (!e.key.match(regex) || e.key.length !== 1) return;

      const updatedCurrentWord = currentWord.map((item, index) => {
        if (index !== currentLetterIndex) return item;
        else return e.key;
      });

      setCurrentWord((prev) => {
        if (currentLetterIndex === WORD_LENGTH - 1) {
          setCurrentWordIndex(currentWordIndex + 1);
          setChosenWords((prevWord) =>
            prevWord.map((item, index) => {
              if (index !== currentWordIndex) return item;
              else return updatedCurrentWord.join("");
            })
          );
          return prev.map((el) => null);
        } else return updatedCurrentWord;
      });

      setCurrentLetterIndex((prev) => {
        if (prev === WORD_LENGTH - 1) return 0;
        else return prev + 1;
      });
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentWord]);

  return (
    <main className="site-wrapper">
      <h1>Wordle</h1>
      <div className="board">
        {chosenWords.map((item, index) => (
          <WordLine
            key={index}
            word={currentWordIndex === index ? currentWord : item}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
