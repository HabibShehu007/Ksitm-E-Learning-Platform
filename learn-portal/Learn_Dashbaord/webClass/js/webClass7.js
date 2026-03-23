// webClass2.js
import { submitQuiz } from "./submitQuiz.js";
import { getClassIdByOrder } from "./submitQuiz.js";

document.addEventListener("DOMContentLoaded", () => {
  const module1 = {
    id: 1, // replace with actual UUID from Supabase
    type: "theory",
    title: "Module 1: Introduction to Node.js Basics",
    content: `
    <div class="space-y-8">

      <!-- What is Node.js -->
      <section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm">
        <div class="flex-shrink-0 text-green-600 text-3xl mb-3 sm:mb-0">
          <i class="fab fa-node-js"></i>
        </div>
        <div class="w-full">
          <h3 class="text-xl font-bold text-green-700 mb-2">What is Node.js?</h3>
          <p class="text-gray-900 font-medium leading-relaxed">
            Node.js is a runtime environment that allows you to run JavaScript code outside the browser, built on Chrome's V8 engine. It is widely used for building fast, scalable backend applications.
          </p>
        </div>
      </section>

      <!-- Installing Node.js -->
      <section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm">
        <div class="flex-shrink-0 text-violet-700 text-3xl mb-3 sm:mb-0">
          <i class="fas fa-download"></i>
        </div>
        <div class="w-full">
          <h3 class="text-xl font-bold text-violet-800 mb-2">Installing Node.js</h3>
          <p class="text-gray-900 font-medium leading-relaxed">
            You can download Node.js from <a href="https://nodejs.org" target="_blank" class="text-violet-600 underline">nodejs.org</a>. Once installed, you can check the version using:
          </p>
          <div class="overflow-x-auto mt-3">
            <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
node -v
npm -v
            </pre>
          </div>
        </div>
      </section>

      <!-- Hello World with Node.js -->
      <section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm">
        <div class="flex-shrink-0 text-blue-600 text-3xl mb-3 sm:mb-0">
          <i class="fas fa-terminal"></i>
        </div>
        <div class="w-full">
          <h3 class="text-xl font-bold text-blue-700 mb-2">Hello World Example</h3>
          <p class="text-gray-900 font-medium leading-relaxed">
            You can run JavaScript files directly with Node.js. Create a file <code>app.js</code> and run it using <code>node app.js</code>.
          </p>
          <div class="overflow-x-auto mt-3">
            <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
// app.js
console.log("Hello from Node.js!");
            </pre>
          </div>
        </div>
      </section>

      <!-- Built-in Modules -->
      <section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm">
        <div class="flex-shrink-0 text-yellow-600 text-3xl mb-3 sm:mb-0">
          <i class="fas fa-cubes"></i>
        </div>
        <div class="w-full">
          <h3 class="text-xl font-bold text-yellow-700 mb-2">Built-in Modules</h3>
          <p class="text-gray-900 font-medium leading-relaxed">
            Node.js comes with built-in modules like <code>fs</code> (file system), <code>http</code> (server), and <code>path</code>. You can import them using <code>require()</code>.
          </p>
          <div class="overflow-x-auto mt-3">
            <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
const fs = require('fs');
fs.writeFileSync('test.txt', 'Hello Node.js');
            </pre>
          </div>
        </div>
      </section>

      <!-- Creating a Simple Server -->
      <section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm">
        <div class="flex-shrink-0 text-red-600 text-3xl mb-3 sm:mb-0">
          <i class="fas fa-server"></i>
        </div>
        <div class="w-full">
          <h3 class="text-xl font-bold text-red-700 mb-2">Creating a Simple Server</h3>
          <p class="text-gray-900 font-medium leading-relaxed">
            Node.js makes it easy to create web servers using the <code>http</code> module.
          </p>
          <div class="overflow-x-auto mt-3">
            <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World from Node.js Server');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
            </pre>
          </div>
        </div>
      </section>

      <!-- Conclusion Section -->
      <section class="bg-green-700 text-white p-6 rounded-lg shadow-lg mt-12 max-w-3xl mx-auto text-center">
        <div class="mb-4 flex justify-center">
          <i class="fas fa-award text-5xl text-yellow-400"></i>
        </div>
        <div>
          <h3 class="text-2xl font-bold mb-3">Module 1 Completed</h3>
          <p class="text-base leading-relaxed">
            You’ve completed <strong>Node.js Basics Module 1</strong>, covering installation, running scripts, built-in modules, and creating a simple server.  
            In <strong>Module 2</strong>, you’ll explore Express.js and building RESTful APIs.
          </p>
        </div>
      </section>
    </div>
  `,
  };

  const module2 = {
    id: 2, // replace with actual UUID
    type: "video",
    title:
      "Module 2: Know The Basics of Backend Development Using NodeJs in 10 Minutes",
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
    type: "exam",
    order_number: 7, // ✅ same as parent class
    title: "Final Module: Node.js Basics Quiz",
    questions: [
      {
        question: "What is Node.js primarily used for?",
        options: [
          "Running JavaScript in the browser",
          "Running JavaScript outside the browser",
          "Styling HTML pages",
          "Managing relational databases",
        ],
        answer: 1,
      },
      {
        question: "Which command checks the installed Node.js version?",
        options: ["node -v", "npm -version", "nodejs --check", "version node"],
        answer: 0,
      },
      {
        question:
          "Which built-in module is used to create a web server in Node.js?",
        options: ["fs", "http", "path", "os"],
        answer: 1,
      },
      {
        question:
          "Which function is used to import built-in modules in Node.js?",
        options: ["import()", "require()", "include()", "load()"],
        answer: 1,
      },
      {
        question: "Which command runs a JavaScript file with Node.js?",
        options: [
          "run app.js",
          "node app.js",
          "execute app.js",
          "start app.js",
        ],
        answer: 1,
      },
      {
        question: "Which built-in module is used to work with the file system?",
        options: ["http", "fs", "path", "events"],
        answer: 1,
      },
      {
        question: "What does npm stand for?",
        options: [
          "Node Package Manager",
          "New Programming Method",
          "Network Protocol Module",
          "Node Program Manager",
        ],
        answer: 0,
      },
      {
        question: "Which method writes content to a file synchronously?",
        options: [
          "fs.writeFile()",
          "fs.writeFileSync()",
          "fs.appendFile()",
          "fs.createWriteStream()",
        ],
        answer: 1,
      },
      {
        question: "Which port is commonly used for local Node.js servers?",
        options: ["80", "3000", "22", "8080"],
        answer: 1,
      },
      {
        question: "Which object represents the current process in Node.js?",
        options: ["system", "process", "runtime", "global"],
        answer: 1,
      },
    ],
  };

  const courseModules = [module1, module2, module3];
  window.courseModules = courseModules; // expose for debugging

  const container = document.getElementById("modules");
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
      const userId = sessionStorage.getItem("userId");
      const courseId = sessionStorage.getItem("courseId");
      const classId = await getClassIdByOrder(
        userId,
        courseId,
        module.order_number,
      );

      console.log("Page load check:");
      console.log("userId:", userId);
      console.log("courseId:", courseId);
      console.log("orderNumber:", module.order_number);

      if (!classId) {
        console.error("No class_id found for order:", module.order_number);
        return; // 🚫 stop here
      }

      // Modal references
      const quizModal = document.getElementById("quizModal");
      const modalMessage = document.getElementById("modalMessage");
      const modalIcon = document.getElementById("modalIcon");
      const modalTitle = document.getElementById("modalTitle");
      const modalOk = document.getElementById("modalOk");
      const modalContent = document.getElementById("quizModalContent");

      // 🔎 Check if quiz already passed
      const { data, error } = await window.supabase
        .from("class_progress")
        .select("progress")
        .eq("class_id", classId)
        .maybeSingle();

      if (error) {
        console.error("Error checking progress:", error);
        return;
      }

      if (data && data.progress === 100) {
        // ✅ Already passed — show info modal
        modalIcon.className = "fas fa-info-circle text-blue-500 text-5xl mb-4";
        modalTitle.textContent = "Quiz Already Completed";
        modalMessage.textContent =
          "You’ve already passed this quiz. No need to retake it.";

        // Show modal
        quizModal.classList.remove("hidden");
        modalContent.classList.remove("opacity-0", "scale-95");
        modalContent.classList.add("opacity-100", "scale-100");

        modalOk.onclick = () => {
          // Hide modal
          quizModal.classList.add("hidden");
          modalContent.classList.remove("opacity-100", "scale-100");
          modalContent.classList.add("opacity-0", "scale-95");
          window.location.href = "portal.html";
        };

        return; // 🚫 stop here
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
             <div class="p-3 border rounded-lg transition peer-checked:bg-violet-100 peer-checked:text-violet-700 peer-checked:border-violet-600 hover:bg-violet-50">
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

            // 🔄 Show loading spinner in button
            nextBtn.disabled = true;
            const originalText = nextBtn.innerHTML;
            nextBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Submitting...`;

            try {
              if (score >= 70) {
                await submitQuiz(userId, courseId, module.order_number, score);

                modalIcon.className =
                  "fas fa-trophy text-yellow-500 text-5xl mb-4 animate-bounce";
                modalTitle.textContent = "Quiz Completed!";
                modalMessage.textContent = `Your Score: ${score}%. 🎉 Great job! You passed and your progress has been updated.`;

                quizModal.classList.remove("hidden");
                modalContent.classList.remove("opacity-0", "scale-95");
                modalContent.classList.add("opacity-100", "scale-100");

                modalOk.onclick = () => {
                  quizModal.classList.add("hidden");
                  modalContent.classList.remove("opacity-100", "scale-100");
                  modalContent.classList.add("opacity-0", "scale-95");
                  window.location.href = "portal.html";
                };
              } else {
                modalIcon.className =
                  "fas fa-exclamation-circle text-red-500 text-5xl mb-4 animate-pulse";
                modalTitle.textContent = "Quiz Completed!";
                modalMessage.textContent = `Your Score: ${score}%. ❌ You need at least 70% to proceed. Please retake the quiz.`;

                quizModal.classList.remove("hidden");
                modalContent.classList.remove("opacity-0", "scale-95");
                modalContent.classList.add("opacity-100", "scale-100");

                modalOk.onclick = () => {
                  quizModal.classList.add("hidden");
                  modalContent.classList.remove("opacity-100", "scale-100");
                  modalContent.classList.add("opacity-0", "scale-95");
                  currentQuestion = 0;
                  answers = Array(module.questions.length).fill(null);
                  renderQuestion();
                };
              }
            } finally {
              // 🔄 Reset button back to normal
              nextBtn.disabled = false;
              nextBtn.innerHTML = originalText;
            }
          }
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
