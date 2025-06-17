// Import GSAP and ScrollTrigger
const gsap = window.gsap
const ScrollTrigger = window.ScrollTrigger

// Register GSAP plugins
if (gsap && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger)
}

// Sample detailed land data
const detailedLandsData = {
  1: {
    title: "Abandoned Industrial Site - Riyadh",
    location: "Al-Kharj Road, Riyadh",
    city: "riyadh",
    type: "government",
    status: "available",
    priority: "high",
    area: "2.5 hectares",
    estimatedDuration: "45 days",
    expectedRevenue: "Free - Recycling Revenue",
    coordinates: { lat: 24.7136, lng: 46.6753 },
    description:
      "This abandoned industrial complex represents a significant environmental restoration opportunity in Riyadh. The 2.5-hectare site has been vacant for over 8 years, accumulating various types of industrial waste, construction debris, and hazardous materials.",
    detailedDescription:
      "The site contains multiple structures including abandoned warehouses, office buildings, and manufacturing facilities. Preliminary assessments indicate the presence of metal scraps, concrete debris, chemical containers, and electronic waste. The soil requires testing for potential contamination, and specialized equipment will be needed for safe removal of hazardous materials.",
    requirements: [
      "Hazardous material assessment and removal",
      "Soil contamination testing and remediation",
      "Structural demolition of unsafe buildings",
      "Metal and concrete recycling operations",
      "Environmental compliance documentation",
      "Site preparation for future development",
    ],
    environmentalImpact:
      "This cleanup project will remove approximately 150 tons of mixed waste from the urban environment, preventing potential groundwater contamination and air quality issues. The recycling operations are expected to recover 80% of materials, contributing significantly to the circular economy while preparing the land for productive use.",
    images: [
      {
        url: "/placeholder.svg?height=500&width=800&text=Main+Industrial+Building",
        label: "Main Industrial Building",
      },
      {
        url: "/placeholder.svg?height=500&width=800&text=Waste+Accumulation+Area",
        label: "Waste Accumulation Area",
      },
      {
        url: "/placeholder.svg?height=500&width=800&text=Metal+Scrap+Section",
        label: "Metal Scrap Section",
      },
      {
        url: "/placeholder.svg?height=500&width=800&text=Access+Road",
        label: "Access Road",
      },
    ],
    stats: [
      { number: "2.5", label: "Hectares" },
      { number: "150", label: "Tons Waste" },
      { number: "45", label: "Days Duration" },
      { number: "80%", label: "Recyclable" },
    ],
    contactInfo: {
      address: "Al-Kharj Road, Industrial District",
      accessibility: "Highway access, heavy machinery compatible",
      utilities: "Electricity and water connections available",
    },
  },
  2: {
    title: "Coastal Cleanup Area - Jeddah",
    location: "Red Sea Coast, Jeddah",
    city: "jeddah",
    type: "government",
    status: "available",
    priority: "high",
    area: "1.8 hectares",
    estimatedDuration: "30 days",
    expectedRevenue: "Free - Environmental Impact",
    coordinates: { lat: 21.4858, lng: 39.1925 },
    description:
      "A critical coastal restoration project along Jeddah's Red Sea coastline. This 1.8-hectare area has been impacted by marine debris, urban runoff, and accumulated waste, threatening the delicate marine ecosystem and coastal environment.",
    detailedDescription:
      "The coastal area features a mix of sandy beaches, rocky outcrops, and shallow water areas. The cleanup will focus on removing plastic debris, fishing nets, construction materials, and organic waste while protecting native marine life and coral formations.",
    requirements: [
      "Marine debris collection and sorting",
      "Plastic waste recycling operations",
      "Coastal vegetation restoration",
      "Water quality monitoring",
      "Marine life protection protocols",
      "Community education programs",
    ],
    environmentalImpact:
      "This coastal cleanup will protect critical marine habitats and prevent an estimated 50 tons of waste from entering the Red Sea ecosystem. The project will restore natural coastal processes and create a model for sustainable coastal management.",
    images: [
      {
        url: "/placeholder.svg?height=500&width=800&text=Coastal+Debris",
        label: "Coastal Debris Area",
      },
      {
        url: "/placeholder.svg?height=500&width=800&text=Marine+Waste",
        label: "Marine Waste Collection",
      },
      {
        url: "/placeholder.svg?height=500&width=800&text=Clean+Beach+Section",
        label: "Target Clean State",
      },
    ],
    stats: [
      { number: "1.8", label: "Hectares" },
      { number: "50", label: "Tons Waste" },
      { number: "30", label: "Days Duration" },
      { number: "95%", label: "Recyclable" },
    ],
    contactInfo: {
      address: "Red Sea Coastal Road, Jeddah",
      accessibility: "Coastal road access, boat access available",
      utilities: "Limited infrastructure, temporary facilities needed",
    },
  },
  3: {
    title: "Private Agricultural Land - Dammam",
    location: "Eastern Province, Dammam",
    city: "dammam",
    type: "private",
    status: "under-review",
    priority: "medium",
    area: "3.2 hectares",
    estimatedDuration: "60 days",
    expectedRevenue: "50% Revenue Share",
    coordinates: { lat: 26.4207, lng: 50.0888 },
    description:
      "A large agricultural property requiring comprehensive cleanup of accumulated farming equipment, organic waste, and infrastructure debris. The landowner is seeking a partnership for land restoration and preparation for modern agricultural use.",
    detailedDescription:
      "The property contains abandoned farming equipment, old irrigation systems, crop residue, and deteriorated farm buildings. The cleanup will involve equipment removal, organic waste composting, and soil preparation for future agricultural development.",
    requirements: [
      "Agricultural equipment removal and recycling",
      "Organic waste composting operations",
      "Irrigation system cleanup and assessment",
      "Soil quality testing and improvement",
      "Infrastructure debris removal",
      "Land preparation for cultivation",
    ],
    environmentalImpact:
      "This agricultural restoration will improve soil health, prevent water contamination, and create a model for sustainable farming practices. The project will demonstrate how proper land management can enhance agricultural productivity while protecting the environment.",
    images: [
      {
        url: "/placeholder.svg?height=500&width=800&text=Abandoned+Equipment",
        label: "Abandoned Farm Equipment",
      },
      {
        url: "/placeholder.svg?height=500&width=800&text=Irrigation+Systems",
        label: "Old Irrigation Systems",
      },
      {
        url: "/placeholder.svg?height=500&width=800&text=Crop+Residue",
        label: "Crop Residue Areas",
      },
      {
        url: "/placeholder.svg?height=500&width=800&text=Cleared+Section",
        label: "Cleared Section Example",
      },
    ],
    stats: [
      { number: "3.2", label: "Hectares" },
      { number: "200", label: "Tons Material" },
      { number: "60", label: "Days Duration" },
      { number: "70%", label: "Recyclable" },
    ],
    contactInfo: {
      address: "Agricultural District, Eastern Province",
      accessibility: "Rural road access, suitable for heavy machinery",
      utilities: "Well water available, electrical connection needed",
    },
  },
}

// Global variables
let currentLandData = null

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("Initializing Land Detail Page...")

  // Small delay to ensure all elements are ready
  setTimeout(() => {
    initializeLandDetailPage()
  }, 100)
})

function initializeLandDetailPage() {
  try {
    console.log("Starting land detail page initialization...")

    // Get land ID from URL or use default
    const urlParams = new URLSearchParams(window.location.search)
    let landId = urlParams.get("id") || "1"

    // Ensure landId exists in our data
    if (!detailedLandsData[landId]) {
      console.warn(`Land ID ${landId} not found, using default land 1`)
      landId = "1"
    }

    currentLandData = detailedLandsData[landId]
    console.log("Loading land data:", currentLandData.title)

    // Populate land data immediately
    populateLandData(currentLandData)

    // Initialize animations if GSAP is available
    if (typeof gsap !== "undefined") {
      console.log("GSAP available, initializing animations")
      initializeGSAPAnimations()
    } else {
      console.warn("GSAP not available, using fallback")
      showContentWithoutAnimations()
    }

    // Initialize photo gallery
    initializePhotoGallery()

    // Initialize map
    initializeMap(currentLandData)

    // Initialize interactive effects
    initializeInteractiveEffects()

    // Hide loading screen
    hideLoadingScreen()

    console.log("Land Detail Page loaded successfully! 🌱")
  } catch (error) {
    console.error("Error initializing page:", error)
    // Fallback: show content without animations
    populateLandData(detailedLandsData["1"])
    showContentWithoutAnimations()
    hideLoadingScreen()
  }
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen")
  if (loadingScreen) {
    if (typeof gsap !== "undefined") {
      gsap.to(loadingScreen, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          loadingScreen.style.display = "none"
        },
      })
    } else {
      loadingScreen.style.transition = "opacity 0.5s ease"
      loadingScreen.style.opacity = "0"
      setTimeout(() => {
        loadingScreen.style.display = "none"
      }, 500)
    }
  }
}

function showContentWithoutAnimations() {
  // Show all content immediately without animations
  const elements = document.querySelectorAll(
    ".breadcrumb, .land-detail-hero h1, .land-meta, .section-header, .photo-gallery-section, .land-details-section, .location-section, .info-card, .details-content",
  )
  elements.forEach((el) => {
    el.style.opacity = "1"
    el.style.transform = "translateY(0)"
  })
}

function populateLandData(landData) {
  console.log("Populating land data...")

  // Update page title and breadcrumb
  document.title = `${landData.title} | Land Reform`

  const titleBreadcrumb = document.getElementById("land-title-breadcrumb")
  const landTitle = document.getElementById("land-title")

  if (titleBreadcrumb) titleBreadcrumb.textContent = landData.title
  if (landTitle) landTitle.textContent = landData.title

  // Populate meta information
  const metaContainer = document.getElementById("land-meta")
  if (metaContainer) {
    metaContainer.innerHTML = `
      <div class="meta-item">
          <i class="fas fa-map-marker-alt"></i>
          <span>${landData.location}</span>
      </div>
      <div class="meta-item">
          <i class="fas fa-clock"></i>
          <span>${landData.estimatedDuration}</span>
      </div>
      <div class="meta-item">
          <i class="fas fa-chart-area"></i>
          <span>${landData.area}</span>
      </div>
      <div class="meta-item">
          <i class="fas fa-flag"></i>
          <span class="status-badge status-${landData.status}">${getStatusLabel(landData.status)}</span>
      </div>
    `
  }

  // Populate description
  const descriptionContainer = document.getElementById("land-description")
  if (descriptionContainer) {
    descriptionContainer.innerHTML = `
      <p>${landData.description}</p>
      <p>${landData.detailedDescription}</p>
    `
  }

  // Populate stats
  const statsContainer = document.getElementById("land-stats")
  if (statsContainer) {
    statsContainer.innerHTML = landData.stats
      .map(
        (stat) => `
        <div class="stat-item">
            <div class="stat-number">${stat.number}</div>
            <div class="stat-label">${stat.label}</div>
        </div>
      `,
      )
      .join("")
  }

  // Populate requirements
  const requirementsList = document.getElementById("requirements-list")
  if (requirementsList) {
    requirementsList.innerHTML = landData.requirements
      .map(
        (req) => `
        <li><i class="fas fa-tools"></i> ${req}</li>
      `,
      )
      .join("")
  }

  // Populate environmental impact
  const environmentalImpact = document.getElementById("environmental-impact")
  if (environmentalImpact) {
    environmentalImpact.innerHTML = `<p>${landData.environmentalImpact}</p>`
  }

  // Populate land info
  const landInfoContainer = document.getElementById("land-info")
  if (landInfoContainer) {
    landInfoContainer.innerHTML = `
      <div class="info-item">
          <span class="info-label">Location:</span>
          <span class="info-value">${landData.location}</span>
      </div>
      <div class="info-item">
          <span class="info-label">Land Type:</span>
          <span class="info-value">${landData.type === "government" ? "Government Property" : "Private Property"}</span>
      </div>
      <div class="info-item">
          <span class="info-label">Area:</span>
          <span class="info-value">${landData.area}</span>
      </div>
      <div class="info-item">
          <span class="info-label">Duration:</span>
          <span class="info-value">${landData.estimatedDuration}</span>
      </div>
      <div class="info-item">
          <span class="info-label">Priority:</span>
          <span class="priority-${landData.priority}">${landData.priority.charAt(0).toUpperCase() + landData.priority.slice(1)}</span>
      </div>
      <div class="info-item">
          <span class="info-label">Revenue:</span>
          <span class="info-value">${landData.expectedRevenue}</span>
      </div>
    `
  }

  // Populate gallery
  const galleryContainer = document.getElementById("gallery-slides")
  if (galleryContainer) {
    galleryContainer.innerHTML = landData.images
      .map(
        (image) => `
        <div class="swiper-slide">
            <div class="gallery-slide">
                <div class="gallery-image">
                    <img src="${image.url}" alt="${image.label}">
                    <div class="image-label">${image.label}</div>
                </div>
            </div>
        </div>
      `,
      )
      .join("")
  }

  // Update location description
  const locationDescription = document.getElementById("location-description")
  if (locationDescription) {
    locationDescription.textContent = `${landData.location} - Detailed location and access information`
  }

  console.log("Land data populated successfully")
}

function getStatusLabel(status) {
  const labels = {
    available: "Available",
    "under-review": "Under Review",
    "in-progress": "In Progress",
  }
  return labels[status] || status
}

function initializeGSAPAnimations() {
  console.log("Setting up GSAP animations...")

  // Set initial states
  gsap.set(".breadcrumb, .land-detail-hero h1, .land-meta", { opacity: 0, y: 50 })
  gsap.set(".section-header", { opacity: 0, y: 40 })
  gsap.set(".photo-gallery-section, .land-details-section, .location-section", { opacity: 0, y: 50 })
  gsap.set(".info-card, .details-content", { opacity: 0, y: 30 })

  // Hero section animation
  animateHeroSection()

  // Scroll-triggered animations
  setupScrollAnimations()
}

function animateHeroSection() {
  const tl = gsap.timeline({ delay: 0.3 })

  tl.to(".breadcrumb", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
  })
    .to(
      ".land-detail-hero h1",
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.4",
    )
    .to(
      ".land-meta",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.6",
    )
}

function setupScrollAnimations() {
  // Section headers
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

  // Main sections
  gsap.utils.toArray(".photo-gallery-section, .land-details-section, .location-section").forEach((section) => {
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

  // Details content and sidebar
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
      gsap.to(".info-card", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
      })
    },
  })
}

function initializePhotoGallery() {
  try {
    // Check if Swiper is available
    if (typeof window.Swiper === "undefined") {
      console.warn("Swiper is not loaded, gallery will be static")
      return
    }

    const swiper = new window.Swiper(".photo-gallery", {
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
    })

    console.log("Photo gallery initialized successfully")
  } catch (error) {
    console.error("Error initializing photo gallery:", error)
  }
}

function initializeMap(landData) {
  const mapContainer = document.getElementById("land-map")
  const locationDetailsContainer = document.getElementById("location-details")
  const locationFeaturesContainer = document.getElementById("location-features")

  if (!mapContainer) {
    console.warn("Map container not found")
    return
  }

  // Populate location details
  if (locationDetailsContainer) {
    locationDetailsContainer.innerHTML = `
      <div class="detail-item">
          <div class="detail-icon">
              <i class="fas fa-map-marker-alt"></i>
          </div>
          <div class="detail-content">
              <h4>Address</h4>
              <p>${landData.contactInfo.address}</p>
          </div>
      </div>
      <div class="detail-item">
          <div class="detail-icon">
              <i class="fas fa-globe"></i>
          </div>
          <div class="detail-content">
              <h4>Coordinates</h4>
              <p>${landData.coordinates.lat}° N, ${landData.coordinates.lng}° E</p>
          </div>
      </div>
    `
  }

  // Populate location features
  if (locationFeaturesContainer) {
    locationFeaturesContainer.innerHTML = `
      <div class="feature-item">
          <i class="fas fa-road"></i>
          <span>Accessibility: ${landData.contactInfo.accessibility}</span>
      </div>
      <div class="feature-item">
          <i class="fas fa-plug"></i>
          <span>Utilities: ${landData.contactInfo.utilities}</span>
      </div>
      <div class="feature-item">
          <i class="fas fa-truck"></i>
          <span>Heavy machinery compatible</span>
      </div>
    `
  }

  // Create map SVG
  let markerColor = ""
  let markerPosition = ""

  switch (landData.city) {
    case "riyadh":
      markerColor = "var(--primary-color)"
      markerPosition = 'cx="200" cy="150"'
      break
    case "jeddah":
      markerColor = "var(--secondary-color)"
      markerPosition = 'cx="120" cy="200"'
      break
    case "dammam":
      markerColor = "#10b981"
      markerPosition = 'cx="280" cy="180"'
      break
    default:
      markerColor = "var(--primary-color)"
      markerPosition = 'cx="200" cy="150"'
  }

  const mapSVG = `
    <svg viewBox="0 0 400 400" class="map-svg">
        <defs>
            <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:var(--light-blue);stop-opacity:0.8" />
                <stop offset="100%" style="stop-color:var(--primary-color);stop-opacity:0.3" />
            </linearGradient>
        </defs>
        <path d="M50 50 L350 50 L350 150 L300 200 L280 250 L250 300 L200 350 L150 350 L100 300 L80 250 L60 200 L50 150 Z" 
              fill="url(#mapGradient)" 
              stroke="var(--primary-color)" 
              stroke-width="3"/>
        <circle ${markerPosition} r="12" fill="${markerColor}" class="location-marker">
            <animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite"/>
        </circle>
        <text x="${markerPosition.includes("200") ? "220" : markerPosition.includes("120") ? "140" : "300"}" 
              y="${markerPosition.includes("150") ? "155" : markerPosition.includes("200") ? "205" : "185"}" 
              fill="${markerColor}" font-size="16" font-weight="bold">
              ${landData.city.charAt(0).toUpperCase() + landData.city.slice(1)}
        </text>
        <circle ${markerPosition} r="20" fill="none" stroke="${markerColor}" stroke-width="2" opacity="0.6" class="pulse-ring">
            <animate attributeName="r" values="20;30;20" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>
  `

  mapContainer.innerHTML = mapSVG

  // Add click handler
  mapContainer.addEventListener("click", () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${landData.coordinates.lat},${landData.coordinates.lng}&zoom=16`

    if (typeof gsap !== "undefined") {
      gsap.to(mapContainer, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          window.open(googleMapsUrl, "_blank")
        },
      })
    } else {
      window.open(googleMapsUrl, "_blank")
    }
  })

  mapContainer.style.cursor = "pointer"
  console.log("Map initialized successfully")
}

function initializeInteractiveEffects() {
  // Button hover effects
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("mouseenter", function () {
      if (typeof gsap !== "undefined") {
        gsap.to(this, { scale: 1.05, duration: 0.3, ease: "power2.out" })
      }
    })

    button.addEventListener("mouseleave", function () {
      if (typeof gsap !== "undefined") {
        gsap.to(this, { scale: 1, duration: 0.3, ease: "power2.out" })
      }
    })
  })

  // Card hover effects
  document.querySelectorAll(".info-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      if (typeof gsap !== "undefined") {
        gsap.to(this, { y: -5, duration: 0.3, ease: "power2.out" })
      }
    })

    card.addEventListener("mouseleave", function () {
      if (typeof gsap !== "undefined") {
        gsap.to(this, { y: 0, duration: 0.3, ease: "power2.out" })
      }
    })
  })

  console.log("Interactive effects initialized")
}

// Contact functionality
function applyForLand() {
  const modal = document.getElementById("contact-modal")
  const landSummary = document.getElementById("modal-land-summary")

  if (currentLandData && landSummary) {
    landSummary.innerHTML = `
      <h4>${currentLandData.title}</h4>
      <p><strong>Location:</strong> ${currentLandData.location}</p>
      <p><strong>Area:</strong> ${currentLandData.area}</p>
      <p><strong>Duration:</strong> ${currentLandData.estimatedDuration}</p>
      <p><strong>Revenue:</strong> ${currentLandData.expectedRevenue}</p>
    `
  }

  if (modal) {
    modal.classList.add("active")
    document.body.style.overflow = "hidden"

    // Animate modal in
    if (typeof gsap !== "undefined") {
      gsap.fromTo(
        ".modal-content",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" },
      )
    }
  }
}

function closeContactModal() {
  const modal = document.getElementById("contact-modal")

  if (modal) {
    if (typeof gsap !== "undefined") {
      gsap.to(".modal-content", {
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          modal.classList.remove("active")
          document.body.style.overflow = ""
          resetContactForm()
        },
      })
    } else {
      modal.classList.remove("active")
      document.body.style.overflow = ""
      resetContactForm()
    }
  }
}

function resetContactForm() {
  const form = document.getElementById("contact-form")
  if (form) {
    form.reset()
  }
}

function submitApplication() {
  const form = document.getElementById("contact-form")
  const name = document.getElementById("applicant-name").value
  const email = document.getElementById("applicant-email").value
  const phone = document.getElementById("applicant-phone").value
  const message = document.getElementById("message").value
  const termsAgreed = document.getElementById("terms-agreement").checked

  // Validate required fields
  if (!name || !email || !phone || !message || !termsAgreed) {
    alert("Please fill in all required fields and agree to the terms and conditions.")
    return
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.")
    return
  }

  // Simulate form submission
  const submitButton = event.target
  const originalText = submitButton.innerHTML

  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...'
  submitButton.disabled = true

  setTimeout(() => {
    // Generate application reference
    const refNumber = `LR-${Date.now().toString().slice(-6)}`

    // Store application data (in real app, this would be sent to server)
    const applicationData = {
      landId: new URLSearchParams(window.location.search).get("id") || "1",
      landTitle: currentLandData?.title || "Unknown Land",
      applicantName: name,
      applicantEmail: email,
      applicantPhone: phone,
      company: document.getElementById("company-name").value,
      experience: document.getElementById("experience").value,
      message: message,
      newsletter: document.getElementById("newsletter").checked,
      submittedAt: new Date().toISOString(),
      referenceNumber: refNumber,
      status: "pending",
    }

    // Save to localStorage
    const savedApplications = JSON.parse(localStorage.getItem("landApplications") || "[]")
    savedApplications.push(applicationData)
    localStorage.setItem("landApplications", JSON.stringify(savedApplications))

    // Close contact modal and show success modal
    closeContactModal()
    showSuccessModal(refNumber)

    submitButton.innerHTML = originalText
    submitButton.disabled = false

    console.log("Application submitted:", applicationData)
  }, 2000)
}

function showSuccessModal(referenceNumber) {
  const modal = document.getElementById("success-modal")

  if (modal) {
    modal.classList.add("active")

    // Update reference number if needed
    const successContent = modal.querySelector(".success-content")
    if (successContent && referenceNumber) {
      const refElement = successContent.querySelector(".reference-number")
      if (refElement) {
        refElement.textContent = referenceNumber
      } else {
        // Add reference number to success message
        const firstP = successContent.querySelector("p")
        if (firstP) {
          firstP.innerHTML += `<br><strong>Reference Number: ${referenceNumber}</strong>`
        }
      }
    }

    // Animate modal in
    if (typeof gsap !== "undefined") {
      gsap.fromTo(
        ".success-content",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
      )
    }
  }
}

function closeSuccessModal() {
  const modal = document.getElementById("success-modal")

  if (modal) {
    if (typeof gsap !== "undefined") {
      gsap.to(".success-content", {
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          modal.classList.remove("active")
          document.body.style.overflow = ""
        },
      })
    } else {
      modal.classList.remove("active")
      document.body.style.overflow = ""
    }
  }
}

// Direct contact functions
function callPhone(phoneNumber) {
  window.location.href = `tel:${phoneNumber}`
}

function sendEmail(emailAddress) {
  const subject = encodeURIComponent(`Inquiry about ${currentLandData?.title || "Land Cleanup Project"}`)
  const body = encodeURIComponent(`Hello,

I am interested in the land cleanup project: ${currentLandData?.title || "Unknown"}
Location: ${currentLandData?.location || "Unknown"}

Please provide more information about this opportunity.

Best regards`)

  window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`
}

function openWhatsApp(phoneNumber) {
  const message = encodeURIComponent(
    `Hello! I'm interested in the land cleanup project: ${currentLandData?.title || "Land Reform Project"}. Could you please provide more information?`,
  )
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${message}`
  window.open(whatsappUrl, "_blank")
}

// Make functions globally available
window.applyForLand = applyForLand
window.closeContactModal = closeContactModal
window.submitApplication = submitApplication
window.closeSuccessModal = closeSuccessModal
window.callPhone = callPhone
window.sendEmail = sendEmail
window.openWhatsApp = openWhatsApp

console.log("Land detail script loaded with working contact functionality")

