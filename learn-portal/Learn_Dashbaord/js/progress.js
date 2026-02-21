// Fetch progress data for the logged-in user from Supabase
async function getUserProgress(registrationId) {
  if (!registrationId) {
    console.error("No registrationId found in sessionStorage");
    return [];
  }

  // Step 1: Get class progress joined with classes
  const { data, error } = await window.supabase
    .from("class_progress")
    .select(
      `
      progress,
      class_id,
      classes ( name, order_number )
    `,
    )
    .eq("registration_id", registrationId);

  if (error) {
    console.error("Error fetching class progress:", error);
    return [];
  }

  // ✅ Step 2: Sort in JS by order_number
  return (data || []).sort(
    (a, b) => a.classes.order_number - b.classes.order_number,
  );
}

// Dashboard cards (portal.html)
function getClassIcon(orderNumber) {
  switch (orderNumber) {
    case 1: // HTML Basics
    case 2: // HTML Advanced
      return "fab fa-html5";

    case 3: // CSS Basics
    case 4: // CSS Advanced
      return "fab fa-css3-alt";

    case 5: // JavaScript Basics
    case 6: // JavaScript Advanced
      return "fab fa-js";

    case 7: // Backend
      return "fab fa-node-js";

    case 8: // Final Project & Deployment
      return "fas fa-cloud-upload-alt";

    default:
      return "fas fa-book"; // fallback
  }
}

function renderClassCards(progressData) {
  const container = document.getElementById("class-progress");
  if (!container) return;
  container.innerHTML = "";

  progressData.forEach((row) => {
    const score = row.progress || 0;
    const hasAttempted = score > 0;

    const card = document.createElement("div");
    card.className =
      "bg-violet-700 text-white p-4 rounded-lg shadow hover:scale-105 transform transition duration-300 text-center flex flex-col items-center relative";

    const banner = hasAttempted
      ? `<span class="absolute top-2 right-2 bg-green-600 text-white text-xs sm:text-sm px-2 py-1 rounded"><i class="fas fa-check-circle"></i></span>`
      : `<span class="absolute top-2 right-2 bg-red-600 text-white text-xs sm:text-sm px-2 py-1 rounded"><i class="fas fa-times-circle"></i></span>`;

    const button = hasAttempted
      ? `<a href="../webClass/webClass${row.classes.order_number}.html" class="bg-green-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded font-semibold hover:bg-green-700 text-xs sm:text-sm">Review</a>`
      : `<a href="../webClass/webClass${row.classes.order_number}.html" class="bg-white text-violet-700 px-3 py-1 sm:px-4 sm:py-2 rounded font-semibold hover:bg-violet-200 text-xs sm:text-sm">Start</a>`;

    const iconClass = getClassIcon(row.classes.order_number);

    card.innerHTML = `
      ${banner}
      <i class="${iconClass} text-3xl sm:text-4xl mb-3"></i>
      <h4 class="font-bold text-base sm:text-lg mb-1">Class ${row.classes.order_number}</h4>
      <p class="text-xs sm:text-sm mb-3">${row.classes.name}</p>
      ${button}
    `;

    container.appendChild(card);
  });
}

// Progress page cards (progress.html)
function renderProgressCards(progressData) {
  const container = document.getElementById("class-progress");
  if (!container) return;
  container.innerHTML = "";

  progressData.forEach((row) => {
    const score = row.progress || 0;
    const hasAttempted = score > 0;

    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow p-4";

    card.innerHTML = `
      <h3 class="text-base md:text-lg font-bold text-violet-700 mb-2">
        Class ${row.classes.order_number}: ${row.classes.name}
      </h3>
      <div class="w-full bg-gray-200 rounded-full h-4 md:h-6 mb-2">
        <div class="h-4 md:h-6 rounded-full transition-all duration-500 ${hasAttempted ? "bg-green-600" : "bg-violet-600"}" 
             style="width:${hasAttempted ? "100" : score}%"></div>
      </div>
      <p class="text-xs md:text-sm font-medium">
        ${hasAttempted ? `Completed (Score: ${score}%)` : `${score}% completed`}
      </p>
    `;

    container.appendChild(card);
  });
}

// Overall performance (progress.html)
function renderOverall(progressData) {
  const overallBar = document.getElementById("overall-bar");
  const overallText = document.getElementById("overall-text");
  const overallQuote = document.getElementById("overall-quote");
  if (!overallBar) return;

  const totalClasses = progressData.length;
  const overall =
    progressData.reduce((sum, row) => sum + (row.progress || 0), 0) /
    totalClasses;

  overallBar.style.width = `${overall}%`;
  overallText.innerHTML = `
    <span class="flex items-center gap-2 text-lg sm:text-xl font-bold">
      <i class="fas fa-trophy text-yellow-500"></i> ${Math.round(overall)}% Overall Progress
    </span>
  `;

  if (overall === 100) {
    overallBar.classList.remove("bg-violet-600");
    overallBar.classList.add("bg-green-600");
    overallQuote.textContent =
      "🎉 Congratulations! You’ve completed all classes!";
  } else if (overall > 0) {
    overallQuote.textContent = "Keep going, you’re making great progress 💪";
  } else {
    overallQuote.textContent = "Every journey begins with a single step 🚀";
  }
}

// Main render function
async function renderProgress() {
  const registrationId = sessionStorage.getItem("registrationId"); // ✅ use registrationId
  if (!registrationId) return;

  const progressData = await getUserProgress(registrationId);

  if (document.getElementById("overall-bar")) {
    // Progress page
    renderProgressCards(progressData);
    renderOverall(progressData);
  } else {
    // Dashboard
    renderClassCards(progressData);
  }
}

document.addEventListener("DOMContentLoaded", renderProgress);
