import {createContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
const AuthContext = createContext()
export default AuthContext
export const AuthState = ({children})=>{
    const [token, setToken] = useState(localStorage.getItem('token')|| null)
    // const [user,setUser] = useState(null)
    // const [isAuthenticated, setIsAuthenticated] = useState(false)

    // const loadUser = async () => {
    //   if(token && !isAuthenticated){
    //     console.log("inside loadUser ")
    //       try{
    //           const res = await fetch('http://localhost:8000/user',{
    //               method:'GET',
    //               headers:{
    //                   'Content-Type':'application/json',
    //                   'x-auth-token':token
    //               }
    //           })
            
    //           if(res.status === 200){
    //               const data = await res.json()
    //               console.error(data)
                 
    //               setIsAuthenticated(true)
                
    //           }else {
    //               const error = await res.json()
    //               console.log(error)
    //               console.error(error.msg)
    //           }
    //       }catch(err){
    //          console.error(err.message)
    //          console.log("error inside token && !authenticated")
    //       }
          
    //   }
    //  }

    // useEffect(()=>{
      
    //    loadUser()
    // },[token,isAuthenticated])
    
    const login = async ({email,password}) => {
        try {
            const res = await fetch('http://localhost:8000/login',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({email,password})
            })

            if (res.ok) {
                const data = await res.json()
                console.log(data,"token")
                
                localStorage.setItem('token',data.token)
                setToken(data.token)
                // setUser(data.user)
                // setIsAuthenticated(true)
               
                return true
            }else {
                const error = await res.json()
                console.error(error.message)
            }
        }
        catch(err){
           console.error(err.message)
        }
       return false
    }

    const register = async (formData) => {
        try {
          const res = await fetch('http://localhost:8000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (res.ok) {
            const data = await res.json();
            setToken(data.token);
            localStorage.setItem('token', data.token);
            // setIsAuthenticated(true);
          } else {
            const error = await res.json();
            console.error(error.message);
          }
        } catch (err) {
          console.error(err.message);
        }
      };

      const logout = () => {
        setToken(null);
        // setUser(null);
        // setIsAuthenticated(false);
    
        // Clear token from local storage
        localStorage.removeItem('token');
      };
    return (
        <AuthContext.Provider value={{token,login,logout,register}}>
            {children}
        </AuthContext.Provider>
    )


}