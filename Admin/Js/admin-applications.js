// --- Globals ---
let selectedApplicationId = null;
let selectedUserId = null;

// ------------------ Load Applications ------------------
export async function loadApplications() {
  try {
    const statusFilter = document.getElementById("statusFilter").value;
    const courseFilter = document.getElementById("courseFilter").value.trim();

    let query = window.supabase
      .from("applications")
      .select(
        "id, user_id, full_name, email, course_name, status, dob, gender, phone, address, motivation, start_date, created_at",
      )
      .order("created_at", { ascending: false });

    if (statusFilter) query = query.eq("status", statusFilter);
    if (courseFilter) query = query.ilike("course_name", `%${courseFilter}%`);

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching applications:", error);
      alert(
        "Failed to load applications: " +
          (error.message || JSON.stringify(error)),
      );
      return;
    }

    const tbody = document.getElementById("applicationTableBody");
    tbody.innerHTML = "";

    data.forEach((app) => {
      const row = document.createElement("tr");
      row.classList.add("border-t");

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

      let actions = "";
      if (app.status === "pending") {
        actions = `
          <button class="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
            onclick="approveApplication('${app.id}', '${app.user_id}', '${app.course_name}', '${app.full_name}')">
            <i class="fas fa-check"></i> Approve
          </button>
          <button class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
            onclick="rejectApplication('${app.id}', '${app.user_id}', '${app.full_name}')">
            <i class="fas fa-times"></i> Reject
          </button>
        `;
      } else if (app.status === "approved") {
        actions = `
          <button class="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
            onclick="deleteAdmission('${app.id}', '${app.user_id}', '${app.full_name}')">
            <i class="fas fa-trash"></i> Delete Admission
          </button>
        `;
      } else if (app.status === "rejected") {
        actions = `
          <button class="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
            onclick="approveApplication('${app.id}', '${app.user_id}', '${app.course_name}', '${app.full_name}')">
            <i class="fas fa-check"></i> Approve
          </button>
          <button class="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
            onclick="deleteAdmission('${app.id}', '${app.user_id}', '${app.full_name}')">
            <i class="fas fa-trash"></i> Delete Admission
          </button>
        `;
      }

      actions += `
        <button class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
          onclick='openViewModal(${JSON.stringify(app)})'>
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
    alert("Unexpected error occurred.");
  }
}

// ------------------ Approve Application ------------------
export async function approveApplication(appId, userId, courseName, fullName) {
  try {
    const { data: courseData, error: courseError } = await window.supabase
      .from("courses")
      .select("id, name")
      .eq("name", courseName)
      .single();

    if (courseError) {
      console.error("Course fetch error:", courseError.message);
      alert("Course not found in courses table!");
      return;
    }

    const courseId = courseData.id;

    // Sequential registration number
    const year = new Date().getFullYear();
    const prefix = "ELP/KSITM/" + courseName.substring(0, 3).toUpperCase();

    const startOfYear = new Date(year, 0, 1).toISOString();
    const endOfYear = new Date(year, 11, 31, 23, 59, 59).toISOString();

    const { count, error: regError } = await window.supabase
      .from("registrations")
      .select("id", { count: "exact", head: true })
      .eq("course_id", courseId)
      .gte("created_at", startOfYear)
      .lte("created_at", endOfYear);

    if (regError) {
      console.error("Error counting registrations:", regError);
      return;
    }

    const sequence = String((count || 0) + 1).padStart(3, "0");
    const regNumber = `${prefix}/${year}/${sequence}`;
    console.log("Generated Registration Number:", regNumber);

    await window.supabase.from("registrations").insert({
      user_id: userId,
      course_id: courseId,
      registration_number: regNumber,
      created_at: new Date().toISOString(),
    });

    await window.supabase
      .from("applications")
      .update({ status: "approved" })
      .eq("id", appId);

    const messageText = `🎉 Congratulations ${fullName}! Your admission has been approved.\n\nCourse: ${courseName}\nRegistration Number: ${regNumber}\n\nPlease copy and keep these credentials safe.`;

    await window.supabase.from("messages").insert({
      user_id: userId,
      sender: "system",
      message: messageText,
      created_at: new Date().toISOString(),
    });

    showStatusMessageModal(messageText, true);
    await loadApplications();
  } catch (err) {
    console.error("Error approving application:", err);
  }
}

// ------------------ Reject Application ------------------
export async function rejectApplication(appId, userId, fullName) {
  try {
    await window.supabase
      .from("applications")
      .update({ status: "rejected" })
      .eq("id", appId);

    const messageText = `❌ Dear ${fullName}, your application has been rejected.`;

    await window.supabase.from("messages").insert({
      user_id: userId,
      sender: "system",
      message: messageText,
      created_at: new Date().toISOString(),
    });

    showStatusMessageModal(messageText, false);
    await loadApplications();
  } catch (err) {
    console.error("Error rejecting application:", err.message);
  }
}

// ------------------ Delete Admission ------------------
export async function deleteAdmission(appId, userId, fullName) {
  try {
    await window.supabase.from("registrations").delete().eq("user_id", userId);
    await window.supabase.from("applications").delete().eq("id", appId);

    const messageText = `⚠️ Dear ${fullName}, your admission has been deleted due to administrative reasons. Please contact admin via the messaging page for more information.`;

    await window.supabase.from("messages").insert({
      user_id: userId,
      sender: "system",
      message: messageText,
      created_at: new Date().toISOString(),
    });

    showStatusMessageModal(messageText, false);
    await loadApplications();
  } catch (err) {
    console.error("Error deleting admission:", err.message);
  }
}

// ------------------ View Modal ------------------
export function openViewModal(app) {
  let enrollmentBadge = "";
  if (app.status === "approved") {
    enrollmentBadge =
      '<span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs flex items-center gap-1"><i class="fas fa-check-circle"></i> Enrolled</span>';
  } else if (app.status === "rejected") {
    enrollmentBadge =
      '<span class="bg-red-100 text-red-700 px-2 py-1 rounded text-xs flex items-center gap-1"><i class="fas fa-times-circle"></i> Rejected</span>';
  } else {
    enrollmentBadge =
      '<span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs flex items-center gap-1"><i class="fas fa-hourglass-half"></i> Pending</span>';
  }

  document.getElementById("modalContent").innerHTML = `
    <div class="flex items-center gap-2">
      <i class="fas fa-user text-violet-500"></i>
      <span><strong>Name:</strong> ${app.full_name || "N/A"}</span>
    </div>
    <div class="flex items-center gap-2">
      <i class="fas fa-envelope text-violet-500"></i>
      <span><strong>Email:</strong> ${app.email || "N/A"}</span>
    </div>
    <div class="flex items-center gap-2">
      <i class="fas fa-graduation-cap text-violet-500"></i>
      <span><strong>Course:</strong> ${app.course_name || "N/A"}</span>
    </div>
    <div class="flex items-center gap-2">
      <i class="fas fa-info-circle text-violet-500"></i>
      <span><strong>Status:</strong> ${app.status || "Pending"}</span>
    </div>
    <div class="flex items-center gap-2">
      <i class="fas fa-id-badge text-violet-500"></i>
      <span><strong>Enrollment:</strong> ${enrollmentBadge}</span>
    </div>
    <div class="flex items-center gap-2">
      <i class="fas fa-calendar text-violet-500"></i>
      <span><strong>DOB:</strong> ${app.dob || "N/A"}</span>
    </div>
    <div class="flex items-center gap-2">
      <i class="fas fa-venus-mars text-violet-500"></i>
      <span><strong>Gender:</strong> ${app.gender || "N/A"}</span>
    </div>
    <div class="flex items-center gap-2">
      <i class="fas fa-phone text-violet-500"></i>
      <span><strong>Phone:</strong> ${app.phone || "N/A"}</span>
    </div>
    <div class="flex items-center gap-2">
      <i class="fas fa-map-marker-alt text-violet-500"></i>
      <span><strong>Address:</strong> ${app.address || "N/A"}</span>
    </div>
    <div class="flex items-center gap-2">
      <i class="fas fa-lightbulb text-violet-500"></i>
      <span><strong>Motivation:</strong> ${app.motivation || "N/A"}</span>
    </div>
    <div class="flex items-center gap-2">
      <i class="fas fa-calendar-check text-violet-500"></i>
      <span><strong>Start Date:</strong> ${app.start_date || "N/A"}</span>
    </div>
    <div class="flex items-center gap-2">
      <i class="fas fa-clock text-violet-500"></i>
      <span><strong>Submitted At:</strong> ${app.created_at || "N/A"}</span>
    </div>
  `;

  document.getElementById("viewModal").classList.remove("hidden");
}

export function closeViewModal() {
  document.getElementById("viewModal").classList.add("hidden");
}

/// Initialization
document.addEventListener("DOMContentLoaded", () => {
  loadApplications();
});

// Exposed functions
window.loadApplications = loadApplications;
window.approveApplication = approveApplication;
window.rejectApplication = rejectApplication;
window.deleteAdmission = deleteAdmission;
window.openViewModal = openViewModal;
window.closeViewModal = closeViewModal;
