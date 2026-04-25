import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ExternalLink, X, Send, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const PROFILE_IMG = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663337111918/pLuikIytoYbgSzMX.webp'
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/REPLACE_WITH_YOUR_ID'

const experiences = [
  {
    title: 'Sr. Motion Graphics Designer · Team Lead',
    company: 'FireWalker Apps',
    period: '2024 – Present',
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
    highlights: [
      'Managed AR product animation pipeline from CAD to visualization',
      'Handled global brand clients across broadcast and digital',
    ],
  },
  {
    title: 'Motion Graphics Designer',
    company: 'NICE Software Solutions',
    period: '2020 – 2021',
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
  { value: '100M+', label: 'Views on YouTube' },
  { value: '50%', label: 'Faster via AI pipelines' },
  { value: '300+', label: 'Videos on-time delivery' },
  { value: '10', label: 'Person Creative team led' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
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
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setSent(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => { setContactOpen(false); setSent(false) }, 2500)
      } else {
        setSendError('Something went wrong. Please try again.')
      }
    } catch {
      setSendError('Network error. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const tealBtn: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.65rem 1.25rem', background: '#3c6e71', color: '#fff',
    border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 14,
    cursor: 'pointer', fontFamily: "'Inter', sans-serif",
  }
  const outlineBtn: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.65rem 1.25rem', background: 'transparent', color: '#3c6e71',
    border: '1.5px solid #3c6e71', borderRadius: 8, fontWeight: 600, fontSize: 14,
    textDecoration: 'none', fontFamily: "'Inter', sans-serif",
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f7f7f5', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'sticky', top: 0, zIndex: 40,
          background: 'rgba(247,247,245,0.95)', backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #e5e5e3',
        }}
      >
        <div style={{ maxWidth: 672, margin: '0 auto', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#3c6e71', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13, fontFamily: "'Syne', sans-serif" }}>MK</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: '#353535' }}>Mufaddal</span>
          </div>
          <nav style={{ display: 'flex', gap: '1.5rem', fontSize: 14 }}>
            <Link to="/work" style={{ color: '#888884', textDecoration: 'none' }}>Work</Link>
            <a href="#experience" style={{ color: '#888884', textDecoration: 'none' }}>Experience</a>
            <a href="#skills" style={{ color: '#888884', textDecoration: 'none' }}>Skills</a>
            <a href="#contact" style={{ color: '#888884', textDecoration: 'none' }}>Contact</a>
          </nav>
        </div>
      </motion.header>

      <main style={{ maxWidth: 672, margin: '0 auto', padding: '3rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        {/* Hero Card */}
        <motion.section variants={fadeUp} initial="hidden" animate="visible" className="card">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.75rem, 5vw, 2.25rem)', fontWeight: 800, color: '#353535', marginBottom: '0.25rem' }}>Mufaddal Kachwala</h1>
              <p style={{ color: '#888884', fontSize: 14 }}>Motion Graphics Designer & Team Lead</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#f0faf0', border: '1px solid #c6e8c6', borderRadius: 20, padding: '0.3rem 0.75rem', fontSize: 12, color: '#2e7d32', fontWeight: 600, whiteSpace: 'nowrap' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#4caf50' }} />
              Available
            </div>
          </div>

          {/* Profile Image */}
          <div style={{ borderRadius: 12, overflow: 'hidden', marginBottom: '2rem', background: '#f0f0ee' }}>
            <img
              src={PROFILE_IMG}
              alt="Mufaddal Kachwala"
              style={{ width: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top center', maxHeight: 480 }}
            />
            <div style={{ padding: '0.5rem 1rem', fontSize: 12, color: '#888884', textAlign: 'right' }}>Mufaddal Kachwala</div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', fontWeight: 700, color: '#353535', marginBottom: '1rem', lineHeight: 1.25 }}>
              I think in motion,<br />lead with craft, deliver on time
            </h2>
            <p style={{ color: '#888884', lineHeight: 1.7, fontSize: 15 }}>
              Senior Motion Graphics Designer with 5+ years delivering broadcast-grade motion across SaaS, enterprise media, and digital marketing. Expert in After Effects and the full Adobe Creative Suite. Led teams of 10+ creatives, built workflow pipelines cutting production time by 50%, and shipped 300+ projects under tight deadlines.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={() => setContactOpen(true)} style={tealBtn}>
              <Mail size={15} /> Get In Touch
            </button>
            <a href="https://linktr.ee/MufaddaiKach" target="_blank" rel="noopener noreferrer" style={outlineBtn}>
              Connect
            </a>
          </div>
        </motion.section>

        {/* Key Metrics */}
        <motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          {keyMetrics.map((m, i) => (
            <motion.div key={i} variants={fadeUp} className="card" style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, color: '#3c6e71', marginBottom: '0.25rem' }}>{m.value}</div>
              <p style={{ color: '#888884', fontSize: 13 }}>{m.label}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* Experience */}
        <motion.section id="experience" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.4rem, 4vw, 1.75rem)', fontWeight: 700, color: '#353535', marginBottom: '1.5rem', paddingLeft: '0.75rem', borderLeft: '3px solid #3c6e71' }}>Experience</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {experiences.map((exp, i) => (
              <motion.div key={i} variants={fadeUp} className="card" style={{ borderLeft: '4px solid #3c6e71' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '0.75rem', gap: '0.25rem' }}>
                  <div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: '#353535' }}>{exp.title}</h3>
                    <p style={{ color: '#3c6e71', fontSize: 13, fontWeight: 600 }}>{exp.company}</p>
                  </div>
                  <p style={{ color: '#888884', fontSize: 13 }}>{exp.period}</p>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {exp.highlights.map((h, j) => (
                    <li key={j} style={{ display: 'flex', gap: '0.6rem', color: '#888884', fontSize: 14, lineHeight: 1.5 }}>
                      <span style={{ color: '#3c6e71', flexShrink: 0, marginTop: 2 }}>▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section id="skills" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.4rem, 4vw, 1.75rem)', fontWeight: 700, color: '#353535', marginBottom: '1.5rem', paddingLeft: '0.75rem', borderLeft: '3px solid #3c6e71' }}>Skills & Expertise</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="card">
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: '#3c6e71', marginBottom: '1rem', fontSize: 15 }}>Core Skills</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {coreSkills.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3c6e71', flexShrink: 0 }} />
                    <span style={{ color: '#888884', fontSize: 13 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: '#3c6e71', marginBottom: '1rem', fontSize: 15 }}>Software</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {softwareSkills.map((s, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                      <span style={{ color: '#353535', fontSize: 13, fontWeight: 500 }}>{s.name}</span>
                      <span style={{ color: '#3c6e71', fontSize: 12 }}>{s.level}%</span>
                    </div>
                    <div style={{ height: 5, background: '#e5e5e3', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${s.level}%`, background: '#3c6e71', borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: '#284b63', marginBottom: '1rem', fontSize: 15 }}>AI & Creative Tools</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {aiTools.map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#284b63', flexShrink: 0 }} />
                    <span style={{ color: '#888884', fontSize: 13 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Education */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.4rem, 4vw, 1.75rem)', fontWeight: 700, color: '#353535', marginBottom: '1.5rem', paddingLeft: '0.75rem', borderLeft: '3px solid #3c6e71' }}>Education</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div className="card" style={{ borderLeft: '4px solid #3c6e71' }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: '#3c6e71', marginBottom: '0.25rem', fontSize: 16 }}>MAAC Institute</h3>
              <p style={{ color: '#353535', fontSize: 14, fontWeight: 500, marginBottom: '0.25rem' }}>Diploma in 3D Design</p>
              <p style={{ color: '#888884', fontSize: 13 }}>2018 – 2020</p>
            </div>
            <div className="card" style={{ borderLeft: '4px solid #284b63' }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: '#284b63', marginBottom: '0.25rem', fontSize: 16 }}>RCOEM</h3>
              <p style={{ color: '#353535', fontSize: 14, fontWeight: 500, marginBottom: '0.25rem' }}>Industrial Engineering</p>
              <p style={{ color: '#888884', fontSize: 13 }}>2017 – 2018</p>
            </div>
          </div>
        </motion.section>

        {/* Work CTA */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="card" style={{ borderLeft: '4px solid #284b63' }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.4rem, 4vw, 1.75rem)', fontWeight: 700, color: '#353535', marginBottom: '0.75rem' }}>Featured Work</h2>
          <p style={{ color: '#888884', fontSize: 14, lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Explore a comprehensive e-learning platform project featuring AI-generated assets, advanced motion graphics, and professional sound design across 14 production-grade modules.
          </p>
          <Link to="/work" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.25rem', background: '#284b63', color: '#fff', borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}>
            View Case Study →
          </Link>
        </motion.section>

        {/* Contact */}
        <motion.section id="contact" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="card" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.4rem, 4vw, 1.75rem)', fontWeight: 700, color: '#353535', marginBottom: '0.75rem' }}>Let's Create Something Amazing</h2>
          <p style={{ color: '#888884', fontSize: 14, lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: 360, margin: '0 auto 1.5rem' }}>
            I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={() => setContactOpen(true)} style={tealBtn}>
              <Mail size={15} /> Get In Touch
            </button>
            <a href="https://linktr.ee/MufaddaiKach" target="_blank" rel="noopener noreferrer" style={outlineBtn}>
              Connect
            </a>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e5e5e3', marginTop: '4rem' }}>
        <div style={{ maxWidth: 672, margin: '0 auto', padding: '2rem 1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', fontSize: 13, color: '#888884' }}>
          <p>© 2026 Mufaddal Kachwala. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="mailto:mufaddal244.mk@gmail.com" style={{ color: '#888884', textDecoration: 'none' }}>Email</a>
            <a href="https://linktr.ee/MufaddaiKach" target="_blank" rel="noopener noreferrer" style={{ color: '#888884', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              Links <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {contactOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }} onClick={() => setContactOpen(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'relative', background: '#fff', borderRadius: 16, overflow: 'hidden', width: '100%', maxWidth: 440, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
          >
            <div style={{ background: 'linear-gradient(135deg, #3c6e71 0%, #284b63 100%)', padding: '1.5rem 2rem', position: 'relative' }}>
              <button onClick={() => setContactOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
                <X size={14} />
              </button>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: '#fff', marginBottom: '0.25rem' }}>Let's Work Together</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>Fill in the form and I'll get back to you soon.</p>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ fontSize: 40, marginBottom: '0.75rem' }}>✅</div>
                  <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: '#353535', marginBottom: '0.5rem' }}>Message Sent!</h4>
                  <p style={{ color: '#888884', fontSize: 14 }}>I'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#353535', marginBottom: '0.4rem' }}>Your Name</label>
                    <input type="text" placeholder="e.g. John Smith" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} style={{ width: '100%', padding: '0.6rem 0.875rem', border: `1.5px solid ${formErrors.name ? '#f44336' : '#e5e5e3'}`, borderRadius: 8, fontSize: 14, color: '#353535', outline: 'none', fontFamily: "'Inter', sans-serif" }} />
                    {formErrors.name && <p style={{ color: '#f44336', fontSize: 12, marginTop: '0.25rem' }}>{formErrors.name}</p>}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#353535', marginBottom: '0.4rem' }}>Your Email</label>
                    <input type="email" placeholder="e.g. john@company.com" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} style={{ width: '100%', padding: '0.6rem 0.875rem', border: `1.5px solid ${formErrors.email ? '#f44336' : '#e5e5e3'}`, borderRadius: 8, fontSize: 14, color: '#353535', outline: 'none', fontFamily: "'Inter', sans-serif" }} />
                    {formErrors.email && <p style={{ color: '#f44336', fontSize: 12, marginTop: '0.25rem' }}>{formErrors.email}</p>}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#353535', marginBottom: '0.4rem' }}>Your Message</label>
                    <textarea rows={4} placeholder="Tell me about your project, timeline, or any questions..." value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} style={{ width: '100%', padding: '0.6rem 0.875rem', border: `1.5px solid ${formErrors.message ? '#f44336' : '#e5e5e3'}`, borderRadius: 8, fontSize: 14, color: '#353535', outline: 'none', resize: 'none', fontFamily: "'Inter', sans-serif" }} />
                    {formErrors.message && <p style={{ color: '#f44336', fontSize: 12, marginTop: '0.25rem' }}>{formErrors.message}</p>}
                  </div>
                  {sendError && <p style={{ color: '#f44336', fontSize: 13 }}>{sendError}</p>}
                  <button type="submit" disabled={sending} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', background: '#3c6e71', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: sending ? 'not-allowed' : 'pointer', opacity: sending ? 0.7 : 1, fontFamily: "'Inter', sans-serif" }}>
                    {sending ? <><Loader2 size={15} className="animate-spin" /> Sending...</> : <><Send size={15} /> Send Message</>}
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
