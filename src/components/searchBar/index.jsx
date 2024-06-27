import React from 'react';
import "./index.css"
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';import { RxCross2 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";


const SearchBar = ({handleOnSearchChange, setSearch , search, border,onBlur}) => {
    const navigate = useNavigate();
    const clearsearch = () => {
        setSearch('')
    }
    const goBack = () => {
        navigate("/")
    }
    return (
        <>
            <div className={`${border ? "border" : "search_container"} `}
            style={{
                height:'70vh',
                background:'white',
                width:'100%'
            }}>
            <div className="header__search-header">
            {border ? "" : <RxCross2  sx={{ marginRight: "5px", marginLeft: "15px" }} onClick={goBack} className='searchcross'/>}
            <h3 className='searchheaing'>Search</h3>
            </div>
                <div className="search_input_container d-flex">

                    <input className="mtext-107 cl2 searchinput" name="search-product" placeholder="Search for products..."
                        required="" 
                        onChange={(e) => handleOnSearchChange(e)}
                        onBlur={onBlur}
                        type="search"
                        value={search}
                        autoFocus={true} />
                        <CiSearch className='searchicon_searchPage' 
                         style={{
                            marginLeft:'-20px' ,
                            color:'black'
                         }}
                        />
                </div>
                {search ?
                    <CloseIcon sx={{ color: "var(--colorblack)", marginRight: "15px", fontSize: "18px" }} onClick={clearsearch} />
                    : <button className="flex-c-m fs-16 cl2 hov-cl1 trans-04 search_btn_icon">
                    
                    </button>
                }
            </div>
        </>
    )
}

export default SearchBar;