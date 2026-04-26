import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ExternalLink, X, Send, Loader2, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'

const PROFILE_IMG = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663337111918/pLuikIytoYbgSzMX.webp'

// ── EmailJS credentials ─────────────────────────────────────────────────────
// Sign up free at https://www.emailjs.com, connect your Gmail,
// create a template, then replace the three values below.
const EMAILJS_SERVICE_ID  = 'service_a207vhb'
const EMAILJS_TEMPLATE_ID = 'template_qf9rl2p'
const EMAILJS_PUBLIC_KEY  = 'qB6pPJC1goNLaEeLb'

const experiences = [
  {
    title: 'Sr. Motion Graphics Designer · Team Lead',
    company: 'FireWalker Apps',
    period: '2024 – Present',
    color: '#3c6e71',
    highlights: [
      'Led a cross-functional team of 10 designers and animators',
      'Built end-to-end workflow pipelines reducing production time by 40–50%',
      'Designed motion graphics for SaaS and enterprise clients',
      'Integrated AI tools (Kling 3.0, Runway, Pika) into team pipelines',
    ],
  },
  {
    title: 'Motion Graphics Lead · Head of Production',
    company: 'Thinketh Media',
    period: '2020 – 2024',
    color: '#284b63',
    highlights: [
      'Led motion design for YouTube network with 2.6M+ subscribers',
      'Delivered 300+ explainer videos with 65%+ viewer retention',
      'Built internal motion pipelines and animation libraries',
      'Developed proprietary prompt-engineering methodology',
    ],
  },
  {
    title: 'Associate Process Manager · AR Motion',
    company: 'Eclerx Digital · CLX Europe',
    period: '2021 – 2022',
    color: '#3c6e71',
    highlights: [
      'Managed AR product animation pipeline from CAD to visualization',
      'Handled global brand clients across broadcast and digital',
    ],
  },
  {
    title: 'Motion Graphics Designer',
    company: 'NICE Software Solutions',
    period: '2020 – 2021',
    color: '#284b63',
    highlights: [
      'Designed animated sequences and UI elements for LMS modules',
      'Developed reusable templates to accelerate production',
    ],
  },
]

const coreSkills = [
  'Motion Graphics & Animation',
  'Brand Motion Systems',
  'Visual Storytelling',
  'Typography in Motion',
  'Color Theory & Grading',
  'Social & Broadcast Formats',
  'Product Explainer Videos',
  '2D / 3D Animation',
  'Character Animation',
  'Compositing & VFX',
]

const softwareSkills = [
  { name: 'After Effects', level: 95 },
  { name: 'Premiere Pro', level: 90 },
  { name: 'Illustrator', level: 85 },
  { name: 'Photoshop', level: 85 },
  { name: 'Blender', level: 80 },
  { name: 'Figma', level: 85 },
]

const aiTools = ['Kling 3.0', 'Runway', 'Pika', 'MidJourney', 'Flux Pro', 'Speakerbox', 'Prompt Engineering']

const keyMetrics = [
  { value: '100M+', label: 'Views Across TV Broadcasts (UK, US & Germany)' },
  { value: '50%', label: 'Faster via AI pipelines' },
  { value: '300+', label: 'Videos Produced' },
  { value: '10', label: 'Person creative team led' },
]

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
  borderRadius: 14,
  border: '1px solid #e4e4e1',
  boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
}

const sectionLabel: React.CSSProperties = {
  fontFamily: "'Syne', sans-serif",
  fontSize: 22,
  fontWeight: 700,
  color: '#1a1a1a',
  letterSpacing: '-0.02em',
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

export default function Home() {
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
          to_email: 'mufaddal244.mk@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      )
      setSent(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => {
        setContactOpen(false)
        setSent(false)
      }, 3000)
    } catch (err) {
      setSendError('Failed to send message. Please email me directly at mufaddal244.mk@gmail.com')
    } finally {
      setSending(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f3', fontFamily: "'Inter', sans-serif", color: '#353535' }}>

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
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#3c6e71,#284b63)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 11, fontFamily: "'Syne', sans-serif", letterSpacing: 0.5 }}>MK</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: '#1a1a1a', letterSpacing: '-0.01em' }}>Mufaddal</span>
          </div>
          <nav style={{ display: 'flex', gap: '1.75rem', fontSize: 13.5, fontWeight: 500 }}>
            <Link to="/work" style={{ color: '#666662', textDecoration: 'none' }}>Work</Link>
            <a href="#experience" style={{ color: '#666662', textDecoration: 'none' }}>Experience</a>
            <a href="#skills" style={{ color: '#666662', textDecoration: 'none' }}>Skills</a>
            <a href="#contact" style={{ color: '#666662', textDecoration: 'none' }}>Contact</a>
          </nav>
        </div>
      </motion.header>

      {/* ── HERO ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '4rem 2rem 3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3.5rem', alignItems: 'center' }}>
          {/* Left */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#edf7ed', border: '1px solid #c8e6c9', borderRadius: 20, padding: '0.25rem 0.75rem', fontSize: 12, color: '#2e7d32', fontWeight: 600, marginBottom: '1.25rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4caf50' }} />
              Available for new projects
            </div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: '#1a1a1a', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
              I think in motion,<br />
              <span style={{ color: '#3c6e71' }}>lead with craft,</span><br />
              deliver on time.
            </h1>
            <p style={{ color: '#666662', lineHeight: 1.7, fontSize: 15, maxWidth: 480, marginBottom: '2rem' }}>
              Senior Motion Graphics Designer with 5+ years delivering broadcast-grade motion across SaaS, enterprise media, and digital marketing. Expert in After Effects and the full Adobe Creative Suite — led teams of 10+, cut production time by 50%, and shipped 300+ projects.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setContactOpen(true)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.65rem 1.25rem', background: '#3c6e71', color: '#fff', border: 'none', borderRadius: 9, fontWeight: 600, fontSize: 13.5, cursor: 'pointer', fontFamily: "'Inter', sans-serif", boxShadow: '0 2px 8px rgba(60,110,113,0.25)' }}
              >
                <Mail size={14} /> Get In Touch
              </button>
              <a
                href="https://linktr.ee/MufaddalKach"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.65rem 1.25rem', background: 'transparent', color: '#3c6e71', border: '1.5px solid #3c6e71', borderRadius: 9, fontWeight: 600, fontSize: 13.5, textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}
              >
                Connect <ExternalLink size={12} />
              </a>
              <Link
                to="/work"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.25rem', background: '#284b63', color: '#fff', borderRadius: 9, fontWeight: 600, fontSize: 13.5, textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}
              >
                View Work <ChevronRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Right: photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', background: '#e8e8e6' }}
          >
            <img
              src={PROFILE_IMG}
              alt="Mufaddal Kachwala"
              style={{ width: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top center' }}
            />
            <div style={{ padding: '0.5rem 0.875rem', fontSize: 11.5, color: '#999996', background: '#fff', textAlign: 'right' }}>
              Mufaddal Kachwala · Motion Graphics Designer
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── METRICS ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 3.5rem' }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}
        >
          {keyMetrics.map((m, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              style={{ ...card, padding: '1.5rem 1.25rem', textAlign: 'center' }}
            >
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: '#3c6e71', marginBottom: '0.3rem', lineHeight: 1 }}>{m.value}</div>
              <p style={{ color: '#888884', fontSize: 12.5, lineHeight: 1.45 }}>{m.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 3.5rem' }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div style={sectionLabel}>
            <span style={accentBar} />
            Experience
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                style={{ ...card, padding: '1.5rem 1.5rem', borderLeft: `3px solid ${exp.color}` }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.625rem', gap: '0.75rem' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: '#1a1a1a', fontSize: 14, marginBottom: '0.2rem', lineHeight: 1.35 }}>{exp.title}</h3>
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
      <section id="skills" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 3.5rem' }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div style={sectionLabel}>
            <span style={accentBar} />
            Skills & Expertise
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', alignItems: 'start' }}>
            {/* Core Skills */}
            <div style={{ ...card, padding: '1.5rem' }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: '#3c6e71', marginBottom: '1rem', fontSize: 13.5 }}>Core Skills</h3>
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
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: '#3c6e71', marginBottom: '1rem', fontSize: 13.5 }}>Software Proficiency</h3>
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
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: '#fff', marginBottom: '0.3rem', fontSize: 13.5 }}>AI & Creative Tools</h3>
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
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 3.5rem' }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div style={sectionLabel}>
            <span style={accentBar} />
            Education
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ ...card, padding: '1.5rem', borderLeft: '3px solid #3c6e71' }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: '#3c6e71', fontSize: 15, marginBottom: '0.3rem' }}>MAAC Institute</h3>
              <p style={{ color: '#353535', fontSize: 13.5, fontWeight: 500, marginBottom: '0.2rem' }}>Diploma in 3D Design</p>
              <p style={{ color: '#999996', fontSize: 12.5 }}>2018 – 2020</p>
            </div>
            <div style={{ ...card, padding: '1.5rem', borderLeft: '3px solid #284b63' }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: '#284b63', fontSize: 15, marginBottom: '0.3rem' }}>RCOEM</h3>
              <p style={{ color: '#353535', fontSize: 13.5, fontWeight: 500, marginBottom: '0.2rem' }}>Industrial Engineering</p>
              <p style={{ color: '#999996', fontSize: 12.5 }}>2017 – 2018</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FEATURED WORK + CONTACT ── */}
      <section id="contact" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {/* Featured Work */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ background: 'linear-gradient(145deg,#284b63,#1e3a4f)', borderRadius: 14, padding: '2rem', boxShadow: '0 6px 24px rgba(40,75,99,0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 220 }}
          >
            <div>
              <span style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 20, padding: '0.2rem 0.65rem', fontSize: 10.5, color: 'rgba(255,255,255,0.65)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Case Study</span>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: '#fff', marginTop: '0.875rem', marginBottom: '0.625rem', lineHeight: 1.3, letterSpacing: '-0.02em' }}>E-Learning Platform Production</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, lineHeight: 1.65 }}>
                14 production-grade modules with AI-generated assets, advanced motion graphics, and professional sound design.
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
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: '#1a1a1a', marginBottom: '0.625rem', lineHeight: 1.3, letterSpacing: '-0.02em' }}>Let's Create Something Amazing</h2>
              <p style={{ color: '#888884', fontSize: 13, lineHeight: 1.65 }}>
                I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
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
                href="https://linktr.ee/MufaddalKach"
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
            <a href="mailto:mufaddal244.mk@gmail.com" style={{ color: '#999996', textDecoration: 'none' }}>Email</a>
            <a href="https://linktr.ee/MufaddalKach" target="_blank" rel="noopener noreferrer" style={{ color: '#999996', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
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
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: '0.2rem' }}>Let's Work Together</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Fill in the form and I'll get back to you soon.</p>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '1.75rem 0' }}>
                  <div style={{ fontSize: 40, marginBottom: '0.75rem' }}>✅</div>
                  <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: '#1a1a1a', marginBottom: '0.4rem', fontSize: 16 }}>Message Sent!</h4>
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
