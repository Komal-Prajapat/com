import React, { useState } from 'react'
import headerlogo from "../../Assect/logo.png";
import "./index.css"
import { Link } from 'react-router-dom';
import Login from '../../Pages/login/login';

const Sidebar = ({ onClick, setShowDesktopMenu }) => {

	const user_id = localStorage.getItem("user_id")
	const [showloginpopup, setShowloginpopup] = useState(false)

	const closemenu = () => {
		setShowDesktopMenu(false)
	}

	const handleprofilePage = () => {
		setShowloginpopup(!showloginpopup)
	}
	
	return (
		<>
			<aside className="wrap-sidebar ">
				<div className="s-full"></div>

				<div className="sidebar flex-col-l p-t-22 p-b-25">
					<div className="flex-r w-full p-b-30 p-r-27">
						<div className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 " onClick={onClick}>
							<i className="zmdi zmdi-close" ></i>
						</div>
					</div>

					<div className="flex-w w-full p-lr-65 ">
					<div className="w-full">
					<span className="mtext-101 cl5 m-b-30">
					<img src={headerlogo} alt="IMG-LOGO" height={40} width={150}/>
					</span>
				</div>
						<ul className="sidebar-link w-full">
							<li className="p-t-25 , p-b-5">
								<Link to="/" onClick={closemenu} className="stext-102 cl2 hov-cl1 trans-04">
									Home
								</Link>
							</li>

							{user_id ?
								<li className="p-b-5">
								<Link to="/liked" onClick={closemenu} className="stext-102 cl2 hov-cl1 trans-04">
									My Wishlist
								</Link>
							</li>

								:
								<li className="p-b-5">
								<p style={{cursor:"pointer", fontWeight:400}} onClick={handleprofilePage} className="stext-102 cl2 hov-cl1 trans-04">
									My Wishlist
								</p>
							</li>
							}


							


							<li className="p-b-40">
								<Link to="/help" onClick={closemenu} className="stext-102 cl2 hov-cl1 trans-04">
									Help & FAQs
								</Link>
							</li>
						</ul>



						<div className="sidebar-gallery w-full">
							<span className="mtext-101 cl5 p-t-25">
								About Us
							</span>

							<p className="stext-108 cl6 p-t-10">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus vulputate hendrerit. Praesent faucibus erat vitae rutrum gravida. Vestibulum tempus mi enim, in molestie sem fermentum quis.
							</p>
						</div>
					</div>
				</div>
			</aside>
			{showloginpopup ? <Login showloginpopup={showloginpopup} setShowloginpopup={setShowloginpopup} /> : ""}
		</>
	)
}

export default Sidebar