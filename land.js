// Land Reform - Enhanced Filtering System
document.addEventListener("DOMContentLoaded", () => {
  console.log("Land Reform page loaded successfully")

  // DOM Elements
  const elements = {
    propertyGrid: document.getElementById("propertyGrid"),
    noResults: document.getElementById("noResults"),
    pagination: document.getElementById("pagination"),
    pageNumbers: document.getElementById("pageNumbers"),
    prevPageBtn: document.getElementById("prevPageBtn"),
    nextPageBtn: document.getElementById("nextPageBtn"),
    propertyCount: document.getElementById("propertyCount"),
    searchInput: document.getElementById("searchInput"),
    sortSelect: document.getElementById("sortSelect"),
    showFilterBtn: document.getElementById("showFilterBtn"),
    showFilterBtnMobile: document.getElementById("showFilterBtnMobile"),
    filterSidebar: document.getElementById("filterSidebar"),
    closeSidebarBtn: document.getElementById("closeSidebarBtn"),
    overlay: document.getElementById("overlay"),
    resetFiltersBtn: document.getElementById("resetFiltersBtn"),
    resetDesktopFiltersBtn: document.getElementById("resetDesktopFiltersBtn"),
    resetNoResultsBtn: document.getElementById("resetNoResultsBtn"),
    priceRange: document.getElementById("priceRange"),
    desktopPriceRange: document.getElementById("desktopPriceRange"),
    minPrice: document.getElementById("minPrice"),
    maxPrice: document.getElementById("maxPrice"),
    desktopMinPrice: document.getElementById("desktopMinPrice"),
    desktopMaxPrice: document.getElementById("desktopMaxPrice"),
  }

  // Application State
  let currentPage = 1
  const landsPerPage = 6
  let filteredLands = []
  let activeFilters = {
    landTypes: [],
    locations: [],
    statuses: [],
    priorities: [],
    priceMin: 0,
    priceMax: 2500000,
    landSize: "all",
    search: "",
  }

  // Sample lands data - Expanded to 24 lands
  const landsData = [
    {
      id: 1,
      title: "Industrial Waste Site - North Riyadh",
      location: "North Riyadh, Saudi Arabia",
      city: "riyadh",
      type: "government",
      status: "available",
      priority: "high-priority",
      area: "2.5 hectares",
      areaValue: 2.5,
      estimatedCost: "SR 450,000",
      costValue: 450000,
      expectedRevenue: "SR 1,200,000",
      revenueValue: 1200000,
      timeframe: "8-12 months",
      description:
        "Former industrial site requiring comprehensive cleanup and soil remediation. High potential for conversion to green space or commercial development.",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 2,
      title: "Abandoned Construction Site",
      location: "East Jeddah, Saudi Arabia",
      city: "jeddah",
      type: "private",
      status: "under-review",
      priority: "medium-priority",
      area: "1.8 hectares",
      areaValue: 1.8,
      estimatedCost: "SR 320,000",
      costValue: 320000,
      expectedRevenue: "SR 850,000",
      revenueValue: 850000,
      timeframe: "6-9 months",
      description:
        "Partially constructed residential project left abandoned. Requires debris removal and environmental assessment before redevelopment.",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 3,
      title: "Contaminated Agricultural Land",
      location: "South Dammam, Saudi Arabia",
      city: "dammam",
      type: "government",
      status: "available",
      priority: "high-priority",
      area: "4.2 hectares",
      areaValue: 4.2,
      estimatedCost: "SR 680,000",
      costValue: 680000,
      expectedRevenue: "SR 1,800,000",
      revenueValue: 1800000,
      timeframe: "12-18 months",
      description:
        "Agricultural land affected by chemical contamination. Requires soil treatment and restoration for future agricultural or residential use.",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 4,
      title: "Old Gas Station Site",
      location: "Central Riyadh, Saudi Arabia",
      city: "riyadh",
      type: "private",
      status: "in-progress",
      priority: "medium-priority",
      area: "0.8 hectares",
      areaValue: 0.8,
      estimatedCost: "SR 280,000",
      costValue: 280000,
      expectedRevenue: "SR 750,000",
      revenueValue: 750000,
      timeframe: "4-6 months",
      description:
        "Former gas station requiring underground tank removal and soil decontamination. Prime location for commercial redevelopment.",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 5,
      title: "Illegal Dumping Ground",
      location: "West Jeddah, Saudi Arabia",
      city: "jeddah",
      type: "government",
      status: "available",
      priority: "high-priority",
      area: "3.1 hectares",
      areaValue: 3.1,
      estimatedCost: "SR 520,000",
      costValue: 520000,
      expectedRevenue: "SR 1,400,000",
      revenueValue: 1400000,
      timeframe: "10-14 months",
      description:
        "Large area used for illegal waste dumping. Requires comprehensive cleanup and environmental restoration with high community impact potential.",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 6,
      title: "Abandoned Factory Complex",
      location: "Industrial Dammam, Saudi Arabia",
      city: "dammam",
      type: "private",
      status: "under-review",
      priority: "low-priority",
      area: "5.5 hectares",
      areaValue: 5.5,
      estimatedCost: "SR 890,000",
      costValue: 890000,
      expectedRevenue: "SR 2,200,000",
      revenueValue: 2200000,
      timeframe: "15-20 months",
      description:
        "Large abandoned manufacturing facility requiring asbestos removal and structural demolition. Excellent potential for mixed-use development.",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 7,
      title: "Polluted Waterfront Area",
      location: "Coastal Jeddah, Saudi Arabia",
      city: "jeddah",
      type: "government",
      status: "available",
      priority: "high-priority",
      area: "6.2 hectares",
      areaValue: 6.2,
      estimatedCost: "SR 1,200,000",
      costValue: 1200000,
      expectedRevenue: "SR 2,800,000",
      revenueValue: 2800000,
      timeframe: "18-24 months",
      description:
        "Waterfront area affected by industrial pollution. Major cleanup project with potential for tourism and recreational development.",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 8,
      title: "Abandoned Mining Site",
      location: "North Dammam, Saudi Arabia",
      city: "dammam",
      type: "private",
      status: "in-progress",
      priority: "medium-priority",
      area: "8.1 hectares",
      areaValue: 8.1,
      estimatedCost: "SR 1,500,000",
      costValue: 1500000,
      expectedRevenue: "SR 3,200,000",
      revenueValue: 3200000,
      timeframe: "20-30 months",
      description:
        "Former mining operation requiring extensive environmental restoration. Large scale project with significant economic potential.",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 9,
      title: "Abandoned Shopping Center",
      location: "Downtown Riyadh, Saudi Arabia",
      city: "riyadh",
      type: "private",
      status: "available",
      priority: "medium-priority",
      area: "1.2 hectares",
      areaValue: 1.2,
      estimatedCost: "SR 380,000",
      costValue: 380000,
      expectedRevenue: "SR 950,000",
      revenueValue: 950000,
      timeframe: "6-8 months",
      description:
        "Vacant shopping complex with structural damage and accumulated debris. Prime urban location for redevelopment.",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 10,
      title: "Contaminated Parking Lot",
      location: "Airport District, Jeddah",
      city: "jeddah",
      type: "government",
      status: "available",
      priority: "low-priority",
      area: "0.6 hectares",
      areaValue: 0.6,
      estimatedCost: "SR 180,000",
      costValue: 180000,
      expectedRevenue: "SR 420,000",
      revenueValue: 420000,
      timeframe: "3-4 months",
      description:
        "Former vehicle maintenance area with oil contamination. Requires soil remediation and surface cleaning.",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 11,
      title: "Derelict Warehouse District",
      location: "Port Area, Dammam",
      city: "dammam",
      type: "government",
      status: "under-review",
      priority: "high-priority",
      area: "7.3 hectares",
      areaValue: 7.3,
      estimatedCost: "SR 1,100,000",
      costValue: 1100000,
      expectedRevenue: "SR 2,600,000",
      revenueValue: 2600000,
      timeframe: "16-22 months",
      description:
        "Multiple abandoned warehouses near the port requiring comprehensive cleanup and structural assessment.",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 12,
      title: "Old Textile Factory",
      location: "Industrial Riyadh, Saudi Arabia",
      city: "riyadh",
      type: "private",
      status: "available",
      priority: "medium-priority",
      area: "2.8 hectares",
      areaValue: 2.8,
      estimatedCost: "SR 540,000",
      costValue: 540000,
      expectedRevenue: "SR 1,350,000",
      revenueValue: 1350000,
      timeframe: "9-12 months",
      description:
        "Former textile manufacturing facility with chemical residue and equipment debris. Good potential for industrial redevelopment.",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 13,
      title: "Abandoned Resort Site",
      location: "Red Sea Coast, Jeddah",
      city: "jeddah",
      type: "private",
      status: "available",
      priority: "low-priority",
      area: "4.5 hectares",
      areaValue: 4.5,
      estimatedCost: "SR 720,000",
      costValue: 720000,
      expectedRevenue: "SR 1,800,000",
      revenueValue: 1800000,
      timeframe: "12-15 months",
      description:
        "Unfinished resort development with construction debris and environmental impact. Coastal location with tourism potential.",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 14,
      title: "Contaminated Fuel Depot",
      location: "Logistics Zone, Dammam",
      city: "dammam",
      type: "government",
      status: "in-progress",
      priority: "high-priority",
      area: "3.7 hectares",
      areaValue: 3.7,
      estimatedCost: "SR 890,000",
      costValue: 890000,
      expectedRevenue: "SR 2,100,000",
      revenueValue: 2100000,
      timeframe: "14-18 months",
      description:
        "Former fuel storage facility requiring specialized hazardous material cleanup and soil remediation.",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 15,
      title: "Abandoned Hospital Complex",
      location: "Medical District, Riyadh",
      city: "riyadh",
      type: "government",
      status: "available",
      priority: "medium-priority",
      area: "2.1 hectares",
      areaValue: 2.1,
      estimatedCost: "SR 480,000",
      costValue: 480000,
      expectedRevenue: "SR 1,150,000",
      revenueValue: 1150000,
      timeframe: "8-10 months",
      description:
        "Former medical facility requiring careful removal of medical waste and asbestos. Strategic location for healthcare redevelopment.",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 16,
      title: "Polluted Marina Area",
      location: "Corniche, Jeddah",
      city: "jeddah",
      type: "government",
      status: "available",
      priority: "high-priority",
      area: "1.9 hectares",
      areaValue: 1.9,
      estimatedCost: "SR 650,000",
      costValue: 650000,
      expectedRevenue: "SR 1,600,000",
      revenueValue: 1600000,
      timeframe: "10-12 months",
      description:
        "Marina area affected by oil spills and marine debris. Critical for coastal ecosystem restoration and tourism development.",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 17,
      title: "Abandoned Power Plant",
      location: "Energy Sector, Dammam",
      city: "dammam",
      type: "government",
      status: "under-review",
      priority: "high-priority",
      area: "9.2 hectares",
      areaValue: 9.2,
      estimatedCost: "SR 1,800,000",
      costValue: 1800000,
      expectedRevenue: "SR 3,800,000",
      revenueValue: 3800000,
      timeframe: "24-30 months",
      description:
        "Decommissioned power generation facility requiring extensive cleanup and infrastructure removal. Major redevelopment opportunity.",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 18,
      title: "Old Cement Factory",
      location: "Industrial Zone, Riyadh",
      city: "riyadh",
      type: "private",
      status: "available",
      priority: "low-priority",
      area: "6.8 hectares",
      areaValue: 6.8,
      estimatedCost: "SR 980,000",
      costValue: 980000,
      expectedRevenue: "SR 2,300,000",
      revenueValue: 2300000,
      timeframe: "18-22 months",
      description:
        "Former cement manufacturing plant with dust contamination and heavy machinery debris. Suitable for industrial redevelopment.",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 19,
      title: "Contaminated Fish Market",
      location: "Old Town, Jeddah",
      city: "jeddah",
      type: "government",
      status: "available",
      priority: "medium-priority",
      area: "0.9 hectares",
      areaValue: 0.9,
      estimatedCost: "SR 220,000",
      costValue: 220000,
      expectedRevenue: "SR 580,000",
      revenueValue: 580000,
      timeframe: "4-6 months",
      description:
        "Former fish market with organic waste contamination and structural damage. Historic area with commercial redevelopment potential.",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 20,
      title: "Abandoned Shipyard",
      location: "Coastal Industrial, Dammam",
      city: "dammam",
      type: "private",
      status: "in-progress",
      priority: "medium-priority",
      area: "5.1 hectares",
      areaValue: 5.1,
      estimatedCost: "SR 850,000",
      costValue: 850000,
      expectedRevenue: "SR 2,000,000",
      revenueValue: 2000000,
      timeframe: "15-18 months",
      description:
        "Former shipbuilding facility with metal debris and chemical contamination. Coastal location with maritime industry potential.",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 21,
      title: "Derelict Shopping Mall",
      location: "Suburban Riyadh, Saudi Arabia",
      city: "riyadh",
      type: "private",
      status: "available",
      priority: "low-priority",
      area: "3.4 hectares",
      areaValue: 3.4,
      estimatedCost: "SR 620,000",
      costValue: 620000,
      expectedRevenue: "SR 1,450,000",
      revenueValue: 1450000,
      timeframe: "10-14 months",
      description:
        "Large abandoned shopping center with structural issues and accumulated debris. Suburban location suitable for mixed-use development.",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 22,
      title: "Contaminated Auto Salvage",
      location: "Industrial Jeddah, Saudi Arabia",
      city: "jeddah",
      type: "private",
      status: "under-review",
      priority: "medium-priority",
      area: "2.3 hectares",
      areaValue: 2.3,
      estimatedCost: "SR 420,000",
      costValue: 420000,
      expectedRevenue: "SR 980,000",
      revenueValue: 980000,
      timeframe: "7-9 months",
      description:
        "Former auto salvage yard with vehicle debris and fluid contamination. High metal recycling potential and industrial redevelopment opportunity.",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 23,
      title: "Abandoned Airport Terminal",
      location: "Old Airport, Dammam",
      city: "dammam",
      type: "government",
      status: "available",
      priority: "high-priority",
      area: "4.8 hectares",
      areaValue: 4.8,
      estimatedCost: "SR 780,000",
      costValue: 780000,
      expectedRevenue: "SR 1,900,000",
      revenueValue: 1900000,
      timeframe: "12-16 months",
      description:
        "Decommissioned airport terminal with infrastructure debris and environmental concerns. Strategic location for logistics and commercial development.",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 24,
      title: "Polluted Industrial Canal",
      location: "Waterway District, Riyadh",
      city: "riyadh",
      type: "government",
      status: "available",
      priority: "high-priority",
      area: "1.5 hectares",
      areaValue: 1.5,
      estimatedCost: "SR 560,000",
      costValue: 560000,
      expectedRevenue: "SR 1,300,000",
      revenueValue: 1300000,
      timeframe: "8-11 months",
      description:
        "Industrial waterway requiring comprehensive cleanup and restoration. Critical for water quality improvement and urban development.",
      image: "/placeholder.svg?height=200&width=350",
    },
  ]

  // Initialize the application
  function initializeApp() {
    console.log("Initializing Land Reform application...")

    // Hide loading screen
    hideLoadingScreen()

    // Initialize lands display
    filteredLands = [...landsData]
    renderLands()
    updatePagination()

    // Setup event listeners
    setupEventListeners()

    // Initialize animations
    initializeAnimations()

    console.log(`Application initialized with ${landsData.length} lands`)
  }

  // Hide loading screen
  function hideLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen")
    if (loadingScreen) {
      if (typeof window.gsap !== "undefined") {
        window.gsap.to(loadingScreen, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            loadingScreen.style.display = "none"
          },
        })
      } else {
        loadingScreen.style.display = "none"
      }
    }
  }

  // Setup event listeners
  function setupEventListeners() {
    // Mobile filter buttons
    if (elements.showFilterBtn) {
      elements.showFilterBtn.addEventListener("click", toggleMobileFilter)
    }
    if (elements.showFilterBtnMobile) {
      elements.showFilterBtnMobile.addEventListener("click", toggleMobileFilter)
    }
    if (elements.closeSidebarBtn) {
      elements.closeSidebarBtn.addEventListener("click", closeMobileFilter)
    }
    if (elements.overlay) {
      elements.overlay.addEventListener("click", closeMobileFilter)
    }

    // Search functionality
    if (elements.searchInput) {
      elements.searchInput.addEventListener("input", handleSearch)
    }

    // Sort functionality
    if (elements.sortSelect) {
      elements.sortSelect.addEventListener("change", handleSort)
    }

    // Reset filters
    if (elements.resetFiltersBtn) {
      elements.resetFiltersBtn.addEventListener("click", resetFilters)
    }
    if (elements.resetDesktopFiltersBtn) {
      elements.resetDesktopFiltersBtn.addEventListener("click", resetFilters)
    }
    if (elements.resetNoResultsBtn) {
      elements.resetNoResultsBtn.addEventListener("click", resetFilters)
    }

    // Price range sliders
    if (elements.priceRange && elements.maxPrice) {
      elements.priceRange.addEventListener("input", (e) => {
        const value = Number.parseInt(e.target.value)
        elements.maxPrice.textContent = `SR ${value.toLocaleString()}`
        activeFilters.priceMax = value
        applyFilters()
      })
    }

    if (elements.desktopPriceRange && elements.desktopMaxPrice) {
      elements.desktopPriceRange.addEventListener("input", (e) => {
        const value = Number.parseInt(e.target.value)
        elements.desktopMaxPrice.textContent = `SR ${value.toLocaleString()}`
        activeFilters.priceMax = value
        // Sync mobile slider
        if (elements.priceRange) elements.priceRange.value = value
        if (elements.maxPrice) elements.maxPrice.textContent = `SR ${value.toLocaleString()}`
        applyFilters()
      })
    }

    // Checkbox filters
    setupCheckboxFilters("land-type", "landTypes")
    setupCheckboxFilters("desktop-land-type", "landTypes")
    setupCheckboxFilters("location", "locations")
    setupCheckboxFilters("desktop-location", "locations")
    setupCheckboxFilters("status", "statuses")
    setupCheckboxFilters("desktop-status", "statuses")
    setupCheckboxFilters("priority", "priorities")
    setupCheckboxFilters("desktop-priority", "priorities")

    // Radio button filters
    setupRadioFilters("land-size", "landSize")
    setupRadioFilters("desktop-land-size", "landSize")

    // Pagination
    if (elements.prevPageBtn) {
      elements.prevPageBtn.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--
          renderLands()
          updatePagination()
        }
      })
    }

    if (elements.nextPageBtn) {
      elements.nextPageBtn.addEventListener("click", () => {
        const totalPages = Math.ceil(filteredLands.length / landsPerPage)
        if (currentPage < totalPages) {
          currentPage++
          renderLands()
          updatePagination()
        }
      })
    }
  }

  // Setup checkbox filters
  function setupCheckboxFilters(name, filterKey) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]`)
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          activeFilters[filterKey].push(checkbox.value)
        } else {
          activeFilters[filterKey] = activeFilters[filterKey].filter((value) => value !== checkbox.value)
        }
        applyFilters()
      })
    })
  }

  // Setup radio filters
  function setupRadioFilters(name, filterKey) {
    const radios = document.querySelectorAll(`input[name="${name}"]`)
    radios.forEach((radio) => {
      radio.addEventListener("change", () => {
        activeFilters[filterKey] = radio.value
        applyFilters()
      })
    })
  }

  // Apply filters
  function applyFilters() {
    filteredLands = landsData.filter((land) => {
      return (
        (activeFilters.landTypes.length === 0 || activeFilters.landTypes.includes(land.type)) &&
        (activeFilters.locations.length === 0 || activeFilters.locations.includes(land.city)) &&
        (activeFilters.statuses.length === 0 || activeFilters.statuses.includes(land.status)) &&
        (activeFilters.priorities.length === 0 || activeFilters.priorities.includes(land.priority)) &&
        land.costValue >= activeFilters.priceMin &&
        land.costValue <= activeFilters.priceMax &&
        (activeFilters.landSize === "all" || land.areaValue === Number.parseFloat(activeFilters.landSize))
      )
    })
    currentPage = 1
    renderLands()
    updatePagination()
  }

  // Initialize animations
  function initializeAnimations() {
    console.log("Initializing enhanced animations...")

    // Add animation classes to elements
    addAnimationClasses()

    // Initialize typewriter effects
    initializeTypewriterEffects()

    // Initialize scroll animations
    initializeScrollAnimations()

    // Initialize search input animations
    initializeSearchAnimations()

    // Initialize stats counter animation
    initializeStatsAnimation()

    // Initialize floating animations for icons
    initializeFloatingAnimations()
  }

  // Add animation classes to elements
  function addAnimationClasses() {
    // Hero elements
    const heroTitle = document.querySelector(".hero-title")
    const heroSubtitle = document.querySelector(".hero-subtitle")
    const breadcrumb = document.querySelector(".breadcrumb")

    if (heroTitle) heroTitle.classList.add("fade-in-up")
    if (heroSubtitle) heroSubtitle.classList.add("fade-in-up", "stagger-2")
    if (breadcrumb) breadcrumb.classList.add("fade-in-up", "stagger-1")

    // Stats cards
    document.querySelectorAll(".stat-card").forEach((card, index) => {
      card.classList.add("scale-in", `stagger-${index + 1}`)
    })

    // Section headers
    document.querySelectorAll(".section-header").forEach((header) => {
      header.classList.add("fade-in-up")
    })

    // Property cards
    document.querySelectorAll(".property-card").forEach((card, index) => {
      card.classList.add("fade-in-up", `stagger-${(index % 3) + 1}`)
    })

    // Sidebar
    const sidebar = document.querySelector(".sidebar")
    if (sidebar) sidebar.classList.add("fade-in-left")

    // CTA section
    const ctaSection = document.querySelector(".cta-section")
    if (ctaSection) ctaSection.classList.add("slide-in-bottom")
  }

  // Initialize typewriter effects
  function initializeTypewriterEffects() {
    const heroTitle = document.querySelector(".hero-title")
    if (heroTitle) {
      const originalText = heroTitle.textContent
      heroTitle.textContent = ""
      heroTitle.classList.add("typewriter")

      // Typewriter effect
      let i = 0
      const typeWriter = () => {
        if (i < originalText.length) {
          heroTitle.textContent += originalText.charAt(i)
          i++
          setTimeout(typeWriter, 100)
        } else {
          // Remove typewriter border after completion
          setTimeout(() => {
            heroTitle.style.borderRight = "none"
          }, 1000)
        }
      }

      // Start typewriter after a delay
      setTimeout(typeWriter, 1000)
    }
  }

  // Initialize scroll animations
  function initializeScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated")

          // Add shimmer effect to cards
          if (entry.target.classList.contains("property-card")) {
            entry.target.classList.add("card-loading")
            setTimeout(() => {
              entry.target.classList.remove("card-loading")
            }, 1000)
          }

          // Unobserve after animation
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Observe all animated elements
    document
      .querySelectorAll(
        ".fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .rotate-in, .bounce-in, .slide-in-bottom",
      )
      .forEach((el) => {
        observer.observe(el)
      })
  }

  // Initialize search input animations
  function initializeSearchAnimations() {
    const searchInput = document.getElementById("searchInput")
    if (searchInput) {
      const placeholders = [
        "Search lands, locations...",
        "Find cleanup projects...",
        "Discover opportunities...",
        "Search by city or type...",
      ]

      let currentIndex = 0

      const changePlaceholder = () => {
        searchInput.style.opacity = "0.5"
        setTimeout(() => {
          searchInput.placeholder = placeholders[currentIndex]
          searchInput.style.opacity = "1"
          currentIndex = (currentIndex + 1) % placeholders.length
        }, 300)
      }

      // Change placeholder every 3 seconds
      setInterval(changePlaceholder, 3000)

      // Add focus animations
      searchInput.addEventListener("focus", () => {
        searchInput.style.transform = "scale(1.02)"
        searchInput.style.boxShadow = "0 8px 25px rgba(45, 51, 107, 0.15)"
      })

      searchInput.addEventListener("blur", () => {
        searchInput.style.transform = "scale(1)"
        searchInput.style.boxShadow = "0 0 0 3px rgba(45, 51, 107, 0.2)"
      })
    }
  }

  // Initialize stats counter animation
  function initializeStatsAnimation() {
    const statNumbers = document.querySelectorAll(".stat-number")

    const animateCounter = (element, target) => {
      let current = 0
      const increment = target / 50
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        element.textContent = Math.floor(current)
      }, 50)
    }

    // Observe stats for counter animation
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = Number.parseInt(entry.target.dataset.target) || Number.parseInt(entry.target.textContent)
          animateCounter(entry.target, target)
          statsObserver.unobserve(entry.target)
        }
      })
    })

    statNumbers.forEach((stat) => {
      statsObserver.observe(stat)
    })
  }

  // Initialize floating animations
  function initializeFloatingAnimations() {
    // Add floating animation to icons
    document.querySelectorAll(".stat-icon, .feature-icon").forEach((icon, index) => {
      icon.classList.add("floating")
      icon.style.animationDelay = `${index * 0.5}s`
    })

    // Add pulse animation to badges
    document.querySelectorAll(".badge").forEach((badge, index) => {
      badge.addEventListener("mouseenter", () => {
        badge.classList.add("pulse")
      })

      badge.addEventListener("mouseleave", () => {
        badge.classList.remove("pulse")
      })
    })
  }

  // Enhanced render lands function with animations
  function renderLands() {
    elements.propertyGrid.innerHTML = ""
    const startIndex = (currentPage - 1) * landsPerPage
    const endIndex = startIndex + landsPerPage
    const landsToDisplay = filteredLands.slice(startIndex, endIndex)

    // Update property count with animation
    if (elements.propertyCount) {
      const newCount = `${filteredLands.length} lands available`
      elements.propertyCount.style.opacity = "0"
      setTimeout(() => {
        elements.propertyCount.textContent = newCount
        elements.propertyCount.style.opacity = "1"
      }, 200)
    }

    if (landsToDisplay.length === 0) {
      elements.noResults.style.display = "block"
      elements.noResults.classList.add("bounce-in", "animated")
    } else {
      elements.noResults.style.display = "none"
      landsToDisplay.forEach((land, index) => {
        const landElement = document.createElement("div")
        landElement.className = `property-card animate-in fade-in-up stagger-${(index % 3) + 1}`
        landElement.style.cursor = "pointer"
        landElement.innerHTML = `
          <div class="property-image">
            <img src="${land.image}">
            <div class="property-badges">
              <span class="badge ${land.type}">${land.type === "government" ? "Government" : "Private"}</span>
              <span class="badge ${land.status}">${land.status.replace("-", " ")}</span>
            </div>
          </div>
          <div class="property-details">
            <h3 class="property-title">${land.title}</h3>
            <div class="property-location">
              <i class="fas fa-map-marker-alt"></i>
              ${land.location}
            </div>
            <div class="property-meta">
              <div class="meta-item">
                <div class="meta-label">Area</div>
                <div class="meta-value">${land.area}</div>
              </div>
              <div class="meta-item">
                <div class="meta-label">Priority</div>
                <div class="meta-value badge ${land.priority}">${land.priority.replace("-priority", "").replace("-", " ")}</div>
              </div>
            </div>
            <p class="property-description">${land.description}</p>
            <div class="property-footer">
              <div class="revenue-info">
                <div class="revenue-label">Expected Revenue</div>
                <div class="revenue-value">${land.expectedRevenue}</div>
              </div>
              <button class="view-btn" onclick="event.stopPropagation(); viewLandDetails(${land.id})">
                View Details
              </button>
            </div>
          </div>
        `

        // Add click event to the entire card
        landElement.addEventListener("click", () => {
          viewLandDetails(land.id)
        })

        elements.propertyGrid.appendChild(landElement)
      })

      // Trigger scroll animations for new cards
      setTimeout(() => {
        document.querySelectorAll(".property-card.animate-in").forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("animated")
            card.classList.add("card-loading")
            setTimeout(() => {
              card.classList.remove("card-loading")
            }, 800)
          }, index * 100)
        })
      }, 100)

      // GSAP animation fallback
      if (typeof window.gsap !== "undefined") {
        window.gsap.fromTo(
          ".property-card.animate-in",
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
        )
      }
    }
  }

  // Update pagination
  function updatePagination() {
    const totalPages = Math.ceil(filteredLands.length / landsPerPage)
    elements.pageNumbers.innerHTML = ""

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button")
      pageButton.textContent = i
      pageButton.className = "page-btn"
      if (i === currentPage) {
        pageButton.classList.add("active")
      }
      pageButton.addEventListener("click", () => {
        currentPage = i
        renderLands()
        updatePagination()
      })
      elements.pageNumbers.appendChild(pageButton)
    }
  }

  // Toggle mobile filter
  function toggleMobileFilter() {
    elements.filterSidebar.classList.toggle("active")
    elements.overlay.classList.toggle("active")
  }

  // Close mobile filter
  function closeMobileFilter() {
    elements.filterSidebar.classList.remove("active")
    elements.overlay.classList.remove("active")
  }

  // Handle search
  function handleSearch(e) {
    activeFilters.search = e.target.value.toLowerCase()
    applyFilters()
  }

  // Handle sort
  function handleSort(e) {
    const sortValue = e.target.value
    if (sortValue === "cost-asc") {
      filteredLands.sort((a, b) => a.costValue - b.costValue)
    } else if (sortValue === "cost-desc") {
      filteredLands.sort((a, b) => b.costValue - a.costValue)
    } else if (sortValue === "revenue-asc") {
      filteredLands.sort((a, b) => a.revenueValue - b.revenueValue)
    } else if (sortValue === "revenue-desc") {
      filteredLands.sort((a, b) => b.revenueValue - a.revenueValue)
    }
    renderLands()
  }

  // Reset filters
  function resetFilters() {
    activeFilters = {
      landTypes: [],
      locations: [],
      statuses: [],
      priorities: [],
      priceMin: 0,
      priceMax: 2500000,
      landSize: "all",
      search: "",
    }
    if (elements.priceRange) elements.priceRange.value = activeFilters.priceMax
    if (elements.desktopPriceRange) elements.desktopPriceRange.value = activeFilters.priceMax
    if (elements.maxPrice) elements.maxPrice.textContent = `SR ${activeFilters.priceMax.toLocaleString()}`
    if (elements.desktopMaxPrice) elements.desktopMaxPrice.textContent = `SR ${activeFilters.priceMax.toLocaleString()}`
    applyFilters()
  }

  // Make viewLandDetails globally accessible
  window.viewLandDetails = viewLandDetails

  // View land details function
  function viewLandDetails(landId) {
    console.log(`Navigating to details for land ID: ${landId}`)
    window.location.href = `land-detail.html?id=${landId}`
  }

  initializeApp()
})




