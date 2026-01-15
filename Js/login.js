// Handle login form
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // validations
  if (!email || !password) {
    return showModal("error", "⚠️ Please enter both email and password.");
  }
  if (!email.includes("@")) {
    return showModal("warning", "📧 Invalid email format.");
  }

  // Show loading state
  showModal("info", "⏳ Logging you in...");

  try {
    // Supabase login with email + password
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

    // Extract user from session
    const user = data.session?.user;
    if (!user) {
      return setTimeout(() => {
        showModal("error", "⚠️ No user session returned.");
      }, 1000);
    }

    // Store session info
    sessionStorage.setItem("userName", user.user_metadata?.name || user.email);
    sessionStorage.setItem("userEmail", user.email);
    sessionStorage.setItem("userPhone", user.user_metadata?.phone || "");

    console.log("Session storage set:", {
      name: sessionStorage.getItem("userName"),
      email: sessionStorage.getItem("userEmail"),
      phone: sessionStorage.getItem("userPhone"),
    });

    // Success modal
    setTimeout(() => {
      showModal(
        "success",
        `✅ Welcome back, ${sessionStorage.getItem(
          "userName"
        )}! You’ve logged in successfully.`
      );
    }, 1000);
  } catch (err) {
    console.error("Unexpected error:", err);
    setTimeout(() => {
      showModal("error", "⚠️ Something went wrong. Please try again.");
    }, 1000);
  }
});

// Modal logic
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
      if (type === "success") {
        // Redirect to correct dashboard page
        window.location.href = "../Pages/dashboard.html";
      }
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

// Password toggle
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
