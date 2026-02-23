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
      .maybeSingle();

    if (error) {
      console.error("Error fetching application status:", error.message);
      return;
    }

    const courseContainer = document.getElementById("courseContainer");
    const exploreBtn = document.getElementById("exploreBtn");
    const pendingNotice = document.getElementById("pendingNotice");
    const rejectedNotice = document.getElementById("rejectedNotice");

    // Reset notices
    pendingNotice?.classList.add("hidden");
    rejectedNotice?.classList.add("hidden");
    exploreBtn?.classList.add("hidden");
    courseContainer?.classList.add("hidden");

    document.querySelectorAll(".preview-course").forEach((btn) => {
      btn.classList.add("hidden");
    });

    if (application?.status === "pending") {
      pendingNotice?.classList.remove("hidden");
      togglePortalLinks(false);
    } else if (application?.status === "rejected") {
      rejectedNotice?.classList.remove("hidden");
      togglePortalLinks(false);
    } else if (application?.status === "approved") {
      exploreBtn?.classList.remove("hidden");
      document.querySelectorAll(".preview-course").forEach((btn) => {
        btn.classList.remove("hidden");
      });

      exploreBtn.onclick = () => {
        courseContainer?.classList.remove("hidden");
      };

      togglePortalLinks(true);
    } else {
      // No application yet
      exploreBtn?.classList.remove("hidden");
      setTimeout(() => exploreBtn?.classList.add("opacity-100"), 10);
      document.querySelectorAll(".preview-course").forEach((btn) => {
        btn.classList.remove("hidden");
      });

      exploreBtn.onclick = () => {
        courseContainer?.classList.remove("hidden");
      };

      togglePortalLinks(false);
    }
  } catch (err) {
    console.error("Unexpected error checking status:", err);
  }
}

// Logout logic
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

// Setup message badge
function setupMessageBadge() {
  const badgeDesktop = document.getElementById("messageBadge");
  const badgeMobile = document.getElementById("messageBadgeMobile");

  [badgeDesktop, badgeMobile].forEach((badge) => {
    badge?.classList.add("hidden");
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

  overlay?.addEventListener("click", () => {
    closeMenu?.click();
  });
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

  closeModal?.addEventListener("click", () => {
    content.classList.remove("scale-100", "opacity-100");
    content.classList.add("scale-95", "opacity-0");
    setTimeout(() => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }, 300);
  });

  enrollBtn?.addEventListener("click", async () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;

    try {
      const { data: application, error } = await window.supabase
        .from("applications")
        .select("status")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        console.error("Error checking application:", error.message);
        return;
      }

      if (application?.status === "approved") {
        const overlay = document.getElementById("unfinishedOverlay");
        overlay?.classList.remove("hidden");
      } else {
        const courseName = document.getElementById("modalTitle").textContent;
        sessionStorage.setItem("selectedCourse", courseName);
        window.location.href = "../Pages/application.html";
      }
    } catch (err) {
      console.error("Unexpected error on enroll:", err);
    }
  });
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
