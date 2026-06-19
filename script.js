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
const emailInput = document.getElementById("businessEmail");
const companySizeInput = document.getElementById("companySize");
const packageFitInput = document.getElementById("packageFit");
const projectLevelInput = document.getElementById("projectLevel");
const callTimeInput = document.getElementById("callTime");
const summaryInput = document.getElementById("summary");

// Places to show error text for each field
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const companySizeError = document.getElementById("companySizeError");
const packageError = document.getElementById("packageError");
const levelError = document.getElementById("levelError");
const summaryError = document.getElementById("summaryError");

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

// Helper function for select fields (no trim needed)
function validateSelect(select, errorElement, validator) {
  const value = select.value;
  const error = validator(value);
  
  if (error) {
    errorElement.textContent = error;
    select.classList.add("input-error");
    return false;
  } else {
    errorElement.textContent = "";
    select.classList.remove("input-error");
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
  companySize: (value) => value === "" ? "Please select a company size." : "",
  packageFit: (value) => value === "" ? "Please select a package." : "",
  projectLevel: (value) => value === "" ? "Please select a project level." : "",
  summary: (value) => {
    if (value === "") return "Please enter a project summary.";
    if (value.length < 10) return "Your summary should be at least 10 characters.";
    return "";
  }
};

// Real-time validation on blur
nameInput.addEventListener("blur", () => validateField(nameInput, nameError, validators.name));
emailInput.addEventListener("blur", () => validateField(emailInput, emailError, validators.email));
companySizeInput.addEventListener("blur", () => validateSelect(companySizeInput, companySizeError, validators.companySize));
packageFitInput.addEventListener("blur", () => validateSelect(packageFitInput, packageError, validators.packageFit));
projectLevelInput.addEventListener("blur", () => validateSelect(projectLevelInput, levelError, validators.projectLevel));
summaryInput.addEventListener("blur", () => validateField(summaryInput, summaryError, validators.summary));

// Google Apps Script deployment URL
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzwbRkrmY8s2zPrZUHDf_5KrLUQeOi06rgI6PvnuKDYdR0l6tgGLj4LKCalAdH0zWfYbg/exec";

// Form submission validation
contactForm.addEventListener("submit", function (event) {
  // Stop the form from actually submitting/reloading the page
  event.preventDefault();

  // Clear any previous success message
  formSuccess.textContent = "";

  // Validate all fields
  const isNameValid = validateField(nameInput, nameError, validators.name);
  const isEmailValid = validateField(emailInput, emailError, validators.email);
  const isCompanySizeValid = validateSelect(companySizeInput, companySizeError, validators.companySize);
  const isPackageValid = validateSelect(packageFitInput, packageError, validators.packageFit);
  const isLevelValid = validateSelect(projectLevelInput, levelError, validators.projectLevel);
  const isSummaryValid = validateField(summaryInput, summaryError, validators.summary);
  // Call time is optional, so no validation needed

  // If every field passed its check, submit to Google Sheets
  if (isNameValid && isEmailValid && isCompanySizeValid && isPackageValid && isLevelValid && isSummaryValid) {
    submitToGoogleSheet({
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      companySize: companySizeInput.value,
      packageFit: packageFitInput.value,
      projectLevel: projectLevelInput.value,
      callTime: callTimeInput.value,
      summary: summaryInput.value.trim()
    });
  }
});

// Function to submit data to Google Apps Script
function submitToGoogleSheet(data) {
  // Show loading state
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  // Create FormData object for better compatibility
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("companySize", data.companySize);
  formData.append("packageFit", data.packageFit);
  formData.append("projectLevel", data.projectLevel);
  formData.append("callTime", data.callTime);
  formData.append("summary", data.summary);

  fetch(GOOGLE_APPS_SCRIPT_URL, {
    method: "POST",
    body: formData
  })
    .then(response => {
      // Google Apps Script might return HTML, so check the status
      if (response.ok) {
        return response.text();
      } else {
        throw new Error("Server error: " + response.status);
      }
    })
    .then(result => {
      // Try to parse as JSON, but handle HTML responses too
      let parsed;
      try {
        parsed = JSON.parse(result);
      } catch (e) {
        // If it's not JSON, the request likely succeeded anyway
        parsed = { success: true };
      }
      
      if (parsed.success !== false) {
        // Show success message
        formSuccess.textContent = "Thanks! Your inquiry has been received. We'll be in touch soon.";
        formSuccess.style.color = "#68d391";
        
        // Reset the form
        contactForm.reset();
        nameInput.classList.remove("input-error");
        emailInput.classList.remove("input-error");
        companySizeInput.classList.remove("input-error");
        packageFitInput.classList.remove("input-error");
        projectLevelInput.classList.remove("input-error");
        summaryInput.classList.remove("input-error");
      } else {
        formSuccess.textContent = "Error: " + (parsed.error || "Failed to submit. Please try again.");
        formSuccess.style.color = "#ff8080";
      }
    })
    .catch(error => {
      console.error("Error:", error);
      formSuccess.textContent = "Error submitting form. Please try again.";
      formSuccess.style.color = "#ff8080";
    })
    .finally(() => {
      // Restore button state
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
}
