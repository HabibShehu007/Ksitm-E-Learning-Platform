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

// Helper: show or hide portal links
function togglePortalLinks(show) {
  const portalNavLinkDesktop = document.getElementById("portalNavLinkDesktop");
  const portalNavLinkMobile = document.getElementById("portalNavLinkMobile");

  if (portalNavLinkDesktop) {
    portalNavLinkDesktop.classList[show ? "remove" : "add"]("hidden");
  }
  if (portalNavLinkMobile) {
    portalNavLinkMobile.classList[show ? "remove" : "add"]("hidden");
  }
}

// ✅ Check application status and lock/unlock dashboard
async function checkApplicationStatus() {
  const userId = sessionStorage.getItem("userId");
  if (!userId) return;

  try {
    const { data: application, error } = await window.supabase
      .from("applications")
      .select("status, course_name")
      .eq("user_id", userId)
      .maybeSingle(); // ✅ safe: returns null if no application

    if (error) {
      console.error("Error fetching application status:", error.message);
      return;
    }

    const courseContainer = document.getElementById("courseContainer");
    const exploreBtn = document.getElementById("exploreBtn");
    const pendingNotice = document.getElementById("pendingNotice");
    const rejectedNotice = document.getElementById("rejectedNotice");

    // Reset notices
    if (pendingNotice) pendingNotice.classList.add("hidden");
    if (rejectedNotice) rejectedNotice.classList.add("hidden");

    if (application && application.status === "pending") {
      // Pending → show pending notice
      if (courseContainer) courseContainer.style.display = "none";
      if (exploreBtn) exploreBtn.style.display = "none";
      if (pendingNotice) pendingNotice.classList.remove("hidden");

      document
        .querySelectorAll(".preview-course")
        .forEach((btn) => (btn.style.display = "none"));

      togglePortalLinks(false);
    } else if (application && application.status === "rejected") {
      // Rejected → show rejected notice
      if (courseContainer) courseContainer.style.display = "none";
      if (exploreBtn) exploreBtn.style.display = "none";
      if (rejectedNotice) rejectedNotice.classList.remove("hidden");

      document
        .querySelectorAll(".preview-course")
        .forEach((btn) => (btn.style.display = "none"));

      togglePortalLinks(false);
    } else if (application && application.status === "approved") {
      // Approved → unlock dashboard + show portal link
      if (exploreBtn) exploreBtn.style.display = "inline-block";
      if (courseContainer) courseContainer.style.display = "none"; // hidden until explore clicked

      document
        .querySelectorAll(".preview-course")
        .forEach((btn) => (btn.style.display = "inline-block"));

      if (exploreBtn) {
        exploreBtn.onclick = () => {
          if (courseContainer) courseContainer.style.display = "block";
        };
      }

      togglePortalLinks(true);
    } else {
      // No application yet → unlock dashboard (explore courses)
      if (exploreBtn) exploreBtn.style.display = "inline-block";
      if (courseContainer) courseContainer.style.display = "none";

      document
        .querySelectorAll(".preview-course")
        .forEach((btn) => (btn.style.display = "inline-block"));

      if (exploreBtn) {
        exploreBtn.onclick = () => {
          if (courseContainer) courseContainer.style.display = "block";
        };
      }

      togglePortalLinks(false);
    }
  } catch (err) {
    console.error("Unexpected error checking status:", err);
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

// Setup message badge to show count of messages
function setupMessageBadge() {
  const badgeDesktop = document.getElementById("messageBadge");
  const badgeMobile = document.getElementById("messageBadgeMobile");

  [badgeDesktop, badgeMobile].forEach((badge) => {
    if (badge) badge.classList.add("hidden");
  });

  const userId = sessionStorage.getItem("userId");
  if (!userId) return;

  window.supabase
    .from("messages")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .then(({ count, error }) => {
      if (error) {
        console.error("Error fetching message count:", error.message);
        return;
      }
      if (count > 0) {
        [badgeDesktop, badgeMobile].forEach((badge) => {
          if (badge) {
            badge.textContent = count;
            badge.classList.remove("hidden");
          }
        });
      }
    });
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

  if (overlay) {
    overlay.addEventListener("click", () => {
      closeMenu.click();
    });
  }
}

// Course modals
function setupCourseModals() {
  const buttons = document.querySelectorAll(".preview-course");
  const modal = document.getElementById("courseModal");
  const content = document.getElementById("courseModalContent");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");
  const closeModal = document.getElementById("closeModal");
  const enrollBtn = document.querySelector("#courseModal button.enroll-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const title = button.getAttribute("data-title");
      modalTitle.textContent = title;
      modalContent.innerHTML =
        courseContent[title] || "<p>Course details coming soon.</p>";

      modal.classList.remove("hidden");
      modal.classList.add("flex");

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
    enrollBtn.addEventListener("click", async () => {
      const userId = sessionStorage.getItem("userId");
      if (!userId) return;

      try {
        const { data: application, error } = await window.supabase
          .from("applications")
          .select("status")
          .eq("user_id", userId)
          .maybeSingle(); // ✅ safe for no application

        if (error) {
          console.error("Error checking application:", error.message);
          return;
        }

        if (application && application.status === "approved") {
          // ✅ User already has an active course → show overlay
          const overlay = document.getElementById("unfinishedOverlay");
          if (overlay) overlay.classList.remove("hidden");
        } else {
          // ✅ Normal enrollment flow
          const courseName = document.getElementById("modalTitle").textContent;
          sessionStorage.setItem("selectedCourse", courseName);
          window.location.href = "../Pages/application.html";
        }
      } catch (err) {
        console.error("Unexpected error on enroll:", err);
      }
    });
  }
}

// Initialize all logic on page load
document.addEventListener("DOMContentLoaded", () => {
  loadUserSession();
  setupLogout();
  setupMobileNav();
  setupCourseModals();
  setupMessageBadge();
  checkApplicationStatus(); // 🔑 lock/unlock dashboard
});
