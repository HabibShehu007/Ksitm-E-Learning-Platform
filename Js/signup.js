// Handle signup form
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const dob = document.getElementById("dob").value.trim();
  const address = document.getElementById("address").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document
    .getElementById("confirmPassword")
    .value.trim();

  const btn = document.getElementById("signupBtn");
  const btnText = document.getElementById("signupBtnText");
  const btnLoader = document.getElementById("signupBtnLoader");

  // Show loader with animation
  btn.disabled = true;
  btnText.textContent = "Creating...";
  btnLoader.classList.remove("hidden");
  btnLoader.classList.add("animate-spin", "animate-pulse");

  // validations
  if (
    !username ||
    !name ||
    !phone ||
    !email ||
    !dob ||
    !address ||
    !password ||
    !confirmPassword
  ) {
    setTimeout(() => {
      showModal("error", "⚠️ All fields are required.");
      resetButton();
    }, 3000);
    return;
  }
  if (!email.includes("@")) {
    setTimeout(() => {
      showModal("warning", "📧 Invalid email format.");
      resetButton();
    }, 3000);
    return;
  }
  if (password !== confirmPassword) {
    setTimeout(() => {
      showModal("error", "🔑 Passwords do not match.");
      resetButton();
    }, 3000);
    return;
  }

  try {
    // Supabase signup
    const { data, error } = await window.supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, name, phone, email, dob, address },
      },
    });

    if (error) {
      console.error("Signup error:", error);
      return setTimeout(() => {
        showModal("error", "🚫 " + error.message);
        resetButton();
      }, 3000);
    }

    // ✅ Insert profile info
    const userId = data.user?.id;
    if (userId) {
      const { error: profileError } = await window.supabase
        .from("user_profiles")
        .insert({ id: userId, username, name, phone, email, dob, address });

      if (profileError) {
        console.error("Profile insert error:", profileError);
        return setTimeout(() => {
          showModal("error", "⚠️ Failed to save profile info.");
          resetButton();
        }, 3000);
      }
    }

    // ✅ Success modal after loader spins
    setTimeout(() => {
      showModal(
        "success",
        "🎉 Account created successfully! You can now log in.",
      );
      resetButton();

      // Redirect only when user presses Continue
      const closeBtn = document.getElementById("modalCloseBtn");
      if (closeBtn) {
        closeBtn.onclick = () => {
          closeModal();
          window.location.href = "../Pages/login.html";
        };
      }
    }, 3000);
  } catch (err) {
    console.error("Unexpected signup error:", err);
    setTimeout(() => {
      showModal("error", "⚠️ Something went wrong. Please try again.");
      resetButton();
    }, 3000);
  }

  // Helper function to reset button state
  function resetButton() {
    btn.disabled = false;
    btnText.textContent = "Sign Up";
    btnLoader.classList.add("hidden");
    btnLoader.classList.remove("animate-spin", "animate-pulse");
  }
});

// Modal Logic
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
  const modalTitle = document.getElementById("modalTitleText");
  const modalMessage = document.getElementById("modalMessage");
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

  modalTitle.textContent = title;
  modalMessage.textContent = message;

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
        // Redirect straight to login page
        window.location.href = "../Pages/login.html";
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
document
  .getElementById("togglePasswordBtn")
  ?.addEventListener("click", function () {
    const input = document.getElementById("password");
    const icon = this.querySelector("i");
    const text = this.querySelector("span");

    if (input.type === "password") {
      input.type = "text";
      icon.className = "fas fa-eye-slash";
      text.textContent = "Hide";
    } else {
      input.type = "password";
      icon.className = "fas fa-eye";
      text.textContent = "Show";
    }
  });

// Confirm Password toggle
document
  .getElementById("toggleConfirmPasswordBtn")
  ?.addEventListener("click", function () {
    const input = document.getElementById("confirmPassword");
    const icon = this.querySelector("i");
    const text = this.querySelector("span");

    if (input.type === "password") {
      input.type = "text";
      icon.className = "fas fa-eye-slash";
      text.textContent = "Hide";
    } else {
      input.type = "password";
      icon.className = "fas fa-eye";
      text.textContent = "Show";
    }
  });
