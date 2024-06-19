import React from 'react'
import "./index.css"

const Refund = () => {
    return (
        <div className="termsOutsideClass">
            <div className="termsMainClass">
                <p className="headTermsClass">Refund Policy</p>
                <ul className='returnpolicy_content'>
                    <li className='listStyle-none'>Refund against Cancellation:
                        <ul>
                            <li>Customers shall get Refund against Cancellation of order or any failed payment by way of credit to the original mode of payment - Credit/Debit Card or UPI or Net Banking or Third Party Wallet.</li>
                            <li>No refund applicable for “No returns applicable products”, if denied at doorstep for prepaid order.</li>
                        </ul>
                    </li>

                    <li className='listStyle-none'>Refund against Return:
                        <ul>
                            <li>In case of Cash on Delivery (COD) orders, customers can choose their bank account to get their refund on Return(s). The refund shall be initiated within 5 days from the date of return pickup.</li>
                            <li>The refund will be credited to the bank account entered by the customer at the time of initiating the return request.</li>
                            <li>The refund will be credited to the bank account associated with the UPI ID entered by the customer at the time of initiating the return request.</li>
                            <li>In case the payment is made by Credit/Debit Card, Net Banking or Third Party Wallet, you may get the refund within 5-7 working days. Kindly note that there may be delays in refunds as they're handled by the Bank.</li>
                        </ul>
                    </li>

                    <li className='listStyle-none'>Refund against denied/canceled order by FKH+:
                        <ul>
                            <li>In case of online paid order, customers shall get a Refund against return by way of credit to the original mode of payment, like Credit/Debit Card, or Net banking or Third Party Wallet.</li>
                            <li>In case of a refund by way of Credit/Debit Card, or Net banking or Third Party Wallet, you may get the credit within 5-7 working days.</li>
                            <li>While we regret any inconvenience caused by this time frame, as the refund is handled by the Bank.</li>
                            <li>There may be a delay in refund timing and we have no control over that.</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Refund;