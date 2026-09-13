/* =========================================================
   BODA NÚRIA & LUIS
   VARIABLES GENERALES
   ========================================================= */

const header =
  document.querySelector(".site-header");

const menuToggle =
  document.querySelector(".menu-toggle");

const nav =
  document.querySelector(".main-nav");

const navLinks =
  document.querySelectorAll(".main-nav a");

const revealElements =
  document.querySelectorAll(".reveal");


/* =========================================================
   HEADER AL HACER SCROLL
   ========================================================= */

function updateHeader() {

  header.classList.toggle(
    "is-scrolled",
    window.scrollY > 24
  );

}

updateHeader();

window.addEventListener(
  "scroll",
  updateHeader,
  { passive: true }
);


/* =========================================================
   MENÚ MÓVIL
   ========================================================= */

menuToggle.addEventListener(
  "click",
  () => {

    const open =
      nav.classList.toggle("is-open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(open)
    );

    document.body.style.overflow =
      open ? "hidden" : "";

  }
);


navLinks.forEach(
  link => {

    link.addEventListener(
      "click",
      () => {

        nav.classList.remove(
          "is-open"
        );

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        document.body.style.overflow =
          "";

      }
    );

  }
);


/* =========================================================
   ANIMACIONES AL ENTRAR EN PANTALLA
   ========================================================= */

const observer =
  new IntersectionObserver(

    (entries, obs) => {

      entries.forEach(
        entry => {

          if (
            !entry.isIntersecting
          ) {

            return;

          }


          entry.target.classList.add(
            "is-visible"
          );


          obs.unobserve(
            entry.target
          );

        }
      );

    },

    {

      threshold:
        .12,

      rootMargin:
        "0px 0px -6% 0px"

    }

  );


revealElements.forEach(
  element => {

    observer.observe(
      element
    );

  }
);


/* =========================================================
   CUENTA ATRÁS
   ========================================================= */

const countdown =
  document.querySelector(
    "[data-countdown]"
  );


if (countdown) {

  const target =
    new Date(
      countdown.dataset.countdown
    );


  const days =
    countdown.querySelector(
      "[data-days]"
    );


  const hours =
    countdown.querySelector(
      "[data-hours]"
    );


  const minutes =
    countdown.querySelector(
      "[data-minutes]"
    );


  const seconds =
    countdown.querySelector(
      "[data-seconds]"
    );


  function tick() {

    const diff =
      target - new Date();


    /* =====================================================
       CUENTA ATRÁS FINALIZADA
       ===================================================== */

    if (
      diff <= 0
    ) {

      days.textContent =
        "000";

      hours.textContent =
        "00";

      minutes.textContent =
        "00";

      seconds.textContent =
        "00";

      return;

    }


    /* =====================================================
       CÁLCULO DE DÍAS, HORAS, MINUTOS Y SEGUNDOS
       ===================================================== */

    const total =
      Math.floor(
        diff / 1000
      );


    const remainingDays =
      Math.floor(
        total / 86400
      );


    const remainingHours =
      Math.floor(
        (total % 86400) / 3600
      );


    const remainingMinutes =
      Math.floor(
        (total % 3600) / 60
      );


    const remainingSeconds =
      total % 60;


    /* =====================================================
       ACTUALIZACIÓN DE LA CUENTA ATRÁS EN PANTALLA
       ===================================================== */

    days.textContent =
      String(
        remainingDays
      ).padStart(
        3,
        "0"
      );


    hours.textContent =
      String(
        remainingHours
      ).padStart(
        2,
        "0"
      );


    minutes.textContent =
      String(
        remainingMinutes
      ).padStart(
        2,
        "0"
      );


    seconds.textContent =
      String(
        remainingSeconds
      ).padStart(
        2,
        "0"
      );

  }


  /* =======================================================
     INICIO Y ACTUALIZACIÓN CADA SEGUNDO
     ======================================================= */

  tick();

  setInterval(
    tick,
    1000
  );

}
