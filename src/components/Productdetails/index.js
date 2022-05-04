import './index.css'
import { useEffect,useReducer } from 'react'
import { useParams } from 'react-router'
import  Cookies  from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Navigate } from "react-router"
import Cartcontext from '../../Cartcontext'
const Productdetails =()=>{
    const [state,setState]=useReducer(
        (state,setState)=>({...state,...setState}),
        {productdesc:[],num:1,similarProduct:[]}
    )
    const id=useParams().id
    
    useEffect(()=>{
        async function fetchproductDetails(){
            let token=Cookies.get('jwtToken')
            let Url=`https://apis.ccbp.in/products/${id}`
            let options={
                method:'GET',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            const response=await fetch(Url,options)
            const data=await response.json()
            let updatedproductdesc={
                availability:data.availability,
                brand:data.brand,
                description:data.description,
                id:data.id,
                imgUrl:data.image_url,
                price:data.price,
                rating:data.rating,
                title:data.title,
                totalReviews:data.total_reviews
            }
            let similar=data.similar_products
            let updatessimilarProducts=similar.map(each=>({
                title:each.title,
                price:each.price,
                rating:each.rating,
                imageUrl:each.image_url,
                id:each.id
            }))
            setState({productdesc:updatedproductdesc,similarProduct:updatessimilarProducts})
        }
        fetchproductDetails()
    },[id])
    let getJwtToken=Cookies.get('jwtToken')
        if(getJwtToken===undefined){
            return <Navigate to="/login"/>
        }
    
    const onIncrement=()=>{
        setState({num:num+1})
    }
    const onDecrement=()=>{
        const{num}=state
        if(num<1){
            setState({num:1})
        }
        setState({num:num-1})
    }
    

    const{productdesc,num,similarProduct}=state
                
    return(
        <Cartcontext.Consumer>
            {value=>{
                const {addtocart}=value
                const{availability,brand,description,imgUrl,price,rating,title,totalReviews}=productdesc
                let newobj={...productdesc}
                const onclickAddto_cart=()=>{
                    addtocart(newobj,num)
                }
                return <div className='main-bg-description-container'>
                    <div className='description-container'>
                        <img className='desc-img' src={imgUrl} alt='main_section_img'/>
                        <div className='all-desc-wrapper'>
                            <h1>{title}</h1>
                            <h4>Price: {price}/-</h4>
                            <div className='reviews-container'>
                                <div className='ratings-main-container'>
                                    <span>{rating}</span>
                                    <FaStar/>
                                </div>
                                <p className='reviews'>{totalReviews} Reviews</p>
                            </div>
                            <p className='product-description'>{description}</p>
                            <h3>Available: <span>{availability}</span></h3>
                            <h3 className='brands-sec'>Brand: <span>{brand}</span></h3>
                            <div className='inc-dec-container'>
                                <button className='increment' onClick={onDecrement}>-</button>
                                <p className='number'>{num}</p>
                                <button className='decrement' onClick={onIncrement}>+</button>
                            </div>
                            <button className='add-to-cart' onClick={onclickAddto_cart}>ADD TO CART</button>
                        </div>
                    </div>
                    <div>
                        <h1 className='similar-products-head'>Similar Products</h1>
                        <ul className='similar-ul-container'>
                            {similarProduct.map(item=>(
                                <Link to={`/products/${item.id}`} className="Link-container" key={item.id}>
                                    <li className='similar-li-container'>
                                        <img className='similar-sec-img' src={item.imageUrl} alt="similar-imgs"/>
                                        <h3>{item.title}</h3>
                                        <div className='ratings-container'>
                                            <p>Price: {item.price}/-</p>
                                            <div className='price-container'>
                                                <span>{item.rating}</span>
                                                <FaStar/>
                                            </div>
                                        </div>
                                    </li>
                                </Link>
                                
                            ))}
                        </ul>
                    </div>
            </div>
            }}
        </Cartcontext.Consumer>
        
    )
}
export default Productdetails