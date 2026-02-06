// ================= Login Logic =================

// Handle login form
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    return showModal("error", "⚠️ Please enter both email and password.");
  }
  if (!email.includes("@")) {
    return showModal("warning", "📧 Invalid email format.");
  }

  showModal("info", "⏳ Logging you in...");

  try {
    // Supabase login
    const { data, error } = await window.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error.message);
      return setTimeout(() => {
        showModal("error", "❌ " + error.message);
      }, 1000);
    }

    const user = data?.user || data.session?.user;
    if (!user) {
      return setTimeout(() => {
        showModal("error", "⚠️ No user session returned.");
      }, 1000);
    }

    // ✅ Fetch profile info
    const { data: profile, error: profileError } = await window.supabase
      .from("user_profiles")
      .select("name, username, phone")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error("Profile fetch error:", profileError);
    }

    // ✅ Store profile in sessionStorage
    sessionStorage.setItem("userId", user.id);
    sessionStorage.setItem("userEmail", user.email);
    sessionStorage.setItem("userName", profile?.name || "Guest");
    sessionStorage.setItem("userUsername", profile?.username || "");
    sessionStorage.setItem("userPhone", profile?.phone || "");

    // ✅ Fetch application info (optional, just for greeting)
    const { data: application, error: appError } = await window.supabase
      .from("applications")
      .select("status, course_name")
      .eq("user_id", user.id)
      .maybeSingle();

    if (appError) {
      console.error("Application fetch error:", appError.message);
    }

    // ✅ Always route to dashboard
    setTimeout(() => {
      const displayName = profile?.name || user.email;
      const courseMsg =
        application && application.status === "approved"
          ? ` You have an active course in ${application.course_name}.`
          : "";

      showModal(
        "success",
        `✅ Welcome back, ${displayName}! You’ve logged in successfully.${courseMsg}`,
      );

      setTimeout(() => {
        window.location.href = "../Pages/dashboard.html";
      }, 2500);
    }, 1000);
  } catch (err) {
    console.error("Unexpected error:", err);
    setTimeout(() => {
      showModal("error", "⚠️ Something went wrong. Please try again.");
    }, 1000);
  }
});

// ================= Modal Logic =================
function showModal(type, message) {
  const title =
    type === "success"
      ? "Success"
      : type === "error"
        ? "Error"
        : type === "warning"
          ? "Warning"
          : type === "info"
            ? "Please Wait"
            : "Message";

  const iconWrapper = document.getElementById("modalIconWrapper");
  const icon = document.getElementById("modalIcon");
  const closeBtn = document.getElementById("modalCloseBtn");

  // Style icons by type
  if (type === "success") {
    iconWrapper.className =
      "w-20 h-20 flex items-center justify-center rounded-full mb-4 shadow-md bg-green-500";
    icon.className = "fas fa-check-circle text-4xl text-white";
  } else if (type === "error") {
    iconWrapper.className =
      "w-20 h-20 flex items-center justify-center rounded-full mb-4 shadow-md bg-red-500";
    icon.className = "fas fa-times-circle text-4xl text-white";
  } else if (type === "warning") {
    iconWrapper.className =
      "w-20 h-20 flex items-center justify-center rounded-full mb-4 shadow-md bg-yellow-500";
    icon.className = "fas fa-exclamation-triangle text-4xl text-white";
  } else {
    // Loading state
    iconWrapper.className =
      "w-20 h-20 flex items-center justify-center rounded-full mb-4 shadow-md bg-blue-500 animate-spin";
    icon.className = "fas fa-spinner text-4xl text-white";
  }

  document.getElementById("modalTitleText").textContent = title;
  document.getElementById("modalMessage").textContent = message;

  const modalElement = document.getElementById("feedbackModal");
  const modalContent = document.getElementById("modalContent");

  modalElement.classList.remove("hidden");

  setTimeout(() => {
    modalContent.classList.remove("scale-95", "opacity-0");
    modalContent.classList.add("scale-100", "opacity-100");
  }, 10);

  // Button logic
  if (type === "info") {
    closeBtn.style.display = "none";
  } else {
    closeBtn.style.display = "block";
    closeBtn.onclick = () => {
      closeModal();
    };
  }
}

function closeModal() {
  const modalElement = document.getElementById("feedbackModal");
  const modalContent = document.getElementById("modalContent");

  modalContent.classList.remove("scale-100", "opacity-100");
  modalContent.classList.add("scale-95", "opacity-0");

  setTimeout(() => modalElement.classList.add("hidden"), 300);
}

// ================= Password Toggle =================
function togglePassword(fieldId) {
  const input = document.getElementById(fieldId);
  const btn = input.parentElement.querySelector("button");

  if (input.type === "password") {
    input.type = "text";
    btn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide';
  } else {
    input.type = "password";
    btn.innerHTML = '<i class="fas fa-eye"></i> Show';
  }
}
