import { Navigate } from "react-router"
import  Cookies  from 'js-cookie'
import './index.css'
import Cartcontext from "../../Cartcontext"
import Cartview from "../Cartview"
import Emptycart from '../Emptycart'
const Cart=()=>{
    let getJwtToken=Cookies.get('jwtToken')
    if(getJwtToken===undefined){
        return <Navigate to="/login"/>
    }
    return <Cartcontext.Consumer>
        {value=>{
            const{allcarts,quantity}=value
            let cartlen=allcarts.length
            let newcartlen=cartlen===0
            let rs=0
            return(
                <>
                {newcartlen?(<Emptycart/>):(
                    <div className="cart-section">
                        <h1>My Cart</h1>
                        <ul className="cart-ulsection">
                            {allcarts.map(each=>(
                                <Cartview key={each.id} cartdetails={each} eachQuantity={quantity}/>
                            ))}
                        </ul>
                        <div className="total-price-section">
                            <div>
                                {allcarts.map(each=>{
                                    rs+=each.price
                                })}
                                <h1>Total {rs}</h1>
                                <button className="buynow-btn">Buy now</button>
                            </div>
                        </div>
                    </div>
                )}
                </>
            )
        }}
    </Cartcontext.Consumer>
}
export default Cart