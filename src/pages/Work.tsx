import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, X, ChevronLeft, ChevronRight, Play } from 'lucide-react'

const videos = [
  { id: 'QYtqpC3wWi0', title: 'Making the Syllabus Your Secret Weapon', module: 'JEDU-01294', category: 'E-Learning', featured: true },
  { id: 'dD0TlmZ9UKU', title: 'Communication Fundamentals', module: 'JCOM-40237', category: 'Communication' },
  { id: 'Ena5dp9hprE', title: 'Professional Communication Skills', module: 'JCOM-40246', category: 'Communication' },
  { id: 'Ek1BW5xXv_I', title: 'E-Learning Module 006', module: 'JEDU-1280_006', category: 'E-Learning' },
  { id: 'aYoBSNURPIU', title: 'E-Learning Module 010', module: 'JEDU-1297_010', category: 'E-Learning' },
  { id: 'Toj1zjDnqng', title: 'E-Learning Module 003', module: 'JEDU-1300_003', category: 'E-Learning' },
  { id: '--cSbAXg_zQ', title: 'E-Learning Module 007', module: 'JEDU-1300_007', category: 'E-Learning' },
  { id: 'yguvMEBkhBo', title: 'Advanced Learning Module', module: 'JEDU-01290', category: 'E-Learning' },
  { id: 'FP_-fHxqwRg', title: 'Core Curriculum Module', module: 'JEDU-01291', category: 'E-Learning' },
  { id: '4xVNb6dyqAc', title: 'Learning Strategies Module', module: 'JEDU-01295', category: 'E-Learning' },
  { id: 'mMzYTpS28TE', title: 'Study Skills & Retention', module: 'JEDU-01296', category: 'E-Learning' },
  { id: 'LtEX2U0DSC4', title: 'Academic Excellence Module', module: 'JEDU-01298', category: 'E-Learning' },
  { id: 'Aly-VuR2HVo', title: 'Promotional Showcase 003', module: 'PROMO-003', category: 'Promotional', featured: true },
  { id: 'eFreA9l4aW8', title: 'VS School Kid Campaign', module: 'VS-School', category: 'Promotional' },
]

const workflowSteps = [
  {
    step: '01',
    title: 'Client Brief',
    description: 'Received a comprehensive brief for a vast e-learning platform spanning 12–24 modules. Analysed scope, audience, and learning objectives to define the creative direction.',
    color: '#3c6e71',
  },
  {
    step: '02',
    title: 'Storyboard & Pre-Production',
    description: 'Developed detailed storyboards with sketches, prepared audio mixes, and created character sheets and environment design documents to align the entire team.',
    color: '#284b63',
  },
  {
    step: '03',
    title: 'AI-Powered Asset Generation',
    description: 'Leveraged cutting-edge generative AI tools — Kling 3.0, Runway, Pika, MidJourney, and Flux Pro — to create production-grade, high-quality footage. Every visual asset you see is AI-generated.',
    color: '#3c6e71',
    badge: '100% AI Generated',
  },
  {
    step: '04',
    title: 'Motion Graphics & Animation',
    description: 'Assembled and animated all assets using the Adobe Suite — After Effects for motion graphics, Illustrator for vector elements, and Photoshop for compositing.',
    color: '#284b63',
  },
  {
    step: '05',
    title: 'Story Assembly',
    description: 'Assembled all elements based on the story plot with deliberate creative decisions — pacing, transitions, visual hierarchy, and narrative flow were all carefully considered.',
    color: '#3c6e71',
  },
  {
    step: '06',
    title: 'Sound Design & SFX',
    description: 'Added a comprehensive layer of SFX with detailed sound design in Premiere Pro — ambient audio, motion sound effects, and voice-over sync were all carefully crafted.',
    color: '#284b63',
  },
  {
    step: '07',
    title: 'QA & Client Delivery',
    description: 'Conducted multiple rounds of quality assurance — reviewing pacing, audio sync, visual consistency, and client feedback loops — before final delivery.',
    color: '#3c6e71',
  },
]

const categories = ['All', 'E-Learning', 'Communication', 'Promotional']

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Work() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = activeCategory === 'All' ? videos : videos.filter(v => v.category === activeCategory)

  function openLightbox(videoId: string) {
    const idx = videos.findIndex(v => v.id === videoId)
    setLightboxIndex(idx)
  }

  function closeLightbox() {
    setLightboxIndex(null)
  }

  function prevVideo() {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + videos.length) % videos.length)
  }

  function nextVideo() {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % videos.length)
  }

  const currentVideo = lightboxIndex !== null ? videos[lightboxIndex] : null

  return (
    <div style={{ minHeight: '100vh', background: '#f7f7f5', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(247,247,245,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #e5e5e3' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#888884', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#3c6e71', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 11, fontFamily: "'Syne', sans-serif" }}>MK</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: '#353535' }}>Mufaddal Kachwala</span>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem' }}>

        {/* Hero */}
        <motion.section variants={fadeUp} initial="hidden" animate="visible" style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(60,110,113,0.1)', border: '1px solid rgba(60,110,113,0.25)', borderRadius: 20, padding: '0.3rem 0.875rem', fontSize: 12, color: '#3c6e71', fontWeight: 600, marginBottom: '1.25rem' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3c6e71' }} />
            Featured Case Study
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 800, color: '#353535', lineHeight: 1.1, marginBottom: '1.25rem' }}>
            AI-Powered<br />E-Learning Platform
          </h1>
          <p style={{ color: '#888884', fontSize: 16, lineHeight: 1.75, maxWidth: 600, marginBottom: '2rem' }}>
            A complete end-to-end production of an e-learning platform spanning 12–24 modules, built entirely with cutting-edge generative AI tools and professional motion graphics workflows.
          </p>
          {/* Stats */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            {[
              { value: '14+', label: 'Modules Delivered' },
              { value: '100%', label: 'AI-Generated Assets' },
              { value: '7', label: 'Production Stages' },
              { value: '5+', label: 'AI Tools Used' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: '#3c6e71' }}>{s.value}</div>
                <div style={{ color: '#888884', fontSize: 12 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Production Workflow */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, color: '#353535', marginBottom: '0.5rem', paddingLeft: '0.75rem', borderLeft: '3px solid #3c6e71' }}>Production Workflow</h2>
          <p style={{ color: '#888884', fontSize: 14, marginBottom: '2rem', paddingLeft: '1rem' }}>A rigorous 7-stage process from brief to delivery.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {workflowSteps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="card"
                style={{ borderTop: `3px solid ${step.color}`, padding: '1.5rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: step.color, opacity: 0.3, lineHeight: 1 }}>{step.step}</span>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: '#353535' }}>{step.title}</h3>
                </div>
                <p style={{ color: '#888884', fontSize: 13, lineHeight: 1.65 }}>{step.description}</p>
                {step.badge && (
                  <div style={{ marginTop: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(60,110,113,0.1)', border: '1px solid rgba(60,110,113,0.25)', borderRadius: 12, padding: '0.2rem 0.6rem', fontSize: 11, color: '#3c6e71', fontWeight: 600 }}>
                    ✦ {step.badge}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Video Gallery */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, color: '#353535', marginBottom: '0.5rem', paddingLeft: '0.75rem', borderLeft: '3px solid #3c6e71' }}>Video Gallery</h2>
          <p style={{ color: '#888884', fontSize: 14, marginBottom: '1.5rem', paddingLeft: '1rem' }}>Click any video to watch it in full screen.</p>

          {/* Category Filter */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: 20,
                  border: '1.5px solid',
                  borderColor: activeCategory === cat ? '#3c6e71' : '#e5e5e3',
                  background: activeCategory === cat ? '#3c6e71' : '#fff',
                  color: activeCategory === cat ? '#fff' : '#888884',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  transition: 'all 0.15s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Video Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {filtered.map((video) => (
              <motion.div
                key={video.id}
                variants={fadeUp}
                onClick={() => openLightbox(video.id)}
                style={{ cursor: 'pointer', borderRadius: 12, overflow: 'hidden', background: '#fff', border: '1px solid #e5e5e3', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
              >
                {/* Thumbnail */}
                <div style={{ position: 'relative', aspectRatio: '16/9', background: '#1a1a1a', overflow: 'hidden' }}>
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                    alt={video.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  {/* Play overlay */}
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                      <Play size={18} fill="#353535" color="#353535" style={{ marginLeft: 3 }} />
                    </div>
                  </div>
                  {video.featured && (
                    <div style={{ position: 'absolute', top: 8, left: 8, background: '#3c6e71', color: '#fff', fontSize: 10, fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: 4 }}>FEATURED</div>
                  )}
                  <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 10, fontWeight: 600, padding: '0.2rem 0.5rem', borderRadius: 4 }}>{video.category}</div>
                </div>
                {/* Info */}
                <div style={{ padding: '0.875rem 1rem' }}>
                  <p style={{ fontSize: 11, color: '#3c6e71', fontWeight: 600, marginBottom: '0.25rem' }}>{video.module}</p>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: '#353535', lineHeight: 1.4 }}>{video.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tools Used */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: '#353535', marginBottom: '1.5rem' }}>Tools & Technologies</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {[
              { label: 'Motion & Compositing', tools: ['After Effects', 'Premiere Pro', 'Illustrator', 'Photoshop'] },
              { label: 'AI Generation', tools: ['Kling 3.0', 'Runway', 'Pika', 'MidJourney', 'Flux Pro'] },
              { label: 'Audio & Delivery', tools: ['Premiere Pro Audio', 'Speakerbox', 'Custom SFX Library'] },
            ].map((group, i) => (
              <div key={i}>
                <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: '#3c6e71', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{group.label}</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {group.tools.map((t, j) => (
                    <span key={j} style={{ background: '#f7f7f5', border: '1px solid #e5e5e3', borderRadius: 6, padding: '0.25rem 0.6rem', fontSize: 12, color: '#353535', fontWeight: 500 }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Back CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            to="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.5rem', background: '#353535', color: '#fff', borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}
          >
            <ArrowLeft size={15} /> Back to Portfolio
          </Link>
        </div>
      </main>

      {/* Lightbox */}
      {lightboxIndex !== null && currentVideo && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.92)', padding: '1rem' }}>
          {/* Close */}
          <button onClick={closeLightbox} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', zIndex: 10 }}>
            <X size={18} />
          </button>
          {/* Prev */}
          <button onClick={prevVideo} style={{ position: 'absolute', left: '1rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', zIndex: 10 }}>
            <ChevronLeft size={22} />
          </button>
          {/* Next */}
          <button onClick={nextVideo} style={{ position: 'absolute', right: '1rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', zIndex: 10 }}>
            <ChevronRight size={22} />
          </button>

          <motion.div
            key={currentVideo.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            style={{ width: '100%', maxWidth: 900 }}
          >
            {/* Video Info */}
            <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#3c6e71', fontSize: 12, fontWeight: 600 }}>{currentVideo.module}</p>
                <h3 style={{ fontFamily: "'Syne', sans-serif", color: '#fff', fontWeight: 700, fontSize: 18 }}>{currentVideo.title}</h3>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{lightboxIndex + 1} / {videos.length}</span>
            </div>
            {/* YouTube Embed */}
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 12, overflow: 'hidden', background: '#000' }}>
              <iframe
                src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                title={currentVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
