import { useState } from "react";
import { ArrowDown, Search, Award } from "lucide-react";
import { Link } from "react-router-dom";
import work from "../content/work.json";
import {
  Header,
  Footer,
  SectionHeading,
  FilmCard,
  VideoPlayer,
  TextLink,
} from "../components/Portfolio";

export default function Work() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<number | null>(null);
  const allFilms = [...work.elearningVideos, ...work.promoVideos];
  const filtered = work.elearningVideos.filter(
    (video) =>
      (category === "All" || video.category === category) &&
      `${video.title} ${video.module}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <Header />
      <main id="main">
        <section className="work-intro wrap">
          <p className="eyebrow">The film library</p>
          <h1>
            Ideas, in motion<span>.</span>
          </h1>
          <div>
            <p>
              Product stories. Learning journeys. Brand moments.
              <br />A collection of films, made from brief to final frame.
            </p>
            <a
              className="round-link"
              href="#learning"
              aria-label="Browse films"
            >
              <ArrowDown />
            </a>
          </div>
          <nav className="work-jumps" aria-label="Video sections">
            <a href="#learning">
              AI learning videos <span>{work.elearningVideos.length}</span>
            </a>
            <a href="#broadcast">
              Broadcast & promo videos <span>{work.promoVideos.length}</span>
            </a>
            <Link to="/#cgi">CGI & 3D projects</Link>
          </nav>
        </section>
        <section id="learning" className="section wrap work-section">
          <SectionHeading
            number="01"
            label="AI learning videos"
            title="A story for every learner."
          >
            <Link to="/#awards" className="award-inline">
              <Award size={18} /> 2 Telly Award-winning pieces
            </Link>
          </SectionHeading>
          <p className="library-intro">{work.elearningIntro}</p>
          <details className="workflow-disclosure">
            <summary>
              Behind the production <span>Brief to final delivery</span>
            </summary>
            <div className="workflow-grid">
              {work.workflowSteps.map((step) => (
                <div key={step.step}>
                  <span className="eyebrow">{step.step}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </details>
          <div className="library-tools">
            <div
              className="filter-tabs"
              role="group"
              aria-label="Filter AI learning videos"
            >
              {work.elearningCategories.map((item) => (
                <button
                  key={item}
                  aria-pressed={item === category}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <label className="search-field">
              <Search size={17} />
              <input
                type="search"
                placeholder="Find a film"
                aria-label="Search AI learning videos"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
          </div>
          <p className="results-count" role="status">
            {filtered.length} films
          </p>
          <div className="library-grid">
            {filtered.map((video) => (
              <FilmCard
                key={video.id}
                film={video}
                category={video.category}
                onPlay={() =>
                  setIndex(allFilms.findIndex((item) => item.id === video.id))
                }
              />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="empty-state">
              <h3>No films found</h3>
              <p>Try a different title or category.</p>
              <button
                className="button"
                onClick={() => {
                  setCategory("All");
                  setQuery("");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
        <section id="broadcast" className="section broadcast-band">
          <div className="wrap">
            <SectionHeading
              number="02"
              label="Broadcast & promo videos"
              title="Made for the moment."
            />
            <p className="library-intro">{work.promoIntro}</p>
            <div className="library-grid">
              {work.promoVideos.map((video) => (
                <FilmCard
                  key={video.id}
                  film={video}
                  category={video.tag}
                  onPlay={() =>
                    setIndex(allFilms.findIndex((item) => item.id === video.id))
                  }
                />
              ))}
            </div>
          </div>
        </section>
        <section className="work-cta wrap">
          <h2>
            Your next story
            <br />
            starts here.
          </h2>
          <TextLink to="/#contact">Let's talk about it</TextLink>
        </section>
      </main>
      <Footer />
      {index !== null && (
        <VideoPlayer
          films={allFilms}
          index={index}
          onChange={setIndex}
          onClose={() => setIndex(null)}
        />
      )}
    </>
  );
}
