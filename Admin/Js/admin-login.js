// Password toggle logic (set up once)
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("adminPassword");

togglePassword.addEventListener("click", () => {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;

  // Switch icon safely by toggling classes
  const icon = togglePassword.querySelector("i");
  icon.classList.toggle("fa-eye");
  icon.classList.toggle("fa-eye-slash");
});

// Form submit logic
document
  .getElementById("adminLoginForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value.trim();

    // Grab modal elements
    const loadingModal = document.getElementById("loadingModal");
    const successModal = document.getElementById("successModal");
    const errorModal = document.getElementById("errorModal");
    const successContent = successModal.querySelector("div");
    const errorContent = errorModal.querySelector("div");

    // Helpers
    function showModal(modal, content = null) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      if (content) {
        setTimeout(() => {
          content.classList.remove("scale-95", "opacity-0");
          content.classList.add("scale-100", "opacity-100");
        }, 10);
      }
    }
    function closeModal(modal, content = null) {
      if (content) {
        content.classList.remove("scale-100", "opacity-100");
        content.classList.add("scale-95", "opacity-0");
      }
      setTimeout(() => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
      }, 300);
    }

    // Close buttons
    document.getElementById("closeSuccess").addEventListener("click", () => {
      closeModal(successModal, successContent);
    });
    document.getElementById("closeError").addEventListener("click", () => {
      closeModal(errorModal, errorContent);
    });

    try {
      // Show loading modal
      showModal(loadingModal);

      // ✅ Check admin credentials in admins table
      const { data: admin, error } = await window.supabase
        .from("admins")
        .select("*")
        .eq("email", email)
        .eq("password", password) // plain text check for demo
        .single();

      // Hide loading modal
      closeModal(loadingModal);

      if (error || !admin) {
        // ❌ Invalid credentials
        errorModal.querySelector("p").textContent =
          "Login failed: Invalid admin credentials.";
        showModal(errorModal, errorContent);
        return;
      }

      // ✅ Admin verified → store session
      sessionStorage.setItem("adminEmail", admin.email);
      sessionStorage.setItem("adminId", admin.id);

      // Show success modal
      showModal(successModal, successContent);

      // Redirect after short delay
      setTimeout(() => {
        window.location.href = "admin-dashboard.html";
      }, 2000);
    } catch (err) {
      console.error("Admin login error:", err.message);

      // Hide loading modal if error occurs
      closeModal(loadingModal);

      // Show error modal
      errorModal.querySelector("p").textContent =
        "Login failed: " + err.message;
      showModal(errorModal, errorContent);
    }
  });
