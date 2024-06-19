import React, { useState } from 'react'
import Filter from '../filter'
import CloseIcon from '@mui/icons-material/Close';
import "./index.css";
import SearchBar from '../searchBar';

const Navbar = ({ productList, setRenderproduct, allProduct }) => {

	const [showSearch, setShowSearch] = useState(false)
	const [showfilter, setShowfilter] = useState(false)
	const [active, setActive] = useState(null);


	const handleSearch = () => {
		setShowSearch(!showSearch)
		setShowfilter(false)
	}

	const handleFilter = () => {
		setShowfilter(!showfilter)
	}

	const handleCategoryChange = (item) => {
		setActive(item)
		const categoryItems = productList.filter((product) => item.category === product.category);
		if (item.category === "all") {
			setRenderproduct(allProduct)
		} else {
			setRenderproduct(categoryItems)
		}
	}

	return (
		<>
			<div className="flex-w flex-sb-m p-b-10">
				
				{/* <div className="flex-w flex-l-m filter-tope-group m-tb-10">
					{navitemlist.map((item) => {
						return (
							<>
								<button className={`stext-106  trans-04 m-r-32 m-tb-5 nav_btn_hove ${active == item && "active"}`} data-filter="*" onClick={() => handleCategoryChange(item)}>
									{item.name}
								</button>
							</>
						)
					})}

				</div> */}

				<div className="flex-w flex-c-m m-tb-10">
					<div className="flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 js-show-filter"
						onClick={handleFilter}>
						{showfilter ? <CloseIcon sx={{ fontSize: "14px", marginRight: "2px", color: "#000" }} /> :
							<i className="icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list"></i>
						}
						Filter
					</div>
				</div>

				{/* <!-- Search product --> */}
				{showSearch ? <SearchBar/> : ""}

				{showfilter ? <Filter setShowfilter={setShowfilter} showfilter={showfilter}/> :""}

				
			</div>



		</>
	)
}

export default Navbar