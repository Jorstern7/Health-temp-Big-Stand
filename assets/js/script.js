 // ====================================================================================
  // ======================      Sticky Header     =====================================
  // ====================================================================================

const header = document.getElementById("header");
const hero = document.querySelector(".section-health");

window.addEventListener("load", () => {
  hero.style.paddingTop = header.offsetHeight + "px";
});
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      header.classList.add("sticky");
      hero.style.paddingTop = header.offsetHeight + "px";
    }

    if (ent.isIntersecting === true) {
      header.classList.remove("sticky");
      // hero.style.paddingTop = "50px";
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-100px",
  }
);
obs.observe(hero);


document.addEventListener("DOMContentLoaded", function () {
  const toggler = document.querySelector(".navbar-toggler");
  toggler.addEventListener("click", () => {
    toggler.classList.toggle("opened");
  });


  // ======== MObile imags on Hero Section ==========
  const headerSwiper = new Swiper(".header-swiper", {
    slidesPerView: 3, // Important: 'auto' allows flexible number of slides
    spaceBetween: 0,
    loop: true, // Enable seamless infinite looping
    speed: 5000, // Speed of transition
    autoplay: {
      delay: 0, // No pause between transitions
      pauseOnMouseEnter: false, // Don't pause on mouse enter
      disableOnInteraction: false, // Keep autoplay even if user touches
    },
    grabCursor: true,
    allowTouchMove: true,
    // runCallbacksOnInit: true, // 🔸 Important to fire slideChange/init
    on: {
      init: function (swiper) {
        scaleMiddleSlide(swiper);
      },
      slideChangeTransitionEnd: function (swiper) {
        scaleMiddleSlide(swiper);
      },
    },
  });
// =========================== End ============


  function scaleMiddleSlide(swiper) {
    // Remove from all
    swiper.slides.forEach((slide) => slide.classList.remove("is-scaled"));

    // Get all visible slides
    const visibleSlides = swiper.slides.filter((slide) =>
      slide.classList.contains("swiper-slide-visible")
    );

    // Scale middle one only if exactly 3 are visible
    if (visibleSlides.length === 3) {
      visibleSlides[1].classList.add("is-scaled");
    }
  }


  // ====================================================================================
  // ======================     Featured Swiper     =====================================
  // ====================================================================================

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


 // ====================================================================================
  // ======================    Flip Cards     =====================================
  // ====================================================================================

  // document.addEventListener("DOMContentLoaded", function() {
  
    // Mobile behavior (Intersection Observer)
    // if (window.innerWidth < 768) {
    //   const io = new IntersectionObserver(
    //     (entries) => {
    //       entries.forEach(({ target, isIntersecting }) => {
    //         const card = target.querySelector(".card");
    //         card.classList.toggle("flipped", isIntersecting);
    //       });
    //     },
    //     { threshold: 0.6 }
    //   );
  
    //   flips.forEach((flip) => io.observe(flip));
    // }
  
    // Tablet behavior (click to flip)
    // if (window.innerWidth >= 576 && window.innerWidth < 992) {

    const flips = document.querySelectorAll(".flip");
    // if (window.innerWidth < 992) {
      flips.forEach((flip) => {
        const card = flip.querySelector(".card");
        const learnMoreBtn = flip.querySelector(".learn-more-btn");

        console.log("learnMoreBtn: ", learnMoreBtn)
  
        if (!learnMoreBtn) return;
  
        learnMoreBtn.addEventListener("click", (e) => {
          e.stopPropagation();
  
          // Flip back all other flipped cards first
          flips.forEach((otherFlip) => {
            const otherCard = otherFlip.querySelector(".card");
            const otherBtn = otherFlip.querySelector(".learn-more-btn");
            if (otherCard !== card && otherCard.classList.contains("flipped")) {
              otherCard.classList.remove("flipped");
              if (otherBtn) otherBtn.style.opacity = "1";
            }
          });
  
          // Then flip the current card
          learnMoreBtn.style.opacity = "0";
          setTimeout(() => card.classList.add("flipped"), 200);
        });
  
        document.addEventListener("click", (e) => {
          if (!flip.contains(e.target) && card.classList.contains("flipped")) {
            card.classList.remove("flipped");
            const btn = flip.querySelector(".learn-more-btn");
            if (btn) btn.style.opacity = "1";
          }
        });
      });
    // }
  
    // Desktop behavior (hover to flip)
    // if (window.innerWidth >= 992) {
    //   flips.forEach((flip) => {
    //     const card = flip.querySelector(".card");
  
    //     flip.addEventListener("mouseenter", () => {
    //       // Flip back all other cards first
    //       flips.forEach((otherFlip) => {
    //         const otherCard = otherFlip.querySelector(".card");
    //         if (otherCard !== card && otherCard.classList.contains("flipped")) {
    //           otherCard.classList.remove("flipped");
    //         }
    //       });
    //       // Then flip the current card
    //       card.classList.add("flipped");
    //     });
  
    //     flip.addEventListener("mouseleave", () => {
    //       card.classList.remove("flipped");
    //     });
    //   });
    // }
  // });





 // ====================================================================================
  // ======================      Back To Top Button    =================================
  // ====================================================================================
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

  // Collapse navbar menu (for standard `.navbar-collapse`)
  // const collapseEl = document.getElementById("navbarSupportedContent");
  // const collapseInstance =
  //   collapseEl && bootstrap.Collapse.getOrCreateInstance(collapseEl);

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

      // 6. Close collapsed navbar if open (for .navbar-collapse)
      // if (collapseEl && collapseEl.classList.contains("show")) {
      //   collapseInstance.hide();
      // }
    });
  });
 

document.querySelectorAll(".custom-select").forEach((select) => {
  const selected = select.querySelector(".selected");
  const options = select.querySelector(".options");
  const optionItems = select.querySelectorAll(".option");

  selected.addEventListener("click", (e) => {
    document.querySelectorAll(".options").forEach((opt) => {
      if (opt !== options) {
        opt.classList.remove("show-drop");
      }
    });

    // Toggle the "show-drop" class on the current dropdown's options
    options.classList.toggle("show-drop");
    e.stopPropagation();
  });

  optionItems.forEach((option) => {
    option.addEventListener("click", (e) => {
      selected.textContent = option.textContent;
      // Remove the "show-drop" class when an option is selected
      options.classList.remove("show-drop");
      e.stopPropagation();
    });
  });
});



});

// =====================================================================================================================================
// =============================                  Updated Script                   =====================================================
// =====================================================================================================================================


// ==================== Auto Hide Dropdown Menu On Header ================================
document.addEventListener("DOMContentLoaded", function () {
  const dropdownToggle = document.querySelector('.nav-item.dropdown .nav-link.dropdown-toggle');
  const dropdownMenu = document.querySelector('.nav-item.dropdown .dropdown-menu');

  dropdownToggle.addEventListener('click', function (e) {
    if (window.innerWidth < 992) {
      // Mobile/tablet behavior - toggle collapse
      e.preventDefault();
      e.stopImmediatePropagation();
      
      // Close all other dropdowns first
      document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
        if (menu !== dropdownMenu) menu.classList.remove('show');
      });
      
      // Toggle this dropdown
      dropdownMenu.classList.toggle('show');
    }
    // Desktop behavior remains the same
  });

  // Close when clicking outside
  document.addEventListener('click', function (e) {
    if (window.innerWidth < 992) {
      const isClickInside = dropdownToggle.contains(e.target) || dropdownMenu.contains(e.target);
      if (!isClickInside) {
        dropdownMenu.classList.remove('show');
      }
    }
  });

  // Close when selecting any dropdown link
  const dropdownLinks = dropdownMenu.querySelectorAll('a');
  dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992) {
        dropdownMenu.classList.remove('show');
      }
    });
  });
});


// ==============================  Reduce Nav Link OPacity ==================

document.addEventListener("DOMContentLoaded", function () {
  const allLinks = document.querySelectorAll(".navbar-nav .nav-link, .navbar-nav .dropdown-item");
  const dropdown = document.querySelector(".nav-item.dropdown");
  const dropdownToggle = dropdown.querySelector(".nav-link");
  const dropdownItems = dropdown.querySelectorAll(".dropdown-item");

  // Smooth transitions
  allLinks.forEach(link => {
    link.style.transition = "opacity 0.3s ease";
  });

  if (window.innerWidth >= 992) {
    allLinks.forEach(link => {
      link.addEventListener("mouseenter", () => {
        // CASE 1: Hovering a dropdown item
        if (link.classList.contains('dropdown-item')) {
          allLinks.forEach(other => {
            if (
              other === link ||                              // hovered item
              other === dropdownToggle                       // keep More Help toggle visible
            ) {
              other.style.opacity = "1";
            } else if (other.classList.contains('dropdown-item')) {
              other.style.opacity = "0.3"; // dim other dropdown items
            } else {
              other.style.opacity = "0.3"; // dim top-level nav items
            }
          });
        }

        // CASE 2: Hovering the dropdown toggle (More Help)
        else if (link === dropdownToggle) {
          allLinks.forEach(other => {
            if (
              other === dropdownToggle ||
              other.classList.contains('dropdown-item')
            ) {
              other.style.opacity = "1";
            } else {
              other.style.opacity = "0.3";
            }
          });
        }

        // CASE 3: Hovering a normal top-level nav item (not dropdown)
        else {
          allLinks.forEach(other => {
            other.style.opacity = other === link ? "1" : "0.3";
          });
        }
      });

      link.addEventListener("mouseleave", () => {
        allLinks.forEach(l => (l.style.opacity = "1"));
      });
    });

    // Handle mouse leaving the whole dropdown menu area
    dropdown.addEventListener("mouseleave", () => {
      allLinks.forEach(link => {
        link.style.opacity = "1";
      });
    });
  }
});



// ==================== Auto Hide Dropdown Menu On Header ================================
document.addEventListener("DOMContentLoaded", function () {
  const dropdownToggle = document.querySelector('.nav-item.dropdown .nav-link.dropdown-toggle');
  const dropdownMenu = document.querySelector('.nav-item.dropdown .dropdown-menu');

  // let hideTimeout;

  dropdownToggle.addEventListener('click', function (e) {
    if (window.innerWidth >= 992) {
      e.preventDefault();
      e.stopImmediatePropagation();

      dropdownMenu.classList.toggle('show');

      // clearTimeout(hideTimeout);

      // if (dropdownMenu.classList.contains('show')) {
      //   hideTimeout = setTimeout(() => {
      //     dropdownMenu.classList.remove('show');
      //   }, 2600);
      // }
    }
  });

  // ✅ Close when clicking outside
  document.addEventListener('click', function (e) {
    const isClickInside = dropdownToggle.contains(e.target) || dropdownMenu.contains(e.target);

    if (!isClickInside) {
      dropdownMenu.classList.remove('show');
      // clearTimeout(hideTimeout);
    }
  });

  // ✅ Close when selecting any dropdown link
  const dropdownLinks = dropdownMenu.querySelectorAll('a');

  dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
      dropdownMenu.classList.remove('show');
      // clearTimeout(hideTimeout);
    });
  });
});



 // ====================================================================================
  // ======================       Blog Sectoin     =====================================
  // ====================================================================================

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".blog-section .row");
  const cards = container.querySelectorAll(":scope > .blog-card");
  const toggleBtn = document.getElementById("toggleBlogBtn");
  const cardsToShow = 3; // Initial number of cards to show
  const transitionDuration = 800; // Must match the CSS transition duration in milliseconds (0.8s = 800ms)

  let visibleCount = cardsToShow;
  let firstLoad = true;
  const updateCardsVisibility = () => {
    cards.forEach((card, index) => {
      if (index < visibleCount) {
        // SHOW CARD
        card.style.display = "block"; // Ensure it's visible (only needed for first load)
        requestAnimationFrame(() => card.classList.remove("blog-card--hidden"));
      } else {
        if (firstLoad) {
          // On first load, immediately hide with no animation
          card.style.display = "none";
        } else {
          // HIDE with animation
          card.classList.add("blog-card--hidden");
          setTimeout(() => {
            if (index >= visibleCount) card.style.display = "none";
          }, transitionDuration);
        }
      }
    });

    firstLoad = false;
    toggleBtn.textContent = visibleCount >= cards.length ? "Show Less" : "Show More";
    toggleBtn.style.display = cards.length <= cardsToShow ? "none" : "inline-block";
  };

  // ──────────────────────────────────────────────────────────────
  //  Utility: smooth-scroll to an element but stop 98 px earlier
  // ──────────────────────────────────────────────────────────────
  const SCROLL_OFFSET = 113;            // change once, use everywhere
  function scrollToWithOffset(el) {
    const y = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  // --------------------------------------------------------------
  //  Toggle handler
  // --------------------------------------------------------------
  toggleBtn.addEventListener("click", () => {
    toggleBtn.disabled = true;

    const expanding = visibleCount < cards.length;
    visibleCount = expanding
      ? Math.min(visibleCount + cardsToShow, cards.length)
      : cardsToShow;

    updateCardsVisibility();

    // Scroll to the last *visible* card after animation
    const target = cards[visibleCount - 1];
    setTimeout(() => {
      // target.scrollIntoView({ behavior: "smooth", block: "start" });
      scrollToWithOffset(target);   // ⬅️ use the helper
      toggleBtn.disabled = false;
    }, transitionDuration);
  });

  // --------------------------------------------------------------
  //  Initial state
  // --------------------------------------------------------------
  cards.forEach((card, index) => {
    if (index >= cardsToShow) card.classList.add("blog-card--hidden");
  });
  updateCardsVisibility();
});




// ====================================================================================
// ==================== Auto Hide Dropdown Menu On Book An Appointment Section ================================
// ====================================================================================

document.addEventListener("DOMContentLoaded", function () {
  const appointmentSection = document.querySelector("#appointment-cta");
  if (!appointmentSection) return;

  const customSelects = appointmentSection.querySelectorAll(".custom-select");
  let activeSelect = null;

  // Close all dropdowns except the one passed as parameter
  function closeAllDropdowns(exceptThis = null) {
    customSelects.forEach(select => {
      if (select !== exceptThis) {
        const options = select.querySelector(".options");
        options.classList.remove("show-drop");
      }
    });
  }

  // Handle clicks outside dropdowns
  document.addEventListener("click", function (e) {
    const isClickInside = Array.from(customSelects).some(select => 
      select.contains(e.target)
    );

    if (!isClickInside) {
      closeAllDropdowns();
      activeSelect = null;
    }
  });

  customSelects.forEach(customSelect => {
    const selected = customSelect.querySelector(".selected");
    const options = customSelect.querySelector(".options");

    selected.addEventListener("click", function (e) {
      e.stopPropagation();
      
      // If this dropdown is already active, close it
      if (customSelect === activeSelect) {
        options.classList.remove("show-drop");
        activeSelect = null;
        return;
      }

      // Close all other dropdowns and open this one
      closeAllDropdowns(customSelect);
      options.classList.add("show-drop");
      activeSelect = customSelect;
    });

    // Handle option selection
    customSelect.querySelectorAll(".option").forEach(option => {
      option.addEventListener("click", function (e) {
        e.stopPropagation();
        selected.textContent = this.textContent;
        options.classList.remove("show-drop");
        activeSelect = null;
      });
    });
  });
});




// ====================================================================================
// ================ Auto Hide Dropdown Menu On Find A Doc Section =====================
// ====================================================================================

document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector("#find-doctor-cta");
  if (!section) return;

  const customSelect = section.querySelector(".custom-select");
  const selected = customSelect.querySelector(".selected");
  const options = customSelect.querySelector(".options");
  let hideTimeout;

  selected.addEventListener("click", function () {
    // options.style.display = "block";
    options.classList.add("show-drop");

    // Clear any existing timeout
    clearTimeout(hideTimeout);

    // Hide after 2 seconds
    hideTimeout = setTimeout(function () {
      // options.style.display = "none";
         options.classList.remove("show-drop");
    }, 2600);
  });

  // Optional: update selected and hide immediately on option click
  customSelect.querySelectorAll(".option").forEach(option => {
    option.addEventListener("click", function () {
      selected.textContent = this.textContent;
      // options.style.display = "none";
         options.classList.remove("show-drop");
      clearTimeout(hideTimeout);
    });
  });
});



// ====================================================================================
// ======================= Auto Scroll when click on Navigation Arrow =================
// ====================================================================================

// Doctors Swiper
const doctorsSwiper = new Swiper(".doctors-swiper", {
  slidesPerView: 2,
  spaceBetween: 40,
  loop: true,
  grabCursor: true,
  allowTouchMove: true,
  speed: 2200,
  autoplay: {
    delay: 2600,
    disableOnInteraction: false,
    enabled: false,
  },
  navigation: {
    nextEl: ".doctors-next",
    prevEl: ".doctors-prev",
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    992: { slidesPerView: 2 },
  },
});

document.querySelector(".doctors-next").addEventListener("click", () => {
  doctorsSwiper.autoplay.start();
});
document.querySelector(".doctors-prev").addEventListener("click", () => {
  doctorsSwiper.autoplay.start();
});

// Pricing Swiper
const pricingSwiper = new Swiper(".pricing-swiper", {
  slidesPerView: 3,
  spaceBetween: 10,
  loop: true,
  grabCursor: true,
  allowTouchMove: true,
 speed: 2200,
  autoplay: {
    delay: 2600,
    disableOnInteraction: false,
    enabled: false,
  },
  navigation: {
    nextEl: ".pricing-next",
    prevEl: ".pricing-prev",
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    992: { slidesPerView: 3 },
  },
 
});

document.querySelector(".pricing-next").addEventListener("click", () => {
  pricingSwiper.autoplay.start();
});
document.querySelector(".pricing-prev").addEventListener("click", () => {
  pricingSwiper.autoplay.start();
});

// Testimonials Swiper
const TestimonialsSwiper=  new Swiper(".testimonial-swiper", {
   slidesPerView: 1,
  // spaceBetween: 10,
  loop: true,
  grabCursor: true,
  allowTouchMove: true,
 speed: 3000,
  autoplay: {
    delay: 3200,
    disableOnInteraction: false,
    enabled: false,
  },
  pagination: {
  el: ".testimonial-swiper .swiper-pagination",
  clickable: true,
},
  navigation: {
    nextEl: ".testimonials-next",
    prevEl: ".testmonials-prev",
  },
  });

document.querySelectorAll(".testimonial-swiper .swiper-pagination .swiper-pagination-bullet").forEach(bullet => {
  bullet.addEventListener("click", () => {
    TestimonialsSwiper.autoplay.start();
  });
});
