document.addEventListener("DOMContentLoaded", () => {
  const modules = [
    {
      id: 1,
      type: "theory",
      title: "Module 1: Introduction to HTML",
      content: `
    <div class="space-y-8">

   <section class="flex flex-col sm:flex-row items-start sm:space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
  <!-- Icon -->
  <div class="flex-shrink-0 text-violet-700 text-3xl mb-3 sm:mb-0">
    <i class="fas fa-code"></i>
  </div>
  <!-- Content -->
  <div>
    <h3 class="text-xl font-bold text-violet-800 mb-2">What is HTML?</h3>
    <p class="text-gray-900 font-medium leading-relaxed">
      <strong>HTML (HyperText Markup Language)</strong> is the foundation of every website. 
      It acts as the <strong>blueprint</strong> that defines the structure of a webpage. 
      With HTML, developers use <em>tags</em> to organize content into headings, paragraphs, links, images, and more.
    </p>
  </div>
</section>

<section class="bg-gray-50 p-4 rounded-lg shadow-sm mt-6">
  <div class="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
    <!-- Icon -->
    <div class="flex-shrink-0 text-violet-700 text-3xl mb-3 sm:mb-0 sm:w-12 sm:text-center">
      <i class="fas fa-file-alt"></i>
    </div>
    <!-- Content -->
    <div class="flex-1">
      <h3 class="text-xl font-bold text-violet-800 mb-2">Basic Structure of an HTML Document</h3>
      <p class="text-gray-900 font-medium leading-relaxed mb-3">
        Every HTML page begins with a 
        <code class="font-mono bg-gray-200 px-1 rounded">&lt;!DOCTYPE html&gt;</code> declaration. 
        Below is the skeleton of a simple HTML document:
      </p>
      <pre class="bg-gray-100 text-gray-800 font-mono p-4 rounded-lg overflow-x-auto mb-4">
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;My First Page&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello World!&lt;/h1&gt;
    &lt;p&gt;This is my first HTML page.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;
      </pre>
    </div>
  </div>
</section>


<!-- Headings Section -->
<section class="bg-gray-50 p-4 rounded-lg shadow-sm mt-6">
  <div class="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
    <!-- Icon -->
    <div class="flex-shrink-0 text-violet-700 text-3xl mb-3 sm:mb-0 sm:w-12 sm:text-center">
      <i class="fas fa-heading"></i>
    </div>
    <!-- Content -->
    <div class="flex-1">
      <h3 class="text-xl font-bold text-violet-800 mb-2">Headings</h3>
      <p class="text-gray-900 font-medium leading-relaxed mb-3">
        Headings give structure to your content. HTML provides six levels of headings, from 
        <code class="font-mono bg-gray-200 px-1 rounded">&lt;h1&gt;</code> (most important) to 
        <code class="font-mono bg-gray-200 px-1 rounded">&lt;h6&gt;</code> (least important).
      </p>
      <pre class="bg-gray-100 text-gray-800 font-mono p-4 rounded-lg overflow-x-auto mb-4">
&lt;h1&gt;Main Title&lt;/h1&gt;
&lt;h2&gt;Subtitle&lt;/h2&gt;
&lt;h3&gt;Section Heading&lt;/h3&gt;
      </pre>
    </div>
  </div>
</section>

<!-- Paragraphs Section -->
<section class="bg-gray-50 p-4 rounded-lg shadow-sm mt-6">
  <div class="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
    <!-- Icon -->
    <div class="flex-shrink-0 text-violet-700 text-3xl mb-3 sm:mb-0 sm:w-12 sm:text-center">
      <i class="fas fa-align-left"></i>
    </div>
    <!-- Content -->
    <div class="flex-1">
      <h3 class="text-xl font-bold text-violet-800 mb-2">Paragraphs</h3>
      <p class="text-gray-900 font-medium leading-relaxed mb-3">
        Paragraphs are defined with the <code class="font-mono bg-gray-200 px-1 rounded">&lt;p&gt;</code> tag. 
        They are used to display blocks of text.
      </p>
      <pre class="bg-gray-100 text-gray-800 font-mono p-4 rounded-lg overflow-x-auto mb-4">
&lt;p&gt;This is a paragraph of text.&lt;/p&gt;
      </pre>
    </div>
  </div>
</section>

<!-- Links Section -->
<section class="bg-gray-50 p-4 rounded-lg shadow-sm mt-6">
  <div class="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
    <!-- Icon -->
    <div class="flex-shrink-0 text-violet-700 text-3xl mb-3 sm:mb-0 sm:w-12 sm:text-center">
      <i class="fas fa-link"></i>
    </div>
    <!-- Content -->
    <div class="flex-1">
      <h3 class="text-xl font-bold text-violet-800 mb-2">Links</h3>
      <p class="text-gray-900 font-medium leading-relaxed mb-3">
        Links connect one page to another. They are created using the 
        <code class="font-mono bg-gray-200 px-1 rounded">&lt;a&gt;</code> tag with the 
        <code class="font-mono bg-gray-200 px-1 rounded">href</code> attribute.
      </p>
      <pre class="bg-gray-100 text-gray-800 font-mono p-4 rounded-lg overflow-x-auto mb-4">
&lt;a href="https://www.example.com"&gt;Visit Example&lt;/a&gt;
      </pre>
    </div>
  </div>
</section>

<!-- Images Section -->
<section class="bg-gray-50 p-4 rounded-lg shadow-sm mt-6">
  <div class="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
    <!-- Icon -->
    <div class="flex-shrink-0 text-violet-700 text-3xl mb-3 sm:mb-0 sm:w-12 sm:text-center">
      <i class="fas fa-image"></i>
    </div>
    <!-- Content -->
    <div class="flex-1">
      <h3 class="text-xl font-bold text-violet-800 mb-2">Images</h3>
      <p class="text-gray-900 font-medium leading-relaxed mb-3">
        Images are added with the <code class="font-mono bg-gray-200 px-1 rounded">&lt;img&gt;</code> tag. 
        Always include the <code class="font-mono bg-gray-200 px-1 rounded">alt</code> attribute for accessibility.
      </p>
      <pre class="bg-gray-100 text-gray-800 font-mono p-4 rounded-lg overflow-x-auto mb-4">
&lt;img src="logo.png" alt="Website Logo"&gt;
      </pre>
    </div>
  </div>
</section>


      <!-- Lists Section -->
<section class="bg-gray-50 p-4 rounded-lg shadow-sm mt-6">
  <div class="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
    <!-- Icon -->
    <div class="flex-shrink-0 text-violet-700 text-3xl mb-3 sm:mb-0 sm:w-12 sm:text-center">
      <i class="fas fa-list-ul"></i>
    </div>
    <!-- Content -->
    <div class="flex-1">
      <h3 class="text-xl font-bold text-violet-800 mb-2">Lists</h3>
      <p class="text-gray-900 font-medium leading-relaxed mb-3">
        HTML supports ordered (<code class="font-mono bg-gray-200 px-1 rounded">&lt;ol&gt;</code>) and unordered 
        (<code class="font-mono bg-gray-200 px-1 rounded">&lt;ul&gt;</code>) lists.
      </p>
      <pre class="bg-gray-100 text-gray-800 font-mono p-4 rounded-lg overflow-x-auto mb-4">
&lt;ul&gt;
  &lt;li&gt;Item 1&lt;/li&gt;
  &lt;li&gt;Item 2&lt;/li&gt;
&lt;/ul&gt;

&lt;ol&gt;
  &lt;li&gt;First&lt;/li&gt;
  &lt;li&gt;Second&lt;/li&gt;
&lt;/ol&gt;
      </pre>
    </div>
  </div>
</section>

<!-- Tables Section -->
<section class="bg-gray-50 p-4 rounded-lg shadow-sm mt-6">
  <div class="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
    <!-- Icon -->
    <div class="flex-shrink-0 text-violet-700 text-3xl mb-3 sm:mb-0 sm:w-12 sm:text-center">
      <i class="fas fa-table"></i>
    </div>
    <!-- Content -->
    <div class="flex-1">
      <h3 class="text-xl font-bold text-violet-800 mb-2">Tables</h3>
      <p class="text-gray-900 font-medium leading-relaxed mb-3">
        Tables organize data into rows and columns. They are useful for displaying structured information.
      </p>
      <pre class="bg-gray-100 text-gray-800 font-mono p-4 rounded-lg overflow-x-auto mb-4">
&lt;table&gt;
  &lt;tr&gt;
    &lt;th&gt;Name&lt;/th&gt;
    &lt;th&gt;Age&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Alice&lt;/td&gt;
    &lt;td&gt;24&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;
      </pre>
    </div>
  </div>
</section>

<!-- Forms Section -->
<section class="bg-gray-50 p-4 rounded-lg shadow-sm mt-6">
  <div class="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
    <!-- Icon -->
    <div class="flex-shrink-0 text-violet-700 text-3xl mb-3 sm:mb-0 sm:w-12 sm:text-center">
      <i class="fas fa-edit"></i>
    </div>
    <!-- Content -->
    <div class="flex-1">
      <h3 class="text-xl font-bold text-violet-800 mb-2">Forms</h3>
      <p class="text-gray-900 font-medium leading-relaxed mb-3">
        Forms collect user input. They are essential for creating interactive websites.
      </p>
      <pre class="bg-gray-100 text-gray-800 font-mono p-4 rounded-lg overflow-x-auto mb-4">
&lt;form&gt;
  &lt;label for="name"&gt;Name:&lt;/label&gt;
  &lt;input type="text" id="name" name="name"&gt;
  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;
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
      You’ve successfully completed <strong>Module 1</strong> and built a solid foundation in HTML — mastering headings, paragraphs, links, images, lists, tables, and forms.  
      <br/><br/>
      In <strong>Module 2</strong>, you’ll watch a practical video demonstration that brings all these concepts to life.  
      Get ready to see HTML in action and understand how theory translates into real-world web pages!
    </p>
  </div>
</section>


  `,
    },
    {
      id: 2,
      type: "video",
      title: "Module 2: Know HTML Basics in 20 Minutes",
      videoUrl: "https://www.youtube.com/embed/1V4lah1NsuM", // <-- updated link
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
    },
    {
      id: 3,
      type: "exam",
      title: "Final Module: HTML Basics Quiz",
      questions: [
        {
          question: "What does HTML stand for?",
          options: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "HyperTool Multi Language",
            "HomeText Markup Language",
          ],
          answer: 0,
        },
        {
          question: "Which tag is used for the largest heading?",
          options: [
            "&lt;h6&gt;",
            "&lt;h1&gt;",
            "&lt;head&gt;",
            "&lt;heading&gt;",
          ],
          answer: 1,
        },
        {
          question: "Which tag is used to define a paragraph?",
          options: [
            "&lt;para&gt;",
            "&lt;p&gt;",
            "&lt;pg&gt;",
            "&lt;paragraph&gt;",
          ],
          answer: 1,
        },
        {
          question:
            "Which attribute is used to provide alternative text for an image?",
          options: ["src", "alt", "title", "href"],
          answer: 1,
        },
        {
          question: "Which tag is used to create a hyperlink?",
          options: [
            "&lt;link&gt;",
            "&lt;a&gt;",
            "&lt;href&gt;",
            "&lt;hyper&gt;",
          ],
          answer: 1,
        },
        {
          question: "Which tag is used to create an unordered list?",
          options: ["&lt;ol&gt;", "&lt;ul&gt;", "&lt;list&gt;", "&lt;li&gt;"],
          answer: 1,
        },
        {
          question: "Which tag is used to insert a line break?",
          options: [
            "&lt;break&gt;",
            "&lt;lb&gt;",
            "&lt;br&gt;",
            "&lt;newline&gt;",
          ],
          answer: 2,
        },
        {
          question: "Which tag is used to define a table row?",
          options: ["&lt;td&gt;", "&lt;tr&gt;", "&lt;th&gt;", "&lt;row&gt;"],
          answer: 1,
        },
        {
          question: "Which tag is used to define a form?",
          options: [
            "&lt;form&gt;",
            "&lt;input&gt;",
            "&lt;button&gt;",
            "&lt;submit&gt;",
          ],
          answer: 0,
        },
        {
          question: "Which tag is used to define the document title?",
          options: [
            "&lt;title&gt;",
            "&lt;head&gt;",
            "&lt;h1&gt;",
            "&lt;meta&gt;",
          ],
          answer: 0,
        },
      ],
    },
  ];

  const container = document.getElementById("modules");

  modules.forEach((module) => {
    const card = document.createElement("div");
    card.className = "rounded-lg shadow overflow-hidden";

    // Header (always violet)
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

    if (module.type === "theory") {
      body.innerHTML = `
      <div class="bg-gray-100 text-gray-900 font-medium p-4 leading-relaxed">
        ${module.content}
      </div>
    `;
    } else if (module.type === "video") {
      body.innerHTML = `
    <div class="p-4 bg-gray-100">
      <div class="relative w-full h-64 rounded-lg bg-black flex items-center justify-center">
        <!-- Custom Play Button -->
        <button id="playBtn-${module.id}" class="text-white text-5xl focus:outline-none">
          <i class="fas fa-play-circle"></i>
        </button>

        <!-- Hidden YouTube iframe -->
        <iframe 
          id="videoFrame-${module.id}"
          class="absolute inset-0 w-full h-full rounded-lg hidden"
          src="${module.videoUrl}?autoplay=1&modestbranding=1&rel=0&controls=1"
          frameborder="0"
          allowfullscreen>
        </iframe>
      </div>
    </div>
    ${module.conclusion ? module.conclusion : ""}
  `;

      // Play button logic
      const playBtn = body.querySelector(`#playBtn-${module.id}`);
      const videoFrame = body.querySelector(`#videoFrame-${module.id}`);

      playBtn.addEventListener("click", () => {
        playBtn.style.display = "none"; // hide play button
        videoFrame.classList.remove("hidden"); // show video
      });
    } else if (module.type === "exam") {
      body.innerHTML = `
    <div class="bg-gray-100 text-gray-900 font-medium p-6 leading-relaxed flex flex-col min-h-[500px]">
      <!-- Progress indicator -->
      <div id="progress-${module.id}" class="flex justify-center mb-6 space-x-2"></div>

      <!-- Question + Navigation wrapper -->
      <div class="flex flex-col flex-grow">
        <!-- Question container -->
        <div id="quiz-container-${module.id}" class="flex-grow p-6 bg-white rounded-lg shadow-md min-h-[250px]"></div>

        <!-- Navigation buttons -->
        <div class="flex justify-between mt-6">
          <button id="back-btn-${module.id}" class="bg-gray-300 text-gray-700 px-4 py-2 rounded hidden">Back</button>
          <button id="next-btn-${module.id}" class="bg-violet-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-violet-700 transition" disabled>Next</button>
        </div>
      </div>
    </div>
  `;

      const quizContainer = body.querySelector(`#quiz-container-${module.id}`);
      const progressContainer = body.querySelector(`#progress-${module.id}`);
      const nextBtn = body.querySelector(`#next-btn-${module.id}`);
      const backBtn = body.querySelector(`#back-btn-${module.id}`);

      // Global modal references (defined in HTML)
      const quizModal = document.getElementById("quizModal");
      const modalMessage = document.getElementById("modalMessage");
      const modalIcon = document.getElementById("modalIcon");
      const modalTitle = document.getElementById("modalTitle");
      const modalOk = document.getElementById("modalOk");

      let currentQuestion = 0;
      let answers = Array(module.questions.length).fill(null);

      // Build progress circles (but don’t render questions yet)
      module.questions.forEach((_, i) => {
        const circle = document.createElement("div");
        circle.className =
          "w-8 h-8 flex items-center justify-center rounded-full border border-violet-600 text-violet-600 text-sm font-bold transition";
        circle.innerText = i + 1;
        progressContainer.appendChild(circle);
      });
      const progressCircles = progressContainer.querySelectorAll("div");

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

        backBtn.classList.toggle("hidden", currentQuestion === 0);
        nextBtn.innerText =
          currentQuestion === module.questions.length - 1 ? "Submit" : "Next";
        nextBtn.disabled = answers[currentQuestion] === null;

        quizContainer.querySelectorAll("input[type=radio]").forEach((radio) => {
          radio.addEventListener("change", () => {
            answers[currentQuestion] = parseInt(radio.value);
            nextBtn.disabled = false;
          });
        });
      }

      // 🔒 NEW: Intercept header click to check lock
      header.addEventListener("click", async () => {
        const userId = sessionStorage.getItem("userId");
        const courseId = sessionStorage.getItem("courseId");

        const { data, error } = await window.supabase
          .from("registrations")
          .select("progress")
          .eq("user_id", userId)
          .eq("course_id", courseId)
          .single();

        if (error) {
          console.error("Error checking quiz status:", error);
        }

        if (data && data.progress > 0) {
          // Show locked modal
          modalIcon.className = "fas fa-lock text-red-500 text-5xl mb-4";
          modalTitle.textContent = "Quiz Locked";
          modalMessage.textContent =
            "You’ve already submitted this quiz. It cannot be opened again.";
          quizModal.classList.remove("hidden");

          modalOk.onclick = () => {
            quizModal.classList.add("hidden");
            body.style.maxHeight = "0px"; // collapse body again
          };
        } else {
          // Expand and render quiz normally
          body.style.maxHeight = body.scrollHeight + "px";
          header.querySelector("i").classList.remove("fa-chevron-down");
          header.querySelector("i").classList.add("fa-chevron-up");
          renderQuestion();
        }
      });

      // Navigation
      nextBtn.addEventListener("click", async () => {
        if (answers[currentQuestion] !== null) {
          if (currentQuestion < module.questions.length - 1) {
            currentQuestion++;
            renderQuestion();
          } else {
            const score =
              answers.filter((ans, i) => ans === module.questions[i].answer)
                .length * 10;

            const userId = sessionStorage.getItem("userId");
            const courseId = sessionStorage.getItem("courseId");

            if (score >= 70) {
              const { error } = await window.supabase
                .from("registrations")
                .update({ progress: score })
                .eq("user_id", userId)
                .eq("course_id", courseId);

              if (error) {
                console.error("Error updating progress:", error);
              }

              modalIcon.className =
                "fas fa-trophy text-yellow-500 text-5xl mb-4 animate-bounce";
              modalTitle.textContent = "Quiz Completed!";
              modalMessage.textContent = `Your Score: ${score}%. 🎉 Great job! You passed and your progress has been updated. You can proceed to the next class.`;
              quizModal.classList.remove("hidden");
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

      backBtn.addEventListener("click", () => {
        if (currentQuestion > 0) {
          currentQuestion--;
          renderQuestion();
        }
      });
    }

    // Toggle expand/collapse with dynamic height
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
        body.style.maxHeight = body.scrollHeight + "px"; // expand fully
        icon.classList.remove("fa-chevron-down");
        icon.classList.add("fa-chevron-up");
      } else {
        body.style.maxHeight = "0px"; // collapse
        icon.classList.remove("fa-chevron-up");
        icon.classList.add("fa-chevron-down");
      }
    });

    card.appendChild(header);
    card.appendChild(body);
    container.appendChild(card);
  });
});
