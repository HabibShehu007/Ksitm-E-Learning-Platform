// Handle signup form
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document
    .getElementById("confirmPassword")
    .value.trim();

  // validations
  if (!username || !name || !phone || !email || !password || !confirmPassword) {
    return showModal("error", "⚠️ All fields are required.");
  }
  if (!email.includes("@")) {
    return showModal("warning", "📧 Invalid email format.");
  }
  if (password !== confirmPassword) {
    return showModal("error", "🔑 Passwords do not match.");
  }

  // Show loading state
  showModal("info", "⏳ Creating your account... Please wait.");

  try {
    // Supabase signup with email + password
    const { data, error } = await window.supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          "https://ksitm-e-learning-platform.vercel.app/Pages/login.html",
      },
    });

    if (error) {
      return setTimeout(() => {
        showModal("error", "🚫 " + error.message);
      }, 2000);
    }

    // Insert into profiles table (only if user object exists)
    if (data?.user) {
      const { error: profileError } = await window.supabase
        .from("profiles")
        .insert([
          {
            id: data.user.id, // must match auth.users.id
            full_name: name,
            email: email,
            phone_number: phone,
            is_admin: false,
            blocked: false,
            verified: false, // default until email confirmed
          },
        ]);

      if (profileError) {
        console.error("Error inserting profile:", profileError.message);
        return setTimeout(() => {
          showModal(
            "error",
            "🚫 Profile insert failed: " + profileError.message
          );
        }, 2000);
      }
    }

    // Success modal (no auto redirect until email verified)
    setTimeout(() => {
      showModal(
        "success",
        "🎉 Account created successfully! Please check your email (and spam folder) for a verification link. Once verified, you’ll be redirected to the login page."
      );
    }, 2000);
  } catch (err) {
    console.error("Unexpected signup error:", err);
    setTimeout(() => {
      showModal("error", "⚠️ Something went wrong. Please try again.");
    }, 2000);
  }
});
