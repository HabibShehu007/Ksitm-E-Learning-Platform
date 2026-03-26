document.addEventListener("DOMContentLoaded", async () => {
  const userId = sessionStorage.getItem("userId");

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  const profilePic = document.getElementById("profilePic");
  const defaultAvatar = document.getElementById("defaultAvatar");
  const uploadInput = document.getElementById("avatarUpload");
  const loader = document.getElementById("uploadLoader");
  const successModal = document.getElementById("successModal");
  const closeSuccessModal = document.getElementById("closeSuccessModal");

  if (userId) {
    // ✅ Fetch profile including avatar_url
    const { data: profileData, error: profileError } = await supabase
      .from("user_profiles")
      .select("username, name, email, phone, dob, address, avatar_url")
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
    setText("dobDisplay", profileData?.dob || "Not Provided");
    setText("addressDisplay", profileData?.address || "Not Provided");

    // ✅ Toggle avatar
    if (profileData?.avatar_url) {
      profilePic.src = profileData.avatar_url;
      profilePic.classList.remove("hidden");
      defaultAvatar.classList.add("hidden");
      sessionStorage.setItem("userAvatarUrl", profileData.avatar_url);
    } else {
      profilePic.classList.add("hidden");
      defaultAvatar.classList.remove("hidden");
    }

    // ✅ Fetch registration info (reg number + course_id)
    const { data: regData, error: regError } = await supabase
      .from("registrations")
      .select("registration_number, course_id")
      .eq("user_id", userId)
      .single();

    if (regError) {
      console.error("Registration fetch error:", regError);
    }

    setText("regNumberDisplay", regData?.registration_number || "Not Provided");

    // ✅ Fetch course name from applications
    const { data: applicationData, error: appError } = await supabase
      .from("applications")
      .select("course_name")
      .eq("user_id", userId)
      .single();

    if (appError) {
      console.error("Application fetch error:", appError);
    }

    setText(
      "courseDisplay",
      applicationData?.course_name || "No Course Selected",
    );

    // ✅ Handle avatar upload (unchanged)
    uploadInput?.addEventListener("change", async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      loader.classList.remove("hidden");

      const filePath = `${userId}/${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        console.error("❌ Upload failed:", uploadError.message);
        loader.classList.add("hidden");
        return;
      }

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      const publicUrl = data.publicUrl;

      await supabase
        .from("user_profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", userId);

      sessionStorage.setItem("userAvatarUrl", publicUrl);

      profilePic.src = publicUrl;
      profilePic.classList.remove("hidden");
      defaultAvatar.classList.add("hidden");

      loader.classList.add("hidden");
      successModal.classList.remove("hidden");

      closeSuccessModal?.addEventListener("click", () => {
        successModal.classList.add("hidden");
      });
    });
  } else {
    // Fallback if no userId
    setText("profileName", "Guest");
    setText("profileEmail", "Not Provided");
    setText("emailDisplay", "Not Provided");
    setText("phoneDisplay", "Not Provided");
    setText("dobDisplay", "Not Provided");
    setText("addressDisplay", "Not Provided");
    setText("courseDisplay", "No Course Selected");
    setText("regNumberDisplay", "Not Provided");

    profilePic.classList.add("hidden");
    defaultAvatar.classList.remove("hidden");
  }
});
