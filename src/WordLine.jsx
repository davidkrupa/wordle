import React from "react";

const WordLine = ({ word, secretWord, isCurrent }) => {
  let letters;

  if (word === null) {
    letters = new Array(5).fill(""); // when use chosenWords and element is null
  } else if (typeof word === "string") {
    letters = word.split(""); // when use chosenWords and element is string
  } else letters = word; // when use currentWord array which contains letters

  const boxStyle = letters.map((item, index) => {
    if (item === "") return "";
    if (item === secretWord[index]) return "correct";
    if (secretWord.includes(item)) return "close";
    else return "incorrect";
  });

  return (
    <div className="word-line">
      {letters.map((item, index) => (
        <div
          className={`letter-box ${!isCurrent ? boxStyle[index] : ""}`}
          key={index}
        >
          {item === null ? item : item.toUpperCase()}
        </div>
      ))}
    </div>
  );
};

export default WordLine;
