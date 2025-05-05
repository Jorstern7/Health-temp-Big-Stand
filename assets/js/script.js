// Sticky Header Script
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 0) {
    header.classList.add("sticky-top");
  } else {
    header.classList.remove("sticky-top");
  }
});
document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".featured-swiper", {
    slidesPerView: 4, // Important: 'auto' allows flexible number of slides
    spaceBetween: 0,
    loop: true, // Enable seamless infinite looping
    speed: 3000, // Speed of transition
    autoplay: {
      delay: 0, // No pause between transitions
      pauseOnMouseEnter: false, // Don't pause on mouse enter
      disableOnInteraction: false, // Keep autoplay even if user touches
    },
    grabCursor: true,
    allowTouchMove: true,
    breakpoints: {
      // when window width is >= 320px
      // 320: {
      //   slidesPerView: 2,
      //   spaceBetween: 20
      // },
      // // when window width is >= 480px
      // 480: {
      //   slidesPerView: 3,
      //   spaceBetween: 30
      // },
      // // when window width is >= 640px
      // 640: {
      //   slidesPerView: 4,
      //   spaceBetween: 40
      // }
      500: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 3,
      },
      1199: {
        slidesPerView: 4,
      },
    },
  });
  new Swiper(".pricing-swiper", {
    slidesPerView: 3,
    spaceBetween: 40,
    loop: true,
    speed: 3000,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".right-btn",
      prevEl: ".left-btn",
    },
    grabCursor: true,
    allowTouchMove: true,
    breakpoints: {
      0: {
        // Mobile
        slidesPerView: 1,
      },
      768: {
        // Tablet
        slidesPerView: 2,
      },
      992: {
        // Laptop/Desktop
        slidesPerView: 3,
      },
    },
  });
  new Swiper(".doctors-swiper", {
    slidesPerView: 2,
    spaceBetween: 40,
    loop: true,
    speed: 3000,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".right-btn",
      prevEl: ".left-btn",
    },
    grabCursor: true,
    allowTouchMove: true,

    breakpoints: {
      0: {
        // Mobile
        slidesPerView: 1,
      },
      768: {
        // Tablet
        slidesPerView: 2,
      },
      992: {
        // Laptop/Desktop
        slidesPerView: 2,
      },
    },
  });
  new Swiper(".testimonial-swiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 3000,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    grabCursor: true,
    allowTouchMove: true,
    pagination: {
      el: ".swiper-pagination", // important: you need this element in HTML
      clickable: true,
    },
  });

  const flipElements = document.querySelectorAll(".flip");

  flipElements.forEach(function (flip) {
    flip.addEventListener("mouseenter", function () {
      this.querySelector(".card").classList.add("flipped");
    });

    flip.addEventListener("mouseleave", function () {
      this.querySelector(".card").classList.remove("flipped");
    });
  });

  const goTopButton = document.getElementById("up-arrow");

  // Show button when user scrolls down 300px
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      goTopButton.classList.add("show");
    } else {
      goTopButton.classList.remove("show");
    }
  });

  // Scroll to top smoothly when clicked
  goTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  const header = document.getElementById("header");

  // 1. Target all nav links, dropdown toggles, and also offcanvas links
  const navLinks = document.querySelectorAll(
    '.navbar-nav a[href^="#"], .offcanvas-body a[href^="#"]'
  );
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  const offcanvasElement = document.getElementById("offcanvasNavbar");
  const offcanvasInstance =
    bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // 2. Remove 'active' from all links and dropdown toggles
      navLinks.forEach((l) => l.classList.remove("active"));
      dropdownToggles.forEach((t) => t.classList.remove("active"));

      // 3. Add 'active' to the clicked link
      this.classList.add("active");

      // 4. If inside dropdown, activate parent toggle too
      const dropdown = this.closest(".dropdown-menu");
      if (dropdown) {
        const toggle = dropdown.previousElementSibling;
        if (toggle && toggle.classList.contains("dropdown-toggle")) {
          toggle.classList.add("active");
        }
      }

      // 5. Smooth scroll to the section
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - header.offsetHeight;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }

      // 6. Close the offcanvas if open (for mobile)
      if (offcanvasElement.classList.contains("show")) {
        offcanvasInstance.hide();
      }
    });
  });
  // const header = document.getElementById("header");

  // // Select ALL relevant menu links inside navbar (including dropdown items and btn)
  // const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');
  // const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  // // Click behavior: Manual active class toggle only
  // navLinks.forEach((link) => {
  //   link.addEventListener("click", function (e) {
  //     e.preventDefault();

  //     // Remove active class from all nav-links, dropdown-toggles, and buttons
  //     navLinks.forEach((l) => l.classList.remove("active"));
  //     dropdownToggles.forEach((t) => t.classList.remove("active"));

  //     // Add active class to clicked link
  //     this.classList.add("active");

  //     // Special case: If clicked link is inside a dropdown, mark its toggle as active too
  //     const dropdown = this.closest(".dropdown-menu");
  //     if (dropdown) {
  //       const toggle = dropdown.previousElementSibling;
  //       if (toggle && toggle.classList.contains("dropdown-toggle")) {
  //         toggle.classList.add("active");
  //       }
  //     }

  //     // Scroll to the section smoothly with header offset
  //     const target = document.querySelector(this.getAttribute("href"));
  //     if (target) {
  //       const offsetTop = target.offsetTop - header.offsetHeight;
  //       window.scrollTo({
  //         top: offsetTop,
  //         behavior: "smooth",
  //       });
  //     }
  //   });
  // });
});
