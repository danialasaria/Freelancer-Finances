import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
//this allows to import current user
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import TableData from "./Form"
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
      <Card className="mt-4">
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  )
}