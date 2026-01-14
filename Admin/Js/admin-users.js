// Load users from Supabase and inject into table
async function loadUsers() {
  try {
    const { data, error } = await window.supabase
      .from("profiles")
      .select(
        "id, full_name, email, phone_number, blocked, verified, is_admin, created_at"
      )
      .eq("is_admin", false); // only non-admin users

    if (error) {
      console.error("Error fetching users:", error.message);
      return;
    }

    const tbody = document.getElementById("userTableBody");
    tbody.innerHTML = "";

    data.forEach((user) => {
      const row = document.createElement("tr");
      row.classList.add("border-t");

      // Actions: block/unblock/delete depending on user state
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

      // Verification badge
      const verificationBadge = user.verified
        ? `<span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
             <i class="fas fa-check-circle"></i> Verified
           </span>`
        : `<span class="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
             <i class="fas fa-times-circle"></i> Not Verified
           </span>`;

      row.innerHTML = `
        <td class="p-2"><i class="fas fa-id-card text-violet-600 mr-1"></i> ${
          user.full_name || "N/A"
        }</td>
        <td class="p-2"><i class="fas fa-envelope text-violet-600 mr-1"></i> ${
          user.email || "N/A"
        }</td>
        <td class="p-2"><i class="fas fa-phone text-violet-600 mr-1"></i> ${
          user.phone_number || "N/A"
        }</td>
        <td class="p-2">${verificationBadge}</td>
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
      .from("profiles")
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
      .from("profiles")
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
      .from("profiles")
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
    .from("profiles")
    .select("full_name, email, phone_number, blocked, verified")
    .eq("is_admin", false);

  if (error) {
    console.error("Error exporting users:", error.message);
    return;
  }

  let csv = "Name,Email,Phone,Blocked,Verified\n";
  data.forEach((u) => {
    csv += `${u.full_name || ""},${u.email || ""},${u.phone_number || ""},${
      u.blocked ? "Yes" : "No"
    },${u.verified ? "Yes" : "No"}\n`;
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
