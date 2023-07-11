import React from "react";

const WordLine = ({ word }) => {
  let letters;

  if (word === null) {
    letters = new Array(5).fill("");
  } else if (typeof word === "string") {
    letters = word.split("");
  } else letters = word;

  return (
    <div className="word-line">
      {letters.map((item, index) => (
        <div className="letter-box" key={index}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default WordLine;
