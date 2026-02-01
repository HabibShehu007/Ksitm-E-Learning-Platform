document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenuBtn = document.getElementById("closeMenuBtn");

  // Open mobile menu
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("translate-x-full");
      mobileMenu.classList.add("translate-x-0");
    });
  }

  // Close mobile menu
  if (closeMenuBtn && mobileMenu) {
    closeMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("translate-x-0");
      mobileMenu.classList.add("translate-x-full");
    });
  }
});
