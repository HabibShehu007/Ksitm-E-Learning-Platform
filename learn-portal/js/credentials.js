document.addEventListener("DOMContentLoaded", async () => {
  // ===== Navbar Mobile Drawer Toggle =====
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenuBtn = document.getElementById("closeMenuBtn");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("translate-x-full");
      mobileMenu.classList.add("translate-x-0");
    });
  }

  if (closeMenuBtn && mobileMenu) {
    closeMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("translate-x-0");
      mobileMenu.classList.add("translate-x-full");
    });
  }

  // ===== Credentials Logic =====
  const userId = sessionStorage.getItem("userId");

  if (!userId) {
    console.error("No user session found.");
    return;
  }

  try {
    // Fetch profile info
    const { data: profile, error: profileError } = await window.supabase
      .from("user_profiles")
      .select("name, username, email, phone")
      .eq("id", userId)
      .single();

    if (profileError) console.error("Profile fetch error:", profileError);

    // Fetch application info
    const { data: application, error: appError } = await window.supabase
      .from("applications")
      .select("course_name, status")
      .eq("user_id", userId)
      .single();

    if (appError) console.error("Application fetch error:", appError);

    // Fetch registration info
    const { data: registration, error: regError } = await window.supabase
      .from("registrations")
      .select("registration_number")
      .eq("user_id", userId)
      .single();

    if (regError) console.error("Registration fetch error:", regError);

    // Populate fields
    document.getElementById("userName").textContent = profile?.name || "N/A";
    document.getElementById("userUsername").textContent =
      profile?.username || "N/A";
    document.getElementById("userEmail").textContent = profile?.email || "N/A";
    document.getElementById("userPhone").textContent = profile?.phone || "N/A";
    document.getElementById("userCourse").textContent =
      application?.course_name || "N/A";
    document.getElementById("userStatus").textContent =
      application?.status || "N/A";
    document.getElementById("userRegNumber").textContent =
      registration?.registration_number || "N/A";

    // Copy button logic
    const copyBtn = document.getElementById("copyRegBtn");
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        const regNumber = registration?.reg_number;
        if (regNumber) {
          navigator.clipboard.writeText(regNumber).then(() => {
            alert("Registration number copied to clipboard!");
          });
        }
      });
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
});
