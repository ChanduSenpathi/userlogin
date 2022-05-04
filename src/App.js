import './App.css'
import { Route,Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import Cart from './components/Cart'
import Allproducts from './components/Allproducts'
import Notfound from './components/Notfound'
import Productdetails from './components/Productdetails'
import Cartcontext from './Cartcontext'
import { Component } from 'react'
class App extends Component{
  state={cartproducts:[],quan:0}
  addtocart=(eachPorducts,num)=>{
    this.setState(prev=>({cartproducts:[...prev.cartproducts,eachPorducts],quan:num}))
  }
  deleteItem=id=>{
    const{cartproducts}=this.state
    let newcart=cartproducts.filter(item=>(
      item.id!==id
    ))
    this.setState({cartproducts:newcart})
  }
  render(){
    const{cartproducts,quan}=this.state
  return(
    <>
    <Header/>
    <Cartcontext.Provider value={{
      allcarts:cartproducts,
      quantity:quan,
      addtocart:this.addtocart,
      deleteItem:this.deleteItem
    }}>
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/products" element={<Allproducts/>}/>
        <Route exact path="/cart" element={<Cart/>}/>
        <Route exact path='/products/:id' element={<Productdetails/>}/>
        <Route path='*' element={<Notfound/>}/>
      </Routes>
    </Cartcontext.Provider>
    </>
  )}
}
export default App