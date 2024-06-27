import React, { useState } from 'react'
import SearchBar from '../../components/searchBar'
import "./index.css"
import { ImageUrl, postApiCall, searchhomeapi } from '../../API/baseUrl';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState([]);
  const [sortByColumnName, setSortByColumnName] = useState('');

  const handleOnSearchChange = async (e) => {
    setSearch(e.target.value)
    try {
      const { data } = await postApiCall(searchhomeapi, {
        limit: limit,
        offset: offset,
        search: e.target.value,
        column_name: sortByColumnName,
        sort_by: sortBy === "asc" ? "DESC" : "ASC",
      })
      if (data.status) {
        setData(data.data)
      }
    } catch (error) {
      console.log("error", error);
    } finally {
    }
  }

  const handleListClick = (id, name) => {
    navigate(`/productDetails/${id}/${name}`)
  }


  return (
    <div className='search_container_fluid'>
      <SearchBar {...{ handleOnSearchChange, setSearch, search }} />
      {search ?
        <div className='searchList_container'>
          {data.map((item) => {
            return (
              <>
                <div className="search_data_img_name">
                  <img onClick={() => handleListClick(item.id, item?.productName)} className='' src={`${ImageUrl}/${item.files ? item.files : item.file}`} alt="" height={40} width={40} />
                  <p className='product_list' onClick={() => handleListClick(item.id, item?.productName)} >{item?.productName}</p>
                </div>
                
              </>
            )
          })}
        </div>

        : ""}

    </div>
  )
}

export default SearchPage