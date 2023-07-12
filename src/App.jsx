import { useEffect, useState } from "react";
import WordLine from "./WordLine";

const ROWS_NUMBER = 6;
const WORD_LENGTH = 5;

function App() {
  const [secretWord, setSecretWord] = useState("price");
  const [chosenWords, setChosenWords] = useState(Array(ROWS_NUMBER).fill(null));
  const [currentWord, setCurrentWord] = useState(Array(WORD_LENGTH).fill(null));
  const [nextWordIndex, setNextWordIndex] = useState(0);
  const [nextLetterIndex, setNextLetterIndex] = useState(0);
  const [isWordApproved, setIsWordApproved] = useState(false);

  const isWon = chosenWords.includes(secretWord);
  const regex = /^[A-Za-z]+$/;

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isWon) return;

      if (chosenWords[ROWS_NUMBER - 1] !== null) return; // when last word in the board approved prevent other actions

      if (e.key === "Enter" && currentWord[WORD_LENGTH - 1] !== null) {
        if (isWordApproved) return; // prevent updating states when Enter clicked multiple times
        setIsWordApproved(true);
        setNextLetterIndex(0);
        setNextWordIndex(nextWordIndex + 1);
        setCurrentWord((prev) => prev.map(() => null));
        setChosenWords((prev) =>
          prev.map((item, index) => {
            if (nextWordIndex !== index) return item;
            else return currentWord.join("");
          })
        );
        return;
      }

      // update state to default value when new word is typed
      if (isWordApproved) {
        setIsWordApproved(false);
      }

      if (e.key === "Backspace" && !isWordApproved) {
        if (nextLetterIndex === 0) return; // prevent updating states when Backspace clicked and line is empty
        setCurrentWord((prev) => {
          setNextLetterIndex(nextLetterIndex - 1);

          return prev.map((item, index) => {
            if (nextLetterIndex - 1 === index) return null;
            else return item;
          });
        });
        return;
      }

      // when there is letter in the last place in the line prevent other actions
      if (currentWord[WORD_LENGTH - 1] !== null && !isWordApproved) return;

      // checks if only letters are typed
      if (!e.key.match(regex) || e.key.length !== 1) return;

      setCurrentWord((prev) =>
        prev.map((item, index) => {
          if (index !== nextLetterIndex) return item;
          else return e.key.toLowerCase();
        })
      );

      setNextLetterIndex((prev) => {
        if (prev !== WORD_LENGTH) return prev + 1;
        else return prev;
      });
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentWord, isWordApproved, nextLetterIndex]);

  const handleClick = () => {
    setChosenWords((prev) => prev.map(() => null));
    setCurrentWord((prev) => prev.map(() => null));
    setNextWordIndex(0);
    setNextLetterIndex(0);
    setIsWordApproved(false);
  };

  return (
    <main className="site-wrapper">
      <h1>{!isWon ? "Wordle" : "You won!"}</h1>
      <div className="board">
        {chosenWords.map((item, index) => (
          <WordLine
            key={index}
            word={nextWordIndex === index ? currentWord : item}
            secretWord={secretWord}
            isCurrent={index === nextWordIndex}
          />
        ))}
      </div>
      {(chosenWords[ROWS_NUMBER - 1] !== null && (
        <button onClick={() => handleClick()}>Play Again</button>
      )) ||
        (isWon && <button onClick={() => handleClick()}>Play Again</button>)}
    </main>
  );
}

export default App;
