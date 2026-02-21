// submitQuiz.js
export async function submitQuiz(registrationId, classId, score) {
  // 1. Update class_progress for this class
  const { error: updateError } = await window.supabase
    .from("class_progress")
    .update({ progress: score, updated_at: new Date() })
    .eq("registration_id", registrationId)
    .eq("class_id", classId);

  if (updateError) {
    console.error("Error updating class progress:", updateError);
    return;
  }

  // 2. Recalculate overall course progress
  const { data: allProgress, error: progressError } = await window.supabase
    .from("class_progress")
    .select("progress")
    .eq("registration_id", registrationId);

  if (progressError) {
    console.error("Error fetching all progress:", progressError);
    return;
  }

  const totalClasses = allProgress.length;
  const overall =
    allProgress.reduce((sum, row) => sum + (row.progress || 0), 0) /
    totalClasses;

  // 3. Update registration progress
  const { error: regUpdateError } = await window.supabase
    .from("registrations")
    .update({ progress: overall })
    .eq("id", registrationId);

  if (regUpdateError) {
    console.error("Error updating registration progress:", regUpdateError);
    return;
  }

  console.log("✅ Quiz submitted, progress updated");
}
