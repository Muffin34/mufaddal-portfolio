import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, X, ChevronLeft, ChevronRight, Play, Tv, BookOpen } from 'lucide-react'
import workContent from '../content/work.json'

const elearningVideos = workContent.elearningVideos
const promoVideos = workContent.promoVideos
const workflowSteps = workContent.workflowSteps
const elearningCategories = workContent.elearningCategories

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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

// Thumbnail with fallback for unlisted YouTube videos
function VideoThumbnail({ videoId, title }: { videoId: string; title: string }) {
  const [imgSrc, setImgSrc] = useState(`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`)
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#284b63,#3c6e71)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
        <Play size={28} color="rgba(255,255,255,0.7)" fill="rgba(255,255,255,0.7)" />
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, textAlign: 'center', padding: '0 0.75rem', lineHeight: 1.4 }}>{title}</span>
      </div>
    )
  }

  return (
    <img
      src={imgSrc}
      alt={title}
      onError={() => {
        if (imgSrc.includes('mqdefault')) {
          setImgSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`)
        } else {
          setFailed(true)
        }
      }}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  )
}

export default function Work() {
  const isMobile = useIsMobile()
  const [activeCategory, setActiveCategory] = useState('All')
  // Separate lightbox state for each section
  const [elearningLightbox, setElearningLightbox] = useState<number | null>(null)
  const [promoLightbox, setPromoLightbox] = useState<number | null>(null)

  const filteredElearning = activeCategory === 'All'
    ? elearningVideos
    : elearningVideos.filter(v => v.category === activeCategory)

  return (
    <div className="animated-gradient-page" style={{ minHeight: '100vh', width: '100%', overflowX: 'hidden', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(247,247,245,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #e5e5e3' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '0.875rem 1rem' : '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#888884', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#3c6e71', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 11, fontFamily: "'Manrope', sans-serif" }}>MK</div>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 16, color: '#353535' }}>Mufaddal Kachwala</span>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '2rem 1rem' : '3rem 1.5rem' }}>

        {/* ── SECTION 1: AI E-LEARNING ── */}
        <motion.section variants={fadeUp} initial="hidden" animate="visible" style={{ marginBottom: '5rem' }}>
          {/* Section badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(60,110,113,0.1)', border: '1px solid rgba(60,110,113,0.25)', borderRadius: 20, padding: '0.3rem 0.875rem', fontSize: 12, color: '#3c6e71', fontWeight: 600 }}>
              <BookOpen size={12} />
              AI E-Learning Platform
            </div>
          </div>

          <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 800, color: '#353535', lineHeight: 1.1, marginBottom: '1.25rem' }}>
            AI-Powered<br />E-Learning Platform
          </h1>
          <p style={{ color: '#888884', fontSize: 16, lineHeight: 1.75, maxWidth: 600, marginBottom: '2rem' }}>
            {workContent.elearningIntro}
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? '1rem' : '1.5rem', marginBottom: '3.5rem' }}>
            {workContent.elearningStats.map((s, i) => (
              <div key={i} style={{ textAlign: 'center', flex: isMobile ? '1 1 130px' : '0 1 auto' }}>
                <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 28, fontWeight: 800, color: '#3c6e71' }}>{s.value}</div>
                <div style={{ color: '#888884', fontSize: 12 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Production Workflow */}
          <div style={{ marginBottom: '3.5rem' }}>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, color: '#353535', marginBottom: '0.5rem', paddingLeft: '0.75rem', borderLeft: '3px solid #3c6e71' }}>Production Workflow</h2>
            <p style={{ color: '#888884', fontSize: 14, marginBottom: '2rem', paddingLeft: '1rem' }}>A rigorous 7-stage process from brief to delivery.</p>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {workflowSteps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="card"
                  style={{ borderTop: `3px solid ${step.color}`, padding: '1.5rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 28, fontWeight: 800, color: step.color, opacity: 0.3, lineHeight: 1 }}>{step.step}</span>
                    <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 15, color: '#353535' }}>{step.title}</h3>
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
          </div>

          {/* Video Gallery */}
          <div>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, color: '#353535', marginBottom: '0.5rem', paddingLeft: '0.75rem', borderLeft: '3px solid #3c6e71' }}>Video Gallery</h2>
            <p style={{ color: '#888884', fontSize: 14, marginBottom: '1.5rem', paddingLeft: '1rem' }}>Click any video to watch it in full screen.</p>

            {/* Category Filter */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {elearningCategories.map(cat => (
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
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
              {filteredElearning.map((video) => (
                <motion.div
                  key={video.id}
                  variants={fadeUp}
                  onClick={() => setElearningLightbox(elearningVideos.indexOf(video))}
                  style={{ cursor: 'pointer', borderRadius: 12, overflow: 'hidden', background: '#fff', border: '1px solid #e5e5e3', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                >
                  <div style={{ position: 'relative', aspectRatio: '16/9', background: '#1a1a1a', overflow: 'hidden' }}>
                    <VideoThumbnail videoId={video.id} title={video.title} />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                        <Play size={18} fill="#353535" color="#353535" style={{ marginLeft: 3 }} />
                      </div>
                    </div>
                    {video.featured && (
                      <div style={{ position: 'absolute', top: 8, left: 8, background: '#3c6e71', color: '#fff', fontSize: 10, fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: 4 }}>FEATURED</div>
                    )}
                    <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 10, fontWeight: 600, padding: '0.2rem 0.5rem', borderRadius: 4 }}>{video.category}</div>
                  </div>
                  <div style={{ padding: '0.875rem 1rem' }}>
                    <p style={{ fontSize: 11, color: '#3c6e71', fontWeight: 600, marginBottom: '0.25rem' }}>{video.module}</p>
                    <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 14, color: '#353535', lineHeight: 1.4 }}>{video.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── DIVIDER ── */}
        <div style={{ borderTop: '2px solid #e5e5e3', marginBottom: '5rem' }} />

        {/* ── SECTION 2: BROADCASTING & PROMOS ── */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ marginBottom: '5rem' }}>
          {/* Section badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(40,75,99,0.1)', border: '1px solid rgba(40,75,99,0.25)', borderRadius: 20, padding: '0.3rem 0.875rem', fontSize: 12, color: '#284b63', fontWeight: 600 }}>
              <Tv size={12} />
              Broadcasting & Promos
            </div>
          </div>

          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 800, color: '#353535', lineHeight: 1.1, marginBottom: '1.25rem' }}>
            Broadcasting &<br />Promotional Work
          </h2>
          <p style={{ color: '#888884', fontSize: 16, lineHeight: 1.75, maxWidth: 600, marginBottom: '2rem' }}>
            {workContent.promoIntro}
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? '1rem' : '1.5rem', marginBottom: '3rem' }}>
            {workContent.promoStats.map((s, i) => (
              <div key={i} style={{ textAlign: 'center', flex: isMobile ? '1 1 130px' : '0 1 auto' }}>
                <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 28, fontWeight: 800, color: '#284b63' }}>{s.value}</div>
                <div style={{ color: '#888884', fontSize: 12 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Promo Video Grid */}
          <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 700, color: '#353535', marginBottom: '0.5rem', paddingLeft: '0.75rem', borderLeft: '3px solid #284b63' }}>Promo Reel Gallery</h3>
          <p style={{ color: '#888884', fontSize: 14, marginBottom: '2rem', paddingLeft: '1rem' }}>Click any video to watch it in full screen.</p>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {promoVideos.map((video, idx) => (
              <motion.div
                key={video.id}
                variants={fadeUp}
                onClick={() => setPromoLightbox(idx)}
                style={{ cursor: 'pointer', borderRadius: 12, overflow: 'hidden', background: '#fff', border: '1px solid #e5e5e3', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
              >
                <div style={{ position: 'relative', aspectRatio: '16/9', background: '#1a1a1a', overflow: 'hidden' }}>
                  <VideoThumbnail videoId={video.id} title={video.title} />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                      <Play size={18} fill="#353535" color="#353535" style={{ marginLeft: 3 }} />
                    </div>
                  </div>
                  {video.featured && (
                    <div style={{ position: 'absolute', top: 8, left: 8, background: '#284b63', color: '#fff', fontSize: 10, fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: 4 }}>FEATURED</div>
                  )}
                  <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 10, fontWeight: 600, padding: '0.2rem 0.5rem', borderRadius: 4 }}>{video.tag}</div>
                </div>
                <div style={{ padding: '0.875rem 1rem' }}>
                  <p style={{ fontSize: 11, color: '#284b63', fontWeight: 600, marginBottom: '0.25rem' }}>{video.module}</p>
                  <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 14, color: '#353535', lineHeight: 1.4 }}>{video.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── TOOLS USED ── */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 20, fontWeight: 700, color: '#353535', marginBottom: '1.5rem' }}>Tools & Technologies</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {workContent.toolGroups.map((group, i) => (
              <div key={i}>
                <h4 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 13, color: '#3c6e71', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: 0 }}>{group.label}</h4>
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

      {/* ── E-LEARNING LIGHTBOX ── */}
      {elearningLightbox !== null && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.92)', padding: '1rem' }}>
          <button onClick={() => setElearningLightbox(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', zIndex: 10 }}>
            <X size={18} />
          </button>
          <button onClick={() => setElearningLightbox((elearningLightbox - 1 + elearningVideos.length) % elearningVideos.length)} style={{ position: 'absolute', left: '1rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', zIndex: 10 }}>
            <ChevronLeft size={22} />
          </button>
          <button onClick={() => setElearningLightbox((elearningLightbox + 1) % elearningVideos.length)} style={{ position: 'absolute', right: '1rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', zIndex: 10 }}>
            <ChevronRight size={22} />
          </button>
          <motion.div
            key={elearningVideos[elearningLightbox].id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            style={{ width: '100%', maxWidth: 900 }}
          >
            <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#3c6e71', fontSize: 12, fontWeight: 600 }}>{elearningVideos[elearningLightbox].module}</p>
                <h3 style={{ fontFamily: "'Manrope', sans-serif", color: '#fff', fontWeight: 700, fontSize: 18 }}>{elearningVideos[elearningLightbox].title}</h3>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{elearningLightbox + 1} / {elearningVideos.length}</span>
            </div>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 12, overflow: 'hidden', background: '#000' }}>
              <iframe
                src={`https://www.youtube.com/embed/${elearningVideos[elearningLightbox].id}?autoplay=1&rel=0&modestbranding=1`}
                title={elearningVideos[elearningLightbox].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* ── PROMO LIGHTBOX ── */}
      {promoLightbox !== null && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.92)', padding: '1rem' }}>
          <button onClick={() => setPromoLightbox(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', zIndex: 10 }}>
            <X size={18} />
          </button>
          <button onClick={() => setPromoLightbox((promoLightbox - 1 + promoVideos.length) % promoVideos.length)} style={{ position: 'absolute', left: '1rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', zIndex: 10 }}>
            <ChevronLeft size={22} />
          </button>
          <button onClick={() => setPromoLightbox((promoLightbox + 1) % promoVideos.length)} style={{ position: 'absolute', right: '1rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', zIndex: 10 }}>
            <ChevronRight size={22} />
          </button>
          <motion.div
            key={promoVideos[promoLightbox].id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            style={{ width: '100%', maxWidth: 900 }}
          >
            <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#3c6e71', fontSize: 12, fontWeight: 600 }}>{promoVideos[promoLightbox].module}</p>
                <h3 style={{ fontFamily: "'Manrope', sans-serif", color: '#fff', fontWeight: 700, fontSize: 18 }}>{promoVideos[promoLightbox].title}</h3>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{promoLightbox + 1} / {promoVideos.length}</span>
            </div>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 12, overflow: 'hidden', background: '#000' }}>
              <iframe
                src={`https://www.youtube.com/embed/${promoVideos[promoLightbox].id}?autoplay=1&rel=0&modestbranding=1`}
                title={promoVideos[promoLightbox].title}
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
