const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
let menuOpen = false;

mobileMenuBtn.addEventListener("click", () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle("hidden");

  // Toggle icon between hamburger and close (X)
  if (menuOpen) {
    mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
  } else {
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  }
});

// Section 2 cards
const cards = document.querySelectorAll(".card");

// Section 3 elements
const slideLeftElements = document.querySelectorAll(".animate-slide-left");
const slideRightElements = document.querySelectorAll(".animate-slide-right");

// Section 4 testimonials
const testimonials = document.querySelectorAll(".testimonial-card");

// Section 6 CTA
const ctaContent = document.querySelector(".cta-content");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  // Section 2 cards
  cards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < triggerBottom) {
      card.classList.add("visible");
    }
  });

  // Section 3 image/text
  slideLeftElements.forEach((el) => {
    const elTop = el.getBoundingClientRect().top;
    if (elTop < triggerBottom) {
      el.classList.add("slide-left-start");
    }
  });

  slideRightElements.forEach((el) => {
    const elTop = el.getBoundingClientRect().top;
    if (elTop < triggerBottom) {
      el.classList.add("slide-right-start");
    }
  });

  // Section 4 testimonials
  testimonials.forEach((testimonial, index) => {
    const testimonialTop = testimonial.getBoundingClientRect().top;
    if (testimonialTop < triggerBottom) {
      testimonial.classList.add("visible");
      testimonial.style.transitionDelay = `${index * 0.2}s`; // stagger effect
    }
  });

  // Section 6 CTA
  if (ctaContent) {
    const ctaTop = ctaContent.getBoundingClientRect().top;
    if (ctaTop < triggerBottom) {
      ctaContent.classList.add("bounce-start");
    }
  }
};

window.addEventListener("scroll", revealOnScroll);
