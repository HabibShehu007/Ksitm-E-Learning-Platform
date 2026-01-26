// signup-steps.js

function updateProgress(step) {
  const progress = document.getElementById("progressBar");
  const totalSteps = 3;
  progress.style.width = `${(step / totalSteps) * 100}%`;
}

// Validate required inputs in the current step
function validateStep(step) {
  const currentStep = document.getElementById(`step${step}`);
  const inputs = currentStep.querySelectorAll("input[required]");
  let valid = true;

  inputs.forEach((input) => {
    // remove any old error message
    const oldError = input.parentNode.querySelector(".error-text");
    if (oldError) oldError.remove();

    if (!input.value.trim()) {
      valid = false;

      // add red border
      input.classList.add("ring-2", "ring-red-500");

      // create error text
      const error = document.createElement("p");
      error.className = "error-text text-red-500 text-xs mt-1";
      error.textContent = `⚠️ ${input.placeholder || "This field"} is required`;

      // append after input
      input.parentNode.appendChild(error);

      // remove red border after a short delay
      setTimeout(() => input.classList.remove("ring-2", "ring-red-500"), 1500);
    }
  });

  return valid;
}

// Show next step only if validation passes
function nextStep(step) {
  const prevStep = step - 1;
  if (!validateStep(prevStep)) {
    return; // stop if validation fails
  }

  document
    .querySelectorAll(".step")
    .forEach((el) => el.classList.add("hidden"));
  const current = document.getElementById(`step${step}`);
  current.classList.remove("hidden");

  updateProgress(step);
}

// Show previous step
function prevStep(step) {
  document
    .querySelectorAll(".step")
    .forEach((el) => el.classList.add("hidden"));
  const current = document.getElementById(`step${step}`);
  current.classList.remove("hidden");

  updateProgress(step);
}

window.nextStep = nextStep;
window.prevStep = prevStep;

// Password toggle logic stays the same...
function togglePasswordVisibility(inputId, btnId) {
  const input = document.getElementById(inputId);
  const btn = document.getElementById(btnId);
  if (!input || !btn) return;

  const icon = btn.querySelector("i");
  const text = btn.querySelector("span");

  btn.addEventListener("click", () => {
    if (input.type === "password") {
      input.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
      text.textContent = "Hide";
    } else {
      input.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
      text.textContent = "Show";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  togglePasswordVisibility("password", "togglePasswordBtn");
  togglePasswordVisibility("confirmPassword", "toggleConfirmPasswordBtn");
});
document.addEventListener("DOMContentLoaded", () => {
  togglePasswordVisibility("password", "togglePasswordBtn");
  togglePasswordVisibility("confirmPassword", "toggleConfirmPasswordBtn");
});
