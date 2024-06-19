import React from 'react'
import { AboutHeading } from '../../components/heading'
import serviceicon2 from "../../Assect/bethemestore2-about-pic3.svg";
import serviceicon3 from "../../Assect/bethemestore2-about-pic11.svg";
import serviceicon4 from "../../Assect/bethemestore2-about-pic4.svg";
import iconabout from "../../Assect/bethemestore2-about-pic5.png";
import TopPageImage from "../../components/toppageimage";
import "./index.css"
import BacktoHome from '../../components/backtohome';

const About = () => {
	return (
		<>
	
		
		<TopPageImage pagename="About Us"></TopPageImage>
			{/* <!-- Content page --> */}
			<section className="bg0  p-b-20 m-t-50">
				<div className="container">
					<div className="row p-b-50 text-align">
						<div className="col-md-7 col-lg-8">
							<div className="p-t-7 p-r-85 p-r-15-lg p-r-0-md" >
								<h3 className="mtext-111 cl2 p-b-16">
									Our Story
								</h3>

								<p className="font-20 cl6 p-b-26">

									Treasure Box where every item tells a unique story of joy and surprise.</p>

								<p className="font-20 cl6 p-b-26">
									From charming trinkets to delightful treasures, our gift shop's treasure box is a trove of happiness for every occasion.</p>

								<p className="font-20 cl6 p-b-26">
									At our treasure box gift shop, each carefully curated item is a small piece of joy, waiting to make someone's day special.</p>
							</div>
						</div>

						<div className="col-11 col-md-5 col-lg-4 m-lr-auto" >
						
								
									<img src="images/about-01.jpg" alt="IMG" style={{width:'200px',height:'200px'}} className='aboutimg'/>
							
						</div>
					</div>

					<div className='about_explore'>
						<h2>Explore the Enchantment in our Treasure Box Gift Shop.</h2>
					</div>

					<div className='p-b-20 p-t-20'>
						<div className='about_boxes'>

							<div className='about_boxes_inside'>
								<div className='left_service_icon'>
									<img src={serviceicon2} alt="IMG-LOGO" />
								</div>
								<h3 className='about_box_title'>Mobile Shopping</h3>
								<p className=''>"Shop on the go with ease – your mobile gateway to a treasure trove of delightful finds awaits!</p>
							</div>

							<div className='about_boxes_inside'>
								<div className='left_service_icon'>
									<img src={serviceicon3} alt="IMG-LOGO" />
								</div>
								<h3 className='about_box_title'>Secure Payments</h3>
								<p className=''>Experience worry-free shopping with our secure payment options – your peace of mind is our top priority.</p>
							</div>


							<div className='about_boxes_inside'>
								<div className='left_service_icon'>
									<img src={serviceicon4} alt="IMG-LOGO" />
								</div>
								<h3 className='about_box_title'>Present Packaging</h3>
								<p className=''>Elevate your gifts with our exquisite packaging – where every present becomes a work of art.</p>
							</div>

						</div>

					</div>

					<div className='about_shop'>
						<h2>Our shop is top quality and have greatest products on all over the world </h2>
					</div>

					<div className="row p-t-20">
						<div className="order-md-2 col-md-7 col-lg-8 p-b-30  p-t-30">
							<div className="p-t-7 p-l-85 p-l-15-lg p-l-0-md">
								<h3 className='about_shop_heading'><div></div>Varied Products</h3>
								<p className='p-t-10'>Dive into a curated collection tailored to your preferences. From elegant trinkets to timeless treasures, our variety of products ensures there's something uniquely perfect for every style and taste. Elevate your experience and discover the ideal piece that speaks to you.</p>
							</div>

							<div className="p-t-25 p-l-85 p-l-15-lg p-l-0-md">
								<h3 className='about_shop_heading'><div></div>Better Support</h3>
								<p className='p-t-10'>Experience customer support that goes beyond expectations. Our dedicated team is committed to providing personalized assistance, ensuring you receive the best care and guidance throughout your shopping journey. Your satisfaction is our priority, and we're here to make your experience seamless and enjoyable.</p>
							</div>
						</div>

						<div className="order-md-1 col-11 col-md-5 col-lg-4 m-lr-auto p-b-30 p-t-30">
							<div className="how-bor2">
								<div className="hov-img0 ">
									<img src={iconabout} alt="IMG" />
								</div>
							</div>
						</div>
					</div>

				</div>
			</section>

			{/* <BacktoHome></BacktoHome> */}
		</>
	)
}

export default About