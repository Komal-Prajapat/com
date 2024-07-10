import React from 'react'
import { FaArrowTurnUp } from "react-icons/fa6";
import './index.css'

const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

const BacktoHome = () => {
  return (
    <div>
            <div className="backToHome" onClick={scrollToTop} 
            style={{
              cursor:"pointer"
            }}>
      <FaArrowTurnUp />

      </div>
    </div>
  )
}

export default BacktoHome
