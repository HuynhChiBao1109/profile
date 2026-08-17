import { useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  Check,
  ChevronRight,
  Copy,
  Download,
  Github,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Trophy,
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

const baoForFoodScreens = [
  {
    src: "/project/baoforfood/login.jpg",
    alt: "BAO FOR FOOD login screen",
    label: "Account access",
  },
  {
    src: "/project/baoforfood/main2.jpg",
    alt: "BAO FOR FOOD home screen asking what to eat today",
    label: "Dish discovery",
  },
  {
    src: "/project/baoforfood/main.jpg",
    alt: "BAO FOR FOOD dish suggestion loading screen",
    label: "Smart suggestions",
  },
];

const personalProjects = [
  {
    id: "fish",
    number: "01",
    title: "BAO FOR FISH",
    type: "NFT aquarium",
    tagline: "A little ocean in motion.",
    description:
      "A playful aquarium experience where each fish feels alive, collectible, and personal. Users can care for companions, decorate the tank, and build a cozy digital habitat.",
    links: ["fish.b4f.site", "Wallet sync"],
    href: "https://fish.b4f.site",
    visualClass: "fish-visual",
    tags: ["NFT aquarium", "Pet care", "Customization"],
    status: "Live product",
    statusTone: "active",
  },
  {
    id: "food",
    number: "02",
    title: "BAO FOR FOOD",
    type: "Mobile app",
    tagline: "Hôm nay ăn gì?",
    description:
      "A fast food decision helper for everyday life—discover nearby restaurants, get smart suggestions, and reduce the friction of choosing where to eat.",
    links: ["App Store", "Google Play"],
    href: "https://food.b4f.site",
    visualClass: "food-visual",
    tags: ["Smart suggestions", "Nearby dining", "Daily habit"],
    status: "In beta",
    statusTone: "neutral",
  },
  {
    id: "football",
    number: "03",
    title: "REDLOCK",
    type: "AI football simulation",
    tagline: "Outthink. Outplay. Win.",
    description:
      "A strategy-first football experience where AI-driven matches, tactical decisions, and competitive progression turn every game into a calculated battle.",
    links: ["football.b4f.site", "AI Match"],
    href: "https://football.b4f.site",
    visualClass: "football-visual",
    tags: ["AI gameplay", "Tactics", "Match strategy"],
    status: "Live project",
    statusTone: "planned",
  },
];

const skills = [
  {
    number: "01",
    title: "JavaScript & NodeJS",
    focus: "Runtime & events",
    description:
      "Strong command of core language fundamentals, the event loop, asynchronous execution, and advanced event and process handling.",
    concepts: [
      "Core language",
      "Event loop",
      "Async processing",
      "Event handling",
    ],
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
    title: "Docker",
    focus: "Containers & networking",
    description:
      "Understands container isolation and lifecycle, with practical knowledge of bridge and NAT networking plus overlay networks for Docker Swarm clusters.",
    concepts: [
      "Containers",
      "Bridge networking",
      "NAT",
      "Overlay networks",
      "Docker Swarm",
    ],
  },
  {
    number: "12",
    title: "Kubernetes",
    focus: "Orchestration basics",
    description:
      "Completed practical labs and understands core container orchestration concepts including Pods, Deployments, and Services.",
    concepts: ["Pods", "Deployments", "Services", "Container orchestration"],
  },
  {
    number: "13",
    title: "AWS",
    focus: "Cloud infrastructure",
    description:
      "Hands-on experience building secure, scalable AWS infrastructure across compute, storage, networking, databases, caching, and serverless services.",
    concepts: [
      "EC2",
      "RDS",
      "KMS",
      "S3",
      "IAM",
      "Lambda",
      "CloudFront",
      "ElastiCache",
      "API Gateway",
      "ELB",
    ],
  },
  {
    number: "14",
    title: "Jenkins",
    focus: "CI/CD automation",
    description:
      "Builds automated CI/CD pipelines for reliable application delivery, covering build, test, Docker packaging, and deployment workflows.",
    concepts: ["Pipelines", "Build & test", "Docker", "Automated deployment"],
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const foodGalleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 },
    );

    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("baohc110902@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const scrollFoodGallery = (direction: -1 | 1) => {
    const gallery = foodGalleryRef.current;
    if (!gallery) return;

    gallery.scrollBy({
      left: direction * gallery.clientWidth * 0.72,
      behavior: "smooth",
    });
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Back to top">
          B<span>.</span>
        </a>

        <nav
          className={menuOpen ? "nav open" : "nav"}
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-links" aria-label="Quick contact links">
          <a
            href="https://github.com/HuynhChiBao1109"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={15} /> GitHub
          </a>
          <a href="tel:+84825999871">
            <Phone size={15} /> 0825 999 871
          </a>
        </div>
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
          <p className="eyebrow">
            <span /> Backend &amp; DevOps Engineer
          </p>
          <h1>
            Server systems
            <br />
            <span>engineered to scale.</span>
          </h1>
          <p className="hero-intro">
            I'm <strong>Huynh Chi Bao</strong>, a backend engineer focused on
            server architecture, distributed systems, database performance, and
            cloud infrastructure—building reliable platforms that stay fast
            under real-world load.
          </p>
          <div
            className="hero-focus"
            aria-label="Server engineering specialties"
          >
            <span>Server architecture</span>
            <span>Distributed systems</span>
            <span>Database performance</span>
          </div>
          <div className="hero-actions">
            <a className="button primary" href="#experience">
              Explore server work <ArrowDownRight size={18} />
            </a>
            <a
              className="text-link"
              href="https://github.com/HuynhChiBao1109"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={19} /> GitHub <ArrowUpRight size={15} />
            </a>
            <a className="text-link" href="tel:+84825999871">
              <Phone size={18} /> 0825 999 871
            </a>
          </div>
        </div>

        <div className="hero-panel reveal" aria-label="Profile highlights">
          <div className="hero-panel__glass">
            <p className="hero-panel__kicker">Build focus</p>
            <h2>Reliable systems with product instinct.</h2>
            <div className="hero-panel__metrics">
              <div>
                <strong>90%</strong>
                <span>Query optimization</span>
              </div>
              <div>
                <strong>4+</strong>
                <span>Cloud stacks</span>
              </div>
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
            Turning complex backend challenges into <em>fast, resilient</em>{" "}
            systems.
          </p>
          <div className="about-details">
            <p>
              I enjoy working where performance, scale and product meet—from
              real-time distributed communication to multi-gigabyte file
              transfers and cloud infrastructure.
            </p>
            <p>
              My approach is practical: understand the bottleneck, design for
              clarity, measure the result, and leave the system better than I
              found it.
            </p>
            <div className="stats">
              <div>
                <strong>90%</strong>
                <span>Query time reduced</span>
              </div>
              <div>
                <strong>4+</strong>
                <span>Cloud platforms integrated</span>
              </div>
              <div>
                <strong>2025</strong>
                <span>Software Engineering graduate</span>
              </div>
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
              reliable multi-GB transfers across Windows, Linux, macOS and major
              clouds.
            </p>
            <ul>
              <li>
                <ChevronRight />
                <span>
                  Built horizontally scalable real-time device communication
                  with Socket.IO, Redis Pub/Sub and PM2 clusters.
                </span>
              </li>
              <li>
                <ChevronRight />
                <span>
                  Reduced a complex MySQL query from 60 seconds to 0.5 seconds
                  using CTEs and indexing strategies.
                </span>
              </li>
              <li>
                <ChevronRight />
                <span>
                  Designed async RabbitMQ workflows, gRPC microservices and
                  reliable multi-tenant database operations.
                </span>
              </li>
              <li>
                <ChevronRight />
                <span>
                  Optimized object storage transfers with streaming, chunking,
                  pre-signed URLs and S3 lifecycle policies.
                </span>
              </li>
            </ul>
            <div className="role-tags">
              {[
                "Express.js",
                "Socket.IO",
                "Redis",
                "MySQL",
                "RabbitMQ",
                "gRPC",
                "Docker",
              ].map((tag) => (
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
              Developed a React.js team project as a UI/frontend developer.
              Collaborated in a five-person Agile team, contributed to database
              design and coordinated API integration with backend engineers.
            </p>
            <div className="role-tags">
              {["React.js", "Agile", "API Integration", "Database Design"].map(
                (tag) => (
                  <span key={tag}>{tag}</span>
                ),
              )}
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
          <p className="eyebrow">
            <span /> Currently building
          </p>
          <h2>
            Ideas turned into
            <br />
            <em>real products.</em>
          </h2>
        </div>

        <div className="project-grid">
          {personalProjects.map((project) => {
            const isFoodProject = project.id === "food";

            return isFoodProject ? (
              <article className="project-card project-card--food reveal" key={project.id}>
                <div className="project-card-top">
                  <span className="project-number">{project.number}</span>
                  <span className={`project-status ${project.statusTone}`}>
                    <i /> {project.status}
                  </span>
                </div>

                <div className="food-gallery">
                  <div className="food-gallery-toolbar">
                    <span>App preview · Swipe to explore</span>
                    <div className="food-gallery-controls">
                      <button
                        type="button"
                        onClick={() => scrollFoodGallery(-1)}
                        aria-label="View previous BAO FOR FOOD screenshot"
                      >
                        <ArrowLeft size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollFoodGallery(1)}
                        aria-label="View next BAO FOR FOOD screenshot"
                      >
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                  <div
                    className="food-gallery-track"
                    ref={foodGalleryRef}
                    aria-label="BAO FOR FOOD app screenshots"
                    tabIndex={0}
                  >
                    {baoForFoodScreens.map((screen, index) => (
                      <a
                        className="food-gallery-slide"
                        href={screen.src}
                        target="_blank"
                        rel="noreferrer"
                        key={screen.src}
                        aria-label={`Open ${screen.alt.toLowerCase()}`}
                      >
                        <img
                          src={screen.src}
                          alt={screen.alt}
                          width="828"
                          height="1792"
                          loading="lazy"
                          decoding="async"
                          draggable="false"
                        />
                        <span>
                          <i>{String(index + 1).padStart(2, "0")}</i>
                          {screen.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="project-content">
                  <div className="project-type">
                    <Smartphone size={15} /> {project.type}
                  </div>
                  <h3>{project.title}</h3>
                  <p className="project-subtitle">{project.tagline}</p>
                  <p>{project.description}</p>
                  <div className="project-features">
                    {project.tags.map((tag) => (
                      <span key={tag}>
                        {tag === "Smart suggestions" ? <Sparkles size={14} /> : tag === "Nearby dining" ? <MapPin size={14} /> : <Check size={14} />} {tag}
                      </span>
                    ))}
                  </div>
                  <div className="project-release">
                    <span>{project.status}</span>
                    <div>
                      {project.links.map((link) => (
                        <span key={link}>{link}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ) : (
              <a
                className={`project-card project-card--${project.id} reveal`}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                key={project.id}
                aria-label={`Open ${project.title} project`}
              >
                <div className="project-card-top">
                  <span className="project-number">{project.number}</span>
                  <span className={`project-status ${project.statusTone}`}>
                    <i /> {project.status}
                  </span>
                </div>

                <div className={`project-visual ${project.visualClass}`} aria-hidden="true">
                  {project.id === "fish" ? (
                    <>
                      <div className="fish-scene">
                        <span className="fish-orb fish-orb--one" />
                        <span className="fish-orb fish-orb--two" />
                        <span className="fish-school fish-school--one" />
                        <span className="fish-school fish-school--two" />
                        <span className="fish-bubble bubble-one" />
                        <span className="fish-bubble bubble-two" />
                      </div>
                      <div className="fish-badge">
                        <Sparkles size={24} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="pitch-lines">
                        <span className="player p-one" />
                        <span className="player p-two" />
                        <span className="player p-three" />
                        <span className="player p-four" />
                        <span className="strategy-line line-one" />
                        <span className="strategy-line line-two" />
                      </div>
                      <div className="trophy-mark">
                        <Trophy size={34} />
                      </div>
                    </>
                  )}
                </div>

                <div className="project-content">
                  <div className="project-type">
                    {project.id === "fish" ? <Sparkles size={15} /> : <ShieldCheck size={15} />} {project.type}
                  </div>
                  <h3>{project.title}</h3>
                  <p className="project-subtitle">{project.tagline}</p>
                  <p>{project.description}</p>
                  <div className="project-features">
                    {project.tags.map((tag) => (
                      <span key={tag}>
                        {project.id === "fish" ? <Sparkles size={14} /> : <Trophy size={14} />} {tag}
                      </span>
                    ))}
                  </div>
                  <div className="project-release">
                    <span>{project.status}</span>
                    <div>
                      {project.links.map((link) => (
                        <span key={link}>{link}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <section className="skills section" id="skills">
        <div className="section-label reveal">
          <span>04</span>
          <p>Technical depth</p>
        </div>
        <div className="skills-heading reveal">
          <h2>
            Knowledge built through
            <br />
            <span>real systems and practice.</span>
          </h2>
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
                {skill.concepts.map((concept) => (
                  <span key={concept}>{concept}</span>
                ))}
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
            <h2>
              Bachelor of
              <br />
              Software Engineering
            </h2>
          </div>
          <div className="edu-school">
            <p>FPT University</p>
            <span>
              <MapPin size={15} /> Ho Chi Minh City, Vietnam
            </span>
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
            <span>
              View full certificate <ArrowUpRight size={15} />
            </span>
          </a>

          <div className="certificate-content">
            <div className="certificate-icon">
              <Award size={22} />
            </div>
            <p className="certificate-label">Certificate · FPT University</p>
            <h3>
              Philosophy
              <br />
              Talk 12
            </h3>
            <p className="certificate-description">
              Recognized for delivering a meaningful presentation and fostering
              a profound love of philosophy during the Summer 2024 term.
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
          <p className="eyebrow">
            <span /> Have a project in mind?
          </p>
          <h2>
            Let's build something
            <br />
            <em>that works.</em>
          </h2>
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
          <a className="brand" href="#top">
            B<span>.</span>
          </a>
          <p>Huynh Chi Bao © 2026</p>
          <div>
            <a
              href="https://github.com/HuynhChiBao1109"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a href="tel:+84825999871">0825 999 871</a>
          </div>
        </footer>
      </section>
    </main>
  );
}

export default App;
