// Handle signup form
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document
    .getElementById("confirmPassword")
    .value.trim();

  // validations
  if (!username || !name || !phone || !email || !password || !confirmPassword) {
    return showModal("error", "⚠️ All fields are required.");
  }
  if (!email.includes("@")) {
    return showModal("warning", "📧 Invalid email format.");
  }
  if (password !== confirmPassword) {
    return showModal("error", "🔑 Passwords do not match.");
  }

  // Show loading state
  showModal("info", "⏳ Creating your account... Please wait.");

  try {
    // Supabase signup with email + password
    const { data, error } = await window.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          name,
          phone,
        },
      },
    });

    if (error) {
      return setTimeout(() => {
        showModal("error", "🚫 " + error.message);
      }, 2000);
    }

    // Success modal (no auto redirect)
    setTimeout(() => {
      showModal(
        "success",
        "🎉 Account created successfully! Please check your email (and spam folder) for a verification link. Once verified, you’ll be redirected to the login page."
      );
    }, 2000);
  } catch (err) {
    setTimeout(() => {
      showModal("error", "⚠️ Something went wrong. Please try again.");
    }, 2000);
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
    iconWrapper.className =
      "w-20 h-20 flex items-center justify-center rounded-full mb-4 shadow-md bg-blue-500";
    icon.className = "fas fa-info-circle text-4xl text-white";
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

  const closeBtn = document.getElementById("modalCloseBtn");
  closeBtn.onclick = () => {
    closeModal();
    if (type === "success") {
      // Redirect ONLY when user presses Okay
      window.location.href = "verify.html";
    }
  };
}

function closeModal() {
  const modalElement = document.getElementById("feedbackModal");
  const modalContent = document.getElementById("modalContent");

  modalContent.classList.remove("scale-100", "opacity-100");
  modalContent.classList.add("scale-95", "opacity-0");

  setTimeout(() => modalElement.classList.add("hidden"), 300);
}

// Password toggles
document
  .getElementById("togglePasswordBtn")
  ?.addEventListener("click", function () {
    const input = document.getElementById("password");
    if (input.type === "password") {
      input.type = "text";
      this.innerHTML = '<i class="fas fa-eye-slash"></i> Hide';
    } else {
      input.type = "password";
      this.innerHTML = '<i class="fas fa-eye"></i> Show';
    }
  });

document
  .getElementById("toggleConfirmPasswordBtn")
  ?.addEventListener("click", function () {
    const input = document.getElementById("confirmPassword");
    if (input.type === "password") {
      input.type = "text";
      this.innerHTML = '<i class="fas fa-eye-slash"></i> Hide';
    } else {
      input.type = "password";
      this.innerHTML = '<i class="fas fa-eye"></i> Show';
    }
  });
