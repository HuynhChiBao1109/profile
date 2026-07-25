import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Copy,
  Github,
  Mail,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import "./App.css";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const skills = [
  {
    number: "01",
    title: "Backend",
    items: ["NestJS", "Express.js", "Golang", "GraphQL", "Socket.IO", "gRPC"],
  },
  {
    number: "02",
    title: "Data",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "RabbitMQ"],
  },
  {
    number: "03",
    title: "Infrastructure",
    items: ["Docker", "Kubernetes", "AWS", "GCP", "Linux", "PM2"],
  },
  {
    number: "04",
    title: "Frontend",
    items: ["React.js", "TypeScript", "JavaScript", "Firebase", "REST API"],
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("baohc110902@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Back to top">
          B<span>.</span>
        </a>

        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="mailto:baohc110902@gmail.com">
          Let's talk <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy reveal">
          <p className="eyebrow"><span /> Available for new opportunities</p>
          <h1>
            I build the systems
            <br />
            <span>behind great products.</span>
          </h1>
          <p className="hero-intro">
            I'm <strong>Huynh Chi Bao</strong>, a software engineer focused on reliable,
            scalable backend systems and the infrastructure that keeps them moving.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#experience">
              Explore my work <ArrowDownRight size={18} />
            </a>
            <a className="text-link" href="https://github.com/HuynhChiBao1109" target="_blank" rel="noreferrer">
              <Github size={19} /> GitHub <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <div className="portrait-wrap reveal">
          <div className="portrait-frame">
            <img src="/avatar.jpg" alt="Huynh Chi Bao" />
            <div className="portrait-tag">
              <span>Software Engineer</span>
              <small>Ho Chi Minh City</small>
            </div>
          </div>
          <div className="orbit-badge">
            <span>1+</span>
            <small>YEARS<br />BUILDING</small>
          </div>
        </div>

        <div className="hero-bottom">
          <span>Scroll to explore</span>
          <div className="scroll-line" />
          <span className="hero-index">01 / 04</span>
        </div>
      </section>

      <section className="about section" id="about">
        <div className="section-label reveal">
          <span>01</span>
          <p>About me</p>
        </div>
        <div className="about-content reveal">
          <p className="statement">
            Turning complex backend challenges into <em>fast, resilient</em> systems.
          </p>
          <div className="about-details">
            <p>
              I enjoy working where performance, scale and product meet—from real-time
              distributed communication to multi-gigabyte file transfers and cloud
              infrastructure.
            </p>
            <p>
              My approach is practical: understand the bottleneck, design for clarity,
              measure the result, and leave the system better than I found it.
            </p>
            <div className="stats">
              <div><strong>90%</strong><span>Query time reduced</span></div>
              <div><strong>4+</strong><span>Cloud platforms integrated</span></div>
              <div><strong>2025</strong><span>Software Engineering graduate</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="experience section" id="experience">
        <div className="section-label reveal">
          <span>02</span>
          <p>Selected experience</p>
        </div>

        <article className="role featured reveal">
          <div className="role-meta">
            <p>Jan 2025 — Present</p>
            <a href="https://innorix.com" target="_blank" rel="noreferrer">
              INNORIX Vietnam <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="role-content">
            <div className="role-title">
              <p>Current role</p>
              <h2>Backend Developer</h2>
            </div>
            <p className="role-summary">
              Building Exacoola, a large-scale file transfer platform supporting
              reliable multi-GB transfers across Windows, Linux, macOS and major clouds.
            </p>
            <ul>
              <li>
                <ChevronRight />
                <span>Built horizontally scalable real-time device communication with Socket.IO, Redis Pub/Sub and PM2 clusters.</span>
              </li>
              <li>
                <ChevronRight />
                <span>Reduced a complex MySQL query from 60 seconds to 0.5 seconds using CTEs and indexing strategies.</span>
              </li>
              <li>
                <ChevronRight />
                <span>Designed async RabbitMQ workflows, gRPC microservices and reliable multi-tenant database operations.</span>
              </li>
              <li>
                <ChevronRight />
                <span>Optimized object storage transfers with streaming, chunking, pre-signed URLs and S3 lifecycle policies.</span>
              </li>
            </ul>
            <div className="role-tags">
              {["Express.js", "Socket.IO", "Redis", "MySQL", "RabbitMQ", "gRPC", "Docker"].map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </article>

        <article className="role reveal">
          <div className="role-meta">
            <p>Sep 2023 — Dec 2023</p>
            <span>FPT Software</span>
          </div>
          <div className="role-content compact">
            <div className="role-title">
              <p>Internship</p>
              <h2>Frontend Developer</h2>
            </div>
            <p className="role-summary">
              Developed a React.js team project as a UI/frontend developer. Collaborated
              in a five-person Agile team, contributed to database design and coordinated
              API integration with backend engineers.
            </p>
            <div className="role-tags">
              {["React.js", "Agile", "API Integration", "Database Design"].map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="skills section" id="skills">
        <div className="section-label reveal">
          <span>03</span>
          <p>Technical toolkit</p>
        </div>
        <div className="skills-heading reveal">
          <h2>Built with the right tools,<br /><span>driven by fundamentals.</span></h2>
        </div>
        <div className="skill-grid">
          {skills.map((skill) => (
            <article className="skill-card reveal" key={skill.title}>
              <div className="skill-card-head">
                <span>{skill.number}</span>
                <h3>{skill.title}</h3>
              </div>
              <div className="skill-list">
                {skill.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="education section">
        <div className="section-label reveal">
          <span>04</span>
          <p>Education</p>
        </div>
        <div className="education-card reveal">
          <div>
            <span className="edu-year">2020 — 2025</span>
            <h2>Bachelor of<br />Software Engineering</h2>
          </div>
          <div className="edu-school">
            <p>FPT University</p>
            <span><MapPin size={15} /> Ho Chi Minh City, Vietnam</span>
          </div>
          <div className="edu-mark">FPT</div>
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="contact-inner reveal">
          <p className="eyebrow"><span /> Have a project in mind?</p>
          <h2>Let's build something<br /><em>that works.</em></h2>
          <div className="contact-actions">
            <a className="button light" href="mailto:baohc110902@gmail.com">
              <Mail size={18} /> Get in touch <ArrowUpRight size={18} />
            </a>
            <button className="copy-button" onClick={copyEmail}>
              {copied ? <Check size={17} /> : <Copy size={17} />}
              {copied ? "Email copied" : "Copy email"}
            </button>
          </div>
        </div>
        <footer>
          <a className="brand" href="#top">B<span>.</span></a>
          <p>Huynh Chi Bao © 2026</p>
          <div>
            <a href="https://github.com/HuynhChiBao1109" target="_blank" rel="noreferrer">GitHub</a>
            <a href="tel:+84825999871">0825 999 871</a>
          </div>
        </footer>
      </section>
    </main>
  );
}

export default App;
