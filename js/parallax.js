document.addEventListener('DOMContentLoaded', function() {
    const parallaxContainer = document.getElementById('parallax-container');
    const tank = document.querySelector('.tank-image');
    const leftColumn = document.querySelector('.left-column');
    const rightColumn = document.querySelector('.right-column');
    const backgroundLayer = document.querySelector('.background-layer');
    const fogLayer = document.querySelector('.fog-layer');
    const debrisLayer = document.querySelector('.foreground-debris');
    
    window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;
      const containerHeight = parallaxContainer.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollPercent = scrollY / (containerHeight - viewportHeight);
      
      // Enhanced 3D effect for the tank
      tank.style.transform = `translateZ(5px) scale(0.5) rotateY(${scrollY * 0.02}deg)`;
      
      // Move background slower than foreground
      backgroundLayer.style.transform = `translateZ(-15px) scale(2.5) translateY(${scrollY * 0.05}px)`;
      
      // Move fog layer
      fogLayer.style.transform = `translateZ(-8px) scale(1.8) translateY(${scrollY * 0.1}px)`;
      
      // Move debris layer
      debrisLayer.style.transform = `translateZ(-5px) scale(1.5) translateY(${scrollY * 0.15}px)`;
      
      // Gradually move text columns
      leftColumn.style.transform = `translateZ(2px) scale(0.8) translateX(${scrollY * -0.05}px)`;
      rightColumn.style.transform = `translateZ(2px) scale(0.8) translateX(${scrollY * 0.05}px)`;
      
      // Hide scroll indicator after scrolling begins
      const scrollIndicator = document.querySelector('.scroll-indicator');
      if (scrollY > 100) {
        scrollIndicator.style.opacity = '0';
      } else {
        scrollIndicator.style.opacity = '1';
      }
    });
    
    // Add mouse move parallax effect
    document.addEventListener('mousemove', function(e) {
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      
      tank.style.transform = `translateZ(5px) scale(0.5) rotateY(${mouseX * 10}deg) rotateX(${mouseY * -5}deg)`;
      leftColumn.style.transform = `translateZ(2px) scale(0.8) translateX(${mouseX * -15}px)`;
      rightColumn.style.transform = `translateZ(2px) scale(0.8) translateX(${mouseX * 15}px)`;
    });
  });