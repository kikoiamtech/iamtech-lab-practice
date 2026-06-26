// =========================================================
// IAM TECH — JAVASCRIPT
// This file handles:
//   1. Theme switching (dark mode / light mode)
//   2. Mobile Menu Toggle
//   3. "Get a Quick Tech Insight" button functionality
//   4. Contact form validation, Modal Review, and submission
//   5. Scroll Reveal Animations
//   6. Cyber-Divine Animation Suite
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

if (tipButton && tipMessage) {
  tipButton.addEventListener("click", showRandomTip);
  tipButton.addEventListener("keypress", function (event) {
    if (event.key === "Enter") showRandomTip();
  });
}

// ---------- 3. Contact Form Validation & Modal Logic ----------

const contactForm = document.getElementById("contactForm");

if (contactForm) {
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

  const confirmationModal = document.getElementById("confirmationModal");
  const modalCloseOverlay = document.getElementById("modalCloseOverlay");
  const btnCancel = document.getElementById("btnCancel");
  const btnConfirm = document.getElementById("btnConfirm");
  const sumName = document.getElementById("sumName");
  const sumEmail = document.getElementById("sumEmail");
  const sumSize = document.getElementById("sumSize");
  const sumPackage = document.getElementById("sumPackage");
  const sumLevel = document.getElementById("sumLevel");
  let pendingSubmissionData = null;

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

  function formatDropdownText(selectElement) {
    return selectElement.options[selectElement.selectedIndex].text;
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

  nameInput.addEventListener("blur", () => validateField(nameInput, nameError, validators.name));
  emailInput.addEventListener("blur", () => validateField(emailInput, emailError, validators.email));
  companySizeInput.addEventListener("blur", () => validateSelect(companySizeInput, companySizeError, validators.companySize));
  packageFitInput.addEventListener("blur", () => validateSelect(packageFitInput, packageError, validators.packageFit));
  projectLevelInput.addEventListener("blur", () => validateSelect(projectLevelInput, levelError, validators.projectLevel));
  summaryInput.addEventListener("blur", () => validateField(summaryInput, summaryError, validators.summary));

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
      pendingSubmissionData = {
        name:         nameInput.value.trim(),
        email:        emailInput.value.trim(),
        companySize:  companySizeInput.value,
        packageFit:   packageFitInput.value,
        projectLevel: projectLevelInput.value,
        callTime:     callTimeInput.value,
        summary:      summaryInput.value.trim()
      };

      sumName.textContent = pendingSubmissionData.name;
      sumEmail.textContent = pendingSubmissionData.email;
      sumSize.textContent = formatDropdownText(companySizeInput);
      sumPackage.textContent = formatDropdownText(packageFitInput);
      sumLevel.textContent = formatDropdownText(projectLevelInput);

      confirmationModal.classList.remove("hidden");
    }
  });

  function hideModal() {
    confirmationModal.classList.add("hidden");
  }

  btnCancel.addEventListener("click", hideModal);
  modalCloseOverlay.addEventListener("click", hideModal);

  btnConfirm.addEventListener("click", function() {
    hideModal();
    if (pendingSubmissionData) {
      submitToGoogleSheet(pendingSubmissionData);
      pendingSubmissionData = null;
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
        try { parsed = JSON.parse(result); } catch (e) { parsed = { success: true }; }

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
}

// ---------- 4. Scroll Reveal Animations ----------

const revealElements = document.querySelectorAll(".reveal");

const revealOptions = {
  threshold: 0.15, 
  rootMargin: "0px 0px -50px 0px" 
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry, index) => {
    if (!entry.isIntersecting) return;

    setTimeout(() => {
      entry.target.classList.add("active");
    }, index * 100); 

    observer.unobserve(entry.target);
  });
}, revealOptions);

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// ---------- 5. Cyber-Divine Animation Suite ----------

// --- Animation 1: AI Decode Text Reveal ---
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
const haloTexts = document.querySelectorAll(".halo-text");

haloTexts.forEach(el => {
  const originalText = el.innerText;
  let iterations = 0;
  
  const interval = setInterval(() => {
    el.innerText = originalText.split("").map((letter, index) => {
      // Reveal the correct letter once the iteration passes its index
      if (index < iterations) {
        return originalText[index];
      }
      // Otherwise, return a random scrambled character
      return letters[Math.floor(Math.random() * letters.length)];
    }).join("");
    
    // Stop the loop once the whole word is spelled out
    if (iterations >= originalText.length) {
      clearInterval(interval);
      el.innerText = originalText; // Failsafe to ensure exact string
    }
    iterations += 1 / 3; // Controls the speed of the decode
  }, 30);
});

// --- Animation 2 & 3: 3D Tilt and Mouse-Tracking Glow ---
const dynamicCards = document.querySelectorAll(".value-card, .service-card, .pricing-card-extended, .process-step");

dynamicCards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Feed exact mouse coordinates to CSS variables for the Glow
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    
    // Calculate 3D Tilt mathematics
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4; // Max 4 degree tilt
    const rotateY = ((x - centerX) / centerX) * 4;
    
    // Remove CSS transition during movement so it tracks instantly without lag
    card.style.transition = "none";
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  
  card.addEventListener("mouseleave", () => {
    // Restore smooth CSS transition and snap the card back to flat
    card.style.transition = "transform 0.5s ease, box-shadow 0.5s ease";
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
  });
});

// --- Animation 4: Dynamic Number Counting ---
const countElements = document.querySelectorAll(".count-up");

const countObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    
    // Grab the target number from the HTML attribute
    const targetAttr = entry.target.getAttribute("data-target");
    if(!targetAttr) return; // Ignore if attribute is missing
    
    const target = +targetAttr;
    const duration = 1500; // 1.5 seconds to finish counting
    const increment = target / (duration / 16); // Assuming 60fps
    
    let current = 0;
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        entry.target.innerText = Math.ceil(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        // Animation finished, snap to target string format
        entry.target.innerText = target.toLocaleString();
      }
    };
    updateCounter(); // Start the counting loop
    
    observer.unobserve(entry.target);
  });
}, { threshold: 0.5 }); // Trigger when 50% of the number is visible

countElements.forEach(el => {
  countObserver.observe(el);
});