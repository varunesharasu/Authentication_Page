"use client"

import { useState, useEffect } from "react"
import "../styles/auth-styles.css"

export default function AuthForm() {
  const [switchCtn, setSwitchCtn] = useState(null)
  const [switchC1, setSwitchC1] = useState(null)
  const [switchC2, setSwitchC2] = useState(null)
  const [aContainer, setAContainer] = useState(null)
  const [bContainer, setBContainer] = useState(null)
  const [formMode, setFormMode] = useState("signin") // 'signin' or 'signup'

  // Form states
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" })
  const [signinData, setSigninData] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    // Set initial refs after component mounts
    setSwitchCtn(document.querySelector("#switch-cnt"))
    setSwitchC1(document.querySelector("#switch-c1"))
    setSwitchC2(document.querySelector("#switch-c2"))
    setAContainer(document.querySelector("#a-container"))
    setBContainer(document.querySelector("#b-container"))
  }, [])

  const changeForm = () => {
    if (!switchCtn || !switchC1 || !switchC2 || !aContainer || !bContainer) return

    switchCtn.classList.add("is-gx")
    setTimeout(() => {
      switchCtn.classList.remove("is-gx")
    }, 1500)

    switchCtn.classList.toggle("is-txr")
    const circles = document.querySelectorAll(".switch__circle")
    circles.forEach((circle) => circle.classList.toggle("is-txr"))

    switchC1.classList.toggle("is-hidden")
    switchC2.classList.toggle("is-hidden")
    aContainer.classList.toggle("is-txl")
    bContainer.classList.toggle("is-txl")
    bContainer.classList.toggle("is-z200")

    setFormMode(formMode === "signin" ? "signup" : "signin")
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("Signup successful! Please sign in.")
        setSignupData({ name: "", email: "", password: "" })
        setTimeout(() => changeForm(), 1500)
      } else {
        setMessage(data.message || "Signup failed")
      }
    } catch (error) {
      setMessage("Error: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signinData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("Sign in successful!")
        localStorage.setItem("token", data.token)
        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 1000)
      } else {
        setMessage(data.message || "Sign in failed")
      }
    } catch (error) {
      setMessage("Error: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="main">
      <div className="container a-container" id="a-container">
        <form className="form" onSubmit={handleSignup}>
          <h2 className="form__title title">Create Account</h2>
          <div className="form__icons">
            <div className="form__icon">f</div>
            <div className="form__icon">in</div>
            <div className="form__icon">tw</div>
          </div>
          <span className="form__span">or use email for registration</span>
          <input
            className="form__input"
            type="text"
            placeholder="Name"
            value={signupData.name}
            onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
            required
          />
          <input
            className="form__input"
            type="email"
            placeholder="Email"
            value={signupData.email}
            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
            required
          />
          <input
            className="form__input"
            type="password"
            placeholder="Password"
            value={signupData.password}
            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
            required
          />
          <button className="form__button button submit" type="submit" disabled={loading}>
            {loading ? "SIGNING UP..." : "SIGN UP"}
          </button>
        </form>
      </div>

      <div className="container b-container" id="b-container">
        <form className="form" onSubmit={handleSignin}>
          <h2 className="form__title title">Sign in to Website</h2>
          <div className="form__icons">
            <div className="form__icon">f</div>
            <div className="form__icon">in</div>
            <div className="form__icon">tw</div>
          </div>
          <span className="form__span">or use your email account</span>
          <input
            className="form__input"
            type="email"
            placeholder="Email"
            value={signinData.email}
            onChange={(e) => setSigninData({ ...signinData, email: e.target.value })}
            required
          />
          <input
            className="form__input"
            type="password"
            placeholder="Password"
            value={signinData.password}
            onChange={(e) => setSigninData({ ...signinData, password: e.target.value })}
            required
          />
          <a className="form__link">Forgot your password?</a>
          <button className="form__button button submit" type="submit" disabled={loading}>
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </button>
        </form>
      </div>

      <div className="switch" id="switch-cnt">
        <div className="switch__circle"></div>
        <div className="switch__circle switch__circle--t"></div>
        <div className="switch__container" id="switch-c1">
          <h2 className="switch__title title">Welcome Back!</h2>
          <p className="switch__description description">
            To keep connected with us please login with your personal info
          </p>
          <button className="switch__button button switch-btn" onClick={changeForm}>
            SIGN IN
          </button>
        </div>

        <div className="switch__container is-hidden" id="switch-c2">
          <h2 className="switch__title title">Hello Friend!</h2>
          <p className="switch__description description">Enter your personal details and start journey with us</p>
          <button className="switch__button button switch-btn" onClick={changeForm}>
            SIGN UP
          </button>
        </div>
      </div>

      {message && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "10px 20px",
            backgroundColor: message.includes("successful") ? "#4CAF50" : "#f44336",
            color: "white",
            borderRadius: "4px",
            zIndex: 9999,
          }}
        >
          {message}
        </div>
      )}
    </div>
  )
}
