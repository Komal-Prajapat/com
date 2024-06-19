import React from 'react'
import "./index.scss";
import "./index.css";
import data from './data';
import FAQItem from './faqitems';
// import imageForPhone from "../../Assect/illustration-woman-online-mobile.svg";

const Help = () => {

  const handelClick = (id) => {
    const details = document.getElementsByTagName("details");
    for (let i = 0; i < details.length; i++) {
      let element = details[i];
      let Elementid = Number(element.getAttribute("data-id"));

      if (Elementid !== id && element.hasAttribute("open")) {
        element.removeAttribute("open");
      }
    }
  };

  return (
    <>
    <div className='faq_wrapper_container_fluid container'>
   

       <div className="faq_container_second_block">
          <h1>FAQ</h1>
             <div className="">
                 {data.map((item, index) => (
                    <FAQItem
                      key={index}
                      id={index}
                      handelClick={handelClick}
                      question={item.question}
                      answer={item.answer}
                    />
                  ))}
              </div>

              <h6 style={{marginTop:'10px'}}>These FAQs cover common inquiries, but if you have any additional questions or concerns, please don't hesitate to reach out to us. We're here to help!</h6>
        </div>
    </div>
   
  </>
  )
}

export default Help;
