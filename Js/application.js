document.addEventListener("DOMContentLoaded", () => {
  const userName = sessionStorage.getItem("userName") || "Guest";
  const userEmail = sessionStorage.getItem("userEmail") || "";
  const userPhone = sessionStorage.getItem("userPhone") || "";
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

  // Pre-fill form (readonly + dimmed)
  document.getElementById("fullName").value = userName;
  document.getElementById("email").value = userEmail;
  document.getElementById("phone").value = userPhone;

  // Lock Fields
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
  document.getElementById("applicationForm").addEventListener("submit", (e) => {
    e.preventDefault();

    try {
      // Collect all form data
      const applicationData = {
        name: document.getElementById("fullName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        dob: document.getElementById("dob").value,
        gender: document.getElementById("gender").value,
        startDate: document.getElementById("startDate").value,
        address: document.getElementById("address").value.trim(),
        motivation: document.getElementById("motivation").value.trim(),
        course: selectedCourse,
        status: "Pending",
      };

      // Store in sessionStorage
      sessionStorage.setItem(
        "applicationData",
        JSON.stringify(applicationData)
      );

      // Show success modal
      successModal.querySelector(
        "p"
      ).textContent = `Thank you, ${applicationData.name}! Your application for ${selectedCourse} has been received.`;
      showModal(successModal, successContent);

      // Redirect after delay
      setTimeout(() => {
        window.location.href = "../Pages/status.html";
      }, 2500);
    } catch (err) {
      // Show error modal
      errorModal.querySelector("p").textContent =
        "Oops! Something went wrong. Please try again.";
      showModal(errorModal, errorContent);
    }
  });
});
