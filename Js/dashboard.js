// Load user session info and display in dashboard
function loadUserSession() {
  const userName = sessionStorage.getItem("userName") || "Guest";
  const userEmail = sessionStorage.getItem("userEmail") || "Not Provided";

  const greeting = document.getElementById("userGreeting");
  const emailDisplay = document.getElementById("userEmailDisplay");

  if (greeting) {
    greeting.innerHTML = `Hello, <span class="text-violet-700">${userName}</span>!`;
  }
  if (emailDisplay) {
    emailDisplay.innerHTML = `Email: <span class="text-gray-800">${userEmail}</span>`;
  }
}

// Logout logic (desktop + mobile)
function setupLogout() {
  const logoutBtn = document.getElementById("logoutBtn");
  const logoutBtnMobile = document.getElementById("logoutBtnMobile");

  [logoutBtn, logoutBtnMobile].forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", () => {
        sessionStorage.clear();
        window.location.href = "../Pages/login.html";
      });
    }
  });
}

// Reveal course container on Explore click
function setupCourseReveal() {
  const exploreBtn = document.getElementById("exploreBtn");
  const courseContainer = document.getElementById("courseContainer");

  if (exploreBtn && courseContainer) {
    exploreBtn.addEventListener("click", () => {
      courseContainer.classList.remove("hidden");
      courseContainer.scrollIntoView({ behavior: "smooth" });
    });
  }
}

// Mobile nav toggle
function setupMobileNav() {
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenu = document.getElementById("closeMenu");
  const overlay = document.getElementById("menuOverlay");

  if (navToggle && mobileMenu && overlay) {
    navToggle.addEventListener("click", () => {
      mobileMenu.classList.remove("-translate-x-full");
      mobileMenu.classList.add("translate-x-0");
      overlay.classList.remove("hidden");
      setTimeout(() => overlay.classList.add("opacity-100"), 10);
    });
  }

  if (closeMenu && mobileMenu && overlay) {
    closeMenu.addEventListener("click", () => {
      mobileMenu.classList.remove("translate-x-0");
      mobileMenu.classList.add("-translate-x-full");
      overlay.classList.remove("opacity-100");
      setTimeout(() => overlay.classList.add("hidden"), 300);
    });
  }

  // Close menu if overlay is clicked
  if (overlay) {
    overlay.addEventListener("click", () => {
      closeMenu.click();
    });
  }
}

function setupCourseModals() {
  const buttons = document.querySelectorAll(".preview-course");
  const modal = document.getElementById("courseModal");
  const content = document.getElementById("courseModalContent");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");
  const closeModal = document.getElementById("closeModal");
  const enrollBtn = document.querySelector("#courseModal button.enroll-btn"); // target Enroll button

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const title = button.getAttribute("data-title");
      modalTitle.textContent = title;
      modalContent.innerHTML =
        courseContent[title] || "<p>Course details coming soon.</p>";

      modal.classList.remove("hidden");
      modal.classList.add("flex");

      // Animate in
      setTimeout(() => {
        content.classList.remove("scale-95", "opacity-0");
        content.classList.add("scale-100", "opacity-100");
      }, 10);
    });
  });

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      content.classList.remove("scale-100", "opacity-100");
      content.classList.add("scale-95", "opacity-0");
      setTimeout(() => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
      }, 300);
    });
  }

  if (enrollBtn) {
    enrollBtn.addEventListener("click", () => {
      const courseName = document.getElementById("modalTitle").textContent;
      sessionStorage.setItem("selectedCourse", courseName);
      window.location.href = "../Pages/application.html";
    });
  }
}

// Initialize all logic on page load
document.addEventListener("DOMContentLoaded", () => {
  loadUserSession();
  setupLogout();
  setupCourseReveal();
  setupMobileNav();
  setupCourseModals();
  setupMessageBadge();
});
