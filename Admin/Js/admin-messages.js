document.addEventListener("DOMContentLoaded", async () => {
  console.log("Admin Messages page loaded.");

  // Fetch the most recent application (adjust to fetch by user_id if needed)
  const { data, error } = await window.supabase
    .from("applications")
    .select("id, full_name, course_name, motivation, created_at")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    console.error("Error fetching application:", error.message);
    openErrorModal("Failed to load application data.");
    return;
  }

  if (data && data.length > 0) {
    const app = data[0];

    // Inject the first message (user motivation)
    const thread = document.getElementById("conversationThread");
    thread.innerHTML = `
      <div class="border rounded-lg p-4 bg-gray-50 shadow-sm">
        <h4 class="font-bold text-violet-700 mb-2 flex items-center gap-2">
          <i class="fas fa-user"></i> ${app.full_name} 
          <span class="text-gray-500 text-sm">(${app.course_name})</span>
        </h4>
        <p class="text-gray-700 text-sm leading-relaxed">
          ${app.motivation || "No motivation message provided."}
        </p>
        <small class="text-gray-400 text-xs">Submitted: ${new Date(
          app.created_at
        ).toLocaleString()}</small>
      </div>
    `;
  }
});

// --- Reply Modal Logic ---
function openReplyModal() {
  document.getElementById("replyModal").classList.remove("hidden");
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
  message = "Something went wrong while sending your reply."
) {
  document.getElementById("errorMessage").textContent = message;
  document.getElementById("errorModal").classList.remove("hidden");
}
function closeErrorModal() {
  document.getElementById("errorModal").classList.add("hidden");
}

// Expose globally so HTML onclick can access them
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

    // Save reply to Supabase (you may want a 'messages' table for this)
    const { error } = await window.supabase.from("messages").insert([
      {
        sender: "admin",
        message: replyText,
        created_at: new Date(),
      },
    ]);

    if (error) {
      console.error("Error saving reply:", error.message);
      closeReplyModal();
      openErrorModal("Failed to send reply. Please try again.");
      return;
    }

    // Close reply modal and show success modal
    closeReplyModal();
    openSuccessModal();

    // Append reply to conversation thread
    const thread = document.getElementById("conversationThread");
    const replyBlock = document.createElement("div");
    replyBlock.className = "border rounded-lg p-4 bg-violet-50 shadow-sm";
    replyBlock.innerHTML = `
    <h4 class="font-bold text-violet-700 mb-2 flex items-center gap-2">
      <i class="fas fa-user-shield"></i> Admin
    </h4>
    <p class="text-gray-700 text-sm leading-relaxed">${replyText}</p>
    <small class="text-gray-400 text-xs">Sent: ${new Date().toLocaleString()}</small>
  `;
    thread.appendChild(replyBlock);

    // Clear textarea
    this.querySelector("textarea").value = "";
  });
