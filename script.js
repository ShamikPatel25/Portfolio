
document.addEventListener("click", function (event) {
  let navbar = document.getElementById("navbarNav");
  let toggleButton = document.querySelector(".navbar-toggler");

  // Close navbar if clicking outside
  if (!navbar.contains(event.target) && !toggleButton.contains(event.target)) {
    let bsCollapse = new bootstrap.Collapse(navbar, { toggle: false });
    bsCollapse.hide();
  }
});

// Hide navbar when scrolling
window.addEventListener("scroll", function () {
  let navbar = document.getElementById("navbarNav");
  let bsCollapse = new bootstrap.Collapse(navbar, { toggle: false });
  bsCollapse.hide();
});


document.addEventListener("DOMContentLoaded", function () {
    const projects = document.querySelectorAll(".project-card");
    let currentProject = 0;

    function showProject(index) {
      projects.forEach((project, i) => {
        project.classList.remove("active");
        if (i === index) {
          project.classList.add("active");
        }
      });
    }


    document.getElementById("nextProject").addEventListener("click", function () {
      currentProject = (currentProject + 1) % projects.length;
      showProject(currentProject);
    });

    document.getElementById("prevProject").addEventListener("click", function () {
      currentProject = (currentProject - 1 + projects.length) % projects.length;
      showProject(currentProject);
    });

    // Auto-slide every 5 seconds
    setInterval(() => {
      currentProject = (currentProject + 1) % projects.length;
      showProject(currentProject);
    }, 15000);
  });


  document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form values
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    // Telegram Bot API
    let botToken = "7733752822:AAHcjAmyqzGg9jYUD8RhlNRwkQkMjzgQ0Nc"; // Replace with your Telegram bot token
    let chatId = "5387803337"; // Replace with your Telegram chat ID
    let telegramURL = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Message Format
    let telegramMessage = `📩 *New Contact Form Submission* 📩\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n💬 *Message:* ${message}`;

    // Send request to Telegram
    fetch(telegramURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: "Markdown"
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        alert("✅ Message sent successfully to Telegram!");
        document.getElementById("contact-form").reset(); // Reset form
      } else {
        alert("❌ Failed to send message.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("❌ Error sending message.");
    });
  });