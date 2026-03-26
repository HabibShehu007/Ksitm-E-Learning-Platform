// Load user session info and display in dashboard
function loadUserSession() {
  const userName = sessionStorage.getItem("userName") || "Guest";
  const userEmail = sessionStorage.getItem("userEmail") || "Not Provided";
  const avatarUrl = sessionStorage.getItem("userAvatarUrl") || null;

  const greeting = document.getElementById("userGreeting");
  const emailDisplay = document.getElementById("userEmailDisplay");

  if (greeting) {
    greeting.innerHTML = `Hello, <span class="text-violet-700">${userName}</span>!`;
  }
  if (emailDisplay) {
    emailDisplay.innerHTML = `Email: <span class="text-gray-800">${userEmail}</span>`;
  }

  // Drawer profile elements
  const drawerProfilePic = document.getElementById("drawerProfilePic");
  const drawerDefaultAvatar = document.getElementById("drawerDefaultAvatar");
  const drawerProfileName = document.getElementById("drawerProfileName");
  const drawerProfileEmail = document.getElementById("drawerProfileEmail");

  if (avatarUrl && drawerProfilePic && drawerDefaultAvatar) {
    drawerProfilePic.src = avatarUrl;
    drawerProfilePic.classList.remove("hidden");
    drawerDefaultAvatar.classList.add("hidden");
  } else {
    drawerProfilePic?.classList.add("hidden");
    drawerDefaultAvatar?.classList.remove("hidden");
  }

  if (drawerProfileName) {
    drawerProfileName.textContent = userName;
  }
  if (drawerProfileEmail) {
    drawerProfileEmail.textContent = userEmail;
  }
}

// Helper: show or hide portal link in drawer
function togglePortalLinks(show) {
  const portalNavLinkDrawer = document.getElementById("portalNavLinkDrawer");

  if (portalNavLinkDrawer) {
    portalNavLinkDrawer.classList[show ? "remove" : "add"]("hidden");
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

    // Reset state
    pendingNotice?.classList.add("hidden");
    rejectedNotice?.classList.add("hidden");
    exploreBtn?.classList.add("hidden", "opacity-0");
    courseContainer?.classList.add("hidden");
    document.querySelectorAll(".preview-course").forEach((btn) => {
      btn.classList.add("hidden");
    });

    // Handle statuses
    if (application?.status === "pending") {
      // Pending → show pending notice
      pendingNotice?.classList.remove("hidden");
      togglePortalLinks(false);
    } else if (application?.status === "rejected") {
      // Rejected → show rejected notice
      rejectedNotice?.classList.remove("hidden");
      togglePortalLinks(false);
    } else if (application?.status === "approved") {
      // Approved → show explore button + previews
      exploreBtn?.classList.remove("hidden");
      setTimeout(() => exploreBtn?.classList.add("opacity-100"), 10);

      document.querySelectorAll(".preview-course").forEach((btn) => {
        btn.classList.remove("hidden");
      });

      exploreBtn.onclick = () => {
        courseContainer?.classList.remove("hidden");
        setTimeout(() => courseContainer?.classList.add("opacity-100"), 10);
      };

      togglePortalLinks(true);
    } else {
      // No application yet → allow exploring
      exploreBtn?.classList.remove("hidden");
      setTimeout(() => exploreBtn?.classList.add("opacity-100"), 10);

      document.querySelectorAll(".preview-course").forEach((btn) => {
        btn.classList.remove("hidden");
      });

      exploreBtn.onclick = () => {
        courseContainer?.classList.remove("hidden");
        setTimeout(() => courseContainer?.classList.add("opacity-100"), 10);
      };

      togglePortalLinks(false);
    }
  } catch (err) {
    console.error("Unexpected error checking status:", err);
  }
}

// Logout logic
function setupLogout() {
  const logoutBtnDrawer = document.getElementById("logoutBtnDrawer");
  const logoutModal = document.getElementById("logoutModal");
  const logoutModalContent = document.getElementById("logoutModalContent");
  const confirmLogoutBtn = document.getElementById("confirmLogoutBtn");
  const cancelLogoutBtn = document.getElementById("cancelLogoutBtn");

  if (logoutBtnDrawer) {
    logoutBtnDrawer.addEventListener("click", (e) => {
      e.preventDefault();
      // Show modal
      logoutModal.classList.remove("hidden");
      setTimeout(() => {
        logoutModalContent.classList.remove("scale-95", "opacity-0");
        logoutModalContent.classList.add("scale-100", "opacity-100");
      }, 10);
    });
  }

  if (cancelLogoutBtn) {
    cancelLogoutBtn.addEventListener("click", () => {
      logoutModalContent.classList.remove("scale-100", "opacity-100");
      logoutModalContent.classList.add("scale-95", "opacity-0");
      setTimeout(() => logoutModal.classList.add("hidden"), 300);
    });
  }

  if (confirmLogoutBtn) {
    confirmLogoutBtn.addEventListener("click", async () => {
      try {
        await window.supabase.auth.signOut();
        sessionStorage.clear();
        window.location.href = "../Pages/login.html";
      } catch (err) {
        console.error("Logout error:", err);
      }
    });
  }
}

// Setup message badge
function setupMessageBadge() {
  const badgeDrawer = document.getElementById("messageBadgeDrawer");
  badgeDrawer?.classList.add("hidden");

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
      if (count > 0 && badgeDrawer) {
        badgeDrawer.textContent = count;
        badgeDrawer.classList.remove("hidden");
      }
    });
}

// Unified nav toggle (desktop + mobile)
function setupNavDrawer() {
  const navToggle = document.getElementById("navToggle");
  const drawerMenu = document.getElementById("drawerMenu");
  const closeMenu = document.getElementById("closeMenu");
  const overlay = document.getElementById("menuOverlay");

  if (navToggle && drawerMenu && overlay) {
    navToggle.addEventListener("click", () => {
      drawerMenu.classList.remove("translate-x-full");
      drawerMenu.classList.add("translate-x-0");
      overlay.classList.remove("hidden");
      setTimeout(() => overlay.classList.add("opacity-100"), 10);
    });
  }

  if (closeMenu && drawerMenu && overlay) {
    closeMenu.addEventListener("click", () => {
      drawerMenu.classList.remove("translate-x-0");
      drawerMenu.classList.add("translate-x-full");
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
    const {
      data: { user },
    } = await window.supabase.auth.getUser();
    const userId = user?.id;

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
  setupNavDrawer(); // 🔑 unified nav
  setupCourseModals();
  setupMessageBadge();
  checkApplicationStatus();
});
