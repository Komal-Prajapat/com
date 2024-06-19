import './index.css'
import { useEffect, useState } from "react";
import { getApiCall, getTermsandCondition } from '../../API/baseUrl';
import RemoveTag from '../../components/removetag';


const Privacy = () => {
    const [getTermsData, setGetTermsData] = useState('')


    const getTermsCondition = async () => {
        const id = 1
        try {
            const result = await getApiCall(`${getTermsandCondition}${id}` )        
            setGetTermsData(result.data.data.privacy_policy)
        } catch (error) {
            console.log("errors",error);
        }
    }

    useEffect(() => {
        getTermsCondition()
    }, [])

    return (
        <div className="termsOutsideClass">
        <div className="termsMainClass">
            <p className="headTermsClass">Privacy Policy</p>
            <p className='terms_content'>
            <RemoveTag ParserText={getTermsData} />
            </p>
        </div>
        </div>
    )
}
export default Privacy;