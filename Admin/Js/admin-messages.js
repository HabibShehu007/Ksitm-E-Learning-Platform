document.addEventListener("DOMContentLoaded", async () => {
  console.log("Admin Messages page loaded.");

  if (!window.supabase) {
    console.error("Supabase not initialized");
    return;
  }

  // Get logged-in admin
  const {
    data: { user: admin },
    error: adminError,
  } = await window.supabase.auth.getUser();
  if (adminError) {
    console.error("Auth error:", adminError.message);
    return;
  }
  if (!admin) {
    console.log("No logged-in admin");
    return;
  }
  window.currentAdminId = admin.id;

  // Fetch all applications to build userId → full_name map
  const { data: apps, error: appsError } = await window.supabase
    .from("applications")
    .select("user_id, full_name, course_name");

  if (appsError) {
    console.error("Error fetching applications:", appsError.message);
    openErrorModal("Failed to load user names.");
    return;
  }

  const userMap = {};
  apps.forEach((app) => {
    userMap[app.user_id] = app.full_name || "Unknown User";
  });

  // Fetch all messages
  const { data: messages, error } = await window.supabase
    .from("messages")
    .select("id, user_id, sender, message, reply_to, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching messages:", error.message);
    openErrorModal("Failed to load messages.");
    return;
  }

  renderAdminMessages(messages, userMap);
});

// --- Render Logic ---
function renderAdminMessages(messages, userMap) {
  const thread = document.getElementById("conversationThread");
  thread.innerHTML = "";

  // Get all admin parent messages
  const adminMessages = messages.filter(
    (m) => m.sender === "admin" && !m.reply_to,
  );

  adminMessages.forEach((adminMsg) => {
    const item = document.createElement("div");
    item.className = "border rounded-lg p-6 bg-violet-50 shadow mb-6";

    item.innerHTML = `
      <h6 class="font-semibold text-violet-700 mb-2 flex items-center gap-2">
        <i class="fas fa-user-shield"></i> Admin
      </h6>
      <p class="text-gray-800 mb-4">${adminMsg.message}</p>
      <small class="text-gray-500">${new Date(adminMsg.created_at).toLocaleString()}</small>
    `;

    // Find replies grouped by user
    const replies = messages.filter((m) => m.reply_to === adminMsg.id);
    const grouped = {};
    replies.forEach((r) => {
      if (!grouped[r.user_id]) grouped[r.user_id] = [];
      grouped[r.user_id].push(r);
    });

    // Render each user’s thread
    Object.keys(grouped).forEach((userId) => {
      const userReplies = grouped[userId];
      const displayName = userMap[userId] || userId; // use full_name if available

      const threadBlock = document.createElement("div");
      threadBlock.className =
        "mt-4 ml-6 border-l-4 border-violet-300 pl-4 bg-white rounded-lg shadow-sm";

      threadBlock.innerHTML = `
        <h6 class="font-semibold text-orange-600 mb-2">Replies from User ${displayName}</h6>
        <ul class="space-y-2"></ul>
        <button
          class="mt-2 text-xs text-violet-700 hover:underline"
          onclick="openReplyModal('${userId}', '${displayName}')"
        >
          <i class="fas fa-reply"></i> Reply to ${displayName}
        </button>
      `;

      const ul = threadBlock.querySelector("ul");
      userReplies.forEach((r) => {
        const li = document.createElement("li");
        li.className = "bg-gray-50 rounded p-3 shadow-sm";
        li.innerHTML = `
          <div class="flex justify-between items-center mb-1">
            <span class="font-semibold text-violet-700"><i class="fas fa-user"></i> ${displayName}</span>
            <small class="text-gray-500">${new Date(r.created_at).toLocaleString()}</small>
          </div>
          <p class="text-gray-700 text-sm">${r.message}</p>
        `;
        ul.appendChild(li);
      });

      item.appendChild(threadBlock);
    });

    thread.appendChild(item);
  });
}

// --- Reply Modal Logic ---
function openReplyModal(userId, displayName) {
  const modal = document.getElementById("replyModal");
  modal.classList.remove("hidden");
  window.currentUserId = userId; // store target user
  document.getElementById("replyModalTitle").innerHTML = `
    <i class="fas fa-reply text-violet-700"></i> Reply to ${displayName}
  `;
}
function closeReplyModal() {
  document.getElementById("replyModal").classList.add("hidden");
}

// --- Success Modal Logic ---
function openSuccessModal() {
  document.getElementById("successModal").classList.remove("hidden");
}
function closeSuccessModal() {
  document.getElementById("successModal").classList.add("hidden");
}

// --- Error Modal Logic ---
function openErrorModal(
  message = "Something went wrong while sending your reply.",
) {
  document.getElementById("errorMessage").textContent = message;
  document.getElementById("errorModal").classList.remove("hidden");
}
function closeErrorModal() {
  document.getElementById("errorModal").classList.add("hidden");
}

// Expose globally
window.openReplyModal = openReplyModal;
window.closeReplyModal = closeReplyModal;
window.openSuccessModal = openSuccessModal;
window.closeSuccessModal = closeSuccessModal;
window.openErrorModal = openErrorModal;
window.closeErrorModal = closeErrorModal;

// --- Handle Reply Submission ---
document
  .getElementById("replyForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const replyText = this.querySelector("textarea").value.trim();

    if (!replyText) {
      openErrorModal("Reply cannot be empty!");
      return;
    }

    if (!window.currentUserId || !window.currentAdminId) {
      openErrorModal("Missing user or admin reference.");
      return;
    }

    const { error } = await window.supabase.from("messages").insert([
      {
        user_id: window.currentUserId,
        admin_id: window.currentAdminId,
        sender: "admin",
        message: replyText,
        reply_to: null,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Error saving reply:", error.message);
      closeReplyModal();
      openErrorModal("Failed to send reply. Please try again.");
      return;
    }

    closeReplyModal();
    openSuccessModal();

    // Refresh messages
    const { data: messages } = await window.supabase
      .from("messages")
      .select("id, user_id, sender, message, reply_to, created_at")
      .order("created_at", { ascending: true });

    // Reuse userMap from applications
    const { data: apps } = await window.supabase
      .from("applications")
      .select("user_id, full_name, course_name");
    const userMap = {};
    apps.forEach((app) => {
      userMap[app.user_id] = app.full_name || "Unknown User";
    });

    renderAdminMessages(messages, userMap);

    this.querySelector("textarea").value = "";
  });
