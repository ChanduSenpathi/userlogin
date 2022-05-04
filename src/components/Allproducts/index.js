import './index.css'
import Primeproducts from '../Primeproducts'
import { Navigate } from "react-router"
import  Cookies  from 'js-cookie'
import { Component } from 'react'
import Loader from 'react-loader-spinner'
import NonprimeProducts from '../NonprimeProducts'
import Sortbyproducts from '../Sortbyproducts'
import Filtering from '../Filtering'
let sortbyoptions=[
    {
        Id:'PRICE_HIGH',
        desc:'Price (High-Low)'
    },
    {
        Id:'PRICE_LOW',
        desc:'Price (Low-High)'
    }
]
let categoryoptions=[
    {
        Id:1,
        name:'Clothing'
    },
    {
        Id:2,
        name:'Electronics'
    },
    {
        Id:3,
        name:'Appliances'
    },
    {
        Id:4,
        name:'Grocery'
    },
    {
        Id:5,
        name:'Toys'
    },
]
let ratingoptions=[
    {
        Id:4,
        imgUrl:'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png'
    },
    {
        Id:3,
        imgUrl:'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png'
    },
    {
        Id:2,
        imgUrl:'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png'
    },
    {
        Id:1,
        imgUrl:'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png'
    },
]
class Allproducts extends Component{
    state={allProducts:[],
        isloading:true,
        sortby:sortbyoptions[0].Id,
        categories:categoryoptions[0].Id,
        stars:ratingoptions[0].Id,
        searchInput:''
    }
    componentDidMount=()=>{
        this.getallproducts()
    }
    getallproducts=async()=>{
        let tokens=Cookies.get('jwtToken')
        const{sortby,categories,stars,searchInput}=this.state
        let url=`https://apis.ccbp.in/products?sort_by=${sortby}&category=${categories}&title_search=${searchInput}&rating=${stars}`
        let options={
            method:'GET',
            headers:{
                Authorization: `Bearer ${tokens}`
            }
        }
        let response=await fetch(url,options)
        if(response.ok){
            let data=await response.json()
            let newData=data.products
            let updatetheData=newData.map(product=>({
                brand:product.brand,
                id:product.id,
                imageUrl:product.image_url,
                price:product.price,
                rating:product.rating,
                title:product.title
            }))
            this.setState({allProducts:updatetheData,isloading:false})
        }
        
    }
    onchangevalues=sortby=>{
        this.setState({sortby},this.getallproducts)
    }
    getfilteredvalue=categories=>{
        this.setState({categories},this.getallproducts)
    }
    getstarRatings=stars=>{
        this.setState({stars},this.getallproducts)
    }
    searching=searchInput=>{
        this.setState({searchInput},this.getallproducts)
    }
    render(){
        const{isloading,allProducts,sortby}=this.state
        let getJwtToken=Cookies.get('jwtToken')
        if(getJwtToken===undefined){
            return <Navigate to="/login"/>
        }
        return(
            <div className='products-section'>
                <div>
                    <Primeproducts />
                </div>
                <Sortbyproducts searching={this.searching} sort={sortby} sortbyoptions={sortbyoptions} onchangevalues={this.onchangevalues}/>
                <div className='responsive-sortby'>
                    <Filtering categoriessec={categoryoptions} getfilteredvalue={this.getfilteredvalue} starssec={ratingoptions} getstarRatings={this.getstarRatings}/>
                </div>
                <div className='allproduts-filtering-section'>
                    <div className='filter-category-ratings-con'>
                        <Filtering categoriessec={categoryoptions} getfilteredvalue={this.getfilteredvalue} starssec={ratingoptions} getstarRatings={this.getstarRatings}/>
                    </div>
                    <div>
                        {isloading?(
                        <div className='loaders'>
                            <Loader type="BallTriangle" color="red" height={100} width={100}/>
                            </div>):(
                                <ul className='products-ul-container'>
                                    {allProducts.map(item=>(<NonprimeProducts key={item.id} productDetails={item}/>))}
                                </ul>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Allproducts