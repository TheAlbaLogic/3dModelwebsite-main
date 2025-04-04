// helped out from the GSAP community Forums  https://gsap.com/community/forums/topic/36566-horizontal-scroll-parallax-images/



// import { gsap } from "gsap/dist/gsap";
    
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray(".panel");



let scrollTween = gsap.to(sections, {
  xPercent: -170 *(sections.length - 1),
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


gsap.to(".ww2text", {
  x: "-15%", // A smaller movement value
  ease: "power1.inOut", // A smoother ease function
  scrollTrigger: {
    trigger: ".ww2text",
    containerAnimation: scrollTween,
    start: "left right",
    end: "right left",
    scrub: 0.5 // Higher value makes it move slower (more lag)
  }
});

sections.forEach((section) => {
  // Select text within each panel section
  let text = section.querySelector(".ww2text");
  
  if (text) {
    gsap.to(text, {
      x: "25%", // Text moves slower than the section
      ease: "none",
      scrollTrigger: {
        trigger: section,
        containerAnimation: scrollTween,
        start: "left right",
        end: "right left",
        scrub: true
      }
    });
  }
});

gsap.to(".ww2text", {
  xPercent: -60 * (sections.length - 1), // Half the speed of main animation
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    start: "top+=100 center",
    end: "+=2000",
    scrub: 0.2 
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
  start: "top center",
  end: "bottom center",
  markers: true, // This will show visible markers for debugging
  onEnter: () => {

    console.log("Tank is moving");
    gsap.to("#tank", {
      duration: 1,
      opacity: 1,
      x: 0
    });
  }
});



gsap.set(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end", {autoAlpha: 0});

["green,red,blue,purple"].forEach((triggerClass , i) =>{
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

