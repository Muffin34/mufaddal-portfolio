import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Download,
  Menu,
  X,
  Play,
  ChevronLeft,
  ChevronRight,
  Send,
  Check,
  LoaderCircle,
  Pause,
  Sparkles,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import content from "../content/home.json";

export type Film = { id: string; title: string };

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [motionPaused, setMotionPaused] = useState(
    () => localStorage.getItem("portfolio-motion") === "paused",
  );
  useEffect(() => {
    document.documentElement.dataset.motion = motionPaused
      ? "paused"
      : "running";
    localStorage.setItem(
      "portfolio-motion",
      motionPaused ? "paused" : "running",
    );
  }, [motionPaused]);
  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="header-inner">
        <Link
          to="/"
          className="wordmark"
          aria-label="Mufaddal Kachwala home"
          onClick={() => {
            setOpen(false);
            if (location.pathname === "/") window.scrollTo({ top: 0 });
          }}
        >
          <span className="monogram">
            MK<span>.</span>
          </span>
          <span className="wordmark-name">
            Mufaddal
            <br />
            Kachwala
          </span>
        </Link>
        <nav
          aria-label="Main navigation"
          className={open ? "main-nav is-open" : "main-nav"}
          id="main-navigation"
        >
          <Link
            to="/work"
            onClick={() => setOpen(false)}
            aria-current={location.pathname === "/work" ? "page" : undefined}
          >
            Work
          </Link>
          <Link to="/#cgi" onClick={() => setOpen(false)}>
            CGI
          </Link>
          <Link
            to="/#awards"
            className="gold-link"
            onClick={() => setOpen(false)}
          >
            Awards <span>02</span>
          </Link>
          <Link to="/#about" onClick={() => setOpen(false)}>
            About
          </Link>
          <a
            href={content.resumeUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            Resume <Download size={14} />
          </a>
          <Link
            to="/#contact"
            className="nav-contact"
            onClick={() => setOpen(false)}
          >
            Let's talk <ArrowUpRight size={16} />
          </Link>
        </nav>
        <div className="header-controls">
          <button
            className="icon-button motion-toggle"
            onClick={() => setMotionPaused(!motionPaused)}
            title={
              motionPaused ? "Enable ambient motion" : "Pause ambient motion"
            }
            aria-label={
              motionPaused ? "Enable ambient motion" : "Pause ambient motion"
            }
            aria-pressed={motionPaused}
          >
            {motionPaused ? <Sparkles size={17} /> : <Pause size={17} />}
          </button>
          <button
            className="icon-button menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-controls="main-navigation"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer wrap">
      <Link to="/" className="monogram" aria-label="Home">
        MK<span>.</span>
      </Link>
      <p>Motion. Meaning. Momentum.</p>
      <span>&copy; {new Date().getFullYear()} Mufaddal Kachwala</span>
      <a href={content.linktreeUrl} target="_blank" rel="noreferrer">
        Elsewhere <ArrowUpRight size={14} />
      </a>
    </footer>
  );
}

export function SectionHeading({
  number,
  label,
  title,
  children,
}: {
  number: string;
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{number}</span> {label}
        </p>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}

export function Thumbnail({
  id,
  title,
  eager = false,
}: {
  id: string;
  title: string;
  eager?: boolean;
}) {
  return (
    <img
      src={
        id === "_0aeCMkb_dk"
          ? "/uploads/tb365-poster.jpg"
          : `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
      }
      alt={title}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

export function FilmCard({
  film,
  category,
  onPlay,
}: {
  film: Film;
  category: string;
  onPlay: () => void;
}) {
  return (
    <article className="film-card">
      <button
        className="film-image"
        onClick={onPlay}
        aria-label={`Play ${film.title}`}
      >
        <Thumbnail id={film.id} title={film.title} />
        <span className="film-category">{category}</span>
        <span className="play-orbit">
          <Play size={22} fill="currentColor" />
        </span>
        <span className="film-watch">
          Watch film <ArrowUpRight size={16} />
        </span>
      </button>
      <div className="film-caption">
        <h3>
          <button onClick={onPlay}>{film.title}</button>
        </h3>
        <ArrowUpRight size={20} aria-hidden="true" />
      </div>
    </article>
  );
}

export function Modal({
  children,
  title,
  onClose,
  className = "",
}: {
  children: ReactNode;
  title: string;
  onClose: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    ref.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`portfolio-dialog ${className}`}
      aria-label={title}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog-inner">
        <div className="dialog-heading">
          <h2>{title}</h2>
          <button
            autoFocus
            className="icon-button"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}

export function VideoPlayer({
  films,
  index,
  onChange,
  onClose,
}: {
  films: Film[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const film = films[index];
  return (
    <Modal title={film.title} onClose={onClose}>
      <div className="video-embed">
        <iframe
          key={film.id}
          src={`https://www.youtube-nocookie.com/embed/${film.id}?autoplay=1&rel=0`}
          title={film.title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="player-toolbar">
        <a
          href={`https://www.youtube.com/watch?v=${film.id}`}
          target="_blank"
          rel="noreferrer"
        >
          Watch on YouTube <ArrowUpRight size={16} />
        </a>
        {films.length > 1 && (
          <div>
            <button
              className="icon-button"
              title="Previous film"
              aria-label="Previous film"
              onClick={() =>
                onChange((index - 1 + films.length) % films.length)
              }
            >
              <ChevronLeft />
            </button>
            <span>
              {index + 1} / {films.length}
            </span>
            <button
              className="icon-button"
              title="Next film"
              aria-label="Next film"
              onClick={() => onChange((index + 1) % films.length)}
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    if (String(values.get("website") || "")) return;
    setStatus("sending");
    try {
      await emailjs.send(
        "service_a207vhb",
        "template_qf9rl2p",
        {
          from_name: String(values.get("name")).trim(),
          from_email: String(values.get("email")).trim(),
          message: String(values.get("message")).trim(),
          to_email: content.contactEmail,
        },
        "qB6pPJC1goNLaEeLb",
      );
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="Alex Morgan"
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="alex@company.com"
          />
        </label>
      </div>
      <label>
        What are you working on?
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={3}
          placeholder="A role, a project, or an idea..."
        />
      </label>
      <label className="honeypot" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="form-bottom">
        <p role="status">
          {status === "sent"
            ? "Message sent. Thank you for reaching out."
            : status === "error"
              ? `Could not send. Please email ${content.contactEmail}.`
              : "Your next project starts with a conversation."}
        </p>
        <button
          className="button button-mint"
          disabled={status === "sending"}
          type="submit"
        >
          {status === "sending" ? (
            <>
              Sending <LoaderCircle className="spin" size={17} />
            </>
          ) : status === "sent" ? (
            <>
              Sent <Check size={17} />
            </>
          ) : (
            <>
              Send message <Send size={17} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export function TextLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <Link className="text-link" to={to}>
      {children}
      <ArrowRight size={18} />
    </Link>
  );
}
