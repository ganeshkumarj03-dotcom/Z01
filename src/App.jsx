import React, { useEffect, useState } from 'react';
import {
  Play, Camera, Video, Users, CheckCircle, Calendar, Search,
  Star, MapPin, ArrowRight, Coins, ChevronRight, Menu, X,
  Plus, Sparkles, Shield, Clock, Eye, ShieldCheck, Heart, ShoppingCart,
  FileText, Download, Mail, Smartphone, BarChart3, Edit3
} from 'lucide-react';
import './App.css';

const validPages = new Set(['home', 'production', 'booking', 'blog', 'crew', 'how-it-works', 'help']);

const getPageFromHash = () => {
  if (typeof window === 'undefined') {
    return 'home';
  }

  const hash = window.location.hash.slice(1);
  return validPages.has(hash) ? hash : 'home';
};

function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash);
  const [activeHeroTab, setActiveHeroTab] = useState('studios');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [claimStatus, setClaimStatus] = useState('idle'); // idle, claiming, claimed
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive calendar state on Production page
  const [selectedCalDate, setSelectedCalDate] = useState(6);
  const [calBookings, setCalBookings] = useState({
    3: { name: "Bandra Podcast Room", price: "₹1,200/day" },
    5: { name: "Cozy Lounge Set", price: "₹1,800/day" },
    6: { name: "GreenBox Studio", price: "₹2,498/day" },
    10: { name: "Chroma Set Alpha", price: "₹1,500/day" },
    12: { name: "Vibe Green Screen", price: "₹1,500/day" },
    13: { name: "Podcast Pro Room", price: "₹1,200/day" }
  });

  // Interactive search category pill on Production page
  const [activeMarketCategory, setActiveMarketCategory] = useState('studios');

  // Booking page sub-tab state
  const [activeBookingTab, setActiveBookingTab] = useState('studios'); // studios, equipment, crew, unified, trust, rewards

  // Blog page sub-tab state
  const [activeBlogTab, setActiveBlogTab] = useState('filmmaker'); // filmmaker, studio, gear, crew, marketplace, trust_guide, rewards_guide, success, author, search_res, newsletter, dashboard, mobile_exp, platform_stats, popular_topics, level_up

  // FAQ Accordion & Help Search states
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [helpSearchQuery, setHelpSearchQuery] = useState('');

  // Unified Search checkout basket state (Page 2d)
  const [checkoutBasket, setCheckoutBasket] = useState({
    studio: true,
    equipment: true,
    crew: false
  });

  // Interactive Reward Calculator States (Page 3g)
  const [calcStudioSpend, setCalcStudioSpend] = useState('25000');
  const [calcEquipSpend, setCalcEquipSpend] = useState('15000');

  // Interactive Author profile tabs (Page 3i)
  const [authorTab, setAuthorTab] = useState('latest'); // latest, popular

  // Interactive Admin Dashboard States (Page 3l)
  const [articlesCount, setArticlesCount] = useState(1247);
  const [draftCount, setDraftCount] = useState(3);
  const [isExported, setIsExported] = useState(false);
  const [dashboardArticles, setDashboardArticles] = useState([
    { id: 1, title: "How Independent Filmmakers Reduced Costs by 40%", category: "Case Study", status: "Published", views: "24.5K", date: "Jun 10" },
    { id: 2, title: "Top 20 Studios in Chennai: Rates & Reviews", category: "City Guide", status: "Published", views: "18.2K", date: "Jun 3" },
    { id: 3, title: "State of Indian Production Industry Report 2026", category: "Research", status: "In Review", views: "—", date: "Jun 18" },
    { id: 4, title: "Super Coins Deep Dive: Maximize Your Rewards", category: "Rewards", status: "Published", views: "14.8K", date: "May 22" },
    { id: 5, title: "Q3 Equipment Rental Market Analysis", category: "Research", status: "Draft", views: "—", date: "Jun 22" }
  ]);

  // How It Works guide page states
  const [activeHowTab, setActiveHowTab] = useState('All');
  const [hostEarnings, setHostEarnings] = useState(120000);

  useEffect(() => {
    const syncPageFromHash = () => {
      setCurrentPage(getPageFromHash());
    };

    syncPageFromHash();
    window.addEventListener('hashchange', syncPageFromHash);

    return () => {
      window.removeEventListener('hashchange', syncPageFromHash);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const nextHash = `#${currentPage}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', nextHash);
    }
  }, [currentPage]);

  // Sample data for interactive search/filtering
  const studios = [
    {
      id: 1,
      title: "GreenBox Studio",
      image: "/public/greenbox.jpg",
      location: "Guindy, Chennai · 1.3 km away",
      specs: "1200 sq.ft • 12+ Lights • 30+ Crew",
      rating: "4.9",
      reviews: "48 reviews",
      price: "₹1,500/hr",
      tag: "Instant Book",
      features: ["Chroma Screen", "Pro Lights", "Soundproofed"]
    },
    {
      id: 2,
      title: "ProVoice Pod Studio",
      image: "/podcast_studio.png",
      location: "Perungudi, Chennai · 0.8 km away",
      specs: "800 sq.ft • 4+ Mics • Full Setup",
      rating: "4.8",
      reviews: "32 reviews",
      price: "₹1,200/hr",
      tag: "Top Rated",
      features: ["Acoustic Panels", "4K Cam", "Sound Engineer"]
    },
    {
      id: 3,
      title: "AK Production Hub",
      image: "/public/AK_production.jpg",
      location: "Adyar, Chennai · 2.1 km away",
      specs: "1500 sq.ft • Natural Light • Prop Set",
      rating: "4.9",
      reviews: "60 reviews",
      price: "₹1,800/hr",
      tag: "Popular",
      features: ["Decor Furniture", "Warm Lights", "Makeup Room"]
    }
  ];

  const equipment = [
    {
      id: 1,
      title: "Sony FX3 Cinema Camera",
      image: "/public/sony_fx3.jpg",
      specs: "Full-frame 4K, 120fps, Dual ISO",
      price: "₹5,000/day",
      category: "Cameras",
      tag: "Popular"
    },
    {
      id: 2,
      title: "DJI Ronin 4D 4-Axis Cinema Camera",
      image: "/public/dji_ronin.png",
      specs: "12MP Full-Frame, 4K 120p, Gimbal ready",
      price: "₹25,000/day",
      category: "Cameras",
      tag: "Hot Deal"
    },
    {
      id: 3,
      title: "Canon EOS R5 RF-Lens Kit",
      image: "/public/canon.jpg",
      specs: "8K Video, 45MP Stills, RF 24-70mm lens",
      price: "₹4,000/day",
      category: "Cameras",
      tag: "Pro Choice"
    },
    {
      id: 4,
      title: "RED DIGITAL Cinema",
      image: "/public/Red_digital.jpg",
      specs: "Large Format Cinema Camera, PL Mount",
      price: "₹2,000/day",
      category: "Cameras",
      tag: "Production Standard"
    }
  ];

  const crew = [
    {
      id: 1,
      name: "Rohan Sharma",
      role: "Director of Photography",
      avatar: "RS",
      color: "#7C3AED",
      rating: "4.9",
      shoots: "120+",
      price: "₹15,000/day"
    },
    {
      id: 2,
      name: "Aarav Mehta",
      role: "Fashion Photographer",
      avatar: "AM",
      color: "#3B82F6",
      rating: "4.8",
      shoots: "90+",
      price: "₹12,000/day"
    },
    {
      id: 3,
      name: "Sneha Patel",
      role: "Video Editor & Colorist",
      avatar: "SP",
      color: "#F59E0B",
      rating: "4.9",
      shoots: "150+",
      price: "₹8,000/day"
    },
    {
      id: 4,
      name: "Nikhil Verma",
      role: "Sound Engineer & Designer",
      avatar: "NV",
      color: "#EC4899",
      rating: "4.7",
      shoots: "80+",
      price: "₹10,000/day"
    }
  ];

  const testimonials = [
    {
      id: 1,
      text: "Booking a studio through ZO1 was incredibly easy. The space was exactly as described, and the host was super cooperative. Highly recommended for creators!",
      name: "Kabir Roy",
      role: "Independent Filmmaker",
      avatar: "KR"
    },
    {
      id: 2,
      text: "We rented the Sony FX6 kit and hired a sound designer for a commercial shoot. The equipment was in pristine condition and the crew member was extremely professional.",
      name: "Ananya Sen",
      role: "Ad Producer",
      avatar: "AS"
    },
    {
      id: 3,
      text: "ZO1 has simplified my production workflow. I can find green screen setups, high-quality audio recording gear, and skilled editors all in one place.",
      name: "Riya Kapoor",
      role: "YouTube Content Creator",
      avatar: "RK"
    }
  ];

  const handleClaimCoins = () => {
    setClaimStatus('claiming');
    setTimeout(() => {
      setClaimStatus('claimed');
    }, 1500);
  };

  const handleDashboardExport = () => {
    setIsExported(true);
    setTimeout(() => {
      setIsExported(false);
    }, 2000);
  };

  const handleDashboardAddArticle = () => {
    setArticlesCount(prev => prev + 1);
    setDraftCount(prev => prev + 1);
    const newArt = {
      id: Date.now(),
      title: "New Creative Shoot Strategy " + (draftCount - 2),
      category: "Guide",
      status: "Draft",
      views: "—",
      date: "Jun 28"
    };
    setDashboardArticles([newArt, ...dashboardArticles]);
  };

  const filteredStudios = studios.filter(studio =>
    studio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    studio.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Booking page sub-renderers

  // 2a Studios Marketplace view
  const renderBookingStudios = () => {
    return (
      <div className="booking-sub-content fade-in">
        {/* HERO */}
        <div className="booking-hero-block">
          <span className="booking-hero-badge bg-orange">STUDIO MARKETPLACE</span>
          <h1 className="booking-hero-title">
            Find the Perfect Studio.<br />
            <span className="text-gradient">Book It in Minutes.</span>
          </h1>
          <p className="booking-hero-desc">
            Browse hundreds of verified production spaces with live availability, transparent pricing and instant booking — no calls required.
          </p>
          <div className="booking-hero-actions">
            <button className="btn-primary-orange">Book Studio</button>
            <button className="btn-secondary-glass">Watch Demo</button>
          </div>
        </div>

        {/* HERO MOCKUP GRAPHIC */}
        <div className="booking-graphic-wrap">
          <div className="booking-mockup-window glass">
            <div className="window-header">
              <div className="window-dot red"></div>
              <div className="window-dot yellow"></div>
              <div className="window-dot green"></div>
              <div className="window-search-bar">
                <span>zuntra.com/channels</span>
              </div>
              <span className="cal-availability-live"><span className="cal-live-pulse-dot"></span> Live</span>
            </div>
            <div className="booking-mockup-layout">
              {/* Map view mockup */}
              <div className="mockup-sub-card glass">
                <h4 className="card-title">STUDIOS MAP VIEW</h4>
                <div className="map-view-canvas">
                  <div className="map-node node-1"><span>₹1,500/hr</span> Bandra</div>
                  <div className="map-node node-2"><span>₹1,200/hr</span> Andheri</div>
                  <div className="map-node node-3"><span>₹1,800/hr</span> Goregaon</div>
                </div>
              </div>
              {/* Live calendar mockup */}
              <div className="mockup-sub-card glass">
                <h4 className="card-title">LIVE AVAILABILITY — JUNE</h4>
                <div className="cal-availability-grid">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((d) => (
                    <span key={d} className={`cal-avail-day ${[3, 5, 6, 10, 12, 13, 17, 19].includes(d) ? 'has-booking' : ''} ${d === 6 ? 'selected' : ''}`}>
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              {/* Booking confirmation mockup */}
              <div className="mockup-sub-card glass">
                <h4 className="card-title">BOOKING CONFIRMED</h4>
                <div className="mockup-receipt-details">
                  <h5>GreenBox Studio</h5>
                  <p>Guindy • 600 sq.ft</p>
                  <div className="receipt-meta-row">
                    <span>Date</span>
                    <strong>June 6, 2026</strong>
                  </div>
                  <div className="receipt-meta-row">
                    <span>Rate</span>
                    <strong>₹2,499/day</strong>
                  </div>
                  <div className="receipt-meta-row total">
                    <span>Paid</span>
                    <strong>₹2,499</strong>
                  </div>
                  <div className="reward-tag-box">
                    <span>✓ 100 SuperCoins earned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COMPARATIVE SECTION */}
        <div className="booking-features-comparative">
          <div className="comparative-header">
            <span className="section-badge bg-orange">THE PROBLEM</span>
            <h2>Production Teams Waste<br /><span className="text-gradient-orange">Hours Finding Studios</span></h2>
            <p>The old way costs you time, money and sanity. ZO1 fixes all of it.</p>
          </div>
          <div className="comparative-grid">
            <div className="compare-column old-way glass">
              <h3>✗ THE OLD WAY</h3>
              <ul>
                <li><span>✗</span> Endless phone calls to check availability</li>
                <li><span>✗</span> Hidden pricing, revealed only after negotiation</li>
                <li><span>✗</span> 24-48 hour waits for booking confirmation</li>
                <li><span>✗</span> Manual search reviews and unverified studios</li>
                <li><span>✗</span> Pay upfront with no dispute protection</li>
              </ul>
            </div>
            <div className="compare-column new-way glass">
              <h3>✓ WITH ZO1</h3>
              <ul>
                <li><span>✓</span> Live availability across 500+ studios instantly</li>
                <li><span>✓</span> Transparent pricing, zero hidden fees</li>
                <li><span>✓</span> Instant booking confirmation in under 4 minutes</li>
                <li><span>✓</span> Every space verified by the ZO1 trust team</li>
                <li><span>✓</span> Escrow payments with full dispute protection</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4 STEPS PROCESS */}
        <div className="booking-steps-section">
          <div className="steps-header">
            <span className="section-badge bg-orange">HOW IT WORKS</span>
            {/* <h2>Book a Studio in <span className="text-gradient-orange">4 Simple Steps</span></h2> */}
            <p>From discovery to confirmed booking — faster than ordering food delivery.</p>
          </div>
          <div className="booking-steps-grid-4">
            <div className="step-card-alt">
              <div className="feat-icon-box orange">📍</div>
              <h4>Search Location</h4>
              <p>Filter by location, size, capacity, price and specs.</p>
            </div>
            <div className="step-card-alt">
              <div className="feat-icon-box orange">🎬</div>
              <h4>Select Studio</h4>
              <p>View photos, amenities, reviews, transparent pricing.</p>
            </div>
            <div className="step-card-alt">
              <div className="feat-icon-box orange">📅</div>
              <h4>Choose Time</h4>
              <p>Pick your slot and see live availability.</p>
            </div>
            <div className="step-card-alt">
              <div className="feat-icon-box orange">🎉</div>
              <h4>Confirm Booking</h4>
              <p>Pay securely and receive instant confirmation.</p>
            </div>
          </div>
        </div>

        {/* 6 FEATURES GRID */}
        <div className="booking-features-list-section">
          <div className="steps-header">
            <span className="section-badge bg-orange">FEATURES</span>
            <h2>Everything You Need.<br /><span className="text-gradient-orange">Nothing You Don't.</span></h2>
          </div>
          <div className="booking-6-grid">
            <div className="booking-feat-card glass">
              <div className="feat-icon-box orange">🔍</div>
              <h4>Smart Discovery</h4>
              <p>AI-powered search finds studios matching your exact requirements — size, lighting rigs, green screen and more.</p>
            </div>
            <div className="booking-feat-card glass">
              <div className="feat-icon-box orange">📋</div>
              <h4>Studio Profiles</h4>
              <p>Rich listings with full equipment specs, amenities list, floor plans and genuine client reviews.</p>
              <div className="prod-badge-row">
                <span className="feat-pill">Studio Space</span>
                <span className="feat-pill">Gear Included</span>
                <span className="feat-pill verified">✓ Verified</span>
              </div>
            </div>
            <div className="booking-feat-card glass">
              <div className="feat-icon-box orange">📅</div>
              <h4>Live Availability</h4>
              <p>Real-time calendar synced to the minute. Say goodbye to 'let me check and get back to you' delays.</p>
            </div>
            <div className="booking-feat-card glass">
              <div className="feat-icon-box orange">💳</div>
              <h4>Secure Payments</h4>
              <p>Escrow-protected payments released only on booking completion. 20% deposit, balance on shoot day.</p>
              <span className="feat-badge-tag">Premium Escrow</span>
            </div>
            <div className="booking-feat-card glass">
              <div className="feat-icon-box orange">⚡</div>
              <h4>Instant Confirmation</h4>
              <p>Receive booking confirmation the moment payment clears — no manual approval required.</p>
              <span className="feat-badge-tag green">✓ Vetted Booking</span>
            </div>
            <div className="booking-feat-card glass">
              <div className="feat-icon-box orange">⭐</div>
              <h4>Verified Reviews</h4>
              <p>Only confirmed bookers can leave reviews. No anonymous feedback — every rating is earned and real.</p>
            </div>
          </div>
        </div>

        {/* STATS BAR */}
        <div className="booking-stats-row glass">
          <div className="stat-unit">
            <h3 style={{ color: 'orange' }}>500+</h3>
            <p>Verified studios across cities</p>
          </div>
          <div className="stat-unit">
            <h3 style={{ color: 'green' }}>15,000+</h3>
            <p>Bookings completed</p>
          </div>
          <div className="stat-unit">
            <h3 style={{ color: 'purple' }}>4.9★</h3>
            <p>Average platform rating</p>
          </div>
        </div>

        {/* BOTTOM BANNER */}
        <div className="booking-bottom-banner-cta glass orange">
          <div className="banner-glow-orange"></div>
          <span className="section-badge bg-orange">START PRODUCING</span>
          <h2>Ready To Find Your Next Studio?</h2>
          <p>Book verified production spaces across Chennai and 12 cities — starting today.</p>
          <div className="banner-cta-actions">
            <button className="btn-primary-orange">Explore Studios</button>
            <button className="btn-secondary-glass">See All Cities</button>
          </div>
        </div>
      </div>
    );
  };

  // 2b Equipment Rental view
  const renderBookingEquipment = () => {
    return (
      <div className="booking-sub-content fade-in">
        {/* HERO */}
        <div className="booking-hero-block">
          <span className="booking-hero-badge bg-blue">EQUIPMENT RENTAL</span>
          <h1 className="booking-hero-title">
            Cinema Grade Equipment.<br />
            <span className="text-gradient-blue">Delivered When You Need It.</span>
          </h1>
          <p className="booking-hero-desc">
            2,400+ units — cameras, lenses, lighting, drones and audio gear. Cleaned, checked and delivered to your location.
          </p>
          <div className="booking-hero-actions">
            <button className="btn-primary-blue">Browse Equipment</button>
            <button className="btn-secondary-glass">View Categories</button>
          </div>
        </div>

        {/* HERO GRAPHIC - ROW OF GEAR CHIPS */}
        <div className="booking-graphic-wrap">
          <div className="equipment-mockup-row">
            <div className="eq-rental-row-chip glass">
              <span className="eq-icon">🎥</span>
              <div className="eq-details">
                <h4>RED Cinema</h4>
                <p>₹12,499/day • 4.9★</p>
              </div>
              <span className="eq-status-badge available">Available</span>
            </div>
            <div className="eq-rental-row-chip glass">
              <span className="eq-icon">📷</span>
              <div className="eq-details">
                <h4>Sony FX3</h4>
                <p>₹1,499/day • 4.8★</p>
              </div>
              <span className="eq-status-badge available">Available</span>
            </div>
            <div className="eq-rental-row-chip glass">
              <span className="eq-icon">🚁</span>
              <div className="eq-details">
                <h4>DJI Ronin 4D</h4>
                <p>₹1,999/day • 4.9★</p>
              </div>
              <span className="eq-status-badge limited">2 left</span>
            </div>
            <div className="eq-rental-row-chip glass">
              <span className="eq-icon">💡</span>
              <div className="eq-details">
                <h4>ARRI SkyPanel</h4>
                <p>₹1,299/day • 4.8★</p>
              </div>
              <span className="eq-status-badge available">Available</span>
            </div>
            <div className="eq-rental-row-chip glass">
              <span className="eq-icon">🎤</span>
              <div className="eq-details">
                <h4>Zoom F8n</h4>
                <p>₹799/day • 4.8★</p>
              </div>
              <span className="eq-status-badge available">Available</span>
            </div>
          </div>
        </div>

        {/* CATALOGUE SECTION */}
        <div className="booking-catalogue-section">
          <div className="comparative-header">
            <span className="section-badge bg-blue">EQUIPMENT CATALOGUE</span>
            <h2>2,400+ Units. <span className="text-gradient-blue">Every Category.</span></h2>
            <p>All gear inspected, cleaned and ready to ship.</p>
          </div>

          <div className="booking-catalog-grid">
            <div className="catalog-card-item glass">
              <div className="catalog-card-header-row">
                <h4>RED Digital Cinema</h4>
                <span className="cat-type-badge cinema">Cinema</span>
              </div>
              <p className="catalog-desc">8K Monstro - Full Frame - ND Filter Pack - Case included.</p>
              <div className="catalog-pill-row">
                <span className="spec-tag">8K Raw</span>
                <span className="spec-tag">High Frame Rate</span>
                <span className="spec-tag">Low Noise</span>
              </div>
              <div className="catalog-footer">
                <div>
                  <span className="catalog-price">₹12,499</span>
                  <span className="catalog-price-sub">/day</span>
                  <p className="catalog-rentals-count">★ 4.9 • 312 rentals</p>
                </div>
                <button className="btn-primary-blue-sm">Book Now</button>
              </div>
            </div>

            <div className="catalog-card-item glass">
              <div className="catalog-card-header-row">
                <h4>Sony FX3</h4>
                <span className="cat-type-badge popular">Popular</span>
              </div>
              <p className="catalog-desc">Full Frame - 4K100fps - S-Log3 - Compact Cinema Body.</p>
              <div className="catalog-pill-row">
                <span className="spec-tag">4K120</span>
                <span className="spec-tag">Compact</span>
                <span className="spec-tag">Low Light King</span>
              </div>
              <div className="catalog-footer">
                <div>
                  <span className="catalog-price">₹1,499</span>
                  <span className="catalog-price-sub">/day</span>
                  <p className="catalog-rentals-count">★ 4.8 • 487 rentals</p>
                </div>
                <button className="btn-primary-blue-sm">Book Now</button>
              </div>
            </div>

            <div className="catalog-card-item glass">
              <div className="catalog-card-header-row">
                <h4>DJI Ronin 4D</h4>
                <span className="cat-type-badge premium">Premium</span>
              </div>
              <p className="catalog-desc">8K - Integrated Gimbal System - LiDAR Focus - Full Frame.</p>
              <div className="catalog-pill-row">
                <span className="spec-tag">8K Raw</span>
                <span className="spec-tag">Gimbal Built-in</span>
              </div>
              <div className="catalog-footer">
                <div>
                  <span className="catalog-price">₹1,899</span>
                  <span className="catalog-price-sub">/day</span>
                  <p className="catalog-rentals-count">★ 4.9 • 211 rentals</p>
                </div>
                <button className="btn-primary-blue-sm">Book Now</button>
              </div>
            </div>

            <div className="catalog-card-item glass">
              <div className="catalog-card-header-row">
                <h4>ARRI SkyPanel S60</h4>
                <span className="cat-type-badge pro">Pro</span>
              </div>
              <p className="catalog-desc">LED Panel - Bi-Colour - DMX Control - Soft Light King.</p>
              <div className="catalog-pill-row">
                <span className="spec-tag">Soft Light</span>
                <span className="spec-tag">DMX Ready</span>
              </div>
              <div className="catalog-footer">
                <div>
                  <span className="catalog-price">₹1,299</span>
                  <span className="catalog-price-sub">/day</span>
                  <p className="catalog-rentals-count">★ 4.7 • 189 rentals</p>
                </div>
                <button className="btn-primary-blue-sm">Book Now</button>
              </div>
            </div>
          </div>
        </div>

        {/* QUALITY GUARANTEED */}
        <div className="booking-qc-section">
          <div className="steps-header">
            <span className="section-badge bg-blue">QUALITY GUARANTEED</span>
            <h2>Every Item Checked <span className="text-gradient-green">Before Delivery</span></h2>
            <p>Our QC team puts every unit through a 5-step process before it leaves the warehouse.</p>
          </div>

          <div className="booking-qc-grid">
            <div className="qc-card glass">
              <div className="qc-icon">🔍</div>
              <h4>Visual Inspection</h4>
              <p>Body, lens mount and ports checked for damage.</p>
            </div>
            <div className="qc-card glass">
              <div className="qc-icon">🧹</div>
              <h4>Deep Clean</h4>
              <p>Sensor, lens elements and body sanitized.</p>
            </div>
            <div className="qc-card glass">
              <div className="qc-icon">⚙️</div>
              <h4>Sensor Test</h4>
              <p>Dead pixel check, exposure calibration test shots.</p>
            </div>
            <div className="qc-card glass">
              <div className="qc-icon">🔋</div>
              <h4>Battery Check</h4>
              <p>All batteries fully charged and capacity verified.</p>
            </div>
            <div className="qc-card glass">
              <div className="qc-icon">📦</div>
              <h4>Secure Pack</h4>
              <p>Foam-padded case, all accessories included.</p>
            </div>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="booking-stats-row glass">
          <div className="stat-unit">
            <h3>2,400+</h3>
            <p>Equipment units available</p>
          </div>
          <div className="stat-unit">
            <h3>0.3%</h3>
            <p>Defect rate after QC</p>
          </div>
          <div className="stat-unit">
            <h3>3 hrs</h3>
            <p>Same-day delivery window</p>
          </div>
        </div>

        {/* BOTTOM BANNER */}
        <div className="booking-bottom-banner-cta glass blue">
          <div className="banner-glow-blue"></div>
          <span className="section-badge bg-blue">START RENTING</span>
          <h2>Browse 2,400+ Equipment Units</h2>
          <p>All cleaned, tested and ready for delivery across Chennai.</p>
          <div className="banner-cta-actions">
            <button className="btn-primary-blue">Browse Equipment</button>
            <button className="btn-secondary-glass">Book a Package</button>
          </div>
        </div>
      </div>
    );
  };

  // 2c Crew Marketplace view
  const renderBookingCrew = () => {
    return (
      <div className="booking-sub-content fade-in">
        {/* HERO */}
        <div className="booking-hero-block">
          <span className="booking-hero-badge bg-purple">CREW MARKETPLACE</span>
          <h1 className="booking-hero-title">
            Build Your Dream<br />
            <span className="text-gradient-purple">Production Team.</span>
          </h1>
          <p className="booking-hero-desc">
            Hire verified cinematographers, editors, photographers and production specialists — from first enquiry to confirmed hire in minutes.
          </p>
          <div className="booking-hero-actions">
            <button className="btn-primary-purple">Browse Crew</button>
            <button className="btn-secondary-glass">See Portfolios</button>
          </div>
        </div>

        {/* HERO GRAPHIC - ROW OF FLOATING USER PROFILES */}
        <div className="booking-graphic-wrap">
          <div className="crew-mockup-row">
            <div className="crew-profile-float-card glass">
              <div className="avatar bg-avatar-purple">AM</div>
              <div className="info">
                <h4>Arjun Mehta</h4>
                <p>Cinematographer • DOP</p>
                <div className="details-row">
                  <span>★ 4.9 • 240 projects</span>
                  <strong>₹8,999/day</strong>
                </div>
              </div>
              <button className="btn-hire-sm">Hire</button>
            </div>
            <div className="crew-profile-float-card glass">
              <div className="avatar bg-avatar-blue">PS</div>
              <div className="info">
                <h4>Priya Sundaram</h4>
                <p>Photographer • Brand</p>
                <div className="details-row">
                  <span>★ 4.8 • 180 projects</span>
                  <strong>₹5,999/day</strong>
                </div>
              </div>
              <button className="btn-hire-sm">Hire</button>
            </div>
            <div className="crew-profile-float-card glass">
              <div className="avatar bg-avatar-orange">NK</div>
              <div className="info">
                <h4>Neha Krishnan</h4>
                <p>Video Editor • Motion</p>
                <div className="details-row">
                  <span>★ 4.8 • 110 projects</span>
                  <strong>₹3,999/day</strong>
                </div>
              </div>
              <button className="btn-hire-sm">Hire</button>
            </div>
          </div>
        </div>

        {/* COMPARATIVE / PROCESS SECTION */}
        <div className="booking-steps-section">
          <div className="steps-header">
            <span className="section-badge bg-purple">AI MATCHING</span>
            <h2>How Crew <span className="text-gradient-purple">Matching Works</span></h2>
            <p>Tell us about your project. Our system finds the right people in seconds.</p>
          </div>
          <div className="booking-steps-grid-4">
            <div className="step-card-alt bg-purple-tint">
              <div className="step-badge-num bg-purple">1</div>
              <h4>Tell Us Your Project</h4>
              <p>Share shoot type, dates, location, budget and crew needs.</p>
            </div>
            <div className="step-card-alt bg-purple-tint">
              <div className="step-badge-num bg-purple">2</div>
              <h4>AI Matches Crew</h4>
              <p>Algorithm matches verified professionals who fit your brief.</p>
            </div>
            <div className="step-card-alt bg-purple-tint">
              <div className="step-badge-num bg-purple">3</div>
              <h4>Review Portfolios</h4>
              <p>Browse reels, past work, reviews and day rates.</p>
            </div>
            <div className="step-card-alt bg-purple-tint">
              <div className="step-badge-num bg-purple">4</div>
              <h4>Hire Instantly</h4>
              <p>Secure the hire with escrow payment — done in minutes.</p>
            </div>
          </div>
        </div>

        {/* CREW DIRECTORY */}
        <div className="booking-catalogue-section">
          <div className="comparative-header">
            <span className="section-badge bg-purple">TOP CREW</span>
            <h2>1,200+ <span className="text-gradient-purple">Verified Professionals</span></h2>
          </div>

          <div className="booking-crew-grid-directory">
            <div className="directory-crew-card glass">
              <div className="d-avatar bg-avatar-purple">AM</div>
              <div className="d-info">
                <div className="d-name-row">
                  <h4>Arjun Mehta</h4>
                  <span className="verified-badge">✓ Verified</span>
                </div>
                <p className="d-role">Cinematographer • DOP</p>
                <p className="d-meta">7 yrs exp • ★ 4.9 (87 reviews) • 240 projects</p>
                <div className="d-tags">
                  <span>Netflix</span>
                  <span>Commercial</span>
                  <span>4K</span>
                  <span>RAW</span>
                </div>
              </div>
              <div className="d-action">
                <div className="d-price">
                  <h3>₹8,999</h3>
                  <span className="price-sub">/day</span>
                </div>
                <button className="btn-primary-purple-sm">Hire Now</button>
              </div>
            </div>

            <div className="directory-crew-card glass">
              <div className="d-avatar bg-avatar-blue">PS</div>
              <div className="d-info">
                <div className="d-name-row">
                  <h4>Priya Sundaram</h4>
                  <span className="verified-badge">✓ Verified</span>
                </div>
                <p className="d-role">Photographer • Product & Fashion</p>
                <p className="d-meta">5 yrs exp • ★ 4.8 (64 reviews) • 180 projects</p>
                <div className="d-tags">
                  <span>Brand</span>
                  <span>Editorial</span>
                  <span>Lifestyle</span>
                </div>
              </div>
              <div className="d-action">
                <div className="d-price">
                  <h3>₹5,999</h3>
                  <span className="price-sub">/day</span>
                </div>
                <button className="btn-primary-purple-sm">Hire Now</button>
              </div>
            </div>

            <div className="directory-crew-card glass">
              <div className="d-avatar bg-avatar-cyan">VR</div>
              <div className="d-info">
                <div className="d-name-row">
                  <h4>Vikram Rajan</h4>
                  <span className="verified-badge">✓ Verified</span>
                </div>
                <p className="d-role">Audio Engineer • Sound Designer</p>
                <p className="d-meta">6 yrs exp • ★ 4.7 (52 reviews) • 82 projects</p>
                <div className="d-tags">
                  <span>Post-Production</span>
                  <span>On-Set</span>
                </div>
              </div>
              <div className="d-action">
                <div className="d-price">
                  <h3>₹4,499</h3>
                  <span className="price-sub">/day</span>
                </div>
                <button className="btn-primary-purple-sm">Hire Now</button>
              </div>
            </div>

            <div className="directory-crew-card glass">
              <div className="d-avatar bg-avatar-orange">NK</div>
              <div className="d-info">
                <div className="d-name-row">
                  <h4>Neha Krishnan</h4>
                  <span className="verified-badge">✓ Verified</span>
                </div>
                <p className="d-role">Video Editor • Motion Designer</p>
                <p className="d-meta">4 yrs exp • ★ 4.8 (70 reviews) • 110 projects</p>
                <div className="d-tags">
                  <span>Motion Graphics</span>
                  <span>Color Grade</span>
                </div>
              </div>
              <div className="d-action">
                <div className="d-price">
                  <h3>₹3,999</h3>
                  <span className="price-sub">/day</span>
                </div>
                <button className="btn-primary-purple-sm">Hire Now</button>
              </div>
            </div>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="booking-stats-row glass">
          <div className="stat-unit">
            <h3>1,200+</h3>
            <p>Verified Professionals</p>
          </div>
          <div className="stat-unit">
            <h3>78%</h3>
            <p>Clients rehire same crew</p>
          </div>
          <div className="stat-unit">
            <h3>8 min</h3>
            <p>Average response time</p>
          </div>
          <div className="stat-unit">
            <h3>24</h3>
            <p>Specialisations listed</p>
          </div>
        </div>

        {/* BOTTOM BANNER */}
        <div className="booking-bottom-banner-cta glass purple">
          <div className="banner-glow-purple"></div>
          <span className="section-badge bg-purple">FIND YOUR TEAM</span>
          <h2>Hire Professional Crew <span className="arrow-text">→</span></h2>
          <p>1,200+ verified professionals ready to join your next production.</p>
          <div className="banner-cta-actions">
            <button className="btn-primary-purple">Browse All Crew</button>
            <button className="btn-secondary-glass">Post a Project Brief</button>
          </div>
        </div>
      </div>
    );
  };

  // 2d Unified Search view
  const renderBookingUnified = () => {
    return (
      <div className="booking-sub-content fade-in">
        {/* HERO */}
        <div className="booking-hero-block">
          <span className="booking-hero-badge bg-pink">UNIFIED MARKETPLACE</span>
          <h1 className="booking-hero-title">
            One Search.<br />
            <span className="text-gradient-pink">Everything Production.</span>
          </h1>
          <p className="booking-hero-desc">
            Studios, equipment, crew — all in one unified search. No switching tabs, no negotiations, no delays. Just find and book.
          </p>
          <div className="booking-hero-actions">
            <button className="btn-primary-pink">Explore Marketplace</button>
            <button className="btn-secondary-glass">See How It Works</button>
          </div>
        </div>

        {/* HERO GRAPHIC - UNIFIED SEARCH MODULE */}
        <div className="booking-graphic-wrap">
          <div className="unified-search-mockup-widget glass">
            <div className="search-bar-row">
              <Search size={16} className="text-muted" />
              <input type="text" value="Need a studio, RED camera and cinematographer for June 18" readOnly />
              <button className="btn-search-pink">Search ZO1</button>
            </div>

            <div className="search-results-boxes">
              <div className="res-box glass">
                <span className="res-type studios">STUDIOS • 3 MATCHES</span>
                <h4>Greenbox Studio</h4>
                <p>Guindy • ₹2,499/day</p>
                <span className="res-avail">Available June 18</span>
              </div>
              <div className="res-box glass">
                <span className="res-type equipment">EQUIPMENT • 5 MATCHES</span>
                <h4>RED Digital Cinema</h4>
                <p>8K • ₹12,499/day</p>
                <span className="res-avail">Available June 18</span>
              </div>
              <div className="res-box glass">
                <span className="res-type crew">CREW • 4 MATCHES</span>
                <h4>Arjun Mehta - DOP</h4>
                <p>7 yrs exp • ₹8,999/day</p>
                <span className="res-avail">Available June 18</span>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES GRID */}
        <div className="booking-features-list-section">
          <div className="comparative-header">
            <span className="section-badge bg-pink">PLATFORM FEATURES</span>
            <h2>Everything You Need<br /><span className="text-gradient-pink">In One Place</span></h2>
          </div>

          <div className="booking-6-grid">
            <div className="booking-feat-card glass">
              <div className="feat-icon-box pink">🔍</div>
              <h4>Unified Search</h4>
              <p>One search returns studios, equipment and crew simultaneously — cross-category availability at a glance.</p>
            </div>
            <div className="booking-feat-card glass">
              <div className="feat-icon-box pink">🎛️</div>
              <h4>Smart Filters</h4>
              <p>Filter by budget, location, rating, availability date, category and specialization across all three marketplaces at once.</p>
            </div>
            <div className="booking-feat-card glass">
              <div className="feat-icon-box pink">⚡</div>
              <h4>Real-Time Availability</h4>
              <p>Every listing synced in real-time. No phone calls to confirm — what you see is what's actually available.</p>
            </div>
            <div className="booking-feat-card glass">
              <div className="feat-icon-box pink">🛒</div>
              <h4>Instant Booking</h4>
              <p>Add studio, camera and crew to one cart. Pay once, ZO1 coordinates all confirmations and schedules for you.</p>
            </div>
            <div className="booking-feat-card glass">
              <div className="feat-icon-box pink">📦</div>
              <h4>Project Bundles</h4>
              <p>Book a complete production package — studio, gear, crew — in a single checkout with guaranteed availability alignment.</p>
            </div>
            <div className="booking-feat-card glass">
              <div className="feat-icon-box pink">💾</div>
              <h4>Saved Workspaces</h4>
              <p>Save favorite studios, gear kits and crew combinations. Rebook recurring projects in one click.</p>
            </div>
          </div>
        </div>

        {/* BUNDLE CHECKOUT BOX */}
        <div className="unified-bundle-checkout-section container">
          <div className="bundle-checkout-card glass">
            <div className="bundle-header-info">
              <div className="clapper-icon">🎬</div>
              <div>
                <h3>Book Your Entire Production in One Checkout</h3>
                <p>Select a studio, choose your camera package and add crew — all in a single basket. ZO1 checks availability across all three so there's zero scheduling conflict.</p>
              </div>
            </div>

            <div className="bundle-items-row">
              <div className="bundle-item-checkbox glass">
                <div className="item-text">
                  <strong>GreenBox Studio</strong>
                  <span>Guindy • ₹2,499/day</span>
                </div>
                <span className="badge-added">✓ Added</span>
              </div>
              <div className="bundle-item-checkbox glass">
                <div className="item-text">
                  <strong>RED Cinema</strong>
                  <span>8K • ₹12,499/day</span>
                </div>
                <span className="badge-added">✓ Added</span>
              </div>
              <div className="bundle-item-checkbox glass" onClick={() => setCheckoutBasket({ ...checkoutBasket, crew: !checkoutBasket.crew })}>
                <div className="item-text">
                  <strong>DOP - Arjun M.</strong>
                  <span>7 yrs exp • ₹8,999/day</span>
                </div>
                {checkoutBasket.crew ? (
                  <span className="badge-added">✓ Added</span>
                ) : (
                  <span className="badge-add-btn">+ Add</span>
                )}
              </div>
              <button className="btn-checkout-bundle">Checkout Bundle <ChevronRight size={14} /></button>
            </div>

            <div className="bundle-notes-footer">
              <span>✓ Availability confirmed across all items</span>
              <span>✓ Escrow protected payment</span>
              <span>✓ Confirmed in under 4 minutes</span>
            </div>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="booking-stats-row glass">
          <div className="stat-unit">
            <h3>4,100+</h3>
            <p>Total Listings</p>
          </div>
          <div className="stat-unit">
            <h3>4 min</h3>
            <p>Avg. Search to Book</p>
          </div>
          <div className="stat-unit">
            <h3>100%</h3>
            <p>Live Availability</p>
          </div>
          <div className="stat-unit">
            <h3>18K+</h3>
            <p>Monthly Active Users</p>
          </div>
        </div>

        {/* BOTTOM BANNER */}
        <div className="booking-bottom-banner-cta glass pink">
          <div className="banner-glow-pink"></div>
          <span className="section-badge bg-pink">GET STARTED</span>
          <h2>Explore the Marketplace <span className="arrow-text">→</span></h2>
          <p>One platform. Studios, equipment and crew — all instantly bookable.</p>
          <div className="banner-cta-actions">
            <button className="btn-primary-pink">Open Marketplace</button>
            <button className="btn-secondary-glass">Book a Bundle</button>
          </div>
        </div>
      </div>
    );
  };

  // 2e Trust & Safety view
  const renderBookingTrust = () => {
    return (
      <div className="booking-sub-content fade-in">
        {/* HERO */}
        <div className="booking-hero-block">
          <span className="booking-hero-badge bg-green">TRUST & SAFETY</span>
          <h1 className="booking-hero-title">
            Every Vendor. Every Listing.<br />
            <span className="text-gradient-green">Fully Verified.</span>
          </h1>
          <p className="booking-hero-desc">
            We verify every studio, every equipment vendor and every crew member before they go live. Your production is protected from the first search to final delivery.
          </p>
          <div className="booking-hero-actions">
            <button className="btn-primary-green">Book With Confidence</button>
            <button className="btn-secondary-glass">Learn About Trust</button>
          </div>
        </div>

        {/* HERO GRAPHIC - SHIELD & PILLS */}
        <div className="booking-graphic-wrap">
          <div className="trust-shield-mockup-container">
            <div className="shield-logo-glow-wrapper">
              <div className="shield-logo-badge">🛡️</div>
            </div>
            <div className="verification-status-pills">
              <span className="v-pill"><CheckCircle size={12} className="v-check" /> Studios Verified</span>
              <span className="v-pill"><CheckCircle size={12} className="v-check" /> Equipment Verified</span>
              <span className="v-pill"><CheckCircle size={12} className="v-check" /> Crew Verified</span>
            </div>
          </div>
        </div>

        {/* HOW WE VERIFY */}
        <div className="booking-qc-section">
          <div className="steps-header">
            <span className="section-badge bg-green">OUR PROCESS</span>
            <h2>How We <span className="text-gradient-green">Verify Everyone</span></h2>
            <p>A five-step verification process that no listing skips.</p>
          </div>

          <div className="booking-qc-grid">
            <div className="qc-card glass">
              <div className="qc-icon green">🪪</div>
              <h4>Identity Check</h4>
              <p>Government ID verified for all vendors and crew.</p>
            </div>
            <div className="qc-card glass">
              <div className="qc-icon green">📁</div>
              <h4>Portfolio Review</h4>
              <p>Past work reviewed by ZO1's editorial team.</p>
            </div>
            <div className="qc-card glass">
              <div className="qc-icon green">🔍</div>
              <h4>Background Check</h4>
              <p>Third-party background verification completed.</p>
            </div>
            <div className="qc-card glass">
              <div className="qc-icon green">⭐</div>
              <h4>Quality Assessment</h4>
              <p>Standards check — listings below 4.0 suspended.</p>
            </div>
            <div className="qc-card glass">
              <div className="qc-icon green">✓</div>
              <h4>Approval & Badge</h4>
              <p>Verified badge activated — visible to all searchers.</p>
            </div>
          </div>
        </div>

        {/* BUILT FOR SAFETY */}
        <div className="booking-features-list-section">
          <div className="comparative-header">
            <span className="section-badge bg-green">SECURITY FEATURES</span>
            <h2>Built for Safety<br /><span className="text-gradient-green">At Every Step</span></h2>
          </div>

          <div className="booking-safety-4-grid">
            <div className="safety-card-item glass">
              <div className="safety-header-icon-row">
                <span className="safety-icon-indicator">🔒</span>
                <h4>Secure Payments</h4>
              </div>
              <p>All transactions processed with bank-grade encryption. No payment details stored on ZO1 servers.</p>
            </div>
            <div className="safety-card-item glass">
              <div className="safety-header-icon-row">
                <span className="safety-icon-indicator">🏛️</span>
                <h4>Escrow Protection</h4>
              </div>
              <p>Funds held in escrow and released only when the booking is confirmed complete. Full refund on cancellation.</p>
            </div>
            <div className="safety-card-item glass">
              <div className="safety-header-icon-row">
                <span className="safety-icon-indicator">🤖</span>
                <h4>Fraud Detection</h4>
              </div>
              <p>AI-powered fraud monitoring flags suspicious activity before any transaction is processed.</p>
            </div>
            <div className="safety-card-item glass">
              <div className="safety-header-icon-row">
                <span className="safety-icon-indicator">⚖️</span>
                <h4>Dispute Resolution</h4>
              </div>
              <p>Raise any dispute within 48 hours of a booking. Our team reviews, mediates and resolves in under 24 hours.</p>
            </div>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="booking-stats-row glass">
          <div className="stat-unit">
            <h3>98.7%</h3>
            <p>Approval Accuracy</p>
          </div>
          <div className="stat-unit">
            <h3>15,000+</h3>
            <p>Successful Bookings</p>
          </div>
          <div className="stat-unit">
            <h3>4.9★</h3>
            <p>Trust Rating</p>
          </div>
          <div className="stat-unit">
            <h3>0.01%</h3>
            <p>Fraud Rate</p>
          </div>
        </div>

        {/* BOTTOM BANNER */}
        <div className="booking-bottom-banner-cta glass green">
          <div className="banner-glow-green"></div>
          <span className="section-badge bg-green">SAFE BOOKING</span>
          <h2>Book With Confidence <span className="arrow-text">→</span></h2>
          <p>Every listing verified. Every payment protected. Every booking guaranteed.</p>
          <div className="banner-cta-actions">
            <button className="btn-primary-green">Explore Verified Listings</button>
            <button className="btn-secondary-glass">Learn About Trust</button>
          </div>
        </div>
      </div>
    );
  };

  // 2f Rewards Program View
  const renderBookingRewards = () => {
    return (
      <div className="booking-sub-content fade-in">
        {/* HERO */}
        <div className="booking-hero-block">
          <span className="booking-hero-badge bg-gold">REWARDS PROGRAM</span>
          <h1 className="booking-hero-title">
            Every Booking<br />
            <span className="text-gradient-gold">Earns Rewards.</span>
          </h1>
          <p className="booking-hero-desc">
            Spend on ZO1, earn Super Coins. Redeem them for free bookings, equipment upgrades, priority support and exclusive creator perks.
          </p>
          <div className="booking-hero-actions">
            <button className="btn-primary-gold">Start Earning</button>
            <button className="btn-secondary-glass">View Rewards</button>
          </div>
        </div>

        {/* HERO GRAPHIC - COIN LOGO & CHECKPOINTS */}
        <div className="booking-graphic-wrap">
          <div className="rewards-coin-mockup-container">
            <div className="large-supercoin-ring">
              <div className="large-coin-face">
                <img src="/supercoin.png" alt="SuperCoin" className="rewards-coin-img" />
              </div>
            </div>
            <div className="large-coin-value-label">
              <h2>100</h2>
              <h4>Super Coins</h4>
              <p>= ₹25 in booking credit</p>
            </div>
            <div className="rewards-pills-row">
              <span className="rewards-value-chip">🎥 Book Studio → +80 coins</span>
              <span className="rewards-value-chip">📷 Rent Gear → +60 coins</span>
              <span className="rewards-value-chip">👥 Hire Crew → +45 coins</span>
            </div>
          </div>
        </div>

        {/* HOW YOU EARN SUPER COINS */}
        <div className="booking-features-list-section">
          <div className="steps-header">
            <span className="section-badge bg-gold">EARN & GROW</span>
            <h2>How You Earn <span className="text-gradient-gold">Super Coins</span></h2>
            <p>Every rupee spent on ZO1 converts to Super Coins — automatically, instantly.</p>
          </div>
          <div className="booking-qc-grid">
            <div className="qc-card glass">
              <div className="qc-icon gold">🎬</div>
              <h4>Book a Studio</h4>
              <p>1 coin per ₹20 spent on studio bookings</p>
              <span className="earn-highlight-coins">+40–160</span>
              <span className="earn-highlight-sub">coins per booking</span>
            </div>
            <div className="qc-card glass">
              <div className="qc-icon gold">📷</div>
              <h4>Rent Equipment</h4>
              <p>1 coin per ₹30 spent on equipment rentals</p>
              <span className="earn-highlight-coins">+25–120</span>
              <span className="earn-highlight-sub">coins per rental</span>
            </div>
            <div className="qc-card glass">
              <div className="qc-icon gold">👥</div>
              <h4>Hire Crew</h4>
              <p>1 coin per ₹40 spent on crew hires</p>
              <span className="earn-highlight-coins">+20–80</span>
              <span className="earn-highlight-sub">coins per hire</span>
            </div>
            <div className="qc-card glass">
              <div className="qc-icon gold">🎁</div>
              <h4>Leave a Review</h4>
              <p>Verified review after a completed booking</p>
              <span className="earn-highlight-coins">+25</span>
              <span className="earn-highlight-sub">bonus coins per review</span>
            </div>
          </div>
        </div>

        {/* CREATOR TIERS */}
        <div className="booking-qc-section">
          <div className="steps-header">
            <span className="section-badge bg-gold">CREATOR TIERS</span>
            <h2>Level Up. <span className="text-gradient-gold">Unlock More.</span></h2>
            <p>The more you create, the more you earn. Four tiers with escalating benefits.</p>
          </div>
          <div className="booking-steps-grid-4">
            <div className="step-card-alt level-card-item glass">
              <div className="level-badge-icon bronze">🏅</div>
              <h4>Starter</h4>
              <p className="level-range">0 - 999 coins</p>
              <ul className="level-bullet-checks">
                <li>✓ 1x coin multiplier</li>
                <li>✓ Basic marketplace access</li>
                <li>✓ Standard support</li>
              </ul>
            </div>
            <div className="step-card-alt level-card-item glass gold-highlight">
              <div className="level-badge-icon gold">🥇</div>
              <h4>Gold</h4>
              <p className="level-range">1,000 - 4,999 coins</p>
              <ul className="level-bullet-checks">
                <li>✓ 2x coin multiplier</li>
                <li>✓ Priority booking access</li>
                <li>✓ Priority support queue</li>
              </ul>
              <span className="level-tag-indicator">Next Power</span>
            </div>
            <div className="step-card-alt level-card-item glass">
              <div className="level-badge-icon platinum">💎</div>
              <h4>Platinum</h4>
              <p className="level-range">5,000 - 14,999 coins</p>
              <ul className="level-bullet-checks">
                <li>✓ 3x coin multiplier</li>
                <li>✓ Early access to new studios</li>
                <li>✓ Dedicated account manager</li>
              </ul>
            </div>
            <div className="step-card-alt level-card-item glass">
              <div className="level-badge-icon pro">🚀</div>
              <h4>Creator Pro</h4>
              <p className="level-range">15,000+ coins</p>
              <ul className="level-bullet-checks">
                <li>✓ 5x coin multiplier</li>
                <li>✓ VIP perks & exclusive</li>
                <li>✓ ZO1 brand partnership</li>
              </ul>
            </div>
          </div>
        </div>

        {/* REDEMPTION OPTIONS */}
        <div className="booking-features-list-section">
          <div className="steps-header">
            <span className="section-badge bg-gold">REDEEM</span>
            <h2>What You Can <span className="text-gradient-gold">Redeem For</span></h2>
          </div>
          <div className="redemptions-container glass">
            <div className="redemptions-grid-list">
              <div className="redeem-row-item">
                <span>🎬 Free Equipment Rental</span>
                <span className="redeem-coin-tag">500 coins</span>
              </div>
              <div className="redeem-row-item">
                <span>💸 ₹100 Discount Coupon</span>
                <span className="redeem-coin-tag">400 coins</span>
              </div>
              <div className="redeem-row-item">
                <span>⭐ Priority Support Access</span>
                <span className="redeem-coin-tag">800 coins</span>
              </div>
              <div className="redeem-row-item">
                <span>🎟️ Free Studio Day Pass</span>
                <span className="redeem-coin-tag">1,080 coins</span>
              </div>
              <div className="redeem-row-item">
                <span>🎁 Exclusive Creator Bundle</span>
                <span className="redeem-coin-tag">2,000 coins</span>
              </div>
              <div className="redeem-row-item">
                <span>⚙️ Camera Kit Upgrade</span>
                <span className="redeem-coin-tag">800 coins</span>
              </div>
            </div>

            <div className="redeem-balance-status-bar">
              <div className="balance-info-left">
                <div className="mini-coin-badge-balance">🪙</div>
                <div className="balance-info-numbers">
                  <span className="balance-title">YOUR BALANCE</span>
                  <h2>680</h2>
                  <p>Super Coins ≈ ₹170 value</p>
                </div>
              </div>
              <div className="progress-track-right">
                <div className="progress-track-header">
                  <span>Progress to Gold Tier</span>
                  <strong>680 / 1,000</strong>
                </div>
                <div className="progress-track-bar">
                  <div className="progress-track-fill" style={{ width: '68%' }}></div>
                </div>
                <p className="progress-track-subtext">320 more coins unlocks 2x multiplier on all bookings</p>
              </div>
            </div>

            <div className="redemption-actions-row">
              <button className="btn-primary-gold">Redeem Coins</button>
              <button className="btn-secondary-glass">View History</button>
            </div>
          </div>
        </div>

        {/* BOTTOM BANNER */}
        <div className="booking-bottom-banner-cta glass gold">
          <div className="banner-glow-gold"></div>
          <span className="section-badge bg-gold">START EARNING</span>
          <h2>Start Earning Super Coins <span className="arrow-text">→</span></h2>
          <p>Every booking earns. Every coin counts. Join 15,000+ creators already rewarded.</p>
          <div className="banner-cta-actions">
            <button className="btn-primary-gold">Book & Earn Now</button>
            <button className="btn-secondary-glass">See Rewards Catalogue</button>
          </div>
        </div>
      </div>
    );
  };


  // ==========================================
  // BLOG PAGES SUB-RENDERERS (3a to 3o)
  // ==========================================

  // 3a Filmmaker Hub View
  const renderBlogFilmmaker = () => {
    return (
      <div className="blog-sub-content fade-in">
        {/* HERO */}
        <div className="blog-hero-section">
          <div className="blog-hero-left">
            <span className="blog-badge-tag bg-orange">🎥 ZO1 BLOG PLATFORM</span>
            <h1 className="blog-main-title">
              The Knowledge Hub for Modern <span className="text-gradient-purple-pink">Filmmakers</span>
            </h1>
            <p className="blog-main-subtitle">
              Learn how creators discover studios, rent equipment, hire crew, earn rewards, and manage productions with ZO1.
            </p>
            <div className="blog-search-widget">
              <input type="text" placeholder="Search articles, guides, stories..." />
              <button className="btn-search-red">Search</button>
            </div>
            <div className="blog-tag-pills">
              <span className="blog-pill active">All</span>
              <span className="blog-pill">Studio Booking</span>
              <span className="blog-pill">Equipment Rental</span>
              <span className="blog-pill">Crew Hiring</span>
              <span className="blog-pill">Marketplace</span>
              <span className="blog-pill">Trust & Safety</span>
              <span className="blog-pill">Super Coins</span>
              <span className="blog-pill">Case Studies</span>
              <span className="blog-pill">Industry News</span>
            </div>
          </div>

          {/* FEATURED STORY CARD */}
          <div className="blog-featured-card glass">
            <div className="featured-card-gradient-top">
              <span className="featured-story-tag">🔥 Featured Story</span>
            </div>
            <div className="featured-card-body">
              <span className="cat-badge-small orange">Case Study</span>
              <h2>How Independent Filmmakers Reduced Production Costs by 40% Using ZO1</h2>
              <div className="author-row">
                <div className="author-avatar bg-purple">ZE</div>
                <div>
                  <h4>ZO1 Editorial Team</h4>
                  <p>Jun 10, 2026 • 6 min read</p>
                </div>
              </div>
              <div className="featured-footer-meta">
                <span>👁 24.5K views</span>
                <span>💾 1.2K saves</span>
                <span>⏱ 8 min</span>
              </div>
            </div>
          </div>
        </div>

        {/* TRENDING CATEGORIES */}
        <div className="blog-categories-showcase-section">
          <h3>Trending Categories</h3>
          <p className="sub-heading-text">Explore what matters to your production</p>
          <div className="blog-categories-grid-6">
            <div className="blog-category-box glass">
              <span className="box-icon">🎬</span>
              <h4>Studio Booking</h4>
              <p>156 articles</p>
            </div>
            <div className="blog-category-box glass">
              <span className="box-icon">📷</span>
              <h4>Equipment Rental</h4>
              <p>203 articles</p>
            </div>
            <div className="blog-category-box glass">
              <span className="box-icon">👥</span>
              <h4>Crew Hiring</h4>
              <p>110 articles</p>
            </div>
            <div className="blog-category-box glass">
              <span className="box-icon">⚡</span>
              <h4>Marketplace</h4>
              <p>89 articles</p>
            </div>
            <div className="blog-category-box glass">
              <span className="box-icon">🔒</span>
              <h4>Trust & Safety</h4>
              <p>72 articles</p>
            </div>
            <div className="blog-category-box glass">
              <span className="box-icon">🪙</span>
              <h4>Super Coins</h4>
              <p>54 articles</p>
            </div>
          </div>
        </div>

        {/* TRENDING NOW (4 Columns Backdrop) */}
        <div className="blog-trending-now-section">
          <div className="section-title-row">
            <h3>🔥 Trending Now</h3>
            <a href="#trending-all" className="link-view-all">View all →</a>
          </div>
          <p className="sub-heading-text">Most-read this week</p>

          <div className="trending-grid-4">
            <div className="trending-card orange-tint-bg glass">
              <span className="trending-number-label">01</span>
              <span className="card-cat-pill">Studio Booking</span>
              <h4>Top 20 Studios in Chennai Every Filmmaker Should Know</h4>
              <p className="trending-meta">18.3K views • 8 min read</p>
            </div>
            <div className="trending-card violet-tint-bg glass">
              <span className="trending-number-label">02</span>
              <span className="card-cat-pill">Equipment</span>
              <h4>The Ultimate Camera Equipment Checklist for 2026</h4>
              <p className="trending-meta">12.7K views • 5 min read</p>
            </div>
            <div className="trending-card blue-tint-bg glass">
              <span className="trending-number-label">03</span>
              <span className="card-cat-pill">Crew Hiring</span>
              <h4>Building the Perfect Production Crew: A Complete Guide</h4>
              <p className="trending-meta">9.4K views • 7 min read</p>
            </div>
            <div className="trending-card green-tint-bg glass">
              <span className="trending-number-label">04</span>
              <span className="card-cat-pill">Super Coins</span>
              <h4>How to Maximize Rewards on Every ZO1 Booking</h4>
              <p className="trending-meta">7.2K views • 4 min read</p>
            </div>
          </div>
        </div>

        {/* LATEST ARTICLES (6 grid) */}
        <div className="blog-latest-articles-section">
          <div className="section-title-row">
            <h3>Latest Articles</h3>
            <a href="#latest-all" className="link-view-all">See all →</a>
          </div>
          <p className="sub-heading-text">Fresh insights for creators and production professionals</p>

          <div className="latest-articles-grid-6">
            <div className="latest-article-card glass">
              <div className="card-img-placeholder orange-bg gradient">
                <span className="card-cat-badge">Filmmaking</span>
              </div>
              <div className="card-content">
                <h4>5 Cinematography Techniques That Will Elevate Your Next Short Film</h4>
                <p>Master the visual language of cinema with techniques used by top directors across India.</p>
                <div className="card-footer-author">
                  <div className="author-details">
                    <div className="author-initial-circle bg-avatar-purple">AK</div>
                    <div>
                      <h5>Arjun Kumar</h5>
                      <p>Jun 12 • 8 min</p>
                    </div>
                  </div>
                  <span className="views-count">8.2K views</span>
                </div>
              </div>
            </div>

            <div className="latest-article-card glass">
              <div className="card-img-placeholder purple-bg">
                <span className="card-cat-badge">Production Tips</span>
              </div>
              <div className="card-content">
                <h4>How to Negotiate Equipment Rental Rates Like a Pro</h4>
                <p>Insider tips from production veterans on getting the best deals without compromising quality.</p>
                <div className="card-footer-author">
                  <div className="author-details">
                    <div className="author-initial-circle bg-avatar-blue">SR</div>
                    <div>
                      <h5>Shreya Rajan</h5>
                      <p>Jun 11 • 5 min</p>
                    </div>
                  </div>
                  <span className="views-count">5.8K views</span>
                </div>
              </div>
            </div>

            <div className="latest-article-card glass">
              <div className="card-img-placeholder blue-bg">
                <span className="card-cat-badge">Studio Booking</span>
              </div>
              <div className="card-content">
                <h4>Virtual Production Studios: The New Frontier for Indie Filmmakers</h4>
                <p>How LED volumes are democratizing cinematic quality for independent creators.</p>
                <div className="card-footer-author">
                  <div className="author-details">
                    <div className="author-initial-circle bg-avatar-cyan">MP</div>
                    <div>
                      <h5>Maya Pillai</h5>
                      <p>Jun 9 • 7 min</p>
                    </div>
                  </div>
                  <span className="views-count">8.9K views</span>
                </div>
              </div>
            </div>

            <div className="latest-article-card glass">
              <div className="card-img-placeholder yellow-bg">
                <span className="card-cat-badge">Creator Economy</span>
              </div>
              <div className="card-content">
                <h4>Monetizing Your Production Skills: From Freelancer to Studio Owner</h4>
                <p>The blueprint creators are using to turn their craft into thriving production businesses.</p>
                <div className="card-footer-author">
                  <div className="author-details">
                    <div className="author-initial-circle bg-avatar-orange">VS</div>
                    <div>
                      <h5>Vikram Singh</h5>
                      <p>Jun 8 • 9 min</p>
                    </div>
                  </div>
                  <span className="views-count">11.4K views</span>
                </div>
              </div>
            </div>

            <div className="latest-article-card glass">
              <div className="card-img-placeholder green-bg">
                <span className="card-cat-badge">Case Study</span>
              </div>
              <div className="card-content">
                <h4>Inside a ₹50L Short Film: Budget Breakdown & What We Learned</h4>
                <p>A transparent look at how one indie director managed an entire shoot on ZO1.</p>
                <div className="card-footer-author">
                  <div className="author-details">
                    <div className="author-initial-circle bg-avatar-purple">PM</div>
                    <div>
                      <h5>Priya Menon</h5>
                      <p>Jun 7 • 10 min</p>
                    </div>
                  </div>
                  <span className="views-count">15.2K views</span>
                </div>
              </div>
            </div>

            <div className="latest-article-card glass">
              <div className="card-img-placeholder pink-bg">
                <span className="card-cat-badge">Crew Hiring</span>
              </div>
              <div className="card-content">
                <h4>Finding & Retaining Top-Tier Crew in a Competitive Market</h4>
                <p>How to attract, vet, and build long-term relationships with the best production talent.</p>
                <div className="card-footer-author">
                  <div className="author-details">
                    <div className="author-initial-circle bg-avatar-blue">RK</div>
                    <div>
                      <h5>Rahul Khanna</h5>
                      <p>Jun 5 • 6 min</p>
                    </div>
                  </div>
                  <span className="views-count">4.8K views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 3b Crew Guide View
  const renderBlogCrew = () => {
    return (
      <div className="blog-sub-content fade-in">
        {/* HERO */}
        <div className="blog-hero-section-no-img">
          <span className="blog-badge-tag bg-purple">👥 CREW HIRING</span>
          <h1 className="blog-main-title">
            Find Verified <span className="text-gradient-purple">Production Professionals</span>
          </h1>
          <p className="blog-main-subtitle">
            Browse 1,200+ vetted crew members — cinematographers, editors, sound engineers, and production assistants ready for your next project.
          </p>
          <div className="blog-hub-stats-row">
            <span><strong>1,200+</strong> Verified Crew</span>
            <span><strong>18</strong> Specialisations</span>
            <span><strong>4.9★</strong> Avg Rating</span>
            <span><strong>48hr</strong> Response Time</span>
          </div>
        </div>

        {/* SHOWCASE ROW */}
        <div className="blog-showcase-row-container">
          <span className="showcase-section-badge">CREW PROFILES SHOWCASE</span>
          <div className="crew-profile-circles-row">
            <div className="crew-showcase-circle-card glass">
              <div className="circle-avatar bg-avatar-purple">AK</div>
              <h4>Arjun Krishnan</h4>
              <p>Cinematographer • Chennai</p>
              <span className="prod-count-pill">12 productions</span>
            </div>
            <div className="crew-showcase-circle-card glass">
              <div className="circle-avatar bg-avatar-blue">SP</div>
              <h4>Sunita Pillai</h4>
              <p>Photographer • Mumbai</p>
              <span className="prod-count-pill">8 productions</span>
            </div>
            <div className="crew-showcase-circle-card glass">
              <div className="circle-avatar bg-avatar-cyan">RV</div>
              <h4>Ravi Varma</h4>
              <p>Video Editor • Bangalore</p>
              <span className="prod-count-pill">21 productions</span>
            </div>
            <div className="crew-showcase-circle-card glass">
              <div className="circle-avatar bg-avatar-orange">NS</div>
              <h4>Nisha Sharma</h4>
              <p>Audio Engineer • Hyderabad</p>
              <span className="prod-count-pill">15 productions</span>
            </div>
          </div>
        </div>

        {/* FILTER TAGS */}
        <div className="blog-category-filter-bar">
          <span className="filter-tab active">All Crew</span>
          <span className="filter-tab">Cinematographers</span>
          <span className="filter-tab">Photographers</span>
          <span className="filter-tab">Editors</span>
          <span className="filter-tab">Audio Engineers</span>
          <span className="filter-tab">Directors</span>
          <span className="filter-tab">PAs</span>
        </div>

        {/* MAIN 2-COLUMN GRID */}
        <div className="blog-two-column-layout">
          {/* LEFT SIDEBAR FILTERS */}
          <div className="blog-sidebar-filters">
            <div className="filter-block glass">
              <h4>SPECIALIZATION</h4>
              <div className="checklist-group">
                <label className="checkbox-item active">
                  <span>Cinematographers</span>
                  <span className="count-badge">210</span>
                </label>
                <label className="checkbox-item">
                  <span>Photographers</span>
                  <span className="count-badge">180</span>
                </label>
                <label className="checkbox-item">
                  <span>Editors</span>
                  <span className="count-badge">160</span>
                </label>
                <label className="checkbox-item">
                  <span>Audio Engineers</span>
                  <span className="count-badge">140</span>
                </label>
                <label className="checkbox-item">
                  <span>Directors</span>
                  <span className="count-badge">90</span>
                </label>
                <label className="checkbox-item">
                  <span>Production Assistants</span>
                  <span className="count-badge">220</span>
                </label>
              </div>
            </div>

            <div className="filter-block glass">
              <h4>TAGS</h4>
              <div className="sidebar-tag-cloud">
                <span className="side-tag active">Verified</span>
                <span className="side-tag active">Chennai</span>
                <span className="side-tag">Freelance</span>
                <span className="side-tag">Experienced</span>
                <span className="side-tag">Budget</span>
                <span className="side-tag">Feature Film</span>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT COLUMN */}
          <div className="blog-articles-grid-area">
            <div className="latest-articles-grid-2col">
              <div className="latest-article-card glass">
                <div className="card-img-placeholder purple-bg">
                  <span className="card-cat-badge">Team Building</span>
                </div>
                <div className="card-content">
                  <h4>How to Build a Production Team from Scratch Using ZO1</h4>
                  <p>A step-by-step guide to assembling the right crew for your budget and production type.</p>
                  <div className="card-footer-author">
                    <div className="author-details">
                      <div className="author-initial-circle bg-avatar-cyan">MP</div>
                      <div>
                        <h5>Maya Pillai</h5>
                        <p>Jun 10</p>
                      </div>
                    </div>
                    <span className="views-count">11.2K views</span>
                  </div>
                </div>
              </div>

              <div className="latest-article-card glass">
                <div className="card-img-placeholder blue-bg">
                  <span className="card-cat-badge">Audio</span>
                </div>
                <div className="card-content">
                  <h4>Audio Team Essentials: When to Hire a Sound Recordist vs DIY</h4>
                  <p>The audio decisions that separate professional-sounding films from the ones that don't sell.</p>
                  <div className="card-footer-author">
                    <div className="author-details">
                      <div className="author-initial-circle bg-avatar-purple">RK</div>
                      <div>
                        <h5>Rahul Khanna</h5>
                        <p>Jun 2</p>
                      </div>
                    </div>
                    <span className="views-count">8.1K views</span>
                  </div>
                </div>
              </div>

              <div className="latest-article-card glass">
                <div className="card-img-placeholder orange-bg">
                  <span className="card-cat-badge">Hiring Guide</span>
                </div>
                <div className="card-content">
                  <h4>Hiring Cinematographers: What to Look for Beyond the Reel</h4>
                  <p>Portfolio alone doesn't tell the whole story. Here's how to find someone who'll fit your vision.</p>
                  <div className="card-footer-author">
                    <div className="author-details">
                      <div className="author-initial-circle bg-avatar-purple">AK</div>
                      <div>
                        <h5>Arjun Kumar</h5>
                        <p>Jun 8</p>
                      </div>
                    </div>
                    <span className="views-count">8.4K views</span>
                  </div>
                </div>
              </div>

              <div className="latest-article-card glass">
                <div className="card-img-placeholder green-bg">
                  <span className="card-cat-badge">Management</span>
                </div>
                <div className="card-content">
                  <h4>Freelancer Management on Set: Contracts, Communication & Payments</h4>
                  <p>How to work with freelance crew professionally so they keep coming back to your projects.</p>
                  <div className="card-footer-author">
                    <div className="author-details">
                      <div className="author-initial-circle bg-avatar-orange">VS</div>
                      <div>
                        <h5>Vikram Singh</h5>
                        <p>May 30</p>
                      </div>
                    </div>
                    <span className="views-count">7.2K views</span>
                  </div>
                </div>
              </div>

              <div className="latest-article-card glass">
                <div className="card-img-placeholder yellow-bg">
                  <span className="card-cat-badge">Choosing Editor</span>
                </div>
                <div className="card-content">
                  <h4>Choosing Your Editor: Workflow, Style & Communication Tips</h4>
                  <p>The questions to ask before you hand over your footage — and red flags that cost you weeks.</p>
                  <div className="card-footer-author">
                    <div className="author-details">
                      <div className="author-initial-circle bg-avatar-blue">SR</div>
                      <div>
                        <h5>Shreya Rajan</h5>
                        <p>Jun 5</p>
                      </div>
                    </div>
                    <span className="views-count">8.9K views</span>
                  </div>
                </div>
              </div>

              <div className="latest-article-card glass">
                <div className="card-img-placeholder pink-bg">
                  <span className="card-cat-badge">Checklist</span>
                </div>
                <div className="card-content">
                  <h4>Production Crew Checklist: Every Role for a Short Film Shoot</h4>
                  <p>The definitive list of who you need, what they do, and what to budget for each role.</p>
                  <div className="card-footer-author">
                    <div className="author-details">
                      <div className="author-initial-circle bg-avatar-purple">PM</div>
                      <div>
                        <h5>Priya Menon</h5>
                        <p>May 28</p>
                      </div>
                    </div>
                    <span className="views-count">9.8K views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM REDIRECT */}
        <div className="blog-footer-btn-row">
          <button className="btn-primary-purple">Browse Crew <ArrowRight size={16} /></button>
        </div>
      </div>
    );
  };

  // 3c Gear Guide View
  const renderBlogGear = () => {
    return (
      <div className="blog-sub-content fade-in">
        {/* HERO */}
        <div className="blog-hero-section-no-img">
          <span className="blog-badge-tag bg-blue">🎥 EQUIPMENT RENTAL</span>
          <h1 className="blog-main-title">
            Access Professional Gear <span className="text-gradient-blue">Without Buying It</span>
          </h1>
          <p className="blog-main-subtitle">
            From cinema cameras to lighting rigs, drones to audio setups — rent professional equipment on-demand, delivered to you.
          </p>
          <div className="blog-hub-stats-row">
            <span><strong>2,400+</strong> Equipment Units</span>
            <span><strong>Same-Day</strong> Delivery Available</span>
            <span><strong>100%</strong> Verified Vendors</span>
            <span><strong>Package</strong> Booking Supported</span>
          </div>
        </div>

        {/* SHOWCASE WIDGETS ROW */}
        <div className="blog-showcase-row-container">
          <div className="gear-showcase-grid-4">
            <div className="gear-showcase-card glass">
              <span className="gear-card-icon">🎥</span>
              <h4>Cinema Cameras</h4>
              <p>ARRI, RED, Sony FX9 — rent the same cameras used on feature films.</p>
            </div>
            <div className="gear-showcase-card glass">
              <span className="gear-card-icon">💡</span>
              <h4>Lighting Kits</h4>
              <p>Professional LED panels, tungsten kits, and modifiers for any scene.</p>
            </div>
            <div className="gear-showcase-card glass">
              <span className="gear-card-icon">🚁</span>
              <h4>Drones & Aerial</h4>
              <p>DJI Inspire, Mavic Pro — certified pilots available as a package add-on.</p>
            </div>
            <div className="gear-showcase-card glass">
              <span className="gear-card-icon">🎤</span>
              <h4>Audio Equipment</h4>
              <p>Rode, Sennheiser, Zoom — studio and field audio at production quality.</p>
            </div>
          </div>
        </div>

        {/* FILTER TAGS */}
        <div className="blog-category-filter-bar">
          <span className="filter-tab active">All Equipment</span>
          <span className="filter-tab">Cinema Cameras</span>
          <span className="filter-tab">Lighting</span>
          <span className="filter-tab">Drones</span>
          <span className="filter-tab">Audio</span>
          <span className="filter-tab">Grip & Rigs</span>
          <span className="filter-tab">Packages</span>
        </div>

        {/* MAIN 2-COLUMN LAYOUT */}
        <div className="blog-two-column-layout">
          {/* LEFT SIDEBAR FILTERS */}
          <div className="blog-sidebar-filters">
            <div className="filter-block glass">
              <h4>GEAR TYPE</h4>
              <div className="checklist-group">
                <label className="checkbox-item active">
                  <span>Cinema Cameras</span>
                  <span className="count-badge">42</span>
                </label>
                <label className="checkbox-item">
                  <span>DSLR / Mirrorless</span>
                  <span className="count-badge">38</span>
                </label>
                <label className="checkbox-item">
                  <span>Lighting Kits</span>
                  <span className="count-badge">34</span>
                </label>
                <label className="checkbox-item">
                  <span>Drones & Aerial</span>
                  <span className="count-badge">21</span>
                </label>
                <label className="checkbox-item">
                  <span>Audio Equipment</span>
                  <span className="count-badge">29</span>
                </label>
                <label className="checkbox-item">
                  <span>Grip & Rigging</span>
                  <span className="count-badge">18</span>
                </label>
              </div>
            </div>

            <div className="filter-block glass">
              <h4>POPULAR TAGS</h4>
              <div className="sidebar-tag-cloud">
                <span className="side-tag active">ARRI</span>
                <span className="side-tag active">RED</span>
                <span className="side-tag">4K</span>
                <span className="side-tag active">LED Lights</span>
                <span className="side-tag">Drone</span>
                <span className="side-tag">Budget</span>
                <span className="side-tag active">Package</span>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT COLUMN */}
          <div className="blog-articles-grid-area">
            <div className="latest-articles-grid-2col">
              <div className="latest-article-card glass">
                <div className="card-img-placeholder orange-bg">
                  <span className="card-cat-badge">Cameras</span>
                </div>
                <div className="card-content">
                  <h4>Best Cinema Cameras to Rent in 2026: ARRI, RED & Sony Compared</h4>
                  <p>A deep dive into the top cinema cameras on ZO1, with real rental pricing and production recommendations.</p>
                  <div className="card-footer-author">
                    <div className="author-details">
                      <div className="author-initial-circle bg-avatar-cyan">MP</div>
                      <div>
                        <h5>Maya Pillai</h5>
                        <p>Jun 10</p>
                      </div>
                    </div>
                    <span className="views-count">14.2K views</span>
                  </div>
                </div>
              </div>

              <div className="latest-article-card glass">
                <div className="card-img-placeholder blue-bg">
                  <span className="card-cat-badge">Audio</span>
                </div>
                <div className="card-content">
                  <h4>Audio Equipment Guide for Film: What to Rent for Every Shoot Type</h4>
                  <p>Boom mics, wireless lavs, field recorders — the audio kit you actually need for each production type.</p>
                  <div className="card-footer-author">
                    <div className="author-details">
                      <div className="author-initial-circle bg-avatar-purple">AK</div>
                      <div>
                        <h5>Arjun Kumar</h5>
                        <p>Jun 3</p>
                      </div>
                    </div>
                    <span className="views-count">7.3K views</span>
                  </div>
                </div>
              </div>

              <div className="latest-article-card glass">
                <div className="card-img-placeholder purple-bg">
                  <span className="card-cat-badge">Lighting</span>
                </div>
                <div className="card-content">
                  <h4>The Complete Lighting Setup Guide: 3-Point to Complex Multi-Light Rigs</h4>
                  <p>Which lights to rent and how to use them — from basic interviews to dramatic cinematic setups.</p>
                  <div className="card-footer-author">
                    <div className="author-details">
                      <div className="author-initial-circle bg-avatar-blue">SR</div>
                      <div>
                        <h5>Shreya Rajan</h5>
                        <p>Jun 8</p>
                      </div>
                    </div>
                    <span className="views-count">9.6K views</span>
                  </div>
                </div>
              </div>

              <div className="latest-article-card glass">
                <div className="card-img-placeholder green-bg">
                  <span className="card-cat-badge">Strategy</span>
                </div>
                <div className="card-content">
                  <h4>Camera Rental Checklist: 18 Things to Verify Before You Shoot</h4>
                  <p>The pre-shoot checklist that prevents costly surprises when renting high-end gear.</p>
                  <div className="card-footer-author">
                    <div className="author-details">
                      <div className="author-initial-circle bg-avatar-purple">PM</div>
                      <div>
                        <h5>Priya Menon</h5>
                        <p>Jun 1</p>
                      </div>
                    </div>
                    <span className="views-count">5.8K views</span>
                  </div>
                </div>
              </div>

              <div className="latest-article-card glass">
                <div className="card-img-placeholder blue-bg">
                  <span className="card-cat-badge">Aerial</span>
                </div>
                <div className="card-content">
                  <h4>Drone Filming Essentials: Permits, Equipment & Techniques</h4>
                  <p>Everything you need before your first aerial shoot, from picking the right drone to navigating permits.</p>
                  <div className="card-footer-author">
                    <div className="author-details">
                      <div className="author-initial-circle bg-avatar-orange">VS</div>
                      <div>
                        <h5>Vikram Singh</h5>
                        <p>Jun 5</p>
                      </div>
                    </div>
                    <span className="views-count">11.8K views</span>
                  </div>
                </div>
              </div>

              <div className="latest-article-card glass">
                <div className="card-img-placeholder pink-bg">
                  <span className="card-cat-badge">Finance</span>
                </div>
                <div className="card-content">
                  <h4>Renting vs Buying Gear: The Math Every Filmmaker Ignores</h4>
                  <p>When owning makes sense — and when renting is always the smarter call. Run the real numbers.</p>
                  <div className="card-footer-author">
                    <div className="author-details">
                      <div className="author-initial-circle bg-avatar-purple">RK</div>
                      <div>
                        <h5>Rahul Khanna</h5>
                        <p>May 28</p>
                      </div>
                    </div>
                    <span className="views-count">16.4K views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM REDIRECT */}
        <div className="blog-footer-btn-row">
          <button className="btn-primary-blue">Browse Equipment <ArrowRight size={16} /></button>
        </div>
      </div>
    );
  };

  // 3d Marketplace Guide View
  const renderBlogMarketplace = () => {
    return (
      <div className="blog-sub-content fade-in">
        {/* HERO */}
        <div className="blog-hero-section-no-img">
          <span className="blog-badge-tag bg-pink">⚡ MARKETPLACE</span>
          <h1 className="blog-main-title">
            One Search. <span className="text-gradient-pink">Everything Production.</span>
          </h1>
          <p className="blog-main-subtitle">
            Studios, equipment, crew — all in one unified marketplace with smart filters, real-time availability, and instant booking across your entire production.
          </p>
          <div className="blog-hub-stats-row">
            <span><strong>3,200+</strong> Listings</span>
            <span><strong>Smart</strong> Filters</span>
            <span><strong>Real-Time</strong> Availability</span>
            <span><strong>Bundle</strong> Booking</span>
          </div>
        </div>

        {/* BENEFITS CARDS */}
        <div className="blog-showcase-row-container">
          <div className="gear-showcase-grid-4">
            <div className="gear-showcase-card glass">
              <span className="gear-card-icon">🔍</span>
              <h4>Unified Search</h4>
              <p>Search studios, gear, and crew in one place — no jumping between platforms.</p>
            </div>
            <div className="gear-showcase-card glass">
              <span className="gear-card-icon">⚡</span>
              <h4>Smart Filters</h4>
              <p>Filter by date, budget, city, category, and availability simultaneously.</p>
            </div>
            <div className="gear-showcase-card glass">
              <span className="gear-card-icon">📦</span>
              <h4>Project Bundles</h4>
              <p>Bundle studio + equipment + crew into a single booking with one checkout.</p>
            </div>
            <div className="gear-showcase-card glass">
              <span className="gear-card-icon">⚡</span>
              <h4>Instant Booking</h4>
              <p>No waiting for approval. Confirm your production package immediately.</p>
            </div>
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="blog-category-filter-bar">
          <span className="filter-tab active">All Articles</span>
          <span className="filter-tab">Platform Guides</span>
          <span className="filter-tab">Vendor Management</span>
          <span className="filter-tab">Workflow</span>
          <span className="filter-tab">Budget Planning</span>
          <span className="filter-tab">Case Studies</span>
        </div>

        {/* TWO COLUMN GRID */}
        <div className="blog-two-column-layout">
          {/* SIDEBAR */}
          <div className="blog-sidebar-filters">
            <div className="filter-block glass">
              <h4>CATEGORY</h4>
              <div className="checklist-group">
                <label className="checkbox-item active">
                  <span>All Topics</span>
                  <span className="count-badge">89</span>
                </label>
                <label className="checkbox-item">
                  <span>Platform Guides</span>
                  <span className="count-badge">22</span>
                </label>
                <label className="checkbox-item">
                  <span>Vendor Tips</span>
                  <span className="count-badge">18</span>
                </label>
                <label className="checkbox-item">
                  <span>Budget Planning</span>
                  <span className="count-badge">16</span>
                </label>
                <label className="checkbox-item">
                  <span>Workflow Automation</span>
                  <span className="count-badge">14</span>
                </label>
                <label className="checkbox-item">
                  <span>Case Studies</span>
                  <span className="count-badge">19</span>
                </label>
              </div>
            </div>

            <div className="filter-block glass">
              <h4>TAGS</h4>
              <div className="sidebar-tag-cloud">
                <span className="side-tag active">Marketplace</span>
                <span className="side-tag active">Bundles</span>
                <span className="side-tag">Search</span>
                <span className="side-tag">Budget</span>
                <span className="side-tag active">Workflow</span>
                <span className="side-tag">Automation</span>
              </div>
            </div>
          </div>

          {/* MAIN ARTICLES GRID */}
          <div className="blog-articles-grid-area">
            <div className="latest-articles-grid-2col">
              <div className="latest-article-card glass">
                <div className="card-img-placeholder yellow-bg">
                  <span className="card-cat-badge">Platform</span>
                </div>
                <div className="card-content">
                  <h4>Production Marketplace Guide: How to Find Everything You Need on ZO1</h4>
                  <p>From first search to final booking — the complete walkthrough of the ZO1 marketplace experience.</p>
                  <div className="card-footer-author">
                    <div className="author-details">
                      <div className="author-initial-circle bg-avatar-purple">AK</div>
                      <div>
                        <h5>Arjun Kumar</h5>
                        <p>Jun 10</p>
                      </div>
                    </div>
                    <span className="views-count">13.6K views</span>
                  </div>
                </div>
              </div>

              <div className="latest-article-card glass">
                <div className="card-img-placeholder green-bg">
                  <span className="card-cat-badge">Automation</span>
                </div>
                <div className="card-content">
                  <h4>Workflow Automation for Producers: What You Can Set-and-Forget on ZO1</h4>
                  <p>Recurring bookings, automatic reminders, and contract templates that save you hours every week.</p>
                  <div className="card-footer-author">
                    <div className="author-details">
                      <div className="author-initial-circle bg-avatar-blue">SR</div>
                      <div>
                        <h5>Shreya Rajan</h5>
                        <p>Jun 3</p>
                      </div>
                    </div>
                    <span className="views-count">6.2K views</span>
                  </div>
                </div>
              </div>

              <div className="latest-article-card glass">
                <div className="card-img-placeholder blue-bg">
                  <span className="card-cat-badge">Vendors</span>
                </div>
                <div className="card-content">
                  <h4>Managing Multiple Vendors Across a Single Production</h4>
                  <p>How top producers coordinate studios, equipment rentals, and freelance crew without losing track.</p>
                  <div className="card-footer-author">
                    <div className="author-details">
                      <div className="author-initial-circle bg-avatar-cyan">MP</div>
                      <div>
                        <h5>Maya Pillai</h5>
                        <p>Jun 8</p>
                      </div>
                    </div>
                    <span className="views-count">9.1K views</span>
                  </div>
                </div>
              </div>

              <div className="latest-article-card glass">
                <div className="card-img-placeholder orange-bg">
                  <span className="card-cat-badge">Planning</span>
                </div>
                <div className="card-content">
                  <h4>Production Planning on ZO1: Build Your Entire Schedule in One Dashboard</h4>
                  <p>How to use ZO1's marketplace workflow to schedule your production timeline from pre-prod to wrap.</p>
                  <div className="card-footer-author">
                    <div className="author-details">
                      <div className="author-initial-circle bg-avatar-purple">PM</div>
                      <div>
                        <h5>Priya Menon</h5>
                        <p>Jun 1</p>
                      </div>
                    </div>
                    <span className="views-count">8.4K views</span>
                  </div>
                </div>
              </div>

              <div className="latest-article-card glass">
                <div className="card-img-placeholder purple-bg">
                  <span className="card-cat-badge">Feature</span>
                </div>
                <div className="card-content">
                  <h4>Project Bundles Explained: Save Up to 25% on Production Packages</h4>
                  <p>How ZO1's bundle system works — and why it changes the math on production budgeting.</p>
                  <div className="card-footer-author">
                    <div className="author-details">
                      <div className="author-initial-circle bg-avatar-orange">VS</div>
                      <div>
                        <h5>Vikram Singh</h5>
                        <p>Jun 5</p>
                      </div>
                    </div>
                    <span className="views-count">7.8K views</span>
                  </div>
                </div>
              </div>

              <div className="latest-article-card glass">
                <div className="card-img-placeholder pink-bg">
                  <span className="card-cat-badge">Finance</span>
                </div>
                <div className="card-content">
                  <h4>Budget Optimization: How to Spend 30% Less Without Compromising Quality</h4>
                  <p>The five marketplace strategies that pro producers use to make every rupee count.</p>
                  <div className="card-footer-author">
                    <div className="author-details">
                      <div className="author-initial-circle bg-avatar-purple">RK</div>
                      <div>
                        <h5>Rahul Khanna</h5>
                        <p>May 28</p>
                      </div>
                    </div>
                    <span className="views-count">10.1K views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM REDIRECT */}
        <div className="blog-footer-btn-row">
          <button className="btn-primary-pink">Explore Marketplace <ArrowRight size={16} /></button>
        </div>
      </div>
    );
  };

  // 3e Studio Guide View
  const renderBlogStudio = () => {
    return (
      <div className="blog-sub-content fade-in">
        {/* HERO */}
        <div className="blog-hero-section-no-img">
          <span className="blog-badge-tag bg-orange">🎥 STUDIO BOOKING</span>
          <h1 className="blog-main-title">
            Find The Perfect Studio. <span className="text-gradient-orange">Book It In Minutes.</span>
          </h1>
          <p className="blog-main-subtitle">
            Everything you need to know about booking studios — from choosing the right space to maximizing your shoot time and budget.
          </p>
          <div className="blog-hub-stats-row">
            <span><strong>500+</strong> Studios Listed</span>
            <span><strong>12</strong> Cities</span>
            <span><strong>Instant</strong> Confirmation</span>
            <span><strong>24/7</strong> Availability</span>
          </div>
        </div>

        {/* COMPARATIVE SECTION */}
        <div className="blog-showcase-row-container">
          <span className="showcase-section-badge">THE PROBLEM + THE SOLUTION</span>
          <div className="comparative-grid margin-top-sm">
            <div className="compare-column old-way glass">
              <h3>✗ THE OLD WAY</h3>
              <ul>
                <li><span>✗</span> Phone Calls & Back-and-Forth</li>
                <li><span>✗</span> Hidden Pricing & Surprise Fees</li>
                <li><span>✗</span> Manual Paper Contracts</li>
                <li><span>✗</span> Delayed Confirmations</li>
              </ul>
            </div>
            <div className="compare-column new-way glass">
              <h3>✓ WITH ZO1</h3>
              <ul>
                <li><span>✓</span> Live Availability — Book in Real Time</li>
                <li><span>✓</span> Transparent Pricing, No Surprises</li>
                <li><span>✓</span> Digital Contracts, Instant Signing</li>
                <li><span>✓</span> Instant Booking Confirmation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* WORKFLOW */}
        <div className="blog-showcase-row-container">
          <span className="showcase-section-badge">BOOKING WORKFLOW</span>
          <div className="booking-steps-grid-4 margin-top-sm">
            <div className="step-card-alt">
              <div className="step-badge-num">🔍</div>
              <h4>Step 01: Browse Studios</h4>
              <p>Filter by city, capacity & type</p>
            </div>
            <div className="step-card-alt">
              <div className="step-badge-num">📅</div>
              <h4>Step 02: Select Date & Time</h4>
              <p>Real-time availability calendar</p>
            </div>
            <div className="step-card-alt">
              <div className="step-badge-num">🖋️</div>
              <h4>Step 03: Confirm Booking</h4>
              <p>Secure payment & instant contract</p>
            </div>
            <div className="step-card-alt">
              <div className="step-badge-num bg-green">🎥</div>
              <h4>Done ✓: Shoot Day Ready</h4>
              <p>Everything confirmed & waiting</p>
            </div>
          </div>
        </div>

        {/* 4 CIRCLE STATS HIGHLIGHTS */}
        <div className="booking-stats-row glass">
          <div className="stat-unit">
            <h3 style={{ color: '#227aff' }}>500+</h3>
            <p>Verified Studios</p>
          </div>
          <div className="stat-unit">
            <h3 style={{ color: '#34ff22' }}>12</h3>
            <p>Cities Covered</p>
          </div>
          <div className="stat-unit">
            <h3 style={{ color: '#fe0000' }}>Instant</h3>
            <p>Booking Confirmation</p>
          </div>
          <div className="stat-unit">
            <h3 style={{ color: '#00c1fc' }}>24/7</h3>
            <p>Studio Availability</p>
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="blog-category-filter-bar">
          <span className="filter-tab active">All Articles</span>
          <span className="filter-tab">How-To Guides</span>
          <span className="filter-tab">Studio Types</span>
          <span className="filter-tab">Cost Guides</span>
          <span className="filter-tab">City Guides</span>
          <span className="filter-tab">Reviews</span>
        </div>

        {/* TWO COLUMN GRID */}
        <div className="blog-two-column-layout">
          {/* SIDEBAR */}
          <div className="blog-sidebar-filters">
            <div className="filter-block glass">
              <h4>STUDIO TYPE</h4>
              <div className="checklist-group">
                <label className="checkbox-item active">
                  <span>All Studios</span>
                  <span className="count-badge">156</span>
                </label>
                <label className="checkbox-item">
                  <span>Photography Studios</span>
                  <span className="count-badge">42</span>
                </label>
                <label className="checkbox-item">
                  <span>Film & Video Sets</span>
                  <span className="count-badge">38</span>
                </label>
                <label className="checkbox-item">
                  <span>Virtual Production</span>
                  <span className="count-badge">24</span>
                </label>
                <label className="checkbox-item">
                  <span>Green Screen</span>
                  <span className="count-badge">18</span>
                </label>
                <label className="checkbox-item">
                  <span>Podcast Studios</span>
                  <span className="count-badge">16</span>
                </label>
              </div>
            </div>

            <div className="filter-block glass">
              <h4>POPULAR TAGS</h4>
              <div className="sidebar-tag-cloud">
                <span className="side-tag active">Chennai</span>
                <span className="side-tag active">Mumbai</span>
                <span className="side-tag">Budget</span>
                <span className="side-tag active">LED Volume</span>
                <span className="side-tag">Green Screen</span>
                <span className="side-tag">Day Rate</span>
                <span className="side-tag active">Booking Tips</span>
              </div>
            </div>
          </div>

          {/* RIGHT MAIN GRID */}
          <div className="blog-articles-grid-area">
            <div className="latest-articles-grid-2col">
              <div className="latest-article-card glass">
                <div className="card-img-placeholder orange-bg">
                  <span className="card-cat-badge">Guide</span>
                </div>
                <div className="card-content">
                  <h4>How to Choose the Right Studio for Your Production</h4>
                  <p>The definitive checklist for evaluating studios before you sign a booking — from lighting rigs to power capacity.</p>
                  <div className="card-footer-author">
                    <div className="author-details">
                      <div className="author-initial-circle bg-avatar-cyan">MP</div>
                      <div>
                        <h5>Maya Pillai</h5>
                        <p>Jun 10</p>
                      </div>
                    </div>
                    <span className="views-count">12.4K views</span>
                  </div>
                </div>
              </div>

              <div className="latest-article-card glass">
                <div className="card-img-placeholder yellow-bg">
                  <span className="card-cat-badge">City Guide</span>
                </div>
                <div className="card-content">
                  <h4>Top 20 Studios in Chennai: Rates, Reviews & Booking Tips</h4>
                  <p>The definitive guide to Chennai's production studio scene — from budget-friendly setups to full-scale feature film facilities.</p>
                  <div className="card-footer-author">
                    <div className="author-details">
                      <div className="author-initial-circle bg-avatar-orange">VS</div>
                      <div>
                        <h5>Vikram Singh</h5>
                        <p>Jun 3</p>
                      </div>
                    </div>
                    <span className="views-count">18.2K views</span>
                  </div>
                </div>
              </div>

              <div className="latest-article-card glass">
                <div className="card-img-placeholder purple-bg">
                  <span className="card-cat-badge">Checklist</span>
                </div>
                <div className="card-content">
                  <h4>Studio Booking Checklist: 22 Things to Verify Before Your Shoot Day</h4>
                  <p>The list pro filmmakers keep in their back pocket every time they book a new space.</p>
                  <div className="card-footer-author">
                    <div className="author-details">
                      <div className="author-initial-circle bg-avatar-purple">AK</div>
                      <div>
                        <h5>Arjun Kumar</h5>
                        <p>Jun 8</p>
                      </div>
                    </div>
                    <span className="views-count">9.3K views</span>
                  </div>
                </div>
              </div>

              <div className="latest-article-card glass">
                <div className="card-img-placeholder green-bg">
                  <span className="card-cat-badge">Finance</span>
                </div>
                <div className="card-content">
                  <h4>Studio Cost Optimization: How to Get More Shoot Time for Less</h4>
                  <p>Practical negotiation tactics and booking strategies that reduce studio costs by up to 35%.</p>
                  <div className="card-footer-author">
                    <div className="author-details">
                      <div className="author-initial-circle bg-avatar-purple">PM</div>
                      <div>
                        <h5>Priya Menon</h5>
                        <p>Jun 1</p>
                      </div>
                    </div>
                    <span className="views-count">5.3K views</span>
                  </div>
                </div>
              </div>

              <div className="latest-article-card glass">
                <div className="card-img-placeholder blue-bg">
                  <span className="card-cat-badge">Technology</span>
                </div>
                <div className="card-content">
                  <h4>Virtual Production Studios in India: What's Available & How to Book</h4>
                  <p>The LED volume revolution is here. Here's how to access it on ZO1 without a Hollywood-level budget.</p>
                  <div className="card-footer-author">
                    <div className="author-details">
                      <div className="author-initial-circle bg-avatar-blue">SR</div>
                      <div>
                        <h5>Shreya Rajan</h5>
                        <p>Jun 5</p>
                      </div>
                    </div>
                    <span className="views-count">7.6K views</span>
                  </div>
                </div>
              </div>

              <div className="latest-article-card glass">
                <div className="card-img-placeholder pink-bg">
                  <span className="card-cat-badge">Specialty</span>
                </div>
                <div className="card-content">
                  <h4>The Complete Green Screen Studio Guide: Setup, Lighting & Common Mistakes</h4>
                  <p>Everything you need to know before booking a chroma key studio — mistakes that cost productions hours on set.</p>
                  <div className="card-footer-author">
                    <div className="author-details">
                      <div className="author-initial-circle bg-avatar-purple">RK</div>
                      <div>
                        <h5>Rahul Khanna</h5>
                        <p>May 28</p>
                      </div>
                    </div>
                    <span className="views-count">11.4K views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM REDIRECT */}
        
      </div>
    );
  };

  // 3f Trust Guide View
  const renderBlogTrustGuide = () => {
    return (
      <div className="blog-sub-content fade-in">
        {/* HERO */}
        <div className="blog-hero-section-no-img">
          <span className="blog-badge-tag bg-green">🛡️ TRUST & SAFETY</span>
          <h1 className="blog-main-title">
            Every Vendor. Every Listing. <span className="text-gradient-green">Fully Verified.</span>
          </h1>
          <p className="blog-main-subtitle">
            ZO1's multi-stage verification process ensures every studio, equipment vendor, and crew member on the platform has been rigorously checked before they can accept bookings.
          </p>
          <div className="blog-hub-stats-row">
            <span><strong>5-Stage</strong> Verification</span>
            <span><strong>100%</strong> ID Checked</span>
            <span><strong>Escrow</strong> Protection</span>
            <span><strong>Secure</strong> Payments</span>
          </div>
        </div>

        {/* VERIFICATION WORKFLOW PROGRESS ROW */}
        <div className="blog-showcase-row-container">
          <span className="showcase-section-badge">VERIFICATION WORKFLOW</span>
          <div className="workflow-steps-list-box glass">
            <div className="w-step-row">
              <span className="w-step-num-icon">01</span>
              <div className="w-step-info">
                <h4>Identity Verification</h4>
                <p>Government-issued ID, business registration, and address verification via automated checks.</p>
              </div>
              <span className="w-step-status-tag">✓ Automated</span>
            </div>
            <div className="w-step-row">
              <span className="w-step-num-icon">02</span>
              <div className="w-step-info">
                <h4>Portfolio Review</h4>
                <p>Human editorial team reviews past work, client references, and portfolio for quality standards.</p>
              </div>
              <span className="w-step-status-tag">✓ Human Review</span>
            </div>
            <div className="w-step-row">
              <span className="w-step-num-icon">03</span>
              <div className="w-step-info">
                <h4>Background Check</h4>
                <p>Third-party verification partner conducts criminal background and business history screening.</p>
              </div>
              <span className="w-step-status-tag font-purple">✓ Third-Party</span>
            </div>
            <div className="w-step-row">
              <span className="w-step-num-icon">04</span>
              <div className="w-step-info">
                <h4>Quality Assessment</h4>
                <p>ZO1 team verifies equipment condition, studio standards, and professional capability before approval.</p>
              </div>
              <span className="w-step-status-tag font-blue">✓ On-site or Remote</span>
            </div>
            <div className="w-step-row finish">
              <span className="w-step-num-icon checked">✓</span>
              <div className="w-step-info">
                <h4>ZO1 Verified Badge Awarded</h4>
                <p>Vendor is live on platform with the Verified badge displayed on all listings.</p>
              </div>
              <span className="w-step-status-tag active">Active</span>
            </div>
          </div>
        </div>

        {/* 4 COLS SECURITY CARDS GRID */}
        <div className="blog-showcase-row-container">
          <div className="gear-showcase-grid-4">
            <div className="gear-showcase-card glass">
              <span className="gear-card-icon">🛡️</span>
              <h4>Escrow Protection</h4>
              <p>Payments held securely until your booking is confirmed and service delivered.</p>
            </div>
            <div className="gear-showcase-card glass">
              <span className="gear-card-icon">🔒</span>
              <h4>Secure Payments</h4>
              <p>Bank-grade encryption on all transactions. No vendor ever receives your payment details.</p>
            </div>
            <div className="gear-showcase-card glass">
              <span className="gear-card-icon">📋</span>
              <h4>Booking Guarantees</h4>
              <p>If a vendor cancels last minute, ZO1 finds a replacement or issues a full refund.</p>
            </div>
            <div className="gear-showcase-card glass">
              <span className="gear-card-icon">✅</span>
              <h4>Verified Profiles</h4>
              <p>Every profile displays verification status, last-reviewed date, and community rating.</p>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="blog-category-filter-bar">
          <span className="filter-tab active">All Articles</span>
          <span className="filter-tab">Verification Guides</span>
          <span className="filter-tab">Payment Security</span>
          <span className="filter-tab">Fraud Prevention</span>
          <span className="filter-tab">Best Practices</span>
        </div>

        {/* THREE ARTICLES GRID */}
        <div className="blog-articles-grid-area">
          <div className="latest-articles-grid-3col">
            <div className="latest-article-card glass">
              <div className="card-img-placeholder green-bg">
                <span className="card-cat-badge">Safety</span>
              </div>
              <div className="card-content">
                <h4>Why Verification Matters: The Real Cost of Booking Unverified Vendors</h4>
                <p>Data from 10,000 bookings shows what goes wrong when you skip the verification check.</p>
                <div className="card-footer-author">
                  <div className="author-details">
                    <div className="author-initial-circle bg-avatar-purple">ZE</div>
                    <div>
                      <h5>ZO1 Editorial</h5>
                      <p>Jun 12 • 7 min</p>
                    </div>
                  </div>
                  <span className="views-count">9.2K views</span>
                </div>
              </div>
            </div>

            <div className="latest-article-card glass">
              <div className="card-img-placeholder blue-bg">
                <span className="card-cat-badge">Process</span>
              </div>
              <div className="card-content">
                <h4>Vendor Screening Process: How ZO1 Reviews 500+ New Applications Monthly</h4>
                <p>Inside the verification team — the criteria, rejection rate, and what it takes to earn the badge.</p>
                <div className="card-footer-author">
                  <div className="author-details">
                    <div className="author-initial-circle bg-avatar-cyan">AK</div>
                    <div>
                      <h5>Arjun Kumar</h5>
                      <p>Jun 9 • 5 min</p>
                    </div>
                  </div>
                  <span className="views-count">6.8K views</span>
                </div>
              </div>
            </div>

            <div className="latest-article-card glass">
              <div className="card-img-placeholder purple-bg">
                <span className="card-cat-badge">Security</span>
              </div>
              <div className="card-content">
                <h4>Escrow Protection Explained: How Your Money Is Protected on Every Booking</h4>
                <p>The full breakdown of how ZO1's escrow system works — and when funds are released.</p>
                <div className="card-footer-author">
                  <div className="author-details">
                    <div className="author-initial-circle bg-avatar-blue">SR</div>
                    <div>
                      <h5>Shreya Rajan</h5>
                      <p>Jun 6 • 6 min</p>
                    </div>
                  </div>
                  <span className="views-count">7.4K views</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM REDIRECT */}
        <div className="blog-footer-btn-row">
          <button className="btn-primary-green">Explore Verified Listings <ArrowRight size={16} /></button>
        </div>
      </div>
    );
  };

  // 3g Rewards Guide View
  const renderBlogRewardsGuide = () => {
    // Calculator math values
    const studioVal = parseFloat(calcStudioSpend) || 0;
    const equipVal = parseFloat(calcEquipSpend) || 0;
    const computedEstCoins = Math.round((studioVal / 20) * 2 + (equipVal / 30) * 3);
    const computedSavings = Math.round(computedEstCoins * 0.5);

    return (
      <div className="blog-sub-content fade-in">
        {/* HERO */}
        <div className="blog-hero-section">
          <div className="blog-hero-left">
            <span className="blog-badge-tag bg-gold">🪙 REWARDS PROGRAM</span>
            <h1 className="blog-main-title">
              Every Booking <span className="text-gradient-gold">Earns Rewards.</span>
            </h1>
            <p className="blog-main-subtitle">
              Super Coins accumulate with every studio booking, equipment rental, and crew hire — then redeem for discounts, upgrades, and exclusive creator benefits.
            </p>
            <div className="rewards-welcome-badges-row">
              <div className="welcome-badge-item glass">
                <strong>100</strong>
                <p>Welcome Bonus</p>
              </div>
              <div className="welcome-badge-item glass">
                <strong>2× Coins</strong>
                <p>Studio Bookings</p>
              </div>
              <div className="welcome-badge-item glass">
                <strong>₹500</strong>
                <p>per 1,000 Coins</p>
              </div>
            </div>
            <div className="rewards-btn-row">
              <button className="btn-primary-gold">Start Earning Coins <ArrowRight size={16} /></button>
            </div>
          </div>

          {/* LARGE COIN EMBED */}
          <div className="blog-featured-card glass no-border transparent-bg flex-center">
            <div className="glowing-coin-gold-wrapper">
              <div className="golden-pulse-bg"></div>
              <div className="coin-face-inner">
                <img src="/supercoin.png" alt="SuperCoin" className="disk-coin-img" />
              </div>
              <span className="supercoins-gold-text">SUPER COINS</span>
            </div>
          </div>
        </div>

        {/* REWARD CALCULATOR */}
        <div className="blog-showcase-row-container">
          <div className="calculator-widget-box glass">
            <div className="calc-header-title">
              <h4>📊 Reward Calculator</h4>
            </div>
            <div className="calc-inputs-row">
              <div className="calc-input-group">
                <label>MONTHLY STUDIO BOOKINGS (₹)</label>
                <input
                  type="number"
                  value={calcStudioSpend}
                  onChange={(e) => setCalcStudioSpend(e.target.value)}
                />
              </div>
              <div className="calc-input-group">
                <label>MONTHLY EQUIPMENT RENTALS (₹)</label>
                <input
                  type="number"
                  value={calcEquipSpend}
                  onChange={(e) => setCalcEquipSpend(e.target.value)}
                />
              </div>
            </div>

            <div className="calc-results-output-row">
              <div className="output-column-box">
                <label>ESTIMATED MONTHLY COINS</label>
                <h2>{computedEstCoins.toLocaleString()}</h2>
              </div>
              <div className="output-column-box highlight">
                <label>Redemption Value</label>
                <h2>₹{computedSavings.toLocaleString()}</h2>
                <p>per month in savings</p>
              </div>
            </div>
          </div>
        </div>

        {/* 6 CARDS VALUES */}
        <div className="blog-showcase-row-container">
          <div className="booking-6-grid">
            <div className="booking-feat-card glass">
              <div className="feat-icon-box gold">🎁</div>
              <h4>Booking Rewards</h4>
              <p>Earn coins on every studio, equipment, and crew booking automatically — no registration needed.</p>
            </div>
            <div className="booking-feat-card glass">
              <div className="feat-icon-box gold">📉</div>
              <h4>Equipment Discounts</h4>
              <p>Redeem Super Coins for up to 15% off equipment rentals, applied directly at checkout.</p>
            </div>
            <div className="booking-feat-card glass">
              <div className="feat-icon-box gold">⚡</div>
              <h4>Priority Support</h4>
              <p>Coin holders above 5,000 get priority booking slots and dedicated support during shoots.</p>
            </div>
            <div className="booking-feat-card glass">
              <div className="feat-icon-box gold">🤝</div>
              <h4>Referral Rewards</h4>
              <p>Earn 500 Super Coins for every creator you refer who completes their first booking on ZO1.</p>
            </div>
            <div className="booking-feat-card glass">
              <div className="feat-icon-box gold">👑</div>
              <h4>Creator Loyalty</h4>
              <p>Reach Gold or Platinum tier to unlock exclusive studio access, priority listings, and bonus multipliers.</p>
            </div>
            <div className="booking-feat-card glass">
              <div className="feat-icon-box gold">💎</div>
              <h4>Premium Membership</h4>
              <p>Super Coin Members get early access to new studios, feature drops, and quarterly creator reports.</p>
            </div>
          </div>
        </div>

        {/* BOTTOM REDIRECT */}
        <div className="blog-footer-btn-row">
          <button className="btn-primary-gold">Start Earning <ArrowRight size={16} /></button>
        </div>
      </div>
    );
  };

  // 3h Success Stories View
  const renderBlogSuccess = () => {
    return (
      <div className="blog-sub-content fade-in">
        {/* HERO */}
        <div className="blog-hero-section-no-img">
          <span className="blog-badge-tag bg-orange">★ CREATOR SUCCESS STORIES</span>
          <h1 className="blog-main-title">
            Real Creators. <span className="text-gradient-purple-pink">Real Results.</span>
          </h1>
          <p className="blog-main-subtitle">
            How filmmakers, agencies, and studios are scaling their productions with ZO1.
          </p>
        </div>

        {/* FILTER TAGS */}
        <div className="blog-category-filter-bar">
          <span className="filter-tab active">All Creators</span>
          <span className="filter-tab">Independent Filmmakers</span>
          <span className="filter-tab">Brand Agencies</span>
          <span className="filter-tab">YouTube Creators</span>
          <span className="filter-tab">Production Houses</span>
        </div>

        {/* STORY GRID */}
        <div className="blog-showcase-row-container">
          <div className="latest-articles-grid-2col">

            <div className="latest-article-card glass">
              <div className="card-img-placeholder orange-bg">
                <span className="success-overlay-stat-badge">₹8L Saved in production costs</span>
              </div>
              <div className="card-content">
                <div className="stars-row-success">★★★★★</div>
                <h4>How Chennai Filmmaker Ravi Shot a Feature Film on a Budget That Shocked the Industry</h4>
                <p>By bundling studio + crew + equipment on ZO1, Ravi's team completed a full feature film production for under ₹25 lakhs — a cost that would typically run three times higher.</p>
                <div className="card-footer-author">
                  <div className="author-details">
                    <div className="author-initial-circle bg-avatar-purple">RK</div>
                    <div>
                      <h5>Ravi Krishnaswamy</h5>
                      <p>Independent Filmmaker, Chennai</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="latest-article-card glass">
              <div className="card-img-placeholder purple-bg">
                <span className="success-overlay-stat-badge">48 Projects completed in 2025</span>
              </div>
              <div className="card-content">
                <div className="stars-row-success">★★★★★</div>
                <h4>How Pixel Collective Scaled from 4 to 48 Brand Films in One Year Using ZO1</h4>
                <p>The brand agency switched from managing vendor relationships manually to booking everything on ZO1 — and their production capacity tripled within six months.</p>
                <div className="card-footer-author">
                  <div className="author-details">
                    <div className="author-initial-circle bg-avatar-blue">PD</div>
                    <div>
                      <h5>Pooja Deshpande</h5>
                      <p>Creative Director, Pixel Collective</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="latest-article-card glass">
              <div className="card-img-placeholder green-bg">
                <span className="success-overlay-stat-badge">2.4M Views on first studio shoot</span>
              </div>
              <div className="card-content">
                <div className="stars-row-success">★★★★★</div>
                <h4>YouTube Creator Meena Upgraded Her Production Quality Without Upgrading Her Budget</h4>
                <p>Using ZO1's equipment rental and verified studio booking, Meena went from filming in her bedroom to producing cinematic content that grew her channel 400% in six months.</p>
                <div className="card-footer-author">
                  <div className="author-details">
                    <div className="author-initial-circle bg-avatar-cyan">MN</div>
                    <div>
                      <h5>Meena Natarajan</h5>
                      <p>Content Creator, 620K Subscribers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="latest-article-card glass">
              <div className="card-img-placeholder yellow-bg">
                <span className="success-overlay-stat-badge">3× Production capacity growth</span>
              </div>
              <div className="card-content">
                <div className="stars-row-success">★★★★★</div>
                <h4>How Starlight Production House Tripled Output After Integrating ZO1 Into Their Workflow</h4>
                <p>With ZO1's project bundles and crew marketplace, Starlight reduced their booking overhead by 60% — freeing their producers to focus on creative work, not vendor management.</p>
                <div className="card-footer-author">
                  <div className="author-details">
                    <div className="author-initial-circle bg-avatar-cyan">AR</div>
                    <div>
                      <h5>Arun Raj</h5>
                      <p>Producer, Starlight Productions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM STATS ROW */}
        <div className="booking-stats-row glass">
          <div className="stat-unit">
            <h3>₹2.4Cr</h3>
            <p>Money Saved by Creators</p>
          </div>
          <div className="stat-unit">
            <h3>12,400+</h3>
            <p>Projects Completed</p>
          </div>
          <div className="stat-unit">
            <h3>84,000+</h3>
            <p>Bookings Made</p>
          </div>
          <div className="stat-unit">
            <h3>+340%</h3>
            <p>Avg Production Growth</p>
          </div>
        </div>

        {/* WHAT CREATORS SAY */}
        <div className="blog-latest-articles-section">
          <h3>What Creators Say</h3>
          <div className="testimonials-grid margin-top-sm">
            <div className="testimonial-card glass">
              <div className="quote-icon">★★★★★</div>
              <p className="testimonial-text">"ZO1 changed how we produce. What used to take 2 weeks of coordination now takes 2 hours of clicking. Our entire production pipeline lives on this platform now."</p>
              <div className="testimonial-author">
                <div className="author-avatar bg-avatar-purple">KM</div>
                <div>
                  <h4>Karthik Murali</h4>
                  <p>Director, KM Films</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card glass">
              <div className="quote-icon">★★★★★</div>
              <p className="testimonial-text">"The verified badge system gave me the confidence to book studios I'd never used before. Every single one delivered exactly what was promised. Zero surprises."</p>
              <div className="testimonial-author">
                <div className="author-avatar bg-avatar-blue">SB</div>
                <div>
                  <h4>Sneha Bhatt</h4>
                  <p>Photographer, Mysore</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card glass">
              <div className="quote-icon">★★★★★</div>
              <p className="testimonial-text">"We've accumulated thousands of Super Coins just from our regular bookings. It's essentially free money off our next project every single month. Brilliant program."</p>
              <div className="testimonial-author">
                <div className="author-avatar bg-avatar-orange">TP</div>
                <div>
                  <h4>Tanvi Pillai</h4>
                  <p>Producer, TPresents</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 3i Author Profile / Publisher view
  const renderBlogAuthor = () => {
    return (
      <div className="blog-sub-content fade-in">
        {/* AUTHOR CARD BANNER */}
        <div className="author-profile-banner-card glass">
          <div className="profile-banner-glow"></div>
          <div className="profile-banner-layout">
            <div className="profile-badge-avatar">ZE</div>
            <div className="profile-meta-content">
              <h2>ZO1 Editorial Team</h2>
              <span className="profile-role-tag">Production Experts & Industry Researchers</span>
              <p>A team of working filmmakers, producers, and production professionals who have collectively worked on 500+ shoots across India. We write what we know — from studio floors to edit suites, equipment bays to casting sessions.</p>
              <div className="profile-social-row">
                <span className="social-pill">𝕏 Twitter</span>
                <span className="social-pill">in LinkedIn</span>
                <span className="social-pill">▶ YouTube</span>
                <span className="social-pill">📸 Instagram</span>
              </div>
            </div>
            <div className="profile-stats-badge-area">
              <div className="badge-item">
                <strong>350+</strong>
                <span>Articles</span>
              </div>
              <div className="badge-item">
                <strong>2.4M</strong>
                <span>Readers</span>
              </div>
              <div className="badge-item">
                <strong>150K</strong>
                <span>Subscribers</span>
              </div>
            </div>
          </div>
        </div>

        {/* TWO COLUMN GRID */}
        <div className="blog-two-column-layout margin-top-sm">
          {/* SIDEBAR */}
          <div className="blog-sidebar-filters">
            <div className="filter-block glass">
              <h4>TOPICS</h4>
              <div className="checklist-group">
                <label className="checkbox-item active">
                  <span>All Articles</span>
                  <span className="count-badge">350</span>
                </label>
                <label className="checkbox-item">
                  <span>Studio Booking</span>
                  <span className="count-badge">88</span>
                </label>
                <label className="checkbox-item">
                  <span>Equipment Rental</span>
                  <span className="count-badge">74</span>
                </label>
                <label className="checkbox-item">
                  <span>Crew Hiring</span>
                  <span className="count-badge">62</span>
                </label>
                <label className="checkbox-item">
                  <span>Case Studies</span>
                  <span className="count-badge">48</span>
                </label>
                <label className="checkbox-item">
                  <span>Industry Reports</span>
                  <span className="count-badge">38</span>
                </label>
                <label className="checkbox-item">
                  <span>Super Coins</span>
                  <span className="count-badge">40</span>
                </label>
              </div>
            </div>

            <div className="filter-block glass">
              <h4>POPULAR TOPICS</h4>
              <div className="sidebar-tag-cloud">
                <span className="side-tag active">Filmmaking</span>
                <span className="side-tag active">Equipment</span>
                <span className="side-tag">Crew</span>
                <span className="side-tag active">Safety</span>
                <span className="side-tag">Rewards</span>
                <span className="side-tag">Budget</span>
                <span className="side-tag active">Chennai</span>
                <span className="side-tag">Case Study</span>
              </div>
            </div>
          </div>

          {/* MAIN ARTICLES */}
          <div className="blog-articles-grid-area">
            <div className="articles-area-header-row">
              <h3>Published Articles</h3>
              <div className="articles-sort-pills">
                <span className={`sort-pill ${authorTab === 'latest' ? 'active' : ''}`} onClick={() => setAuthorTab('latest')}>Latest</span>
                <span className={`sort-pill ${authorTab === 'popular' ? 'active' : ''}`} onClick={() => setAuthorTab('popular')}>Popular</span>
              </div>
            </div>

            <div className="latest-articles-grid-2col margin-top-sm">
              <div className="latest-article-card glass">
                <div className="card-img-placeholder orange-bg">
                  <span className="card-cat-badge">Case Study</span>
                </div>
                <div className="card-content">
                  <h4>How Independent Filmmakers Reduced Production Costs by 40% Using ZO1</h4>
                  <p>The most-read piece on ZO1 Blog — a data-backed deep dive into production cost optimization strategies.</p>
                  <div className="card-footer-author">
                    <span className="views-count">Jun 10, 2026</span>
                    <span className="views-count">24.5K views</span>
                  </div>
                </div>
              </div>

              <div className="latest-article-card glass">
                <div className="card-img-placeholder purple-bg">
                  <span className="card-cat-badge">Research</span>
                </div>
                <div className="card-content">
                  <h4>State of Indian Production Industry Report 2026</h4>
                  <p>Annual data on studio availability, equipment demand trends, crew market, and creator economy growth.</p>
                  <div className="card-footer-author">
                    <span className="views-count">May 28, 2026</span>
                    <span className="views-count">31.4K views</span>
                  </div>
                </div>
              </div>

              <div className="latest-article-card glass">
                <div className="card-img-placeholder blue-bg">
                  <span className="card-cat-badge">Guide</span>
                </div>
                <div className="card-content">
                  <h4>Virtual Production Studios in India: The Complete 2026 Guide</h4>
                  <p>LED volumes, virtual sets, and extended reality production — what's available and how to book it.</p>
                  <div className="card-footer-author">
                    <span className="views-count">Jun 5, 2026</span>
                    <span className="views-count">18.1K views</span>
                  </div>
                </div>
              </div>

              <div className="latest-article-card glass">
                <div className="card-img-placeholder yellow-bg">
                  <span className="card-cat-badge">Rewards</span>
                </div>
                <div className="card-content">
                  <h4>Super Coins Deep Dive: How to Maximize Every Rupee You Spend on ZO1</h4>
                  <p>The strategies creators use to stack Super Coins and turn routine bookings into significant savings.</p>
                  <div className="card-footer-author">
                    <span className="views-count">May 22, 2026</span>
                    <span className="views-count">14.8K views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  };

  // 3j Search Results View
  const renderBlogSearchRes = () => {
    return (
      <div className="blog-sub-content fade-in">
        {/* HERO SEARCH RESULTS BAR */}
        <div className="blog-hero-section-no-img">
          <span className="blog-badge-tag bg-pink">🔍 SEARCH</span>
          <h1 className="blog-main-title">
            Showing results for <span className="text-white">"Studio Booking"</span>
          </h1>
          <div className="blog-search-widget">
            <input type="text" defaultValue="Studio Booking" readOnly />
            <button className="btn-search-red">Search</button>
          </div>
          <div className="blog-tag-pills">
            <span className="blog-pill active">Studio Booking</span>
            <span className="blog-pill">Equipment Rental</span>
            <span className="blog-pill">Virtual Studio</span>
            <span className="blog-pill">Green Screen</span>
            <span className="blog-pill">Chennai Studios</span>
            <span className="blog-pill">Studio Cost</span>
          </div>
        </div>

        {/* TWO COLUMN AREA */}
        <div className="blog-two-column-layout">
          {/* SIDEBAR */}
          <div className="blog-sidebar-filters">
            <div className="filter-block glass">
              <h4>CATEGORY</h4>
              <div className="checklist-group">
                <label className="checkbox-item active">
                  <span>All Results</span>
                  <span className="count-badge">127</span>
                </label>
                <label className="checkbox-item">
                  <span>Guides</span>
                  <span className="count-badge">44</span>
                </label>
                <label className="checkbox-item">
                  <span>Case Studies</span>
                  <span className="count-badge">22</span>
                </label>
                <label className="checkbox-item">
                  <span>Reviews</span>
                  <span className="count-badge">18</span>
                </label>
                <label className="checkbox-item">
                  <span>News</span>
                  <span className="count-badge">18</span>
                </label>
                <label className="checkbox-item">
                  <span>Checklists</span>
                  <span className="count-badge">27</span>
                </label>
              </div>
            </div>

            <div className="filter-block glass">
              <h4>SORT BY</h4>
              <div className="checklist-group">
                <label className="checkbox-item active">
                  <span>Most Relevant</span>
                </label>
                <label className="checkbox-item">
                  <span>Most Recent</span>
                </label>
                <label className="checkbox-item">
                  <span>Most Views</span>
                </label>
                <label className="checkbox-item">
                  <span>Most Saved</span>
                </label>
              </div>
            </div>

            <div className="filter-block glass">
              <h4>TAGS</h4>
              <div className="sidebar-tag-cloud">
                <span className="side-tag active">Studio</span>
                <span className="side-tag active">Booking</span>
                <span className="side-tag">Chennai</span>
                <span className="side-tag active">Verified</span>
                <span className="side-tag">Budget</span>
                <span className="side-tag active">Guide</span>
              </div>
            </div>
          </div>

          {/* MAIN VERTICAL LISTINGS */}
          <div className="blog-articles-grid-area">
            <div className="articles-area-header-row">
              <h3>127 articles found for "Studio Booking"</h3>
              <span className="results-dropdown-v">Most Relevant ▾</span>
            </div>

            <div className="search-vertical-articles-list margin-top-sm">

              <div className="search-article-row-item glass">
                <div className="row-thumb orange-bg"></div>
                <div className="row-meta-content">
                  <div className="row-header">
                    <span className="row-cat-tag orange">Guide</span>
                    <h4>How to Choose the Right Studio for Your Production</h4>
                  </div>
                  <p>The definitive checklist for evaluating any studio — from lighting rigs to power capacity, access requirements to cancellation policies.</p>
                  <div className="row-footer-meta">
                    <span>📅 Jun 10, 2026</span>
                    <span>⏱ 8 min read</span>
                    <span>👁 12.4K views</span>
                    <span>💾 890 saves</span>
                  </div>
                </div>
              </div>

              <div className="search-article-row-item glass">
                <div className="row-thumb purple-bg"></div>
                <div className="row-meta-content">
                  <div className="row-header">
                    <span className="row-cat-tag purple">City Guide</span>
                    <h4>Top 20 Studios in Chennai: Rates, Reviews & Booking Tips</h4>
                  </div>
                  <p>The definitive guide to Chennai's production studio scene — from budget-friendly setups to full-scale feature film facilities and LED volumes.</p>
                  <div className="row-footer-meta">
                    <span>📅 Jun 3, 2026</span>
                    <span>⏱ 12 min read</span>
                    <span>👁 18.2K views</span>
                    <span>💾 1.4K saves</span>
                  </div>
                </div>
              </div>

              <div className="search-article-row-item glass">
                <div className="row-thumb blue-bg"></div>
                <div className="row-meta-content">
                  <div className="row-header">
                    <span className="row-cat-tag blue">Technology</span>
                    <h4>Virtual Production Studios in India: What's Available & How to Book</h4>
                  </div>
                  <p>LED volumes, virtual sets, and real-time rendering — how to access next-generation studios on ZO1 without a Hollywood budget.</p>
                  <div className="row-footer-meta">
                    <span>📅 Jun 5, 2026</span>
                    <span>⏱ 10 min read</span>
                    <span>👁 7.6K views</span>
                    <span>💾 540 saves</span>
                  </div>
                </div>
              </div>

              <div className="search-article-row-item glass">
                <div className="row-thumb yellow-bg"></div>
                <div className="row-meta-content">
                  <div className="row-header">
                    <span className="row-cat-tag yellow">Checklist</span>
                    <h4>Studio Booking Checklist: 22 Things to Verify Before Your Shoot Day</h4>
                  </div>
                  <p>The list every pro filmmaker should check before confirming a studio booking — and the common oversights that cost productions time and money.</p>
                  <div className="row-footer-meta">
                    <span>📅 Jun 8, 2026</span>
                    <span>⏱ 6 min read</span>
                    <span>👁 9.1K views</span>
                    <span>💾 720 saves</span>
                  </div>
                </div>
              </div>

              <div className="search-article-row-item glass">
                <div className="row-thumb green-bg"></div>
                <div className="row-meta-content">
                  <div className="row-header">
                    <span className="row-cat-tag green">Finance</span>
                    <h4>Studio Cost Optimization: How to Get More Shoot Time for Less</h4>
                  </div>
                  <p>Practical negotiation tactics and booking strategies that experienced producers use to reduce studio costs by up to 35% per project.</p>
                  <div className="row-footer-meta">
                    <span>📅 Jun 1, 2026</span>
                    <span>⏱ 7 min read</span>
                    <span>👁 5.3K views</span>
                    <span>💾 410 saves</span>
                  </div>
                </div>
              </div>

              <div className="search-article-row-item glass">
                <div className="row-thumb pink-bg"></div>
                <div className="row-meta-content">
                  <div className="row-header">
                    <span className="row-cat-tag pink">Specialty</span>
                    <h4>The Complete Green Screen Studio Guide: Lighting, Setup & Common Mistakes</h4>
                  </div>
                  <p>Everything you need to know before booking a chroma key studio — the setup details, lighting ratios, and mistakes that add hours to your shoot day.</p>
                  <div className="row-footer-meta">
                    <span>📅 May 28, 2026</span>
                    <span>⏱ 9 min read</span>
                    <span>👁 11.4K views</span>
                    <span>💾 880 saves</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM REDIRECT */}
        <div className="blog-footer-btn-row">
          <button className="btn-primary-orange">Explore Studios <ArrowRight size={16} /></button>
        </div>
      </div>
    );
  };

  // 3k Newsletter View
  const renderBlogNewsletter = () => {
    return (
      <div className="blog-sub-content fade-in">
        {/* HERO */}
        <div className="blog-hero-section-no-img">
          <span className="blog-badge-tag bg-orange">📧 ZO1 WEEKLY NEWSLETTER</span>
          <h1 className="blog-main-title">
            Join <span className="text-gradient-purple-pink">100,000+ Creators</span>
          </h1>
          <p className="blog-main-subtitle">
            Weekly insights on studio booking, equipment trends, crew marketplace, and production strategies — delivered every Tuesday morning.
          </p>

          <div className="newsletter-card newsletter-large glass max-width-680">
            <h3>Get the newsletter</h3>
            {!emailSubscribed ? (
              <form className="newsletter-form-row" onSubmit={(e) => { e.preventDefault(); setEmailSubscribed(true); }}>
                <input type="text" placeholder="Your name" required className="newsletter-input-field glass" />
                <input type="email" placeholder="your@email.com" required className="newsletter-input-field glass" />
                <button type="submit" className="btn-subscribe-orange">Subscribe Free — Cancel Anytime →</button>
              </form>
            ) : (
              <div className="subscription-success text-center">
                <CheckCircle size={24} className="margin-bottom-sm text-success" />
                <h4>You're on the list! Welcome to ZO1 Weekly.</h4>
              </div>
            )}
            <p className="bottom-spam-disclaimer">✓ No spam. Unsubscribe anytime. Join 100,000+ filmmakers.</p>
          </div>
        </div>

        {/* 6 BENEFITS CARDS */}
        <div className="blog-showcase-row-container">
          <div className="booking-6-grid">
            <div className="booking-feat-card glass horizontal-row-card">
              <span className="feat-icon-box orange">🎬</span>
              <div>
                <h4>Studio Insights</h4>
                <p>New studio openings, availability trends, and pricing reports across 12 Indian cities every week.</p>
              </div>
            </div>
            <div className="booking-feat-card glass horizontal-row-card">
              <span className="feat-icon-box orange">📹</span>
              <div>
                <h4>Equipment Recommendations</h4>
                <p>Curated gear picks, new rentals on the platform, and seasonal equipment guides for every production type.</p>
              </div>
            </div>
            <div className="booking-feat-card glass horizontal-row-card">
              <span className="feat-icon-box orange">📈</span>
              <div>
                <h4>Creator Growth Tips</h4>
                <p>Practical production strategies, budget breakdowns, and career advice from working professionals.</p>
              </div>
            </div>
            <div className="booking-feat-card glass horizontal-row-card">
              <span className="feat-icon-box orange">📊</span>
              <div>
                <h4>Industry Reports</h4>
                <p>Monthly data on the Indian production market — what's growing, what's changing, and what it means for you.</p>
              </div>
            </div>
            <div className="booking-feat-card glass horizontal-row-card">
              <span className="feat-icon-box orange">⚡</span>
              <div>
                <h4>Marketplace Updates</h4>
                <p>New features, vendor spotlights, and platform improvements delivered before they go public.</p>
              </div>
            </div>
            <div className="booking-feat-card glass horizontal-row-card">
              <span className="feat-icon-box orange">🎁</span>
              <div>
                <h4>Exclusive Offers</h4>
                <p>Subscriber-only Super Coins bonuses, discount codes, and early access to new platform features.</p>
              </div>
            </div>
          </div>
        </div>

        {/* STATS BAR */}
        <div className="booking-stats-row glass">
          <div className="stat-unit">
            <h3>100K+</h3>
            <p>Subscribers</p>
          </div>
          <div className="stat-unit">
            <h3>68%</h3>
            <p>Open Rate</p>
          </div>
          <div className="stat-unit">
            <h3>52</h3>
            <p>Issues Published</p>
          </div>
          <div className="stat-unit">
            <h3>4.9★</h3>
            <p>Subscriber Rating</p>
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="blog-latest-articles-section">
          <div className="testimonials-grid margin-top-sm">
            <div className="testimonial-card glass">
              <div className="quote-icon">★★★★★</div>
              <p className="testimonial-text">"The ZO1 Weekly is the only newsletter I read fully every week. The studio pricing data alone has saved me hours of research on every project."</p>
              <div className="testimonial-author">
                <div className="author-avatar bg-avatar-orange">KR</div>
                <div>
                  <h4>Kavya Reddy</h4>
                  <p>Documentary Filmmaker</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card glass">
              <div className="quote-icon">★★★★★</div>
              <p className="testimonial-text">"I've discovered three crew members through the newsletter's featured profiles section. One of them has become my go-to editor for every project."</p>
              <div className="testimonial-author">
                <div className="author-avatar bg-avatar-purple">SM</div>
                <div>
                  <h4>Suresh Mohan</h4>
                  <p>Ad Film Director</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card glass">
              <div className="quote-icon">★★★★★</div>
              <p className="testimonial-text">"The subscriber-only Super Coins deals are incredible. I've gotten over ₹8,000 in savings just from newsletter promo codes in the last three months."</p>
              <div className="testimonial-author">
                <div className="author-avatar bg-avatar-blue">PK</div>
                <div>
                  <h4>Prithvi Kumar</h4>
                  <p>Cinematographer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 3l Admin Dashboard View
  const renderBlogDashboard = () => {
    return (
      <div className="blog-sub-content fade-in">
        {/* DASHBOARD HEADER */}
        <div className="dashboard-top-title-bar">
          <div className="header-left">
            <span className="blog-badge-tag bg-blue">💻 ADMIN DASHBOARD</span>
            <h2>Content Management</h2>
          </div>
          <div className="header-right-btns">
            <button className="btn-dash-outline" onClick={handleDashboardExport}>
              <Download size={14} /> {isExported ? "✓ Exported Report CSV!" : "Export Report"}
            </button>
            <button className="btn-dash-primary-orange" onClick={handleDashboardAddArticle}>
              <Plus size={14} /> + New Article
            </button>
          </div>
        </div>

        {/* 4 STATS CARDS ROW */}
        <div className="dashboard-stats-overview-row">
          <div className="dash-stat-card glass">
            <div className="icon-row-unit">
              <span className="icon-desc">📄</span>
              <span className="percentage-badge plus">+12%</span>
            </div>
            <h3>{articlesCount.toLocaleString()}</h3>
            <p>Articles Published</p>
          </div>
          <div className="dash-stat-card glass">
            <div className="icon-row-unit">
              <span className="icon-desc">👁</span>
              <span className="percentage-badge plus">+28%</span>
            </div>
            <h3>2.4M</h3>
            <p>Monthly Readers</p>
          </div>
          <div className="dash-stat-card glass">
            <div className="icon-row-unit">
              <span className="icon-desc">✉</span>
              <span className="percentage-badge plus">+18%</span>
            </div>
            <h3>150K</h3>
            <p>Subscribers</p>
          </div>
          <div className="dash-stat-card glass">
            <div className="icon-row-unit">
              <span className="icon-desc">⚡</span>
              <span className="percentage-badge plus">+6%</span>
            </div>
            <h3>68%</h3>
            <p>Engagement Rate</p>
          </div>
        </div>

        {/* CHART GRID AND PROGRESS SECTION */}
        <div className="dashboard-charts-layout-row">
          <div className="chart-panel-box glass">
            <h4>Monthly Readers</h4>
            <p className="chart-subtitle">2.4M readers in June 2026 ↑28% vs last month</p>
            <div className="mock-charts-bars-row">
              <div className="chart-bar-col"><div className="bar-fill" style={{ height: '35%' }}></div><span>Jan</span></div>
              <div className="chart-bar-col"><div className="bar-fill" style={{ height: '45%' }}></div><span>Feb</span></div>
              <div className="chart-bar-col"><div className="bar-fill" style={{ height: '60%' }}></div><span>Mar</span></div>
              <div className="chart-bar-col"><div className="bar-fill" style={{ height: '70%' }}></div><span>Apr</span></div>
              <div className="chart-bar-col"><div className="bar-fill" style={{ height: '85%' }}></div><span>May</span></div>
              <div className="chart-bar-col active"><div className="bar-fill active" style={{ height: '100%' }}></div><span>Jun</span></div>
            </div>
          </div>

          <div className="chart-panel-box glass">
            <h4>Articles by Category</h4>
            <div className="metrics-bars-list">
              <div className="metric-progress-unit">
                <div className="label-row">
                  <span>Studio Booking</span>
                  <strong>28%</strong>
                </div>
                <div className="progress-bar-wrap"><div className="progress-fill-val" style={{ width: '28%', background: '#F97316' }}></div></div>
              </div>
              <div className="metric-progress-unit">
                <div className="label-row">
                  <span>Equipment Rental</span>
                  <strong>22%</strong>
                </div>
                <div className="progress-bar-wrap"><div className="progress-fill-val" style={{ width: '22%', background: '#3B82F6' }}></div></div>
              </div>
              <div className="metric-progress-unit">
                <div className="label-row">
                  <span>Crew Hiring</span>
                  <strong>18%</strong>
                </div>
                <div className="progress-bar-wrap"><div className="progress-fill-val" style={{ width: '18%', background: '#8B5CF6' }}></div></div>
              </div>
              <div className="metric-progress-unit">
                <div className="label-row">
                  <span>Marketplace</span>
                  <strong>14%</strong>
                </div>
                <div className="progress-bar-wrap"><div className="progress-fill-val" style={{ width: '14%', background: '#EC4899' }}></div></div>
              </div>
              <div className="metric-progress-unit">
                <div className="label-row">
                  <span>Super Coins & Other</span>
                  <strong>18%</strong>
                </div>
                <div className="progress-bar-wrap"><div className="progress-fill-val" style={{ width: '18%', background: '#FACC15' }}></div></div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM TABLE AREA */}
        <div className="dashboard-table-two-columns margin-top-sm">
          {/* TABLE PANEL */}
          <div className="table-wrapper-dashboard glass">
            <div className="table-header-title-bar">
              <h4>Content Management</h4>
              <div className="table-search-box-row">
                <button className="table-filter-btn">Filter</button>
                <button className="btn-dash-primary-orange-sm" onClick={handleDashboardAddArticle}>+ New Article</button>
              </div>
            </div>

            <table className="dash-articles-list-table">
              <thead>
                <tr>
                  <th>ARTICLE</th>
                  <th>CATEGORY</th>
                  <th>STATUS</th>
                  <th>VIEWS</th>
                  <th>DATE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {dashboardArticles.map((art) => (
                  <tr key={art.id}>
                    <td>
                      <div className="article-title-cell">
                        <span className={`cell-thumb-color ${art.category === 'Case Study' ? 'orange' : art.category === 'City Guide' ? 'purple' : art.category === 'Research' ? 'blue' : 'yellow'}`}></span>
                        <strong>{art.title}</strong>
                      </div>
                    </td>
                    <td><span className="table-cat-chip">{art.category}</span></td>
                    <td>
                      <span className={`table-status-badge ${art.status === 'Published' ? 'published' : art.status === 'In Review' ? 'in-review' : 'draft'}`}>
                        {art.status}
                      </span>
                    </td>
                    <td>{art.views}</td>
                    <td>{art.date}</td>
                    <td>
                      <div className="table-action-btns">
                        {art.status === 'In Review' ? (
                          <>
                            <button className="btn-row-action">Review</button>
                            <button className="btn-row-action-sub">Preview</button>
                          </>
                        ) : art.status === 'Draft' ? (
                          <>
                            <button className="btn-row-action">Continue</button>
                            <button className="btn-row-action-sub alert-red">Delete</button>
                          </>
                        ) : (
                          <>
                            <button className="btn-row-action">Edit</button>
                            <button className="btn-row-action-sub">Analytics</button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SIDEBARS */}
          <div className="dashboard-sidebar-panels">
            {/* WORKFLOW */}
            <div className="dash-sidebar-card glass">
              <h4>Publishing Workflow</h4>
              <div className="workflow-metrics-list">
                <div className="workflow-row-unit">
                  <div className="flex-row">
                    <span className="dot gray"></span>
                    <span>Draft</span>
                  </div>
                  <strong>{draftCount}</strong>
                </div>
                <div className="workflow-row-unit">
                  <div className="flex-row">
                    <span className="dot blue"></span>
                    <span>Editorial Review</span>
                  </div>
                  <strong>2</strong>
                </div>
                <div className="workflow-row-unit active">
                  <div className="flex-row">
                    <span className="dot orange"></span>
                    <span>Legal Check</span>
                  </div>
                  <strong>1</strong>
                </div>
                <div className="workflow-row-unit">
                  <div className="flex-row">
                    <span className="dot purple"></span>
                    <span>SEO Optimization</span>
                  </div>
                  <strong>1</strong>
                </div>
                <div className="workflow-row-unit">
                  <div className="flex-row">
                    <span className="dot green"></span>
                    <span>Scheduled</span>
                  </div>
                  <strong>4</strong>
                </div>
                <div className="workflow-row-unit">
                  <div className="flex-row">
                    <span className="dot green"></span>
                    <span>Published</span>
                  </div>
                  <strong>1,247</strong>
                </div>
              </div>
            </div>

            {/* CATEGORIES */}
            <div className="dash-sidebar-card glass">
              <h4>Category Management</h4>
              <div className="workflow-metrics-list">
                <div className="workflow-row-unit">
                  <span>Studio Booking</span>
                  <strong>345</strong>
                </div>
                <div className="workflow-row-unit">
                  <span>Equipment Rental</span>
                  <strong>274</strong>
                </div>
                <div className="workflow-row-unit">
                  <span>Crew Hiring</span>
                  <strong>224</strong>
                </div>
                <div className="workflow-row-unit">
                  <span>Marketplace</span>
                  <strong>172</strong>
                </div>
                <div className="workflow-row-unit">
                  <span>Super Coins</span>
                  <strong>136</strong>
                </div>
                <div className="workflow-row-unit">
                  <span>Trust & Safety</span>
                  <strong>96</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  };

  // 3m Mobile Experience View
  const renderBlogMobile = () => {
    return (
      <div className="blog-sub-content fade-in">
        {/* HERO */}
        <div className="blog-hero-section-no-img">
          <span className="blog-badge-tag bg-blue">📱 MOBILE EXPERIENCE</span>
          <h1 className="blog-main-title">
            ZO1 Blog on <span className="text-gradient-purple-pink">Every Device</span>
          </h1>
          <p className="blog-main-subtitle">
            Designed for creators on the move — full reading, searching, and newsletter subscription on mobile.
          </p>
        </div>

        {/* HORIZONTAL ALIGNED DEVICE SCREENS */}
        <div className="mobile-screens-showcase-row">

          {/* PHONE 1: MOBILE BLOG HOME */}
          <div className="mobile-mockup-frame glass">
            <div className="phone-screen-container">
              <div className="phone-screen-notch"></div>
              <div className="phone-screen-header">
                <span className="phone-screen-badge-top bg-orange">🎨 ZO1 Blog</span>
              </div>
              <div className="phone-screen-body scrollable">
                <h4 className="phone-story-title">The Knowledge Hub for Modern <span className="pink-text">Filmmakers</span></h4>
                <div className="phone-search-box-row">
                  <Search size={10} className="text-muted" />
                  <input type="text" placeholder="Search articles..." disabled />
                </div>
                <div className="phone-pills-row">
                  <span className="p-pill active">All</span>
                  <span className="p-pill">Studios</span>
                  <span className="p-pill">Equipment</span>
                  <span className="p-pill">Crew</span>
                </div>
                <div className="phone-trending-section">
                  <h5>🔥 Trending Now</h5>
                  <div className="phone-trend-card orange">
                    <h4>How Filmmakers Cut Costs by 40% Using ZO1</h4>
                    <p>ZO1 Editorial • 8 min • 24.5K views</p>
                  </div>
                  <div className="phone-trend-card purple">
                    <h4>Top 20 Studios in Chennai: Rates & Reviews</h4>
                    <p>Vikram Singh • 12 min • 18.2K views</p>
                  </div>
                  <div className="phone-trend-card blue">
                    <h4>Super Coins: How to Maximize Every Booking</h4>
                    <p>Priya Menon • 6 min • 14.8K views</p>
                  </div>
                </div>
              </div>
              <div className="phone-screen-footer-navbar">
                <span className="footer-nav-unit active">🏠<label>Home</label></span>
                <span className="footer-nav-unit">📂<label>Categories</label></span>
                <span className="footer-nav-unit">🔍<label>Search</label></span>
                <span className="footer-nav-unit">💾<label>Saved</label></span>
                <span className="footer-nav-unit">👤<label>Profile</label></span>
              </div>
            </div>
            <span className="device-label-text">MOBILE BLOG HOME</span>
          </div>

          {/* PHONE 2: MOBILE ARTICLE VIEW */}
          <div className="mobile-mockup-frame glass">
            <div className="phone-screen-container">
              <div className="phone-screen-notch"></div>
              <div className="phone-screen-header-back">
                <span>← Studio Booking</span>
                <span>🔗</span>
              </div>
              <div className="phone-screen-body scrollable">
                <span className="phone-cat-badge-lbl">Guide</span>
                <h4 className="phone-article-main-title">How to Choose the Right Studio for Your Production</h4>
                <p className="phone-article-author-lbl">Maya Pillai • Jun 10 • 8 min</p>
                <div className="phone-article-banner-placeholder"></div>
                <p className="phone-article-paragraph">Choosing the right studio isn't just about square footage. The lighting, infrastructure, power capacity, and acoustic treatment all determine whether your shoot day goes smoothly or becomes a battle.</p>
                <div className="phone-article-callout-box">
                  <p><strong>The first question to ask any studio:</strong> what's your actual power draw capacity? Most productions underestimate this critical detail.</p>
                </div>
                <p className="phone-article-paragraph">Before you commit to any booking on ZO1, run through this checklist — it'll save you hours on shoot day and prevent budget overruns that kill indie productions.</p>
              </div>
              <div className="phone-screen-footer-navbar">
                <span className="footer-nav-unit">🏠<label>Home</label></span>
                <span className="footer-nav-unit active">📂<label>Categories</label></span>
                <span className="footer-nav-unit">🔍<label>Search</label></span>
                <span className="footer-nav-unit">💾<label>Saved</label></span>
                <span className="footer-nav-unit">👤<label>Profile</label></span>
              </div>
            </div>
            <span className="device-label-text">MOBILE ARTICLE VIEW</span>
          </div>

          {/* PHONE 3: MOBILE SEARCH */}
          <div className="mobile-mockup-frame glass">
            <div className="phone-screen-container">
              <div className="phone-screen-notch"></div>
              <div className="phone-screen-header">
                <span className="phone-screen-badge-top">🔍 Search</span>
              </div>
              <div className="phone-screen-body scrollable">
                <div className="phone-search-input-active">
                  <span>Studio Booking</span>
                  <span>✗</span>
                </div>
                <h5 className="phone-search-results-lbl">127 results for "Studio Booking"</h5>

                <div className="phone-vertical-results-stack">
                  <div className="phone-res-row">
                    <span className="p-res-thumb orange"></span>
                    <div className="p-res-info">
                      <h4>How to Choose the Right Studio for Your Production</h4>
                      <p>Studio Booking Guide • 8 min • 12.4K views</p>
                    </div>
                  </div>
                  <div className="phone-res-row">
                    <span className="p-res-thumb purple"></span>
                    <div className="p-res-info">
                      <h4>Top 20 Studios in Chennai: Rates, Reviews & Tips</h4>
                      <p>City Guide • 12 min • 18.2K views</p>
                    </div>
                  </div>
                  <div className="phone-res-row">
                    <span className="p-res-thumb blue"></span>
                    <div className="p-res-info">
                      <h4>Virtual Production Studios in India</h4>
                      <p>Technology • 10 min • 7.6K views</p>
                    </div>
                  </div>
                  <div className="phone-res-row">
                    <span className="p-res-thumb green"></span>
                    <div className="p-res-info">
                      <h4>Studio Cost Optimization Guide</h4>
                      <p>Finance • 7 min • 5.3K views</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="phone-screen-footer-navbar">
                <span className="footer-nav-unit">🏠<label>Home</label></span>
                <span className="footer-nav-unit">📂<label>Categories</label></span>
                <span className="footer-nav-unit active">🔍<label>Search</label></span>
                <span className="footer-nav-unit">💾<label>Saved</label></span>
                <span className="footer-nav-unit">👤<label>Profile</label></span>
              </div>
            </div>
            <span className="device-label-text">MOBILE SEARCH</span>
          </div>

          {/* PHONE 4: MOBILE NEWSLETTER */}
          <div className="mobile-mockup-frame glass">
            <div className="phone-screen-container">
              <div className="phone-screen-notch"></div>
              <div className="phone-screen-header">
                <span className="phone-screen-badge-top">📧 Newsletter</span>
              </div>
              <div className="phone-screen-body scrollable flex-column justify-center text-center padding-sm">
                <h4 className="phone-newsletter-title">Join 100,000+ Creators</h4>
                <p className="phone-newsletter-desc">Weekly production insights delivered every Tuesday. Studio tips, equipment guides, crew picks, and industry data.</p>
                <input type="text" placeholder="Your name" className="phone-newsletter-input glass" disabled />
                <input type="email" placeholder="your@email.com" className="phone-newsletter-input glass" disabled />
                <button className="btn-phone-subscribe">Subscribe Free →</button>
                <p className="phone-newsletter-spam-lbl">No spam. Cancel anytime. 100K+ subscribers.</p>

                <div className="phone-newsletter-features-list">
                  <span>🎬 Studio Insights & Pricing</span>
                  <span>📹 Equipment Recommendations</span>
                  <span>📈 Creator Growth Tips</span>
                  <span>🎁 Exclusive Coin Offers</span>
                </div>
              </div>
              <div className="phone-screen-footer-navbar">
                <span className="footer-nav-unit">🏠<label>Home</label></span>
                <span className="footer-nav-unit">📂<label>Categories</label></span>
                <span className="footer-nav-unit">🔍<label>Search</label></span>
                <span className="footer-nav-unit">💾<label>Saved</label></span>
                <span className="footer-nav-unit active">👤<label>Profile</label></span>
              </div>
            </div>
            <span className="device-label-text">MOBILE NEWSLETTER</span>
          </div>

        </div>
      </div>
    );
  };

  // 3n Platform Stats View
  const renderBlogPlatformStats = () => {
    return (
      <div className="blog-sub-content fade-in">
        {/* HERO */}
        <div className="blog-hero-section-no-img">
          <span className="blog-badge-tag bg-pink">📊 PLATFORM BY THE NUMBERS</span>
          <h1 className="blog-main-title">
            ZO1 Blog in <span className="text-gradient-purple-pink">2026</span>
          </h1>
          <p className="blog-main-subtitle">
            The production knowledge platform that's changing how India films
          </p>
        </div>

        {/* 4 COLUMNS CARD LIST */}
        <div className="blog-showcase-row-container">
          <div className="platform-stats-grid-4">
            <div className="platform-stat-badge-unit-card glass">
              <div className="badge-ring-glow orange">👁</div>
              <h2>2.4M</h2>
              <p>Monthly readers across 12 Indian cities</p>
            </div>
            <div className="platform-stat-badge-unit-card glass">
              <div className="badge-ring-glow purple">📝</div>
              <h2>1,247</h2>
              <p>Articles published by production experts</p>
            </div>
            <div className="platform-stat-badge-unit-card glass">
              <div className="badge-ring-glow blue">📬</div>
              <h2>150K</h2>
              <p>Newsletter subscribers reading weekly</p>
            </div>
            <div className="platform-stat-badge-unit-card glass">
              <div className="badge-ring-glow green">★</div>
              <h2>4.9★</h2>
              <p>Average reader satisfaction rating</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 3o Popular Topics view
  const renderBlogPopularTopics = () => {
    return (
      <div className="blog-sub-content fade-in">
        {/* SECTION 1: POPULAR TOPICS */}
        <div className="blog-latest-articles-section">
          <div className="section-title-row">
            <h3>Popular Topics</h3>
            <a href="#see-all-topics" className="link-view-all">See all →</a>
          </div>
          <p className="sub-heading-text">Browse every corner of production knowledge</p>

          <div className="booking-6-grid">
            <div className="booking-feat-card glass hover-lift">
              <div className="feat-icon-box orange">🎬</div>
              <h4>Studio Booking</h4>
              <p>How to find, compare, and book production studios efficiently across India.</p>
              <span className="topic-total-count-lbl text-orange">158 articles →</span>
            </div>
            <div className="booking-feat-card glass hover-lift">
              <div className="feat-icon-box blue">📷</div>
              <h4>Equipment Rental</h4>
              <p>Camera, lighting, audio, and drone gear — everything about renting production equipment.</p>
              <span className="topic-total-count-lbl text-blue">203 articles →</span>
            </div>
            <div className="booking-feat-card glass hover-lift">
              <div className="feat-icon-box purple">👥</div>
              <h4>Crew Hiring</h4>
              <p>Finding, vetting, and working with production professionals across every specialty.</p>
              <span className="topic-total-count-lbl text-purple">118 articles →</span>
            </div>
            <div className="booking-feat-card glass hover-lift">
              <div className="feat-icon-box pink">⚡</div>
              <h4>Marketplace</h4>
              <p>The unified production marketplace — how to book everything in one place.</p>
              <span className="topic-total-count-lbl text-pink">89 articles →</span>
            </div>
            <div className="booking-feat-card glass hover-lift">
              <div className="feat-icon-box green">🛡️</div>
              <h4>Trust & Safety</h4>
              <p>Verification, escrow protection, secure payments, and booking guarantees.</p>
              <span className="topic-total-count-lbl text-green">72 articles →</span>
            </div>
            <div className="booking-feat-card glass hover-lift">
              <div className="feat-icon-box gold">🪙</div>
              <h4>Super Coins</h4>
              <p>The rewards program — how to earn, stack, and maximize your Super Coins.</p>
              <span className="topic-total-count-lbl text-gold">54 articles →</span>
            </div>
            <div className="booking-feat-card glass hover-lift">
              <div className="feat-icon-box orange">📊</div>
              <h4>Industry Reports</h4>
              <p>Data and analysis on the Indian production market — trends, growth, and forecasts.</p>
              <span className="topic-total-count-lbl text-orange">38 articles →</span>
            </div>
            <div className="booking-feat-card glass hover-lift">
              <div className="feat-icon-box purple">★</div>
              <h4>Success Stories</h4>
              <p>Real creator case studies showing exactly how ZO1 improved their production and bottom line.</p>
              <span className="topic-total-count-lbl text-purple">44 articles →</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: FEATURED CONTRIBUTORS */}
        <div className="blog-latest-articles-section">
          <div className="section-title-row">
            <h3>Featured Contributors</h3>
            <a href="#see-all-contributors" className="link-view-all">View all →</a>
          </div>
          <p className="sub-heading-text">Experts writing from real production experience</p>

          <div className="crew-profile-circles-row">
            <div className="crew-showcase-circle-card glass">
              <div className="circle-avatar bg-avatar-orange">AK</div>
              <h4>Arjun Kumar</h4>
              <p>Cinematographer & Director</p>
              <span className="prod-count-pill font-orange">88 articles</span>
            </div>
            <div className="crew-showcase-circle-card glass">
              <div className="circle-avatar bg-avatar-purple">SR</div>
              <h4>Shreya Rajan</h4>
              <p>Production Designer</p>
              <span className="prod-count-pill font-purple">54 articles</span>
            </div>
            <div className="crew-showcase-circle-card glass">
              <div className="circle-avatar bg-avatar-blue">MP</div>
              <h4>Maya Pillai</h4>
              <p>Cinematographer & DP</p>
              <span className="prod-count-pill font-blue">72 articles</span>
            </div>
            <div className="crew-showcase-circle-card glass">
              <div className="circle-avatar bg-avatar-green">VS</div>
              <h4>Vikram Singh</h4>
              <p>Producer & Studio Owner</p>
              <span className="prod-count-pill font-green">61 articles</span>
            </div>
            <div className="crew-showcase-circle-card glass">
              <div className="circle-avatar bg-avatar-gold">PM</div>
              <h4>Priya Menon</h4>
              <p>Equipment Specialist</p>
              <span className="prod-count-pill font-gold">47 articles</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: INTEL HUB */}
        <div className="blog-showcase-row-container margin-top-sm">
          <div className="intel-hub-wide-card glass">
            <div className="intel-glow-purple"></div>
            <div className="intel-layout-grid">
              <div className="intel-text-side">
                <span className="blog-badge-tag bg-purple">💡 INDUSTRY INTELLIGENCE</span>
                <h2>The Production Industry Intelligence Hub</h2>
                <p>ZO1 Blog tracks the pulse of India's production industry — studio availability, equipment trends, crew demand, and creator economy growth — giving you the data to make smarter decisions on every project.</p>
                <button className="btn-dash-primary-orange font-bold-medium">Read Latest Reports →</button>
              </div>

              <div className="intel-stats-cards-side">
                <div className="intel-mini-stat-card glass">
                  <h3>+40%</h3>
                  <p>Growth in equipment rental transactions on ZO1 in 2026</p>
                </div>
                <div className="intel-mini-stat-card glass">
                  <h3>₹850Cr</h3>
                  <p>Estimated size of India's independent film production market</p>
                </div>
                <div className="intel-mini-stat-card glass">
                  <h3>82%</h3>
                  <p>Of creators say they learned production skills from ZO1 Blog content</p>
                </div>
                <div className="intel-mini-stat-card glass">
                  <h3>3.2×</h3>
                  <p>Average ROI for creators implementing ZO1 Blog production strategies</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  };

  // 3p Level Up Page View
  const renderBlogLevelUp = () => {
    return (
      <div className="blog-sub-content fade-in flex-center-column text-center padding-tb-lg">
        <span className="blog-badge-tag bg-orange-outline">🚀 READY TO LEVEL UP?</span>
        <h1 className="blog-main-title level-title">
          Ready To Level Up Your <span className="text-gradient-purple-pink">Production Journey?</span>
        </h1>
        <p className="blog-main-subtitle max-width-680 margin-bottom-md">
          Join 100,000+ filmmakers, studio owners, equipment providers, and crew members building smarter productions with ZO1.
        </p>

        <div className="level-up-btn-row" style={{ marginTop: '28px' }}>
          <button className="btn-level-orange" onClick={() => setCurrentPage('home')}>Explore ZO1 →</button>
          <button className="btn-level-purple" onClick={() => setActiveBlogTab('filmmaker')}>Read More Articles →</button>
          <button className="btn-level-glass" onClick={() => setActiveBlogTab('newsletter')}>Join Newsletter</button>
        </div>

        <div className="level-up-checkpoints-row">
          <span>✓ Free to read</span>
          <span>✓ 1,247+ articles</span>
          <span>✓ New content weekly</span>
          <span>✓ No ads, ever</span>
          <span>✓ 100K+ subscribers</span>
        </div>
      </div>
    );
  };


  // ==========================================
  // HELP AND DOCS VIEW (Frequently Asked Questions)
  // ==========================================
  const renderHelpPage = () => {
    const faqCategories = [
      {
        id: "bookings",
        name: "Bookings",
        icon: "🎬",
        count: 7,
        questions: [
          { q: "How do I book a studio on ZO1?", a: "Browse verified studios, select your date/time slots, and click Book Now to pay the 20% security deposit. The host will receive the confirmation instantly." },
          { q: "Can I modify or cancel my booking?", a: "Yes, you can modify or cancel bookings via your Creator Dashboard. Full refunds are available up to 48 hours before shoot time." },
          { q: "What happens if a host cancels?", a: "In the rare event a host cancels, you receive a 100% refund instantly, and our support team helps find a replacement space." },
          { q: "Do I pay the full amount upfront?", a: "No, you only pay a 20% deposit to secure your slot, and the remaining 80% is paid directly on the shoot day." },
          { q: "Is there a minimum booking duration?", a: "Most studios have a minimum of 2 or 4 hours, which is clearly displayed on their listing profile page." },
          { q: "Can I request a recce before booking?", a: "Yes! Click 'Request Recce' on the studio profile to coordinate a site visit with the host." },
          { q: "What payment methods are supported?", a: "We support UPI, all credit/debit cards, Net Banking, and payment via accumulated Super Coins." }
        ]
      },
      {
        id: "studios",
        name: "Studios",
        icon: "🏢",
        count: 5,
        questions: [
          { q: "How are studio spaces verified?", a: "Our trust team physically inspects every studio to verify size, power capacity, soundproofing, and equipment specs." },
          { q: "What is standard studio equipment?", a: "Every studio includes basic light stands, power distribution, makeup mirrors, and a site assistant. Additional gear can be rented separately." },
          { q: "Is soundproofing guaranteed on all sets?", a: "Studios tagged with 'Soundproofed' are certified for audio recording. Other spaces are optimized for photography or silent shoots." },
          { q: "Are utilities included in the rate?", a: "Standard electricity and AC are included. High-draw lighting packages may carry utility surcharges as detailed in the listing." },
          { q: "Can I bring my own external crew?", a: "Yes, you are free to bring your own crew. You can also hire verified local professionals through the ZO1 Crew Marketplace." }
        ]
      },
      {
        id: "equipment",
        name: "Equipment",
        icon: "📷",
        count: 6,
        questions: [
          { q: "How does equipment delivery work?", a: "Rented gear is delivered directly to your shoot location by our logistics team and collected at the end of the booking." },
          { q: "What happens if the equipment is damaged?", a: "All rentals include standard damage waivers. Major damage or loss may be subject to deductibles under our equipment protection policy." },
          { q: "Is there a security deposit for rentals?", a: "No security deposit is required for creators with verified profiles and a history of successful bookings." },
          { q: "Can I extend my rental duration mid-shoot?", a: "Yes, subject to availability. You can extend rentals directly from the active booking screen on the ZO1 app." },
          { q: "Are batteries and accessories included?", a: "Yes, camera bodies include 2 batteries, a charger, and media cards. Lenses include caps and filters." },
          { q: "What is the equipment inspection process?", a: "Our team runs a 5-step checklist (visual check, clean, sensor test, battery health, case pack) before every single shipment." }
        ]
      },
      {
        id: "crew",
        name: "Actors & Crew",
        icon: "👥",
        count: 4,
        questions: [
          { q: "How do I hire crew members on ZO1?", a: "Search the Crew Marketplace, review portfolios, rates, and verified reviews, and submit a hire request for your dates." },
          { q: "How is crew payment managed?", a: "Payments are held in escrow by ZO1 and released to the crew member only after you confirm successful completion of the shoot day." },
          { q: "What if a crew member doesn't show up?", a: "Our backup crew system finds a verified local replacement in under 2 hours, or you receive a full refund." },
          { q: "Can I hire crew for multi-day projects?", a: "Yes, you can create multi-day booking offers with custom package rates directly inside the crew workspace." }
        ]
      },
      {
        id: "getting_listed",
        name: "Getting Listed",
        icon: "🚀",
        count: 3,
        questions: [
          { q: "How do I list my studio on ZO1?", a: "Submit your studio details, photos, and pricing via the 'List Your Space' button. Our team verifies and publishes it within 48 hours." },
          { q: "What are the requirements to list equipment?", a: "Equipment must be less than 4 years old, in working condition, with available proof of ownership or authorized rental rights." },
          { q: "How do I list myself as a crew member?", a: "Create a Crew Profile under your account, add your portfolio, demo reel, rates, and availability. Verification takes 24 hours." }
        ]
      },
      {
        id: "payments",
        name: "Payments",
        icon: "💳",
        count: 4,
        questions: [
          { q: "What is the escrow payment system?", a: "ZO1 holds your booking funds securely in escrow, protecting both creators and hosts. Funds are released only on shoot completion." },
          { q: "Are there any hidden transaction fees?", a: "Zero hidden fees. The price you see at checkout is exactly what you pay, including all taxes and platform charges." },
          { q: "How do refunds work for cancellations?", a: "Refunds are automatically processed to your original payment method in 3-5 business days upon cancellation approval." },
          { q: "Do you provide GST invoices?", a: "Yes, enter your GSTIN during checkout to receive business-compliant tax invoices for all bookings." }
        ]
      },
      {
        id: "policies",
        name: "Policies",
        icon: "📄",
        count: 2,
        questions: [
          { q: "What is the cancellation policy?", a: "Free cancellations up to 48 hours before the shoot. 50% refund up to 24 hours. No refunds for last-minute cancellations." },
          { q: "What are the terms of dispute resolution?", a: "If a dispute arises, file a claim in 48 hours. Our team mediates and resolves the issue based on shoot records within 24 hours." }
        ]
      },
      {
        id: "supercoins",
        name: "Super Coins",
        icon: "🪙",
        count: 2,
        questions: [
          { q: "How do I earn Super Coins?", a: "Earn 1 coin per ₹20 spent on studios, ₹30 on gear, and ₹40 on crew bookings. Reviews and referrals yield bonus coins." },
          { q: "How do I redeem my Super Coins?", a: "Convert Super Coins directly to booking discounts during checkout at a rate of ₹0.25 per coin, or buy catalogue upgrades." }
        ]
      },
      {
        id: "account",
        name: "Account",
        icon: "👤",
        count: 1,
        questions: [
          { q: "How do I verify my creator profile?", a: "Submit your Government ID, professional website/portfolio links, and work references under the Account Settings tab." }
        ]
      },
      {
        id: "support",
        name: "Support",
        icon: "📞",
        count: 1,
        questions: [
          { q: "How do I contact customer support?", a: "Chat with us live 24/7 on the ZO1 app, email support@zo1.com, or request a call from our production desk." }
        ]
      }
    ];

    const toggleFaq = (key) => {
      if (expandedFaq === key) {
        setExpandedFaq(null);
      } else {
        setExpandedFaq(key);
      }
    };

    const handleAnchorScroll = (e, id) => {
      e.preventDefault();
      const el = document.getElementById(`faq-sec-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    // Filter based on search query
    const filteredCategories = faqCategories.map(cat => {
      const matchedQuestions = cat.questions.filter(
        q => q.q.toLowerCase().includes(helpSearchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(helpSearchQuery.toLowerCase())
      );
      return { ...cat, questions: matchedQuestions };
    }).filter(cat => cat.questions.length > 0);

    return (
      <div className="help-page-view container">
        {/* HERO SECTION */}
        <div className="help-hero-block text-center padding-tb-lg">
          <span className="blog-badge-tag bg-purple-outline">📋 HELP & SUPPORT</span>
          <h1 className="blog-main-title level-title" style={{ margin: '1.5rem auto' }}>
            Frequently Asked Questions
          </h1>
          <p className="blog-main-subtitle max-width-680 margin-bottom-md" style={{ margin: '0 auto 2.5rem auto' }}>
            Find quick answers to common questions about booking studios, renting equipment, hiring crew, and earning rewards on ZO1.
          </p>

          <div className="help-search-widget-wrap">
            <div className="help-search-widget glass">
              <Search size={16} className="text-muted" />
              <input
                type="text"
                placeholder="Search help articles..."
                value={helpSearchQuery}
                onChange={(e) => setHelpSearchQuery(e.target.value)}
              />
              <button className="btn-search-red">Search</button>
            </div>
          </div>

          {/* 4 STATS CARDS */}
          <div className="help-hero-stats-row margin-top-lg">
            <div className="help-stat-unit-card glass">
              <div className="help-stat-icon-glow orange">📄</div>
              <h3>500+</h3>
              <p>Help Articles</p>
            </div>
            <div className="help-stat-unit-card glass">
              <div className="help-stat-icon-glow purple">⚙️</div>
              <h3>1,900+</h3>
              <p>Solved Tickets</p>
            </div>
            <div className="help-stat-unit-card glass">
              <div className="help-stat-icon-glow blue">✍️</div>
              <h3>300+</h3>
              <p>Vetted Guides</p>
            </div>
            <div className="help-stat-unit-card glass">
              <div className="help-stat-icon-glow green">📞</div>
              <h3>24/7</h3>
              <p>Creator Support</p>
            </div>
          </div>
        </div>

        {/* TWO-COLUMN SIDEBAR + ACCORDIONS */}
        <div className="help-body-grid margin-top-lg">
          {/* LEFT SIDEBAR CATEGORY MENU */}
          <aside className="help-sidebar-menu glass">
            <div className="sidebar-heading">CATEGORIES</div>
            <div className="sidebar-list">
              {faqCategories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#faq-sec-${cat.id}`}
                  onClick={(e) => handleAnchorScroll(e, cat.id)}
                  className="sidebar-item font-bold-medium"
                >
                  <span className="cat-name-icon">{cat.icon} {cat.name}</span>
                  <span className="cat-badge-bubble">{cat.count}</span>
                </a>
              ))}
            </div>
          </aside>

          {/* RIGHT ACCORDIONS CONTAINER */}
          <div className="help-accordion-content-area">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <div key={cat.id} id={`faq-sec-${cat.id}`} className="faq-category-section-block glass margin-bottom-md text-left">
                  <div className="faq-category-header">
                    <span className="faq-cat-badge">{cat.icon} {cat.name}</span>
                    <span className="faq-cat-count">{cat.questions.length} articles</span>
                  </div>

                  <div className="faq-accordions-list">
                    {cat.questions.map((faq, idx) => {
                      const key = `${cat.id}-${idx}`;
                      const isExpanded = expandedFaq === key;
                      return (
                        <div key={idx} className={`faq-accordion-item ${isExpanded ? 'expanded' : ''}`}>
                          <div className="faq-accordion-title-row" onClick={() => toggleFaq(key)}>
                            <h4>{faq.q}</h4>
                            <span className="faq-arrow-icon">{isExpanded ? '−' : '+'}</span>
                          </div>
                          <div className="faq-accordion-body">
                            <p>{faq.a}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results glass text-center padding-lg">
                <p>No matching questions found for "{helpSearchQuery}". Try another search term!</p>
              </div>
            )}
          </div>
        </div>

        {/* BROWSE BY CATEGORY */}
        <div className="blog-latest-articles-section width-100 max-width-1100 margin-top-lg">
          <div className="section-title-row text-center-mobile flex-center">
            <span className="blog-badge-tag bg-purple-outline" style={{ display: 'inline-block' }}>📋 KNOWLEDGE BASE</span>
          </div>
          <h3 className="text-center-mobile text-center-title" style={{ marginTop: '1rem' }}>Browse by Category</h3>
          <p className="sub-heading-text text-center-mobile text-center-subtitle">Not sure where to start? Browse our most popular help categories.</p>

          <div className="latest-articles-grid-3col margin-top-sm">
            <div className="latest-article-card glass font-padding-lg text-center-mobile">
              <span className="doc-icon-indicator text-orange">🎬</span>
              <h4 className="doc-card-title">Booking Process</h4>
              <p className="doc-card-desc">Learn how to search, compare, book, modify, or cancel studio, gear, and crew bookings.</p>
              <span className="doc-link-label">View articles →</span>
            </div>
            <div className="latest-article-card glass font-padding-lg text-center-mobile">
              <span className="doc-icon-indicator text-blue">💳</span>
              <h4 className="doc-card-title">Payment and Refunds</h4>
              <p className="doc-card-desc">Guides on escrow payments, secure transactions, cancellation terms, and tax invoices.</p>
              <span className="doc-link-label">View articles →</span>
            </div>
            <div className="latest-article-card glass font-padding-lg text-center-mobile">
              <span className="doc-icon-indicator text-purple">⚙️</span>
              <h4 className="doc-card-title">Technical Documents</h4>
              <p className="doc-card-desc">Detailed camera specs, studio guidelines, safety rules, and platform configuration help.</p>
              <span className="doc-link-label">View articles →</span>
            </div>
          </div>
        </div>

        {/* STILL NEED HELP Section */}
        <div className="blog-latest-articles-section width-100 max-width-1100 margin-top-lg">
          <div className="section-title-row text-center-mobile flex-center">
            <span className="blog-badge-tag bg-purple-outline" style={{ display: 'inline-block' }}>📞 GET IN TOUCH</span>
          </div>
          <h3 className="text-center-mobile text-center-title" style={{ marginTop: '1rem' }}>Still Need Help?</h3>
          <p className="sub-heading-text text-center-mobile text-center-subtitle">Can't find what you're looking for? Our team is ready to assist you.</p>

          <div className="latest-articles-grid-3col margin-top-sm">
            <div className="latest-article-card glass font-padding-lg flex-column justify-between text-center">
              <div>
                <span className="doc-icon-indicator" style={{ fontSize: '2.5rem' }}>💬</span>
                <h4 className="doc-card-title margin-top-xs">Live Chat</h4>
                <p className="doc-card-desc">Available 24/7 for urgent on-set issues. Average response time under 2 minutes.</p>
              </div>
              <button className="btn-level-orange max-width-100 margin-top-sm" style={{ margin: '1rem auto 0 auto' }}>Start Chat</button>
            </div>
            <div className="latest-article-card glass font-padding-lg flex-column justify-between text-center">
              <div>
                <span className="doc-icon-indicator" style={{ fontSize: '2.5rem' }}>✉</span>
                <h4 className="doc-card-title margin-top-xs">Email Support</h4>
                <p className="doc-card-desc">Submit a support ticket and our team will get back to you within 2 hours.</p>
              </div>
              <button className="btn-level-orange max-width-100 margin-top-sm" style={{ margin: '1rem auto 0 auto', background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.35)' }}>Open Ticket</button>
            </div>
            <div className="latest-article-card glass font-padding-lg flex-column justify-between text-center">
              <div>
                <span className="doc-icon-indicator" style={{ fontSize: '2.5rem' }}>📞</span>
                <h4 className="doc-card-title margin-top-xs">Call Support</h4>
                <p className="doc-card-desc">Request a callback from a production specialist to discuss complex bookings.</p>
              </div>
              <button className="btn-level-purple max-width-100 margin-top-sm" style={{ margin: '1rem auto 0 auto' }}>Call Us</button>
            </div>
          </div>
        </div>

        {/* PERSONAL ASSISTANCE BANNER */}
        <div className="blog-showcase-row-container width-100 max-width-1100 margin-top-lg margin-bottom-lg">
          <div className="intel-hub-wide-card glass">
            <div className="intel-glow-purple"></div>
            <div className="intel-layout-grid flex-column-mobile text-center-mobile">
              <div className="intel-text-side">
                <span className="blog-badge-tag bg-purple">🛡️ 24/7 PRODUCTION DESK</span>
                <h2>Need Personal Assistance?</h2>
                <p>Talk to a dedicated production manager to organize your studio, camera kit, and complete crew bundle.</p>
              </div>
              <div className="flex-center-row-gap flex-column-mobile">
                <button className="btn-level-purple font-bold-medium">Schedule Call</button>
                <button className="btn-level-glass font-bold-medium" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#FFF' }}>Request Bundle</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  };

  // ==========================================
  // CREW LANDING VIEW (Crew Marketplace)
  // ==========================================
  const renderCrewPage = () => {
    const crewRoles = [
      { id: "cinematographers", name: "Cinematographers", count: "120+ pros", icon: "🎥", desc: "Directors of photography, camera operators, and assistants." },
      { id: "directors", name: "Directors", count: "80+ pros", icon: "🎬", desc: "Creative directors, assistants, and script supervisors." },
      { id: "editors", name: "Editors", count: "95+ pros", icon: "✂️", desc: "Video editors, colorists, and motion designers." },
      { id: "sound", name: "Sound Designers", count: "60+ pros", icon: "🔊", desc: "Field recordists, sound mixers, and post designers." },
      { id: "production", name: "Production Assistants", count: "150+ pros", icon: "📋", desc: "PAs, line producers, and floor managers." },
      { id: "makeup", name: "Makeup Artists", count: "45+ pros", icon: "💄", desc: "Stylists, makeup designers, and hair specialists." },
      { id: "lighting", name: "Lighting Crew", count: "70+ pros", icon: "💡", desc: "Gaffers, sparks, and board operators." },
      { id: "grip", name: "Grip & Rigging", count: "55+ pros", icon: "⚙️", desc: "Key grips, dollies, and crane operators." }
    ];

    const featuredPros = [
      { name: "Rohan Sharma", role: "Director of Photography", rating: "4.9", shoots: "120+", price: "₹15,000/day", initial: "RS", color: "#7C3AED" },
      { name: "Aarav Mehta", role: "Fashion Photographer", rating: "4.8", shoots: "90+", price: "₹12,000/day", initial: "AM", color: "#3B82F6" },
      { name: "Sneha Patel", role: "Video Editor & Colorist", rating: "4.9", shoots: "150+", price: "₹8,000/day", initial: "SP", color: "#F59E0B" },
      { name: "Nikhil Verma", role: "Sound Engineer & Designer", rating: "4.7", shoots: "80+", price: "₹10,000/day", initial: "NV", color: "#EC4899" }
    ];

    const steps = [
      { num: "🔍", title: "Search & Filter", desc: "Browse through portfolios, rates, and reviews of verified crew members." },
      { num: "🖋️", title: "Submit Offer & Escrow", desc: "Send a booking request and secure the daily rate in ZO1 escrow." },
      { num: "✅", title: "Complete & Release", desc: "Your shoot goes smoothly, and funds are released after crew completes the day." }
    ];

    const advantages = [
      { icon: "🛡️", title: "Verified Portfolios", desc: "We physically inspect and verify all demo reels, portfolios, and past project credits." },
      { icon: "🔒", title: "Escrow Protection", desc: "Funds are held securely by ZO1 and only released when the job is completed successfully." },
      { icon: "🔄", title: "Backup Crew Guarantee", desc: "If a crew member cancels or cannot show up, we find a vetted replacement within 2 hours." },
      { icon: "⚡", title: "Instant Booking", desc: "Secure crew members directly from their calendar slots with real-time daily availability." }
    ];

    const showcase = [
      { title: "FASHION BRAND TVC", subtitle: "Cinematography & Editing", style: { background: "linear-gradient(135deg, #4A154B 0%, #1A0D2E 100%)" } },
      { title: "INDEPENDENT FEATURE", subtitle: "Full Camera & Sound Crew", style: { background: "linear-gradient(135deg, #4F1D08 0%, #1A0C05 100%)" } },
      { title: "TRAVEL DOCUMENTARY", subtitle: "Drone & Editing", style: { background: "linear-gradient(135deg, #0A2E2B 0%, #031412 100%)" } }
    ];

    const testimonials = [
      { text: "Hired a complete 5-member camera crew for our indie feature. The team was highly professional and on time.", author: "Amit Sen", role: "Director, 'Shadows'" },
      { text: "The escrow payment system gives us absolute peace of mind. We always hire our editors and sound designers here.", author: "Meera Shah", role: "Producer, 'Out of Focus'" },
      { text: "Had a last-minute crew cancellation, and ZO1 support found a replacement cinematographer in under 90 minutes. Incredible service!", author: "Rajesh Kumar", role: "Creative Director" }
    ];

    return (
      <div className="crew-landing-view container">
        {/* HERO SECTION */}
        <div className="crew-hero-section">
          <div className="crew-hero-text">
            <span className="crew-badge-tag">👥 ON-DEMAND CREW MARKETPLACE</span>
            <h1>
              Hire Verified <br />
              <span className="text-gradient">Film Crew</span> <br />
              In Minutes
            </h1>
            <p className="crew-hero-subtitle">
              Connect with thousands of vetted cinematographers, directors, editors, sound designers, and production crew for your next project.
            </p>

            <div className="crew-hero-buttons">
              <button className="btn-crew-primary" onClick={() => {
                const el = document.getElementById("crew-roles-section");
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}>Find Crew</button>
              <button className="btn-crew-outline">Become Crew</button>
            </div>

            <div className="crew-hero-checkpoints">
              <span>✓ Verified Portfolios</span>
              <span>✓ Secure Escrow Payments</span>
              <span>✓ Backup Crew Guarantee</span>
            </div>
          </div>

          {/* RIGHT GRAPHIC PANEL */}
          <div className="crew-hero-graphic">
            <div className="crew-graphic-panel glass">
              <div className="crew-panel-header">
                <span className="window-dot red"></span>
                <span className="window-dot yellow"></span>
                <span className="window-dot green"></span>
                <span className="panel-title-text">Top Production Crew</span>
              </div>
              <div className="crew-panel-list">
                {featuredPros.slice(0, 3).map((pro, index) => (
                  <div className="crew-mini-card glass" key={index}>
                    <div className="pro-avatar-circle" style={{ background: pro.color }}>{pro.initial}</div>
                    <div className="pro-mini-details">
                      <h4>{pro.name}</h4>
                      <p>{pro.role}</p>
                      <div className="pro-meta-info">
                        <span>★ {pro.rating}</span>
                        <span>• {pro.shoots} shoots</span>
                      </div>
                    </div>
                    <span className="pro-mini-price">{pro.price}</span>
                  </div>
                ))}
              </div>
              <div className="crew-panel-timeline">
                <div className="timeline-header">
                  <span>Escrow Milestone Status</span>
                  <span className="timeline-status">Active</span>
                </div>
                <div className="timeline-progress-bar">
                  <div className="timeline-fill" style={{ width: "75%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 STATS ROW */}
        <div className="crew-stats-row margin-top-lg">
          <div className="crew-stat-unit glass">
            <h3>5000+</h3>
            <p>Vetted Professionals</p>
          </div>
          <div className="crew-stat-unit glass">
            <h3>1200+</h3>
            <p>Successful Projects</p>
          </div>
          <div className="crew-stat-unit glass">
            <h3>50+</h3>
            <p>Crew Roles Available</p>
          </div>
          <div className="crew-stat-unit glass">
            <h3>98%</h3>
            <p>Satisfaction Rate</p>
          </div>
        </div>

        {/* FIND TALENT BY CATEGORY */}
        <div className="crew-section-block" id="crew-roles-section">
          <span className="blog-badge-tag bg-purple-outline">DISCOVER ROLES</span>
          <h2>Find Talent By <span className="text-gradient-purple-pink">Category</span></h2>
          <p className="section-description-text">Find the right professional for every stage of your production.</p>

          <div className="crew-roles-grid margin-top-sm">
            {crewRoles.map((role) => (
              <div className="crew-role-card glass" key={role.id}>
                <span className="role-icon">{role.icon}</span>
                <h3>{role.name}</h3>
                <p>{role.desc}</p>
                <span className="role-pros-badge">{role.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TOP RATED PROFESSIONALS */}
        <div className="crew-section-block">
          <span className="blog-badge-tag bg-purple-outline">VETTED EXPERTS</span>
          <h2>Top Rated <span className="text-gradient-purple-pink">Professionals</span></h2>
          <p className="section-description-text">Work with award-winning creators with verified industry experience.</p>

          <div className="crew-pros-grid margin-top-sm">
            {featuredPros.map((pro, index) => (
              <div className="crew-pro-profile-card glass" key={index}>
                <div className="pro-gradient-header" style={{ background: `linear-gradient(135deg, ${pro.color} 0%, rgba(0,0,0,0.8) 100%)` }}>
                  <div className="pro-avatar-bubble" style={{ background: pro.color }}>{pro.initial}</div>
                </div>
                <div className="pro-profile-body text-center">
                  <h4>{pro.name}</h4>
                  <p className="pro-profile-role">{pro.role}</p>
                  <div className="pro-profile-rating">
                    <span>★ {pro.rating}</span>
                    <span className="divider">•</span>
                    <span>{pro.shoots} Shoots</span>
                  </div>
                  <div className="pro-profile-rate-val">Daily Rate: {pro.price}</div>
                  <button className="btn-hire-crew">Hire {pro.name.split(' ')[0]}</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 SIMPLE STEPS */}
        <div className="crew-section-block steps-section">
          <span className="blog-badge-tag bg-purple-outline">HOW IT WORKS</span>
          <h2>Book Now in <span className="text-gradient-purple-pink">3 Simple Steps</span></h2>
          <p className="section-description-text">Hiring professional film crew has never been easier.</p>

          <div className="crew-steps-row margin-top-sm">
            <div className="connecting-line-crew"></div>
            {steps.map((step, idx) => (
              <div className="crew-step-card text-center" key={idx}>
                <div className="step-number-bubble">{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BUILT FOR MODERN CREATOR */}
        <div className="crew-section-block">
          <span className="blog-badge-tag bg-purple-outline">ZO1 ADVANTAGES</span>
          <h2>Built for the <span className="text-gradient-purple-pink">Modern Creator</span></h2>
          <p className="section-description-text">Everything you need to manage your crew team in one dashboard.</p>

          <div className="crew-advantages-grid margin-top-sm">
            {advantages.map((adv, idx) => (
              <div className="crew-advantage-card glass" key={idx}>
                <span className="advantage-icon">{adv.icon}</span>
                <h4>{adv.title}</h4>
                <p>{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* WORK THAT SPEAKS VOLUMES */}
        <div className="crew-section-block">
          <span className="blog-badge-tag bg-purple-outline">CREW SHOWCASE</span>
          <h2>Work That <span className="text-gradient-purple-pink">Speaks Volumes</span></h2>
          <p className="section-description-text">Explore recent projects completed by verified crew members on ZO1.</p>

          <div className="crew-showcase-grid margin-top-sm">
            {showcase.map((project, idx) => (
              <div className="crew-showcase-card glass" key={idx} style={project.style}>
                <div className="showcase-card-overlay"></div>
                <div className="showcase-card-content">
                  <div className="play-button-icon">▶</div>
                  <h4>{project.title}</h4>
                  <p>{project.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WHAT CREATORS ARE SAYING */}
        <div className="crew-section-block">
          <span className="blog-badge-tag bg-purple-outline">TESTIMONIALS</span>
          <h2>What <span className="text-gradient-purple-pink">Creators Are Saying</span></h2>
          <p className="section-description-text">Hear from directors, producers, and creators who built their crews on ZO1.</p>

          <div className="crew-testimonials-grid margin-top-sm">
            {testimonials.map((test, idx) => (
              <div className="crew-testimonial-card glass" key={idx}>
                <p className="testimonial-text">"{test.text}"</p>
                <div className="testimonial-author-row">
                  <div className="author-avatar-mini">{test.author[0]}</div>
                  <div>
                    <h5>{test.author}</h5>
                    <p>{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WIDE BOTTOM BANNER */}
        <div className="blog-showcase-row-container width-100 max-width-1100 margin-top-lg margin-bottom-lg">
          <div className="intel-hub-wide-card glass">
            <div className="intel-glow-purple"></div>
            <div className="intel-layout-grid flex-column-mobile text-center-mobile">
              <div className="intel-text-side">
                <h2>Build Your Dream Production Team</h2>
                <p>Connect with verified professionals and scale your crew team in minutes.</p>
              </div>
              <div className="flex-center-row-gap flex-column-mobile">
                <button className="btn-crew-primary font-bold-medium">Hire Crew Now</button>
                <button className="btn-crew-outline-light font-bold-medium">Join as Crew</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

  // ==========================================
  // HOW IT WORKS VIEW (Studio Booking Guide/Overview)
  // ==========================================
  const renderHowItWorksPage = () => {
    const categories = [
      { id: "filmmaking", name: "Filmmaking Studios", count: "110+ spaces", icon: "🎬", desc: "Equipped with grids, cycloramas, and cinema light packages." },
      { id: "podcast", name: "Podcast Rooms", count: "75+ spaces", icon: "🎙️", desc: "Acoustically treated multi-mic recording setups." },
      { id: "chroma", name: "Chroma Setups", count: "90+ spaces", icon: "🟢", desc: "Green and blue screens with pre-lit lighting grids." },
      { id: "lounge", name: "Cozy Lounges", count: "60+ spaces", icon: "🛋️", desc: "Natural light lifestyle sets for interviews and lifestyle shoots." },
      { id: "minimalist", name: "Minimalist Interiors", count: "45+ spaces", icon: "🖼️", desc: "Modern aesthetic apartments, offices, and loft spaces." }
    ];

    const featuredStudios = [
      { name: "Green Screen Studio", location: "Andheri West, Mumbai", rating: "4.9", price: "₹1,500/hr", specs: "1200 sq.ft • 12+ Lights • 30+ Crew", features: ["Chroma Screen", "Pro Lights", "Soundproofed"], color: "#7C3AED" },
      { name: "Podcast & Talkshow Studio", location: "Bandra West, Mumbai", rating: "4.8", price: "₹1,200/hr", specs: "800 sq.ft • 4+ Mics • Full Setup", features: ["Acoustic Panels", "4K Cam", "Sound Engineer"], color: "#3B82F6" },
      { name: "Cozy Living Room Set Studio", location: "Goregaon East, Mumbai", rating: "4.9", price: "₹1,800/hr", specs: "1500 sq.ft • Natural Light • Prop Set", features: ["Decor Furniture", "Warm Lights", "Makeup Room"], color: "#F59E0B" },
      { name: "Guindy Green Screen Hub", location: "Guindy, Chennai", rating: "4.7", price: "₹1,400/hr", specs: "1000 sq.ft • Pre-lit Grid • Soundproofed", features: ["A/C", "Sparks Included", "Makeup Station"], color: "#EC4899" }
    ];

    const amenities = [
      { icon: "💡", title: "Professional Lighting", desc: "High-end LED panels, softboxes, and spotlights ready for use." },
      { icon: "⚡", title: "Power Backup & AC", desc: "Continuous power supply with silent generator backups and central AC." },
      { icon: "💄", title: "Makeup & Dressing", desc: "Dedicated makeup stations with professional vanity mirrors and changing rooms." },
      { icon: "🔊", title: "Soundproofing", desc: "Acoustically treated sets and rooms designed for crystal-clear audio recording." },
      { icon: "📋", title: "Production Assistants", desc: "On-site studio assistant available to help with set setup and logistics." },
      { icon: "☕", title: "Comfortable Lounges", desc: "Spacious waiting areas with WiFi, coffee, and refreshments for crew." }
    ];

    const steps = [
      { num: "1", title: "Choose & Filter", desc: "Select dates, hours, and filter by required specs and amenities." },
      { num: "2", title: "Reserve & Pay 20%", desc: "Secure your booking slot by paying a 20% deposit through ZO1 escrow." },
      { num: "3", title: "Shoot & Conclude", desc: "Arrive at the studio for your shoot and pay the balance directly to the host." }
    ];

    const gallery = [
      { title: "Filmmaking Studio Set", subtitle: "Ambience Design", color: "#4A154B", style: { background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)" } },
      { title: "Podcast Room Setup", subtitle: "Acoustically Treated", color: "#3B82F6", style: { background: "linear-gradient(135deg, #451a03 0%, #1c1917 100%)" } },
      { title: "Chroma Key Studio", subtitle: "Green Screen Pre-lit", color: "#10B981", style: { background: "linear-gradient(135deg, #022c22 0%, #064e3b 100%)" } },
      { title: "Cozy Living Room Set", subtitle: "Natural Sunlight", color: "#F59E0B", style: { background: "linear-gradient(135deg, #2e1065 0%, #1e1b4b 100%)" } },
      { title: "Industrial Warehouse Set", subtitle: "High Ceilings", color: "#EC4899", style: { background: "linear-gradient(135deg, #030712 0%, #1f2937 100%)" } }
    ];

    const advantages = [
      { icon: "🛡️", title: "100% Vetted Spaces", desc: "Every studio is physically inspected by our trust and safety team." },
      { icon: "🔄", title: "Flexible Booking", desc: "Cancel or modify your bookings easily up to 48 hours before shoot." },
      { icon: "🔒", title: "Escrow Security", desc: "Payments are held safely in escrow and only released after shoot day." },
      { icon: "⚡", title: "Instant Confirmation", desc: "Get immediate booking approval with live host calendars." }
    ];

    const testimonials = [
      { text: "Booking a studio through ZO1 was incredibly easy. The space was exactly as described, and the host was super cooperative.", author: "Amit Roy", role: "Director" },
      { text: "We saved hours of back-and-forth calls. Having live calendars and instant confirmations is a game changer.", author: "Priya Sen", role: "Photographer" },
      { text: "The power backup and amenities were superb. Will definitely book our next commercial shoot here.", author: "Rohan Mehta", role: "Producer" }
    ];

    return (
      <div className="how-page-view container">
        {/* HERO SECTION */}
        <div className="how-hero-section">
          <div className="how-hero-text">
            <span className="how-badge-tag">🏢 ONLINE STUDIO BOOKING PLATFORM</span>
            <h1>
              Book Professional <br />
              <span className="text-gradient">Studios</span> In <br />
              Minutes
            </h1>
            <p className="how-hero-subtitle">
              Connect with verified film studios, podcast rooms, chroma sets, and creative spaces across the country.
            </p>

            <div className="how-hero-buttons">
              <button className="btn-how-primary" onClick={() => {
                const el = document.getElementById("explore-studio-categories");
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}>Explore Studios</button>
              <button className="btn-how-outline">List Your Space</button>
            </div>

            <div className="how-hero-checkpoints">
              <span>✓ Real-time Availability</span>
              <span>✓ Secure Escrow</span>
              <span>✓ Instant Booking</span>
            </div>
          </div>

          {/* HERO GRAPHIC: CALENDAR PANEL */}
          <div className="how-hero-graphic">
            <div className="how-calendar-panel glass">
              <div className="calendar-panel-header">
                <span className="window-dot red"></span>
                <span className="window-dot yellow"></span>
                <span className="window-dot green"></span>
                <span className="panel-title-text">Studio Calendar booking</span>
              </div>
              <div className="calendar-meta-row">
                <div className="meta-stat">
                  <span className="meta-label">Selected Date</span>
                  <span className="meta-val">July 12, 2026</span>
                </div>
                <div className="meta-stat">
                  <span className="meta-label">Time Slots</span>
                  <span className="meta-val">4 Hours (Shift A)</span>
                </div>
              </div>
              <div className="calendar-date-grid">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28].map((day) => (
                  <div key={day} className={`calendar-day-cell ${day === 12 ? 'active' : ''} ${[5, 14, 22].includes(day) ? 'booked' : ''}`}>
                    {day}
                  </div>
                ))}
              </div>
              <div className="calendar-panel-footer">
                <span className="est-total-label">Total Escrow Protection</span>
                <span className="est-total-val">₹6,000</span>
              </div>
            </div>
          </div>
        </div>

        {/* SUB-TABS CATEGORY FILTER */}
        <div className="how-subnav-filter glass margin-top-lg">
          {["All", "Chroma", "Podcast", "Lounge", "Office", "Minimalist", "Warehouse"].map((tab) => (
            <button
              key={tab}
              className={`subnav-filter-btn ${activeHowTab === tab ? 'active' : ''}`}
              onClick={() => setActiveHowTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* EXPLORE STUDIO CATEGORIES */}
        <div className="how-section-block" id="explore-studio-categories">
          <span className="blog-badge-tag bg-purple-outline">CATEGORIES</span>
          <h2>Explore Studio <span className="text-gradient-purple-pink">Categories</span></h2>
          <p className="section-description-text">Find the right space optimized for your specific production needs.</p>

          <div className="how-categories-grid margin-top-sm">
            {categories.map((cat) => (
              <div className="how-category-card glass" key={cat.id}>
                <span className="cat-icon-large">{cat.icon}</span>
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
                <span className="cat-spaces-badge">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURED STUDIOS NEAR YOU */}
        <div className="how-section-block">
          <span className="blog-badge-tag bg-purple-outline">FEATURED SPACES</span>
          <h2>Featured Studios <span className="text-gradient-purple-pink">Near You</span></h2>
          <p className="section-description-text">Explore top-rated verified studio spaces recommended for your shoot.</p>

          <div className="how-studios-grid margin-top-sm">
            {featuredStudios.map((studio, index) => (
              <div className="how-studio-card glass" key={index}>
                <div className="studio-card-media-header" style={{ background: `linear-gradient(135deg, ${studio.color} 0%, rgba(0,0,0,0.85) 100%)` }}>
                  <span className="studio-rating-pill">★ {studio.rating}</span>
                </div>
                <div className="studio-card-details-body">
                  <h4>{studio.name}</h4>
                  <p className="studio-location-tag"><MapPin size={10} /> {studio.location}</p>
                  <p className="studio-specs-tag">{studio.specs}</p>
                  <div className="studio-features-list-row">
                    {studio.features.map((feat, idx) => (
                      <span className="feat-chip" key={idx}>{feat}</span>
                    ))}
                  </div>
                  <div className="studio-card-action-row">
                    <span className="studio-hourly-rate">{studio.price}</span>
                    <button className="btn-book-studio">Book Space</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EVERYTHING YOU NEED FOR PRODUCTION */}
        <div className="how-section-block">
          <span className="blog-badge-tag bg-purple-outline">STUDIO AMENITIES</span>
          <h2>Everything You Need <span className="text-gradient-purple-pink">For Production</span></h2>
          <p className="section-description-text">All studio spaces listed on ZO1 come fully equipped with essential amenities.</p>

          <div className="how-amenities-grid margin-top-sm">
            {amenities.map((amenity, idx) => (
              <div className="how-amenity-card glass" key={idx}>
                <span className="amenity-icon-block">{amenity.icon}</span>
                <h4>{amenity.title}</h4>
                <p>{amenity.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BOOK YOUR STUDIO IN 3 STEPS */}
        <div className="how-section-block steps-section">
          <span className="blog-badge-tag bg-purple-outline">HOW IT WORKS</span>
          <h2>Book Your Studio in <span className="text-gradient-purple-pink">3 Simple Steps</span></h2>
          <p className="section-description-text">Reserve your creative space instantly with no hassle.</p>

          <div className="how-steps-row margin-top-sm">
            <div className="connecting-line-how"></div>
            {steps.map((step, idx) => (
              <div className="how-step-card text-center" key={idx}>
                <div className="step-number-bubble-how">{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SPACES BUILT FOR CINEMA (GALLERY) */}
        <div className="how-section-block">
          <span className="blog-badge-tag bg-purple-outline">STUDIO GALLERY</span>
          <h2>Spaces Built <span className="text-gradient-purple-pink">For Cinema</span></h2>
          <p className="section-description-text">Take a look inside some of our premier studio listings.</p>

          <div className="how-gallery-grid margin-top-sm">
            {gallery.map((item, idx) => (
              <div className="how-gallery-card glass" key={idx} style={item.style}>
                <div className="gallery-card-overlay"></div>
                <div className="gallery-card-content">
                  <h4>{item.title}</h4>
                  <p>{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WHY CHOOSE ZO1 STUDIOS */}
        <div className="how-section-block">
          <span className="blog-badge-tag bg-purple-outline">THE ZO1 ADVANTAGE</span>
          <h2>Why Choose <span className="text-gradient-purple-pink">ZO1 Studios</span></h2>
          <p className="section-description-text">We build trust at every step of your booking process.</p>

          <div className="how-advantages-grid margin-top-sm">
            {advantages.map((adv, idx) => (
              <div className="how-advantage-card glass" key={idx}>
                <span className="advantage-icon-block">{adv.icon}</span>
                <h4>{adv.title}</h4>
                <p>{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4 BOTTOM STATS ROW */}
        <div className="how-stats-row margin-top-lg">
          <div className="how-stat-unit glass">
            <h3>500+</h3>
            <p>Verified Studios</p>
          </div>
          <div className="how-stat-unit glass">
            <h3>10,000+</h3>
            <p>Booking Hours Completed</p>
          </div>
          <div className="how-stat-unit glass">
            <h3>30+</h3>
            <p>Cities Covered</p>
          </div>
          <div className="how-stat-unit glass">
            <h3>98%</h3>
            <p>Satisfied Creators</p>
          </div>
        </div>

        {/* WHAT CREATORS ARE SAYING */}
        <div className="how-section-block">
          <span className="blog-badge-tag bg-purple-outline">TESTIMONIALS</span>
          <h2>What <span className="text-gradient-purple-pink">Creators Are Saying</span></h2>
          <p className="section-description-text">Hear from directors, photographers, and producers who booked through ZO1.</p>

          <div className="how-testimonials-grid margin-top-sm">
            {testimonials.map((test, idx) => (
              <div className="how-testimonial-card glass" key={idx}>
                <p className="testimonial-text">"{test.text}"</p>
                <div className="testimonial-author-row">
                  <div className="author-avatar-mini-how">{test.author[0]}</div>
                  <div>
                    <h5>{test.author}</h5>
                    <p>{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OWN A STUDIO HOST SECTION */}
        <div className="blog-showcase-row-container width-100 max-width-1100 margin-top-lg">
          <div className="intel-hub-wide-card glass">
            <div className="intel-glow-purple"></div>
            <div className="intel-layout-grid flex-column-mobile text-center-mobile">
              <div className="intel-text-side">
                <span className="blog-badge-tag bg-purple">HOSTING OPPORTUNITY</span>
                <h2>Own A Studio?</h2>
                <p>List your studio on ZO1 and start earning from thousands of creative professionals in your city.</p>
                <div className="host-action-buttons margin-top-sm">
                  <button className="btn-how-primary font-bold-medium">List Your Studio</button>
                  <button className="btn-how-outline font-bold-medium" style={{ marginLeft: "0.75rem" }}>How Hosting Works</button>
                </div>
              </div>
              <div className="host-estimate-earnings-side text-center">
                <span className="estimate-label">Earn up to</span>
                <h3>₹{hostEarnings.toLocaleString()}/month</h3>
                <input
                  type="range"
                  min="30000"
                  max="300000"
                  step="5000"
                  value={hostEarnings}
                  onChange={(e) => setHostEarnings(parseInt(e.target.value))}
                  className="earnings-slider"
                />
                <span className="slider-hint-text">Adjust slider to calculate monthly earnings estimate</span>
              </div>
            </div>
          </div>
        </div>
 
        {/* FIND THE PERFECT STUDIO BOTTOM BANNER */}
        <div className="blog-showcase-row-container width-100 font-padding-lg max-width-1100 margin-top-lg margin-bottom-lg">
          <div className="intel-hub-wide-card glass" style={{ background: "linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(0,0,0,0.85) 100%)" }}>
            <div className="intel-glow-purple"></div>
            <div className="intel-layout-grid flex-column-mobile text-center-mobile">
              <div className="intel-text-side">
                <h2>Find The Perfect Studio For Your Next Production</h2>
                <p>Connect with verified spaces and book your studio slot instantly.</p>
              </div>
              <div className="flex-center-row-gap flex-column-mobile">
                <button className="btn-how-primary font-bold-medium">Explore Studios Now</button>
                <button className="btn-how-outline-light font-bold-medium">Contact Support</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      {/* BACKGROUND ORBS */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      {/* NAVBAR */}
      <nav className="navbar glass">
        <div className="container nav-content">
          <div className="logo-section" onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>
            <div className="logo-icon">
              <Sparkles className="logo-spark" size={18} />
            </div>
            <span className="logo-text">ZO1</span>
          </div>

          <div className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`}>
            <a
              href="#home"
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setCurrentPage('home'); setMobileMenuOpen(false); }}
            >
              Home
            </a>
            <a
              href="#production"
              className={`nav-link ${currentPage === 'production' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setCurrentPage('production'); setMobileMenuOpen(false); }}
            >
              Production
            </a>
            <a
              href="#booking"
              className={`nav-link ${currentPage === 'booking' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setCurrentPage('booking'); setMobileMenuOpen(false); }}
            >
              Booking
            </a>
            <a
              href="#blog"
              className={`nav-link ${currentPage === 'blog' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setCurrentPage('blog'); setMobileMenuOpen(false); }}
            >
              Blog
            </a>
            <a
              href="#crew"
              className={`nav-link ${currentPage === 'crew' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setCurrentPage('crew'); setMobileMenuOpen(false); }}
            >
              Crew
            </a>
            <a
              href="#how-it-works"
              className={`nav-link ${currentPage === 'how-it-works' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setCurrentPage('how-it-works'); setMobileMenuOpen(false); }}
            >
              How It Works
            </a>
            <a
              href="#help"
              className={`nav-link ${currentPage === 'help' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setCurrentPage('help'); setMobileMenuOpen(false); }}
            >
              Help and Docs
            </a>
          </div>

          <div className="nav-actions">
            <button className="btn-signin">Sign In</button>
            <button className="btn-primary">Get Started</button>
          </div>

          <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* CONDITIONAL PAGES RENDER */}

      {/* HOME PAGE VIEW */}
      {currentPage === 'home' && (
        <>
          {/* HERO SECTION */}
          <header className="hero-section">
            <div className="container hero-grid">
              {/* LEFT COLUMN */}
              <div className="hero-text-content">
                <div className="app-badge">
                  <span className="badge-dot"></span>
                  ZO1 App
                </div>

                <h1 className="hero-title">
                  Book <span className="text-gradient">Studios</span>, <br />
                  <span className="text-accent-gradient">Cameras & Crew</span> <br />
                  in Minutes
                </h1>

                {/* TAB SELECTOR */}
                <div className="hero-tabs-selector">
                  <button
                    className={`hero-tab-btn ${activeHeroTab === 'studios' ? 'active' : ''}`}
                    onClick={() => setActiveHeroTab('studios')}
                  >
                    Book Studios
                  </button>
                  <button
                    className={`hero-tab-btn ${activeHeroTab === 'equipment' ? 'active' : ''}`}
                    onClick={() => setActiveHeroTab('equipment')}
                  >
                    Rent Cameras
                  </button>
                  <button
                    className={`hero-tab-btn ${activeHeroTab === 'crew' ? 'active' : ''}`}
                    onClick={() => setActiveHeroTab('crew')}
                  >
                    Hire Crew
                  </button>
                </div>

                {/* DOWNLOAD BUTTONS */}
                <div className="download-buttons">
                  <a href="#app-store" className="store-btn">
                    <span className="store-icon"></span>
                    <div className="store-btn-text">
                      <span className="sub">Download on the</span>
                      <span className="main">App Store</span>
                    </div>
                  </a>

                  <a href="#play-store" className="store-btn">
                    <span className="store-icon">▶</span>
                    <div className="store-btn-text">
                      <span className="sub">GET IT ON</span>
                      <span className="main">Google Play</span>
                    </div>
                  </a>
                </div>

                <p className="hero-subtext">
                  Available on iOS and Android. Rated 4.9/5 by 10k+ creators.
                </p>
              </div>

              <div className="hero-graphic-content-ref">
                <div className="hero-right-card-wrap">
                  {/* TOP RIGHT BADGE */}
                  <div className="hero-vendors-badge">
                    <span className="vendors-badge-icon">🛡️</span>
                    <span className="vendors-badge-text">500+ Verified Vendors</span>
                  </div>

                  {/* FLOATING CLIENTS BADGE */}
                  <div className="badge-floating glass">
                    <Users size={16} className="text-lavender" />
                    <div>
                      <div className="badge-val">500+</div>
                      <div className="badge-lbl">Active Studios</div>
                    </div>
                  </div>

                  {/* DESKTOP DASHBOARD MOCKUP */}
                  <div className="desktop-mockup glass">
                    <div className="window-header">
                      <div className="window-dot red"></div>
                      <div className="window-dot yellow"></div>
                      <div className="window-dot green"></div>
                      <div className="window-search-bar">
                        <Search size={12} className="text-muted" />
                        <span>Search studios, cameras or crew...</span>
                      </div>
                    </div>

                    <div className="window-layout">
                      {/* SIDEBAR */}
                      <aside className="window-sidebar">
                        <div className="sb-item active"><Video size={16} /></div>
                        <div className="sb-item"><Camera size={16} /></div>
                        <div className="sb-item"><Users size={16} /></div>
                        <div className="sb-item"><Calendar size={16} /></div>
                      </aside>

                      {/* MAIN PANEL */}
                      <main className="window-main">
                        <div className="panel-title-bar">
                          <h3>Search Results</h3>
                          <span className="panel-badge">Featured</span>
                        </div>

                        {/* MOCKUP CONTENT BASED ON SELECTED TAB */}
                        {activeHeroTab === 'studios' && (
                          <div className="mock-grid">
                            <div className="mock-card">
                              <div className="mock-img-placeholder green-screen">
                                <span className="mock-tag">₹1,500/hr</span>
                              </div>
                              <h4>Vibe Green Studio</h4>
                              <p>Andheri West, Mumbai</p>
                              <div className="mock-rating"><Star size={10} fill="currentColor" /> 4.9</div>
                            </div>
                            <div className="mock-card">
                              <div className="mock-img-placeholder podcast">
                                <span className="mock-tag">₹1,200/hr</span>
                              </div>
                              <h4>Podcast Pro Room</h4>
                              <p>Bandra West, Mumbai</p>
                              <div className="mock-rating"><Star size={10} fill="currentColor" /> 4.8</div>
                            </div>
                          </div>
                        )}

                        {activeHeroTab === 'equipment' && (
                          <div className="mock-grid">
                            <div className="mock-card">
                              <div className="mock-img-placeholder camera">
                                <span className="mock-tag">₹5,000/day</span>
                              </div>
                              <h4>Sony FX6 Kit</h4>
                              <p>High-End Camera</p>
                              <div className="mock-rating"><Star size={10} fill="currentColor" /> 4.9</div>
                            </div>
                            <div className="mock-card">
                              <div className="mock-img-placeholder camera">
                                <span className="mock-tag">₹4,000/day</span>
                              </div>
                              <h4>Canon EOS R5</h4>
                              <p>8K Mirrorless Kit</p>
                              <div className="mock-rating"><Star size={10} fill="currentColor" /> 4.9</div>
                            </div>
                          </div>
                        )}

                        {activeHeroTab === 'crew' && (
                          <div className="mock-grid">
                            <div className="mock-card user">
                              <div className="mock-avatar bg-purple">RS</div>
                              <h4>Rohan Sharma</h4>
                              <p>Director of Photography</p>
                              <div className="mock-rating">₹15k/day</div>
                            </div>
                            <div className="mock-card user">
                              <div className="mock-avatar bg-pink">SP</div>
                              <h4>Sneha Patel</h4>
                              <p>Editor & Colorist</p>
                              <div className="mock-rating">₹8k/day</div>
                            </div>
                          </div>
                        )}
                      </main>
                    </div>
                  </div>

                  {/* OVERLAPPING MOBILE PHONE LEFT */}
                  <div className="mobile-mockup phone-left glass">
                    <div className="phone-screen">
                      <div className="phone-notch"></div>
                      <div className="phone-header">
                        <span className="phone-title">Studio Detail</span>
                      </div>
                      <div className="phone-body">
                        <div className="phone-banner green-screen"></div>
                        <h5>Chroma Set Alpha</h5>
                        <p className="phone-meta"><MapPin size={10} /> Andheri, Mumbai</p>
                        <div className="phone-divider"></div>
                        <div className="phone-spec-row">
                          <span>Rent Rate:</span>
                          <strong className="text-lavender">₹1,500/hr</strong>
                        </div>
                        <button className="phone-btn">Proceed to Book</button>
                      </div>
                    </div>
                  </div>

                  {/* OVERLAPPING MOBILE PHONE RIGHT */}
                  <div className="mobile-mockup phone-right glass">
                    <div className="phone-screen">
                      <div className="phone-notch"></div>
                      <div className="phone-header">
                        <span className="phone-title">Checkout</span>
                      </div>
                      <div className="phone-body">
                        <div className="phone-success-icon">
                          <CheckCircle size={24} className="text-success" />
                        </div>
                        <h5>Booking Confirmed</h5>
                        <p className="phone-desc">Studio Room 1A booked successfully for July 12.</p>
                        <div className="phone-receipt glass">
                          <div>Total Paid</div>
                          <div className="receipt-total">₹6,000</div>
                        </div>
                        <button className="phone-btn secondary">Done</button>
                      </div>
                    </div>
                  </div>

                  {/* FLOATING BARS AT THE BOTTOM */}
                  <div className="floating-bottom-pills glass">
                    <span className={activeHeroTab === 'studios' ? 'active' : ''} onClick={() => setActiveHeroTab('studios')}>Studios</span>
                    <span className={activeHeroTab === 'equipment' ? 'active' : ''} onClick={() => setActiveHeroTab('equipment')}>Equipment</span>
                    <span className={activeHeroTab === 'crew' ? 'active' : ''} onClick={() => setActiveHeroTab('crew')}>Crew</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* QUICK CATEGORIES */}
          <section className="section-categories container" id="play">
            <div className="section-header">
              <div>
                <span className="section-badge">Fast Search</span>
                <h2 className="section-title">Quick <span className="text-gradient">Categories</span></h2>
                <p className="section-subtitle">Find everything you need for your next production in minutes.</p>
              </div>
              <a href="#explore" className="btn-view-all">Explore All <ChevronRight size={16} /></a>
            </div>

            <div className="categories-grid">
              <div className="category-card studios-cat glass">
                <div className="cat-overlay"></div>
                <div className="cat-bg-img" style={{ backgroundImage: `url('/living_room_studio.png')` }}></div>
                <div className="cat-content">
                  <span className="cat-badge">200+ Options</span>
                  <h3>Studio Spaces</h3>
                  <p>Chroma sets, podcast rooms, cozy lounges, and theater layouts.</p>
                  <div className="cat-footer">
                    <span>View Studios</span>
                    <ArrowRight size={16} className="cat-arrow" />
                  </div>
                </div>
              </div>

              <div className="category-card equipment-cat glass">
                <div className="cat-overlay"></div>
                <div className="cat-bg-img" style={{ backgroundImage: `url('/cinema_camera.png')` }}></div>
                <div className="cat-content">
                  <span className="cat-badge">Pro Gear</span>
                  <h3>Equipment Rentals</h3>
                  <p>Top cinematic camera bodies, professional primes/zooms, advanced gimbal rigs, lights, and field mixers.</p>
                  <div className="cat-footer">
                    <span>Rent Gear</span>
                    <ArrowRight size={16} className="cat-arrow" />
                  </div>
                </div>
              </div>

              <div className="category-card small-cat actors-cat glass">
                <div className="cat-overlay"></div>
                <div className="cat-bg-img" style={{ backgroundImage: `url('/green_screen_studio.png')` }}></div>
                <div className="cat-content">
                  <h3>Actors & Models</h3>
                  <p>Professional casting directory.</p>
                  <div className="cat-footer">
                    <span>Find Talent</span>
                    <ArrowRight size={16} className="cat-arrow" />
                  </div>
                </div>
              </div>

              <div className="category-card small-cat directors-cat glass">
                <div className="cat-overlay"></div>
                <div className="cat-bg-img" style={{ backgroundImage: `url('/podcast_studio.png')` }}></div>
                <div className="cat-content">
                  <h3>Directors & Crew</h3>
                  <p>Top production minds.</p>
                  <div className="cat-footer">
                    <span>Hire Team</span>
                    <ArrowRight size={16} className="cat-arrow" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FEATURED STUDIOS */}
          <section className="section-studios container" id="studios">
            <div className="section-header">
              <div>
                <span className="section-badge">Top Picks</span>
                <h2 className="section-title">Featured <span className="text-gradient">Studios</span></h2>
                <p className="section-subtitle">Top-rated studios recommended for your production.</p>
              </div>
              <div className="header-actions">
                <input
                  type="text"
                  placeholder="Search by area..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input glass"
                />
                <a href="#studios-all" className="btn-view-all">View all <ChevronRight size={16} /></a>
              </div>
            </div>

            <div className="cards-grid">
              {filteredStudios.map(studio => (
                <div className="studio-card glass" key={studio.id}>
                  <div className="studio-img-wrapper">
                    <img src={studio.image} alt={studio.title} className="studio-img" />
                    <span className="studio-tag">{studio.tag}</span>
                    <span className="studio-rating-badge">
                      <Star size={12} fill="currentColor" /> {studio.rating}
                    </span>
                  </div>
                  <div className="studio-info">
                    <h3>{studio.title}</h3>
                    <p className="studio-loc">
                      <MapPin size={14} className="icon-loc" /> {studio.location}
                    </p>
                    <p className="studio-specs">{studio.specs}</p>

                    <div className="studio-features">
                      {studio.features.map((f, i) => (
                        <span key={i} className="feat-pill">{f}</span>
                      ))}
                    </div>

                    <div className="card-footer">
                      <div className="price-tag">
                        <span className="price">{studio.price}</span>
                      </div>
                      <button className="btn-book">Book Slot</button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredStudios.length === 0 && (
                <div className="no-results glass">
                  <p>No studios found matching "{searchQuery}". Try another search term!</p>
                </div>
              )}
            </div>
          </section>

          {/* POPULAR EQUIPMENT */}
          <section className="section-equipment container" id="equipment">
            <div className="section-header">
              <div>
                <span className="section-badge">Top Rentals</span>
                <h2 className="section-title">Popular <span className="text-gradient">Equipment</span></h2>
                <p className="section-subtitle">Top rented gear and cameras for high-quality production.</p>
              </div>
              <a href="#equipment-all" className="btn-view-all">View all <ChevronRight size={16} /></a>
            </div>

            <div className="equipment-grid">
              {equipment.map(item => (
                <div className="equipment-card glass" key={item.id}>
                  <div className="eq-img-wrapper">
                    <img src={item.image} alt={item.title} className="eq-img" />
                    <span className="eq-tag">{item.tag}</span>
                  </div>
                  <div className="eq-info">
                    <h3>{item.title}</h3>
                    <p className="eq-specs">{item.specs}</p>
                    <div className="eq-footer">
                      <div className="eq-price">
                        <span className="price">{item.price}</span>
                      </div>
                      <button className="btn-rent">Rent Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="section-how-it-works container">
            <div className="section-header-center">
              <span className="section-badge">Process</span>
              <h2 className="section-title-center">Book Now in <span className="text-gradient">3 Simple Steps</span></h2>
              <p className="section-subtitle-center">Our simple process makes booking a breeze.</p>
            </div>

            <div className="steps-grid">
              <div className="step-card glass">
                <div className="step-num">01</div>
                <div className="step-icon-wrapper">
                  <Search size={28} className="text-lavender" />
                </div>
                <h3>Choose Studio, Gear or Crew</h3>
                <p>Browse through our wide selection of studios, gear, and crew to find the perfect match for your project.</p>
              </div>

              <div className="step-card glass">
                <div className="step-num">02</div>
                <div className="step-icon-wrapper">
                  <Calendar size={28} className="text-lavender" />
                </div>
                <h3>Select Dates & Book</h3>
                <p>Select your preferred dates and time slots, and complete the booking securely.</p>
              </div>

              <div className="step-card glass">
                <div className="step-num">03</div>
                <div className="step-icon-wrapper">
                  <CheckCircle size={28} className="text-lavender" />
                </div>
                <h3>Confirm & Get Started</h3>
                <p>Receive instant confirmation and coordinate with the host or crew for your shoot.</p>
              </div>
            </div>
          </section>

          {/* TOP CREATORS & CREW */}
          <section className="section-crew container" id="crew">
            <div className="section-header">
              <div>
                <span className="section-badge">Verified Crew</span>
                <h2 className="section-title">Top <span className="text-gradient">Creators & Crew</span></h2>
                <p className="section-subtitle">Hire skilled professionals to elevate your project.</p>
              </div>
              <a href="#crew-all" className="btn-view-all">View all <ChevronRight size={16} /></a>
            </div>

            <div className="crew-grid">
              {crew.map(member => (
                <div className="crew-card glass" key={member.id}>
                  <div className="crew-avatar-wrapper">
                    <div className="crew-avatar-ring" style={{ borderColor: member.color }}>
                      <div className="crew-avatar-letter" style={{ backgroundColor: `${member.color}22`, color: member.color }}>
                        {member.avatar}
                      </div>
                    </div>
                    <span className="crew-rating">
                      <Star size={10} fill="currentColor" /> {member.rating}
                    </span>
                  </div>

                  <div className="crew-info">
                    <h3>{member.name}</h3>
                    <p className="crew-role">{member.role}</p>
                    <div className="crew-stats">
                      <span className="shoots-count">{member.shoots} Shoots Completed</span>
                    </div>
                    <div className="crew-footer">
                      <span className="crew-price">{member.price}</span>
                      <button className="btn-hire">Hire Crew</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PROMO BANNER (SuperCoins) */}
          <section className="promo-section container">
            <div className="promo-banner-card">
              <div className="promo-glow"></div>
              <div className="promo-content">
                <div className="promo-text-side">
                  <div className="promo-badge">
                    <Coins size={14} /> Rewards
                  </div>
                  <h2>Earn 100 SuperCoins on your first booking</h2>
                  <p>Verify your email and complete your first booking to receive 100 SuperCoins. Redeem them for discounts on future bookings.</p>

                  {claimStatus === 'idle' && (
                    <button className="btn-claim" onClick={handleClaimCoins}>Claim Coins Now</button>
                  )}
                  {claimStatus === 'claiming' && (
                    <button className="btn-claim loading" disabled>Claiming...</button>
                  )}
                  {claimStatus === 'claimed' && (
                    <div className="claim-success-msg">
                      <CheckCircle size={16} /> 100 SuperCoins credited to your account!
                    </div>
                  )}
                </div>

                <div className="promo-image-side">
                  <div className="coin-floating-container">
                    <img src="/supercoin.png" alt="SuperCoin" className="img-supercoin" />
                    <div className="coin-value-badge">
                      <h3>100</h3>
                      <p>SuperCoins</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="section-testimonials container">
            <div className="section-header-center">
              <span className="section-badge">Reviews</span>
              <h2 className="section-title-center">What <span className="text-gradient">Creators Are Saying</span></h2>
              <p className="section-subtitle-center">Read reviews from our satisfied clients.</p>
            </div>

            <div className="testimonials-grid">
              {testimonials.map(item => (
                <div className="testimonial-card glass" key={item.id}>
                  <div className="quote-icon">“</div>
                  <p className="testimonial-text">{item.text}</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">{item.avatar}</div>
                    <div>
                      <h4>{item.name}</h4>
                      <p>{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* NEWSLETTER */}
          <section className="newsletter-section container">
            <div className="newsletter-card glass">
              <h3>Stay updated with production spaces</h3>
              <p>Get notified about new studios, camera packages, and verified crew members in your area.</p>

              {!emailSubscribed ? (
                <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); setEmailSubscribed(true); }}>
                  <input type="email" placeholder="Enter your email address" required className="newsletter-input glass" />
                  <button type="submit" className="btn-primary">Subscribe</button>
                </form>
              ) : (
                <div className="subscription-success">
                  <CheckCircle size={20} /> Thank you! You've been subscribed to the newsletter.
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* NEW PRODUCTION PAGE VIEW */}
      {currentPage === 'production' && (
        <div className="production-page-view container">
          {/* HEADER */}
          <div className="production-header-section">
            <div className="prod-badge-top">
              <Sparkles className="badge-spark-icon" size={12} />
              Why Creators Choose ZO1
            </div>
            <h1 className="prod-main-title">
              Everything Production Teams Need.<br />
              <span className="text-gradient">One Powerful Platform.</span>
            </h1>
            <p className="prod-main-subtitle">
              From studio discovery to equipment rentals and crew hiring, ZO1 streamlines every step of film, photography, podcast, and content production.
            </p>
          </div>

          {/* GRID OF FEATURE CARDS */}
          <div className="production-features-grid">

            {/* CARD 1: STUDIOS */}
            <div className="prod-card studios-card glass">
              <div className="prod-card-header">
                <span className="prod-icon-badge studios-badge">
                  <Video size={12} /> STUDIOS
                </span>
                <h3>Book Studios Instantly</h3>
                <p>Discover and reserve professional shooting spaces across Chennai with live availability and transparent pricing.</p>
                <ul className="prod-check-list">
                  <li><CheckCircle size={14} className="check-icon-prod" /> Real-time availability</li>
                  <li><CheckCircle size={14} className="check-icon-prod" /> Instant booking confirmation</li>
                  <li><CheckCircle size={14} className="check-icon-prod" /> 500+ verified studios</li>
                  <li><CheckCircle size={14} className="check-icon-prod" /> Secure 20% deposit system</li>
                </ul>
              </div>
              <div className="prod-card-graphic studios-graphic-area">
                {/* Floating location indicators */}
                <span className="floating-loc-tag guindy-loc"><MapPin size={10} /> Guindy Studio</span>
                <span className="floating-loc-tag adyar-loc"><MapPin size={10} /> Adyar Hub</span>

                {/* Calendar availability widget */}
                <div className="cal-availability-box glass">
                  <div className="cal-availability-header">
                    <h4>Studio Availability</h4>
                    <span className="cal-availability-live"><span className="cal-live-pulse-dot"></span> Live</span>
                  </div>
                  <div className="cal-availability-grid">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((d) => (
                      <span
                        key={d}
                        onClick={() => {
                          if ([3, 5, 6, 10, 12, 13].includes(d)) {
                            setSelectedCalDate(d);
                          }
                        }}
                        className={`cal-avail-day ${[3, 5, 6, 10, 12, 13].includes(d) ? 'has-booking' : ''} ${selectedCalDate === d ? 'selected' : ''}`}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                  <div className="cal-avail-confirmation">
                    <div className="cal-confirmation-check">✓</div>
                    <div className="cal-confirmation-text">
                      <h5>{calBookings[selectedCalDate]?.name || "GreenBox Studio"} — Booked!</h5>
                      <p>June {selectedCalDate} • 600 sq.ft • {calBookings[selectedCalDate]?.price || "₹2,498/day"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: EQUIPMENT */}
            <div className="prod-card equipment-card glass">
              <div className="prod-card-header">
                <span className="prod-icon-badge equipment-badge">
                  <Camera size={12} /> EQUIPMENT
                </span>
                <h3>Rent Professional Equipment</h3>
                <p>Cinema cameras, lenses, lighting, drones and audio gear — delivered when and where you need them.</p>
              </div>
              <div className="prod-card-graphic equipment-graphic-area">
                <div className="prod-eq-stack">
                  <div className="prod-eq-row glass">
                    <div className="prod-eq-icon-box bg-red">🎥</div>
                    <div className="prod-eq-row-details">
                      <h4>RED Digital Cinema</h4>
                      <div className="prod-eq-row-sub">
                        <span className="prod-eq-price">₹2,499/day</span>
                        <span className="prod-eq-rating"><Star size={10} fill="currentColor" /> 4.8</span>
                      </div>
                    </div>
                  </div>
                  <div className="prod-eq-row glass">
                    <div className="prod-eq-icon-box bg-blue">📷</div>
                    <div className="prod-eq-row-details">
                      <h4>Sony FX3</h4>
                      <div className="prod-eq-row-sub">
                        <span className="prod-eq-price">₹1,499/day</span>
                        <span className="prod-eq-rating"><Star size={10} fill="currentColor" /> 4.8</span>
                      </div>
                    </div>
                  </div>
                  <div className="prod-eq-row glass">
                    <div className="prod-eq-icon-box bg-yellow">🚁</div>
                    <div className="prod-eq-row-details">
                      <h4>DJI Ronin 4D</h4>
                      <div className="prod-eq-row-sub">
                        <span className="prod-eq-price">₹1,999/day</span>
                        <span className="prod-eq-rating"><Star size={10} fill="currentColor" /> 4.9</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 3: CREW */}
            <div className="prod-card crew-card glass">
              <div className="prod-card-header">
                <span className="prod-icon-badge crew-badge">
                  <Users size={12} /> CREW
                </span>
                <h3>Hire Top Crew</h3>
                <p>Connect with cinematographers, photographers, editors and production specialists — all vetted.</p>
              </div>
              <div className="prod-card-graphic crew-graphic-area">
                <div className="prod-crew-list">
                  <div className="prod-crew-item glass">
                    <div className="prod-crew-avatar bg-avatar-purple">AM</div>
                    <div className="prod-crew-item-details">
                      <h4>Arjun Mehta</h4>
                      <p>Cinematographer</p>
                      <span className="prod-crew-rate">₹8,999/day</span>
                    </div>
                    <div className="prod-crew-check">✓</div>
                  </div>
                  <div className="prod-crew-item glass">
                    <div className="prod-crew-avatar bg-avatar-blue">PS</div>
                    <div className="prod-crew-item-details">
                      <h4>Priya Sundaram</h4>
                      <p>Photographer</p>
                      <span className="prod-crew-rate">₹5,999/day</span>
                    </div>
                    <div className="prod-crew-check">✓</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 4: MARKETPLACE */}
            <div className="prod-card marketplace-card glass">
              <div className="prod-card-header">
                <span className="prod-icon-badge marketplace-badge">
                  <Sparkles size={12} /> MARKETPLACE
                </span>
                <h3>Instant Marketplace</h3>
                <p>Search, compare and book everything from one dashboard — no calls, no back-and-forth, just instant confirmation.</p>
              </div>
              <div className="prod-card-graphic marketplace-graphic-area">
                <div className="prod-market-search glass">
                  <Search size={14} className="text-muted" />
                  <input type="text" placeholder="Search studios, gear, crew..." disabled />
                </div>
                <div className="prod-market-pills">
                  <span
                    className={`prod-market-pill ${activeMarketCategory === 'studios' ? 'active' : ''}`}
                    onClick={() => setActiveMarketCategory('studios')}
                  >
                    Studios
                  </span>
                  <span
                    className={`prod-market-pill ${activeMarketCategory === 'equipment' ? 'active' : ''}`}
                    onClick={() => setActiveMarketCategory('equipment')}
                  >
                    Equipment
                  </span>
                  <span
                    className={`prod-market-pill ${activeMarketCategory === 'crew' ? 'active' : ''}`}
                    onClick={() => setActiveMarketCategory('crew')}
                  >
                    Crew
                  </span>
                </div>
              </div>
            </div>

            {/* CARD 5: TRUST & SAFETY */}
            <div className="prod-card trust-card glass">
              <div className="prod-card-header">
                <span className="prod-icon-badge trust-badge">
                  <Shield size={12} /> TRUST & SAFETY
                </span>
                <h3>Verified & Trusted</h3>
                <p>Every studio, equipment vendor and crew member undergoes rigorous verification before listing.</p>
              </div>
              <div className="prod-card-graphic trust-graphic-area">
                <div className="prod-trust-chips">
                  <div className="prod-trust-chip glass">
                    <div className="prod-trust-icon-wrapper">🔒</div>
                    <div className="prod-trust-chip-details">
                      <h4>ID Verified</h4>
                      <p>Vetted listing</p>
                    </div>
                  </div>
                  <div className="prod-trust-chip glass">
                    <div className="prod-trust-icon-wrapper">⭐</div>
                    <div className="prod-trust-chip-details">
                      <h4>4.9 Avg Rating</h4>
                      <p>2,400+ reviews</p>
                    </div>
                  </div>
                  <div className="prod-trust-chip glass">
                    <div className="prod-trust-icon-wrapper">💳</div>
                    <div className="prod-trust-chip-details">
                      <h4>Secure Payments</h4>
                      <p>Escrow protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 6: REWARDS BANNER */}
            <div className="prod-rewards-wide-banner glass">
              <div className="rewards-banner-glow"></div>
              <div className="rewards-banner-grid">
                <div className="rewards-banner-text">
                  <span className="prod-icon-badge rewards-badge">
                    <Coins size={12} /> REWARDS
                  </span>
                  <h2>Earn Super Coins</h2>
                  <p>Get rewarded for every booking and redeem credits for future projects. The more you create, the more you earn.</p>
                </div>

                <div className="rewards-banner-graphic">
                  <div className="rewards-coins-animation">
                    <div className="gold-coins-bundle">
                      <div className="coin-glow-item item-1">🪙</div>
                      <div className="coin-glow-item item-2">🪙</div>
                      <div className="coin-glow-item item-3">🪙</div>
                    </div>

                    <div className="rewards-status-box glass">
                      <div className="status-box-header">
                        <div className="bonus-left">
                          <h3>100</h3>
                          <p>First Booking Bonus</p>
                        </div>
                        <div className="balance-right">
                          <span className="balance-lbl">Current Balance</span>
                          <span className="balance-val">680 coins</span>
                        </div>
                      </div>

                      <div className="status-box-progress">
                        <div className="progress-bar-fill" style={{ width: '68%' }}></div>
                        <div className="progress-node node-active">
                          <span className="node-check">✓</span>
                          <span className="node-label">100</span>
                        </div>
                        <div className="progress-node node-active">
                          <span className="node-check">✓</span>
                          <span className="node-label">500</span>
                        </div>
                        <div className="progress-node">
                          <span className="node-check"></span>
                          <span className="node-label">1,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* BOOKING PAGES VIEW */}
      {currentPage === 'booking' && (
        <div className="booking-page-view container">
          {/* SUB-NAVBAR TABS (Studios to Rewards) */}
          <div className="booking-subnav glass">
            <button
              className={`subnav-btn ${activeBookingTab === 'studios' ? 'active' : ''}`}
              onClick={() => setActiveBookingTab('studios')}
            >
              Studios
            </button>
            <button
              className={`subnav-btn ${activeBookingTab === 'equipment' ? 'active' : ''}`}
              onClick={() => setActiveBookingTab('equipment')}
            >
              Equipment
            </button>
            <button
              className={`subnav-btn ${activeBookingTab === 'crew' ? 'active' : ''}`}
              onClick={() => setActiveBookingTab('crew')}
            >
              Crew
            </button>
            <button
              className={`subnav-btn ${activeBookingTab === 'unified' ? 'active' : ''}`}
              onClick={() => setActiveBookingTab('unified')}
            >
              Unified Search
            </button>
            <button
              className={`subnav-btn ${activeBookingTab === 'trust' ? 'active' : ''}`}
              onClick={() => setActiveBookingTab('trust')}
            >
              Trust & Safety
            </button>
            <button
              className={`subnav-btn ${activeBookingTab === 'rewards' ? 'active' : ''}`}
              onClick={() => setActiveBookingTab('rewards')}
            >
              Rewards
            </button>
          </div>

          {/* SUB-PAGES RENDER */}
          {activeBookingTab === 'studios' && renderBookingStudios()}
          {activeBookingTab === 'equipment' && renderBookingEquipment()}
          {activeBookingTab === 'crew' && renderBookingCrew()}
          {activeBookingTab === 'unified' && renderBookingUnified()}
          {activeBookingTab === 'trust' && renderBookingTrust()}
          {activeBookingTab === 'rewards' && renderBookingRewards()}
        </div>
      )}

      {/* BLOG PAGES VIEW */}
      {currentPage === 'blog' && (
        <div className="booking-page-view container">
          {/* SUB-NAVBAR TABS (Filmmaker to Popular Topics) */}
          <div className="booking-subnav glass flex-wrap-dual-row">
            <button
              className={`subnav-btn ${activeBlogTab === 'filmmaker' ? 'active' : ''}`}
              onClick={() => setActiveBlogTab('filmmaker')}
            >
              Filmmaker Hub
            </button>
            <button
              className={`subnav-btn ${activeBlogTab === 'studio' ? 'active' : ''}`}
              onClick={() => setActiveBlogTab('studio')}
            >
              Studio Guide
            </button>
            <button
              className={`subnav-btn ${activeBlogTab === 'gear' ? 'active' : ''}`}
              onClick={() => setActiveBlogTab('gear')}
            >
              Gear Guide
            </button>
            <button
              className={`subnav-btn ${activeBlogTab === 'crew' ? 'active' : ''}`}
              onClick={() => setActiveBlogTab('crew')}
            >
              Crew Guide
            </button>
            <button
              className={`subnav-btn ${activeBlogTab === 'marketplace' ? 'active' : ''}`}
              onClick={() => setActiveBlogTab('marketplace')}
            >
              Marketplace Guide
            </button>
            <button
              className={`subnav-btn ${activeBlogTab === 'trust_guide' ? 'active' : ''}`}
              onClick={() => setActiveBlogTab('trust_guide')}
            >
              Trust Guide
            </button>
            <button
              className={`subnav-btn ${activeBlogTab === 'rewards_guide' ? 'active' : ''}`}
              onClick={() => setActiveBlogTab('rewards_guide')}
            >
              Rewards Guide
            </button>
            <button
              className={`subnav-btn ${activeBlogTab === 'success' ? 'active' : ''}`}
              onClick={() => setActiveBlogTab('success')}
            >
              Success Stories
            </button>
            <button
              className={`subnav-btn ${activeBlogTab === 'author' ? 'active' : ''}`}
              onClick={() => setActiveBlogTab('author')}
            >
              Author Profile
            </button>
            <button
              className={`subnav-btn ${activeBlogTab === 'search_res' ? 'active' : ''}`}
              onClick={() => setActiveBlogTab('search_res')}
            >
              Search Results
            </button>
            <button
              className={`subnav-btn ${activeBlogTab === 'newsletter' ? 'active' : ''}`}
              onClick={() => setActiveBlogTab('newsletter')}
            >
              Newsletter
            </button>
            <button
              className={`subnav-btn ${activeBlogTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveBlogTab('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`subnav-btn ${activeBlogTab === 'mobile_exp' ? 'active' : ''}`}
              onClick={() => setActiveBlogTab('mobile_exp')}
            >
              Mobile Experience
            </button>
            <button
              className={`subnav-btn ${activeBlogTab === 'platform_stats' ? 'active' : ''}`}
              onClick={() => setActiveBlogTab('platform_stats')}
            >
              Platform Stats
            </button>
            <button
              className={`subnav-btn ${activeBlogTab === 'popular_topics' ? 'active' : ''}`}
              onClick={() => setActiveBlogTab('popular_topics')}
            >
              Popular Topics
            </button>
            <button
              className={`subnav-btn ${activeBlogTab === 'level_up' ? 'active' : ''}`}
              onClick={() => setActiveBlogTab('level_up')}
            >
              Level Up
            </button>
          </div>

          {/* SUB-PAGES RENDER */}
          {activeBlogTab === 'filmmaker' && renderBlogFilmmaker()}
          {activeBlogTab === 'studio' && renderBlogStudio()}
          {activeBlogTab === 'gear' && renderBlogGear()}
          {activeBlogTab === 'crew' && renderBlogCrew()}
          {activeBlogTab === 'marketplace' && renderBlogMarketplace()}
          {activeBlogTab === 'trust_guide' && renderBlogTrustGuide()}
          {activeBlogTab === 'rewards_guide' && renderBlogRewardsGuide()}
          {activeBlogTab === 'success' && renderBlogSuccess()}
          {activeBlogTab === 'author' && renderBlogAuthor()}
          {activeBlogTab === 'search_res' && renderBlogSearchRes()}
          {activeBlogTab === 'newsletter' && renderBlogNewsletter()}
          {activeBlogTab === 'dashboard' && renderBlogDashboard()}
          {activeBlogTab === 'mobile_exp' && renderBlogMobile()}
          {activeBlogTab === 'platform_stats' && renderBlogPlatformStats()}
          {activeBlogTab === 'popular_topics' && renderBlogPopularTopics()}
          {activeBlogTab === 'level_up' && renderBlogLevelUp()}
        </div>
      )}

      {/* HELP AND DOCS VIEW */}
      {currentPage === 'help' && renderHelpPage()}

      {/* CREW LANDING VIEW */}
      {currentPage === 'crew' && renderCrewPage()}

      {/* HOW IT WORKS VIEW */}
      {currentPage === 'how-it-works' && renderHowItWorksPage()}

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand-col">
            <div className="logo-section" onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>
              <div className="logo-icon">
                <Sparkles className="logo-spark" size={16} />
              </div>
              <span className="logo-text">ZO1</span>
            </div>
            <p className="footer-desc">
              Your one-stop destination for booking studios, renting gear, and hiring professional crew for any production.
            </p>
            <div className="social-links">
              <a href="#instagram" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
              <a href="#twitter" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
              </a>
              <a href="#linkedin" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a href="#youtube" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" /><polygon points="10 15 15 12 10 9" /></svg>
              </a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#studios">Studios</a></li>
              <li><a href="#equipment">Gear Renting</a></li>
              <li><a href="#crew">Crew Hiring</a></li>
              <li><a href="#spaces">Spaces</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#safety">Safety Trust</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} ZO1. All rights reserved.</p>
            <p>Made with ❤️ in India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
