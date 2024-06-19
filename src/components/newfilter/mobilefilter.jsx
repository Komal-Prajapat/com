import React, { useEffect, useState } from 'react'
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Slider from "@mui/material/Slider";
import {  Activecategory, getApiCall, mobilefilterApi,  postApiCall } from '../../API/baseUrl';
import "./index.css"


const SortByData = [
	{
		id: 4,
		name: "New Arrival",
		val: "New Arrival",
		selected: false,
		type: "sortby"
	},
	{
		id: 5,
		name: "Low to High",
		val: "Price : Low to High",
		selected: false,
		type: "sortby"
	},
	{

		id: 6,
		name: "High to Low",
		val: "Price : High to Low",
		selected: false,
		type: "sortby"
	},
]
const Price = [
	{

		id: 7,
		name: "All",
		selected: false,
		type: "price"
	},
	{
		id: 8,
		name: "$0.00 - $50.00",
		selected: false,
		type: "price"
	},
	{

		id: 9,
		name: "$50.00 - $100.00",
		selected: false,
		type: "price"
	},
	{
		id: 10,
		name: "$100.00 - $150.00",
		selected: false,
		type: "price"
	},
	{
		id: 11,
		name: "$150.00 - $200.00",
		selected: false,
		type: "price"
	},
	{
		id: 12,
		name: "$200.00+",
		selected: false,
		type: "price"
	},
]
const Color = [
	{
		id: 1300,
		name: "All",
		icon: <CircleIcon sx={{ color: "#fff", height: "15px", width: "15px", marginRight: "2px" }} />,
		selected: false,
		type: "color",

	},
	{
		id: 13,
		name: "Black",
		icon: <CircleIcon sx={{ color: "#222", height: "15px", width: "15px", marginRight: "2px" }} />,
		selected: false,
		type: "color",

	},
	{
		id: 14,
		name: "Blue",
		icon: <CircleIcon sx={{ color: "#4272d7", height: "15px", width: "15px", marginRight: "2px" }} />,
		selected: false,
		type: "color",

	},
	{
		id: 15,
		name: "Grey",
		icon: <CircleIcon sx={{ color: "#b3b3b3", height: "15px", width: "15px", marginRight: "2px" }} />,
		selected: false,
		type: "color",

	},
	{
		id: 16,
		name: "Green",
		icon: <CircleIcon sx={{ color: "#00ad5f", height: "15px", width: "15px", marginRight: "2px" }} />,
		selected: false,
		type: "color",

	},
	{
		id: 17,
		name: "Red",
		icon: <CircleIcon sx={{ color: "#fa4251", height: "15px", width: "15px", marginRight: "2px" }} />,
		selected: false,
		type: "color",

	},
	{
		id: 18,
		name: "White",
		icon: <CircleOutlinedIcon sx={{ color: "#000", height: "15px", width: "15px", marginRight: "2px" }} />,
		selected: false,
		type: "color",

	},
]


const Mobilefilter = ({categoryheading,  showfilter, setShowfilter, sortval, setProductList, setSortval, selectedlist, setSelectedlist, ranfgevaluefilter, setRanfgevaluefilter }) => {
    
    const [categoryListmobile, setCategoryListmobile] = useState([]);
	const [range, setRange] = React.useState([0, 1000]);
	const [SortBy, setSortBy] = useState(SortByData);


	const minDistance = 100


	const handleChange = async (event, newValue, activeThumb) => {
		if (!Array.isArray(newValue)) {
			return;
		}
		let rangeee
		if (activeThumb === 0) {
			rangeee = ([Math.min(newValue[0], range[1] - minDistance), range[1]]);
		} else {
			rangeee = ([range[0], Math.max(newValue[1], range[0] + minDistance)]);
		}
		setRange([...rangeee])
		setRanfgevaluefilter((rangeee.toString()).replace(",", "-"))


		const data = selectedlist.findIndex((item) => item.type === "price")
		const pricevalue = {
			id: 49,
			name: (rangeee.toString()).replace(",", " to "),
			type: "price",
		}

		if (data === -1) {
			setSelectedlist([...selectedlist, pricevalue]);
		} else {
			selectedlist.splice(data, 1)
			setSelectedlist([...selectedlist, pricevalue])
		}
		const apicategory = selectedlist.filter(selector => selector.type === "category")
		try {
			const result = await postApiCall(mobilefilterApi, {
				search: "",
				sort_by: sortval,
				price: (rangeee.toString()).replace(",", "-"),
				category_name: apicategory.map(item => item.category_name).join(", "),
			})
			if (result.data.status) {
				setProductList(result.data.data)
			}
		} catch (error) {
			console.log("error", error);
		} finally {
		}


	};

	const closefilter = () => {
		setShowfilter(!showfilter)
	}

	const handlefilterapply = async (value ,type) => {
		let filtercategoryval
		const apicategory = selectedlist.filter(selector => selector.type === "category")
		const categoryconcat = apicategory.map(item => item.category_name).join(", ")
		if(type === "add"){
			if (categoryconcat.trim() !== '') {
				const updatedvalue = `${categoryconcat},${value}`;
				filtercategoryval = updatedvalue;
			  } else {
				filtercategoryval= value ;
			  }
		}if(type === "remove")
		{
				const updatedcategoryArray = apicategory?.filter(item => item.category_name !== value);
				filtercategoryval = updatedcategoryArray.map(item => item.category_name).join(", ")
			  };
		try {
			const result = await postApiCall(mobilefilterApi, {
				search: "",
				sort_by: sortval,
				price: ranfgevaluefilter,
				category_name: filtercategoryval,
			})
			if (result.data.status) {
				setProductList(result.data.data)
				// setShowfilter(false)
			}
		} catch (error) {
			console.log("error", error);
		} finally {
		}
	}

	const ClearAll = async() => {
		let array
		if (array = SortBy) {
			array.map(item => item.selected = false)
		}
		if (array = Color) {
			array.map(item => item.selected = false)
		}
		if (array = categoryListmobile) {
			array.map(item => item.selected = false)
		}
		setSelectedlist([])
		try {
			const result = await postApiCall(mobilefilterApi, {
				search: "",
				sort_by: "",
				price: "",
				category_name: "",
			})
			if (result.data.status) {
				setProductList(result.data.data)
			}
		} catch (error) {
			console.log("error", error);
		} finally {
		}


	}

	const onsortlistClick = async (value, array, index) => {

		SortBy.map((item) => {
			if (item.id === value.id) {
				item.selected = !item.selected;
			} else {
				item.selected = false
			}
		})
		setSortBy([...SortBy])

		const data = selectedlist.findIndex(item => item.type === value.type)
		if (data === -1) {
			setSelectedlist([...selectedlist, value])
			setSortval(value.name)
		} else {

			if (selectedlist[data].name === value.name) {
				selectedlist.splice(data, 1)
				setSelectedlist([...selectedlist])
				setSortval("")
			} else {
				selectedlist.splice(data, 1)
				setSelectedlist([...selectedlist, value])
				setSortval(value.name)
			}
		}
		const apicategory = selectedlist.filter(selector => selector.type === "category")
		try {
			const result = await postApiCall(mobilefilterApi, {
				search: "",
				sort_by: value.name,
				price: ranfgevaluefilter,
				category_name: apicategory.map(item => item.category_name).join(", "),
			})
			if (result.data.status) {
				setProductList(result.data.data)
			}
		} catch (error) {
			console.log("error", error);
		} finally {
		}

	}

	const onlistClick = async (value, array, index) => {
		categoryListmobile.map((item) => {
			if (item.id === value.id) {
				item.selected = !item.selected;
			}
		})
		setCategoryListmobile([...categoryListmobile])
		setSelectedlist(result => [...result, value]);
		handlefilterapply(value.category_name , "add")
	}

	const onlistafterClick = async (value, array, index) => {

		categoryListmobile.map((item) => {
			if (item.id === value.id) {
				item.selected = !item.selected;
			}
		})
		setCategoryListmobile([...categoryListmobile])

		const categoryremovevalue = selectedlist.filter(item => item.category_name !== value.category_name)
		setSelectedlist([...categoryremovevalue]);
		handlefilterapply(value.category_name , "remove")
	}

	const removelist = (item) => {
		let array
		switch (item.type) {
			case "sortby":
				array = SortBy
				break
			case "price":
				array = Price
				break
			case "category":
				array = Color
				break
			default:
				break;
		}
		let searchIndex = array.findIndex(x => x.id === item.id);
		if (searchIndex === 0) {
			array.map(item => item.selected = false)
		}
		const main = selectedlist.filter((val) => {
			return val.id !== item.id
		})
		item.selected = false
		setSelectedlist([...main])
		handlefilterapply(item.category_name , "remove")
	}

	const checkDisabled = (data) => {
		const disabledData = selectedlist.filter((val) => val.id === data[0].id)
		return disabledData
	}

    
  const fetchcategoryList = async () => {
    try {
        const result = await getApiCall(Activecategory)
        if (result.data.status) {
            const categoryData = result.data.category.map((item) => {
                item.type = "category"
                return item
            })
            setCategoryListmobile(categoryData)
        }
    } catch (error) {
        console.log("error", error);
    } finally {
    }
}

  useEffect(() => {
      fetchcategoryList();
  }, []);




  return (
    <div className="filter_container_fluid"
			>
				<div className="filter-title flex-w flex-sb-m p-b-8">
					<span className="mtext-103 cl2 htext">
						Filter
					</span>

					<div className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart" onClick={closefilter}>
						<i className="zmdi zmdi-close"></i>
					</div>
				</div>

				<div className='selectedlist_display'>
					{selectedlist.map((item, index) => {
						return (
							<div key={index}>
								<li className="">
									<p className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-10 hov-tag1 trans-04 m-r-5 m-b-5 selected_list">
										<p className='filter_title'>{item.name ? item.name : item.category_name}</p>
										<CloseIcon sx={{ fontSize: "14px", cursor: "pointer", color: "#f50606" }} onClick={() => removelist(item)} />
									</p>
								</li>
							</div>
						)
					})}
				</div>
				{selectedlist.length ?
					<div className='selected_btn_prop'>
						<div className='filter_apply_dlt'>
						{/* <button className='clear_filter_btn' onClick={handlefilterapply}>Apply</button> */}
							<button className='clear_filter_btn' onClick={ClearAll}>Clear All</button>
						</div> 

					</div>
						: ""
						}
				<div className="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm filter_container">

					<div className="filter-col1 p-r-15 p-b-10 ">
						<div className="mtext-102 cl2 p-b-15 htext">
							Sort By
						</div>
						<ul>
							{SortBy.map((item, index) => {
								return (
									<div key={index}>
										<li className="p-b-6">
											<button onClick={() => onsortlistClick(item, SortBy, index)} className={`filter-link list-filter stext-106 trans-04 clgray ${item.selected ? "activeFilter" : ""}`}>
												{item.val}
											</button>
										</li>
									</div>
								)
							})}
						</ul>
					</div>
					<div className="filter-col1 p-r-15 p-b-10 ">
						<div className="mtext-102 cl2 p-b-15 htext">
							Category
						</div>
						<ul>
							{categoryListmobile.map((item, index) => {
								return (
									<div key={index}>
										<li className="p-b-6">
											<button onClick={item.selected ? () => onlistafterClick(item, categoryListmobile, index) : () => onlistClick(item, categoryListmobile, index)} className={`filter-link stext-106 trans-04 list-filter clgray ${item.selected ? "activeFilter" : ""}`}>
												{item.category_name}
											</button>
										</li>
									</div>
								)
							})}
						</ul>
					</div>


					<div className="filter-col2 p-r-15 p-b-10">
						<div className="mtext-102 cl2 p-b-15 htext">
							Price
						</div>

						<div className='price_slider'>
						<Slider
								getAriaLabel={() => 'Minimum distance'}
								value={range}
								onChange={handleChange}
								valueLabelDisplay="auto"
								step={250}
								min={0}
								max={10000}
								// getAriaValueText={valuetext}
								disableSwap
							/>
						</div>
						<div className='input_container_filter'>
							<div className='price_lable_input'>
								<p>From</p>
								<div className='price'>{range[0]}</div>
							</div>

							<div className='price_lable_input'>
								<p style={{ marginLeft: "10px" }}>To</p>
								<div className='price'>{range[1]}</div>
							</div>

						</div>
					</div>
				</div>


			</div>
  )
}

export default Mobilefilter