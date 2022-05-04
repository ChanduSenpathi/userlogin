import './index.css'
import Cookies from 'js-cookie';
import { Component } from "react";
import Loader from 'react-loader-spinner';
import {FaStar} from 'react-icons/fa'
const newStatus={
        success:'SUCCESS',
        failure:'FAILURE',
        loading:'LOADING'
}
class Primeproducts extends Component{
    state={apiStatus:'',primDeals:[]}
    
    componentDidMount=()=>{
        this.getPrimeProducts()
    }
    getPrimeProducts=async()=>{
        this.setState({apiStatus:newStatus.loading})
        let Url="https://apis.ccbp.in/prime-deals"
        let getJT=Cookies.get('jwtToken')
        let option={
            method:'GET',
            headers:{
                Authorization: `Bearer ${getJT}`
            }
        }
        let response= await fetch(Url,option)
        if(response.ok){
            let data=await response.json()
            let newDeals=data.prime_deals
            let updatedDeals=newDeals.map(each=>({
                availability:each.availability,
                brand:each.brand,
                description:each.description,
                id:each.id,
                imageUrl:each.image_url,
                price:each.price,
                rating:each.rating,
                style:each.style,
                title:each.title,
                totalReviews:each.total_reviews
            }))
            this.setState({primDeals:updatedDeals,apiStatus:newStatus.success})
        }else if(response.status===401){
            this.setState({apiStatus:newStatus.failure})
        }
    }
    getSuccessDeals=()=>{
        const{primDeals}=this.state
        return(
            <div>
                <div>
                    <h1>Exclusive Deals</h1>
                </div>
                <ul className='products-ul-container'>{primDeals.map(items=>(
                    <li className='products-li-container additional-li' key={items.id}>
                        <h2>Brand: {items.brand}</h2>
                        <img className='product-brand' src={items.imageUrl} alt="prime_deals_secs"/>
                        <h3>{items.title}</h3>
                        <details>
                            <summary>Description</summary>
                            <p>{items.description}</p>
                        </details>
                        <p>Availability: {items.availability}</p>
                        <p>Style: {items.style}</p>
                        <div className='ratings-container'>
                            <p>Price: {items.price}/-</p>
                            <div className='price-container'>
                                <span>{items.rating}</span>
                                <FaStar/>
                            </div>
                        </div>
                    </li>
                ))}</ul>
            </div>
        )
    }
    getFailureDeals=()=>{
        return(
            <div>
                <img className='failure-image' src='https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png' alt='failure_img'/>
            </div>
        )
    }
    getLoadingDeals=()=>{
        return(
            <div className='loaders'>
                <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
            </div>
        )
    }
    render(){
        const{apiStatus}=this.state
        switch(apiStatus){
            case newStatus.success:
                return this.getSuccessDeals()
            case newStatus.failure:
                return this.getFailureDeals()
            case newStatus.loading:
                return this.getLoadingDeals()
            default:
                return null
        }
    }
}
export default Primeproducts