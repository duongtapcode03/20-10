// Love explosion effect
let isAnimating = false; // Flag to prevent multiple animations
let animationTimeouts = []; // Store timeout IDs for cleanup

function showLove() {
  // Prevent multiple animations
  if (isAnimating) {
    return;
  }

  // Clear any existing timeouts
  animationTimeouts.forEach((timeout) => clearTimeout(timeout));
  animationTimeouts = [];

  isAnimating = true;

  const explosion = document.getElementById("loveExplosion");
  const specialRose = document.getElementById("specialRoseEffect");
  const heartBeat = document.getElementById("heartBeatEffect");

  explosion.innerHTML = "";
  specialRose.innerHTML = "";
  heartBeat.innerHTML = "";

  // Check if mobile device
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // Mobile: Show only rose image with "hẹ hẹ" text
    const roseImg = document.createElement("img");
    roseImg.src = "public/bohoahong.png";
    roseImg.alt = "Bó hoa hồng đặc biệt";
    roseImg.className = "mobile-rose-effect";
    specialRose.appendChild(roseImg);

    // Add "hẹ hẹ" text below image
    const heheText = document.createElement("div");
    heheText.className = "hehe-text";
    heheText.textContent = "hi hi :3";
    specialRose.appendChild(heheText);

    // Activate special rose effect
    specialRose.classList.add("active", "mobile-effect");
  } else {
    // Desktop: Show heart particles effect
    const heartParticles = document.createElement("div");
    heartParticles.className = "heart-particles";
    heartBeat.appendChild(heartParticles);

    // Wait for next frame to ensure container is rendered
    requestAnimationFrame(() => {
      createHeartParticles(heartParticles);
    });

    // Activate heart beat effect
    heartBeat.classList.add("active");

    // Create special rose effect
    const roseImg = document.createElement("img");
    roseImg.src = "public/bohoahong.png";
    roseImg.alt = "Bó hoa hồng đặc biệt";
    specialRose.appendChild(roseImg);

    // Activate special rose effect
    specialRose.classList.add("active");
  }

  // Create multiple hearts for explosion (smaller effect)
  for (let i = 0; i < 15; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = ["💖", "💕", "💗", "💝", "💓", "💘"][
      Math.floor(Math.random() * 6)
    ];
    heart.style.position = "absolute";
    heart.style.fontSize = "15px";
    heart.style.left = Math.random() * 150 - 75 + "px";
    heart.style.top = Math.random() * 150 - 75 + "px";
    heart.style.animation = `heartExplode 1s ease-out forwards`;
    explosion.appendChild(heart);
  }

  explosion.classList.add("active");

  // Remove the effects after animation
  const timeout1 = setTimeout(() => {
    explosion.classList.remove("active");
    explosion.innerHTML = "";
  }, 1000);
  animationTimeouts.push(timeout1);

  const timeout2 = setTimeout(() => {
    specialRose.classList.remove("active");
    specialRose.innerHTML = "";
    isAnimating = false; // Reset flag after animation completes
  }, 5000);
  animationTimeouts.push(timeout2);

  // Only add heart timeout for desktop
  if (!isMobile) {
    const timeout3 = setTimeout(() => {
      heartBeat.classList.remove("active");
      heartBeat.innerHTML = "";
    }, 4000);
    animationTimeouts.push(timeout3);
  }
}

// Function to cleanup all animations
function cleanupAnimations() {
  // Clear all timeouts
  animationTimeouts.forEach((timeout) => clearTimeout(timeout));
  animationTimeouts = [];

  // Reset flag
  isAnimating = false;

  // Clear all containers
  const explosion = document.getElementById("loveExplosion");
  const specialRose = document.getElementById("specialRoseEffect");
  const heartBeat = document.getElementById("heartBeatEffect");

  if (explosion) {
    explosion.classList.remove("active");
    explosion.innerHTML = "";
  }

  if (specialRose) {
    specialRose.classList.remove("active");
    specialRose.innerHTML = "";
  }

  if (heartBeat) {
    heartBeat.classList.remove("active");
    heartBeat.innerHTML = "";
  }
}

// Add CSS for heart explosion animation
const style = document.createElement("style");
style.textContent = `
    @keyframes heartExplode {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translate(${Math.random() * 400 - 200}px, ${
  Math.random() * 400 - 200
}px) scale(0.5) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Create floating hearts on click
document.addEventListener("click", function (e) {
  createFloatingHeart(e.clientX, e.clientY);
});

function createFloatingHeart(x, y) {
  const heart = document.createElement("div");
  heart.innerHTML = ["💖", "💕", "💗", "💝", "💓", "💘"][
    Math.floor(Math.random() * 6)
  ];
  heart.style.position = "fixed";
  heart.style.left = x + "px";
  heart.style.top = y + "px";
  heart.style.fontSize = "25px";
  heart.style.pointerEvents = "none";
  heart.style.zIndex = "1000";
  heart.style.animation = "floatUp 2s ease-out forwards";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 2000);
}

// Add CSS for floating heart animation
const floatStyle = document.createElement("style");
floatStyle.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(1.5);
        }
    }
`;
document.head.appendChild(floatStyle);

// Create random sparkles
function createRandomSparkle() {
  const sparkle = document.createElement("div");
  sparkle.innerHTML = ["✨", "⭐", "💫", "🌟"][Math.floor(Math.random() * 4)];
  sparkle.style.position = "fixed";
  sparkle.style.left = Math.random() * window.innerWidth + "px";
  sparkle.style.top = Math.random() * window.innerHeight + "px";
  sparkle.style.fontSize = "20px";
  sparkle.style.pointerEvents = "none";
  sparkle.style.zIndex = "5";
  sparkle.style.animation = "sparkleFade 3s ease-out forwards";

  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 3000);
}

// Add CSS for sparkle animation
const sparkleStyle = document.createElement("style");
sparkleStyle.textContent = `
    @keyframes sparkleFade {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Create random sparkles periodically
setInterval(createRandomSparkle, 2000);

// Add hover effects to wish items
document.addEventListener("DOMContentLoaded", function () {
  const wishItems = document.querySelectorAll(".wish-item");

  wishItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      // Create mini sparkles around the item
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const sparkle = document.createElement("div");
          sparkle.innerHTML = "✨";
          sparkle.style.position = "absolute";
          sparkle.style.left = Math.random() * 100 + "%";
          sparkle.style.top = Math.random() * 100 + "%";
          sparkle.style.fontSize = "15px";
          sparkle.style.pointerEvents = "none";
          sparkle.style.animation = "miniSparkle 1s ease-out forwards";
          item.style.position = "relative";
          item.appendChild(sparkle);

          setTimeout(() => {
            sparkle.remove();
          }, 1000);
        }, i * 100);
      }
    });
  });
});

// Add CSS for mini sparkle animation
const miniSparkleStyle = document.createElement("style");
miniSparkleStyle.textContent = `
    @keyframes miniSparkle {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0.5) rotate(360deg);
        }
    }
`;
document.head.appendChild(miniSparkleStyle);

// Add typing effect to the main title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect when page loads
document.addEventListener("DOMContentLoaded", function () {
  const title = document.querySelector(".main-title");
  const originalText = title.textContent;

  setTimeout(() => {
    typeWriter(title, originalText, 150);
  }, 1000);
});

// Add parallax effect to particles
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const particles = document.querySelectorAll(".particle");

  particles.forEach((particle, index) => {
    const speed = 0.5 + index * 0.1;
    particle.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add mouse follow effect for hearts
document.addEventListener("mousemove", function (e) {
  if (Math.random() < 0.1) {
    // 10% chance
    createFloatingHeart(e.clientX, e.clientY);
  }
});

// Add celebration sound effect (visual feedback)
function playCelebration() {
  // Create celebration particles
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const particle = document.createElement("div");
      particle.innerHTML = ["🎉", "🎊", "✨", "💖"][
        Math.floor(Math.random() * 4)
      ];
      particle.style.position = "fixed";
      particle.style.left = Math.random() * window.innerWidth + "px";
      particle.style.top = Math.random() * window.innerHeight + "px";
      particle.style.fontSize = "20px";
      particle.style.pointerEvents = "none";
      particle.style.zIndex = "1000";
      particle.style.animation = "celebrationBurst 2s ease-out forwards";

      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 2000);
    }, i * 50);
  }
}

// Add CSS for celebration animation
const celebrationStyle = document.createElement("style");
celebrationStyle.textContent = `
    @keyframes celebrationBurst {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0.8) rotate(360deg) translateY(-50px);
        }
    }
`;
document.head.appendChild(celebrationStyle);

// Trigger celebration when love button is clicked
document.querySelector(".love-button").addEventListener("click", function () {
  setTimeout(playCelebration, 500);
});

// Add gentle shake animation to the main title on hover
document
  .querySelector(".main-title")
  .addEventListener("mouseenter", function () {
    this.style.animation = "titleShake 0.5s ease-in-out";
  });

document
  .querySelector(".main-title")
  .addEventListener("animationend", function () {
    this.style.animation = "titleGlow 2s ease-in-out infinite alternate";
  });

// Add CSS for title shake
const shakeStyle = document.createElement("style");
shakeStyle.textContent = `
    @keyframes titleShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// Character interaction effects
document.addEventListener("DOMContentLoaded", function () {
  const characters = document.querySelectorAll(".character");

  characters.forEach((character) => {
    character.addEventListener("mouseenter", function () {
      // Create sparkles around character
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          const sparkle = document.createElement("div");
          sparkle.innerHTML = ["✨", "⭐", "💫", "🌟"][
            Math.floor(Math.random() * 4)
          ];
          sparkle.style.position = "absolute";
          sparkle.style.left = Math.random() * 100 + "%";
          sparkle.style.top = Math.random() * 100 + "%";
          sparkle.style.fontSize = "20px";
          sparkle.style.pointerEvents = "none";
          sparkle.style.animation = "characterSparkle 1.5s ease-out forwards";
          sparkle.style.zIndex = "1000";
          character.appendChild(sparkle);

          setTimeout(() => {
            sparkle.remove();
          }, 1500);
        }, i * 100);
      }
    });

    character.addEventListener("click", function () {
      // Create love explosion when character is clicked
      const rect = character.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          const heart = document.createElement("div");
          heart.innerHTML = ["💖", "💕", "💗", "💝", "💓", "💘"][
            Math.floor(Math.random() * 6)
          ];
          heart.style.position = "fixed";
          heart.style.left = centerX + "px";
          heart.style.top = centerY + "px";
          heart.style.fontSize = "25px";
          heart.style.pointerEvents = "none";
          heart.style.zIndex = "1000";
          heart.style.animation = `characterHeartExplode 2s ease-out forwards`;
          document.body.appendChild(heart);

          setTimeout(() => {
            heart.remove();
          }, 2000);
        }, i * 50);
      }
    });
  });
});

// Add CSS for character sparkle animation
const characterSparkleStyle = document.createElement("style");
characterSparkleStyle.textContent = `
    @keyframes characterSparkle {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0.5) rotate(360deg) translateY(-30px);
        }
    }
    
    @keyframes characterHeartExplode {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translate(${Math.random() * 200 - 100}px, ${
  Math.random() * 200 - 100
}px) scale(0.5) rotate(360deg);
        }
    }
`;
document.head.appendChild(characterSparkleStyle);

// Gallery interaction effects
document.addEventListener("DOMContentLoaded", function () {
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      // Create floating hearts around gallery item
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          const heart = document.createElement("div");
          heart.innerHTML = ["💖", "💕", "💗"][Math.floor(Math.random() * 3)];
          heart.style.position = "absolute";
          heart.style.left = Math.random() * 100 + "%";
          heart.style.top = Math.random() * 100 + "%";
          heart.style.fontSize = "18px";
          heart.style.pointerEvents = "none";
          heart.style.animation = "galleryHeartFloat 2s ease-out forwards";
          heart.style.zIndex = "10";
          item.appendChild(heart);

          setTimeout(() => {
            heart.remove();
          }, 2000);
        }, i * 150);
      }
    });

    item.addEventListener("click", function () {
      // Create celebration effect when gallery item is clicked
      const rect = item.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          const particle = document.createElement("div");
          particle.innerHTML = ["🎉", "🎊", "✨", "💖", "⭐"][
            Math.floor(Math.random() * 5)
          ];
          particle.style.position = "fixed";
          particle.style.left = centerX + "px";
          particle.style.top = centerY + "px";
          particle.style.fontSize = "20px";
          particle.style.pointerEvents = "none";
          particle.style.zIndex = "1000";
          particle.style.animation = `galleryCelebration 2s ease-out forwards`;
          document.body.appendChild(particle);

          setTimeout(() => {
            particle.remove();
          }, 2000);
        }, i * 30);
      }
    });
  });
});

// Add CSS for gallery animations
const galleryAnimationStyle = document.createElement("style");
galleryAnimationStyle.textContent = `
    @keyframes galleryHeartFloat {
        0% {
            opacity: 0;
            transform: translateY(0) scale(0.5);
        }
        50% {
            opacity: 1;
            transform: translateY(-20px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-40px) scale(0.5);
        }
    }
    
    @keyframes galleryCelebration {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translate(${Math.random() * 300 - 150}px, ${
  Math.random() * 300 - 150
}px) scale(0.3) rotate(720deg);
        }
    }
`;
document.head.appendChild(galleryAnimationStyle);

// Random character movement
function randomCharacterMovement() {
  const characters = document.querySelectorAll(".character");

  characters.forEach((character) => {
    if (Math.random() < 0.1) {
      // 10% chance
      character.style.animation = "characterDance 2s ease-in-out";

      setTimeout(() => {
        character.style.animation = "characterFloat 6s infinite ease-in-out";
      }, 2000);
    }
  });
}

// Add CSS for character dance
const characterDanceStyle = document.createElement("style");
characterDanceStyle.textContent = `
    @keyframes characterDance {
        0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
        25% { transform: translateY(-20px) rotate(5deg) scale(1.1); }
        50% { transform: translateY(-10px) rotate(-5deg) scale(0.9); }
        75% { transform: translateY(-25px) rotate(3deg) scale(1.05); }
    }
`;
document.head.appendChild(characterDanceStyle);

// Trigger random character movement every 5 seconds
setInterval(randomCharacterMovement, 5000);

// Create random floating images
function createRandomFloatingImage() {
  const images = [
    "public/capybara.png",
    "public/kurromi.png",
    "public/co.png",
    "public/ech.png",
  ];
  const randomImage = images[Math.floor(Math.random() * images.length)];

  const floatingImg = document.createElement("div");
  floatingImg.innerHTML = `<img src="${randomImage}" alt="Floating character" style="width: 50px; height: 50px; object-fit: contain;">`;
  floatingImg.style.position = "fixed";
  floatingImg.style.left = Math.random() * window.innerWidth + "px";
  floatingImg.style.top = "100vh";
  floatingImg.style.pointerEvents = "none";
  floatingImg.style.zIndex = "6";
  floatingImg.style.animation = "randomFloat 8s linear forwards";
  floatingImg.style.filter = "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))";

  document.body.appendChild(floatingImg);

  setTimeout(() => {
    floatingImg.remove();
  }, 8000);
}

// Add CSS for random float animation
const randomFloatStyle = document.createElement("style");
randomFloatStyle.textContent = `
    @keyframes randomFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
        }
        50% {
            transform: translateY(-50vh) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(randomFloatStyle);

// Create random floating images every 3 seconds
setInterval(createRandomFloatingImage, 3000);

// Cleanup animations when page is unloaded
window.addEventListener("beforeunload", cleanupAnimations);

// Function to create heart shape with particles
function createHeartParticles(container) {
  try {
    const particles = [];
    const particleCount = 1000; // Increased for more particles

    // Get container dimensions (fallback to CSS values if not rendered yet)
    const containerWidth = container.offsetWidth || 300; // fallback to 300px
    const containerHeight = container.offsetHeight || 300; // fallback to 300px
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;

    // Calculate scale based on container size
    const scale = Math.min(containerWidth, containerHeight) / 100;

    // Heart shape mathematical formula
    function getHeartPoint(t) {
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t)
      );
      return { x: x * scale, y: y * scale };
    }

    // Create particles along heart shape with spacing
    for (let i = 0; i < particleCount; i++) {
      const t = (i / particleCount) * 2 * Math.PI;
      const point = getHeartPoint(t);

      const particle = document.createElement("div");
      particle.className = "heart-particle";

      // Add random offset to prevent particles from sticking together
      const offsetX = (Math.random() - 0.5) * scale * 2;
      const offsetY = (Math.random() - 0.5) * scale * 2;

      // Position particles (centered in responsive container)
      particle.style.left = centerX + point.x + offsetX + "px";
      particle.style.top = centerY + point.y + offsetY + "px";

      // Random delay for animation
      particle.style.animationDelay = Math.random() * 0.5 + "s";

      // Smaller size variation to reduce overlap
      const size = 2 + Math.random() * 2;
      particle.style.width = size + "px";
      particle.style.height = size + "px";

      // Random color variation
      const hue = 340 + Math.random() * 20; // Pink to red range
      particle.style.background = `hsl(${hue}, 100%, 60%)`;
      particle.style.boxShadow = `0 0 ${
        3 + Math.random() * 2
      }px hsl(${hue}, 100%, 60%)`;

      container.appendChild(particle);
      particles.push(particle);
    }

    // Add fewer particles inside the heart shape (dispersed from border)
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      particle.className = "heart-particle";

      // Generate random points inside heart shape with spacing
      let x, y;
      let attempts = 0;
      do {
        x = (Math.random() - 0.5) * scale * 35;
        y = (Math.random() - 0.5) * scale * 35;
        attempts++;
      } while (!isInsideHeart(x, y, scale) && attempts < 50);

      // Add small random offset to prevent clustering
      const offsetX = (Math.random() - 0.5) * scale * 1.5;
      const offsetY = (Math.random() - 0.5) * scale * 1.5;

      particle.style.left = centerX + x + offsetX + "px";
      particle.style.top = centerY + y + offsetY + "px";
      particle.style.animationDelay = Math.random() * 0.8 + "s";

      const size = 1.5 + Math.random() * 1.5;
      particle.style.width = size + "px";
      particle.style.height = size + "px";

      const hue = 340 + Math.random() * 20;
      particle.style.background = `hsl(${hue}, 100%, 60%)`;
      particle.style.boxShadow = `0 0 ${
        2 + Math.random() * 2
      }px hsl(${hue}, 100%, 60%)`;

      container.appendChild(particle);
    }

    // Add dispersed particles around the heart (radiating from border)
    for (let i = 0; i < 200; i++) {
      const particle = document.createElement("div");
      particle.className = "heart-particle";

      // Random position around heart (centered in responsive container)
      const angle = Math.random() * 2 * Math.PI;
      const radius = scale * 20 + Math.random() * (scale * 30);
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      particle.style.left = x + "px";
      particle.style.top = y + "px";
      particle.style.animationDelay = Math.random() * 0.8 + "s";

      const size = 2 + Math.random() * 2;
      particle.style.width = size + "px";
      particle.style.height = size + "px";

      const hue = 340 + Math.random() * 20;
      particle.style.background = `hsl(${hue}, 100%, 60%)`;
      particle.style.boxShadow = `0 0 ${
        3 + Math.random() * 3
      }px hsl(${hue}, 100%, 60%)`;

      container.appendChild(particle);
    }

    // Helper function to check if point is inside heart
    function isInsideHeart(x, y, scale) {
      const t = Math.atan2(y, x);
      const heartX = 16 * Math.pow(Math.sin(t), 3) * scale;
      const heartY =
        -(
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t)
        ) * scale;

      // Check if point is inside the heart boundary
      const distance = Math.sqrt(x * x + y * y);
      const heartDistance = Math.sqrt(heartX * heartX + heartY * heartY);

      return distance <= heartDistance * 0.8; // 80% of heart size for inner particles
    }
  } catch (error) {
    console.error("Error creating heart particles:", error);
    // Fallback: create a simple heart shape
    const fallbackHeart = document.createElement("div");
    fallbackHeart.innerHTML = "💖";
    fallbackHeart.style.fontSize = "100px";
    fallbackHeart.style.color = "#ff1744";
    fallbackHeart.style.position = "absolute";
    fallbackHeart.style.left = "50%";
    fallbackHeart.style.top = "50%";
    fallbackHeart.style.transform = "translate(-50%, -50%)";
    container.appendChild(fallbackHeart);
  }
}
