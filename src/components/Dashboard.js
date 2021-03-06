import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
//this allows to import current user
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import MainTable from "./MainTable"

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
    {/* <TableData className = "w-100" style={{maxWidth: "300px "}}/> */}
    <MainTable />
    <div style = {{position: 'absolute', right: '10vw', top: '3vw',}}>
            <Link to="/profile">Profile</Link>
    </div>
    </>
  )
}