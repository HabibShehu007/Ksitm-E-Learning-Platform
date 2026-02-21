// webClass2.js
import { submitQuiz } from "./submitQuiz.js";

document.addEventListener("DOMContentLoaded", () => {
  // Define modules for Class 2
  const module1 = {
    id: 1, // replace with actual UUID from Supabase
    type: "theory",
    title: "Module 1: Introduction to CSS Basics",
    content: `
    <div class="space-y-8">

      <!-- CSS Selectors -->
      <section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
        <div class="flex-shrink-0 text-violet-700 text-3xl mb-3 sm:mb-0">
          <i class="fas fa-mouse-pointer"></i>
        </div>
        <div class="w-full">
          <h3 class="text-xl font-bold text-violet-800 mb-2">CSS Selectors</h3>
          <p class="text-gray-900 font-medium leading-relaxed">
            CSS selectors target HTML elements to apply styles. Common selectors include element selectors, class selectors, and ID selectors.
          </p>
          <div class="overflow-x-auto mt-3">
            <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
&lt;!-- HTML --&gt;
&lt;p class="highlight"&gt;Hello World&lt;/p&gt;

&lt;!-- CSS --&gt;
p {
  color: blue;
}
.highlight {
  background-color: yellow;
}
            </pre>
          </div>
        </div>
      </section>

      <!-- Colors & Backgrounds -->
      <section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
        <div class="flex-shrink-0 text-green-600 text-3xl mb-3 sm:mb-0">
          <i class="fas fa-paint-brush"></i>
        </div>
        <div class="w-full">
          <h3 class="text-xl font-bold text-green-700 mb-2">Colors & Backgrounds</h3>
          <p class="text-gray-900 font-medium leading-relaxed">
            CSS allows you to change text color and background color using properties like <code>color</code> and <code>background-color</code>.
          </p>
          <div class="overflow-x-auto mt-3">
            <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
&lt;!-- HTML --&gt;
&lt;div class="box"&gt;Styled Box&lt;/div&gt;

&lt;!-- CSS --&gt;
.box {
  color: white;
  background-color: teal;
  padding: 10px;
}
            </pre>
          </div>
        </div>
      </section>

      <!-- Fonts & Text -->
      <section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
        <div class="flex-shrink-0 text-blue-600 text-3xl mb-3 sm:mb-0">
          <i class="fas fa-font"></i>
        </div>
        <div class="w-full">
          <h3 class="text-xl font-bold text-blue-700 mb-2">Fonts & Text</h3>
          <p class="text-gray-900 font-medium leading-relaxed">
            You can style text with properties like <code>font-family</code>, <code>font-size</code>, and <code>text-align</code>.
          </p>
          <div class="overflow-x-auto mt-3">
            <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
&lt;!-- HTML --&gt;
&lt;h1&gt;Welcome&lt;/h1&gt;

&lt;!-- CSS --&gt;
h1 {
  font-family: Arial, sans-serif;
  font-size: 24px;
  text-align: center;
}
            </pre>
          </div>
        </div>
      </section>

      <!-- Box Model -->
      <section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm">
        <div class="flex-shrink-0 text-violet-700 text-3xl mb-3 sm:mb-0">
          <i class="fas fa-border-style"></i>
        </div>
        <div class="w-full">
          <h3 class="text-xl font-bold text-violet-800 mb-2">Box Model</h3>
          <p class="text-gray-900 font-medium leading-relaxed">
            Every element in CSS is a box with content, padding, border, and margin. Understanding the box model is key to layout design.
          </p>
          <div class="overflow-x-auto mt-3">
            <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
&lt;!-- HTML --&gt;
&lt;div class="card"&gt;Card Content&lt;/div&gt;

&lt;!-- CSS --&gt;
.card {
  width: 200px;
  padding: 20px;
  border: 2px solid black;
  margin: 10px;
}
            </pre>
          </div>
        </div>
      </section>
      <!-- Positioning -->
<section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm">
  <!-- Icon -->
  <div class="flex-shrink-0 text-violet-700 text-3xl mb-3 sm:mb-0">
    <i class="fas fa-arrows-alt"></i>
  </div>
  <!-- Content -->
  <div class="w-full">
    <h3 class="text-xl font-bold text-violet-800 mb-2">CSS Positioning</h3>
    <p class="text-gray-900 font-medium leading-relaxed">
      CSS positioning allows you to control where elements appear on the page. 
      Common values include <code>static</code>, <code>relative</code>, <code>absolute</code>, and <code>fixed</code>.
    </p>
    <div class="overflow-x-auto mt-3">
      <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
&lt;!-- HTML --&gt;
&lt;div class="container"&gt;
  &lt;div class="box"&gt;Positioned Box&lt;/div&gt;
&lt;/div&gt;

&lt;!-- CSS --&gt;
.container {
  position: relative;
  width: 300px;
  height: 200px;
  background-color: lightgray;
}

.box {
  position: absolute;
  top: 50px;
  left: 50px;
  background-color: coral;
  padding: 10px;
}
      </pre>
    </div>
  </div>
</section>
<!-- Flexbox -->
<section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm">
  <!-- Icon -->
  <div class="flex-shrink-0 text-violet-700 text-3xl mb-3 sm:mb-0">
    <i class="fas fa-columns"></i>
  </div>
  <!-- Content -->
  <div class="w-full">
    <h3 class="text-xl font-bold text-violet-800 mb-2">CSS Flexbox</h3>
    <p class="text-gray-900 font-medium leading-relaxed">
      Flexbox is a modern layout system that makes it easy to align and distribute space among items in a container.
    </p>
    <div class="overflow-x-auto mt-3">
      <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
&lt;!-- HTML --&gt;
&lt;div class="flex-container"&gt;
  &lt;div class="item"&gt;One&lt;/div&gt;
  &lt;div class="item"&gt;Two&lt;/div&gt;
  &lt;div class="item"&gt;Three&lt;/div&gt;
&lt;/div&gt;

&lt;!-- CSS --&gt;
.flex-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: lightblue;
  height: 100px;
}

.item {
  background-color: navy;
  color: white;
  padding: 10px;
}
      </pre>
    </div>
  </div>
</section>


<!-- Conclusion Section -->
<section class="bg-violet-800 text-white p-6 rounded-lg shadow-lg mt-12 max-w-3xl mx-auto text-center">
  <div class="mb-4 flex justify-center">
    <i class="fas fa-award text-5xl text-yellow-400"></i>
  </div>
  <div>
    <h3 class="text-2xl font-bold mb-3">Module 1 Completed</h3>
    <p class="text-base leading-relaxed">
      You’ve finished <strong>CSS Basics Module 1</strong>, covering selectors, colors, fonts, and the box model.  
      Next, in <strong>Module 2</strong>, you’ll see these concepts applied in a practical video demonstration.
    </p>
  </div>
</section>


    </div>
  `,
  };

  const module2 = {
    id: 2, // replace with actual UUID
    type: "video",
    title: "Module 2: Know CSS Basics in 20 Minutes",
    videoUrl: "https://www.youtube.com/embed/1PnVor36_40",
    conclusion: `
      <!-- Conclusion Section -->
<section class="bg-violet-800 text-white p-6 rounded-lg shadow-lg mt-8 text-center">
  <div class="mb-4 flex justify-center">
    <i class="fas fa-lightbulb text-4xl text-yellow-400"></i>
  </div>
  <h3 class="text-xl font-bold mb-2">Next: Final Quiz</h3>
  <p class="text-base leading-relaxed">
    You’ve explored HTML in action. In the next module, you’ll test your knowledge with a short quiz to reinforce what you’ve learned.
  </p>
</section>

    `,
  };

  const module3 = {
    id: "9df0de46-66f3-4834-a06f-e78f8ea4c198", // ✅ real UUID from Supabase
    type: "exam",
    title: "Final Module: CSS Basics Quiz",
    questions: [
      {
        question: "Which CSS selector targets all <p> elements?",
        options: ["&lt;p&gt;", ".p", "#p", "p"],
        answer: 3,
      },
      {
        question: "Which CSS property changes the text color?",
        options: ["font-color", "color", "text-style", "background-color"],
        answer: 1,
      },
      {
        question: "Which CSS property sets the background color of an element?",
        options: ["color", "background", "background-color", "bg-color"],
        answer: 2,
      },
      {
        question: "Which CSS property controls the font size of text?",
        options: ["font-size", "text-size", "size", "font-style"],
        answer: 0,
      },
      {
        question: "Which CSS property centers text horizontally?",
        options: ["align", "text-align", "font-align", "center"],
        answer: 1,
      },
      {
        question:
          "In the CSS box model, which property adds space inside the element border?",
        options: ["margin", "padding", "border", "spacing"],
        answer: 1,
      },
      {
        question:
          "In the CSS box model, which property adds space outside the element border?",
        options: ["margin", "padding", "border", "spacing"],
        answer: 0,
      },
      {
        question: "Which CSS property adds a border around an element?",
        options: ["outline", "border", "frame", "box"],
        answer: 1,
      },
      {
        question: "Which CSS selector targets an element with id='header'?",
        options: ["header", ".header", "#header", "&lt;header&gt;"],
        answer: 2,
      },
      {
        question:
          "Which CSS selector targets all elements with class='highlight'?",
        options: ["highlight", ".highlight", "#highlight", "&lt;highlight&gt;"],
        answer: 1,
      },
    ],
  };

  const courseModules = [module1, module2, module3];
  window.courseModules = courseModules; // expose for debugging
  const container = document.getElementById("modules3");
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
      const quizModal = document.getElementById("quizModal-3");
      const modalIcon = document.getElementById("modalIcon-3");
      const modalTitle = document.getElementById("modalTitle-3");
      const modalMessage = document.getElementById("modalMessage-3");
      const modalOk = document.getElementById("modalOk-3");

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
