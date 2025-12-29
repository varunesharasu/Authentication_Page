const API_URL = "http://localhost:5000"

function handleContactSubmit(event) {
  event.preventDefault()

  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const subject = document.getElementById("subject").value
  const message = document.getElementById("message").value
  const formMessage = document.getElementById("form-message")

  // Simulate sending message (in real scenario, send to backend)
  console.log("[v0] Contact form submitted:", { name, email, subject, message })

  formMessage.innerHTML =
    '<p style="color: #51cf66; font-weight: 600;">Thank you! We received your message and will get back to you soon.</p>'

  // Reset form
  setTimeout(() => {
    document.getElementById("contact-form").reset()
    formMessage.innerHTML = ""
  }, 3000)
}
