const docReady = (fn) => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn);
  } else {
    fn();
  }
};

docReady(() => {
  const navToggle = document.querySelector(".nav__toggle");
  const navLinks = document.querySelector(".nav__links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navLinks.classList.toggle("is-open");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });

  const menuCards = document.querySelectorAll(".menu-card");

  menuCards.forEach((card) => {
    const depth = parseFloat(card.dataset.depth || "0.2");

    const setTransform = (xRatio, yRatio) => {
      const rotateX = (0.5 - yRatio) * 12 * depth;
      const rotateY = (xRatio - 0.5) * 18 * depth;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const xRatio = x / rect.width;
      const yRatio = y / rect.height;

      card.style.setProperty("--mouse-x", `${xRatio * 100}%`);
      card.style.setProperty("--mouse-y", `${yRatio * 100}%`);
      setTransform(xRatio, yRatio);
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
      card.style.setProperty("--mouse-x", "50%");
      card.style.setProperty("--mouse-y", "50%");
    });
  });

  const hero = document.querySelector(".hero");
  const orbs = document.querySelectorAll(".hero__orb");

  if (hero && orbs.length) {
    hero.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      const xRatio = (event.clientX - rect.left) / rect.width;
      const yRatio = (event.clientY - rect.top) / rect.height;

      orbs.forEach((orb, index) => {
        const intensity = 12 + index * 6;
        const translateX = (xRatio - 0.5) * intensity;
        const translateY = (yRatio - 0.5) * intensity;
        orb.style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
    });

    hero.addEventListener("pointerleave", () => {
      orbs.forEach((orb) => {
        orb.style.transform = "translate(0, 0)";
      });
    });
  }
});
