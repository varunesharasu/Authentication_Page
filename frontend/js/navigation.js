// Set active nav link based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop()
  const navLinks = document.querySelectorAll(".navbar__link")

  navLinks.forEach((link) => {
    link.classList.remove("active")
    const href = link.getAttribute("href").split("/").pop()
    if (href === currentPage || (currentPage === "" && href === "home.html")) {
      link.classList.add("active")
    }
  })
}

// Check if user is logged in
function checkAuth() {
  const token = localStorage.getItem("token")
  const authButtons = document.querySelector(".navbar__auth")

  if (token && authButtons) {
    const currentPage = window.location.pathname
    if (currentPage.includes("settings.html")) {
      // Already on settings page, show user info
      const userName = localStorage.getItem("userName")
      authButtons.innerHTML = `
        <span style="font-size: 14px;">${userName}</span>
        <button class="navbar__btn logout" onclick="logout()">Logout</button>
      `
    } else if (!currentPage.includes("dashboard.html") && !currentPage.includes("index.html")) {
      // On public pages, show dashboard and settings
      authButtons.innerHTML = `
        <a href="dashboard.html" class="navbar__btn" style="text-decoration: none;">Dashboard</a>
        <a href="settings.html" class="navbar__btn" style="text-decoration: none;">Settings</a>
        <button class="navbar__btn logout" onclick="logout()">Logout</button>
      `
    }
  }
}

function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("userName")
  localStorage.removeItem("userEmail")
  window.location.href = "../index.html"
}

// Initialize on page load
window.addEventListener("load", () => {
  setActiveNavLink()
  checkAuth()
})
