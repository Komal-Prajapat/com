import React, { memo } from "react";
import "./faqitems.scss";

const FAQItem = ({ question, answer, id, handelClick }) => {
  const handelevent = (e) => {
    handelClick(id);
  };
  return (
    <div className="faqContainer">
      <details onClick={handelevent} data-id={id}>
        <summary>
          <span className="question"> {question}</span>
          <span className="icon">
            <svg
              width="10"
              height="7"
              xmlns="http://www.w3.org/2000/svg"
              color="1px solid  var(--primary-color)"
            >
              <path
                d="M1 .799l4 4 4-4"
                stroke="#F47B56"
                strokeWidth="2"
                fill="none"
                fillRule="evenodd"
              />
            </svg>
          </span>
        </summary>
        <p className="answer">{answer}</p>
      </details>
    </div>
  );
};

export default memo(FAQItem);
