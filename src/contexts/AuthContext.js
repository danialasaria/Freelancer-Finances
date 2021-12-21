import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
//allow us to access our user anywhere in the application

const AuthContext = React.createContext()

//useauth hook (state without writing a class)

export function useAuth() {
    return useContext(AuthContext)
}
export function AuthProvider({children}) {
    //state to handle currentuser (default is no user)
    const [currentUser,setCurrentUser] = useState()
    //default loading and when useeffect is called it did the verification
    const[loading,setLoading] = useState(true)

    //if you switch from firebase just change the following two lines
    function signup(email,password) {
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email,password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    //whenever createuser above is called then firebase authstatechanged method will set the current user
    //useEffect so this only happens once (initial mounting) 
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        //unmount component
        return unsubscribe
    }, [])

    //main data we store and export
    const value = {
        currentUser,
        login,
        logout,
        resetPassword,
        updatePassword,
        updateEmail,
        signup
    }

    //return to use in rest of application
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}