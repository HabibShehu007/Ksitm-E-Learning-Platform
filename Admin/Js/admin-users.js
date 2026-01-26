// Load users from Supabase and inject into table
async function loadUsers() {
  try {
    const { data, error } = await window.supabase
      .from("user_profiles")
      .select(
        "id, username, name, email, phone, blocked, enrollment_status, created_at",
      );

    if (error) {
      console.error("Error fetching users:", error.message);
      return;
    }

    const tbody = document.getElementById("userTableBody");
    tbody.innerHTML = "";

    data.forEach((user, index) => {
      const row = document.createElement("tr");
      row.classList.add("border-t", "font-semibold");

      // Actions
      let actions = `
        <button class="bg-red-500 text-white px-2 py-1 rounded text-xs" onclick="deleteUser('${user.id}')">
          <i class="fas fa-trash"></i>
        </button>
      `;

      if (user.blocked) {
        actions += `
          <button class="bg-green-500 text-white px-2 py-1 rounded text-xs" onclick="unblockUser('${user.id}')">
            <i class="fas fa-unlock"></i>
          </button>
        `;
      } else {
        actions += `
          <button class="bg-yellow-500 text-white px-2 py-1 rounded text-xs" onclick="blockUser('${user.id}')">
            <i class="fas fa-ban"></i>
          </button>
        `;
      }

      // Enrollment badge
      const enrollmentBadge =
        user.enrollment_status === "enrolled"
          ? `<span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs flex items-center gap-1">
               <i class="fas fa-check-circle"></i> Enrolled
             </span>`
          : `<span class="bg-red-100 text-red-700 px-2 py-1 rounded text-xs flex items-center gap-1">
               <i class="fas fa-times-circle"></i> Not Enrolled
             </span>`;

      row.innerHTML = `
        <td class="p-2">${index + 1}</td>
        <td class="p-2">${user.name || "N/A"}</td>
        <td class="p-2">${user.username || "N/A"}</td>
        <td class="p-2">${user.email || "N/A"}</td>
        <td class="p-2">${user.phone || "N/A"}</td>
        <td class="p-2">${enrollmentBadge}</td>
        <td class="p-2 flex gap-2">${actions}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

// Block user
async function blockUser(userId) {
  try {
    const { error } = await window.supabase
      .from("user_profiles")
      .update({ blocked: true })
      .eq("id", userId);

    if (error) {
      console.error("Error blocking user:", error.message);
      return;
    }
    loadUsers();
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

// Unblock user
async function unblockUser(userId) {
  try {
    const { error } = await window.supabase
      .from("user_profiles")
      .update({ blocked: false })
      .eq("id", userId);

    if (error) {
      console.error("Error unblocking user:", error.message);
      return;
    }
    loadUsers();
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

// Delete user
async function deleteUser(userId) {
  if (!confirm("Are you sure you want to delete this user?")) return;

  try {
    const { error } = await window.supabase
      .from("user_profiles")
      .delete()
      .eq("id", userId);

    if (error) {
      console.error("Error deleting user:", error.message);
      return;
    }
    loadUsers();
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

// Export users to CSV
async function exportUsers() {
  const { data, error } = await window.supabase
    .from("user_profiles")
    .select("name, username, email, phone, blocked, enrollment_status");

  if (error) {
    console.error("Error exporting users:", error.message);
    return;
  }

  let csv = "Name,Username,Email,Phone,Blocked,Enrollment Status\n";
  data.forEach((u) => {
    csv += `${u.name || ""},${u.username || ""},${u.email || ""},${
      u.phone || ""
    },${u.blocked ? "Yes" : "No"},${u.enrollment_status || "not_enrolled"}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "users.csv";
  a.click();
  URL.revokeObjectURL(url);
}

// Hook export button
document.getElementById("exportBtn").addEventListener("click", exportUsers);

// Load users on page load
loadUsers();
