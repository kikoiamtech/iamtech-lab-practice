// =========================================================
// IAM TECH LAB — JAVASCRIPT
// This file handles:
//   1. Theme switching (dark mode / light mode)
//   2. "Get a Quick Tech Insight" button functionality
//   3. Contact form validation and submission
// =========================================================

// ---------- 0. Theme Management ----------

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");

function getInitialTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) return savedTheme;
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeIcon.textContent = "◐";
    themeToggle.title = "Switch to light mode";
  } else {
    themeIcon.textContent = "☼";
    themeToggle.title = "Switch to dark mode";
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
}

const initialTheme = getInitialTheme();
setTheme(initialTheme);

themeToggle.addEventListener("click", toggleTheme);

themeToggle.addEventListener("keypress", function (event) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggleTheme();
  }
});

// ---------- 1. Mobile Menu Toggle ----------

const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const navLinks = mobileMenu.querySelectorAll("a");

function toggleMobileMenu() {
  mobileMenuToggle.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  const isOpen = mobileMenu.classList.contains("active");
  mobileMenuToggle.setAttribute("aria-expanded", isOpen);
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
    mobileMenuToggle.setAttribute("aria-expanded", "false");
  });
});

mobileMenuToggle.addEventListener("click", toggleMobileMenu);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileMenu.classList.contains("active")) {
    mobileMenuToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
    mobileMenuToggle.setAttribute("aria-expanded", "false");
  }
});

// ---------- 2. Tech Insight Feature ----------

// Professional-grade insights for a business audience.
const techTips = [
  "Insight: Documenting your IT environment before a migration reduces average project overruns by up to 35%.",
  "Insight: Multi-factor authentication blocks over 99% of automated credential attacks — prioritize it for all privileged accounts.",
  "Insight: A tested disaster recovery plan is as critical as the backup itself — schedule quarterly restoration drills.",
  "Insight: Delaying OS and application updates is one of the most common vectors for enterprise ransomware incidents.",
  "Insight: Single sign-on (SSO) reduces password-related helpdesk tickets by an average of 40% in mid-sized organizations.",
  "Insight: Define SLAs and escalation procedures before engaging a technology vendor, not after an incident occurs.",
  "Insight: Network segmentation limits the blast radius of a breach — isolate critical systems from general office traffic.",
  "Insight: Cloud cost overruns are most commonly caused by unused reserved instances and unmonitored data egress fees.",
  "Insight: Role-based access control (RBAC) is among the highest-ROI security investments an organization can make.",
  "Insight: Standardizing on a small number of approved software tools significantly reduces your organization's attack surface.",
  "Insight: A technology roadmap aligned to business objectives helps prevent reactive, high-cost emergency procurement.",
  "Insight: Regular vendor security assessments are essential when those vendors have access to your data or internal systems.",
  "Insight: End-user security awareness training reduces successful phishing attacks by an average of 70% over 12 months.",
  "Insight: Centralizing log management enables faster incident detection and is often a compliance requirement under ISO 27001 and SOC 2.",
  "Insight: An IT asset register is foundational to both security posture and accurate budget forecasting.",
  "Insight: Weak or reused passwords remain the leading cause of account compromise in enterprise environments.",
  "Insight: Before approving a SaaS tool, assess its data residency, subprocessor list, and incident notification obligations.",
  "Insight: Change management processes reduce production incidents caused by uncoordinated infrastructure updates.",
  "Insight: Encrypting data at rest and in transit is now a baseline expectation under most enterprise procurement frameworks.",
  "Insight: Technology debt accumulates invisibly — scheduling periodic architecture reviews prevents costly emergency remediation."
];

const tipButton = document.getElementById("tipButton");
const tipMessage = document.getElementById("tipMessage");

function getRandomTip() {
  const randomIndex = Math.floor(Math.random() * techTips.length);
  return techTips[randomIndex];
}

function displayTip(tipText) {
  tipMessage.classList.remove("fade-in");
  void tipMessage.offsetWidth; // trigger reflow to restart animation
  tipMessage.textContent = tipText;
  tipMessage.classList.add("fade-in");
}

function showRandomTip() {
  const randomTip = getRandomTip();
  displayTip(randomTip);
}

if (tipButton) {
  tipButton.addEventListener("click", showRandomTip);
  tipButton.addEventListener("keypress", function (event) {
    if (event.key === "Enter") showRandomTip();
  });
}

// ---------- 3. Contact Form Validation ----------

const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("businessEmail");
const companySizeInput = document.getElementById("companySize");
const packageFitInput = document.getElementById("packageFit");
const projectLevelInput = document.getElementById("projectLevel");
const callTimeInput = document.getElementById("callTime");
const summaryInput = document.getElementById("summary");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const companySizeError = document.getElementById("companySizeError");
const packageError = document.getElementById("packageError");
const levelError = document.getElementById("levelError");
const summaryError = document.getElementById("summaryError");

const formSuccess = document.getElementById("formSuccess");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

const validators = {
  name:         (value) => value === "" ? "Please enter your full name." : "",
  email:        (value) => {
    if (value === "") return "Please enter your business email address.";
    if (!emailPattern.test(value)) return "Please enter a valid email address.";
    return "";
  },
  companySize:  (value) => value === "" ? "Please select your organization size." : "",
  packageFit:   (value) => value === "" ? "Please select a package." : "",
  projectLevel: (value) => value === "" ? "Please select a project level." : "",
  summary:      (value) => {
    if (value === "") return "Please provide a brief project description.";
    if (value.length < 10) return "Your project brief should be at least 10 characters.";
    return "";
  }
};

// Real-time validation on blur
nameInput.addEventListener("blur",          () => validateField(nameInput, nameError, validators.name));
emailInput.addEventListener("blur",         () => validateField(emailInput, emailError, validators.email));
companySizeInput.addEventListener("blur",   () => validateSelect(companySizeInput, companySizeError, validators.companySize));
packageFitInput.addEventListener("blur",    () => validateSelect(packageFitInput, packageError, validators.packageFit));
projectLevelInput.addEventListener("blur",  () => validateSelect(projectLevelInput, levelError, validators.projectLevel));
summaryInput.addEventListener("blur",       () => validateField(summaryInput, summaryError, validators.summary));

// Google Apps Script deployment URL
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwNVg3OfOkCtNOv-cw_YmipGJUnu8cdt_osplJytUvvdsa0fomkOT0B4cAqPZy1Bcn_SA/exec";

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  formSuccess.textContent = "";

  const isNameValid         = validateField(nameInput, nameError, validators.name);
  const isEmailValid        = validateField(emailInput, emailError, validators.email);
  const isCompanySizeValid  = validateSelect(companySizeInput, companySizeError, validators.companySize);
  const isPackageValid      = validateSelect(packageFitInput, packageError, validators.packageFit);
  const isLevelValid        = validateSelect(projectLevelInput, levelError, validators.projectLevel);
  const isSummaryValid      = validateField(summaryInput, summaryError, validators.summary);

  if (isNameValid && isEmailValid && isCompanySizeValid && isPackageValid && isLevelValid && isSummaryValid) {
    submitToGoogleSheet({
      name:         nameInput.value.trim(),
      email:        emailInput.value.trim(),
      companySize:  companySizeInput.value,
      packageFit:   packageFitInput.value,
      projectLevel: projectLevelInput.value,
      callTime:     callTimeInput.value,
      summary:      summaryInput.value.trim()
    });
  }
});

function submitToGoogleSheet(data) {
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = "Submitting…";
  submitButton.disabled = true;

  const formData = new FormData();
  formData.append("name",         data.name);
  formData.append("email",        data.email);
  formData.append("companySize",  data.companySize);
  formData.append("packageFit",   data.packageFit);
  formData.append("projectLevel", data.projectLevel);
  formData.append("callTime",     data.callTime);
  formData.append("summary",      data.summary);

  fetch(GOOGLE_APPS_SCRIPT_URL, {
    method: "POST",
    body: formData
  })
    .then(response => {
      if (response.ok) return response.text();
      throw new Error("Server error: " + response.status);
    })
    .then(result => {
      let parsed;
      try {
        parsed = JSON.parse(result);
      } catch (e) {
        parsed = { success: true };
      }

      if (parsed.success !== false) {
        formSuccess.textContent = "Your inquiry has been received. A senior consultant will be in touch within one business day.";
        formSuccess.style.color = "#68d391";
        contactForm.reset();
        [nameInput, emailInput, companySizeInput, packageFitInput, projectLevelInput, summaryInput].forEach(el => {
          el.classList.remove("input-error");
        });
      } else {
        formSuccess.textContent = "Submission error: " + (parsed.error || "Please try again or contact us directly.");
        formSuccess.style.color = "#ff8080";
      }
    })
    .catch(error => {
      console.error("Error:", error);
      formSuccess.textContent = "Submission failed. Please try again or contact us directly at kiko@iamtech.ph.";
      formSuccess.style.color = "#ff8080";
    })
    .finally(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
}