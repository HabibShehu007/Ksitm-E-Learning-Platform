document.addEventListener("DOMContentLoaded", async () => {
  console.log("Admin dashboard loaded.");

  if (!window.supabase) {
    console.error("Supabase not initialized");
    return;
  }

  // Fetch application stats
  const { data, error } = await window.supabase
    .from("applications")
    .select("id, status, full_name, course_name, created_at")
    .order("created_at", { ascending: false });

  console.log("Applications data:", data);
  console.log("Error:", error);

  if (error) {
    console.error("Error fetching applications:", error.message);
    return;
  }

  // --- Summary Cards ---
  const total = data.length;
  const pending = data.filter((app) => app.status === "pending").length;
  const approved = data.filter((app) => app.status === "approved").length;
  const rejected = data.filter((app) => app.status === "rejected").length;

  document.getElementById("totalApplications").textContent = total;
  document.getElementById("pendingApplications").textContent = pending;
  document.getElementById("approvedApplications").textContent = approved;
  document.getElementById("rejectedApplications").textContent = rejected;

  // --- Recent Applications Cards ---
  const recentContainer = document.getElementById("recentApplications");
  recentContainer.innerHTML = "";

  const recentApps = data.slice(0, 6); // latest 6
  recentApps.forEach((app) => {
    const card = document.createElement("div");
    card.className =
      "rounded-xl border bg-gradient-to-br from-violet-50 to-white shadow hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col justify-between";

    // Map course to icon
    const courseIcons = {
      Cybersecurity: "fas fa-shield-alt",
      "Computer Science": "fas fa-laptop-code",
      "Data Science": "fas fa-chart-line",
      Networking: "fas fa-network-wired",
      "Software Engineering": "fas fa-code",
    };
    const courseIcon = courseIcons[app.course_name] || "fas fa-graduation-cap";

    card.innerHTML = `
      <div class="p-4 border-b flex items-center gap-2 bg-gradient-to-r from-violet-600 to-violet-500 text-white rounded-t-xl">
        <i class="${courseIcon} text-lg"></i>
        <h5 class="font-semibold">${app.course_name || "Course"}</h5>
      </div>
      <div class="p-4 text-sm text-gray-700 space-y-2">
        <p><i class="fas fa-user text-violet-600 mr-1"></i><strong>Applicant:</strong> ${
          app.full_name || "N/A"
        }</p>
        <p><i class="fas fa-info-circle text-violet-600 mr-1"></i><strong>Status:</strong>
          <span class="px-2 py-0.5 rounded text-xs ${
            app.status === "approved"
              ? "bg-green-100 text-green-700"
              : app.status === "rejected"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
          }">${app.status}</span>
        </p>
        <p class="text-xs text-gray-500">Submitted: ${new Date(app.created_at).toLocaleString()}</p>
      </div>
      <div class="p-4 border-t flex justify-end">
        <button onclick="window.location.href='admin-applications.html'"
          class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-xs flex items-center gap-1 shadow-sm transition">
          <i class="fas fa-eye"></i> View
        </button>
      </div>
    `;
    recentContainer.appendChild(card);
  });

  // --- Chart 1: Applicant Status ---
  const statusOptions = {
    chart: { type: "donut" },
    series: [approved, rejected, pending],
    labels: ["Approved", "Rejected", "Pending"],
    colors: ["#22c55e", "#ef4444", "#eab308"],
    legend: { position: "bottom" },
  };
  const statusChart = new ApexCharts(
    document.querySelector("#applicationsChart"),
    statusOptions,
  );
  statusChart.render();

  // --- Chart 2: Course Success (Approved Applicants per Course) ---
  const approvedByCourse = {};
  data.forEach((app) => {
    if (app.status === "approved") {
      approvedByCourse[app.course_name] =
        (approvedByCourse[app.course_name] || 0) + 1;
    }
  });

  const courseNames = Object.keys(approvedByCourse);
  const courseCounts = Object.values(approvedByCourse);

  const courseOptions = {
    chart: { type: "bar" },
    series: [{ name: "Approved Applicants", data: courseCounts }],
    xaxis: { categories: courseNames },
    colors: ["#22c55e"],
    plotOptions: {
      bar: {
        borderRadius: 6,
        horizontal: false,
      },
    },
    dataLabels: { enabled: true },
  };
  const courseChart = new ApexCharts(
    document.querySelector("#courseChart"),
    courseOptions,
  );
  courseChart.render();

  // --- Export CSV ---
  document.getElementById("exportCsvBtn").addEventListener("click", () => {
    const csvRows = [
      ["Full Name", "Course", "Status", "Created At"],
      ...data.map((app) => [
        app.full_name,
        app.course_name,
        app.status,
        new Date(app.created_at).toLocaleString(),
      ]),
    ];
    const csvContent = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "applications.csv";
    a.click();
    URL.revokeObjectURL(url);
  });
});
