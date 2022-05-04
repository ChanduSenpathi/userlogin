import { Route } from "react-router"
import { Cookies } from "js-cookie"
const Protection=props=>{
    let getJwtToken=Cookies.get('jwtToken')
    if(getJwtToken===undefined){
        return <Route {...props}/>
    }
}
export default Protection