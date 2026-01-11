document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(sessionStorage.getItem("applicationData"));

  if (!data) {
    document.getElementById("statusCard").innerHTML = `
      <div class="p-6 text-center">
        <p class="text-gray-500 mb-3">No application found. Please apply first.</p>
        <a href="application.html"
           class="inline-block bg-gradient-to-r from-orange-600 to-violet-700 text-white font-semibold px-4 py-2 rounded-full shadow hover:scale-105 transition">
          <i class="fas fa-file-alt mr-2"></i> Go to Application
        </a>
      </div>
    `;
    return;
  }

  // Display summary
  document.getElementById("cardName").textContent = `Applicant: ${data.name}`;
  document.getElementById("cardCourse").textContent = `Course: ${data.course}`;

  // Dynamic badge styling
  const statusEl = document.getElementById("cardStatus");
  let badgeClass = "bg-yellow-100 text-yellow-700"; // default Pending
  let icon = "fa-hourglass-half";

  if (data.status.toLowerCase() === "approved") {
    badgeClass = "bg-green-100 text-green-700";
    icon = "fa-check-circle";
  } else if (data.status.toLowerCase() === "rejected") {
    badgeClass = "bg-red-100 text-red-700";
    icon = "fa-times-circle";
  }

  statusEl.className = `inline-block px-3 py-1 text-sm font-semibold rounded-full ${badgeClass}`;
  statusEl.innerHTML = `<i class="fas ${icon} mr-1"></i> Status: ${data.status}`;

  // Toggle details
  const toggleBtn = document.getElementById("toggleDetails");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const details = document.getElementById("detailsCollapse");
      if (details) {
        details.classList.toggle("hidden");
        const icon = toggleBtn.querySelector("i");
        if (icon) {
          icon.classList.toggle("fa-chevron-down");
          icon.classList.toggle("fa-chevron-up");
        }
      }
    });
  }

  // Refresh button logic
  const refreshBtn = document.getElementById("refreshStatus");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      // simplest way: reload the page so status.js runs again
      location.reload();
    });
  }

  // Display details with Tailwind + Font Awesome styling
  const details = `
  <div class="space-y-3">
    <p class="flex items-center gap-2">
      <i class="fas fa-envelope text-violet-700"></i>
      <span class="font-semibold">Email:</span> <span>${data.email}</span>
    </p>
    <p class="flex items-center gap-2">
      <i class="fas fa-phone text-violet-700"></i>
      <span class="font-semibold">Phone:</span> <span>${data.phone}</span>
    </p>
    <p class="flex items-center gap-2">
      <i class="fas fa-calendar text-violet-700"></i>
      <span class="font-semibold">Date of Birth:</span> <span>${data.dob}</span>
    </p>
    <p class="flex items-center gap-2">
      <i class="fas fa-venus-mars text-violet-700"></i>
      <span class="font-semibold">Gender:</span> <span>${data.gender}</span>
    </p>
    <p class="flex items-center gap-2">
      <i class="fas fa-calendar-check text-violet-700"></i>
      <span class="font-semibold">Start Date:</span> <span>${data.startDate}</span>
    </p>
    <p class="flex items-center gap-2">
      <i class="fas fa-map-marker-alt text-violet-700"></i>
      <span class="font-semibold">Address:</span> <span>${data.address}</span>
    </p>
    <p class="flex items-start gap-2">
      <i class="fas fa-lightbulb text-violet-700 mt-1"></i>
      <span class="font-semibold">Motivation:</span> 
      <span class="italic text-gray-700">${data.motivation}</span>
    </p>
  </div>
`;

  document.getElementById("detailsContainer").innerHTML = details;
});
