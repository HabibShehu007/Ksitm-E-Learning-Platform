document.addEventListener("DOMContentLoaded", async () => {
  if (!window.supabase) {
    console.error(
      "Supabase not initialized. Make sure client script is loaded before this file.",
    );
    return;
  }

  // Get logged-in user
  const {
    data: { user },
    error,
  } = await window.supabase.auth.getUser();
  if (error) {
    console.error("Auth error:", error.message);
    return;
  }
  if (!user) {
    console.log("No logged-in user, messages disabled.");
    return;
  }

  const userId = user.id;
  const userName = user.user_metadata?.name || user.email || "You";

  // Render messages into the list with threading
  function renderMessages(messages) {
    const list = document.getElementById("messageList");
    list.innerHTML = "";

    if (!messages || messages.length === 0) {
      list.innerHTML = `<li class="text-gray-500 italic">No messages received yet.</li>`;
      return;
    }

    // Render all system messages (not just the first)
    messages
      .filter((m) => m.sender === "system")
      .forEach((sysMsg) => {
        const card = document.createElement("li");
        card.className =
          "bg-violet-50 border border-violet-200 rounded-lg p-4 shadow-sm";

        // Detect reg number line and wrap it with Tailwind styling
        let formattedMessage = sysMsg.message;
        const match = sysMsg.message.match(/Registration Number:\s*(.+)/);
        if (match) {
          const regNumber = match[1].trim();
          formattedMessage = sysMsg.message.replace(
            match[0],
            `Registration Number: <span class="font-bold text-white bg-gray-500 px-2 py-1 rounded">${regNumber}</span>`,
          );
        }

        card.innerHTML = `
      <div class="flex items-center gap-2 mb-2">
        <i class="fas fa-star text-violet-600"></i>
        <span class="font-semibold text-violet-700">System Notice</span>
      </div>
      <p class="text-gray-700 text-sm whitespace-pre-line">${formattedMessage}</p>
      <div class="mt-3 flex gap-2">
        <button class="bg-violet-600 hover:bg-violet-700 text-white px-3 py-1 rounded text-xs flex items-center gap-1 copySystemMessage">
          <i class="fas fa-copy"></i> Copy
        </button>
      </div>
    `;

        list.prepend(card);

        // Copy button logic for this system message
        const copyBtn = card.querySelector(".copySystemMessage");
        copyBtn.onclick = () => {
          const regNumber = match ? match[1].trim() : sysMsg.message;
          navigator.clipboard.writeText(regNumber);
          copyBtn.textContent = "Copied!";
          setTimeout(() => (copyBtn.textContent = "Copy"), 2000);
        };
      });

    // Build map for threading
    const msgMap = {};
    messages.forEach((m) => {
      msgMap[m.id] = { ...m, replies: [] };
    });
    messages.forEach((m) => {
      if (m.reply_to && msgMap[m.reply_to]) {
        msgMap[m.reply_to].replies.push(m);
      }
    });

    // Render parents (excluding system message so it doesn't duplicate)
    messages
      .filter((m) => !m.reply_to && m.sender !== "system")
      .forEach((msg) => {
        const parent = msgMap[msg.id];
        const senderLabel = msg.sender === "admin" ? "Admin" : userName;
        const iconClass =
          msg.sender === "admin"
            ? "fa-user-shield text-violet-600"
            : "fa-user text-orange-600";

        const item = document.createElement("li");
        item.className =
          "border rounded-xl p-6 bg-gradient-to-r from-violet-50 to-white shadow mb-6";

        item.innerHTML = `
        <div class="flex justify-between items-center mb-3">
          <span class="font-semibold text-violet-700 flex items-center gap-2">
            <i class="fas ${iconClass}"></i> ${senderLabel}
          </span>
          <small class="text-gray-500">${new Date(msg.created_at).toLocaleString()}</small>
        </div>
        <p class="text-gray-800 text-base leading-relaxed">${msg.message}</p>
        <div class="mt-3 text-right">
          ${
            msg.sender === "admin"
              ? `
            <button 
              class="text-violet-700 text-xs font-medium hover:underline"
              onclick="openReplyModal('${msg.id}', '${senderLabel}')">
              <i class="fas fa-reply"></i> Reply
            </button>`
              : ""
          }
        </div>
      `;

        // Replies
        if (parent.replies && parent.replies.length > 0) {
          const replyList = document.createElement("ul");
          replyList.className = "ml-6 mt-4 space-y-3";

          replyList.innerHTML = `
          <li class="italic text-gray-500 mb-2">
            ↳ Replies to: "${msg.message}"
          </li>
        `;

          parent.replies.forEach((r) => {
            const rSender = r.sender === "admin" ? "Admin" : userName;
            const bubbleColor =
              r.sender === "admin"
                ? "bg-violet-100 border-l-4 border-violet-400"
                : "bg-orange-100 border-l-4 border-orange-400";

            replyList.innerHTML += `
            <li class="${bubbleColor} rounded-lg p-3 shadow-sm">
              <div class="flex justify-between items-center mb-1">
                <span class="font-semibold text-violet-700 flex items-center gap-2">
                  <i class="fas fa-reply"></i> ${rSender}
                </span>
                <small class="text-gray-500">${new Date(r.created_at).toLocaleString()}</small>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed">${r.message}</p>
            </li>
          `;
          });
          item.appendChild(replyList);
        }

        list.appendChild(item);
      });
  }

  window.renderMessages = renderMessages;

  // Fetch messages from Supabase
  async function fetchMessages() {
    const { data, error } = await window.supabase
      .from("messages")
      .select("id, user_id, sender, message, reply_to, created_at, attachment")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error.message);
      return;
    }
    renderMessages(data);
  }
  window.fetchMessages = fetchMessages;

  await fetchMessages();

  // Realtime listener for new messages
  window.supabase
    .channel("user-messages")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        console.log("New message:", payload.new);
        fetchMessages();
      },
    )
    .subscribe();

  // Modal controls
  const replyModal = document.getElementById("studentReplyModal");
  const replyForm = document.getElementById("studentReplyForm");
  const closeBtn = document.getElementById("closeReplyModal");

  window.openReplyModal = function (messageId, senderLabel) {
    replyModal.classList.remove("hidden");
    document.getElementById("replyModalTitle").innerHTML = `
      <i class="fas fa-reply text-violet-700"></i> Replying to ${senderLabel}
    `;
    replyModal.dataset.messageId = messageId;
  };

  if (closeBtn) {
    closeBtn.addEventListener("click", () =>
      replyModal.classList.add("hidden"),
    );
  }
  replyModal.addEventListener("click", (e) => {
    if (e.target === replyModal) replyModal.classList.add("hidden");
  });

  // Alerts
  const successAlert = document.getElementById("successAlert");
  const errorAlert = document.getElementById("errorAlert");

  // Handle reply form submission
  replyForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const replyText = document.getElementById("replyText").value.trim();
    const fileInput = document.getElementById("replyFile");
    const file = fileInput.files[0];

    if (!replyText) {
      errorAlert.classList.remove("hidden");
      successAlert.classList.add("hidden");
      setTimeout(() => errorAlert.classList.add("hidden"), 3000);
      return;
    }

    const parentId = replyModal.dataset.messageId;

    const { error } = await window.supabase.from("messages").insert({
      user_id: userId,
      sender: "student",
      message: replyText,
      attachment: file ? file.name : null,
      reply_to: parentId,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Error sending reply:", error.message);
      errorAlert.classList.remove("hidden");
      successAlert.classList.add("hidden");
      setTimeout(() => errorAlert.classList.add("hidden"), 3000);
    } else {
      successAlert.classList.remove("hidden");
      errorAlert.classList.add("hidden");
      setTimeout(() => successAlert.classList.add("hidden"), 3000);

      replyModal.classList.add("hidden");
      replyForm.reset();
      fetchMessages();
    }
  });
});
