// overlay.js

// Utility functions to show/hide overlays
function showSuccessOverlay() {
  const el = document.getElementById("successOverlay");
  if (!el) return;
  el.classList.remove("hidden");
}
function closeSuccessOverlay() {
  const el = document.getElementById("successOverlay");
  if (!el) return;
  el.classList.add("hidden");
}

function showErrorOverlay() {
  const el = document.getElementById("errorOverlay");
  if (!el) return;
  el.classList.remove("hidden");
}
function closeErrorOverlay() {
  const el = document.getElementById("errorOverlay");
  if (!el) return;
  el.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", async () => {
  // Ensure Supabase client exists
  if (!window.supabase) {
    console.error(
      "Supabase client not initialized. Load Supabase before overlay.js",
    );
    return;
  }

  // Get the logged-in user from Supabase auth
  const { data, error } = await window.supabase.auth.getUser();
  if (error) {
    console.error("Auth error:", error.message);
    return;
  }
  const user = data?.user;
  if (!user) {
    console.log("No logged-in user, overlays disabled.");
    return;
  }

  // Subscribe to realtime changes for this user's application
  window.supabase
    .channel("global-application-status")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "applications",
        filter: `user_id=eq.${user.id}`,
      },
      (payload) => {
        console.log("Realtime update:", payload);

        if (payload.new) {
          const status = payload.new.status;
          if (status === "approved") {
            showSuccessOverlay();
          } else if (status === "rejected") {
            showErrorOverlay();
          }
        }
      },
    )
    .subscribe();
});
