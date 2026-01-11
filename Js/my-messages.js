document.addEventListener("DOMContentLoaded", () => {
  const replies = JSON.parse(localStorage.getItem("adminReplies")) || [];
  const list = document.getElementById("messageList");

  // Show "no messages" if empty
  if (replies.length === 0) {
    list.innerHTML = `
      <li class="text-gray-500 italic">No messages received yet.</li>
    `;
  } else {
    replies.forEach((msg, index) => {
      const item = document.createElement("li");
      item.className =
        "flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-2";
      item.innerHTML = `
        <div class="mb-2 md:mb-0">
          <strong class="text-violet-700">Message ${index + 1}:</strong> ${
        msg.message
      }<br>
          <small class="text-gray-500">${msg.timestamp}</small>
        </div>
        <button 
          class="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-violet-700 border border-violet-700 rounded-full hover:bg-violet-700 hover:text-white transition"
          data-index="${index}">
          <i class="fas fa-reply"></i> Reply
        </button>
      `;
      list.appendChild(item);
    });
  }

  // Modal logic
  const replyModal = document.getElementById("studentReplyModal");
  const replyForm = document.getElementById("studentReplyForm");
  const openBtn = document.getElementById("openReplyModal");
  const closeBtn = document.getElementById("closeReplyModal");

  // Open modal from main Reply button
  if (openBtn) {
    openBtn.addEventListener("click", () =>
      replyModal.classList.remove("hidden")
    );
  }

  // Open modal from message-specific Reply buttons
  list.addEventListener("click", (e) => {
    if (e.target.closest("button[data-index]")) {
      replyModal.classList.remove("hidden");
    }
  });

  // Close modal
  if (closeBtn) {
    closeBtn.addEventListener("click", () =>
      replyModal.classList.add("hidden")
    );
  }
  replyModal.addEventListener("click", (e) => {
    if (e.target === replyModal) replyModal.classList.add("hidden");
  });

  // Alerts
  const successAlert = document.getElementById("successAlert");
  const errorAlert = document.getElementById("errorAlert");

  // Handle form submission
  replyForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const replyText = this.querySelector("textarea").value.trim();
    const fileInput = this.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    if (!replyText) {
      errorAlert.classList.remove("hidden");
      successAlert.classList.add("hidden");
      setTimeout(() => errorAlert.classList.add("hidden"), 3000);
      return;
    }

    const reply = {
      message: replyText,
      timestamp: new Date().toLocaleString(),
      attachment: file ? file.name : null,
    };

    const existing = JSON.parse(localStorage.getItem("studentReplies")) || [];
    existing.push(reply);
    localStorage.setItem("studentReplies", JSON.stringify(existing));

    // Show success alert
    successAlert.classList.remove("hidden");
    errorAlert.classList.add("hidden");
    setTimeout(() => successAlert.classList.add("hidden"), 3000);

    // Close modal + reset form
    replyModal.classList.add("hidden");
    this.reset();
  });
});
