import './index.css'
import { Link } from 'react-router-dom'
const Emptycart =()=>{
    return(
        <div className='empty-cart-container'>
            <img className='responsive-empty-img' src='https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png' alt='empty_cart'/>
            <h1>Your cart is empty</h1>
            <Link to="/products" className='link-container'>
                <button className='cart-btn'>Shop Now</button>
            </Link>
            
        </div>
    )
}
export default Emptycart