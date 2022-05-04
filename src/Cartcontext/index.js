import { createContext } from "react";

const Cartcontext=createContext({
    allcarts:[],
    quantity:0,
    addtocart:()=>{},
    deleteItem:()=>{}

})
export default Cartcontext