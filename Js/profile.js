document.addEventListener("DOMContentLoaded", () => {
  const userName = sessionStorage.getItem("userName") || "Guest";
  const userEmail = sessionStorage.getItem("userEmail") || "Not Provided";
  const applicationData = JSON.parse(
    sessionStorage.getItem("applicationData") || "{}"
  );

  // Safe element updates
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  setText("profileName", userName);
  setText("profileEmail", userEmail);
  setText("emailDisplay", userEmail);
  setText("phoneDisplay", applicationData.phone || "Not Provided");
  setText("dobDisplay", applicationData.dob || "Not Provided");
  setText("addressDisplay", applicationData.address || "Not Provided");
  setText("courseDisplay", applicationData.course || "No Course Selected");
});
