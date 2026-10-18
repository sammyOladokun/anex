import { useState } from 'react'
import {
  ArrowRight, Check, ChevronRight, Clock3, Heart, Menu,
  ShieldCheck, Sparkles, UsersRound, Video, X,
} from 'lucide-react'

function App() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [booked, setBooked] = useState(false)

  const startBooking = () => {
    setBooked(false)
    setBookingOpen(true)
  }

  return (
    <main>
      <section className="hero" id="home">
        <div className="hero-frame">
          <div className="hero-light-sweep" aria-hidden="true" />
          <svg className="hero-orbit-accent" viewBox="0 0 1440 720" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="hero-orbit-glow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#2be892" stopOpacity="0" />
                <stop offset="0.45" stopColor="#55f5b0" stopOpacity="0.72" />
                <stop offset="0.72" stopColor="#d9fff0" stopOpacity="0.95" />
                <stop offset="1" stopColor="#69efb0" stopOpacity="0.12" />
              </linearGradient>
            </defs>
            <path d="M 135 515 C 245 405, 382 391, 522 430 C 615 456, 669 486, 731 500" />
            <path className="hero-orbit-accent__glow" d="M 135 515 C 245 405, 382 391, 522 430 C 615 456, 669 486, 731 500" />
          </svg>
          <img className="hero-model-image" src="/images/hero-model-poster.png" alt="" aria-hidden="true" />
          <header className="hero-header">
            <a className="wordmark" href="#home" aria-label="Anex home">
              <span className="wordmark-icon" aria-hidden="true"><i /><i /><i /><i /></span>
              <span>anex</span>
            </a>
            <button className="mobile-menu-toggle" aria-label="Toggle navigation" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
            <nav className={`site-nav ${mobileMenuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
              <a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
              <a href="#care" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
              <a href="#stories" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
              <button onClick={startBooking}>Login</button>
            </nav>
          </header>
          <div className="hero-content">
            <h1><span>Advanced</span><span><em>Healthcare</em> With</span><em>Human Touch</em></h1>
            <button className="button button-light" onClick={startBooking}>Book Appointment <ArrowRight size={17} /></button>
          </div>
          <div className="doctor-card">
            <span className="doctor-avatar">WA</span>
            <span className="doctor-details"><strong>Dr. Wilson Adeyemi</strong><small>Cardiologist</small><small className="availability"><i />Available now</small></span>
            <ChevronRight size={17} />
          </div>
          <div className="hero-features" aria-label="Care features">
            <div><Video size={18} /><span>Video Consultations</span></div>
            <div><ShieldCheck size={18} /><span>Secure &amp; Private</span></div>
            <div><Check size={18} /><span>Verified Doctors</span></div>
          </div>
          <div className="hero-stat">
            <span className="stat-label">Patient Trust</span>
            <span className="stat-spark" aria-hidden="true">⌁</span>
            <strong>12.5M+</strong>
            <span className="stat-growth">&#8593; 24%</span>
            <small>Growth In Patient Engagement</small>
          </div>
          <div className="hero-purpose">
            <p>Smarter Healthcare Solutions Designed To Improve Everyday Wellbeing Through Personalized Medical.</p>
            <button onClick={startBooking}>Book Appointment <ArrowRight size={17} /></button>
          </div>
        </div>
      </section>

      <section className="care-intro section-wrap" id="care">
        <div className="intro-top"><span className="section-eyebrow">A BETTER KIND OF HEALTHCARE</span><span className="intro-index">01 <i /> 03</span></div>
        <div className="intro-heading"><h2>Good care should<br />feel <em>like good care.</em></h2><p>Healthcare is personal. We bring the expertise, time, and attention you deserve into one calm, convenient place.</p></div>
        <div className="care-layout">
          <div className="benefit-stack">
            <article className="benefit-card"><span className="benefit-icon"><Video size={19} /></span><span className="benefit-number">01 / CONNECT</span><h3>Face-to-face, wherever you are</h3><p>See and speak with your clinician in a private video visit, from home or on the go.</p><button aria-label="Book a virtual visit" onClick={startBooking}><ArrowRight size={17} /></button></article>
            <article className="benefit-card"><span className="benefit-icon"><Clock3 size={19} /></span><span className="benefit-number">02 / YOUR TIME</span><h3>Care that fits your day</h3><p>Find a time that works for you and get support without the waiting room.</p><button aria-label="Browse appointment times" onClick={startBooking}><ArrowRight size={17} /></button></article>
          </div>
          <button className="consultation-photo" onClick={() => setVideoOpen(true)} aria-label="Learn more about virtual care">
            <img src="/images/consultation-photo.jpg" alt="A doctor sharing a reassuring moment with a patient" />
            <span className="photo-play"><span /></span><span className="photo-label">Care is a conversation <ArrowRight size={14} /></span>
          </button>
          <div className="benefit-stack">
            <article className="benefit-card"><span className="benefit-icon"><UsersRound size={19} /></span><span className="benefit-number">03 / HERE FOR YOU</span><h3>People who listen first</h3><p>Our care team takes the time to understand you and what feeling better means.</p><button aria-label="Meet the care team" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}><ArrowRight size={17} /></button></article>
            <article className="benefit-card benefit-quote"><Sparkles size={18} /><p>â€œI finally felt heard, and getting the care I needed felt simple.â€</p><span>â€” An Anex patient</span></article>
          </div>
        </div>
      </section>

      <section className="services-band" id="services"><div className="services-inner"><div><span className="section-eyebrow">YOUR CARE, YOUR WAY</span><h2>Expert support for<br /><em>real life.</em></h2></div><p>From a question that canâ€™t wait to care youâ€™ve been meaning to make time for, weâ€™ll help you find the right next step.</p><button className="button button-dark" onClick={startBooking}>Explore care options <ArrowRight size={16} /></button><span className="service-decoration"><Heart size={114} strokeWidth={0.8} /></span></div></section>

      <section className="trust-section section-wrap" id="stories"><div className="trust-heading"><span className="section-eyebrow">HEALTHCARE, WITH HEART</span><h2>Trusted care.<br /><em>Real connection.</em></h2><p>Good healthcare is about more than an appointment. Itâ€™s being listened to, cared for, and supported along the way.</p></div><div className="trust-cards"><article className="trust-card trust-image"><img src="/images/consultation-photo.jpg" alt="A patient and clinician sharing a caring conversation" /><span>One-on-one care, made personal</span></article><article className="trust-card trust-quote"><span className="quote-mark">â€œ</span><blockquote>My doctor really listened. I left our visit feeling confident about what came next.</blockquote><div className="quote-person"><span className="quote-avatar">J</span><span><strong>Jordan, Anex patient</strong><small>Virtual primary care</small></span><span className="stars">â˜…â˜…â˜…â˜…â˜…</span></div></article><article className="trust-card trust-promise"><span className="promise-icon"><ShieldCheck size={21} /></span><h3>Your care stays yours.</h3><p>Your conversations and health information deserve care at every step. We keep privacy at the center of your experience.</p><a href="#footer">Our commitment <ArrowRight size={15} /></a></article></div></section>

      <section className="closing-cta"><span className="section-eyebrow">A GOOD FIRST STEP</span><h2>Care starts with<br /><em>a conversation.</em></h2><button className="button button-light" onClick={startBooking}>Find your clinician <ArrowRight size={17} /></button><span className="closing-sparkle">âœ³</span></section>
      <footer className="site-footer" id="footer"><a className="footer-brand" href="#home"><span className="wordmark-icon"><Heart size={19} fill="currentColor" /></span><span className="footer-brand-name">anex</span></a><span>Care, with you in mind.</span><div><a href="#care">About</a><a href="#services">Services</a><a href="#stories">Patient stories</a><a href="#footer">Privacy</a></div><small>Â© 2026 Anex</small></footer>

      {bookingOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setBookingOpen(false) }}><section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title"><button className="modal-close" aria-label="Close" onClick={() => setBookingOpen(false)}><X size={19} /></button>{booked ? <div className="booking-confirmation"><span className="confirmation-icon"><Check size={23} /></span><span className="section-eyebrow">YOUâ€™RE ON YOUR WAY</span><h2 id="booking-title">Letâ€™s make this<br /><em>happen.</em></h2><p>Your appointment request is ready. Sign in to choose a clinician and confirm a time.</p><button className="button button-dark" onClick={() => setBookingOpen(false)}>Got it <ArrowRight size={16} /></button></div> : <><span className="section-eyebrow">CARE, WHEN YOUâ€™RE READY</span><h2 id="booking-title">Letâ€™s find your<br /><em>next step.</em></h2><p>Choose the kind of care youâ€™re looking for. Weâ€™ll help you take it from there.</p><div className="booking-options"><button onClick={() => setBooked(true)}><span className="option-icon"><Video size={18} /></span><span><strong>Talk with a clinician</strong><small>Book a private video visit</small></span><ChevronRight size={17} /></button><button onClick={() => setBooked(true)}><span className="option-icon"><Heart size={18} /></span><span><strong>Explore care options</strong><small>Find the right support for you</small></span><ChevronRight size={17} /></button></div><small className="modal-footnote"><ShieldCheck size={13} /> Your health information is private and secure</small></>}</section></div>}
      {videoOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setVideoOpen(false) }}><section className="video-modal" role="dialog" aria-modal="true" aria-label="About virtual care"><button className="modal-close" aria-label="Close" onClick={() => setVideoOpen(false)}><X size={19} /></button><img src="/images/care-consultation.jpg" alt="A patient and doctor talking together" /><span className="section-eyebrow">CARE, IN YOUR CORNER</span><h2>A real conversation<br />can change everything.</h2><p>Meet with a trusted clinician face-to-face by secure video, and get a plan that feels right for you.</p><button className="button button-dark" onClick={() => { setVideoOpen(false); startBooking() }}>Find a clinician <ArrowRight size={16} /></button></section></div>}
    </main>
  )
}

export default App
