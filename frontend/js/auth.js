const API_URL = "http://localhost:5000/api"

// Handle Signup
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault()

  const name = document.getElementById("signup-name").value
  const email = document.getElementById("signup-email").value
  const password = document.getElementById("signup-password").value
  const errorDiv = document.getElementById("signup-error")

  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await response.json()

    if (response.ok) {
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      errorDiv.textContent = ""
      window.location.href = "pages/dashboard.html"
    } else {
      errorDiv.textContent = data.message || "Signup failed"
    }
  } catch (error) {
    errorDiv.textContent = "Error: " + error.message
  }
})

// Handle Signin
document.getElementById("signin-form").addEventListener("submit", async (e) => {
  e.preventDefault()

  const email = document.getElementById("signin-email").value
  const password = document.getElementById("signin-password").value
  const errorDiv = document.getElementById("signin-error")

  try {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (response.ok) {
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      errorDiv.textContent = ""
      window.location.href = "pages/dashboard.html"
    } else {
      errorDiv.textContent = data.message || "Signin failed"
    }
  } catch (error) {
    errorDiv.textContent = "Error: " + error.message
  }
})
