import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ExternalLink, X, Send, Loader2, ChevronRight, FileText, PlayCircle } from 'lucide-react'
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
const coreSkills = homeContent.coreSkills
const softwareSkills = homeContent.softwareSkills
const aiTools = homeContent.aiTools
const keyMetrics = homeContent.metrics
const clientsSection = homeContent.clientsSection
const clientLogos = clientsSection.clients
const availabilityFor = homeContent.availabilityFor
const leadershipSection = homeContent.leadershipSection
const selectedWorks = homeContent.selectedWorks
const education = homeContent.education

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#3c6e71,#284b63)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 11, fontFamily: "'Sora', sans-serif", letterSpacing: 0 }}>MK</div>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: '#1a1a1a', letterSpacing: 0 }}>Mufaddal</span>
          </div>
          <nav style={{ display: 'flex', gap: isMobile ? '0.75rem' : '1.75rem', fontSize: isMobile ? 12.5 : 13.5, fontWeight: 500, flexWrap: 'wrap', justifyContent: isMobile ? 'flex-start' : 'flex-end', minWidth: 0 }}>
            <Link to="/work" style={{ color: '#666662', textDecoration: 'none' }}>Work</Link>
            <a href="#experience" style={{ color: '#666662', textDecoration: 'none' }}>Experience</a>
            <a href="#skills" style={{ color: '#666662', textDecoration: 'none' }}>Skills</a>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#666662', textDecoration: 'none' }}>Resume</a>
            <a href="#contact" style={{ color: '#666662', textDecoration: 'none' }}>Contact</a>
          </nav>
        </div>
      </motion.header>

      {/* ── HERO ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '2.5rem 1rem 2rem' : '4rem 2rem 3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'minmax(0, 1fr) 380px', gap: isMobile ? '2rem' : '3.5rem', alignItems: 'center' }}>
          {/* Left */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#edf7ed', border: '1px solid #c8e6c9', borderRadius: 20, padding: '0.25rem 0.75rem', fontSize: 12, color: '#2e7d32', fontWeight: 600, marginBottom: '1.25rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4caf50' }} />
              {homeContent.availabilityText}
            </div>
            <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: '#1a1a1a', lineHeight: 1.15, letterSpacing: 0, marginBottom: '1.25rem' }}>
              {homeContent.hero.line1}<br />
              {homeContent.hero.line2}<br />
              <span style={{ color: '#3c6e71' }}>{homeContent.hero.highlight}</span>
            </h1>
            <p style={{ color: '#666662', lineHeight: 1.7, fontSize: 15, maxWidth: 480, marginBottom: '2rem' }}>
              {homeContent.hero.body}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
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
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '1.25rem' }}>
              {availabilityFor.map((item) => (
                <span key={item} style={{ background: 'rgba(255,255,255,0.72)', border: '1px solid #e4e4e1', borderRadius: 6, padding: '0.32rem 0.55rem', color: '#5f6560', fontSize: 12, fontWeight: 600 }}>
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

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

      {/* ── METRICS ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 1rem 2.5rem' : '0 2rem 3.5rem' }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))', gap: '1rem' }}
        >
          {keyMetrics.map((m, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              style={{ ...card, padding: '1.5rem 1.25rem', textAlign: 'center' }}
            >
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 28, fontWeight: 800, color: '#3c6e71', marginBottom: '0.3rem', lineHeight: 1 }}>{m.value}</div>
              <p style={{ color: '#888884', fontSize: 12.5, lineHeight: 1.45 }}>{m.label}</p>
            </motion.div>
          ))}
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
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'repeat(2, minmax(0, 1fr))', gap: '0.85rem' }}>
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
                    <div className="client-logo-card" key={`${client.name}-${rowIndex}-${index}`}>
                      <img src={client.logo} alt={`${client.name} logo`} loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Selected work */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 1rem 2.5rem' : '0 2rem 3.5rem' }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div>
              <div style={sectionLabel}>
                <span style={accentBar} />
                Selected Work
              </div>
              <p style={{ color: '#777772', fontSize: 14, lineHeight: 1.65, maxWidth: 560 }}>
                A quick employer-friendly snapshot of the work I would want a hiring manager to see first.
              </p>
            </div>
            <Link
              to="/work"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1rem', background: '#1f2930', color: '#fff', borderRadius: 8, fontWeight: 600, fontSize: 13, textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}
            >
              View All Work <ChevronRight size={14} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'repeat(auto-fit, minmax(245px, 1fr))', gap: '1rem' }}>
            {selectedWorks.map((work) => (
              <motion.div key={work.videoId} variants={fadeUp} style={{ ...card, overflow: 'hidden', padding: 0 }}>
                <Link to="/work" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>
                  <div style={{ position: 'relative', aspectRatio: '16/9', background: '#1a1a1a', overflow: 'hidden' }}>
                    <img
                      src={`https://img.youtube.com/vi/${work.videoId}/hqdefault.jpg`}
                      alt={work.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.42))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#284b63', boxShadow: '0 8px 18px rgba(0,0,0,0.2)' }}>
                        <PlayCircle size={22} />
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, color: '#1a1a1a', fontSize: 15, marginBottom: '0.5rem', lineHeight: 1.35 }}>{work.title}</h3>
                    <div style={{ display: 'grid', gap: '0.25rem', marginBottom: '0.75rem', color: '#777772', fontSize: 12.5, lineHeight: 1.45 }}>
                      <span><strong style={{ color: '#353535' }}>Client:</strong> {work.client}</span>
                      <span><strong style={{ color: '#353535' }}>Role:</strong> {work.role}</span>
                      <span><strong style={{ color: '#353535' }}>Tools:</strong> {work.tools}</span>
                    </div>
                    <p style={{ color: '#666662', fontSize: 13, lineHeight: 1.6, marginBottom: '0.875rem' }}>{work.result}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {work.tags.map((tag) => (
                        <span key={tag} style={{ background: '#f3f6f5', border: '1px solid #dce5e3', borderRadius: 6, padding: '0.22rem 0.5rem', color: '#3c6e71', fontSize: 11.5, fontWeight: 600 }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
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

      {/* ── SKILLS ── */}
      <section id="skills" style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 1rem 2.5rem' : '0 2rem 3.5rem' }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div style={sectionLabel}>
            <span style={accentBar} />
            Skills & Expertise
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'repeat(3, minmax(0, 1fr))', gap: '1rem', alignItems: 'start' }}>
            {/* Core Skills */}
            <div style={{ ...card, padding: '1.5rem' }}>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, color: '#3c6e71', marginBottom: '1rem', fontSize: 13.5 }}>Core Skills</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {coreSkills.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#3c6e71', flexShrink: 0 }} />
                    <span style={{ color: '#555552', fontSize: 13 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Software */}
            <div style={{ ...card, padding: '1.5rem' }}>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, color: '#3c6e71', marginBottom: '1rem', fontSize: 13.5 }}>Software Proficiency</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {softwareSkills.map((s, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                      <span style={{ color: '#353535', fontSize: 13, fontWeight: 500 }}>{s.name}</span>
                      <span style={{ color: '#3c6e71', fontSize: 12, fontWeight: 600 }}>{s.level}%</span>
                    </div>
                    <div style={{ height: 5, background: '#eeeeec', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${s.level}%`, background: 'linear-gradient(90deg,#3c6e71,#284b63)', borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Tools */}
            <div style={{ background: 'linear-gradient(145deg,#284b63,#1e3a4f)', borderRadius: 14, padding: '1.5rem', boxShadow: '0 4px 16px rgba(40,75,99,0.18)' }}>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, color: '#fff', marginBottom: '0.3rem', fontSize: 13.5 }}>AI & Creative Tools</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11.5, marginBottom: '1rem' }}>Cutting-edge generative AI pipeline</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {aiTools.map((t, i) => (
                  <span key={i} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 20, padding: '0.25rem 0.65rem', fontSize: 12, color: '#fff', fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── EDUCATION ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 1rem 2.5rem' : '0 2rem 3.5rem' }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div style={sectionLabel}>
            <span style={accentBar} />
            Education
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
            <div style={{ ...card, padding: '1.5rem', borderLeft: '3px solid #3c6e71' }}>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, color: education[0].color, fontSize: 15, marginBottom: '0.3rem' }}>{education[0].school}</h3>
              <p style={{ color: '#353535', fontSize: 13.5, fontWeight: 500, marginBottom: '0.2rem' }}>{education[0].program}</p>
              <p style={{ color: '#999996', fontSize: 12.5 }}>{education[0].period}</p>
            </div>
            <div style={{ ...card, padding: '1.5rem', borderLeft: '3px solid #284b63' }}>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, color: education[1].color, fontSize: 15, marginBottom: '0.3rem' }}>{education[1].school}</h3>
              <p style={{ color: '#353535', fontSize: 13.5, fontWeight: 500, marginBottom: '0.2rem' }}>{education[1].program}</p>
              <p style={{ color: '#999996', fontSize: 12.5 }}>{education[1].period}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FEATURED WORK + CONTACT ── */}
      <section id="contact" style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 1rem 3rem' : '0 2rem 5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
          {/* Featured Work */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ background: 'linear-gradient(145deg,#284b63,#1e3a4f)', borderRadius: 14, padding: '2rem', boxShadow: '0 6px 24px rgba(40,75,99,0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 220 }}
          >
            <div>
              <span style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 20, padding: '0.2rem 0.65rem', fontSize: 10.5, color: 'rgba(255,255,255,0.65)', fontWeight: 600, letterSpacing: 0, textTransform: 'uppercase' }}>{homeContent.caseStudy.label}</span>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: '#fff', marginTop: '0.875rem', marginBottom: '0.625rem', lineHeight: 1.3, letterSpacing: 0 }}>{homeContent.caseStudy.title}</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, lineHeight: 1.65 }}>
                {homeContent.caseStudy.description}
              </p>
            </div>
            <Link
              to="/work"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '1.5rem', padding: '0.6rem 1.2rem', background: '#fff', color: '#284b63', borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: 'none', alignSelf: 'flex-start' }}
            >
              View Case Study <ChevronRight size={13} />
            </Link>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ ...card, padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 220 }}
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
        </div>
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
