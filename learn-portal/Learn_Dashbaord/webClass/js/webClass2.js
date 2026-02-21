// webClass2.js
import { submitQuiz } from "./submitQuiz.js";

document.addEventListener("DOMContentLoaded", () => {
  // Define modules for Class 2
  const module1 = {
    id: 1, // replace with actual UUID from Supabase
    type: "theory",
    title: "Module 1: Advanced HTML Concepts",
    content: `
    <div class="space-y-8">

      <!-- Semantic HTML -->
      <section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
        <!-- Icon -->
        <div class="flex-shrink-0 text-violet-700 text-3xl mb-3 sm:mb-0">
          <i class="fas fa-code"></i>
        </div>
        <!-- Content -->
        <div class="w-full">
          <h3 class="text-xl font-bold text-violet-800 mb-2">Semantic HTML</h3>
          <p class="text-gray-900 font-medium leading-relaxed">
            Semantic tags like <code class="font-mono bg-gray-200 px-1 rounded">&lt;header&gt;</code>, 
            <code class="font-mono bg-gray-200 px-1 rounded">&lt;main&gt;</code>, and 
            <code class="font-mono bg-gray-200 px-1 rounded">&lt;footer&gt;</code> 
            give meaning to your content. They help browsers, search engines, and assistive technologies 
            understand the structure of your page.
          </p>
          <div class="overflow-x-auto mt-3">
            <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
&lt;header&gt;
  &lt;h1&gt;My Website&lt;/h1&gt;
&lt;/header&gt;
&lt;main&gt;
  &lt;article&gt;Content goes here...&lt;/article&gt;
&lt;/main&gt;
&lt;footer&gt;© 2026 Habib&lt;/footer&gt;
            </pre>
          </div>
        </div>
      </section>

      <!-- Accessibility -->
      <section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
        <!-- Icon -->
        <div class="flex-shrink-0 text-green-600 text-3xl mb-3 sm:mb-0">
          <i class="fas fa-universal-access"></i>
        </div>
        <!-- Content -->
        <div class="w-full">
          <h3 class="text-xl font-bold text-green-700 mb-2">Accessibility</h3>
          <p class="text-gray-900 font-medium leading-relaxed">
            Use ARIA roles and attributes to make your site accessible. For example, 
            <code class="font-mono bg-gray-200 px-1 rounded">role="navigation"</code> 
            tells assistive tech that this section is for navigation.
          </p>
          <div class="overflow-x-auto mt-3">
            <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
&lt;nav role="navigation"&gt;
  &lt;ul&gt;
    &lt;li&gt;&lt;a href="#"&gt;Home&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#"&gt;About&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;
            </pre>
          </div>
        </div>
      </section>

      <!-- Advanced Forms -->
      <section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
        <!-- Icon -->
        <div class="flex-shrink-0 text-blue-600 text-3xl mb-3 sm:mb-0">
          <i class="fas fa-edit"></i>
        </div>
        <!-- Content -->
        <div class="w-full">
          <h3 class="text-xl font-bold text-blue-700 mb-2">Advanced Forms</h3>
          <p class="text-gray-900 font-medium leading-relaxed">
            Modern HTML forms support new input types like 
            <code class="font-mono bg-gray-200 px-1 rounded">email</code>, 
            <code class="font-mono bg-gray-200 px-1 rounded">date</code>, and 
            <code class="font-mono bg-gray-200 px-1 rounded">range</code>. 
            These improve user experience and validation.
          </p>
          <div class="overflow-x-auto mt-3">
            <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
&lt;form&gt;
  &lt;label&gt;Email: 
    &lt;input type="email" required&gt;
  &lt;/label&gt;
  &lt;label&gt;Birthday: 
    &lt;input type="date"&gt;
  &lt;/label&gt;
&lt;/form&gt;
            </pre>
          </div>
        </div>
      </section>

         <!-- ARIA Roles -->
      <section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm">
        <!-- Icon -->
        <div class="flex-shrink-0 text-violet-700 text-3xl mb-3 sm:mb-0">
          <i class="fas fa-universal-access"></i>
        </div>
        <!-- Content -->
        <div class="w-full">
          <h3 class="text-xl font-bold text-violet-800 mb-2">ARIA Roles</h3>
          <p class="text-gray-900 font-medium leading-relaxed">
            <strong>ARIA (Accessible Rich Internet Applications)</strong> roles help assistive technologies 
            understand the purpose of elements. For example, 
            <code class="font-mono bg-gray-200 px-1 rounded">role="button"</code> 
            tells screen readers that a div acts like a button.
          </p>
          <div class="overflow-x-auto mt-3">
            <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
&lt;div role="button" tabindex="0"&gt;Click Me&lt;/div&gt;
            </pre>
          </div>
        </div>
      </section>

      <!-- Labels & Alt Text -->
      <section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm">
        <!-- Icon -->
        <div class="flex-shrink-0 text-violet-700 text-3xl mb-3 sm:mb-0">
          <i class="fas fa-heading"></i>
        </div>
        <!-- Content -->
        <div class="w-full">
          <h3 class="text-xl font-bold text-violet-800 mb-2">Labels & Alt Text</h3>
          <p class="text-gray-900 font-medium leading-relaxed">
            Always provide <code class="font-mono bg-gray-200 px-1 rounded">alt</code> text for images 
            and use <code class="font-mono bg-gray-200 px-1 rounded">&lt;label&gt;</code> for form inputs. 
            This ensures screen readers can describe content to visually impaired users.
          </p>
          <div class="overflow-x-auto mt-3">
            <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
&lt;img src="logo.png" alt="Company Logo"&gt;

&lt;label for="email"&gt;Email:&lt;/label&gt;
&lt;input type="email" id="email" name="email"&gt;
            </pre>
          </div>
        </div>
      </section>

      <!-- Keyboard Navigation -->
      <section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm">
        <!-- Icon -->
        <div class="flex-shrink-0 text-violet-700 text-3xl mb-3 sm:mb-0">
          <i class="fas fa-keyboard"></i>
        </div>
        <!-- Content -->
        <div class="w-full">
          <h3 class="text-xl font-bold text-violet-800 mb-2">Keyboard Navigation</h3>
          <p class="text-gray-900 font-medium leading-relaxed">
            Ensure all interactive elements are accessible via keyboard. 
            Use <code class="font-mono bg-gray-200 px-1 rounded">tabindex</code> 
            to control focus order and make custom controls usable without a mouse.
          </p>
          <div class="overflow-x-auto mt-3">
            <pre class="bg-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap break-words">
&lt;button&gt;Submit&lt;/button&gt;

&lt;div role="button" tabindex="0"&gt;Custom Button&lt;/div&gt;
            </pre>
          </div>
        </div>
      </section>
       <!-- Conclusion Section -->
    <section class="bg-violet-800 text-white p-8 rounded-lg shadow-lg mt-12 max-w-3xl mx-auto text-center">
      <!-- Icon -->
      <div class="mb-6 flex justify-center">
        <i class="fas fa-award text-6xl text-yellow-400 animate-bounce"></i>
      </div>

      <!-- Content -->
      <div>
        <h3 class="text-3xl font-extrabold mb-4">🎉 Congratulations!</h3>
        <p class="text-lg font-medium leading-relaxed">
          You’ve successfully completed <strong>Module 1</strong> of Advanced HTML Concepts — 
          mastering semantic tags, accessibility practices, and modern form elements.  
          <br/><br/>
          In <strong>Module 2</strong>, you’ll move on to a practical video demonstration that 
          brings these concepts to life. Get ready to see how theory translates into 
          real-world web pages with hands-on examples!
        </p>
      </div>
    </section>

    </div>`,
  };

  const module2 = {
    id: 2, // replace with actual UUID
    type: "video",
    title: "Module 2: Know HTML Basics in 20 Minutes",
    videoUrl: "https://www.youtube.com/embed/HD13eq_Pmp8",
    conclusion: `
      <section class="bg-violet-800 text-white p-6 rounded-lg shadow-lg mt-8 text-center">
        <div class="mb-6 flex justify-center">
          <i class="fas fa-lightbulb text-5xl text-yellow-400 animate-pulse"></i>
        </div>
        <h3 class="text-2xl font-extrabold mb-3">Next Up: Final Quiz!</h3>
        <p class="text-lg font-medium leading-relaxed">
          You’ve now seen HTML in action. In the <strong>next module</strong>, you’ll test your knowledge with a short quiz to reinforce everything you’ve learned.  
          Get ready to challenge yourself and prove your mastery of the basics!
        </p>
      </section>
    `,
  };

  const module3 = {
    id: "f2a9f7c8-6360-4e97-a906-0ccd9aeabd39", // ✅ real UUID from Supabase
    type: "exam",
    title: "Final Module: Advanced HTML Concepts Quiz",
    questions: [
      {
        question:
          "Which semantic tag is used to represent the main content of a webpage?",
        options: [
          "&lt;header&gt;",
          "&lt;main&gt;",
          "&lt;footer&gt;",
          "&lt;article&gt;",
        ],
        answer: 1,
      },
      {
        question:
          "What is the purpose of semantic HTML tags like &lt;header&gt; and &lt;footer&gt;?",
        options: [
          "To style the page",
          "To give meaning and structure",
          "To add images",
          "To validate forms",
        ],
        answer: 1,
      },
      {
        question:
          "Which ARIA role should be used to indicate a navigation section?",
        options: [
          'role="button"',
          'role="navigation"',
          'role="form"',
          'role="header"',
        ],
        answer: 1,
      },
      {
        question:
          "Which input type automatically validates email format in forms?",
        options: ["text", "email", "password", "url"],
        answer: 1,
      },
      {
        question:
          "What attribute provides alternative text for images to assist screen readers?",
        options: ["src", "alt", "title", "href"],
        answer: 1,
      },
      {
        question:
          "Which tag is used to group form inputs with labels for accessibility?",
        options: [
          "&lt;div&gt;",
          "&lt;label&gt;",
          "&lt;span&gt;",
          "&lt;section&gt;",
        ],
        answer: 1,
      },
      {
        question:
          "What ARIA role can make a &lt;div&gt; behave like a button for screen readers?",
        options: [
          'role="navigation"',
          'role="form"',
          'role="button"',
          'role="link"',
        ],
        answer: 2,
      },
      {
        question:
          "Which attribute controls focus order for keyboard navigation?",
        options: ["alt", "tabindex", "aria-role", "id"],
        answer: 1,
      },
      {
        question: "Why is keyboard navigation important in web design?",
        options: [
          "It improves SEO",
          "It ensures accessibility for users without a mouse",
          "It makes forms faster",
          "It adds animations",
        ],
        answer: 1,
      },
      {
        question:
          "Which semantic tag is best for wrapping the footer content of a webpage?",
        options: [
          "&lt;footer&gt;",
          "&lt;bottom&gt;",
          "&lt;end&gt;",
          "&lt;section&gt;",
        ],
        answer: 0,
      },
    ],
  };

  const courseModules = [module1, module2, module3];
  window.courseModules = courseModules; // expose for debugging
  const container = document.getElementById("modules2");
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
      const quizModal = document.getElementById("quizModal-2");
      const modalIcon = document.getElementById("modalIcon-2");
      const modalTitle = document.getElementById("modalTitle-2");
      const modalMessage = document.getElementById("modalMessage-2");
      const modalOk = document.getElementById("modalOk-2");

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
