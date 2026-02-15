document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("portalLoginForm");
  const regInput = document.getElementById("regNumberInput");
  const activeCourseEl = document.getElementById("activeCourse");

  // ===== Active Course Indicator on Page Load =====
  try {
    const {
      data: { user },
    } = await window.supabase.auth.getUser();

    if (user) {
      const { data: application, error: appError } = await window.supabase
        .from("applications")
        .select("course_name, status")
        .eq("user_id", user.id)
        .single();

      if (appError) console.error("Application fetch error:", appError);

      if (application?.course_name && application?.status === "approved") {
        activeCourseEl.innerHTML = `<i class="fas fa-check-circle"></i> Active course ${application.course_name}`;
        activeCourseEl.className =
          "text-green-600 font-semibold text-sm sm:text-base flex items-center gap-1";
      } else {
        activeCourseEl.textContent = "No active course found";
        activeCourseEl.className =
          "text-gray-500 font-medium text-sm sm:text-base";
      }
    } else {
      activeCourseEl.textContent = "Please log in to see your course";
      activeCourseEl.className =
        "text-gray-500 font-medium text-sm sm:text-base";
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    activeCourseEl.textContent = "Error loading course";
    activeCourseEl.className = "text-red-500 font-medium text-sm sm:text-base";
  }

  // ===== Portal Login Form Logic =====
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const regNumber = regInput.value.trim();

      if (!regNumber) {
        showModal("error", "⚠️ Please enter your registration number.");
        return;
      }

      try {
        // Step 1: Validate registration number
        const { data: regRecord, error: regError } = await window.supabase
          .from("registrations")
          .select("id, user_id, course_id, registration_number")
          .eq("registration_number", regNumber)
          .single();

        if (regError || !regRecord) {
          showModal("error", "❌ Invalid Registration Number.");
          return;
        }

        // Step 2: Fetch application details
        const { data: application, error: appError } = await window.supabase
          .from("applications")
          .select("full_name, course_name, status")
          .eq("user_id", regRecord.user_id)
          .single();

        if (appError || !application) {
          showModal("error", "⚠️ No application record found.");
          return;
        }

        if (application.status !== "approved") {
          showModal("warning", "⏳ You are not admitted yet.");
          return;
        }

        // Step 3: Congratulatory modal
        showModal(
          "success",
          `👋 Welcome back ${application.full_name}! Continue your learning in ${application.course_name}.`,
        );

        // Step 4: Redirect after modal close
        if (modalCloseBtn) {
          modalCloseBtn.addEventListener("click", () => {
            window.location.href = `../Learn_Dashbaord/pages/portal.html?reg=${regRecord.registration_number}&course=${application.course_name}`;
          });
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        showModal("error", "⚠️ Something went wrong. Please try again.");
      }
    });
  }

  // ===== Navbar Mobile Drawer Toggle =====
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenuBtn = document.getElementById("closeMenuBtn");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("translate-x-full");
      mobileMenu.classList.add("translate-x-0");
    });
  }

  if (closeMenuBtn && mobileMenu) {
    closeMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("translate-x-0");
      mobileMenu.classList.add("translate-x-full");
    });
  }

  // ===== Logout Flow =====
  const logoutLinks = document.querySelectorAll('a[href="./logout.html"]');
  const logoutModal = document.getElementById("logoutModal");
  const logoutModalContent = document.getElementById("logoutModalContent");
  const confirmLogoutBtn = document.getElementById("confirmLogoutBtn");
  const cancelLogoutBtn = document.getElementById("cancelLogoutBtn");

  logoutLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      logoutModal.classList.remove("hidden");
      setTimeout(() => {
        logoutModalContent.classList.remove("scale-95", "opacity-0");
        logoutModalContent.classList.add("scale-100", "opacity-100");
      }, 10);
    });
  });

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
        window.location.href = "../../Pages/login.html";
      } catch (err) {
        console.error("Logout error:", err);
      }
    });
  }

  // ===== Modal Logic =====
  const modalElement = document.getElementById("actionModal");
  const modalContent = document.getElementById("modalContent");
  const modalIconWrapper = document.getElementById("modalIconWrapper");
  const modalIcon = document.getElementById("modalIcon");
  const modalTitleText = document.getElementById("modalTitleText");
  const modalMessage = document.getElementById("modalMessage");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  function showModal(type, message) {
    if (type === "success") {
      modalIconWrapper.className =
        "w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-500";
      modalIcon.className = "fas fa-check text-2xl text-white";
      modalTitleText.textContent = "Success";
    } else if (type === "error") {
      modalIconWrapper.className =
        "w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-500";
      modalIcon.className = "fas fa-times text-2xl text-white";
      modalTitleText.textContent = "Error";
    } else if (type === "warning") {
      modalIconWrapper.className =
        "w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-yellow-500";
      modalIcon.className = "fas fa-exclamation-triangle text-2xl text-white";
      modalTitleText.textContent = "Warning";
    } else {
      modalIconWrapper.className =
        "w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-500";
      modalIcon.className = "fas fa-info text-2xl text-white";
      modalTitleText.textContent = "Info";
    }

    modalMessage.textContent = message;

    modalElement.classList.remove("hidden");
    setTimeout(() => {
      modalContent.classList.remove("scale-95", "opacity-0");
      modalContent.classList.add("scale-100", "opacity-100");
    }, 10);
  }
});
