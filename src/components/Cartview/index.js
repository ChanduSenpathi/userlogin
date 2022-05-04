import './index.css'
import {AiFillCloseCircle } from 'react-icons/ai'
import Cartcontext from '../../Cartcontext'
const Cartview =props=>{
    const{cartdetails,eachQuantity}=props
    const{imgUrl,title,brand,price,id}=cartdetails
    return(
        <Cartcontext.Consumer>
            {value=>{
                const{deleteItem}=value
                const deleteproduct=()=>{
                    deleteItem(id)
                }
                return (
                    <li className='cart-li-container'>
                        <div className='cart-profile-image'>
                            <img className='cart_images' src={imgUrl} alt="cart"/>
                            <div className='title-brnad-sec'>
                                <h2>{title}</h2>
                                <span>by {brand}</span>
                            </div>
                        </div>
                        <div className='inc-dec-container'>
                            <button className='increment'>-</button>
                            <p className='number'>{eachQuantity}</p>
                            <button className='decrement'>+</button>
                        </div>
                        <h3 className='cart-price-sec'>Rs {price}/-</h3>
                        <button className='delete-btn' onClick={deleteproduct}>
                            <AiFillCloseCircle color='red'/>
                        </button>
                        <button className='responsive-remove-item' onClick={deleteproduct}>Remove</button>
                    </li>
                )
            }}
        </Cartcontext.Consumer>
    )
}
export default Cartview