import './index.css'
import {FaStar} from 'react-icons/fa'
import { Link } from 'react-router-dom'
const NonprimeProducts=props=>{
    const{productDetails}=props
    const{title,imageUrl,brand,rating,price,id}=productDetails
    return(
        <Link to={`/products/${id}`} className="Link-container">
            <li className='products-li-container'>
                <h3>Brand: {brand}</h3>
                <img className='product-brand' src={imageUrl} alt='deals'/>
                <h3> {title}</h3>
                <div className='ratings-container'>
                    <p>Price: {price}/-</p>
                    <div className='price-container'>
                        <span>{rating}</span>
                        <FaStar/>
                    </div>
                </div>
            </li>
        </Link>        
    )
}
export default NonprimeProducts