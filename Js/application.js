document.addEventListener("DOMContentLoaded", async () => {
  // Get logged-in user from Supabase Auth
  const {
    data: { user },
    error: userError,
  } = await window.supabase.auth.getUser();

  if (userError || !user) {
    alert("You must be logged in to apply.");
    return;
  }

  // Pull values from sessionStorage
  const userName =
    sessionStorage.getItem("userName") ||
    user.user_metadata?.full_name ||
    "Guest";
  const userEmail = sessionStorage.getItem("userEmail") || user.email || "";
  const userPhone =
    sessionStorage.getItem("userPhone") || user.user_metadata?.phone || "";
  const selectedCourse =
    sessionStorage.getItem("selectedCourse") || "No Course Selected";

  // Display in hero
  document.getElementById("heroGreeting").textContent = `Hello, ${userName}!`;
  document.getElementById(
    "heroDescription"
  ).textContent = `You're applying for ${selectedCourse}. Let’s get you started.`;
  document.getElementById(
    "selectedCourse"
  ).textContent = `Course: ${selectedCourse}`;

  // Pre-fill form (readonly)
  document.getElementById("fullName").value = userName;
  document.getElementById("email").value = userEmail;
  document.getElementById("phone").value = userPhone;
  ["fullName", "email", "phone"].forEach((id) => {
    document.getElementById(id).readOnly = true;
  });

  // Success & Error modals
  const successModal = document.getElementById("successModal");
  const errorModal = document.getElementById("errorModal");
  const successContent = successModal.querySelector("div");
  const errorContent = errorModal.querySelector("div");

  function showModal(modal, content) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    setTimeout(() => {
      content.classList.remove("scale-95", "opacity-0");
      content.classList.add("scale-100", "opacity-100");
    }, 10);
  }

  function closeModal(modal, content) {
    content.classList.remove("scale-100", "opacity-100");
    content.classList.add("scale-95", "opacity-0");
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

  // Form submission
  document
    .getElementById("applicationForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      try {
        // Collect form data
        const applicationData = {
          user_id: user.id, // 👈 critical for RLS
          full_name: document.getElementById("fullName").value.trim(),
          email: document.getElementById("email").value.trim(),
          phone: document.getElementById("phone").value.trim(),
          dob: document.getElementById("dob").value,
          gender: document.getElementById("gender").value,
          start_date: document.getElementById("startDate").value,
          address: document.getElementById("address").value.trim(),
          motivation: document.getElementById("motivation").value.trim(),
          course_name: selectedCourse,
          status: "pending",
        };

        // Insert into Supabase
        const { error } = await window.supabase
          .from("applications")
          .insert([applicationData]);

        if (error) throw error;

        // Show success modal
        successModal.querySelector(
          "p"
        ).textContent = `Thank you, ${applicationData.full_name}! Your application for ${selectedCourse} has been received.`;
        showModal(successModal, successContent);

        // Redirect after delay
        setTimeout(() => {
          window.location.href = "../Pages/status.html";
        }, 2500);
      } catch (err) {
        console.error("Application error:", err);
        errorModal.querySelector("p").textContent =
          "Oops! Something went wrong. Please try again.";
        showModal(errorModal, errorContent);
      }
    });
});
