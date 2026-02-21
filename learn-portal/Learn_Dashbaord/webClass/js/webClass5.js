// webClass2.js
import { submitQuiz } from "./submitQuiz.js";

document.addEventListener("DOMContentLoaded", () => {
  const module1 = {
    id: 1, // replace with actual UUID from Supabase
    type: "theory",
    title: "Module 1: Introduction to JavaScript Basics",
    content: `
    <div class="space-y-8">

      <!-- Variables -->
      <section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm">
        <div class="flex-shrink-0 text-violet-700 text-3xl mb-3 sm:mb-0">
          <i class="fas fa-code"></i>
        </div>
        <div class="w-full">
          <h3 class="text-xl font-bold text-violet-800 mb-2">JavaScript Variables</h3>
          <p class="text-gray-900 font-medium leading-relaxed">
            Variables store data values. You can declare them using <code>let</code>, <code>const</code>, or <code>var</code>.
          </p>
          <div class="overflow-x-auto mt-3">
            <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
&lt;!-- HTML --&gt;
&lt;p id="message"&gt;&lt;/p&gt;

&lt;!-- JavaScript --&gt;
let greeting = "Hello, World!";
document.getElementById("message").textContent = greeting;
            </pre>
          </div>
        </div>
      </section>

      <!-- Functions -->
      <section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm">
        <div class="flex-shrink-0 text-green-600 text-3xl mb-3 sm:mb-0">
          <i class="fas fa-cogs"></i>
        </div>
        <div class="w-full">
          <h3 class="text-xl font-bold text-green-700 mb-2">JavaScript Functions</h3>
          <p class="text-gray-900 font-medium leading-relaxed">
            Functions group reusable code. You can call them to perform actions.
          </p>
          <div class="overflow-x-auto mt-3">
            <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
&lt;!-- HTML --&gt;
&lt;button onclick="sayHello()"&gt;Click Me&lt;/button&gt;

&lt;!-- JavaScript --&gt;
function sayHello() {
  alert("Hello from JavaScript!");
}
            </pre>
          </div>
        </div>
      </section>

      <!-- DOM Manipulation -->
      <section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm">
        <div class="flex-shrink-0 text-blue-600 text-3xl mb-3 sm:mb-0">
          <i class="fas fa-sitemap"></i>
        </div>
        <div class="w-full">
          <h3 class="text-xl font-bold text-blue-700 mb-2">DOM Manipulation</h3>
          <p class="text-gray-900 font-medium leading-relaxed">
            JavaScript can change HTML content and styles dynamically by targeting elements in the DOM.
          </p>
          <div class="overflow-x-auto mt-3">
            <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
&lt;!-- HTML --&gt;
&lt;div id="box"&gt;Original Text&lt;/div&gt;

&lt;!-- JavaScript --&gt;
document.getElementById("box").textContent = "Updated with JavaScript!";
document.getElementById("box").style.color = "red";
            </pre>
          </div>
        </div>
      </section>

      <!-- Events -->
      <section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm">
        <div class="flex-shrink-0 text-violet-700 text-3xl mb-3 sm:mb-0">
          <i class="fas fa-bolt"></i>
        </div>
        <div class="w-full">
          <h3 class="text-xl font-bold text-violet-800 mb-2">JavaScript Events</h3>
          <p class="text-gray-900 font-medium leading-relaxed">
            Events let you respond to user actions like clicks, key presses, or mouse movements.
          </p>
          <div class="overflow-x-auto mt-3">
            <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
&lt;!-- HTML --&gt;
&lt;button id="btn"&gt;Click Me&lt;/button&gt;

&lt;!-- JavaScript --&gt;
document.getElementById("btn").addEventListener("click", function() {
  alert("Button was clicked!");
});
            </pre>
          </div>
        </div>
      </section>

    

    </div>
    <!-- Arrays -->
<section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm">
  <div class="flex-shrink-0 text-violet-700 text-3xl mb-3 sm:mb-0">
    <i class="fas fa-list"></i>
  </div>
  <div class="w-full">
    <h3 class="text-xl font-bold text-violet-800 mb-2">JavaScript Arrays</h3>
    <p class="text-gray-900 font-medium leading-relaxed">
      Arrays store multiple values in a single variable. You can access items by their index.
    </p>
    <div class="overflow-x-auto mt-3">
      <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
&lt;!-- HTML --&gt;
&lt;ul id="fruits"&gt;&lt;/ul&gt;

&lt;!-- JavaScript --&gt;
let fruits = ["Apple", "Banana", "Cherry"];
let list = document.getElementById("fruits");

fruits.forEach(function(fruit) {
  let li = document.createElement("li");
  li.textContent = fruit;
  list.appendChild(li);
});
      </pre>
    </div>
  </div>
</section>
<!-- Conditionals -->
<section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm">
  <div class="flex-shrink-0 text-green-600 text-3xl mb-3 sm:mb-0">
    <i class="fas fa-random"></i>
  </div>
  <div class="w-full">
    <h3 class="text-xl font-bold text-green-700 mb-2">JavaScript Conditionals</h3>
    <p class="text-gray-900 font-medium leading-relaxed">
      Conditionals let you run code only when certain conditions are true, using <code>if</code>, <code>else</code>, and <code>else if</code>.
    </p>
    <div class="overflow-x-auto mt-3">
      <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
&lt;!-- HTML --&gt;
&lt;p id="status"&gt;&lt;/p&gt;

&lt;!-- JavaScript --&gt;
let age = 18;
let status = document.getElementById("status");

if (age &gt;= 18) {
  status.textContent = "You are an adult.";
} else {
  status.textContent = "You are a minor.";
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
      You’ve completed <strong>JavaScript Basics Module 1</strong>, covering variables, functions, DOM manipulation, events, arrays, and conditionals.  
      In <strong>Module 2</strong>, you’ll apply these concepts in a practical demonstration.
    </p>
  </div>
</section>


  `,
  };

  const module2 = {
    id: 2, // replace with actual UUID
    type: "video",
    title: "Module 2: Know the Basics of JavaScript in 10 Minutes",
    videoUrl: "https://www.youtube.com/embed/LO5eTH4Pe8E",
    conclusion: `
<!-- Conclusion Section -->
<section class="bg-violet-800 text-white p-6 rounded-lg shadow-lg mt-8 text-center">
  <div class="mb-4 flex justify-center">
    <i class="fas fa-lightbulb text-4xl text-yellow-400"></i>
  </div>
  <h3 class="text-xl font-bold mb-2">Next: Final Quiz</h3>
  <p class="text-base leading-relaxed">
    You’ve explored JavaScript fundamentals including variables, functions, DOM manipulation, events, arrays, and conditionals.  
    In the next module, you’ll test your knowledge with a quiz to reinforce these skills.
  </p>
</section>



    `,
  };

  const module3 = {
    id: "3adb4daa-cd73-42f9-a22a-650ef74be302", // ✅ real UUID from Supabase
    type: "exam",
    title: "Final Module: JavaScript Basics Quiz",
    questions: [
      {
        question:
          "Which keyword is used to declare a variable that can change its value?",
        options: ["const", "let", "var", "static"],
        answer: 1,
      },
      {
        question:
          "Which keyword declares a variable whose value cannot be reassigned?",
        options: ["var", "let", "const", "static"],
        answer: 2,
      },
      {
        question:
          "Which method is used to select an element by its ID in the DOM?",
        options: [
          "document.querySelector()",
          "document.getElementById()",
          "document.getElementsByClassName()",
          "document.getElementByTagName()",
        ],
        answer: 1,
      },
      {
        question: "Which event is triggered when a user clicks a button?",
        options: ["mouseover", "keydown", "click", "submit"],
        answer: 2,
      },
      {
        question: "Which symbol is used to access array elements by index?",
        options: ["{}", "()", "[]", "<>"],
        answer: 2,
      },
      {
        question: "Which loop is commonly used to iterate through arrays?",
        options: ["for", "while", "forEach", "All of the above"],
        answer: 3,
      },
      {
        question:
          "Which conditional statement runs code only if a condition is true?",
        options: ["if", "else", "switch", "case"],
        answer: 0,
      },
      {
        question: "Which property changes the text content of an HTML element?",
        options: ["innerHTML", "textContent", "value", "content"],
        answer: 1,
      },
      {
        question:
          "Which function displays a popup alert message in the browser?",
        options: ["prompt()", "alert()", "confirm()", "message()"],
        answer: 1,
      },
      {
        question: "Which method adds a new event listener to an element?",
        options: [
          "element.onEvent()",
          "element.addEventListener()",
          "element.attachEvent()",
          "element.listen()",
        ],
        answer: 1,
      },
    ],
  };

  const courseModules = [module1, module2, module3];
  window.courseModules = courseModules; // expose for debugging
  const container = document.getElementById("modules5");
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
      const quizModal = document.getElementById("quizModal-5");
      const modalIcon = document.getElementById("modalIcon-5");
      const modalTitle = document.getElementById("modalTitle-5");
      const modalMessage = document.getElementById("modalMessage-5");
      const modalOk = document.getElementById("modalOk-5");

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
