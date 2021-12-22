import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from "react-router-dom"

const Signup = () => {
    //list of states that we can use
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        //if when signing up passwords don't match
        if (passwordRef.current.value !== passwordConfirmRef.current.value)
        {
            return setError('Password do not match')
        }
        if (passwordRef.current.value.length < 6)
        {
            return setError('Password needs to be at least 6 characters')
        }


        //just like c++ error checking
        try{ 
            setError("")
            //setLoading disables the user from being able to create multiple accounts as they must pause
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch{
            //error state with custom message
            setError("Failed to create an account")
        }
        setLoading(false)
    }
    return (
        <>
           <Card>
               <Card.Body>
                   <h2 className="text-center mb-4">
                       Sign Up
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
                       <Form.Group id="password-confirm">
                           <Form.Label>Password Confirmation</Form.Label>
                           <Form.Control type="password" ref={passwordConfirmRef} required />
                       </Form.Group>
                    <Button disabled ={loading} className="w-100 mt-4" type="submit">
                        Sign Up
                    </Button>
                   </Form>
               </Card.Body>
           </Card> 
           
           <div className="w-100 text-center mt-2"> 
                Already have an account? <Link to ="/login">Log In</Link>
           </div>
        </>
    )
}

export default Signup;