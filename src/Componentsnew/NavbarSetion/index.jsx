import React from 'react'
import { Link } from 'react-router-dom'

const index = () => {
  return (
    <div>
      <div className="headersectin desktop">
      <li className="col-lg-4">
          {" "}
          <Link to="/" className="web_logo_container_link ">
            <img
              src=""
              alt="IMG-LOGO"
        
              style={{ width: "200px" }}
            />
          </Link>
        </li>
      </div>
    </div>
  )
}

export default index
