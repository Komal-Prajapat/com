import React, { useState } from "react";

const RemoveTag = ({ ParserText, style }) => {
  const [showFullText, setShowFullText] = useState(false);

  // Function to toggle showing full text
  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  // Logic to truncate text to first 100 words
  const truncateText = (text) => {
    const words = text.split(" ");
    if (words.length > 100) {
      return words.slice(0, 100).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className="descriptionp">
      <p style={style}>
        {showFullText ? ParserText : truncateText(ParserText)}
        {!showFullText && ParserText.split(" ").length > 100 && (
          <span
            style={{ color: " var(--primary-color)", cursor: "pointer" }}
            onClick={toggleShowFullText}
          >
            {" "}
            Read more
          </span>
        )}
      </p>
    </div>
  );
};

export default RemoveTag;
