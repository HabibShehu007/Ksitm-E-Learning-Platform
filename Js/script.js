let currentStep = 0;

function setStep(stepIndex, state) {
  const el = document.getElementById("step" + stepIndex);
  if (!el) return;
  el.classList.remove(
    "translate-x-0",
    "translate-x-full",
    "-translate-x-full",
    "opacity-100",
    "opacity-0",
    "pointer-events-auto",
    "pointer-events-none"
  );
  if (state === "active") {
    el.classList.add("translate-x-0", "opacity-100", "pointer-events-auto");
  } else if (state === "right") {
    el.classList.add("translate-x-full", "opacity-0", "pointer-events-none");
  } else if (state === "left") {
    el.classList.add("-translate-x-full", "opacity-0", "pointer-events-none");
  }
}

function render() {
  const steps = document.querySelectorAll(".step");
  steps.forEach((s, i) => {
    if (i < currentStep) {
      setStep(i, "left");
    } else if (i > currentStep) {
      setStep(i, "right");
    } else {
      setStep(i, "active");
    }
  });
}

function goToStep(step) {
  currentStep = step;
  render();
}

document.addEventListener("DOMContentLoaded", render);
