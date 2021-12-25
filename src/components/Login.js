import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from "react-router-dom"

export default function Login() {
    //list of states that we can use
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    
    // const userEmail = localStorage.getItem("useremail");
    // if(userEmail)
    // {
    //     const Email = JSON.parse(userEmail);
    //     const userPassword = localStorage.getItem("userPassword");
    //     const Password = JSON.parse(userPassword);
    //     console.log(Email)
    //     //console.log(emailRef.current.value)
    //     try{ 

    //         setError("")
    //         //setLoading disables the user from being able to create multiple accounts as they must pause
    //         setLoading(true)
    //         //save login in local storage
    //         console.log(Email)
    //         console.log(Password)
    //         //login(Email, Password)
    //         // //route to dashboard if login successful
    //         // history.push('/')
    //     } catch{
    //         //error state with custom message
    //         setError("Failed to log in")
    //     }
    // }
    // if (userEmail) {
    //     const Email = JSON.parse(userEmail);
    //     const userPassword = localStorage.getItem("userPassword");
    //     const Password = JSON.parse(userPassword);
    //     login(Email, Password)
    //     history.push('/')
    //   }

    async function handleSubmit(e) {
        e.preventDefault()
        //if when signing up passwords don't match
        //just like c++ error checking
        try{ 
            setError("")
            //setLoading disables the user from being able to create multiple accounts as they must pause
            setLoading(true)
            //save login in local storage
            // localStorage.setItem("useremail", JSON.stringify(emailRef.current.value));
            // localStorage.setItem("userpassword", JSON.stringify(passwordRef.current.value));
            await login(emailRef.current.value, passwordRef.current.value)
            //route to dashboard if login successful
            history.push('/')
        } catch{
            //error state with custom message
            setError("Failed to log in")
        }
        setLoading(false)
    }
    return (
        <>
           <Card>
               <Card.Body>
                   <h2 className="text-center mb-4">
                       Log In
                   </h2>
                   {error && <Alert variant="danger">{error}</Alert>}
                   <Form onSubmit={handleSubmit}>
                       <Form.Group id="email">
                           <Form.Label>Email</Form.Label>
                           <Form.Control type="email" ref={emailRef} required />
                       </Form.Group>
                       <Form.Group id="password">
                           <Form.Label>Password</Form.Label>
                           <Form.Control type="password" ref={passwordRef} required />
                       </Form.Group>
                    <Button disabled ={loading} className="w-100 mt-4" type="submit">
                        Log In
                    </Button>
                   </Form>
                   <div className="w-100 text-center mt-3"> 
                        <Link to ="/forgot-password">Forgot Password?</Link> 
                   </div>
               </Card.Body>
           </Card> 
           
           <div className="w-100 text-center mt-2"> 
                Need an account? <Link to ="/signup">Sign Up</Link> 
           </div>
        </>
    )
}



