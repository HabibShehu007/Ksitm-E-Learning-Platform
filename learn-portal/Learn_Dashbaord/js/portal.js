document.addEventListener("DOMContentLoaded", async () => {
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const courseTitle = document.getElementById("courseTitle");
  const sidebarCourse = document.getElementById("sidebarCourse");
  const userGreeting = document.getElementById("userGreeting");

  // Sidebar toggle (slide in/out from right + overlay)
  sidebarToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.contains("translate-x-0");

    if (isOpen) {
      sidebar.classList.remove("translate-x-0");
      sidebar.classList.add("translate-x-full");
      sidebarOverlay.classList.add("hidden");
    } else {
      sidebar.classList.remove("translate-x-full");
      sidebar.classList.add("translate-x-0");
      sidebarOverlay.classList.remove("hidden");
    }
  });

  // Close sidebar when clicking overlay
  sidebarOverlay.addEventListener("click", () => {
    sidebar.classList.remove("translate-x-0");
    sidebar.classList.add("translate-x-full");
    sidebarOverlay.classList.add("hidden");
  });

  // ✅ Query applications table for this user
  const userId = sessionStorage.getItem("userId");
  const registrationId = sessionStorage.getItem("registrationId");
  const courseId = sessionStorage.getItem("courseId");

  try {
    const { data: application, error } = await supabase
      .from("applications")
      .select("full_name, course_name, status")
      .eq("user_id", userId) // filter by logged-in user
      .eq("status", "approved")
      .single();

    if (application) {
      courseTitle.textContent = application.course_name;
      sidebarCourse.textContent = application.course_name;
      if (userGreeting) {
        userGreeting.textContent = `Hi ${application.full_name}`;
      }
    } else {
      courseTitle.textContent = "Learn Dashboard";
      sidebarCourse.textContent = "Learn Dashboard";
      if (userGreeting) {
        userGreeting.textContent = "Hi Learner";
      }
    }
  } catch (err) {
    console.error("Error fetching application:", err);
    courseTitle.textContent = "Learn Dashboard";
    sidebarCourse.textContent = "Learn Dashboard";
    if (userGreeting) {
      userGreeting.textContent = "Hi Learner";
    }
  }

  // 🔑 Auto-create class_progress rows if missing
  async function ensureClassProgress(registrationId, courseId) {
    const { data: existing } = await supabase
      .from("class_progress")
      .select("id")
      .eq("registration_id", registrationId);

    if (!existing || existing.length === 0) {
      const { data: classes } = await supabase
        .from("classes")
        .select("id, order_number")
        .eq("course_id", courseId);

      if (classes && classes.length > 0) {
        const rows = classes.map((c) => ({
          registration_id: registrationId,
          class_id: c.id,
          progress: 0.0,
        }));
        await supabase.from("class_progress").insert(rows);
        console.log("✅ class_progress rows created automatically");
      }
    }
  }

  if (registrationId && courseId) {
    await ensureClassProgress(registrationId, courseId);
  }

  // ✅ Fetch progress using registrationId
  const progressData = await getUserProgress(registrationId);

  // 🚫 Restriction logic for class access
  const accessOverlay = document.getElementById("accessOverlay");
  const accessMessage = document.getElementById("accessMessage");
  const closeOverlayBtn = document.getElementById("closeOverlay");
  const modal = document.getElementById("accessModal");

  const container = document.getElementById("class-progress");
  if (container) {
    container.addEventListener("click", (e) => {
      const target = e.target.closest("a");
      if (!target) return;

      // Find which class was clicked based on href
      const clickedClass = progressData.find((row) =>
        target
          .getAttribute("href")
          .includes(`webClass${row.classes.order_number}.html`),
      );

      if (clickedClass) {
        const order = clickedClass.classes.order_number;
        if (order > 1) {
          const prevClassProgress =
            progressData.find((row) => row.classes.order_number === order - 1)
              ?.progress || 0;
          if (prevClassProgress <= 0) {
            e.preventDefault();
            accessMessage.textContent = `You must complete Class ${order - 1} before starting Class ${order}.`;

            accessOverlay.classList.remove("hidden");
            setTimeout(() => {
              modal.classList.remove("scale-95", "opacity-0");
              modal.classList.add("scale-100", "opacity-100");
            }, 10);
          }
        }
      }
    });
  }

  if (closeOverlayBtn) {
    closeOverlayBtn.addEventListener("click", () => {
      modal.classList.remove("scale-100", "opacity-100");
      modal.classList.add("scale-95", "opacity-0");
      setTimeout(() => {
        accessOverlay.classList.add("hidden");
      }, 300);
    });
  }
});
