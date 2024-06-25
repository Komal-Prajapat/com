import React, { useEffect, useState } from 'react'
import "./index.css"
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Slider from "@mui/material/Slider";
import { Activecategory, filterApi, getApiCall, postApiCall } from '../../API/baseUrl';

const SortByData = [
	{
		id: 4,
		name: "Newness",
		selected: false,
		type: "sortby"
	},
	{
		id: 5,
		name: "Low to High",
		selected: false,
		type: "sortby"
	},
	{

		id: 6,
		name: "High to Low",
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


const Filter = ({ setShowfilter, setProductList, shownav, showfilter, showtext }) => {

	const [selectedlist, setSelectedlist] = useState([])
	const [close, setClose] = useState(false)
	const [range, setRange] = React.useState([0, 50]);
	const [active, setActive] = React.useState(false);
	const [categoryList, setCategoryList] = useState([]);
	const [SortBy, setSortBy] = useState(SortByData);
	const [SortByfiltervalue, setSortByfiltervalue] = useState("");
	const [ranfgevaluefilter, setRanfgevaluefilter] = useState("");
	const [categoryfiltervalue, setCategoryfiltervalue] = useState("");
	const [categoryval, setCategoryval] = useState([]);

	const minDistance = 10
	const handleChange = (event, newValue, activeThumb) => {
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


	};
	const closefilter = () => {
		setClose(true)
		setShowfilter(false)
	}

	const handlefilterapply = async () => {
		const apicategory = selectedlist.filter(selector => selector.type === "category")
		setCategoryval(apicategory.map(item => item.category_name))
			setCategoryfiltervalue(categoryval.join(", "))
		try {
			const result = await postApiCall(filterApi, {
				limit: "",
				offset: "",
				search: "",
				sort_by: SortByfiltervalue,
				price: ranfgevaluefilter,
				category_name: categoryfiltervalue,
			})

			if (result.data.status) {
				setProductList(result.data.data)
				setClose(true)
				setShowfilter(false)
			}
		} catch (error) {
			console.log("error", error);
		} finally {
		}
	}

	const fetchcategoryList = async () => {
		try {
			const result = await getApiCall(Activecategory)
			if (result.data.status) {
				const categoryData = result.data.category.map((item) => {
					item.type = "category"
					return item
				})
				setCategoryList(categoryData)
			}
		} catch (error) {
			console.log("error", error);
		} finally {
		}
	}
	useEffect(() => {
		fetchcategoryList();
	}, []);


	const ClearAll = () => {
		let array
		if (array = SortBy) {
			array.map(item => item.selected = false)
		}
		if (array = Color) {
			array.map(item => item.selected = false)
		}
		setSelectedlist([])
	}

	const onsortlistClick = (value, array, index) => {

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
			setSortByfiltervalue(value.name)
		} else {
		
			if (selectedlist[data].name === value.name) {
				selectedlist.splice(data, 1)
				setSelectedlist([...selectedlist])
				setSortByfiltervalue("")
			} else {
				selectedlist.splice(data, 1)
				setSelectedlist([...selectedlist, value])
				setSortByfiltervalue(value.name)
			}
		}

	}

	const onlistClick = (value, array, index) => {
		categoryList.map((item) => {
			if (item.id === value.id) {
				item.selected = !item.selected;
			} 
		})
		setCategoryList([...categoryList])
		setSelectedlist(result => [...result, value]);
	}

	const onlistafterClick = (value, array, index) => {

		categoryList.map((item) => {
			if (item.id === value.id) {
				item.selected = !item.selected;
			} 
		})
		setCategoryList([...categoryList])

		const categoryremovevalue = selectedlist.filter(item => item.category_name !== value.category_name)
		setSelectedlist([...categoryremovevalue]);

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
	}

	const checkDisabled = (data) => {
		const disabledData = selectedlist.filter((val) => val.id === data[0].id)
		return disabledData
	}
	return (
		<>
			<div className="desktop_filter_container_fluid">
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
				<div>
					{selectedlist.length ?
						<div className='filter_apply_dlt'><button className='clear_filter_btn' onClick={handlefilterapply}>Apply</button>
							<button className='clear_filter_btn' onClick={ClearAll}>Clear All</button>
						</div> : ""}

				</div>

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
											<button onClick={() => onsortlistClick(item, SortBy, index)} className={`filter-link stext-106 trans-04 clgray ${item.selected ? "activeFilter" : ""}`}>
												{item.name}
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
							{categoryList.map((item, index) => {
								return (
									<div key={index}>
										<li className="p-b-6">
											<button onClick={ item.selected ?  () =>  onlistafterClick (item, categoryList, index) : () => onlistClick(item, categoryList, index)} className={`filter-link stext-106 trans-04 clgray ${item.selected ? "activeFilter" : ""}`}>
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
							{/* <Slider value={range} onChange={handleChanges} valueLabelDisplay="auto" /> */}
							<Slider
								getAriaLabel={() => 'Minimum distance'}
								value={range}
								onChange={handleChange}
								valueLabelDisplay="auto"
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


			<div className={`filter_container_fluid ${shownav ? "hidefilter" : ""} `}
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
						<div className='filter_apply_dlt'><button className='clear_filter_btn' onClick={handlefilterapply}>Apply</button>
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
											<button onClick={() => onsortlistClick(item, SortBy, index)} className={`filter-link stext-106 trans-04 clgray ${item.selected ? "activeFilter" : ""}`}>
												{item.name}
											</button>
										</li>
									</div>
								)
							})}
						</ul>
					</div>
					<div className="filter-col1 p-r-15 p-b-10 ">
						<h3 className="text productheading">
						Product Categories
						</h3>
						<ul>
							{categoryList.map((item, index) => {
								return (
									<div key={index}>
										<li className="p-b-6">
											<button onClick={ item.selected ?  () =>  onlistafterClick (item, categoryList, index) : () => onlistClick(item, categoryList, index)} className={`filter-link stext-106 trans-04 clgray ${item.selected ? "activeFilter" : ""}`}>
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

		</>

	)
}

export default Filter;