const header=document.querySelector(".site-header");
const menuToggle=document.querySelector(".menu-toggle");
const nav=document.querySelector(".main-nav");
const navLinks=document.querySelectorAll(".main-nav a");
const revealElements=document.querySelectorAll(".reveal");

function updateHeader(){header.classList.toggle("is-scrolled",window.scrollY>24)}
updateHeader();
window.addEventListener("scroll",updateHeader,{passive:true});

menuToggle.addEventListener("click",()=>{
  const open=nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded",String(open));
  document.body.style.overflow=open?"hidden":"";
});
navLinks.forEach(link=>link.addEventListener("click",()=>{
  nav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded","false");
  document.body.style.overflow="";
}));

const observer=new IntersectionObserver((entries,obs)=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    entry.target.classList.add("is-visible");
    obs.unobserve(entry.target);
  });
},{threshold:.12,rootMargin:"0px 0px -6% 0px"});
revealElements.forEach(el=>observer.observe(el));

const countdown=document.querySelector("[data-countdown]");
if(countdown){
  const target=new Date(countdown.dataset.countdown);
  const d=countdown.querySelector("[data-days]");
  const h=countdown.querySelector("[data-hours]");
  const m=countdown.querySelector("[data-minutes]");
  const s=countdown.querySelector("[data-seconds]");
  function tick(){
    const diff=target-new Date();
    if(diff<=0){d.textContent="000";h.textContent=m.textContent=s.textContent="00";return}
    const total=Math.floor(diff/1000);
    d.textContent=String(Math.floor(total/86400)).padStart(3,"0");
    h.textContent=String(Math.floor((total%86400)/3600)).padStart(2,"0");
    m.textContent=String(Math.floor((total%3600)/60)).padStart(2,"0");
    s.textContent=String(total%60).padStart(2,"0");
  }
  tick(); setInterval(tick,1000);
}
