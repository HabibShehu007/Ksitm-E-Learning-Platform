document.addEventListener("DOMContentLoaded", async () => {
  const userId = sessionStorage.getItem("userId"); // still need this to know which row to fetch

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  if (userId) {
    // ✅ Fetch all profile fields directly from user_profiles
    const { data: profileData, error: profileError } = await supabase
      .from("user_profiles")
      .select("username, name, email, phone, dob, address") // include dob + address here
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error("Profile fetch error:", profileError);
    }

    // Map profile data to DOM
    setText("profileName", profileData?.name || "Guest");
    setText("profileEmail", profileData?.email || "Not Provided");
    setText("emailDisplay", profileData?.email || "Not Provided");
    setText("phoneDisplay", profileData?.phone || "Not Provided");
    setText("dobDisplay", profileData?.dob || "Not Provided"); // ✅ now from user_profiles
    setText("addressDisplay", profileData?.address || "Not Provided"); // ✅ now from user_profiles

    // ✅ Fetch course only from application table
    const { data: applicationData, error: appError } = await supabase
      .from("application")
      .select("course")
      .eq("id", userId)
      .single();

    if (appError) {
      console.error("Application fetch error:", appError);
    }

    setText("courseDisplay", applicationData?.course || "No Course Selected");
  } else {
    // Fallback if no userId
    setText("profileName", "Guest");
    setText("profileEmail", "Not Provided");
    setText("emailDisplay", "Not Provided");
    setText("phoneDisplay", "Not Provided");
    setText("dobDisplay", "Not Provided");
    setText("addressDisplay", "Not Provided");
    setText("courseDisplay", "No Course Selected");
  }
});
