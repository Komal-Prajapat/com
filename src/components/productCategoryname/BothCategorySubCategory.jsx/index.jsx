// import React, { useEffect, useState } from 'react';

// import axios from 'axios'; 
// import { CategoryAndSubcategoryApi ,Activesubcategory } from '../../../API/baseUrl';
// const CategoryAndSubcategoryComponent = () => {
//     const [categories, setCategories] = useState([]);
//     const [subcategories, setSubcategories] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Fetch categories
//                 const categoriesResponse = await axios.get(CategoryAndSubcategoryApi);
//                 setCategories(categoriesResponse.data);

//                 // Fetch subcategories
//                 const subcategoriesResponse = await axios.get(Activesubcategory);
//                 setSubcategories(subcategoriesResponse.data);

//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h2>Categories</h2>
//             <ul>
//                 {categories.map(category => (
//                     <li key={category.id}>{category.name}</li>
//                 ))}
//             </ul>

//             <h2>Subcategories</h2>
//             <ul>
//                 {subcategories.map(subcategory => (
//                     <li key={subcategory.id}>{subcategory.name}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default CategoryAndSubcategoryComponent;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './index.css'

const CategoryAndSubcategoryComponent = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch categories and subcategories data
                const response = await axios.get('https://treasure.technotoil.com/category/get-categories-list'); 
                if (response.data.status) {
                    setCategories(response.data.data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
    <>
            <div style={{
            display:"flex"

        }}
        className='CategoryAndSubcategoryCon'>
            {/* <h2></h2> */}
            {categories.map(category => (
                <ul key={category.id}>
               
                  <li ><Link to={`/product/${category.id}/${category.category_name}`} className='bothList'>{category.category_name}</Link></li>
           
                 

                     <ul>
                        {category.subCategory.map(subcategory => (
                            <Link to={`/product/${category.id}/${category.category_name}`} className='bothList' 
                            style={{
                                textDecoration:"none"
                            }}
                            >
                            <li className='bothList' key={subcategory.id}>{subcategory.category_name} </li>
                            </Link>
                        ))}
                    </ul>
               
                </ul>
            ))}
        </div>
    </>
    );
};

export default CategoryAndSubcategoryComponent;
