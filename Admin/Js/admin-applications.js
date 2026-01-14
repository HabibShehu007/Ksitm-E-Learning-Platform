// Load applications from Supabase and inject into table
async function loadApplications() {
  try {
    const { data, error } = await window.supabase
      .from("applications")
      .select(
        "id, full_name, email, course_name, status, dob, gender, phone, address, motivation, start_date, created_at"
      );

    if (error) {
      console.error("Error fetching applications:", error.message);
      return;
    }

    const tbody = document.getElementById("applicationTableBody");
    tbody.innerHTML = "";

    data.forEach((app) => {
      const row = document.createElement("tr");
      row.classList.add("border-t");

      // Status badge
      let statusBadge = "";
      if (app.status === "approved") {
        statusBadge =
          '<span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs"><i class="fas fa-check-circle"></i> Approved</span>';
      } else if (app.status === "rejected") {
        statusBadge =
          '<span class="bg-red-100 text-red-700 px-2 py-1 rounded text-xs"><i class="fas fa-times-circle"></i> Rejected</span>';
      } else {
        statusBadge =
          '<span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs"><i class="fas fa-hourglass-half"></i> Pending</span>';
      }

      // Actions
      const actions = `
        <button class="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1" onclick="updateStatus('${
          app.id
        }', 'approved')">
          <i class="fas fa-check"></i> Approve
        </button>
        <button class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1" onclick="updateStatus('${
          app.id
        }', 'rejected')">
          <i class="fas fa-times"></i> Reject
        </button>
        <button class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1" onclick="openViewModal(${JSON.stringify(
          app
        )})">
          <i class="fas fa-eye"></i> View
        </button>
      `;

      row.innerHTML = `
        <td class="p-2">${app.full_name || "N/A"}</td>
        <td class="p-2">${app.email || "N/A"}</td>
        <td class="p-2">${app.course_name || "N/A"}</td>
        <td class="p-2">${statusBadge}</td>
        <td class="p-2 flex gap-2">${actions}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

// Update application status
async function updateStatus(appId, newStatus) {
  try {
    const { error } = await window.supabase
      .from("applications")
      .update({ status: newStatus })
      .eq("id", appId);

    if (error) {
      console.error("Error updating status:", error.message);
      return;
    }
    loadApplications(); // refresh table
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

// View Modal logic
function openViewModal(app) {
  document.getElementById("modalContent").innerHTML = `
    <p><strong>Name:</strong> ${app.full_name || "N/A"}</p>
    <p><strong>Email:</strong> ${app.email || "N/A"}</p>
    <p><strong>Course:</strong> ${app.course_name || "N/A"}</p>
    <p><strong>Status:</strong> ${app.status || "Pending"}</p>
    <p><strong>DOB:</strong> ${app.dob || "N/A"}</p>
    <p><strong>Gender:</strong> ${app.gender || "N/A"}</p>
    <p><strong>Phone:</strong> ${app.phone || "N/A"}</p>
    <p><strong>Address:</strong> ${app.address || "N/A"}</p>
    <p><strong>Motivation:</strong> ${app.motivation || "N/A"}</p>
    <p><strong>Start Date:</strong> ${app.start_date || "N/A"}</p>
    <p><strong>Submitted At:</strong> ${app.created_at || "N/A"}</p>
  `;
  document.getElementById("viewModal").classList.remove("hidden");
}

function closeViewModal() {
  document.getElementById("viewModal").classList.add("hidden");
}

// Load applications on page load
loadApplications();
