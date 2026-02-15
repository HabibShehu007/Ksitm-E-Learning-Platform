document.addEventListener("DOMContentLoaded", async () => {
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const courseTitle = document.getElementById("courseTitle");
  const sidebarCourse = document.getElementById("sidebarCourse");
  const userGreeting = document.getElementById("userGreeting"); // 👈 new element in header

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

  // ✅ Query applications table directly
  try {
    const { data: application, error } = await supabase
      .from("applications")
      .select("full_name, course_name, status")
      .eq("status", "approved") // only approved users
      .single();

    if (application) {
      // Course name
      courseTitle.textContent = application.course_name;
      sidebarCourse.textContent = application.course_name;

      // Greeting
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
});
