// Import GSAP and ScrollTrigger
const gsap = window.gsap
const ScrollTrigger = window.ScrollTrigger

// Register GSAP plugins
if (gsap && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger)
}

let uploadedImages = []

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("Initializing Add Land Page...")

  setTimeout(() => {
    initializeAddLandPage()
  }, 100)
})

function initializeAddLandPage() {
  try {
    console.log("Setting up Add Land Page...")

    // Hide loading screen
    hideLoadingScreen()

    // Initialize animations
    if (typeof gsap !== "undefined") {
      initializeGSAPAnimations()
    } else {
      initializeFallbackAnimations()
    }

    // Initialize form interactions
    initializeFormInteractions()

    // Initialize upload functionality
    initializeImageUpload()

    console.log("Add Land Page loaded successfully! 🌱")
  } catch (error) {
    console.error("Error initializing page:", error)
    initializeFallbackAnimations()
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
          if (loadingScreen.parentNode) {
            loadingScreen.parentNode.removeChild(loadingScreen)
          }
        },
      })
    } else {
      loadingScreen.style.display = "none"
    }
  }
}

function initializeGSAPAnimations() {
  console.log("Setting up GSAP animations...")

  // Set initial states
  gsap.set(".breadcrumb, .add-land-hero h1, .add-land-hero p, .hero-benefits", { opacity: 0, y: 50 })
  gsap.set(".form-header", { opacity: 0, y: 30 })
  gsap.set(".form-section-group", { opacity: 0, y: 40 })

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
      ".add-land-hero h1",
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.4",
    )
    .to(
      ".add-land-hero p",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.6",
    )
    .to(
      ".hero-benefits",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.4",
    )
}

function setupScrollAnimations() {
  // Form header
  ScrollTrigger.create({
    trigger: ".form-header",
    start: "top 85%",
    onEnter: () => {
      gsap.to(".form-header", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
    },
  })

  // Form sections
  gsap.utils.toArray(".form-section-group").forEach((section, index) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 85%",
      onEnter: () => {
        gsap.to(section, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out",
        })
      },
    })
  })
}

function initializeFormInteractions() {
  // Form validation
  const form = document.getElementById("add-land-form")
  if (form) {
    const inputs = form.querySelectorAll("input, select, textarea")

    inputs.forEach((input) => {
      input.addEventListener("blur", validateField)
      input.addEventListener("input", clearFieldError)
    })

    // Form submission
    form.addEventListener("submit", submitLandForm)
  }

  // Interactive hover effects
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

  // Benefit hover effects
  document.querySelectorAll(".benefit").forEach((benefit) => {
    benefit.addEventListener("mouseenter", function () {
      if (typeof gsap !== "undefined") {
        gsap.to(this, { y: -5, duration: 0.3, ease: "power2.out" })
      }
    })

    benefit.addEventListener("mouseleave", function () {
      if (typeof gsap !== "undefined") {
        gsap.to(this, { y: 0, duration: 0.3, ease: "power2.out" })
      }
    })
  })
}

function initializeImageUpload() {
  const uploadArea = document.getElementById("upload-area")
  const fileInput = document.getElementById("land-images")
  const previewContainer = document.getElementById("image-preview")
  const browseBtn = document.getElementById("browse-btn")

  // Check if elements exist
  if (!uploadArea || !fileInput || !previewContainer) {
    console.error("Upload elements not found")
    return
  }
  // Prevent default drag behaviors
  ;["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    uploadArea.addEventListener(eventName, preventDefaults, false)
    document.body.addEventListener(eventName, preventDefaults, false)
  })

  function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
  }
  // Highlight drop area when item is dragged over it
  ;["dragenter", "dragover"].forEach((eventName) => {
    uploadArea.addEventListener(eventName, highlight, false)
  })
  ;["dragleave", "drop"].forEach((eventName) => {
    uploadArea.addEventListener(eventName, unhighlight, false)
  })

  function highlight(e) {
    uploadArea.classList.add("highlight")
  }

  function unhighlight(e) {
    uploadArea.classList.remove("highlight")
  }

  // Handle dropped files
  uploadArea.addEventListener("drop", handleDrop, false)

  function handleDrop(e) {
    const dt = e.dataTransfer
    const files = dt.files
    handleFiles(Array.from(files))
  }

  // Click to upload - make the entire upload area clickable
  uploadArea.addEventListener("click", (e) => {
    // Don't trigger if clicking on the file input itself
    if (e.target !== fileInput) {
      e.preventDefault()
      fileInput.click()
    }
  })

  // Browse button click handler
  if (browseBtn) {
    browseBtn.addEventListener("click", (e) => {
      e.preventDefault()
      fileInput.click()
    })
  }

  // File input change event
  fileInput.addEventListener("change", (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      handleFiles(files)
      // Clear the input so the same file can be selected again if needed
      e.target.value = ""
    }
  })
}

function handleFiles(files) {
  const validFiles = files.filter((file) => {
    const isValidType = file.type.startsWith("image/")
    const isValidSize = file.size <= 5 * 1024 * 1024 // 5MB

    if (!isValidType) {
      showNotification("Please upload only image files", "error")
      return false
    }

    if (!isValidSize) {
      showNotification("Image size should be less than 5MB", "error")
      return false
    }

    return true
  })

  validFiles.forEach((file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageData = {
        file: file,
        url: e.target.result,
        name: file.name,
      }
      uploadedImages.push(imageData)
      addImagePreview(imageData, uploadedImages.length - 1)
    }
    reader.readAsDataURL(file)
  })
}

function addImagePreview(imageData, index) {
  const previewContainer = document.getElementById("image-preview")

  const previewItem = document.createElement("div")
  previewItem.className = "image-preview-item"
  previewItem.innerHTML = `
    <img src="${imageData.url}" alt="${imageData.name}">
    <button type="button" class="image-remove" onclick="removeImage(${index})">
      <i class="fas fa-times"></i>
    </button>
  `

  previewContainer.appendChild(previewItem)

  // Animate the new preview item
  if (typeof gsap !== "undefined") {
    gsap.from(previewItem, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: "back.out(1.7)",
    })
  }
}

function removeImage(index) {
  uploadedImages.splice(index, 1)
  refreshImagePreviews()
}

function refreshImagePreviews() {
  const previewContainer = document.getElementById("image-preview")
  previewContainer.innerHTML = ""

  uploadedImages.forEach((imageData, index) => {
    addImagePreview(imageData, index)
  })
}

function validateField(event) {
  const field = event.target
  const value = field.value.trim()
  const isRequired = field.hasAttribute("required")

  clearFieldError(event)

  if (isRequired && !value) {
    showFieldError(field, "This field is required")
    return false
  }

  // Specific validations
  switch (field.type) {
    case "email":
      if (value && !isValidEmail(value)) {
        showFieldError(field, "Please enter a valid email address")
        return false
      }
      break
    case "tel":
      if (value && !isValidPhone(value)) {
        showFieldError(field, "Please enter a valid phone number")
        return false
      }
      break
    case "number":
      if (value && isNaN(value)) {
        showFieldError(field, "Please enter a valid number")
        return false
      }
      break
  }

  return true
}

function showFieldError(field, message) {
  field.style.borderColor = "#dc2626"

  let errorElement = field.parentNode.querySelector(".field-error")
  if (!errorElement) {
    errorElement = document.createElement("span")
    errorElement.className = "field-error"
    field.parentNode.appendChild(errorElement)
  }

  errorElement.textContent = message
}

function clearFieldError(event) {
  const field = event.target
  field.style.borderColor = "#f1f5f9"

  const errorElement = field.parentNode.querySelector(".field-error")
  if (errorElement) {
    errorElement.remove()
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function isValidPhone(phone) {
  const phoneRegex = /^[+]?[0-9\s\-()]{10,}$/
  return phoneRegex.test(phone)
}

function submitLandForm(event) {
  event.preventDefault()

  const form = event.target
  const formData = new FormData(form)

  // Validate all fields
  const inputs = form.querySelectorAll("input[required], select[required], textarea[required]")
  let isValid = true

  inputs.forEach((input) => {
    const mockEvent = { target: input }
    if (!validateField(mockEvent)) {
      isValid = false
    }
  })

  if (!isValid) {
    showNotification("Please fix the errors in the form", "error")
    return
  }

  if (uploadedImages.length === 0) {
    showNotification("Please upload at least one image of the land", "error")
    return
  }

  // Show loading state
  const submitBtn = form.querySelector(".submit-btn")
  const originalText = submitBtn.innerHTML
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...'
  submitBtn.disabled = true

  // Simulate form submission
  setTimeout(() => {
    // Create new land entry
    const newLand = createLandFromForm(formData)

    // Add to local storage (in real app, this would be sent to server)
    saveLandToStorage(newLand)

    // Reset form
    form.reset()
    uploadedImages = []
    refreshImagePreviews()

    // Reset button
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false

    // Show success modal
    showSuccessModal()

    console.log("Land submitted successfully:", newLand)
  }, 2000)
}

function createLandFromForm(formData) {
  const newLand = {
    id: Date.now(), // Simple ID generation
    title: formData.get("landTitle"),
    location: formData.get("address"),
    city: formData.get("city"),
    type: formData.get("landType"),
    status: "under-review", // New submissions start as under review
    area: formData.get("area"),
    priority: formData.get("priority") || "medium",
    description: formData.get("description"),
    expectedRevenue: formData.get("landType") === "government" ? "Free - Recycling Revenue" : "50% Revenue Share",
    estimatedDuration: formData.get("estimatedDuration") || "TBD",
    coordinates: {
      lat: Number.parseFloat(formData.get("latitude")) || 0,
      lng: Number.parseFloat(formData.get("longitude")) || 0,
    },
    contactInfo: {
      name: formData.get("contactName"),
      email: formData.get("contactEmail"),
      phone: formData.get("contactPhone"),
      preferredContact: formData.get("preferredContact"),
    },
    additionalNotes: formData.get("additionalNotes"),
    images: uploadedImages.map((img) => img.url),
    submittedAt: new Date().toISOString(),
    newsletterSubscription: formData.get("newsletterSubscription") === "on",
  }

  return newLand
}

function saveLandToStorage(land) {
  const savedLands = JSON.parse(localStorage.getItem("submittedLands") || "[]")
  savedLands.push(land)
  localStorage.setItem("submittedLands", JSON.stringify(savedLands))
}

function showSuccessModal() {
  const modal = document.getElementById("success-modal")
  modal.classList.add("show")

  // Animate modal appearance
  if (typeof gsap !== "undefined") {
    gsap.from(".modal-content", {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)",
    })
  }
}

function closeSuccessModal() {
  const modal = document.getElementById("success-modal")

  if (typeof gsap !== "undefined") {
    gsap.to(".modal-content", {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        modal.classList.remove("show")
        // Redirect to lands page
        window.location.href = "lands.html"
      },
    })
  } else {
    modal.classList.remove("show")
    window.location.href = "lands.html"
  }
}

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message

  document.body.appendChild(notification)

  // Animate in
  if (typeof gsap !== "undefined") {
    gsap.from(notification, {
      x: 100,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    })

    // Auto remove after 5 seconds
    setTimeout(() => {
      gsap.to(notification, {
        x: 100,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification)
          }
        },
      })
    }, 5000)
  } else {
    // Fallback without animation
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 5000)
  }
}

function initializeFallbackAnimations() {
  console.log("Using fallback animations...")

  // Simple fade-in for elements
  setTimeout(() => {
    document
      .querySelectorAll(".breadcrumb, .add-land-hero h1, .add-land-hero p, .hero-benefits")
      .forEach((el, index) => {
        setTimeout(() => {
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
        }, index * 150)
      })
  }, 300)

  initializeFormInteractions()
  initializeImageUpload()
}

// Make functions globally available
window.removeImage = removeImage
window.closeSuccessModal = closeSuccessModal
