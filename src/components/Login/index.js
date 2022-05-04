import './index.css'
import {useReducer} from 'react'
import { useNavigate,Navigate} from 'react-router-dom'
import  Cookies  from 'js-cookie'
const Login =()=>{
    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {username:'',password:'',errorMessage:'',isShowerr:false}
      )
    let navigate=useNavigate()
    const newSubmission=jwt_token=>{
        navigate('/')
        Cookies.set('jwtToken',jwt_token,{expires:30})
    }

    const usernamechange=event=>{
        setState({username:event.target.value})
    }
    const passwordchange=event=>{
        setState({password:event.target.value})
    }
    const submissionfailure=err=>{
        setState({errorMessage:err+'*',isShowerr:true})
    }
    const formSubmit=async event=>{
        event.preventDefault()
        let url="https://apis.ccbp.in/login"
        const {username,password}=state
        let credentials={username,password}
        let options={
            method:'POST',
            body:JSON.stringify(credentials),
        }
        let response=await fetch(url,options)
        let data=await response.json()
        if (response.ok){
            newSubmission(data.jwt_token)
        }else{
            submissionfailure(data.error_msg)
        }
    }
    const{errorMessage,isShowerr}=state
    let getCookie=Cookies.get('jwtToken')
    if(getCookie!==undefined){
        return <Navigate to="/"/>
    }
    
    
    return(
        <div className='login-container'>
            <img className='login-image' src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png' alt='login-frame'/>
            <form className='form-container' onSubmit={formSubmit}>
                <img className='login-logo-image' src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png' alt='login-con'/>
                <div>
                    <input type={'text'} className="text-feilds" onChange={usernamechange}/>
                </div>
                <div>
                    <input type={'password'} className="text-feilds" onChange={passwordchange}/>
                </div>
                <input type={'submit'} value="Login" className="submit-field"/>
                {isShowerr?(<p className='error'>{errorMessage}</p>):''}
            </form>
        </div>
      )
}

export default Login