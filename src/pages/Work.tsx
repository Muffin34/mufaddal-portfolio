import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, X, ChevronLeft, ChevronRight, Play, Tv, BookOpen, Award, ExternalLink, Home as HomeIcon } from 'lucide-react'
import workContent from '../content/work.json'
import homeContent from '../content/home.json'

const elearningVideos = workContent.elearningVideos
const promoVideos = workContent.promoVideos
const elearningCategories = workContent.elearningCategories
const awardsSection = homeContent.awardsSection
const additionalElearningIds = new Set(['QYtqpC3wWi0', 'dD0TlmZ9UKU', 'aYoBSNURPIU', 'LtEX2U0DSC4'])

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
  const [elearningLightbox, setElearningLightbox] = useState<number | null>(null)
  const [promoLightbox, setPromoLightbox] = useState<number | null>(null)

  const filteredElearning = activeCategory === 'All'
    ? elearningVideos
    : elearningVideos.filter(video => video.category === activeCategory)
  const curatedElearning = filteredElearning.filter(video => !additionalElearningIds.has(video.id))
  const additionalElearning = filteredElearning.filter(video => additionalElearningIds.has(video.id))

  return (
    <div className="animated-gradient-page" style={{ minHeight: '100vh', width: '100%', overflowX: 'hidden', fontFamily: "'Inter', sans-serif" }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(247,247,245,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #e5e5e3' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '0.875rem 1rem' : '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link to="/" className="work-home-link">
            <ArrowLeft size={15} />
            <HomeIcon size={14} />
            Home
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#3c6e71', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 11, fontFamily: "'Sora', sans-serif" }}>MK</div>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: '#353535' }}>Mufaddal Kachwala</span>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '2rem 1rem' : '3rem 1.5rem' }}>
        <motion.section variants={fadeUp} initial="hidden" animate="visible" style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(60,110,113,0.1)', border: '1px solid rgba(60,110,113,0.25)', borderRadius: 20, padding: '0.3rem 0.875rem', fontSize: 12, color: '#3c6e71', fontWeight: 700, marginBottom: '1.25rem' }}>
            <BookOpen size={12} />
            AI learning videos
          </div>

          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 800, color: '#353535', lineHeight: 1.1, marginBottom: '1rem' }}>
            AI Learning & Course Motion Systems
          </h1>
          <p style={{ color: '#777772', fontSize: 16, lineHeight: 1.75, maxWidth: 680, marginBottom: '2rem' }}>
            {workContent.elearningIntro}
          </p>

          <div className="award-showcase" style={{ marginBottom: '2rem' }}>
            <div className="award-eyebrow" style={{ marginBottom: '0.7rem' }}>
              <Award size={14} />
              2026 Telly Award recognition
            </div>
            <p style={{ color: '#666662', fontSize: 14, lineHeight: 1.7, maxWidth: 760, marginBottom: '1rem' }}>
              Two pieces from the Maximizing Your Education series were recognized in the Telly Awards Non-Broadcast category for Craft - Use of Generative AI.
            </p>
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
                    <Award size={19} />
                  </div>
                  <div>
                    <span className="award-pill" style={{ marginBottom: '0.5rem' }}>{award.year}</span>
                    <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 14.5, fontWeight: 800, color: '#353535', lineHeight: 1.35, marginBottom: '0.35rem' }}>{award.title}</h3>
                    <p style={{ color: '#8a6119', fontSize: 12, fontWeight: 800, marginBottom: '0.45rem' }}>{award.category}</p>
                    <p style={{ color: '#666662', fontSize: 12.5, lineHeight: 1.55, marginBottom: '0.55rem' }}>{award.brief}</p>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#7a5516', fontSize: 12, fontWeight: 900 }}>
                      Official winner page <ExternalLink size={12} />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'repeat(3, minmax(0, 1fr))', gap: '0.85rem', marginBottom: '2rem' }}>
            {[
              ['Role', 'Motion lead, production owner and delivery QA across a larger learning-content system.'],
              ['Process', 'Brief, story, storyboard, visual direction, Gen AI workflow, animation, audio, SFX and final review.'],
              ['Employer Value', 'Shows scalable production thinking, not just one-off video execution.'],
            ].map(([label, value]) => (
              <div key={label} style={{ background: '#fff', border: '1px solid #e5e5e3', borderRadius: 8, padding: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.035)' }}>
                <p style={{ color: '#3c6e71', fontSize: 11.5, fontWeight: 800, marginBottom: '0.35rem', textTransform: 'uppercase' }}>{label}</p>
                <p style={{ color: '#555552', fontSize: 13, lineHeight: 1.55 }}>{value}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {elearningCategories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: 20,
                  border: '1.5px solid',
                  borderColor: activeCategory === category ? '#3c6e71' : '#e5e5e3',
                  background: activeCategory === category ? '#3c6e71' : '#fff',
                  color: activeCategory === category ? '#fff' : '#888884',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  transition: 'all 0.15s',
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 800, color: '#353535', marginBottom: '0.75rem' }}>
            Curated AI learning work
          </h2>
          <p style={{ color: '#888884', fontSize: 13.5, lineHeight: 1.65, maxWidth: 620, marginBottom: '1.25rem' }}>
            Start here: the strongest examples for motion leadership, storytelling, production quality and delivery ownership.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {curatedElearning.map((video) => (
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
                  <p style={{ fontSize: 11, color: '#3c6e71', fontWeight: 700, marginBottom: '0.25rem' }}>{video.module}</p>
                  <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 14, color: '#353535', lineHeight: 1.4 }}>{video.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          {additionalElearning.length > 0 && (
            <div style={{ marginTop: '3rem' }}>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 800, color: '#353535', marginBottom: '0.75rem' }}>
                Additional AI learning modules
              </h2>
              <p style={{ color: '#888884', fontSize: 13.5, lineHeight: 1.65, maxWidth: 620, marginBottom: '1.25rem' }}>
                Supporting archive pieces kept lower on the page so the best work leads the employer scan.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
                {additionalElearning.map((video) => (
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
                      <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 10, fontWeight: 600, padding: '0.2rem 0.5rem', borderRadius: 4 }}>{video.category}</div>
                    </div>
                    <div style={{ padding: '0.875rem 1rem' }}>
                      <p style={{ fontSize: 11, color: '#3c6e71', fontWeight: 700, marginBottom: '0.25rem' }}>{video.module}</p>
                      <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 14, color: '#353535', lineHeight: 1.4 }}>{video.title}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.section>

        <div style={{ borderTop: '2px solid #e5e5e3', marginBottom: '5rem' }} />

        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(40,75,99,0.1)', border: '1px solid rgba(40,75,99,0.25)', borderRadius: 20, padding: '0.3rem 0.875rem', fontSize: 12, color: '#284b63', fontWeight: 700, marginBottom: '1.25rem' }}>
            <Tv size={12} />
            Broadcast and promo videos
          </div>

          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#353535', lineHeight: 1.12, marginBottom: '0.85rem' }}>
            Broadcast and Promo Videos
          </h2>
          <p style={{ color: '#777772', fontSize: 15, lineHeight: 1.75, maxWidth: 680, marginBottom: '2rem' }}>
            {workContent.promoIntro}
          </p>

          <div style={{ background: '#fff', border: '1px solid #e5e5e3', borderRadius: 8, padding: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.035)', maxWidth: 720, marginBottom: '1.5rem' }}>
            <p style={{ color: '#284b63', fontSize: 11.5, fontWeight: 800, marginBottom: '0.35rem', textTransform: 'uppercase' }}>Role & value</p>
            <p style={{ color: '#555552', fontSize: 13, lineHeight: 1.6 }}>
              Promo and broadcast work showing pacing, attention control, edit rhythm, motion graphics, audio polish and export-ready delivery for fast-moving brand/content teams.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {promoVideos.map((video, index) => (
              <motion.div
                key={video.id}
                variants={fadeUp}
                onClick={() => setPromoLightbox(index)}
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
                  <p style={{ fontSize: 11, color: '#284b63', fontWeight: 700, marginBottom: '0.25rem' }}>{video.module}</p>
                  <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 14, color: '#353535', lineHeight: 1.4 }}>{video.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div style={{ textAlign: 'center' }}>
          <Link
            to="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.5rem', background: '#353535', color: '#fff', borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}
          >
            <ArrowLeft size={15} /> Back to Portfolio
          </Link>
        </div>
      </main>

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
            <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
              <div>
                <p style={{ color: '#3c6e71', fontSize: 12, fontWeight: 700 }}>{elearningVideos[elearningLightbox].module}</p>
                <h3 style={{ fontFamily: "'Sora', sans-serif", color: '#fff', fontWeight: 700, fontSize: 18 }}>{elearningVideos[elearningLightbox].title}</h3>
              </div>
              <a href={`https://www.youtube.com/watch?v=${elearningVideos[elearningLightbox].id}`} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 8, padding: '0.45rem 0.75rem', fontSize: 12.5, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                Open on YouTube
              </a>
            </div>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 12, overflow: 'hidden', background: '#000' }}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${elearningVideos[elearningLightbox].id}?autoplay=1&rel=0&modestbranding=1`}
                title={elearningVideos[elearningLightbox].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              />
            </div>
          </motion.div>
        </div>
      )}

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
            <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
              <div>
                <p style={{ color: '#3c6e71', fontSize: 12, fontWeight: 700 }}>{promoVideos[promoLightbox].module}</p>
                <h3 style={{ fontFamily: "'Sora', sans-serif", color: '#fff', fontWeight: 700, fontSize: 18 }}>{promoVideos[promoLightbox].title}</h3>
              </div>
              <a href={`https://www.youtube.com/watch?v=${promoVideos[promoLightbox].id}`} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 8, padding: '0.45rem 0.75rem', fontSize: 12.5, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                Open on YouTube
              </a>
            </div>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 12, overflow: 'hidden', background: '#000' }}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${promoVideos[promoLightbox].id}?autoplay=1&rel=0&modestbranding=1`}
                title={promoVideos[promoLightbox].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
