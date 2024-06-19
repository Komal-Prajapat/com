import React from 'react';
import "./index.css"
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

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
            <div className={`${border ? "border" : "search_container"} `}>
                <div className="search_input_container">
                   {border ? "" : <ArrowBackIcon sx={{ marginRight: "5px", marginLeft: "15px" }} onClick={goBack} />}

                    <input className="mtext-107 cl2 searchinput" name="search-product" placeholder="Search"
                        required="" 
                        onChange={(e) => handleOnSearchChange(e)}
                        onBlur={onBlur}
                        type="search"
                        value={search}
                        autoFocus={true} />
                </div>
                {search ?
                    <CloseIcon sx={{ color: "var(--colorblack)", marginRight: "15px", fontSize: "18px" }} onClick={clearsearch} />
                    : <button className="flex-c-m fs-16 cl2 hov-cl1 trans-04 search_btn_icon">
                        <i className="zmdi zmdi-search"></i>
                    </button>
                }
            </div>
        </>
    )
}

export default SearchBar;