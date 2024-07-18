import React, { useEffect, useState } from 'react'
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Slider from "@mui/material/Slider";
import {  filterApi, postApiCall } from '../../API/baseUrl';
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


const Newfilter = ({name,categoryvalueforapi,categoryList,categoryheading, setCategoryList, showfilter, setShowfilter ,setProductList, setSelectedlist, selectedlist, setSortval, sortval, setRanfgevaluefilter, ranfgevaluefilter }) => {


	const [range, setRange] = React.useState([0, 1000]);
	const [SortBy, setSortBy] = useState(SortByData);
	const [namevalue, setNamevalue] = useState(name);
	const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);

	const minDistance = 100
	useEffect(() => {
        setMinPrice(range[0]);
        setMaxPrice(range[1]);
    }, [range]);


	const handleChange = async (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        let rangeee;
        if (activeThumb === 0) {
            rangeee = [Math.min(newValue[0], range[1] - minDistance), range[1]];
        } else {
            rangeee = [range[0], Math.max(newValue[1], range[0] + minDistance)];
        }
        setRange([...rangeee]);
        updatePriceFilter(rangeee);
    };


  const handleMinPriceChange = (e) => {
        const value = Math.max(0, Math.min(e.target.value, maxPrice - minDistance));
        setMinPrice(value);
        setRange([value, range[1]]);
        updatePriceFilter([value, range[1]]);
    };

    const handleMaxPriceChange = (e) => {
        const value = Math.min(10000, Math.max(e.target.value, minPrice + minDistance));
        setMaxPrice(value);
        setRange([range[0], value]);
        updatePriceFilter([range[0], value]);
    };




	const updatePriceFilter = async (rangeee) => {
        setRanfgevaluefilter(rangeee.join("-"));

        const data = selectedlist.findIndex((item) => item.type === "price");
        const pricevalue = {
            id: 49,
            name: rangeee.join(" to "),
            type: "price",
        };

        if (data === -1) {
            setSelectedlist([...selectedlist, pricevalue]);
        } else {
            selectedlist.splice(data, 1);
            setSelectedlist([...selectedlist, pricevalue]);
        }
        const apicategory = selectedlist.filter(selector => selector.type === "category");
        try {
            const result = await postApiCall(filterApi, {
                search: "",
                sort_by: sortval,
                price: rangeee.join("-"),
                category_name: apicategory.length ? apicategory.map(item => item.category_name).join(", ") : categoryvalueforapi,
            });
            if (result.data.status) {
                setProductList(result.data.data);
            }
        } catch (error) {
            console.log("error", error);
        }
    };
	
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
			const result = await postApiCall(filterApi, {
				search: "",
				sort_by: sortval,
				price: ranfgevaluefilter,
				category_name: filtercategoryval ? filtercategoryval : categoryvalueforapi,
			})
			if (result.data.status) {
				setProductList(result.data.data)
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
		if (array = categoryList) {
			array.map(item => item.selected = false)
		}
		setSelectedlist([])
		setNamevalue("")
		try {
			const result = await postApiCall(filterApi, {
				search: "",
				sort_by: "",
				price: "",
				category_name: categoryvalueforapi,
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
		categoryList.map((item) => {
			if (item.id === value.id) {
				item.selected = !item.selected;
			}
		})
		setCategoryList([...categoryList])
		setSelectedlist(result => [...result, value]);
		handlefilterapply(value.category_name , "add")
	}

	const onlistafterClick = async (value, array, index) => {

		categoryList.map((item) => {
			if (item.id === value.id) {
				item.selected = !item.selected;
			}
		})
		setCategoryList([...categoryList])

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
		setNamevalue("")
		handlefilterapply(item.category_name , "remove")
	}

	return (
		<div>
		<div className="new_filter_container">
			{selectedlist.length ?
				<div className='selected_btn_prop'>
					<div className='filter_apply_dlt'>
						{/* <button className='clear_filter_btn' onClick={handlefilterapply}>Apply</button> */}
						{/* <button className='clear_filter_btn' onClick={ClearAll}>Clear All</button> */}
					</div>
				</div>
				: ""
			}
			<div className="">
				<div className="filter-col1 p-r-15 p-b-10 ">
					<div>
						<h3 className="productheading ">{categoryheading ? "Product Categories" : "Sub Category"}</h3>
					</div>
					<ul className='productList'>
						{categoryList.map((item, index) => {
							return (
								<div key={index}>
									<li className="p-b-6">
										{item.category_name === namevalue ?
											<button onClick={item.selected ? () => onlistafterClick(item, categoryList, index) : () => onlistClick(item, categoryList, index)} className="filter-link stext-106 trans-04 list-filter clgray activeFilter">
												{item.category_name}
											</button>
											:
											<button onClick={item.selected ? () => onlistafterClick(item, categoryList, index) : () => onlistClick(item, categoryList, index)} className={`filter-link stext-106 trans-04 list-filter clgray ${item.selected ? "activeFilter" : ""}`}>
												{item.category_name}
											</button>
										}
									</li>
								</div>
							)
						})}
					</ul>
				</div>

				<div className="filter-col2 p-r-15 p-b-10">
					<div className="priceheading">
						Filter By Price
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
							disableSwap
						/>
					</div>
					<div className='input_container_filter mt-3'>
						<div className='price_lable_input'
						style={{
							
						}}>
							<p>From</p>
							<input type="number" value={minPrice} onChange={handleMinPriceChange} className='price_input mx-2' 
							style={{
							
							width:"80px",
							border:"1px solid var(--secondary-color) !important",
							paddingLeft:"3px"
						}}	
							/>
						</div>

						<div className='price_lable_input'
						style={{
							
						}}>
							<p style={{ marginLeft: "10px" }}>To</p>
							<input type="number" value={maxPrice} onChange={handleMaxPriceChange} className='price_input mx-2' 
							style={{
							
							width:"80px",
							border:"1px solid var(--secondary-color) !important",
							paddingLeft:"3px"
						}}		
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	)
}

export default Newfilter