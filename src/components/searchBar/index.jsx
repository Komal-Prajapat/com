import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { CiSearch } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
const SearchBar = ({ handleOnSearchChange, setSearch, search, border, onBlur }) => {

    const clearSearch = () => {
        setSearch('');
    };

  
        const [isVisible, setIsVisible] = useState(true);
      
        const handleClick = () => {
          setIsVisible(false); 
        };
    
    return (
       <>
         {isVisible&&(
        <div className={`${border ? 'border' : 'search_container'}`} style={{
            background: 'white',
            width: '100%',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            padding: '20px',
            boxSizing: 'border-box',
        }}>
            <div className="header__search-header" style={{ textAlign: 'center' }}
            
            >
            {isVisible && (
                <RxCross2 className='searchcross' style={{ marginRight: '5px', marginLeft: '15px', fontSize: '20px', cursor: 'pointer' }} onClick={handleClick} />
      )}
                <h3 className='searchheading' style={{ fontFamily: 'Poppins, sans-serif', color: '#201f1f', fontWeight: 500, lineHeight: 1.2, marginTop: '10px' }}>Search</h3>
            </div>
            <div className="search_input_container" style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                <CiSearch className='searchicon_searchPage' style={{ marginLeft: '-20px', color: 'black', fontSize: '20px' }} />
                <input
                    className="searchinput"
                    name="search-product"
                    placeholder="Search for products..."
                    value={search}
                    onChange={(e) => handleOnSearchChange(e)}
                    onBlur={onBlur}
                    type="search"
                    autoFocus={true}
                    style={{
                        height: '40px',
                        width: '100%',
                        maxWidth: '400px',
                        border: 'none',
                        borderBottom: '1px solid #ebebeb',
                        padding: '0 15px',
                        marginLeft: '10px',
                        boxSizing: 'border-box',
                    }}
                />
                {search && <CloseIcon onClick={clearSearch} style={{ cursor: 'pointer', marginLeft: '10px', fontSize: '20px', color: '#bc8246' }} />}
            </div>
        </div>
         )}
       </>
    );
};

export default SearchBar;
