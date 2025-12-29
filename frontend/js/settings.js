function toggleSetting(element) {
  element.classList.toggle("active")
  console.log("[v0] Setting toggled:", element.classList.contains("active"))
}

// Save settings to localStorage
function saveSettings() {
  const settings = {
    emailNotifications: document.querySelectorAll(".toggle-switch")[0].classList.contains("active"),
    marketingEmails: document.querySelectorAll(".toggle-switch")[1].classList.contains("active"),
    twoFactorAuth: document.querySelectorAll(".toggle-switch")[2].classList.contains("active"),
    theme: document.querySelectorAll(".select-dropdown")[0].value,
    language: document.querySelectorAll(".select-dropdown")[1].value,
    profileVisibility: document.querySelectorAll(".select-dropdown")[2].value,
  }

  localStorage.setItem("userSettings", JSON.stringify(settings))
  console.log("[v0] Settings saved:", settings)
}

// Load settings from localStorage
function loadSettings() {
  const savedSettings = localStorage.getItem("userSettings")
  if (savedSettings) {
    const settings = JSON.parse(savedSettings)
    console.log("[v0] Loading settings:", settings)
  }
}

// Auto-save settings when changed
document.addEventListener("change", saveSettings)
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("toggle-switch")) {
    setTimeout(saveSettings, 100)
  }
})

window.addEventListener("load", loadSettings)
