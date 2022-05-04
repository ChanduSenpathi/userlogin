import './index.css'
import { Link,useNavigate } from 'react-router-dom'
import  Cookies  from 'js-cookie'
// import Cartcontext from '../../Cartcontext'
const Header=()=>{
    let navigation=useNavigate()
    const backTologin=()=>{
        let m=Cookies.remove('jwtToken')
        if (m===undefined){
            navigation('/login')
        }
    }
    // const getno_of_items=()=>{
    //     <Cartcontext.Consumer>
    //         {value=>{
    //             const{allcarts}=value
    //             let cartleng=allcarts.length
    //             return (
    //                 <>
    //                 {cartleng>0?(<span>{cartleng}</span>):null}
    //                 </>
    //             )
    //         }}
    //     </Cartcontext.Consumer>
    // }
        
    return(
        <div className='additional-header'>
            <nav className='navbar-container'>
                <img className='logo-image' src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png' alt='logo-frame'/>
                <ul className='nav-ul-container'>
                    <Link to="/" className='main-links'>
                        <li>Home</li>
                    </Link>
                    <Link to="/products" className='main-links'>
                        <li>Products</li>
                    </Link>
                    <Link to="/cart" className='main-links'>
                        <li>Cart 
                            {/* {getno_of_items()} */}
                            </li>
                    </Link>
                    <li>
                        <button className='logout-btn'  onClick={backTologin}>Logout</button>
                    </li>
                </ul>
                    <button className='logout-responsive-btn' onClick={backTologin}>
                        <img className='logout-image' src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png' alt='logout_image'/>
                    </button>
            </nav>
            <div className='main-header-container'>
                <Link to="/" className='main-links'>
                    <img className='home-img' src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png' alt='home_img'/>
                </Link>
                <Link to="/products" className='main-links'>
                    <img className='home-img' src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png' alt='home_img'/>
                </Link>
                <Link to="/cart" className='main-links'>
                    <img className='home-img' src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png' alt='home_img'/>
                </Link>
            </div>
        </div>
    )
}
export default Header