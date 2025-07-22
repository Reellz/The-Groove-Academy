document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu");
  const navUl = document.querySelector("nav ul");

  if (mobileMenuBtn && navUl) {
    // Toggle mobile menu visibility
    mobileMenuBtn.addEventListener("click", function () {
      navUl.classList.toggle("show");
      // Toggle menu icon between bars and times
      const icon = mobileMenuBtn.querySelector("i");
      if (navUl.classList.contains("show")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });

    // Smooth scroll and close mobile menu on nav link click
    document.querySelectorAll("nav a").forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        // Only prevent default for anchor links
        if (this.getAttribute("href").startsWith("#")) {
          e.preventDefault();
          const targetId = this.getAttribute("href");
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 70,
              behavior: "smooth",
            });
          }
        }

        // Close the mobile menu after clicking a link
        navUl.classList.remove("show");
        // Reset menu icon to bars
        const icon = mobileMenuBtn.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      });
    });
  }

  // Testimonial Slider
  const testimonials = document.querySelectorAll(".testimonial");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let currentIndex = 0;

  function showTestimonial(index) {
    testimonials.forEach((testimonial) => {
      testimonial.classList.remove("active");
    });

    if (testimonials[index]) {
      testimonials[index].classList.add("active");
    }
  }

  if (prevBtn && nextBtn && testimonials.length) {
    prevBtn.addEventListener("click", function () {
      currentIndex =
        (currentIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentIndex);
    });

    nextBtn.addEventListener("click", function () {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    });

    let testimonialInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    }, 5000);

    const testimonialSlider = document.querySelector(".testimonial-slider");
    if (testimonialSlider) {
      testimonialSlider.addEventListener("mouseenter", () => {
        clearInterval(testimonialInterval);
      });

      testimonialSlider.addEventListener("mouseleave", () => {
        testimonialInterval = setInterval(() => {
          currentIndex = (currentIndex + 1) % testimonials.length;
          showTestimonial(currentIndex);
        }, 5000);
      });
    }
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    // Loader
    const loader = document.createElement("div");
    loader.textContent = "Sending...";
    loader.style =
      "position:fixed;top:10px;right:10px;background:#333;color:#fff;padding:10px 15px;border-radius:5px;display:none;z-index:1000";
    document.body.appendChild(loader);

    // Toast function
    const showToast = (message, success = true) => {
      const toast = document.createElement("div");
      toast.textContent = message;
      toast.style =
        "position:fixed;top:10px;left:50%;transform:translateX(-50%);background:" +
        (success ? "#4CAF50" : "#f44336") +
        ";color:white;padding:12px 20px;border-radius:5px;z-index:1000;font-weight:bold;";
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 4000);
    };

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const interest = document.getElementById("interest").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        showToast("Please fill in all required fields.", false);
        return;
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        showToast("Please enter a valid email address.", false);
        return;
      }

      loader.style.display = "block";

      const formData = {
        name,
        email,
        phone,
        interest,
        message,
      };

      fetch(
        "https://script.google.com/macros/s/AKfycbx5gsdVK6DVs3oemXH9vBqxr2gyxF2l80jXVGrtiLRkK3RT1tHL41gDczj1wjREgjJq/exec",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          loader.style.display = "none";
          if (data.result === "success") {
            showToast(`Thank you, ${name}! Your message was sent.`);
            contactForm.reset();
          } else {
            showToast("Something went wrong. Try again.", false);
          }
        })
        .catch((error) => {
          console.error(error);
          loader.style.display = "none";
          showToast("There was an error sending the form.", false);
        });
    });
  }

  // Scroll Animation for Sections
  const sections = document.querySelectorAll("section");

  function checkScroll() {
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight - 100) {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
      }
    });
  }

  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  // FAQ Toggle
  const faqQuestions = document.querySelectorAll('.faq-question');
  if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isOpen = question.classList.contains('active');

        document.querySelectorAll('.faq-question').forEach(q => {
          if (q !== question) {
            q.classList.remove('active');
            q.nextElementSibling.classList.remove('show');
          }
        });

        if (isOpen) {
          question.classList.remove('active');
          answer.classList.remove('show');
        } else {
          question.classList.add('active');
          answer.classList.add('show');
        }
      });
    });
  }

  // Active link highlighting
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  checkScroll();
  window.addEventListener("scroll", checkScroll);
});