const API_URL = "http://localhost:5000/api"

// Load user data on page load
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("token")

  if (!user || !token) {
    window.location.href = "../index.html"
    return
  }

  document.getElementById("user-name").textContent = user.name
  document.getElementById("profile-name").textContent = user.name
  document.getElementById("profile-email").textContent = user.email
  document.getElementById("edit-name").value = user.name
  document.getElementById("edit-email").value = user.email
})

// Show edit form
function showEditForm() {
  document.getElementById("edit-form").classList.remove("hidden")
}

// Hide edit form
function hideEditForm() {
  document.getElementById("edit-form").classList.add("hidden")
  document.getElementById("update-error").textContent = ""
}

// Handle profile update
document.getElementById("update-form").addEventListener("submit", async (e) => {
  e.preventDefault()

  const name = document.getElementById("edit-name").value
  const email = document.getElementById("edit-email").value
  const token = localStorage.getItem("token")
  const errorDiv = document.getElementById("update-error")

  try {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email }),
    })

    const data = await response.json()

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data.user))
      document.getElementById("user-name").textContent = data.user.name
      document.getElementById("profile-name").textContent = data.user.name
      document.getElementById("profile-email").textContent = data.user.email
      hideEditForm()
      alert("Profile updated successfully!")
    } else {
      errorDiv.textContent = data.message || "Update failed"
    }
  } catch (error) {
    errorDiv.textContent = "Error: " + error.message
  }
})

// Delete account
async function deleteAccount() {
  if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
    return
  }

  const token = localStorage.getItem("token")

  try {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()

    if (response.ok) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "../index.html"
    } else {
      alert(data.message || "Delete failed")
    }
  } catch (error) {
    alert("Error: " + error.message)
  }
}

// Logout function
function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  window.location.href = "../index.html"
}
