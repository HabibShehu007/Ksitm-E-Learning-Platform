// Resolve class_id by order_number and ensure class_progress row exists
export async function getClassIdByOrder(userId, courseId, orderNumber) {
  const { data: classData, error: classError } = await window.supabase
    .from("classes")
    .select("id, order_number, name")
    .eq("course_id", courseId)
    .eq("order_number", orderNumber)
    .maybeSingle();

  if (classError || !classData) {
    console.error("❌ Error fetching class:", classError);
    return null;
  }

  const classId = classData.id;

  // 🔥 fetch registration_id
  const { data: reg } = await window.supabase
    .from("registrations")
    .select("id")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .maybeSingle();

  // Ensure progress row exists with proper IDs
  const { data: progressData } = await window.supabase
    .from("class_progress")
    .select("id")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .eq("class_id", classId)
    .maybeSingle();

  if (!progressData) {
    console.log("➡️ Creating new class_progress row");
    await window.supabase.from("class_progress").insert({
      user_id: userId,
      course_id: courseId,
      class_id: classId,
      registration_id: reg?.id || null,
      progress: 0,
      updated_at: new Date(),
    });
  }

  return classId;
}

// Submit quiz and update progress
export async function submitQuiz(userId, courseId, orderNumber, score) {
  console.log("🔎 submitQuiz called with:", {
    userId,
    courseId,
    orderNumber,
    score,
  });

  const classId = await getClassIdByOrder(userId, courseId, orderNumber);
  console.log("➡️ Resolved classId:", classId);
  if (!classId) return;

  const { data: reg } = await window.supabase
    .from("registrations")
    .select("id")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .maybeSingle();

  console.log("➡️ Registration row:", reg);

  if (!reg) {
    console.error("❌ No registration found for user/course");
    return;
  }

  const progressValue = score >= 70 ? 100 : 0;
  console.log("➡️ Calculated progressValue:", progressValue);

  // ✅ Update row with proper IDs
  const { error: updateError, data: updateData } = await window.supabase
    .from("class_progress")
    .update({ progress: progressValue, updated_at: new Date() })
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .eq("class_id", classId);

  console.log("➡️ Update result:", { updateError, updateData });

  if (updateError) {
    console.error("❌ Error updating class progress:", updateError);
    return;
  }

  // Fetch all progress rows for this user/course
  const { data: allProgress } = await window.supabase
    .from("class_progress")
    .select("progress")
    .eq("user_id", userId)
    .eq("course_id", courseId);

  console.log("➡️ All progress rows:", allProgress);

  const totalClasses = allProgress.length;
  const overall =
    allProgress.reduce((sum, row) => sum + (row.progress || 0), 0) /
    (totalClasses || 1);

  const overallInt = Math.round(overall);
  console.log("➡️ Overall course progress:", overallInt);

  await window.supabase
    .from("registrations")
    .update({ progress: overallInt })
    .eq("id", reg.id);

  console.log(
    `✅ Quiz submitted for class ${orderNumber}, score=${score}, progress=${progressValue}`,
  );
}
