"use client"

import { useEffect, useState } from "react"

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      window.location.href = "/"
      return
    }

    // Decode token to get user info (basic decoding - in production, verify on backend)
    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      setUser(payload)
    } catch (error) {
      console.error("Token decode error:", error)
      localStorage.removeItem("token")
      window.location.href = "/"
    } finally {
      setLoading(false)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
  }

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
  }

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px" }}>
      <h1>Welcome to Dashboard</h1>
      <p>Email: {user?.email}</p>
      <button onClick={handleLogout} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Logout
      </button>
    </div>
  )
}
