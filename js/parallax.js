// helped out from the GSAP community Forums  https://gsap.com/community/forums/topic/36566-horizontal-scroll-parallax-images/



// import { gsap } from "gsap/dist/gsap";
    
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray(".panel");



let scrollTween = gsap.to(sections, {
  xPercent: -120 *(sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger:".container",
    pin: true,
    scrub: 0.1,
    start: "top+=100 center",
    end: "+=2000",
    anticipatePin:1
  } 
});

gsap.set(".box-3", {x: window.innerWidth});

gsap.to(".box-3", {
  x: 0, // Move to original position
  ease: "none",
  scrollTrigger: {
    trigger: ".box-3",
    containerAnimation: scrollTween,
    start: "left right",
    end: "right left",
    scrub: true,
    id: "3"
  }
});

gsap.set("#tank", {x: window.innerWidth});

gsap.to("#tank", {
  x: -2 * window.innerWidth, // How far left you want it to move (negative values move left)
  ease: "none",
  scrollTrigger: {
    trigger: ".container", 
    containerAnimation: scrollTween,
    start: "left 80%", 
    end:"right -50%"
    
  }
});

ScrollTrigger.create({
  x: 0, // Starting position (at the right edge)
},
  {
  trigger: ".box-3",
  containerAnimation:scrollTween,
  toggleClass:"active",
  start: "left right",
  end: "right left",
  id: "3"
});


ScrollTrigger.create({
  x: 0, // Starting position (at the right edge)
},{
  trigger:".green",
  containerAnimation: scrollTween,
  start: "left right",
  end: "right left",
  scrub:true, 
  onEnter: () => console.log("enter"),
  onLeave: () => console.log("leave"),
  onEnterBack: () => console.log("enterBack"),
  onLeaveBack:() => console.log("leaveback"),
  onToggle: self => console.log("active", self.isActive),
  id:"4"
});



gsap.set(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end", {autoAlpha: 0});

["green"].forEach((triggerClass , i) =>{
  ScrollTrigger.create({
    trigger: "." + triggerClass,
    containerAnimation: scrollTween,
    start: "left 90%",
    end: i=== 3 ? "right -20%" : "right 0%",
    markers: false, 
    onToggle: self => gsap.to(".marker-" + (i+1), {duration: 1.5,
      autoAlpha: self.isActive ? 1 : 0
    })
  });
});


