// Import GSAP and ScrollTrigger
const gsap = window.gsap
const ScrollTrigger = window.ScrollTrigger

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)
// Ensure DOM is fully loaded before running scripts
;(() => {
  // Loading Screen Management
  function hideLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen")
    if (loadingScreen) {
      gsap.to(loadingScreen, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          if (loadingScreen.parentNode) {
            loadingScreen.parentNode.removeChild(loadingScreen)
          }
        },
      })
    }
  }

  // Initialize when DOM is ready
  function initializePage() {
    console.log("Initializing Land Reform Platform with GSAP...")

    // Hide loading screen after a short delay
    setTimeout(hideLoadingScreen, 800)

    // Initialize GSAP animations
    initializeGSAPAnimations()
    initializeHeaderEffects()
    initializeButtonEffects()
    initializeImageLazyLoading()

    console.log("Land Reform Platform loaded successfully with GSAP! 🌱")
  }

  // GSAP Animation System
  function initializeGSAPAnimations() {
    // Set initial states for all animated elements EXCEPT hero and achievements
    gsap.set("[data-animate]:not(#hero):not(#achievements)", { opacity: 0, y: 50 })
    gsap.set(".land-card, .stat-card", { opacity: 0, y: 30, scale: 0.9 })
    gsap.set(".step", { opacity: 0, y: 40 })
    gsap.set(".badge:not(.achievements .badge)", { opacity: 0, scale: 0.8 })

    // Keep achievements section visible but allow card animations
    const achievementsSection = document.getElementById("achievements")
    if (achievementsSection) {
      achievementsSection.style.opacity = "1"
      achievementsSection.style.transform = "translateY(0)"
    }

    // Hero section animation (immediate)
    animateHeroSection()

    // Section animations with ScrollTrigger
    animateSections()

    // Card animations
    animateCards()

    // Stats counter animations
    animateStatsCounters()

    // Step animations
    animateSteps()

    // Badge animations (excluding achievements badges)
    animateBadges()
  }

  function animateHeroSection() {
    // Keep hero section immediately visible as per original design
    const hero = document.getElementById("hero")
    if (hero) {
      hero.style.opacity = "1"
      hero.style.transform = "translateY(0)"

      // Keep hero cards immediately visible
      const heroCards = hero.querySelectorAll(".hero-card")
      heroCards.forEach((card) => {
        card.style.opacity = "1"
        card.style.transform = "translateY(0) scale(1)"
      })
    }
  }

  function animateSections() {
    // Animate section headers
    gsap.utils.toArray("[data-animate]:not(#hero)").forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        onEnter: () => {
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          })
        },
      })
    })
  }

  function animateCards() {
    // Achievement cards - keep original fade-in behavior
    gsap.utils.toArray(".achievement-card").forEach((card, index) => {
      // Set initial state to match original CSS
      gsap.set(card, { opacity: 0, y: 30, scale: 0.95 })

      ScrollTrigger.create({
        trigger: card,
        start: "top 85%",
        onEnter: () => {
          // Add the original fade-in class
          card.classList.add("fade-in")

          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: "back.out(1.7)",
            onComplete: () => {
              // Animate card content
              animateCardContent(card)
            },
          })
        },
      })
    })

    // Land cards
    gsap.utils.toArray(".land-card").forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 85%",
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: "back.out(1.7)",
            onComplete: () => {
              animateCardContent(card)
            },
          })
        },
      })
    })

    // Stat cards
    gsap.utils.toArray(".stat-card").forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 85%",
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: "back.out(1.7)",
          })
        },
      })
    })
  }

  function animateCardContent(card) {
    const images = card.querySelectorAll("img")
    const badges = card.querySelectorAll(".badge")

    if (images.length > 0) {
      gsap.to(images, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      })
    }

    if (badges.length > 0) {
      gsap.to(badges, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: "back.out(1.7)",
      })
    }
  }

  function animateStatsCounters() {
    gsap.utils.toArray(".stat-number").forEach((counter) => {
      ScrollTrigger.create({
        trigger: counter,
        start: "top 90%", // Changed from 80% to 90% for earlier trigger
        onEnter: () => {
          const target = Number.parseFloat(counter.getAttribute("data-target"))
          if (!isNaN(target)) {
            // Create an object to animate
            const obj = { value: 0 }

            gsap.to(obj, {
              value: target,
              duration: 1.5, // Reduced from 2 to 1.5 seconds
              ease: "power2.out",
              onUpdate: () => {
                if (target % 1 === 0) {
                  counter.textContent = Math.floor(obj.value)
                } else {
                  counter.textContent = obj.value.toFixed(1)
                }
              },
              onComplete: () => {
                // Ensure final value is correct
                counter.textContent = target % 1 === 0 ? target : target.toFixed(1)

                // Add completion effect
                gsap.to(counter, {
                  scale: 1.1,
                  duration: 0.15, // Reduced completion effect duration
                  yoyo: true,
                  repeat: 1,
                  ease: "power2.inOut",
                })
              },
            })
          }
        },
      })
    })
  }

  function animateSteps() {
    gsap.utils.toArray(".step").forEach((step, index) => {
      ScrollTrigger.create({
        trigger: step,
        start: "top 85%",
        onEnter: () => {
          gsap.to(step, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "back.out(1.7)",
          })

          // Animate step icon with floating effect
          const icon = step.querySelector(".step-icon")
          if (icon) {
            gsap.to(icon, {
              y: -10,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
              delay: index * 0.5,
            })
          }
        },
      })
    })
  }

  function animateBadges() {
    gsap.utils.toArray(".badge").forEach((badge, index) => {
      ScrollTrigger.create({
        trigger: badge,
        start: "top 90%",
        onEnter: () => {
          gsap.to(badge, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: "back.out(1.7)",
          })
        },
      })
    })
  }

  // Header scroll effects with GSAP
  function initializeHeaderEffects() {
    let lastScrollTop = 0
    const header = document.querySelector(".header")

    if (!header) return

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const scrollTop = self.scroll()

        if (scrollTop > lastScrollTop && scrollTop > 100) {
          // Scrolling down
          gsap.to(header, {
            y: -100,
            duration: 0.3,
            ease: "power2.out",
          })
        } else {
          // Scrolling up
          gsap.to(header, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          })
        }

        lastScrollTop = scrollTop
      },
    })
  }

  // Enhanced button effects with GSAP
  function initializeButtonEffects() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          gsap.to(window, {
            duration: 1,
            scrollTo: target,
            ease: "power2.inOut",
          })
        }
      })
    })

    // Button hover and click effects
    document.querySelectorAll("button").forEach((button) => {
      // Hover effects
      button.addEventListener("mouseenter", () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      button.addEventListener("mouseleave", () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      // Click effects
      button.addEventListener("click", function (e) {
        // Create ripple effect
        const ripple = document.createElement("span")
        const rect = this.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2

        ripple.style.width = ripple.style.height = size + "px"
        ripple.style.left = x + "px"
        ripple.style.top = y + "px"
        ripple.classList.add("ripple")

        this.appendChild(ripple)

        // Animate ripple with GSAP
        gsap.fromTo(
          ripple,
          { scale: 0, opacity: 0.6 },
          {
            scale: 4,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
              if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple)
              }
            },
          },
        )

        // Button press effect
        gsap.to(this, {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        })
      })
    })
  }

  // Add ripple effect styles
  function addRippleStyles() {
    if (document.getElementById("ripple-styles")) return

    const style = document.createElement("style")
    style.id = "ripple-styles"
    style.textContent = `
      button {
        position: relative;
        overflow: hidden;
      }
      
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        pointer-events: none;
      }
    `
    document.head.appendChild(style)
  }

  // Image lazy loading with GSAP
  function initializeImageLazyLoading() {
    const images = document.querySelectorAll("img")

    if (!images.length) return

    images.forEach((img) => {
      gsap.set(img, { opacity: 0, scale: 1.1 })

      ScrollTrigger.create({
        trigger: img,
        start: "top 90%",
        onEnter: () => {
          img.onload = () => {
            gsap.to(img, {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
            })
          }

          // Handle images that are already loaded
          if (img.complete) {
            gsap.to(img, {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
            })
          }
        },
      })
    })
  }

  // Parallax effect for hero section
  function initializeParallaxEffect() {
    const hero = document.querySelector(".hero")
    if (!hero) return

    gsap.to(hero, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
  }

  // Card hover animations
  function initializeCardHoverEffects() {
    gsap.utils.toArray(".achievement-card, .land-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -10,
          rotationY: 2,
          scale: 1.03,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        })
      })
    })
  }

  // Error handling
  function handleError(error, context) {
    console.error(`Error in ${context}:`, error)
  }

  // Initialize everything when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePage)
  } else {
    // DOM is already loaded
    initializePage()
  }

  // Also initialize on window load as backup
  window.addEventListener("load", () => {
    // Ensure loading screen is hidden even if other initialization fails
    setTimeout(hideLoadingScreen, 100)

    // Add styles
    addRippleStyles()

    // Initialize additional effects
    initializeParallaxEffect()
    initializeCardHoverEffects()
  })

  // Handle page visibility changes (for when user switches tabs)
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      // Page became visible again, ensure loading screen is hidden
      setTimeout(hideLoadingScreen, 100)
    }
  })
})()