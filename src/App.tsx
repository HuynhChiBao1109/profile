import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  Check,
  ChevronRight,
  Copy,
  Download,
  Github,
  MapPinned,
  Mail,
  MapPin,
  Menu,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Trophy,
  Utensils,
  X,
} from "lucide-react";
import "./App.css";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const skills = [
  {
    number: "01",
    title: "JavaScript",
    focus: "Runtime & events",
    description:
      "Strong command of core language fundamentals, the event loop, asynchronous execution, and advanced event and process handling.",
    concepts: ["Core language", "Event loop", "Async processing", "Event handling"],
  },
  {
    number: "02",
    title: "TypeScript",
    focus: "OOP & type safety",
    description:
      "Comfortable applying object-oriented programming and TypeScript's type system to build clear, maintainable application structures.",
    concepts: ["OOP", "Type modeling", "Interfaces", "Maintainability"],
  },
  {
    number: "03",
    title: "NestJS",
    focus: "Backend architecture",
    description:
      "Builds modular backend applications with SOLID principles and dependency injection, keeping services independent and testable.",
    concepts: ["SOLID", "Dependency injection", "Modules", "Service design"],
  },
  {
    number: "04",
    title: "React.js",
    focus: "UI development",
    description:
      "Hands-on since university, mainly focused on UI development with a practical understanding of the DOM, components, state, and Redux.",
    concepts: ["DOM", "Components", "State", "Redux"],
  },
  {
    number: "05",
    title: "MySQL",
    focus: "Database internals",
    description:
      "Deep experience with indexing and leftmost-prefix rules, binary logs, log storage, and connection pools—including a 13 GB database with 10M+ records.",
    concepts: ["Indexing", "Binary log", "Connection pools", "10M+ records"],
  },
  {
    number: "06",
    title: "PostgreSQL",
    focus: "Query execution",
    description:
      "Understands how queries flow through parsing, planning, and execution, with attention to how operations use memory at runtime.",
    concepts: ["Query planning", "Execution flow", "Memory usage", "SQL"],
  },
  {
    number: "07",
    title: "MongoDB",
    focus: "Document modeling",
    description:
      "Understands JSON-like documents, collections, and when document storage fits a project, with hands-on multi-collection experience.",
    concepts: ["Documents", "Collections", "Data modeling", "Multi-collection"],
  },
  {
    number: "08",
    title: "Redis",
    focus: "Distributed coordination",
    description:
      "Uses core Redis commands, Pub/Sub for socket systems, and Redlock-based leader election for cron jobs across multi-process environments.",
    concepts: ["Pub/Sub", "Socket systems", "Redlock", "Leader election"],
  },
  {
    number: "09",
    title: "RabbitMQ",
    focus: "Message queues",
    description:
      "Foundational hands-on experience creating queues and implementing producer-consumer flows for asynchronous task processing.",
    concepts: ["Queues", "Producers", "Consumers", "Async tasks"],
  },
  {
    number: "10",
    title: "Kafka",
    focus: "Event streaming",
    description:
      "Foundational experience setting up topics and implementing producer-consumer message processing workflows.",
    concepts: ["Topics", "Producers", "Consumers", "Message processing"],
  },
  {
    number: "11",
    title: "Kubernetes",
    focus: "Orchestration basics",
    description:
      "Completed practical labs and understands core container orchestration concepts including Pods, Deployments, and Services.",
    concepts: ["Pods", "Deployments", "Services", "Container orchestration"],
  },
  {
    number: "12",
    title: "AWS",
    focus: "Cloud infrastructure",
    description:
      "Hands-on experience using AWS services for application infrastructure, particularly EC2 compute and RDS managed databases.",
    concepts: ["EC2", "RDS", "Compute", "Managed databases"],
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
            <a
              className="cv-download"
              href="/Huỳnh Chí Bảo - CV.pdf"
              download="Huynh-Chi-Bao-CV.pdf"
              aria-label="Download Huynh Chi Bao's CV"
            >
              <Download size={15} />
              Download CV
            </a>
          </div>
          <div className="orbit-badge">
            <span>1+</span>
            <small>YEARS<br />BUILDING</small>
          </div>
        </div>

        <div className="hero-bottom">
          <span>Scroll to explore</span>
          <div className="scroll-line" />
          <span className="hero-index">01 / 05</span>
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

      <section className="projects section" id="projects">
        <div className="section-label reveal">
          <span>03</span>
          <p>Personal projects</p>
        </div>

        <div className="projects-heading reveal">
          <p className="eyebrow"><span /> Currently building</p>
          <h2>
            Ideas turned into<br /><em>real products.</em>
          </h2>
        </div>

        <div className="project-grid">
          <article className="project-card food-project reveal">
            <div className="project-card-top">
              <span className="project-number">01</span>
              <span className="project-status"><i /> Releasing 11 Sep 2026</span>
            </div>

            <div className="project-visual food-visual" aria-hidden="true">
              <div className="phone-shell">
                <div className="phone-bar" />
                <Utensils size={34} />
                <span>Hôm nay<br />ăn gì?</span>
              </div>
              <MapPinned className="visual-icon map-icon" size={42} />
              <span className="location-dot dot-one" />
              <span className="location-dot dot-two" />
              <span className="location-dot dot-three" />
            </div>

            <div className="project-content">
              <div className="project-type"><Smartphone size={15} /> Mobile application</div>
              <h3>BAO FOR FOOD</h3>
              <p className="project-subtitle">Hôm nay ăn gì?</p>
              <p>
                A mobile app that takes the friction out of choosing what to eat by
                suggesting dishes and nearby restaurants based on the user's location.
              </p>
              <div className="project-features">
                <span><Sparkles size={14} /> Smart dish suggestions</span>
                <span><MapPin size={14} /> Nearby restaurants</span>
              </div>
            </div>
          </article>

          <article className="project-card redlock-project reveal">
            <div className="project-card-top">
              <span className="project-number">02</span>
              <span className="project-status planned"><i /> NFT roadmap · Sep 2026</span>
            </div>

            <div className="project-visual redlock-visual" aria-hidden="true">
              <div className="pitch-lines">
                <span className="player p-one" />
                <span className="player p-two" />
                <span className="player p-three" />
                <span className="player p-four" />
                <span className="strategy-line line-one" />
                <span className="strategy-line line-two" />
              </div>
              <div className="trophy-mark"><Trophy size={34} /></div>
            </div>

            <div className="project-content">
              <div className="project-type"><ShieldCheck size={15} /> AI football simulation</div>
              <h3>REDLOCK 1</h3>
              <p className="project-subtitle">Outthink. Outplay. Win.</p>
              <p>
                A strategy-first football simulation where tactical decisions and AI
                shape every match, with NFT integration planned for the next phase.
              </p>
              <div className="project-features">
                <span><Sparkles size={14} /> AI-driven matches</span>
                <span><Trophy size={14} /> Tactical gameplay</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="skills section" id="skills">
        <div className="section-label reveal">
          <span>04</span>
          <p>Technical depth</p>
        </div>
        <div className="skills-heading reveal">
          <h2>Knowledge built through<br /><span>real systems and practice.</span></h2>
        </div>
        <div className="skill-grid">
          {skills.map((skill) => (
            <article className="skill-card reveal" key={skill.title}>
              <div className="skill-card-head">
                <span>{skill.number}</span>
                <p>{skill.focus}</p>
              </div>
              <h3>{skill.title}</h3>
              <p className="skill-description">{skill.description}</p>
              <div className="skill-concepts">
                {skill.concepts.map((concept) => <span key={concept}>{concept}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="education section">
        <div className="section-label reveal">
          <span>05</span>
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

        <article className="certificate-card reveal">
          <a
            className="certificate-preview"
            href="/philosophy-talk-12-certificate-restored.png"
            target="_blank"
            rel="noreferrer"
            aria-label="View Philosophy Talk 12 certificate"
          >
            <img
              src="/philosophy-talk-12-certificate-restored.png"
              alt="Philosophy Talk 12 certificate awarded to Huynh Chi Bao by FPT University"
              width="1448"
              height="1086"
              loading="lazy"
              decoding="async"
            />
            <span>View full certificate <ArrowUpRight size={15} /></span>
          </a>

          <div className="certificate-content">
            <div className="certificate-icon"><Award size={22} /></div>
            <p className="certificate-label">Certificate · FPT University</p>
            <h3>Philosophy<br />Talk 12</h3>
            <p className="certificate-description">
              Recognized for delivering a meaningful presentation and fostering a
              profound love of philosophy during the Summer 2024 term.
            </p>
            <div className="certificate-meta">
              <span>17 Jun 2024</span>
              <span>FPT University HCMC</span>
            </div>
          </div>
        </article>
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
