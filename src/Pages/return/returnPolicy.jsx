import React from 'react'
import "./index.css"

const ReturnPolicy = () => {
    return (
        <div className="termsOutsideClass">
            <div className="termsMainClass">
                <p className="headTermsClass">Returns Policy</p>
                <ul className='returnpolicy_content numberlist'>
                    <li>Applicable products are returnable within the applicable return window if you've received them in a condition that is physically damaged, has missing parts or accessories, defective or different from their description on the product detail page.</li>
                    
                    <li>Return will be processed only if:
                        <ul>
                            <li>it is determined that the product was not damaged while in your possession;</li>
                            <li>the product is not different from what was shipped to you;</li>
                            <li>the product is returned in original condition (with brand’s/manufacturer's box, MRP tag intact, user manual, warranty card and all the accessories therein).</li>
                        </ul>
                    </li>
                    <li>Products may not be eligible for return in some cases, including cases of buyer's remorse such as incorrect model or color of product ordered or incorrect product ordered.</li>
                    <li>Products marked as "non-returnable" on the product detail page cannot be returned. However, in an unlikely event of damaged, defective or wrong item delivered to you, we will provide a full refund or replacement, as applicable. We may contact you to ascertain the damage or defect in the product prior to issuing refund/replacement. We reserve the right to pick up the product to ascertain the damage or defect in the product prior to issuing refund/replacement.</li>
                    <li>No additional information is required to return an eligible order unless otherwise noted in the category specific policy.</li>
                    <li>Products may be eligible for replacement only if the same seller has the exact same item in stock.</li>
                    <li>If the replacement request is placed and the seller does not have the exact same product in stock, a refund would be issued to you.</li>
                    <li>In the event customers are found to misuse the return policy by excessively returning, or cancelling or not accepting the orders placed, Treasure Box reserves the right to warn and/or suspend and/or block and/or terminate such customer accounts, as necessary.</li>
                </ul>

                <p className='note_pera'> <span>Note:</span> If you've received a non-returnable product in a damaged/defective condition, you can contact us within 5 days from the delivery of the product.</p>
            </div>
        </div>
    )
}

export default ReturnPolicy