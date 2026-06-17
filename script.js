// =========================================================
// IAM TECH LAB — JAVASCRIPT
// This file handles:
//   1. Theme switching (dark mode / light mode)
//   2. "Get a Quick Tech Tip" button functionality
//   3. Contact form validation
// =========================================================

// ---------- 0. Theme Management ----------

// Get the theme toggle button
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");

// Check for saved theme preference or default to system preference
function getInitialTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme;
  }
  // Check system preference for dark mode
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

// Set the theme on the document
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateThemeIcon(theme);
}

// Update the toggle button icon based on current theme
function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeIcon.textContent = "◐";
    themeToggle.title = "Switch to light mode";
  } else {
    themeIcon.textContent = "◯";
    themeToggle.title = "Switch to dark mode";
  }
}

// Toggle between light and dark themes
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
}

// Initialize theme on page load
const initialTheme = getInitialTheme();
setTheme(initialTheme);

// Listen for theme toggle button clicks
themeToggle.addEventListener("click", toggleTheme);

// Listen for keyboard support (Enter/Space)
themeToggle.addEventListener("keypress", function (event) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggleTheme();
  }
});

// ---------- Mobile Menu Toggle ----------

// Get mobile menu elements
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const navLinks = mobileMenu.querySelectorAll("a");

// Toggle mobile menu
function toggleMobileMenu() {
  mobileMenuToggle.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  const isOpen = mobileMenu.classList.contains("active");
  mobileMenuToggle.setAttribute("aria-expanded", isOpen);
}

// Close mobile menu when a link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
    mobileMenuToggle.setAttribute("aria-expanded", "false");
  });
});

// Listen for hamburger button clicks
mobileMenuToggle.addEventListener("click", toggleMobileMenu);

// Close menu when pressing Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileMenu.classList.contains("active")) {
    mobileMenuToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
    mobileMenuToggle.setAttribute("aria-expanded", "false");
  }
});



// A list of short tips the button will cycle through.
// Feel free to add, remove, or edit any of these.
const techTips = [
  "Tip: Back up your files in at least two different places.",
  "Tip: Use a password manager so every account gets a strong, unique password.",
  "Tip: Restarting your router can fix a surprising number of internet problems.",
  "Tip: Keep your apps and operating system updated for important security fixes.",
  "Tip: Before clicking a link in an email, hover over it to check where it really goes.",
  "Tip: Clear your browser cache and cookies if a website isn't loading correctly.",
  "Tip: Use strong passwords with a mix of uppercase, lowercase, numbers, and symbols.",
  "Tip: Enable two-factor authentication on important accounts like email and banking.",
  "Tip: Be suspicious of pop-ups asking you to install or update software.",
  "Tip: Never share your password over email, phone, or chat—real companies won't ask.",
  "Tip: Turn off auto-playing videos in your browser settings to save battery life.",
  "Tip: Disable notifications from websites you don't actually need to hear from.",
  "Tip: Use private/incognito mode when browsing on shared or public computers.",
  "Tip: Check your privacy settings on social media accounts regularly.",
  "Tip: Unplug devices to save electricity—standby mode still uses power.",
  "Tip: Use a VPN on public WiFi to protect your data from hackers.",
  "Tip: Screenshot important information like confirmation numbers before they disappear.",
  "Tip: Test your backups occasionally—a backup that doesn't restore is useless.",
  "Tip: Read error messages carefully—they usually tell you exactly what went wrong.",
  "Tip: Close unused browser tabs and programs to speed up your computer."
];

// Grab the button and the paragraph we want to update.
const tipButton = document.getElementById("tipButton");
const tipMessage = document.getElementById("tipMessage");

// Helper function to get a random tip (avoiding repeats)
function getRandomTip() {
  const randomIndex = Math.floor(Math.random() * techTips.length);
  return techTips[randomIndex];
}

// Helper function to display a tip with fade-in animation
function displayTip(tipText) {
  tipMessage.classList.remove("fade-in");
  // Trigger reflow to restart animation
  void tipMessage.offsetWidth;
  tipMessage.textContent = tipText;
  tipMessage.classList.add("fade-in");
}

// When the button is clicked or Enter is pressed, show a random tip
function showRandomTip() {
  const randomTip = getRandomTip();
  displayTip(randomTip);
}

tipButton.addEventListener("click", showRandomTip);

// Allow pressing Enter to get the next tip
tipButton.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    showRandomTip();
  }
});


// ---------- 2. Contact form validation ----------

const contactForm = document.getElementById("contactForm");

// Input fields
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

// Places to show error text for each field
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

// Where we show the final "thank you" message
const formSuccess = document.getElementById("formSuccess");

// A simple pattern to check that an email looks like: something@something.something
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Helper function to validate individual fields
function validateField(input, errorElement, validator) {
  const value = input.value.trim();
  const error = validator(value);
  
  if (error) {
    errorElement.textContent = error;
    input.classList.add("input-error");
    return false;
  } else {
    errorElement.textContent = "";
    input.classList.remove("input-error");
    return true;
  }
}

// Validators for each field
const validators = {
  name: (value) => value === "" ? "Please enter your name." : "",
  email: (value) => {
    if (value === "") return "Please enter your email.";
    if (!emailPattern.test(value)) return "Please enter a valid email address.";
    return "";
  },
  message: (value) => {
    if (value === "") return "Please enter a message.";
    if (value.length < 10) return "Your message should be at least 10 characters.";
    return "";
  }
};

// Real-time validation on blur
nameInput.addEventListener("blur", () => validateField(nameInput, nameError, validators.name));
emailInput.addEventListener("blur", () => validateField(emailInput, emailError, validators.email));
messageInput.addEventListener("blur", () => validateField(messageInput, messageError, validators.message));

// Form submission validation
contactForm.addEventListener("submit", function (event) {
  // Stop the form from actually submitting/reloading the page,
  // since this site has no backend to send the data to yet.
  event.preventDefault();

  // Clear any previous success message
  formSuccess.textContent = "";

  // Validate all fields
  const isNameValid = validateField(nameInput, nameError, validators.name);
  const isEmailValid = validateField(emailInput, emailError, validators.email);
  const isMessageValid = validateField(messageInput, messageError, validators.message);

  // If every field passed its check, show a success message and reset the form.
  if (isNameValid && isEmailValid && isMessageValid) {
    formSuccess.textContent = "Thanks! Your message has been received.";
    contactForm.reset();
    nameInput.classList.remove("input-error");
    emailInput.classList.remove("input-error");
    messageInput.classList.remove("input-error");
  }
});
