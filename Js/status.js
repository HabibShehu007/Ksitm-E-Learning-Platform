// status.js

document.addEventListener("DOMContentLoaded", async () => {
  // Get logged-in user from Supabase auth
  const {
    data: { user },
    error: authError,
  } = await window.supabase.auth.getUser();
  if (authError) {
    console.error("Auth error:", authError.message);
    return;
  }
  const userId = user?.id;

  if (!userId) {
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

  // Function to render application data
  function renderApplication(app) {
    document.getElementById("cardName").textContent =
      `Applicant: ${app.full_name || "N/A"}`;
    document.getElementById("cardCourse").textContent =
      `Course: ${app.course_name || "N/A"}`;

    const statusEl = document.getElementById("cardStatus");
    let badgeClass = "bg-yellow-100 text-yellow-700";
    let icon = "fa-hourglass-half";
    let extraMessage = "";

    if (app.status === "approved") {
      badgeClass = "bg-green-100 text-green-700";
      icon = "fa-check-circle";
    } else if (app.status === "rejected") {
      badgeClass = "bg-red-100 text-red-700";
      icon = "fa-times-circle";
    } else {
      extraMessage =
        '<p class="mt-2 text-xs text-gray-600 italic"><i class="fas fa-info-circle mr-1 text-orange-600"></i> Technically, admission takes 24hrs before it gets reviewed by the admins of KSITM e‑Learning platform.</p>';
    }

    statusEl.className = `inline-block px-3 py-1 text-sm font-semibold rounded-full ${badgeClass}`;
    statusEl.innerHTML =
      `<i class="fas ${icon} mr-1"></i> Status: ${app.status}` + extraMessage;

    // Details
    document.getElementById("detailsContainer").innerHTML = `
      <div class="space-y-3">
        <p class="flex items-center gap-2"><i class="fas fa-envelope text-violet-700"></i><span class="font-semibold">Email:</span> <span>${app.email || "N/A"}</span></p>
        <p class="flex items-center gap-2"><i class="fas fa-phone text-violet-700"></i><span class="font-semibold">Phone:</span> <span>${app.phone || "N/A"}</span></p>
        <p class="flex items-center gap-2"><i class="fas fa-calendar text-violet-700"></i><span class="font-semibold">Date of Birth:</span> <span>${app.dob || "N/A"}</span></p>
        <p class="flex items-center gap-2"><i class="fas fa-venus-mars text-violet-700"></i><span class="font-semibold">Gender:</span> <span>${app.gender || "N/A"}</span></p>
        <p class="flex items-center gap-2"><i class="fas fa-calendar-check text-violet-700"></i><span class="font-semibold">Start Date:</span> <span>${app.start_date || "N/A"}</span></p>
        <p class="flex items-center gap-2"><i class="fas fa-map-marker-alt text-violet-700"></i><span class="font-semibold">Address:</span> <span>${app.address || "N/A"}</span></p>
        <p class="flex items-start gap-2"><i class="fas fa-lightbulb text-violet-700 mt-1"></i><span class="font-semibold">Motivation:</span> <span class="italic text-gray-700">${app.motivation || "N/A"}</span></p>
      </div>
    `;
  }

  // Fetch latest application for this user
  async function fetchApplication() {
    const { data, error } = await window.supabase
      .from("applications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      console.error("Error fetching application:", error.message);
      return;
    }
    if (data && data.length > 0) {
      renderApplication(data[0]);
    }
  }

  // Initial load
  await fetchApplication();

  // Refresh button
  const refreshBtn = document.getElementById("refreshStatus");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", fetchApplication);
  }

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

  // Real-time listener: listen to changes in applications table for this user
  window.supabase
    .channel("application-status")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "applications",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        console.log("Realtime update:", payload);
        if (payload.new) {
          renderApplication(payload.new);
        }
      },
    )
    .subscribe();
});
