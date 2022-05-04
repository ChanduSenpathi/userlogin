import './index.css'
import { Component } from 'react'
import {Navigate} from 'react-router-dom'
import  Cookies  from 'js-cookie'
import {Link} from 'react-router-dom'
class Home extends Component{
    
    render(){
        let gettokens=Cookies.get('jwtToken')
        if(gettokens===undefined){
            return <Navigate to="/login"/>
        }
        return(
            <div className='home-section'>
                <div>
                    <h1 className='homebar-head'>Clothes That Get YOU Noticed</h1>
                    <p className='homebar-para'>Fshion is part of the daily air and it does not quite help that it changes all
                        the time.Clothes have always been a marker of the era and we are in a revolution
                        Your fahion makes you been seen and heard that way you are. So, celebrate the seasons
                        new and exciting fashion in your own way.
                    </p>
                    <Link to="/products" className='link-container'>
                        <button className='shopnow-btn'>Shop Now</button>
                    </Link>
                </div>
                <img className='clothes-boy-images' src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png' alt='clothes that get you noticed'/>
            </div>
        )
    }
}
export default Home