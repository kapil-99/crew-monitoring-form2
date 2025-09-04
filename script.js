const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyn5cAX2iVO9H8S6jeLSZjQg-Mw1qQEs61ghRb-qGZlZ1Ev0momAnQL59f9-1KZQqaxMg/exec";

// Login password check (Google Sheet se A2 fetch)
function login() {
  const entered = document.getElementById("password").value;

  fetch(SCRIPT_URL)  // GET request karega aur A2 ka password laayega
    .then(res => res.text())
    .then(correct => {
      if (entered === correct) {
        window.location.href = "form.html";
      } else {
        document.getElementById("error").innerText = "❌ Wrong Password!";
      }
    })
    .catch(err => {
      document.getElementById("error").innerText = "⚠️ Server Error!";
      console.error(err);
    });
}

// Form submit handler
if (document.getElementById("entryForm")) {
  document.getElementById("entryForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    fetch(SCRIPT_URL, { method: "POST", body: formData })
      .then((res) => res.text())
      .then((data) => {
        document.getElementById("msg").innerText = "✅ Data Saved Successfully!";
        e.target.reset();
      })
      .catch((err) => {
        document.getElementById("msg").innerText = "❌ Error saving data!";
        console.error(err);
      });
  });
}
