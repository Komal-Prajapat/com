import React from 'react'

const Review = () => {

    return (
        <>
            <form className="bg0 p-t-75 p-b-85 ">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
                            <div className="m-l-25 m-r--38 m-lr-0-xl">
                                <div className="wrap-table-shopping-cart">
                                    <div className='cart_containe'>
                                        <div>
                                            <div className="how-itemcart1">
                                                <img src="image/pot.png" alt="IMG" />
                                            </div>
                                        </div>
                                        <div className='description_quantity'>
                                            <div>
                                                <h3>Pot</h3>
                                                <p>Rs. 1000/-</p>
                                                <p>Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
                            <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                                <h4 className="mtext-109 cl2 p-b-30">
                                    Price Detail
                                </h4>

                                <div className="flex-w flex-t bor12 p-b-13">
                                    <div className="size-208">
                                        <span className="stext-110 cl2">
                                            Subtotal:
                                        </span>
                                    </div>

                                    <div className="size-209">
                                        <span className="mtext-110 cl2">
                                            Rs. 2000/-
                                        </span>
                                    </div>
                                </div>

                                <div className="flex-w flex-t bor12 p-t-15 p-b-30">
                                    <div className="size-208 w-full-ssm">
                                        <span className="stext-110 cl2">
                                           Delivery Charges: 
                                        </span>
                                    </div>
                                    <div className="size-209">
                                        <span className="mtext-110 cl2">
                                           Free
                                        </span>
                                    </div>

                                    
                                </div>

                                <div className="flex-w flex-t p-t-27 p-b-33">
                                    <div className="size-208">
                                        <span className="mtext-101 cl2">
                                            Total Payable:
                                        </span>
                                    </div>

                                    <div className="size-209 p-t-1">
                                        <span className="mtext-110 cl2">
                                            Rs. 2000/-
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Review;