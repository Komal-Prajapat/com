import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import "react-image-gallery/styles/css/image-gallery.css";

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import "./index.css"
import { BannerList, ImageUrl, getApiCall } from '../../API/baseUrl'
import SliderSkeleton from './Skeleton';
import { useNavigate } from 'react-router-dom';

const Crousal = () => {
	const navigate = useNavigate();
	const [data, setData] = useState([])
	const [pending, setPending] = useState(false)


	const fetchBannerList = async () => {
		setPending(true)
	    try {
	        const result = await getApiCall(BannerList)
	        if (result.data.status) {
	            setData(result.data.data)
				setPending(false)
	        }
	    } catch (error) {
	        console.log("error", error);
	    } finally {
			setPending(false)
	    }
	}

	useEffect(() => {
	    fetchBannerList();
	}, []);

	const settings = {
		arrows: false,
		dots: false,
		dotsClass: "slick-dots slick-thumb",
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		initialSlide: 0,
		autoplay: true,
		speed: 500,
		autoplaySpeed: 2000,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	};

	const handlecategory = (id, name) => {
		navigate(`/product/${id}/${name}`)
	  }

	return (
		<>
		  { pending ? 
		  <div className='categorylist_skeleton'><SliderSkeleton/></div>
			 :
			<div className='crousal'>
				<Slider {...settings}>
					{data.map((banner, index) => {
						return (
							<div className="containerfluid" key={index}>
								{banner.sub_categoryId ?
								 <img src={`${ImageUrl}${banner.banner_image}`} alt='' onClick={()=>banner.sub_categoryId ?  handlecategory(banner.sub_categoryId,banner.category_name) : ""}/>
								 :
								 <img src={`${ImageUrl}${banner.banner_image}`} alt='' onClick={()=>banner.category_id ?  handlecategory(banner.category_id,banner.category_name) : ""} />
								}
								
							</div>
						)
					})}

				</Slider>
				{/* <div className="containerfluid">
				</div> */}
			</div>
			
		 } 
		</>
	)
}

export default Crousal
