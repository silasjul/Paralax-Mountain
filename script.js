/* Parallax effects */

const parallaxElements = document.querySelectorAll(".parallax");

let mouseX = 0,
  mouseY = 0;

let rotateDegree = 0;

function update(xPos) {
  parallaxElements.forEach((el) => {
    let speedX = el.dataset.speedx;
    let speedY = el.dataset.speedy;
    let speedZ = el.dataset.speedz;
    let rotateVal = el.dataset.rotateval ? el.dataset.rotateval : 1;

    let zValue = xPos - parseFloat(getComputedStyle(el).left) * 0.1;
    let isInLeft =
      parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;

    el.style.transform = `translateX(calc(-50% + ${-mouseX * speedX}px)) 
        translateY(calc(-50% + ${mouseY * speedY}px)) 
        perspective(2200px) translateZ(${zValue * isInLeft * speedZ}px)
        rotateY(${rotateDegree * rotateVal}deg)`;
  });
}

update(0);

window.addEventListener("mousemove", (e) => {
  if (tl.isActive()) return;
  mouseX = e.clientX - window.innerWidth / 2;
  mouseY = e.clientY - window.innerHeight / 2;
  rotateDegree = (mouseX / (window.innerWidth / 2)) * 10;

  update(e.clientX);
});

/* hamburger menu */

/* main gsap animation */

let tl = gsap.timeline();
const h2Title = new SplitType("#titleh2"); // split title

tl.to(
  ".cloud",
  {
    duration: 2,
    opacity: 0,
  },
  "0"
)
  .from(
    ".title h1",
    {
      opacity: 0,
      y: -100,
      duration: 1.2,
      delay: 1.7,
    },
    "0"
  )
  .to(
    ".char",
    {
      y: 0,
      stagger: 0.05,
      delay: 1.7,
      duration: 0.1,
    },
    "0"
  );

parallaxElements.forEach((el) => {
  let fullscreen = window.innerHeight === screen.height;

  let yDist =
    fullscreen && el.classList.contains("background")
      ? el.dataset.distantcefullscreen
      : el.dataset.distance;

  tl.from(
    el,
    {
      y: yDist,
      duration: 2,
      ease: "power3",
    },
    "0"
  );
});

gsap.from(
  "header",
  {
    opacity: 0,
    y: -30,
    delay: 2,
    duration: 2,
  },
  "0"
);
