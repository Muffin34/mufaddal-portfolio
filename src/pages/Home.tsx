import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  Play,
  Award,
  Plus,
  Download,
  Mail,
  Expand,
} from "lucide-react";
import content from "../content/home.json";
import {
  Header,
  Footer,
  SectionHeading,
  FilmCard,
  VideoPlayer,
  Modal,
  ContactForm,
  TextLink,
  Thumbnail,
} from "../components/Portfolio";

type GalleryImage = { src: string; alt: string };
export default function Home() {
  const [filmIndex, setFilmIndex] = useState<number | null>(null);
  const [gallery, setGallery] = useState<GalleryImage | null>(null);
  const films = content.selectedWorks.map((work) => ({
    id: work.videoId,
    title: work.title,
  }));
  const featured = {
    id: content.saasSpotlight.videoId,
    title: content.saasSpotlight.title,
  };
  const allFilms = [
    ...new Map([featured, ...films].map((film) => [film.id, film])).values(),
  ];
  return (
    <>
      <Header />
      <main id="main">
        <section className="hero wrap" aria-labelledby="hero-title">
          <div className="hero-kicker">
            <p className="eyebrow">
              Independent thinking. Collective ambition.
            </p>
            <span className="availability">
              <i />
              {content.availabilityText}
            </span>
          </div>
          <h1 id="hero-title">
            {content.hero.line1}
            <br />
            <span>
              {content.hero.line2}
              <span className="accent-dot">.</span>
            </span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-role">{content.hero.highlight}</p>
            <p className="hero-summary">{content.hero.body}</p>
            <a
              className="round-link"
              href="#selected-work"
              aria-label="Explore selected work"
            >
              <ArrowDown size={25} />
            </a>
          </div>
          <div className="hero-proof">
            <a href="#awards">
              <Award size={16} /> 2 &times; Telly Award-winning work{" "}
              <ArrowUpRight size={14} />
            </a>
            <span>Product motion / AI learning / CGI</span>
          </div>
        </section>

        <section
          id="product-motion"
          className="spotlight"
          aria-label="Featured TB365 film"
        >
          <button
            className="spotlight-play"
            onClick={() => setFilmIndex(0)}
            aria-label="Play TB365 product motion film"
          >
            <Thumbnail
              id={featured.id}
              title="TB365 product motion film"
              eager
            />
            <div className="spotlight-top">
              <span className="eyebrow">In the spotlight</span>
              <span>Product motion &middot; TB365</span>
            </div>
            <span className="spotlight-center">
              <span className="play-orbit">
                <Play size={28} fill="currentColor" />
              </span>
              <span>Play the film</span>
            </span>
            <div className="spotlight-bottom">
              <h2>
                Complex product.
                <br />
                Clear story.
              </h2>
              <span className="spotlight-caption">
                TB365
                <br />
                <span>SaaS-style product motion</span>
              </span>
              <ArrowUpRight size={34} />
            </div>
          </button>
          <div className="spotlight-note wrap">
            <p>{content.saasSpotlight.description}</p>
            <span>{content.saasSpotlight.role}</span>
          </div>
        </section>

        <section className="metrics wrap" aria-label="Experience at a glance">
          {content.metrics.map((metric) => (
            <div key={metric.value}>
              <strong>{metric.value}</strong>
              <p>{metric.label}</p>
            </div>
          ))}
        </section>

        <section className="section wrap" id="selected-work">
          <SectionHeading
            number="01"
            label="Selected work"
            title="Made to move people."
          >
            <TextLink to="/work">Explore all films</TextLink>
          </SectionHeading>
          <div className="selected-grid">
            {content.selectedWorks.map((work, index) => (
              <div key={work.videoId}>
                <FilmCard
                  film={films[index]}
                  category={work.tags[0]}
                  onPlay={() =>
                    setFilmIndex(
                      allFilms.findIndex((film) => film.id === work.videoId),
                    )
                  }
                />
                <p className="project-description">{work.result}</p>
                <p className="project-role">{work.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="awards" className="awards-band">
          <div className="wrap awards-layout">
            <div className="awards-intro">
              <p className="eyebrow">
                <Award size={16} /> Independent recognition / 2026
              </p>
              <div className="award-number">
                02<span>&times;</span>
              </div>
              <h2>
                Telly Awards.
                <br />
                Stories that stand out.
              </h2>
              <p>{content.awardsSection.description}</p>
            </div>
            <div className="award-list">
              {content.awardsSection.awards.map((award, index) => (
                <a
                  href={award.url}
                  target="_blank"
                  rel="noreferrer"
                  key={award.url}
                >
                  <span className="award-index">
                    0{index + 1} / {award.year}
                  </span>
                  <h3>
                    {award.title.replace("Maximizing Your Education: ", "")}
                  </h3>
                  <p>{award.brief}</p>
                  <div>
                    <span>{award.category}</span>
                    <ArrowUpRight size={23} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="cgi" className="section wrap">
          <SectionHeading
            number="02"
            label="CGI & 3D production"
            title="Every detail, considered."
          >
            <p className="section-intro">
              Product realism meets production thinking. From luxury details to
              catalogue-scale consistency.
            </p>
          </SectionHeading>
          <div className="cgi-projects">
            {content.cgiSection.cases.map((project, index) => {
              const images: GalleryImage[] =
                "galleryImages" in project && project.galleryImages
                  ? project.galleryImages
                  : [];
              return (
                <details className="cgi-project" key={project.title}>
                  <summary>
                    <div className="cgi-cover">
                      <img
                        src={images[2]?.src || project.image}
                        alt={project.title}
                        loading="lazy"
                      />
                      <span className="cgi-index">0{index + 1}</span>
                      <span className="cgi-open">
                        <Plus size={23} />
                      </span>
                    </div>
                    <div className="cgi-caption">
                      <p className="eyebrow">{project.type}</p>
                      <h3>{project.title}</h3>
                      <p>{project.client}</p>
                    </div>
                  </summary>
                  <div className="cgi-details">
                    <p className="cgi-summary">{project.summary}</p>
                    {images.length > 0 && (
                      <div className="image-gallery">
                        {images.map((image) => (
                          <button
                            key={image.src}
                            onClick={() => setGallery(image)}
                            aria-label={`Expand ${image.alt}`}
                          >
                            <img
                              src={image.src}
                              alt={image.alt}
                              loading="lazy"
                            />
                            <Expand size={16} />
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="case-columns">
                      <div>
                        <p className="eyebrow">The brief</p>
                        <p>{project.caseStudy}</p>
                        <p className="eyebrow">My contribution</p>
                        <p>{project.role}</p>
                      </div>
                      <div>
                        <p className="eyebrow">Production workflow</p>
                        <ol>
                          {project.workflow.map((step) => (
                            <li key={step}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                    <div className="pipeline">
                      <span className="eyebrow">Pipeline</span>
                      <p>{project.pipeline}</p>
                    </div>
                    <div className="case-footer">
                      <p>
                        <strong>Tools</strong> {project.tools}
                      </p>
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Source project <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        </section>

        <section className="clients-section" aria-label="Selected brands">
          <div className="wrap clients-heading">
            <p className="eyebrow">Across my career</p>
            <p>
              Work for brands with
              <br />
              <strong>something to say.</strong>
            </p>
          </div>
          <div className="logo-marquee">
            <div className="logo-track">
              {[0, 1].map((copy) => (
                <div className="logo-set" key={copy} aria-hidden={copy === 1}>
                  {content.clientsSection.clients.map((client) => (
                    <div
                      className={
                        client.largerLogo ? "client-logo larger" : "client-logo"
                      }
                      key={client.name}
                    >
                      <img
                        src={client.logo}
                        alt={copy === 0 ? client.name : ""}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section wrap">
          <SectionHeading
            number="03"
            label="The person behind the pixels"
            title="A maker's eye. A lead's mindset."
          />
          <div className="about-layout">
            <div className="portrait">
              <img
                src={content.profileImage}
                alt="Mufaddal Kachwala"
                loading="lazy"
              />
              <span>Mufaddal Kachwala / Motion & creative leadership</span>
            </div>
            <div className="about-copy">
              <p className="large-copy">
                I connect the creative idea to the people, process, and craft it
                takes to deliver it.
              </p>
              <p>{content.leadershipSection.description}</p>
              <div className="leadership-list">
                {content.leadershipSection.strengths.map((item, index) => (
                  <details key={item.title} open={index === 0}>
                    <summary>
                      <span>0{index + 1}</span>
                      {item.title}
                      <Plus size={18} />
                    </summary>
                    <p>{item.description}</p>
                  </details>
                ))}
              </div>
              <a
                className="text-link"
                href={content.resumeUrl}
                target="_blank"
                rel="noreferrer"
              >
                The full picture <Download size={18} />
              </a>
            </div>
          </div>
          <div id="experience" className="experience">
            <div>
              <p className="eyebrow">Experience</p>
              <h3>
                Built through
                <br />
                doing.
              </h3>
            </div>
            <div>
              {content.experiences.map((job) => (
                <details className="experience-row" key={job.company}>
                  <summary>
                    <span>
                      <strong>{job.company}</strong>
                      <span>{job.title}</span>
                    </span>
                    <span className="experience-period">{job.period}</span>
                    <Plus size={18} />
                  </summary>
                  <ul>
                    {job.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>
          <div className="toolkit">
            <p className="eyebrow">The toolkit</p>
            <div>
              {Array.from(
                new Set([
                  ...content.softwareSkills.map((skill) => skill.name),
                  "3ds Max",
                  "V-Ray",
                  "Substance Painter",
                  "PlayCanvas",
                  "Gen AI workflow",
                ]),
              ).map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </div>
          <div className="education">
            <p className="eyebrow">Education</p>
            {content.education.map((item) => (
              <p key={item.school}>
                <strong>{item.school}</strong> / {item.program}{" "}
                <span>{item.period}</span>
              </p>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-band">
          <div className="wrap">
            <div className="contact-heading">
              <div>
                <p className="eyebrow">Have something in mind?</p>
                <h2>
                  Let's make
                  <br />
                  the next move<span>.</span>
                </h2>
              </div>
              <ArrowUpRight className="contact-arrow" aria-hidden="true" />
              <div className="contact-meta">
                <span className="availability">
                  <i />
                  {content.availabilityText}
                </span>
                <p>{content.availabilityFor.join(" / ")}</p>
              </div>
            </div>
            <div className="contact-grid">
              <div>
                <a
                  className="contact-email"
                  href={`mailto:${content.contactEmail}`}
                >
                  <Mail size={18} />
                  {content.contactEmail}
                </a>
                <a
                  className="text-link"
                  href={content.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Download resume <ArrowRight size={18} />
                </a>
                <a
                  className="text-link"
                  href={content.linktreeUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Find me elsewhere <ArrowUpRight size={18} />
                </a>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {filmIndex !== null && (
        <VideoPlayer
          films={allFilms}
          index={filmIndex}
          onChange={setFilmIndex}
          onClose={() => setFilmIndex(null)}
        />
      )}{" "}
      {gallery && (
        <Modal
          title={gallery.alt}
          onClose={() => setGallery(null)}
          className="image-dialog"
        >
          <img src={gallery.src} alt={gallery.alt} />
        </Modal>
      )}
    </>
  );
}
