// Manual slide Show

// let slideIndex = 1;

//  showSlides(slideIndex);

//Slide movement controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Image Controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

// function showSlides(n){
//     let i;
//     let slides = document.getElementsByClassName("SlidesFade");
//     let dots = document.getElementsByClassName("dot");
//     if(n > slides.length) {slideIndex = 1}
//     if(n < 1) {slideIndex = slides.length}
//     for (i = 0; i < slides.length; i++){
//         slides[i].style.display = "none";
//     }
//     for(i = 0; i < dots.length; i++){
//         dots[i].className = dots[i].className.replace(" active","");
//     }
//     slides[slideIndex-1].style.display = "block";
//     dots[slideIndex-1].className +=" active";
// }

//Automatic Slideshow

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("SlidesFade");
  let dots = document.getElementsByClassName("dot");

  if (slides.length === 0) {
    console.error("No slides found with class 'SlidesFade'");
    return;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slideIndex++;

  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";
  
  if (dots.length > 0) {
    dots[slideIndex - 1].className += " active";
  }

  setTimeout(showSlides, 3000); // Change image every 5 seconds

  console.log(slideIndex);
}

document.addEventListener("DOMContentLoaded", showSlides);
