import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Footer from "../../components/footer/index"

import "./index.css"
import UseScrollToTop from '../../components/topOpen';
import HeaderSection from '../../Componentsnew/headsection';
import NewFilter from '../../components/footer/filter';
import Newhome from '../newhome';
import { useLocation} from 'react-router-dom';
import BacktoHome from '../../components/backtohome';

const Main = ({reload , setReload , catval, setCatval}) => {
  const {pathname} = useLocation();
  const [fontval, setFontval] = useState("");

  return (
    <>
    <UseScrollToTop/>
    {/* <div style={{fontFamily: fontval? fontval : "'Lato', sans-serif"}}> */}
    <HeaderSection {...{reload, setReload,fontval, setFontval,catval, setCatval}}/>
      <div className="section_body ">
        {pathname === '/' ?  <Newhome {...{ reload, setReload ,catval, setCatval}} /> :  <Outlet />}
      
      <Footer {...{catval, setCatval}}/>
      </div>
<BacktoHome></BacktoHome>





      {/* </div> */}
    </>
  )
}

export default Main;