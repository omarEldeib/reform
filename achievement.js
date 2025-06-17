// Import GSAP and ScrollTrigger
const gsap = window.gsap
const ScrollTrigger = window.ScrollTrigger

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Google Maps coordinates for each location
const LOCATIONS = {
  riyadh: {
    lat: 24.7136,
    lng: 46.6753,
    name: "King Fahd Street, Riyadh",
  },
  jeddah: {
    lat: 21.4858,
    lng: 39.1925,
    name: "Palm District, Jeddah",
  },
  dammam: {
    lat: 26.4207,
    lng: 50.0888,
    name: "Prince Mohammed Road, Dammam",
  },
}

// Initialize when DOM is ready
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
    console.log("Initializing Achievement Page with GSAP...")

    // Hide loading screen after a short delay
    setTimeout(hideLoadingScreen, 800)

    // Initialize GSAP animations
    initializeGSAPAnimations()
    initializeHeaderEffects()
    initializeButtonEffects()
    initializeImageLazyLoading()
    initializePhotoSlider()
    initializeGoogleMapsIntegration()

    console.log("Achievement Page loaded successfully with GSAP! 🌱")
  }

  // GSAP Animation System with comprehensive fade-ins
  function initializeGSAPAnimations() {
    // Set initial states for ALL animated elements
    gsap.set(".breadcrumb, .achievement-hero h1, .meta-item", { opacity: 0, y: 50 })
    gsap.set(".section-header", { opacity: 0, y: 40 })
    gsap.set(".photo-slider-section, .project-details, .map-section", { opacity: 0, y: 50 })
    gsap.set(".info-card, .stat-item", { opacity: 0, y: 30, scale: 0.9 })
    gsap.set(".accomplishments li, .material-item, .info-item", { opacity: 0, x: -20 })
    gsap.set(".details-content, .details-sidebar", { opacity: 0, y: 40 })
    gsap.set(".slide-image img", { opacity: 0, scale: 1.1 })
    gsap.set(".swiper-button-next, .swiper-button-prev, .swiper-pagination", { opacity: 0, scale: 0.8 })
    gsap.set(".map-svg, .map-info", { opacity: 0, scale: 0.9 })
    gsap.set("button", { opacity: 0, y: 20 })
    gsap.set(".project-stats", { opacity: 0, scale: 0.95 })

    // Hero section animation (immediate)
    animateHeroSection()

    // Section animations with ScrollTrigger
    animateSections()

    // Card animations
    animateCards()

    // Stats counter animations
    animateStatsCounters()

    // List animations
    animateListItems()

    // Button animations
    animateButtons()

    // Slider animations
    animateSliderElements()

    // Map animations
    animateMapElements()
  }

  function animateHeroSection() {
    // Animate hero content immediately with fade-in
    const tl = gsap.timeline({ delay: 0.3 })

    tl.to(".breadcrumb", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        ".achievement-hero h1",
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .to(
        ".meta-item",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=0.6",
      )
  }

  function animateSections() {
    // Animate section headers first
    gsap.utils.toArray(".section-header").forEach((header) => {
      ScrollTrigger.create({
        trigger: header,
        start: "top 85%",
        onEnter: () => {
          gsap.to(header, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          })
        },
      })
    })

    // Animate main sections
    gsap.utils.toArray(".photo-slider-section, .project-details, .map-section").forEach((section) => {
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

    // Animate details content and sidebar separately
    ScrollTrigger.create({
      trigger: ".details-grid",
      start: "top 80%",
      onEnter: () => {
        gsap.to(".details-content", {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        })
        gsap.to(".details-sidebar", {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
        })
      },
    })

    // Animate project stats
    ScrollTrigger.create({
      trigger: ".project-stats",
      start: "top 85%",
      onEnter: () => {
        gsap.to(".project-stats", {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        })
      },
    })
  }

  function animateCards() {
    // Info cards with enhanced fade-in
    gsap.utils.toArray(".info-card").forEach((card, index) => {
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

    // Stat items with fade-in
    gsap.utils.toArray(".stat-item").forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top 85%",
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.7)",
          })
        },
      })
    })
  }

  function animateCardContent(card) {
    // Animate content inside cards
    const images = card.querySelectorAll("img")
    const badges = card.querySelectorAll(".badge")
    const infoItems = card.querySelectorAll(".info-item, .material-item")

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

    if (infoItems.length > 0) {
      gsap.to(infoItems, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      })
    }
  }

  function animateStatsCounters() {
    gsap.utils.toArray(".stat-number").forEach((counter) => {
      ScrollTrigger.create({
        trigger: counter,
        start: "top 90%",
        onEnter: () => {
          const target = Number.parseFloat(counter.getAttribute("data-target") || counter.textContent)
          if (!isNaN(target)) {
            // Fade in the counter first
            gsap.to(counter.parentElement, {
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
            })

            // Create an object to animate
            const obj = { value: 0 }

            gsap.to(obj, {
              value: target,
              duration: 1.5,
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
                  duration: 0.15,
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

  function animateListItems() {
    // Accomplishments list with fade-in
    gsap.utils.toArray(".accomplishments li").forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top 90%",
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
          })
        },
      })
    })

    // Material items with fade-in
    gsap.utils.toArray(".material-item").forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top 90%",
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
          })
        },
      })
    })

    // Info items with fade-in
    gsap.utils.toArray(".info-item").forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top 90%",
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: index * 0.08,
            ease: "power2.out",
          })
        },
      })
    })
  }

  function animateButtons() {
    // Animate all buttons with fade-in
    gsap.utils.toArray("button").forEach((button, index) => {
      ScrollTrigger.create({
        trigger: button,
        start: "top 90%",
        onEnter: () => {
          gsap.to(button, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "back.out(1.7)",
          })
        },
      })
    })
  }

  function animateSliderElements() {
    // Animate slider controls when slider section is visible
    ScrollTrigger.create({
      trigger: ".photo-slider-section",
      start: "top 80%",
      onEnter: () => {
        // Animate slider images
        gsap.to(".slide-image img", {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        })

        // Animate slider controls
        gsap.to(".swiper-button-next, .swiper-button-prev", {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.5,
          ease: "back.out(1.7)",
        })

        gsap.to(".swiper-pagination", {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.7,
          ease: "back.out(1.7)",
        })
      },
    })
  }

  function animateMapElements() {
    // Animate map elements
    ScrollTrigger.create({
      trigger: ".map-section",
      start: "top 80%",
      onEnter: () => {
        gsap.to(".map-svg", {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
        })

        gsap.to(".map-info", {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
        })
      },
    })
  }

  // Header scroll effects with GSAP - Same as reform.html
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

  // Enhanced button effects with GSAP - Same as reform.html
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

  // Add ripple effect styles - Same as reform.html
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

  // Image lazy loading with GSAP - Enhanced with fade-in
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
              duration: 0.8,
              ease: "power2.out",
            })
          }

          // Handle images that are already loaded
          if (img.complete) {
            gsap.to(img, {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
            })
          }
        },
      })
    })
  }

  // Photo Slider initialization
  function initializePhotoSlider() {
    try {
      if (typeof window.Swiper === "undefined") {
        console.error("Swiper is not loaded!")
        return
      }

      const swiper = new window.Swiper(".photo-slider", {
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        effect: "slide",
        speed: 800,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        keyboard: {
          enabled: true,
        },
        on: {
          slideChange: function () {
            // Add fade effect to slide labels
            const activeSlide = this.slides[this.activeIndex]
            const label = activeSlide.querySelector(".slide-label")
            if (label) {
              gsap.fromTo(label, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
            }
          },
        },
      })

      console.log("Photo slider initialized successfully")
    } catch (error) {
      console.error("Error initializing photo slider:", error)
    }
  }

  // Google Maps Integration - Same functionality as before
  function initializeGoogleMapsIntegration() {
    console.log("Setting up Google Maps integration...")

    // Detect current page location
    const currentPage = window.location.pathname.toLowerCase()
    let currentLocation = null

    if (currentPage.includes("achievement1") || currentPage.includes("riyadh")) {
      currentLocation = LOCATIONS.riyadh
    } else if (currentPage.includes("achievement2") || currentPage.includes("jeddah")) {
      currentLocation = LOCATIONS.jeddah
    } else if (currentPage.includes("achievement3") || currentPage.includes("dammam")) {
      currentLocation = LOCATIONS.dammam
    } else {
      const title = document.title.toLowerCase()
      if (title.includes("riyadh")) {
        currentLocation = LOCATIONS.riyadh
      } else if (title.includes("jeddah")) {
        currentLocation = LOCATIONS.jeddah
      } else if (title.includes("dammam")) {
        currentLocation = LOCATIONS.dammam
      }
    }

    // Add click handler to map
    const mapContainer = document.querySelector(".egypt-map")
    if (mapContainer && currentLocation) {
      // Add click indicator if it doesn't exist
      if (!mapContainer.querySelector(".map-click-indicator")) {
        const clickIndicator = document.createElement("div")
        clickIndicator.className = "map-click-indicator"
        clickIndicator.innerHTML = '<i class="fas fa-external-link-alt"></i> View on Google Maps'
        mapContainer.appendChild(clickIndicator)
      }

      // Add click handler - opens in same tab (no popup blocking)
      mapContainer.addEventListener("click", () => {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${currentLocation.lat},${currentLocation.lng}&zoom=16`

        gsap.to(mapContainer, {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
          onComplete: () => {
            // Open in same tab - no popup blocking issues
            window.location.href = googleMapsUrl
          },
        })
      })

      // Add hover effects
      mapContainer.addEventListener("mouseenter", function () {
        gsap.to(this, { scale: 1.02, duration: 0.3, ease: "power2.out" })
      })

      mapContainer.addEventListener("mouseleave", function () {
        gsap.to(this, { scale: 1, duration: 0.3, ease: "power2.out" })
      })

      mapContainer.style.cursor = "pointer"
    }
  }

  // Card hover animations - Enhanced with fade effects
  function initializeCardHoverEffects() {
    gsap.utils.toArray(".info-card, .achievement-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -10,
          rotationY: 2,
          scale: 1.03,
          duration: 0.3,
          ease: "power2.out",
        })

        // Enhance card content on hover
        const cardContent = card.querySelectorAll(".info-item, .material-item")
        gsap.to(cardContent, {
          x: 5,
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

        // Reset card content
        const cardContent = card.querySelectorAll(".info-item, .material-item")
        gsap.to(cardContent, {
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        })
      })
    })
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


