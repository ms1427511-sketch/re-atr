document.addEventListener("DOMContentLoaded", () => {
  const langToggle = document.getElementById("lang-toggle");
  langToggle.addEventListener("click", () => {
    if (langToggle.textContent === "AR") {
      langToggle.textContent = "EN";
      alert("Arabic translation coming soon!");
    } else {
      langToggle.textContent = "AR";
      alert("Back to English!");
    }
  });
});
