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

  sidebarOverlay.addEventListener("click", () => {
    sidebar.classList.remove("translate-x-0");
    sidebar.classList.add("translate-x-full");
    sidebarOverlay.classList.add("hidden");
  });

  // ✅ Application query logic (unchanged)
  const userId = sessionStorage.getItem("userId");
  const courseId = sessionStorage.getItem("courseId");
  try {
    const { data: application } = await supabase
      .from("applications")
      .select("full_name, course_name, status")
      .eq("user_id", userId)
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

  // ✅ Logout modal setup
  function setupLogoutModal() {
    const logoutBtnDrawer = document.getElementById("logoutBtnDrawer");
    const logoutModal = document.getElementById("logoutModal");
    const logoutModalContent = document.getElementById("logoutModalContent");
    const confirmLogoutBtn = document.getElementById("confirmLogoutBtn");
    const cancelLogoutBtn = document.getElementById("cancelLogoutBtn");

    logoutBtnDrawer?.addEventListener("click", (e) => {
      e.preventDefault();
      logoutModal.classList.remove("hidden");
      setTimeout(() => {
        logoutModalContent.classList.remove("scale-95", "opacity-0");
        logoutModalContent.classList.add("scale-100", "opacity-100");
      }, 10);
    });

    cancelLogoutBtn?.addEventListener("click", () => {
      logoutModalContent.classList.remove("scale-100", "opacity-100");
      logoutModalContent.classList.add("scale-95", "opacity-0");
      setTimeout(() => logoutModal.classList.add("hidden"), 300);
    });

    confirmLogoutBtn?.addEventListener("click", async () => {
      try {
        await window.supabase.auth.signOut();
        sessionStorage.clear();
        window.location.href = "/Pages/login.html";
      } catch (err) {
        console.error("Logout error:", err);
      }
    });
  }

  setupLogoutModal();

  // 🔑 Auto-create class_progress rows if missing
  async function ensureClassProgress(userId, courseId) {
    const { data: existing } = await supabase
      .from("class_progress")
      .select("id")
      .eq("user_id", userId)
      .eq("course_id", courseId);

    if (!existing || existing.length === 0) {
      const { data: classes } = await supabase
        .from("classes")
        .select("id, order_number")
        .eq("course_id", courseId);

      if (classes && classes.length > 0) {
        const rows = classes.map((c) => ({
          user_id: userId,
          course_id: courseId,
          class_id: c.id,
          progress: 0.0,
        }));
        await supabase.from("class_progress").insert(rows);
        console.log("✅ class_progress rows created automatically");
      }
    }
  }

  // ✅ Ensure progress rows and render immediately
  if (userId && courseId) {
    await ensureClassProgress(userId, courseId);

    const progressData = await getUserProgress(userId, courseId);

    if (document.getElementById("overall-bar")) {
      renderProgressCards(progressData);
      renderOverall(progressData);
    } else {
      renderClassCards(progressData);
    }

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

        const href = target.getAttribute("href");
        console.log("🔗 Clicked link:", href);

        const fileName = href.split("/").pop(); // normalize filename
        const clickedClass = progressData.find(
          (row) => fileName === `webClass${row.classes.order_number}.html`,
        );

        console.log("🎯 Matched class:", clickedClass);

        if (clickedClass) {
          const order = clickedClass.classes.order_number;
          console.log("📌 Order number:", order);

          // ✅ Always allow Class 1
          if (order === 1) {
            console.log("✅ Access allowed: Class 1 is always open");
            return;
          }

          const prevClassProgress =
            progressData.find((row) => row.classes.order_number === order - 1)
              ?.progress || 0;

          console.log(
            `📊 Previous class ${order - 1} progress:`,
            prevClassProgress,
          );

          if (prevClassProgress < 100) {
            console.log("⛔ Restriction triggered");
            e.preventDefault();
            accessMessage.textContent = `You must complete Class ${order - 1} before starting Class ${order}.`;
            accessOverlay.classList.remove("hidden");
            setTimeout(() => {
              modal.classList.remove("scale-95", "opacity-0");
              modal.classList.add("scale-100", "opacity-100");
            }, 10);
          } else {
            console.log("✅ Access allowed");
          }
        }
      });
    }

    if (closeOverlayBtn) {
      closeOverlayBtn.addEventListener("click", () => {
        console.log("🔒 Closing overlay");
        modal.classList.remove("scale-100", "opacity-100");
        modal.classList.add("scale-95", "opacity-0");
        setTimeout(() => {
          accessOverlay.classList.add("hidden");
        }, 300);
      });
    }
  }
});
