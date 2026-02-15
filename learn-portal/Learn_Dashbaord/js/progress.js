// Fetch progress data for the logged-in user from Supabase
async function getUserProgress(userId) {
  const { data, error } = await window.supabase
    .from("registrations")
    .select("course_id, progress")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching progress:", error);
    return [];
  }

  return data || [];
}

// Dashboard cards (portal.html)
function renderClassCards(progressData) {
  const container = document.getElementById("class-progress");
  if (!container) return;
  container.innerHTML = "";

  const courses = [
    {
      title: "HTML Basics",
      icon: "fas fa-code",
      link: "./webClass/webClass1.html",
    },
    {
      title: "HTML Advanced",
      icon: "fas fa-file-code",
      link: "./webClass2.html",
    },
    {
      title: "CSS Basics",
      icon: "fas fa-paint-brush",
      link: "./webClass3.html",
    },
    {
      title: "CSS Advanced",
      icon: "fas fa-layer-group",
      link: "./webClass4.html",
    },
    {
      title: "JavaScript Basics",
      icon: "fas fa-laptop-code",
      link: "./webClass5.html",
    },
    {
      title: "JavaScript Advanced",
      icon: "fas fa-code-branch",
      link: "./webClass6.html",
    },
    {
      title: "Backend Basics",
      icon: "fas fa-server",
      link: "./webClass7.html",
    },
    {
      title: "Final Project & Deployment",
      icon: "fas fa-graduation-cap",
      link: "./webClass8.html",
    },
  ];

  courses.forEach((course, index) => {
    const row = progressData[index] || {};
    const score = row.progress || 0;
    const hasAttempted = score > 0;

    const card = document.createElement("div");
    card.className =
      "bg-violet-700 text-white p-4 rounded-lg shadow hover:scale-105 transform transition duration-300 text-center flex flex-col items-center relative";

    const banner = hasAttempted
      ? `<span class="absolute top-2 right-2 bg-green-600 text-white text-xs sm:text-sm px-2 py-1 rounded"><i class="fas fa-check-circle"></i></span>`
      : `<span class="absolute top-2 right-2 bg-red-600 text-white text-xs sm:text-sm px-2 py-1 rounded"><i class="fas fa-times-circle"></i></span>`;

    const button = hasAttempted
      ? `<a href="${course.link}" class="bg-green-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded font-semibold hover:bg-green-700 text-xs sm:text-sm">Review</a>`
      : `<a href="${course.link}" class="bg-white text-violet-700 px-3 py-1 sm:px-4 sm:py-2 rounded font-semibold hover:bg-violet-200 text-xs sm:text-sm">Start</a>`;

    card.innerHTML = `
      ${banner}
      <i class="${course.icon} text-3xl sm:text-4xl mb-3"></i>
      <h4 class="font-bold text-base sm:text-lg mb-1">Class ${index + 1}</h4>
      <p class="text-xs sm:text-sm mb-3">${course.title}</p>
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

  const courses = [
    "HTML Basics",
    "HTML Advanced",
    "CSS Basics",
    "CSS Advanced",
    "JavaScript Basics",
    "JavaScript Advanced",
    "Backend Basics",
    "Final Project & Deployment",
  ];

  courses.forEach((title, index) => {
    const row = progressData[index] || {};
    const score = row.progress || 0;
    const hasAttempted = score > 0;

    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow p-4";

    card.innerHTML = `
      <h3 class="text-base md:text-lg font-bold text-violet-700 mb-2">Class ${index + 1}: ${title}</h3>
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

  const totalClasses = 8;
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
  const userId = sessionStorage.getItem("userId");
  if (!userId) return;

  const progressData = await getUserProgress(userId);

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
