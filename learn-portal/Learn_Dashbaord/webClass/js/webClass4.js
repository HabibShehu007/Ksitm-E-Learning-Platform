// webClass2.js
import { submitQuiz } from "./submitQuiz.js";

document.addEventListener("DOMContentLoaded", () => {
  // Define modules for Class 2
  const module1 = {
    id: 1, // replace with actual UUID from Supabase
    type: "theory",
    title: "Module 1: Introduction to Advanced CSS",
    content: `
    <div class="space-y-8">

      <section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm">
  <div class="flex-shrink-0 text-violet-700 text-3xl mb-3 sm:mb-0">
    <i class="fas fa-th"></i>
  </div>
  <div class="w-full">
    <h3 class="text-xl font-bold text-violet-800 mb-2">CSS Grid Layout</h3>
    <p class="text-gray-900 font-medium leading-relaxed">
      CSS Grid is a powerful system for creating two‑dimensional layouts. It allows precise control over rows and columns.
    </p>
    <div class="overflow-x-auto mt-3">
      <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
&lt;!-- HTML --&gt;
&lt;div class="grid"&gt;
  &lt;div&gt;1&lt;/div&gt;
  &lt;div&gt;2&lt;/div&gt;
  &lt;div&gt;3&lt;/div&gt;
&lt;/div&gt;

&lt;!-- CSS --&gt;
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
      </pre>
    </div>
  </div>
</section>

<section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm">
  <div class="flex-shrink-0 text-green-600 text-3xl mb-3 sm:mb-0">
    <i class="fas fa-code"></i>
  </div>
  <div class="w-full">
    <h3 class="text-xl font-bold text-green-700 mb-2">CSS Variables</h3>
    <p class="text-gray-900 font-medium leading-relaxed">
      CSS variables (custom properties) let you reuse values across your stylesheet, making themes and maintenance easier.
    </p>
    <div class="overflow-x-auto mt-3">
      <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
&lt;!-- HTML --&gt;
&lt;div class="card"&gt;Reusable Colors&lt;/div&gt;

&lt;!-- CSS --&gt;
:root {
  --main-bg: #4a90e2;
  --main-color: white;
}

.card {
  background-color: var(--main-bg);
  color: var(--main-color);
  padding: 20px;
}
      </pre>
    </div>
  </div>
</section>
<section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm">
  <div class="flex-shrink-0 text-blue-600 text-3xl mb-3 sm:mb-0">
    <i class="fas fa-wave-square"></i>
  </div>
  <div class="w-full">
    <h3 class="text-xl font-bold text-blue-700 mb-2">CSS Transitions & Animations</h3>
    <p class="text-gray-900 font-medium leading-relaxed">
      Transitions and animations bring interactivity to your designs. They allow smooth changes of properties over time.
    </p>
    <div class="overflow-x-auto mt-3">
      <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
&lt;!-- HTML --&gt;
&lt;button class="btn"&gt;Hover Me&lt;/button&gt;

&lt;!-- CSS --&gt;
.btn {
  background-color: teal;
  color: white;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: darkcyan;
}
      </pre>
    </div>
  </div>
</section>
<section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm">
  <div class="flex-shrink-0 text-violet-700 text-3xl mb-3 sm:mb-0">
    <i class="fas fa-mobile-alt"></i>
  </div>
  <div class="w-full">
    <h3 class="text-xl font-bold text-violet-800 mb-2">Responsive Design</h3>
    <p class="text-gray-900 font-medium leading-relaxed">
      Media queries allow your site to adapt to different screen sizes, ensuring a consistent experience across devices.
    </p>
    <div class="overflow-x-auto mt-3">
      <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
&lt;!-- CSS --&gt;
.container {
  width: 100%;
  padding: 20px;
}

@media (max-width: 600px) {
  .container {
    background-color: lightgray;
  }
}
      </pre>
    </div>
  </div>
</section>
    </div>
    <!-- Conclusion Section -->
<section class="bg-violet-800 text-white p-6 rounded-lg shadow-lg mt-12 max-w-3xl mx-auto text-center">
  <div class="mb-4 flex justify-center">
    <i class="fas fa-award text-5xl text-yellow-400"></i>
  </div>
  <div>
    <h3 class="text-2xl font-bold mb-3">Module 1 Completed</h3>
    <p class="text-base leading-relaxed">
      You’ve completed <strong>Advanced CSS Module 1</strong>, covering grid layouts, variables, transitions, and responsive design.  
      In <strong>Module 2</strong>, you’ll see these techniques applied in practice through a hands‑on demonstration.
    </p>
  </div>
</section>
  `,
  };

  const module2 = {
    id: 2, // replace with actual UUID
    type: "video",
    title: "Module 2: Know Advanced CSS in 20 Minutes",
    videoUrl: "https://www.youtube.com/embed/l1mER1bV0N0",
    conclusion: `
      <!-- Conclusion Section -->
<section class="bg-violet-800 text-white p-6 rounded-lg shadow-lg mt-8 text-center">
  <div class="mb-4 flex justify-center">
    <i class="fas fa-lightbulb text-4xl text-yellow-400"></i>
  </div>
  <h3 class="text-xl font-bold mb-2">Next: Final Quiz</h3>
  <p class="text-base leading-relaxed">
    You’ve explored advanced CSS techniques including grid layouts, variables, transitions, and responsive design.  
    In the next module, you’ll test your knowledge with a quiz to reinforce these skills.
  </p>
</section>


    `,
  };

  const module3 = {
    id: "abcd51e1-00d7-4cfb-a19f-71dd1c4802ca", // ✅ real UUID from Supabase
    type: "exam",
    title: "Final Module: Advanced CSS Quiz",
    questions: [
      {
        question:
          "Which CSS property defines the number and size of columns in a grid layout?",
        options: [
          "grid-template-rows",
          "grid-template-columns",
          "grid-columns",
          "columns",
        ],
        answer: 1,
      },
      {
        question:
          "Which CSS function is used to reference a custom property (variable)?",
        options: ["var()", "custom()", "property()", "ref()"],
        answer: 0,
      },
      {
        question: "Which CSS property is commonly animated with transitions?",
        options: ["color", "background-color", "transform", "All of the above"],
        answer: 3,
      },
      {
        question:
          "Which CSS rule allows styles to change based on screen size?",
        options: ["@media", "@screen", "@responsive", "@device"],
        answer: 0,
      },
      {
        question:
          "In CSS Grid, which property sets the space between rows and columns?",
        options: ["gap", "spacing", "margin", "padding"],
        answer: 0,
      },
      {
        question: "Which unit is relative to the root element’s font size?",
        options: ["em", "rem", "%", "px"],
        answer: 1,
      },
      {
        question: "Which property defines the duration of a transition?",
        options: [
          "transition-time",
          "transition-duration",
          "animation-duration",
          "time",
        ],
        answer: 1,
      },
      {
        question:
          "Which CSS property is used to create flexible layouts along a single axis?",
        options: ["flex", "display: flex", "grid", "inline-flex"],
        answer: 1,
      },
      {
        question:
          "Which CSS property allows you to control the order of flex items?",
        options: ["flex-order", "order", "item-order", "z-index"],
        answer: 1,
      },
      {
        question:
          "Which CSS feature allows defining reusable theme values like colors?",
        options: ["CSS Variables", "Mixins", "Functions", "Constants"],
        answer: 0,
      },
    ],
  };

  const courseModules = [module1, module2, module3];
  window.courseModules = courseModules; // expose for debugging
  const container = document.getElementById("modules4");
  console.log("Container found:", !!container);
  console.log("Modules length:", courseModules.length);

  courseModules.forEach(async (module) => {
    console.log("Rendering:", module.title);

    // Card wrapper
    const card = document.createElement("div");
    card.className = "rounded-lg shadow overflow-hidden";

    // Header (violet bar with title + chevron)
    const header = document.createElement("div");
    header.className =
      "bg-violet-800 text-white p-4 cursor-pointer flex justify-between items-center";
    header.innerHTML = `
    <span class="font-bold">${module.title}</span>
    <i class="fas fa-chevron-down transition-transform duration-300"></i>
  `;

    // Body (collapsed by default)
    const body = document.createElement("div");
    body.style.maxHeight = "0px";
    body.style.overflow = "hidden";
    body.style.transition = "max-height 0.5s ease";

    // -----------------------
    // Module-specific content
    // -----------------------
    if (module.type === "theory") {
      body.innerHTML = `
      <div class="bg-gray-100 text-gray-900 font-medium p-4 leading-relaxed">
        ${module.content}
      </div>
    `;
    }

    if (module.type === "video") {
      body.innerHTML = `
      <div class="p-4 bg-gray-100">
        <div class="relative w-full h-64 rounded-lg bg-black flex items-center justify-center">
          <button id="playBtn-${module.id}" class="text-white text-5xl focus:outline-none">
            <i class="fas fa-play-circle"></i>
          </button>
          <iframe 
            id="videoFrame-${module.id}"
            class="absolute inset-0 w-full h-full rounded-lg hidden"
            src="${module.videoUrl}?autoplay=1&modestbranding=1&rel=0&controls=1"
            frameborder="0"
            allowfullscreen>
          </iframe>
        </div>
      </div>
      ${module.conclusion || ""}
    `;

      // Play button logic
      const playBtn = body.querySelector(`#playBtn-${module.id}`);
      const videoFrame = body.querySelector(`#videoFrame-${module.id}`);
      playBtn.addEventListener("click", () => {
        playBtn.style.display = "none";
        videoFrame.classList.remove("hidden");
      });
    }

    if (module.type === "exam") {
      const registrationId = sessionStorage.getItem("registrationId");
      const classId = module.id;

      // Modal references
      const quizModal = document.getElementById("quizModal-4");
      const modalIcon = document.getElementById("modalIcon-4");
      const modalTitle = document.getElementById("modalTitle-4");
      const modalMessage = document.getElementById("modalMessage-4");
      const modalOk = document.getElementById("modalOk-4");

      // 🔎 Check if quiz already passed
      const { data, error } = await window.supabase
        .from("class_progress")
        .select("progress")
        .eq("registration_id", registrationId)
        .eq("class_id", classId)
        .single();

      if (error) {
        console.error("Error checking progress:", error);
        return;
      }

      if (data && data.progress >= 70) {
        // ✅ Already passed — show info modal
        modalIcon.className = "fas fa-info-circle text-blue-500 text-5xl mb-4";
        modalTitle.textContent = "Quiz Already Completed";
        modalMessage.textContent =
          "You’ve already passed this quiz. No need to retake it.";
        quizModal.classList.remove("hidden");

        modalOk.onclick = () => {
          quizModal.classList.add("hidden");
          window.location.href = "portal.html"; // ✅ redirect back
        };

        return; // 🚫 stop here, don’t render quiz
      }

      // ✅ Otherwise, render quiz normally
      body.innerHTML = `
    <div class="bg-gray-100 text-gray-900 font-medium p-6 leading-relaxed flex flex-col">
      <!-- Progress indicator -->
      <div id="progress-${module.id}" class="flex justify-center mb-4 space-x-2"></div>

      <!-- Question + Navigation wrapper -->
      <div class="flex flex-col">
        <!-- Question container -->
        <div id="quiz-container-${module.id}" 
             class="p-4 bg-white rounded-lg shadow-md mb-4 min-h-[270px]">
        </div>

        <!-- Navigation buttons -->
        <div class="flex justify-between gap-3">
          <button id="back-btn-${module.id}" 
                  class="bg-gray-300 text-gray-700 px-4 py-2 rounded hidden">
            Back
          </button>
          <button id="next-btn-${module.id}" 
                  class="bg-violet-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-violet-700 transition" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  `;

      // References
      const quizContainer = body.querySelector(`#quiz-container-${module.id}`);
      const progressContainer = body.querySelector(`#progress-${module.id}`);
      const nextBtn = body.querySelector(`#next-btn-${module.id}`);
      const backBtn = body.querySelector(`#back-btn-${module.id}`);

      // State
      let currentQuestion = 0;
      let answers = Array(module.questions.length).fill(null);

      // Build progress circles
      module.questions.forEach((_, i) => {
        const circle = document.createElement("div");
        circle.className =
          "w-8 h-8 flex items-center justify-center rounded-full border border-violet-600 text-violet-600 text-sm font-bold transition";
        circle.innerText = i + 1;
        progressContainer.appendChild(circle);
      });
      const progressCircles = progressContainer.querySelectorAll("div");

      // Render question
      function renderQuestion() {
        const q = module.questions[currentQuestion];
        quizContainer.innerHTML = `
      <h3 class="text-lg font-bold mb-4">Q${currentQuestion + 1}. ${q.question}</h3>
      <div class="space-y-2">
        ${q.options
          .map(
            (opt, i) => `
          <label class="block cursor-pointer">
            <input type="radio" name="question-${currentQuestion}" value="${i}" class="hidden peer" ${answers[currentQuestion] === i ? "checked" : ""}>
            <div class="p-3 border rounded-lg transition 
                        peer-checked:bg-violet-100 peer-checked:text-violet-700 peer-checked:border-violet-600 
                        hover:bg-violet-50">
              ${opt}
            </div>
          </label>
        `,
          )
          .join("")}
      </div>
    `;

        // Update progress circles
        progressCircles.forEach((circle, i) => {
          circle.classList.remove("bg-violet-600", "text-white", "scale-110");
          if (i === currentQuestion) {
            circle.classList.add("bg-violet-600", "text-white", "scale-110");
          } else if (answers[i] !== null) {
            circle.classList.add("bg-violet-600", "text-white");
          }
        });

        // Update buttons
        backBtn.classList.toggle("hidden", currentQuestion === 0);
        nextBtn.innerText =
          currentQuestion === module.questions.length - 1 ? "Submit" : "Next";
        nextBtn.disabled = answers[currentQuestion] === null;

        // Listen for answer selection
        quizContainer.querySelectorAll("input[type=radio]").forEach((radio) => {
          radio.addEventListener("change", () => {
            answers[currentQuestion] = parseInt(radio.value);
            nextBtn.disabled = false;
          });
        });
      }

      // Next button
      nextBtn.addEventListener("click", async () => {
        if (answers[currentQuestion] !== null) {
          if (currentQuestion < module.questions.length - 1) {
            currentQuestion++;
            renderQuestion();
          } else {
            // ✅ Calculate score
            const score =
              answers.filter((ans, i) => ans === module.questions[i].answer)
                .length * 10;

            console.log("Code 6 → module.id:", module.id);

            if (score >= 70) {
              // 🔥 Call submitQuiz.js
              await submitQuiz(registrationId, classId, score);

              modalIcon.className =
                "fas fa-trophy text-yellow-500 text-5xl mb-4 animate-bounce";
              modalTitle.textContent = "Quiz Completed!";
              modalMessage.textContent = `Your Score: ${score}%. 🎉 Great job! You passed and your progress has been updated.`;
              quizModal.classList.remove("hidden");

              modalOk.onclick = () => {
                quizModal.classList.add("hidden");
                window.location.href = "portal.html"; // ✅ redirect after passing
              };
            } else {
              modalIcon.className =
                "fas fa-exclamation-circle text-red-500 text-5xl mb-4 animate-pulse";
              modalTitle.textContent = "Quiz Completed!";
              modalMessage.textContent = `Your Score: ${score}%. ❌ You need at least 70% to proceed. Please retake the quiz.`;
              quizModal.classList.remove("hidden");

              modalOk.onclick = () => {
                quizModal.classList.add("hidden");
                currentQuestion = 0;
                answers = Array(module.questions.length).fill(null);
                renderQuestion();
              };
            }
          }
        }
      });

      // Back button
      backBtn.addEventListener("click", () => {
        if (currentQuestion > 0) {
          currentQuestion--;
          renderQuestion();
        }
      });

      // Start quiz
      renderQuestion();
    }

    // -----------------------
    // Expand/Collapse toggle
    // -----------------------
    header.addEventListener("click", () => {
      const icon = header.querySelector("i");

      // Close all other modules first
      document
        .querySelectorAll("#modules > div > div:nth-child(2)")
        .forEach((otherBody) => {
          if (otherBody !== body) {
            otherBody.style.maxHeight = "0px";
            const otherIcon =
              otherBody.previousElementSibling.querySelector("i");
            if (otherIcon) {
              otherIcon.classList.remove("fa-chevron-up");
              otherIcon.classList.add("fa-chevron-down");
            }
          }
        });

      // Toggle current module
      if (body.style.maxHeight === "0px" || body.style.maxHeight === "") {
        body.style.maxHeight = body.scrollHeight + "px";
        icon.classList.remove("fa-chevron-down");
        icon.classList.add("fa-chevron-up");
      } else {
        body.style.maxHeight = "0px";
        icon.classList.remove("fa-chevron-up");
        icon.classList.add("fa-chevron-down");
      }
    });

    // Append header + body to card, then card to container
    card.appendChild(header);
    card.appendChild(body);
    container.appendChild(card);
  });
});
