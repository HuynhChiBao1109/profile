import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, DownloadSimple, GithubLogo, List, MapPin, X } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const experiences = [
  {
    period: "Nov 2024 — Present",
    company: "INNORIX Vietnam",
    companyUrl: "https://innorix.com",
    role: "Backend Developer",
    context: "Exacoola is an Express.js file-transfer platform handling multi-GB transfers across operating systems and cloud storage providers.",
    achievements: [
      "Designed RabbitMQ workflows for background jobs, agent commands, and transfer processing; extracted monitoring into an independent gRPC service.",
      "Cut complex MySQL query execution time by more than 90% through CTEs, indexing, transaction design, deadlock analysis, and connection-pool tuning.",
      "Built real-time communication with Socket.IO and Redis Pub/Sub across K3s cloud and Docker Swarm on-premise environments.",
      "Engineered memory-efficient object-storage transfers with chunking, Node.js Streams, pre-signed URLs, and S3 lifecycle policies.",
    ],
    stack: ["Express.js", "MySQL", "RabbitMQ", "Redis", "gRPC", "K3s", "Docker Swarm", "Jenkins"],
  },
  {
    period: "Jun 2024 — Dec 2024",
    company: "Independent",
    role: "Backend Developer",
    context: "Built a NestJS API gateway that unified multiple transportation providers behind one predictable interface.",
    achievements: ["Structured provider integrations as isolated modules using OOP, SOLID principles, and typed contracts so new providers could be added without reshaping the gateway."],
    stack: ["NestJS", "TypeScript", "API Gateway", "OOP", "SOLID"],
  },
  {
    period: "Sep 2023 — Feb 2024",
    company: "FPT Software",
    role: "Frontend Developer Intern",
    context: "Worked in a five-person Agile team on a React application, coordinating the UI layer with backend APIs and database design.",
    achievements: ["Delivered production-facing interface work, contributed to data modeling, and coordinated API configuration and integration with backend developers."],
    stack: ["React.js", "API integration", "Database design", "Agile"],
  },
];

const skillGroups = [
  {
    title: "Backend engineering",
    description: "The core of my profile: typed Node.js services, modular architecture, real-time systems, and API design.",
    primary: ["Node.js", "TypeScript", "NestJS", "Express.js"],
    secondary: ["gRPC", "Socket.IO", "React.js", "OOP", "SOLID"],
  },
  {
    title: "Data and messaging",
    description: "Query behavior, storage tradeoffs, distributed coordination, and asynchronous processing under real workloads.",
    primary: ["MySQL", "Redis", "RabbitMQ", "PostgreSQL"],
    secondary: ["MongoDB", "Kafka", "Pub/Sub", "Indexing", "Transactions"],
  },
  {
    title: "Cloud and delivery",
    description: "Infrastructure and delivery systems that keep services observable, repeatable, and resilient across environments.",
    primary: ["AWS", "Docker", "Kubernetes", "Jenkins"],
    secondary: ["K3s", "Docker Swarm", "S3", "RDS", "CloudFront", "CI/CD"],
  },
];

const technologies = ["Node.js", "TypeScript", "NestJS", "MySQL", "Redis", "RabbitMQ", "AWS", "Docker", "Kubernetes", "Jenkins"];

const projects = [
  {
    id: "fish",
    title: "BAO FOR FISH",
    type: "Interactive NFT aquarium",
    image: "/project/baofish/hero.png",
    imageAlt: "A colorful digital fish swimming in a fantasy aquarium",
    liveUrl: "https://fish.b4f.site",
    contribution: "Designed and built the product experience around collectible companions, aquarium care, and environmental customization.",
    impact: "Turns wallet-owned assets into a living, playful habitat with repeat reasons to return beyond collection value.",
    stack: ["Web3", "NFT", "Interactive UI", "Wallet sync"],
    tone: "aqua",
  },
  {
    id: "food",
    title: "BAO FOR FOOD",
    type: "Mobile decision companion",
    image: "/project/baoforfood/hero.png",
    imageAlt: "BAO For Food brand artwork on a muted lime background",
    liveUrl: "https://food.b4f.site",
    contribution: "Shaped a focused mobile flow for nearby discovery and smart suggestions, reducing the effort of choosing a meal.",
    impact: "Transforms a repetitive daily decision into a quick, approachable interaction designed to become a habit.",
    stack: ["Mobile UX", "Location", "Recommendations", "Product design"],
    tone: "lime",
  },
  {
    id: "football",
    title: "REDLOCK",
    type: "AI football simulation",
    image: "/project/baofootball/hero.png",
    imageAlt: "A neon football stadium visualizing an AI-driven match",
    liveUrl: "https://football.b4f.site",
    contribution: "Built a strategy-led product concept where tactical choices and AI match simulation drive competitive progression.",
    impact: "Gives football strategy decisions visible consequences, making each match feel calculated rather than passive.",
    stack: ["AI simulation", "Game systems", "Tactics", "Progression"],
    tone: "blue",
  },
];

const foodScreens = [
  { src: "/project/baoforfood/login.jpg", alt: "BAO FOR FOOD account access screen" },
  { src: "/project/baoforfood/main2.jpg", alt: "BAO FOR FOOD dish discovery screen" },
  { src: "/project/baoforfood/main.jpg", alt: "BAO FOR FOOD suggestion loading screen" },
];

function SectionHeading({ title, intro }: { title: string; intro: string }) {
  return <div className="section-heading" data-reveal><h2>{title}</h2><p>{intro}</p></div>;
}

function ExperienceSection() {
  return (
    <section className="section experience-section" id="experience">
      <SectionHeading title="Experience built in production." intro="Roles, systems, and outcomes—ordered for a quick technical read." />
      <div className="experience-list">
        {experiences.map((experience, index) => (
          <article className="experience-item" key={`${experience.company}-${experience.period}`} data-reveal>
            <div className="experience-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
            <div className="experience-meta">
              <time>{experience.period}</time>
              {experience.companyUrl ? <a href={experience.companyUrl} target="_blank" rel="noreferrer">{experience.company} <ArrowUpRight aria-hidden="true" /></a> : <span>{experience.company}</span>}
            </div>
            <div className="experience-body">
              <h3>{experience.role}</h3>
              <p className="experience-context">{experience.context}</p>
              <ul>{experience.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}</ul>
              <div className="stack-list" aria-label="Technologies used">{experience.stack.map((technology) => <span key={technology}>{technology}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section className="section skills-section" id="skills">
      <SectionHeading title="A focused technical toolkit." intro="Grouped by how I use the technology—not by how many logos fit on a page." />
      <div className="technology-marquee" aria-label="Primary technologies">
        <div className="marquee-track">{[...technologies, ...technologies].map((technology, index) => <span key={`${technology}-${index}`} aria-hidden={index >= technologies.length}>{technology}<i aria-hidden="true" /></span>)}</div>
      </div>
      <div className="skill-groups">
        {skillGroups.map((group, index) => (
          <article className="skill-group" key={group.title} data-reveal>
            <div className="skill-group-number">0{index + 1}</div>
            <div className="skill-group-copy"><h3>{group.title}</h3><p>{group.description}</p></div>
            <div className="skill-group-tools"><div className="primary-tools">{group.primary.map((tool) => <strong key={tool}>{tool}</strong>)}</div><p>{group.secondary.join(" · ")}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectSection({ activeProject, onProjectChange }: { activeProject: number; onProjectChange: (index: number) => void }) {
  const foodGalleryRef = useRef<HTMLDivElement>(null);
  const scrollFoodGallery = (direction: -1 | 1) => {
    const gallery = foodGalleryRef.current;
    if (gallery) gallery.scrollBy({ left: direction * gallery.clientWidth * 0.62, behavior: "smooth" });
  };

  return (
    <section className="section projects-section" id="projects">
      <div className="projects-heading-row">
        <SectionHeading title="Products with a point of view." intro="Each project pairs a clear user need with a deliberate technical and product contribution." />
        <div className="project-controls" data-reveal>
          <button type="button" onClick={() => onProjectChange((activeProject - 1 + projects.length) % projects.length)} aria-label="Show previous project"><ArrowLeft aria-hidden="true" /></button>
          <span><b>{String(activeProject + 1).padStart(2, "0")}</b> / 0{projects.length}</span>
          <button type="button" onClick={() => onProjectChange((activeProject + 1) % projects.length)} aria-label="Show next project"><ArrowRight aria-hidden="true" /></button>
        </div>
      </div>
      <div className="project-stack">
        {projects.map((project, index) => (
          <article className={`project-case project-case--${project.tone}`} id={`project-${project.id}`} key={project.id} data-project-card>
            <div className="project-media">
              <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
              <div className="project-media-topline"><span>{project.type}</span><span>0{index + 1}</span></div>
            </div>
            <div className="project-details">
              <div className="project-title-row"><h3>{project.title}</h3><span>Live</span></div>
              <div className="project-proof-grid">
                <div><h4>Contribution</h4><p>{project.contribution}</p></div>
                <div><h4>Product impact</h4><p>{project.impact}</p></div>
              </div>
              <div className="project-stack-list">{project.stack.map((technology) => <span key={technology}>{technology}</span>)}</div>
              {project.id === "food" && (
                <div className="food-screens">
                  <div className="food-screens-heading"><span>Interface preview</span><div><button type="button" onClick={() => scrollFoodGallery(-1)} aria-label="Previous app screenshot"><ArrowLeft aria-hidden="true" /></button><button type="button" onClick={() => scrollFoodGallery(1)} aria-label="Next app screenshot"><ArrowRight aria-hidden="true" /></button></div></div>
                  <div className="food-screens-track" ref={foodGalleryRef} tabIndex={0}>{foodScreens.map((screen) => <a href={screen.src} target="_blank" rel="noreferrer" key={screen.src}><img src={screen.src} alt={screen.alt} loading="lazy" decoding="async" /></a>)}</div>
                </div>
              )}
              <div className="project-actions">
                <a className="button button--primary" href={project.liveUrl} target="_blank" rel="noreferrer">View live <ArrowUpRight aria-hidden="true" /></a>
                <a className="text-action" href="https://github.com/HuynhChiBao1109" target="_blank" rel="noreferrer"><GithubLogo aria-hidden="true" /> GitHub profile <ArrowUpRight aria-hidden="true" /></a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [activeProject, setActiveProject] = useState(0);
  const appRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); }), { rootMargin: "-24% 0px -66% 0px" });
    ["top", ...navItems.map(({ href }) => href.slice(1))].forEach((id) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    let frame = 0;
    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (cancelled) return;
      frame = window.requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView());
    });
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from("[data-hero-reveal]", { y: 34, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out" });
    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => gsap.from(element, { y: 30, opacity: 0, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 86%", once: true } }));
    const words = gsap.utils.toArray<HTMLElement>(".about-statement span");
    gsap.fromTo(words, { opacity: 0.13 }, { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: ".about-statement", start: "top 78%", end: "bottom 42%", scrub: true } });
    gsap.utils.toArray<HTMLElement>("[data-project-card]").forEach((card, index, cards) => {
      if (index < cards.length - 1) gsap.to(card, { scale: 0.94, opacity: 0.42, ease: "none", scrollTrigger: { trigger: cards[index + 1], start: "top 78%", end: "top 22%", scrub: true } });
    });
  }, { scope: appRef });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("baohc110902@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = "mailto:baohc110902@gmail.com";
    }
  };

  const selectProject = (index: number) => {
    setActiveProject(index);
    document.getElementById(`project-${projects[index].id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const aboutWords = "I work where backend architecture, data performance, and infrastructure meet—turning complex system behavior into software teams can operate with confidence.".split(" ");

  return (
    <main className="site-shell overflow-x-hidden w-full max-w-full" ref={appRef}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Bao, back to top">BAO<span>/</span></a>
        <nav className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="Main navigation">
          {navItems.map((item) => <a href={item.href} key={item.href} className={activeSection === item.href.slice(1) ? "is-active" : undefined} aria-current={activeSection === item.href.slice(1) ? "location" : undefined} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
        </nav>
        <a className="header-contact" href="mailto:baohc110902@gmail.com">Available for a conversation <ArrowUpRight aria-hidden="true" /></a>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>{menuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}</button>
      </header>

      <div id="main-content">
        <section className="hero" id="top">
          <div className="hero-ambient" aria-hidden="true" />
          <div className="hero-copy">
            <p className="hero-role" data-hero-reveal>Backend and DevOps engineer <span>Ho Chi Minh City</span></p>
            <h1 className="max-w-6xl w-full" data-hero-reveal>
              <span>Backend systems</span>
              <span className="hero-title-middle">built <i className="hero-inline-image" aria-hidden="true" /> to stay</span>
              <span className="hero-title-accent">fast under load.</span>
            </h1>
            <div className="hero-support" data-hero-reveal>
              <p>I’m Huynh Chi Bao. I design distributed services, tune data-heavy systems, and build the infrastructure that keeps them dependable.</p>
              <div className="hero-actions"><a className="button button--primary" href="#experience">Explore my work <ArrowDownRight aria-hidden="true" /></a><a className="text-action" href="/Huỳnh Chí Bảo - CV.pdf" download="Huynh-Chi-Bao-CV.pdf"><DownloadSimple aria-hidden="true" /> Download CV</a></div>
            </div>
          </div>
          <aside className="hero-monogram" data-hero-reveal aria-label="Bao, currently a Backend Developer at INNORIX Vietnam">
            <strong>BAO</strong>
            <div><span>Currently at INNORIX Vietnam</span><span>Backend Developer</span></div>
          </aside>
          <a className="hero-scroll" href="#about" aria-label="Scroll to the About section"><span>Scroll</span><i aria-hidden="true" /></a>
        </section>

        <section className="section about-section" id="about">
          <div className="about-intro">
            <p className="section-kicker" data-reveal>How I think about engineering</p>
            <p className="about-statement">{aboutWords.map((word, index) => <span key={`${word}-${index}`}>{word} </span>)}</p>
          </div>
          <div className="about-bento">
            <article className="about-bento-main" data-reveal><p>My work is strongest when scale is not an abstract requirement but a measurable constraint: multi-GB transfers, 10M+ database records, multi-process coordination, and hybrid deployment environments.</p><a href="#experience">Read the production evidence <ArrowDownRight aria-hidden="true" /></a></article>
            <article className="about-bento-proof" data-reveal><strong>90%+</strong><p>reduction in complex MySQL query execution time</p></article>
            <article className="about-bento-proof" data-reveal><strong>10M+</strong><p>records handled in a 13 GB production database</p></article>
            <article className="about-bento-profile" data-reveal><div><MapPin aria-hidden="true" /><span>Ho Chi Minh City, Vietnam</span></div><p>B.S. Software Engineering, FPT University · 2020–2025</p><a href="/philosophy-talk-12-certificate-restored.png" target="_blank" rel="noreferrer">View certificate <ArrowUpRight aria-hidden="true" /></a></article>
          </div>
        </section>

        <ExperienceSection />
        <SkillsSection />
        <ProjectSection activeProject={activeProject} onProjectChange={selectProject} />
      </div>

      <footer className="site-footer" id="contact">
        <div className="footer-cta" data-reveal>
          <div>
            <p>Available for backend and platform engineering opportunities</p>
            <h2>Let’s talk about<br />the system behind it.</h2>
          </div>
          <a href="mailto:baohc110902@gmail.com">
            <span>baohc110902@gmail.com</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <div className="footer-bottom">
          <a className="brand brand--footer" href="#top" aria-label="Bao, back to top">BAO<span>/</span></a>
          <p>Huynh Chi Bao · Backend & DevOps Engineer</p>
          <div className="footer-links">
            <a href="https://github.com/HuynhChiBao1109" target="_blank" rel="noreferrer">GitHub</a>
            <a href="tel:+84825999871">0825 999 871</a>
            <button type="button" onClick={copyEmail} aria-live="polite">
              {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
              {copied ? "Email copied" : "Copy email"}
            </button>
            <span>© 2026</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
