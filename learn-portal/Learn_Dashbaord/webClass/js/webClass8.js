// webClass2.js
import { submitQuiz } from "./submitQuiz.js";
import { getClassIdByOrder } from "./submitQuiz.js";

document.addEventListener("DOMContentLoaded", () => {
  const module1 = {
    id: 1, // replace with actual UUID from Supabase
    type: "theory",
    title: "Module 1: Final Project & Deployment",
    content: `
    <div class="space-y-8">

      <!-- Final Project Overview -->
      <section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm">
        <div class="flex-shrink-0 text-violet-700 text-3xl mb-3 sm:mb-0">
          <i class="fas fa-project-diagram"></i>
        </div>
        <div class="w-full">
          <h3 class="text-xl font-bold text-violet-800 mb-2">Final Project Overview</h3>
          <p class="text-gray-900 font-medium leading-relaxed">
            In this final class, you will combine everything you’ve learned — frontend, advanced JavaScript, and backend with Node.js — into a complete project. The goal is to build a functional web application and prepare it for deployment.
          </p>
        </div>
      </section>

      <!-- Project Structure -->
      <section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm">
        <div class="flex-shrink-0 text-green-600 text-3xl mb-3 sm:mb-0">
          <i class="fas fa-folder-open"></i>
        </div>
        <div class="w-full">
          <h3 class="text-xl font-bold text-green-700 mb-2">Project Structure</h3>
          <p class="text-gray-900 font-medium leading-relaxed">
            Organize your project with clear separation of concerns: frontend files, backend server code, and configuration files. A typical Node.js project uses <code>package.json</code> to manage dependencies.
          </p>
          <div class="overflow-x-auto mt-3">
            <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
my-app/
  ├── public/
  ├── src/
  ├── server.js
  ├── package.json
            </pre>
          </div>
        </div>
      </section>

      <!-- Environment Variables -->
      <section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm">
        <div class="flex-shrink-0 text-blue-600 text-3xl mb-3 sm:mb-0">
          <i class="fas fa-key"></i>
        </div>
        <div class="w-full">
          <h3 class="text-xl font-bold text-blue-700 mb-2">Environment Variables</h3>
          <p class="text-gray-900 font-medium leading-relaxed">
            Use environment variables to store sensitive information like API keys and database credentials. Create a <code>.env</code> file and load it with packages like <code>dotenv</code>.
          </p>
          <div class="overflow-x-auto mt-3">
            <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
// .env
PORT=3000
DB_URL=mongodb://localhost:27017/mydb

// server.js
require('dotenv').config();
const port = process.env.PORT;
            </pre>
          </div>
        </div>
      </section>

      <!-- Deployment Options -->
      <section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm">
        <div class="flex-shrink-0 text-yellow-600 text-3xl mb-3 sm:mb-0">
          <i class="fas fa-cloud-upload-alt"></i>
        </div>
        <div class="w-full">
          <h3 class="text-xl font-bold text-yellow-700 mb-2">Deployment Options</h3>
          <p class="text-gray-900 font-medium leading-relaxed">
            You can deploy Node.js applications to platforms like <strong>Heroku</strong>, <strong>Vercel</strong>, or <strong>Netlify</strong>. Deployment involves pushing your code to a Git repository and connecting it to the hosting service.
          </p>
          <div class="overflow-x-auto mt-3">
            <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
# Example: Deploying to Heroku
heroku login
heroku create my-app
git push heroku main
heroku open
            </pre>
          </div>
        </div>
      </section>

      <!-- Conclusion Section -->
      <section class="bg-violet-800 text-white p-6 rounded-lg shadow-lg mt-12 max-w-3xl mx-auto text-center">
        <div class="mb-4 flex justify-center">
          <i class="fas fa-flag-checkered text-5xl text-yellow-400"></i>
        </div>
        <div>
          <h3 class="text-2xl font-bold mb-3">Final Class Completed</h3>
          <p class="text-base leading-relaxed">
            You’ve completed the <strong>Final Project & Deployment Module</strong>, learning how to structure projects, use environment variables, and deploy applications.  
            Congratulations on finishing the course — you are now ready to build and deploy real-world applications!
          </p>
        </div>
      </section>
    </div>
  `,
  };

  const module2 = {
    id: 2, // replace with actual UUID
    type: "video",
    title: "Module 2: Deploying Your Node.js Project to the Cloud",
    videoUrl: "https://www.youtube.com/embed/2V1UUhBJ62Y", // example: Heroku/Render deployment tutorial
    conclusion: `
<!-- Conclusion Section -->
<section class="bg-violet-800 text-white p-6 rounded-lg shadow-lg mt-8 text-center">
  <div class="mb-4 flex justify-center">
    <i class="fas fa-rocket text-4xl text-yellow-400"></i>
  </div>
  <h3 class="text-xl font-bold mb-2">Next: Final Quiz</h3>
  <p class="text-base leading-relaxed">
    You’ve now seen how to take a Node.js project from your local machine and deploy it to a live server using cloud platforms.  
    In the next module, you’ll test your knowledge of project structure, environment variables, and deployment best practices to complete the course.
  </p>
</section>
  `,
  };

  const module3 = {
    type: "exam",
    order_number: 8, // ✅ same as parent class
    title: "Final Module: Project & Deployment Quiz",
    questions: [
      {
        question:
          "Which file is used to manage dependencies in a Node.js project?",
        options: ["index.js", "package.json", "server.js", ".env"],
        answer: 1,
      },
      {
        question: "Which file is commonly used to store environment variables?",
        options: ["config.js", ".env", "settings.json", "variables.js"],
        answer: 1,
      },
      {
        question: "Which command initializes a new Node.js project?",
        options: ["npm init", "node start", "npm install", "project init"],
        answer: 0,
      },
      {
        question:
          "Which environment variable is typically used to define the server port?",
        options: ["PORT", "SERVER_PORT", "APP_PORT", "NODE_PORT"],
        answer: 0,
      },
      {
        question: "Which platform can be used to deploy Node.js applications?",
        options: ["Heroku", "Vercel", "Netlify", "All of the above"],
        answer: 3,
      },
      {
        question: "Which command pushes code to Heroku for deployment?",
        options: [
          "git push heroku main",
          "heroku deploy",
          "npm run deploy",
          "node deploy",
        ],
        answer: 0,
      },
      {
        question:
          "Which file should NOT be committed to GitHub because it contains secrets?",
        options: ["server.js", "package.json", ".env", "README.md"],
        answer: 2,
      },
      {
        question:
          "Which tool is used to load environment variables from a .env file?",
        options: ["dotenv", "config", "env-loader", "node-env"],
        answer: 0,
      },
      {
        question:
          "Which command installs all dependencies listed in package.json?",
        options: ["npm install", "npm start", "node install", "npm run"],
        answer: 0,
      },
      {
        question: "Which step comes last in deployment?",
        options: [
          "Writing code",
          "Testing locally",
          "Pushing to Git",
          "Opening the live app",
        ],
        answer: 3,
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
      const { data: progressRow, error } = await window.supabase
        .from("class_progress")
        .select("progress")
        .eq("user_id", userId)
        .eq("course_id", courseId)
        .eq("class_id", classId)
        .order("updated_at", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error("Error checking progress:", error);
        return;
      }

      if (progressRow && progressRow.progress === 100) {
        // ✅ Already passed — show info modal
        modalIcon.className = "fas fa-info-circle text-blue-500 text-5xl mb-4";
        modalTitle.textContent = "Quiz Already Completed";
        modalMessage.textContent =
          "You’ve already passed this quiz. No need to retake it.";

        quizModal.classList.remove("hidden");
        modalContent.classList.remove("opacity-0", "scale-95");
        modalContent.classList.add("opacity-100", "scale-100");

        modalOk.onclick = () => {
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
