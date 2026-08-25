import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Award, Box, ChevronDown, Mail, ExternalLink, X, Send, Loader2, FileText, PlayCircle, Home as HomeIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import homeContent from '../content/home.json'

const PROFILE_IMG = homeContent.profileImage
const RESUME_URL = homeContent.resumeUrl
const CONTACT_EMAIL = homeContent.contactEmail
const LINKTREE_URL = homeContent.linktreeUrl
const SHOWREEL_VIDEO_ID = homeContent.showreelVideoId

// ── EmailJS credentials ─────────────────────────────────────────────────────
// Sign up free at https://www.emailjs.com, connect your Gmail,
// create a template, then replace the three values below.
const EMAILJS_SERVICE_ID  = 'service_a207vhb'
const EMAILJS_TEMPLATE_ID = 'template_qf9rl2p'
const EMAILJS_PUBLIC_KEY  = 'qB6pPJC1goNLaEeLb'

const experiences = homeContent.experiences
const awardsSection = homeContent.awardsSection
const cgiSection = homeContent.cgiSection
const clientsSection = homeContent.clientsSection
const clientLogos = clientsSection.clients
const availabilityFor = homeContent.availabilityFor
const leadershipSection = homeContent.leadershipSection

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

// Signature kinetic-type hero entrance: each headline line slides up out of
// a clipping mask, staggered. Collapses to a plain fade under reduced motion.
const kineticLineWrapFull = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
}
const kineticLineWrapReduced = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const kineticLineFull = {
  hidden: { y: '115%' },
  visible: { y: '0%', transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const } },
}
const kineticLineReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
}

function heroFadeProps(reduce: boolean, delay: number) {
  return reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay } }
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const, delay } }
}

// Shared styles
const card: React.CSSProperties = {
  background: '#fff',
  borderRadius: 8,
  border: '1px solid #e4e4e1',
  boxShadow: '0 8px 24px rgba(26,26,26,0.06)',
}

const sectionLabel: React.CSSProperties = {
  fontFamily: "'Sora', sans-serif",
  fontSize: 22,
  fontWeight: 700,
  color: '#1a1a1a',
  letterSpacing: 0,
  marginBottom: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.625rem',
}

const accentBar: React.CSSProperties = {
  display: 'inline-block',
  width: 4,
  height: 22,
  borderRadius: 2,
  background: 'linear-gradient(180deg, #3c6e71, #284b63)',
  flexShrink: 0,
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return isMobile
}

export default function Home() {
  const isMobile = useIsMobile()
  const prefersReducedMotion = useReducedMotion() ?? false
  const clientRows = [
    clientLogos.filter((_, index) => index % 2 === 0),
    clientLogos.filter((_, index) => index % 2 !== 0),
  ]
  const [contactOpen, setContactOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')
  const [openCgiCase, setOpenCgiCase] = useState<string | null>(null)

  function validate() {
    const errors: typeof formErrors = {}
    if (!formData.name.trim()) errors.name = 'Name is required'
    if (!formData.email.trim()) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Enter a valid email'
    if (!formData.message.trim()) errors.message = 'Message is required'
    else if (formData.message.trim().length < 10) errors.message = 'At least 10 characters'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSending(true)
    setSendError('')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: CONTACT_EMAIL,
        },
        EMAILJS_PUBLIC_KEY
      )
      setSent(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => {
        setContactOpen(false)
        setSent(false)
      }, 3000)
    } catch {
      setSendError(`Failed to send message. Please email me directly at ${CONTACT_EMAIL}`)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="animated-gradient-page" style={{ minHeight: '100vh', width: '100%', overflowX: 'hidden', fontFamily: "'Inter', sans-serif", color: '#353535' }}>

      {/* ── HEADER ── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: 'rgba(245,245,243,0.94)', backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #e4e4e1',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0.75rem 1rem' : '0 2rem', minHeight: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
          <Link to="/" className="brand-home-link" aria-label="Go to homepage">
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#3c6e71,#284b63)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 11, fontFamily: "'Sora', sans-serif", letterSpacing: 0 }}>MK</div>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: '#1a1a1a', letterSpacing: 0 }}>Mufaddal</span>
          </Link>
          <nav style={{ display: 'flex', gap: isMobile ? '0.75rem' : '1.75rem', fontSize: isMobile ? 12.5 : 13.5, fontWeight: 500, flexWrap: 'wrap', justifyContent: isMobile ? 'flex-start' : 'flex-end', minWidth: 0 }}>
            <Link to="/" className="home-nav-pill" aria-current="page">
              <HomeIcon size={13} /> Home
            </Link>
            <Link to="/work" style={{ color: '#666662', textDecoration: 'none' }}>Work</Link>
            <a href="#awards" className="award-nav-link">Awards</a>
            <a href="#cgi" style={{ color: '#666662', textDecoration: 'none' }}>CGI</a>
            <a href="#experience" style={{ color: '#666662', textDecoration: 'none' }}>Experience</a>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#666662', textDecoration: 'none' }}>Resume</a>
            <a href="#contact" style={{ color: '#666662', textDecoration: 'none' }}>Contact</a>
          </nav>
        </div>
      </motion.header>

      {/* ── HERO ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '2.5rem 1rem 2rem' : '4rem 2rem 3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'minmax(0, 1fr) 380px', gap: isMobile ? '2rem' : '3.5rem', alignItems: 'center' }}>
          {/* Left */}
          <div>
            <motion.div
              {...heroFadeProps(prefersReducedMotion, 0)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#edf7ed', border: '1px solid #c8e6c9', borderRadius: 20, padding: '0.25rem 0.75rem', fontSize: 12, color: '#2e7d32', fontWeight: 600, marginBottom: '1.25rem' }}
            >
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4caf50' }} />
              {homeContent.availabilityText}
            </motion.div>

            <motion.h1
              variants={prefersReducedMotion ? kineticLineWrapReduced : kineticLineWrapFull}
              initial="hidden"
              animate="visible"
              style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(2.25rem, 4.4vw, 3.75rem)', fontWeight: 800, color: '#1a1a1a', lineHeight: 1.14, letterSpacing: '-0.02em', marginBottom: 0 }}
            >
              <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em' }}>
                <motion.span variants={prefersReducedMotion ? kineticLineReduced : kineticLineFull} style={{ display: 'block' }}>
                  {homeContent.hero.line1}
                </motion.span>
              </span>
              <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em' }}>
                <motion.span variants={prefersReducedMotion ? kineticLineReduced : kineticLineFull} style={{ display: 'block' }}>
                  {homeContent.hero.line2}
                </motion.span>
              </span>
              <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em' }}>
                <motion.span variants={prefersReducedMotion ? kineticLineReduced : kineticLineFull} style={{ display: 'block', color: '#3c6e71' }}>
                  {homeContent.hero.highlight}
                </motion.span>
              </span>
            </motion.h1>

            <motion.span
              {...(prefersReducedMotion
                ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay: 0.5 } }
                : { initial: { scaleX: 0 }, animate: { scaleX: 1 }, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const, delay: 1.0 } })}
              style={{ transformOrigin: 'left', display: 'block', height: 3, width: 64, borderRadius: 2, background: 'linear-gradient(90deg,#3c6e71,#284b63)', marginTop: '1rem', marginBottom: '1.35rem' }}
            />

            <motion.p
              {...heroFadeProps(prefersReducedMotion, prefersReducedMotion ? 0.15 : 1.05)}
              style={{ color: '#666662', lineHeight: 1.7, fontSize: 15, maxWidth: 480, marginBottom: '2rem' }}
            >
              {homeContent.hero.body}
            </motion.p>

            <motion.div
              {...heroFadeProps(prefersReducedMotion, prefersReducedMotion ? 0.2 : 1.18)}
              style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}
            >
              <Link
                to="/work"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.65rem 1.25rem', background: '#284b63', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: 13.5, textDecoration: 'none', fontFamily: "'Inter', sans-serif", boxShadow: '0 2px 8px rgba(40,75,99,0.25)' }}
              >
                <PlayCircle size={15} /> Watch Reel
              </Link>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.65rem 1.25rem', background: '#fff', color: '#284b63', border: '1.5px solid #d7dddc', borderRadius: 8, fontWeight: 600, fontSize: 13.5, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
              >
                <FileText size={14} /> Download Resume
              </a>
              <button
                onClick={() => setContactOpen(true)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.65rem 1.25rem', background: 'transparent', color: '#3c6e71', border: '1.5px solid #3c6e71', borderRadius: 8, fontWeight: 600, fontSize: 13.5, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
              >
                <Mail size={14} /> Contact
              </button>
            </motion.div>

            <motion.div
              {...heroFadeProps(prefersReducedMotion, prefersReducedMotion ? 0.25 : 1.3)}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '1.25rem' }}
            >
              {availabilityFor.map((item) => (
                <span key={item} style={{ background: 'rgba(255,255,255,0.72)', border: '1px solid #e4e4e1', borderRadius: 6, padding: '0.32rem 0.55rem', color: '#5f6560', fontSize: 12, fontWeight: 600 }}>
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: photo */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 14px 34px rgba(26,26,26,0.12)', background: '#e8e8e6' }}
            >
              <img
                src={PROFILE_IMG}
                alt="Mufaddal Kachwala"
                style={{ width: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top center' }}
              />
              <div style={{ padding: '0.5rem 0.875rem', fontSize: 11.5, color: '#888884', background: '#fff', textAlign: 'center', fontWeight: 500 }}>
                Motion Lead | AI E-Learning | Production Systems
              </div>
            </motion.div>
            <Link
              to="/work"
              style={{ display: isMobile ? 'none' : 'grid', gridTemplateColumns: '92px minmax(0, 1fr)', gap: '0.85rem', alignItems: 'center', marginTop: '1rem', padding: '0.75rem', background: '#fff', border: '1px solid #e4e4e1', borderRadius: 8, color: 'inherit', textDecoration: 'none', boxShadow: '0 8px 22px rgba(26,26,26,0.06)' }}
            >
              <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: 6, overflow: 'hidden', background: '#1a1a1a' }}>
                <img src={`https://img.youtube.com/vi/${SHOWREEL_VIDEO_ID}/hqdefault.jpg`} alt="Motion design reel thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.22)', color: '#fff' }}>
                  <PlayCircle size={24} />
                </div>
              </div>
              <div>
                <p style={{ fontSize: 11.5, color: '#3c6e71', fontWeight: 700, marginBottom: '0.2rem' }}>Showreel</p>
                <p style={{ fontSize: 13, color: '#353535', fontWeight: 700, lineHeight: 1.35 }}>Watch a quick reel before reviewing the full work page.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Award recognition */}
      <section id="awards" style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 1rem 2.5rem' : '0 2rem 3.5rem', scrollMarginTop: 86 }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="award-showcase">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div>
              <div className="award-eyebrow" style={{ marginBottom: '0.65rem' }}>
                <Award size={14} />
                {awardsSection.eyebrow}
              </div>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: isMobile ? 24 : 32, fontWeight: 800, color: '#1a1a1a', lineHeight: 1.15, maxWidth: 680 }}>
                {awardsSection.title}
              </h2>
            </div>
            <p style={{ color: '#666662', fontSize: 14, lineHeight: 1.7, maxWidth: 430 }}>
              {awardsSection.description}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
            {awardsSection.awards.map((award) => (
              <a
                key={award.url}
                href={award.url}
                target="_blank"
                rel="noopener noreferrer"
                className="award-card"
              >
                <div className="award-icon">
                  <Award size={21} />
                </div>
                <div>
                  <span className="award-pill" style={{ marginBottom: '0.55rem' }}>{award.year}</span>
                  <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 15.5, fontWeight: 800, color: '#1a1a1a', lineHeight: 1.35, marginBottom: '0.45rem' }}>{award.title}</h3>
                  <p style={{ color: '#8a6119', fontSize: 12.5, fontWeight: 800, marginBottom: '0.5rem' }}>{award.category}</p>
                  <p style={{ color: '#666662', fontSize: 13, lineHeight: 1.6, marginBottom: '0.65rem' }}>{award.brief}</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#7a5516', fontSize: 12.5, fontWeight: 900 }}>
                    View official winner page <ExternalLink size={13} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Leadership */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 1rem 2.5rem' : '0 2rem 3.5rem' }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ ...card, padding: isMobile ? '1.5rem' : '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'minmax(0, 0.9fr) minmax(0, 1.1fr)', gap: '1.5rem', alignItems: 'start' }}>
            <div>
              <span style={{ color: '#3c6e71', fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase' }}>{leadershipSection.eyebrow}</span>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: isMobile ? 23 : 30, fontWeight: 800, color: '#1a1a1a', lineHeight: 1.15, marginTop: '0.65rem', marginBottom: '0.85rem' }}>
                {leadershipSection.title}
              </h2>
              <p style={{ color: '#666662', fontSize: 14, lineHeight: 1.7 }}>{leadershipSection.description}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'repeat(3, minmax(0, 1fr))', gap: '0.85rem' }}>
              {leadershipSection.strengths.map((strength) => (
                <div key={strength.title} style={{ background: '#f7faf9', border: '1px solid #dce5e3', borderRadius: 8, padding: '1rem' }}>
                  <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 13.5, color: '#284b63', fontWeight: 800, marginBottom: '0.45rem' }}>{strength.title}</h3>
                  <p style={{ color: '#666662', fontSize: 12.5, lineHeight: 1.6 }}>{strength.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Client logos */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 1rem 2.5rem' : '0 2rem 3.5rem' }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="client-showcase"
        >
          <div className="client-showcase-heading">
            <div>
              <span className="client-eyebrow">{clientsSection.eyebrow}</span>
              <h2>{clientsSection.title}</h2>
            </div>
            <p>{clientsSection.description}</p>
          </div>
          <div className="client-marquee-shell" aria-label="Client logos">
            {clientRows.map((row, rowIndex) => (
              <div className="client-marquee-row" key={rowIndex}>
                <div className={`client-marquee-track ${rowIndex === 1 ? 'reverse' : ''}`}>
                  {[...row, ...row].map((client, index) => (
                    <div className={`client-logo-card ${'largerLogo' in client && client.largerLogo ? 'client-logo-card--large' : ''}`} key={`${client.name}-${rowIndex}-${index}`}>
                      <img src={client.logo} alt={`${client.name} logo`} loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CGI */}
      <section id="cgi" style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 1rem 2.5rem' : '0 2rem 3.5rem', scrollMarginTop: 86 }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="cgi-showcase">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: '#3c6e71', fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                <Box size={14} />
                {cgiSection.eyebrow}
              </div>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: isMobile ? 24 : 32, fontWeight: 800, color: '#1a1a1a', lineHeight: 1.15, maxWidth: 720 }}>
                {cgiSection.title}
              </h2>
            </div>
            <p style={{ color: '#666662', fontSize: 14, lineHeight: 1.7, maxWidth: 430 }}>
              {cgiSection.description}
            </p>
          </div>

          <div className="cgi-employer-fit">
            <div>
              <span>Production fit</span>
              <p>{cgiSection.employerPitch}</p>
            </div>
            <div className="cgi-highlight-list">
              {cgiSection.productionHighlights.map((highlight) => (
                <span key={highlight}>{highlight}</span>
              ))}
            </div>
          </div>

          <div className="cgi-case-list">
            {cgiSection.cases.map((item, index) => {
              const isOpen = openCgiCase === item.title
              const panelId = `cgi-case-${index + 1}`
              const isRetailCgi = item.title.includes('Furniture')
              const galleryImages = 'galleryImages' in item && Array.isArray(item.galleryImages) ? item.galleryImages : []
              return (
                <article className={`cgi-case ${isOpen ? 'is-open' : ''} ${isRetailCgi ? 'cgi-case--priority' : ''}`} key={item.title}>
                  <button className="cgi-case-trigger" onClick={() => setOpenCgiCase(isOpen ? null : item.title)} aria-expanded={isOpen} aria-controls={panelId}>
                    <span className="cgi-case-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="cgi-case-title-group">
                      <span className="cgi-case-type">{item.type}</span>
                      <span className="cgi-case-title">{item.title}</span>
                    </span>
                    {isRetailCgi && <span className="cgi-priority-badge">Retail CGI proof</span>}
                    <span className="cgi-case-client">{item.client}</span>
                    <ChevronDown className="cgi-case-chevron" size={18} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        className="cgi-case-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                      >
                        <div className="cgi-case-content">
                          <div className="cgi-case-media">
                            {item.image ? (
                              <img src={item.image} alt={item.title} loading="lazy" />
                            ) : (
                              <div className="cgi-placeholder">
                                <Box size={34} />
                                <span>3D product renderings</span>
                              </div>
                            )}
                          </div>
                          {galleryImages.length > 0 && (
                            <div className="cgi-preview-gallery" aria-label={`${item.title} preview images`}>
                              {galleryImages.map((image) => (
                                <img key={image.src} src={image.src} alt={image.alt} loading="lazy" />
                              ))}
                            </div>
                          )}
                          <div className="cgi-case-copy">
                            <p className="cgi-summary">{item.summary}</p>
                            <div className="cgi-detail-block">
                              <span>Case study</span>
                              <p>{item.caseStudy}</p>
                            </div>
                            <div className="cgi-workflow-block">
                              <span>Workflow</span>
                              <ol>
                                {item.workflow.map((step) => (
                                  <li key={step}>{step}</li>
                                ))}
                              </ol>
                            </div>
                            <div className="cgi-detail-block">
                              <span>Pipeline</span>
                              <p>{item.pipeline}</p>
                            </div>
                            <div className="cgi-meta-grid">
                              <div>
                                <span>Role</span>
                                <p>{item.role}</p>
                              </div>
                              <div>
                                <span>Tools</span>
                                <p>{item.tools}</p>
                              </div>
                            </div>
                            <div className="cgi-proof-list">
                              {item.proofPoints.map((point) => (
                                <span key={point}>{point}</span>
                              ))}
                            </div>
                            <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="cgi-source-link">
                              View source project <ExternalLink size={13} />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              )
            })}
          </div>
        </motion.div>
      </section>

      {/* Experience */}
      <section id="experience" style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 1rem 2.5rem' : '0 2rem 3.5rem' }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div style={sectionLabel}>
            <span style={accentBar} />
            Experience
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                style={{ ...card, padding: '1.5rem 1.5rem', borderLeft: `3px solid ${exp.color}` }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.625rem', gap: '0.75rem' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, color: '#1a1a1a', fontSize: 14, marginBottom: '0.2rem', lineHeight: 1.35 }}>{exp.title}</h3>
                    <p style={{ color: exp.color, fontSize: 12.5, fontWeight: 600 }}>{exp.company}</p>
                  </div>
                  <span style={{ background: '#f4f4f2', border: '1px solid #e4e4e1', borderRadius: 20, padding: '0.15rem 0.6rem', fontSize: 11.5, color: '#888884', whiteSpace: 'nowrap', flexShrink: 0 }}>{exp.period}</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {exp.highlights.map((h, j) => (
                    <li key={j} style={{ display: 'flex', gap: '0.5rem', color: '#555552', fontSize: 13, lineHeight: 1.55 }}>
                      <span style={{ color: exp.color, flexShrink: 0, marginTop: 1, fontSize: 11, fontWeight: 700 }}>▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 1rem 3rem' : '0 2rem 5rem' }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ ...card, padding: '2rem', maxWidth: 620, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 220 }}
        >
          <div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: '#1a1a1a', marginBottom: '0.625rem', lineHeight: 1.3, letterSpacing: 0 }}>{homeContent.contactCard.title}</h2>
            <p style={{ color: '#888884', fontSize: 13, lineHeight: 1.65 }}>
              {homeContent.contactCard.description}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <button
              onClick={() => setContactOpen(true)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.6rem 1.2rem', background: '#3c6e71', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
            >
              <Mail size={13} /> Get In Touch
            </button>
            <a
              href={LINKTREE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.6rem 1.2rem', background: 'transparent', color: '#3c6e71', border: '1.5px solid #3c6e71', borderRadius: 8, fontWeight: 600, fontSize: 13, textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}
            >
              Connect
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid #e4e4e1', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1.5rem 2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', fontSize: 12.5, color: '#999996' }}>
          <p>© 2026 Mufaddal Kachwala. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: '#999996', textDecoration: 'none' }}>Email</a>
            <a href={LINKTREE_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#999996', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              Links <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </footer>

      {/* ── CONTACT MODAL ── */}
      {contactOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={(e) => { if (e.target === e.currentTarget) setContactOpen(false) }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)' }} onClick={() => setContactOpen(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'relative', background: '#fff', borderRadius: 16, overflow: 'hidden', width: '100%', maxWidth: 440, boxShadow: '0 20px 60px rgba(0,0,0,0.2)', zIndex: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ background: 'linear-gradient(135deg, #3c6e71, #284b63)', padding: '1.5rem 1.75rem', position: 'relative' }}>
              <button
                onClick={() => setContactOpen(false)}
                style={{ position: 'absolute', top: '0.875rem', right: '0.875rem', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}
              >
                <X size={13} />
              </button>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: '0.2rem' }}>Let's Work Together</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Fill in the form and I'll get back to you soon.</p>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '1.75rem 0' }}>
                  <div style={{ fontSize: 40, marginBottom: '0.75rem' }}>✅</div>
                  <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, color: '#1a1a1a', marginBottom: '0.4rem', fontSize: 16 }}>Message Sent!</h4>
                  <p style={{ color: '#888884', fontSize: 13 }}>I'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#353535', marginBottom: '0.35rem' }}>Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. John Smith"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      style={{ width: '100%', padding: '0.6rem 0.85rem', border: `1.5px solid ${formErrors.name ? '#f44336' : '#e4e4e1'}`, borderRadius: 8, fontSize: 13.5, color: '#353535', outline: 'none', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box', background: '#fafaf9' }}
                    />
                    {formErrors.name && <p style={{ color: '#f44336', fontSize: 11.5, marginTop: '0.2rem' }}>{formErrors.name}</p>}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#353535', marginBottom: '0.35rem' }}>Your Email</label>
                    <input
                      type="email"
                      placeholder="e.g. john@company.com"
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      style={{ width: '100%', padding: '0.6rem 0.85rem', border: `1.5px solid ${formErrors.email ? '#f44336' : '#e4e4e1'}`, borderRadius: 8, fontSize: 13.5, color: '#353535', outline: 'none', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box', background: '#fafaf9' }}
                    />
                    {formErrors.email && <p style={{ color: '#f44336', fontSize: 11.5, marginTop: '0.2rem' }}>{formErrors.email}</p>}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#353535', marginBottom: '0.35rem' }}>Your Message</label>
                    <textarea
                      rows={4}
                      placeholder="Tell me about your project, timeline, or any questions..."
                      value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      style={{ width: '100%', padding: '0.6rem 0.85rem', border: `1.5px solid ${formErrors.message ? '#f44336' : '#e4e4e1'}`, borderRadius: 8, fontSize: 13.5, color: '#353535', outline: 'none', resize: 'none', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box', background: '#fafaf9' }}
                    />
                    {formErrors.message && <p style={{ color: '#f44336', fontSize: 11.5, marginTop: '0.2rem' }}>{formErrors.message}</p>}
                  </div>
                  {sendError && (
                    <p style={{ color: '#f44336', fontSize: 12.5, background: '#fff3f3', border: '1px solid #ffcdd2', borderRadius: 6, padding: '0.5rem 0.75rem' }}>{sendError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem', padding: '0.7rem', background: '#3c6e71', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13.5, cursor: sending ? 'not-allowed' : 'pointer', opacity: sending ? 0.75 : 1, fontFamily: "'Inter', sans-serif" }}
                  >
                    {sending ? <><Loader2 size={14} className="animate-spin" /> Sending...</> : <><Send size={14} /> Send Message</>}
                  </button>
                </>
              )}
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
