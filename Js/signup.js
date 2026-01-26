// Handle signup form
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const dob = document.getElementById("dob").value.trim(); // ✅ new
  const address = document.getElementById("address").value.trim(); // ✅ new
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document
    .getElementById("confirmPassword")
    .value.trim();

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
        data: { username, name, phone, email, dob, address }, // ✅ include metadata
      },
    });

    if (error) {
      console.error("Signup error:", error);
      return setTimeout(() => {
        showModal("error", "🚫 " + error.message);
      }, 2000);
    }

    // ✅ Insert profile info into the user_profiles table
    const userId = data.user?.id;
    if (userId) {
      const { error: profileError } = await window.supabase
        .from("user_profiles")
        .insert({
          id: userId,
          username,
          name,
          phone,
          email,
          dob, // ✅ new
          address, // ✅ new
        });

      if (profileError) {
        console.error("Profile insert error:", profileError);
        return setTimeout(() => {
          showModal("error", "⚠️ Failed to save profile info.");
        }, 2000);
      }
    }

    // Success modal
    setTimeout(() => {
      showModal(
        "success",
        "🎉 Account created successfully! You can now log in."
      );
    }, 2000);
  } catch (err) {
    console.error("Unexpected signup error:", err);
    setTimeout(() => {
      showModal("error", "⚠️ Something went wrong. Please try again.");
    }, 2000);
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
