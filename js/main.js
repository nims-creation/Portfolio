/**
 * MATRIX PORTFOLIO — MAIN JAVASCRIPT
 * Cyber-Modern Technical Mono | Phosphor Neon Green on Deep Obsidian
 */

/* ═══════════════════════════════════════════════════
   0. CONSTANTS & DATA
   ═══════════════════════════════════════════════════ */

const JAVA_KEYWORDS = [
  'public', 'private', 'protected', 'static', 'final', 'abstract',
  'synchronized', 'volatile', 'transient', 'native', 'interface',
  'implements', 'extends', 'class', 'enum', 'record', 'sealed',
  'throws', 'throw', 'try', 'catch', 'finally', 'new', 'return',
  'void', 'this', 'super', 'instanceof', 'for', 'while', 'if',
  'else', 'switch', 'case', 'break', 'continue', 'default',
  '@Override', '@Entity', '@Service', '@Repository', '@Controller',
  '@SpringBootApplication', '@Autowired', '@Transactional',
  'List<>', 'Map<K,V>', 'Optional<>', 'Stream<>', 'CompletableFuture',
  'ExecutorService', 'Runnable', 'Callable<>', 'Thread',
  'KafkaProducer', 'KafkaConsumer', 'KafkaTemplate',
  'JpaRepository', 'CrudRepository', 'EntityManager',
  'HttpStatus', 'ResponseEntity', 'RequestMapping', 'GetMapping',
  'PostMapping', 'PutMapping', 'DeleteMapping', 'PathVariable',
  'RequestBody', 'RestController', 'SpringApplication.run()',
];

const LOG_MESSAGES = [
  { text: '> FETCHING_PROJECT_DATA...', type: 'info' },
  { text: '> SYSTEM_LOAD: ##%', type: 'info', dynamic: 'cpu' },
  { text: '> HEAP_ALLOC: ##MB', type: 'info', dynamic: 'mem' },
  { text: '> KAFKA_CONSUMER_LAG: ##ms', type: 'info', dynamic: 'lag' },
  { text: '> DB_POOL_SIZE: 10/10', type: 'info' },
  { text: '> WEBSOCKET_CONNECTED: true', type: 'info' },
  { text: '> COMPILING_BYTECODE...', type: 'info' },
  { text: '> JVM_GC_CYCLE: minor', type: 'info' },
  { text: '> SPRING_CTX_REFRESH: OK', type: 'info' },
  { text: '> AUTH_TOKEN_VALIDATED', type: 'info' },
  { text: '> CACHE_HIT_RATIO: ##%', type: 'info', dynamic: 'cache' },
  { text: '> RENDER_UPTIME: ##h', type: 'info', dynamic: 'uptime' },
  { text: '> RESOLVING_DEPENDENCIES...', type: 'info' },
  { text: '! WARN: slow_query_detected', type: 'warn' },
  { text: '> RETRY_ATTEMPT: 1/3', type: 'warn' },
  { text: '> PIPELINE_STAGE: [BUILD]', type: 'info' },
  { text: '> PIPELINE_STAGE: [TEST]', type: 'info' },
  { text: '> PIPELINE_STAGE: [DEPLOY]', type: 'info' },
  { text: '> THREAD_POOL: 8 active', type: 'info' },
  { text: '> SSL_CERT: valid 365d', type: 'info' },
  { text: '> NET_TX: ##KB/s', type: 'info', dynamic: 'net' },
  { text: '> INDEXING_PROJECT_FEED...', type: 'info' },
  { text: '! WARN: rate_limit_approaching', type: 'warn' },
  { text: '> OAUTH2_HANDSHAKE: success', type: 'info' },
  { text: '> SCHEDULED_JOB: executed', type: 'info' },
];

const COMMITS = [
  { hash: 'a3f7c92', msg: 'feat: implement Kafka consumer group rebalancing', branch: 'feat/kafka-consumer', additions: '+142', deletions: '-18', time: '2m ago', repo: 'schedulo' },
  { hash: 'b1e4d08', msg: 'fix: resolve Hibernate N+1 query on bookings', branch: 'fix/hibernate-perf', additions: '+23', deletions: '-67', time: '18m ago', repo: 'schedulo' },
  { hash: 'cc9a241', msg: 'feat: add Cloudinary adaptive image transformations', branch: 'feat/cloudinary', additions: '+89', deletions: '-5', time: '45m ago', repo: 'staysoul' },
  { hash: 'd72f390', msg: 'chore: upgrade Spring Boot to 3.2.5', branch: 'chore/deps', additions: '+12', deletions: '-12', time: '1h ago', repo: 'schedulo' },
  { hash: 'e88b5ca', msg: 'perf: add Redis L2 cache for user sessions', branch: 'perf/redis-cache', additions: '+201', deletions: '-34', time: '2h ago', repo: 'dist-cache' },
  { hash: 'f04c117', msg: 'fix: correct Supabase RLS policy for tenants', branch: 'fix/rls-policy', additions: '+8', deletions: '-2', time: '3h ago', repo: 'staysoul' },
  { hash: '10abc43', msg: 'feat: gRPC inter-service auth middleware', branch: 'feat/grpc-auth', additions: '+174', deletions: '-0', time: '4h ago', repo: 'dist-cache' },
  { hash: '2f994e6', msg: 'docs: update architecture README with diagrams', branch: 'docs/arch', additions: '+56', deletions: '-12', time: '5h ago', repo: 'schedulo' },
  { hash: '39d17b2', msg: 'test: add integration tests for booking service', branch: 'test/integration', additions: '+312', deletions: '-0', time: '6h ago', repo: 'schedulo' },
  { hash: '4a23cf8', msg: 'style: refactor React property card component', branch: 'refactor/ui', additions: '+45', deletions: '-88', time: '8h ago', repo: 'staysoul' },
  { hash: '5bc90d1', msg: 'feat: WebSocket live notification channel', branch: 'feat/websocket', additions: '+233', deletions: '-14', time: '10h ago', repo: 'schedulo' },
  { hash: '6d14e27', msg: 'fix: Docker health-check endpoint timeout', branch: 'fix/docker', additions: '+7', deletions: '-3', time: '12h ago', repo: 'dist-cache' },
];

/* ═══════════════════════════════════════════════════
   1. MATRIX RAIN CANVAS
   ═══════════════════════════════════════════════════ */

function initMatrixRain() {
  const canvas = document.getElementById('matrix-rain');
  const ctx = canvas.getContext('2d');

  let W, H, cols, drops;

  const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF{}[]();';
  const FONT_SIZE = 14;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cols  = Math.floor(W / FONT_SIZE);
    drops = new Array(cols).fill(1);
  }

  function tick() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#39FF14';
    ctx.font = `${FONT_SIZE}px JetBrains Mono, monospace`;

    for (let i = 0; i < cols; i++) {
      const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
      ctx.fillText(ch, i * FONT_SIZE, drops[i] * FONT_SIZE);
      if (drops[i] * FONT_SIZE > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  resize();
  window.addEventListener('resize', resize);
  const rainId = setInterval(tick, 50);
  return () => clearInterval(rainId);
}

/* ═══════════════════════════════════════════════════
   2. BOOT SEQUENCE
   ═══════════════════════════════════════════════════ */

const BOOT_LINES = [
  '> BIOS_POST: OK',
  '> LOADING KERNEL v5.15.0-matrix...',
  '> MOUNTING_SYSTEM_DRIVES: [OK]',
  '> INITIALIZING_JVM: OpenJDK 21',
  '> SPRING_CONTEXT: loading beans...',
  '> KAFKA_BROKER: connecting...',
  '> REDIS_CACHE: ONLINE',
  '> POSTGRESQL: connected (pool=10)',
  '> PORTFOLIO_SYSTEM: ONLINE',
  '> RENDERING_INTERFACE...',
];

function runBootSequence(onComplete) {
  const logEl  = document.getElementById('boot-log');
  const barEl  = document.getElementById('boot-progress');
  const screen = document.getElementById('boot-screen');

  let i = 0;
  const interval = setInterval(() => {
    if (i >= BOOT_LINES.length) {
      clearInterval(interval);
      setTimeout(() => {
        screen.classList.add('fade-out');
        setTimeout(onComplete, 900);
      }, 300);
      return;
    }
    logEl.textContent += BOOT_LINES[i] + '\n';
    barEl.style.width = `${((i + 1) / BOOT_LINES.length) * 100}%`;
    i++;
  }, 220);
}

/* ═══════════════════════════════════════════════════
   3. KEYWORD TICKER
   ═══════════════════════════════════════════════════ */

function initKeywordTicker() {
  const stream = document.getElementById('keyword-stream');
  const shuffled = [...JAVA_KEYWORDS].sort(() => Math.random() - 0.5);

  // Duplicate for seamless loop
  const words = [...shuffled, ...shuffled];
  words.forEach(kw => {
    const span = document.createElement('span');
    span.className = 'kw-token';
    span.textContent = kw;
    stream.appendChild(span);
  });

  // Randomly illuminate tokens
  const tokens = stream.querySelectorAll('.kw-token');
  setInterval(() => {
    tokens.forEach(t => t.classList.remove('hot'));
    const count = 3 + Math.floor(Math.random() * 4);
    for (let n = 0; n < count; n++) {
      const idx = Math.floor(Math.random() * tokens.length);
      tokens[idx].classList.add('hot');
    }
  }, 600);
}

/* ═══════════════════════════════════════════════════
   4. LIVE LOG OUTPUT (scroll-driven)
   ═══════════════════════════════════════════════════ */

const logOutput  = document.getElementById('live-log-output');
const MAX_LOG    = 8;
let logLines     = [];
let logTimer     = null;

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildLogText(template) {
  if (!template.dynamic) return template.text;
  const val = {
    cpu:    `${getRandom(18, 87)}`,
    mem:    `${getRandom(200, 900)}`,
    lag:    `${getRandom(2, 140)}`,
    cache:  `${getRandom(65, 99)}`,
    uptime: `${getRandom(0, 720)}`,
    net:    `${getRandom(12, 450)}`,
  }[template.dynamic] || '0';
  return template.text.replace('##', val);
}

function pushLog(text, type = 'info') {
  const el = document.createElement('div');
  el.className = `log-entry ${type}`;
  el.textContent = text;
  logOutput.appendChild(el);
  logLines.push(el);
  if (logLines.length > MAX_LOG) {
    const old = logLines.shift();
    old.remove();
  }
  // Auto-scroll to latest entry
  logOutput.scrollTop = logOutput.scrollHeight;
}

function startLogTimer(fast = false) {
  clearInterval(logTimer);
  const delay = fast ? getRandom(300, 700) : getRandom(1400, 2800);
  logTimer = setInterval(() => {
    const tpl = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
    pushLog(buildLogText(tpl), tpl.type || 'info');
  }, delay);
}

/* ═══════════════════════════════════════════════════
   5. SYSTEM METRICS
   ═══════════════════════════════════════════════════ */

let uptimeSeconds = 0;
function initMetrics() {
  updateMetrics();
  setInterval(updateMetrics, 2000);

  // Uptime clock
  setInterval(() => {
    uptimeSeconds++;
    const h = String(Math.floor(uptimeSeconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((uptimeSeconds % 3600) / 60)).padStart(2, '0');
    const s = String(uptimeSeconds % 60).padStart(2, '0');
    const el = document.getElementById('uptime');
    if (el) el.textContent = `UPTIME: ${h}:${m}:${s}`;
  }, 1000);
}

function updateMetrics() {
  const cpuPct = getRandom(15, 85);
  const memPct = getRandom(30, 75);
  const netPct = getRandom(5, 60);

  setMetric('cpu', cpuPct);
  setMetric('mem', memPct);
  setMetric('net', netPct);
}

function setMetric(id, pct) {
  const bar = document.getElementById(`${id}-bar`);
  const val = document.getElementById(`${id}-val`);
  if (bar) bar.style.width = `${pct}%`;
  if (val) val.textContent = `${pct}%`;

  if (bar) {
    bar.style.background = pct > 80
      ? '#ff4444'
      : pct > 60
        ? '#ffaa00'
        : 'var(--neon)';
    bar.style.boxShadow = pct > 80
      ? '0 0 4px #ff4444'
      : '0 0 4px var(--neon)';
  }
}

/* ═══════════════════════════════════════════════════
   6. CLOCK
   ═══════════════════════════════════════════════════ */

function initClock() {
  const el = document.getElementById('feed-clock');
  function tick() {
    const now = new Date();
    const ts  = now.toISOString().replace('T', ' ').substring(0, 19);
    if (el) el.textContent = `SYS_TIME: ${ts} UTC`;
  }
  tick();
  setInterval(tick, 1000);
}

/* ═══════════════════════════════════════════════════
   7. SCROLL-DRIVEN EFFECTS (right pane → left log)
   ═══════════════════════════════════════════════════ */

function initScrollEffects() {
  const feed = document.getElementById('main-feed');
  let lastY   = 0;
  let scrolling = false;
  let scrollTimeout;

  feed.addEventListener('scroll', () => {
    const y = feed.scrollTop;
    const delta = Math.abs(y - lastY);
    lastY = y;

    // Speed-up log when scrolling
    if (!scrolling) {
      scrolling = true;
      startLogTimer(true);
      pushLog('> SCROLL_EVENT_DETECTED...', 'info');
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      scrolling = false;
      startLogTimer(false);
    }, 500);

    // IntersectionObserver handles card reveals
    checkCardFocus();
  });
}

/* ═══════════════════════════════════════════════════
   8. CARD GLITCH REVEAL (IntersectionObserver)
   ═══════════════════════════════════════════════════ */

function initCardReveal() {
  const feed = document.getElementById('main-feed');
  const cards = document.querySelectorAll('.project-card');

  function revealCard(card) {
    if (card.classList.contains('visible')) return;
    card.classList.add('visible');
    spawnPixelScatter(card);
    pushLog(`> LOADING_PROJECT: ${card.id.replace('project-', '').toUpperCase()}`, 'info');
    card.querySelectorAll('.stat-val[data-target]').forEach(animateCounter);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) revealCard(entry.target);
    });
  }, {
    root: feed,                      // use main-feed as scroll root
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px'
  });

  cards.forEach(c => observer.observe(c));

  // Fallback: after 800ms force-reveal any card whose top is within the feed viewport
  setTimeout(() => {
    const feedRect = feed.getBoundingClientRect();
    cards.forEach(card => {
      const r = card.getBoundingClientRect();
      if (r.top < feedRect.bottom && r.bottom > feedRect.top) {
        revealCard(card);
      }
    });
  }, 800);
}

/* Spawn Matrix green pixel particles during glitch reveal */
function spawnPixelScatter(card) {
  const N = 18;
  for (let i = 0; i < N; i++) {
    const pixel = document.createElement('div');
    pixel.style.cssText = `
      position:absolute;
      width:${getRandom(2,5)}px;
      height:${getRandom(2,5)}px;
      background:#39FF14;
      border-radius:1px;
      top:${getRandom(0,80)}%;
      left:${getRandom(0,100)}%;
      pointer-events:none;
      z-index:10;
      --px:${getRandom(-60,60)}px;
      --py:${getRandom(-60,60)}px;
      animation:pixel-scatter 0.9s ease forwards;
      animation-delay:${getRandom(0,300)}ms;
    `;
    card.appendChild(pixel);
    setTimeout(() => pixel.remove(), 1300);
  }
}

/* ── Counter animation ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1200;
  const start = performance.now();
  const suffix = el.textContent.trim().replace(/[0-9,]/g, '');

  function frame(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    el.textContent = Math.floor(easedProgress * target).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* ═══════════════════════════════════════════════════
   9. CARD FOCUS (green glow when in center viewport)
   ═══════════════════════════════════════════════════ */

function checkCardFocus() {
  const cards = document.querySelectorAll('.project-card');
  const feedEl = document.getElementById('main-feed');
  const feedRect = feedEl.getBoundingClientRect();
  const centerY = feedRect.top + feedRect.height / 2;

  let closestCard = null;
  let closestDist = Infinity;

  cards.forEach(card => {
    const r    = card.getBoundingClientRect();
    const midY = r.top + r.height / 2;
    const dist = Math.abs(midY - centerY);
    if (dist < closestDist) { closestDist = dist; closestCard = card; }
  });

  cards.forEach(c => c.classList.toggle('in-focus', c === closestCard));
}

/* ═══════════════════════════════════════════════════
   10. SKILL BARS REVEAL
   ═══════════════════════════════════════════════════ */

let skillBarsInitialized = false;
function initSkillBars() {
  // Guard: only create observers once to avoid duplicates
  if (skillBarsInitialized) {
    // Re-trigger bars if already visible (in case user switched back)
    document.querySelectorAll('.skill-category.visible .skill-bar').forEach(bar => {
      bar.style.width = '0%';
      const pct = bar.dataset.skill;
      setTimeout(() => { bar.style.width = `${pct}%`; }, 80);
    });
    return;
  }
  skillBarsInitialized = true;

  const categories = document.querySelectorAll('.skill-category');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.querySelectorAll('.skill-bar').forEach(bar => {
          const pct = bar.dataset.skill;
          setTimeout(() => { bar.style.width = `${pct}%`; }, 100);
        });
      }
    });
  }, { threshold: 0.15 });

  categories.forEach(c => obs.observe(c));
}

/* Reset and re-trigger tech cloud animations */
function resetTechCloud() {
  const tags = document.querySelectorAll('.tech-cloud-tag');
  tags.forEach((tag, i) => {
    tag.style.animation = 'none';
    tag.style.opacity   = '0';
    tag.style.transform = 'scale(0.8)';
    // Force reflow then restart
    void tag.getBoundingClientRect();
    setTimeout(() => {
      tag.style.animation = '';
      tag.style.opacity   = '';
      tag.style.transform = '';
    }, i * 40);
  });
}

/* ═══════════════════════════════════════════════════
   11. TAB SWITCHING
   ═══════════════════════════════════════════════════ */

function initTabs() {
  const tabs    = document.querySelectorAll('.feed-tab');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('feed-tab--active'));
      tab.classList.add('feed-tab--active');

      contents.forEach(c => {
        c.classList.remove('tab-content--active');
        c.style.display = 'none';
      });

      const el = document.getElementById(`tab-content-${target}`);
      if (el) {
        el.style.display = 'flex';
        void el.offsetWidth; // reflow
        el.classList.add('tab-content--active');
      }

      pushLog(`> TAB_SWITCH: ${target.toUpperCase()}`, 'info');

      if (target === 'projects') {
        setTimeout(() => {
          const feed = document.getElementById('main-feed');
          const feedRect = feed.getBoundingClientRect();
          document.querySelectorAll('.project-card').forEach(card => {
             const r = card.getBoundingClientRect();
             if (r.top < feedRect.bottom + 100 && r.bottom > feedRect.top - 100) {
               if (!card.classList.contains('visible')) {
                 card.classList.add('visible');
                 spawnPixelScatter(card);
                 pushLog(`> LOADING_PROJECT: ${card.id.replace('project-', '').toUpperCase()}`, 'info');
                 card.querySelectorAll('.stat-val[data-target]').forEach(animateCounter);
               }
             }
          });
        }, 150);
      }

      if (target === 'commits') populateCommits();
      if (target === 'skills') {
        initSkillBars();
        resetTechCloud();
      }
    });
  });
}

/* ═══════════════════════════════════════════════════
   12. COMMIT FEED
   ═══════════════════════════════════════════════════ */

function populateCommits() {
  const list = document.getElementById('commit-feed-list');
  if (!list || list.dataset.populated) return;
  list.dataset.populated = 'true';

  COMMITS.forEach((c, i) => {
    setTimeout(() => {
      const item = document.createElement('div');
      item.className = 'commit-item';
      item.innerHTML = `
        <span class="commit-hash">${c.hash}</span>
        <div class="commit-body">
          <div class="commit-msg">${c.msg}</div>
          <div class="commit-meta">
            <span class="commit-branch">⎇ ${c.branch}</span>
            <span class="commit-additions">${c.additions}</span>
            <span class="commit-deletions">${c.deletions}</span>
            <span class="commit-time">${c.time}</span>
            <span style="color:var(--text-dim)">[${c.repo}]</span>
          </div>
        </div>
      `;
      list.appendChild(item);
    }, i * 80);
  });
}

/* ═══════════════════════════════════════════════════
   13. CURSOR GLOW FOLLOWER
   ═══════════════════════════════════════════════════ */

function initCursorGlow() {
  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  glow.style.cssText = `
    position: fixed;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    background: radial-gradient(circle, rgba(57,255,20,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(glow);

  let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    glow.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });

  // Smooth trailing effect
  function animGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = `${glowX}px`;
    glow.style.top  = `${glowY}px`;
    requestAnimationFrame(animGlow);
  }
  animGlow();
}

/* ═══════════════════════════════════════════════════
   14. CARD TITLE HOVER GLITCH
   ═══════════════════════════════════════════════════ */

function initTitleGlitch() {
  document.querySelectorAll('.card-title').forEach(title => {
    const original = title.textContent;
    const glitchChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    let glitchInterval = null;
    let glitchCount = 0;

    title.addEventListener('mouseenter', () => {
      glitchCount = 0;
      glitchInterval = setInterval(() => {
        if (glitchCount > 8) {
          title.textContent = original;
          clearInterval(glitchInterval);
          return;
        }
        title.textContent = original.split('').map((ch, i) => {
          if (ch === '_' || ch === ' ') return ch;
          return glitchCount < 4 && Math.random() > 0.5
            ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
            : ch;
        }).join('');
        glitchCount++;
      }, 60);
    });

    title.addEventListener('mouseleave', () => {
      clearInterval(glitchInterval);
      title.textContent = original;
    });
  });
}

/* ═══════════════════════════════════════════════════
   15. HERO TYPEWRITER (system banner above cards)
   ═══════════════════════════════════════════════════ */

function initHeroTypewriter() {
  const hero = document.getElementById('hero-typewriter');
  if (!hero) return;

  const lines = [
    '> SYSTEM_IDENTIFICATION: Full-Stack Java Engineer',
    '> SPECIALTY: Distributed Systems · Event-Driven Architecture',
    '> STATUS: Building production-grade systems at scale',
  ];

  let lineIdx = 0, charIdx = 0;
  const lineEl = document.createElement('div');
  lineEl.className = 'hero-tw-line';
  hero.appendChild(lineEl);

  function typeTick() {
    if (lineIdx >= lines.length) return;
    const line = lines[lineIdx];
    if (charIdx <= line.length) {
      lineEl.textContent = line.substring(0, charIdx);
      charIdx++;
      setTimeout(typeTick, charIdx === 1 ? 400 : 28);
    } else {
      lineIdx++;
      charIdx = 0;
      if (lineIdx < lines.length) {
        const nextLine = document.createElement('div');
        nextLine.className = 'hero-tw-line';
        hero.appendChild(nextLine);
        // Point lineEl to the new element
        setTimeout(() => {
          const lines2 = hero.querySelectorAll('.hero-tw-line');
          // reassign via closure trick
          setTimeout(typeTick, 350);
        }, 0);
        return;
      }
    }
  }

  // Re-implement cleanly
  hero.innerHTML = '';
  let li = 0, ci = 0;
  let currentEl = null;

  function typeNext() {
    if (li >= lines.length) return;
    if (ci === 0) {
      currentEl = document.createElement('div');
      currentEl.className = 'hero-tw-line';
      hero.appendChild(currentEl);
    }
    const line = lines[li];
    ci++;
    currentEl.textContent = line.substring(0, ci);
    if (ci < line.length) {
      setTimeout(typeNext, 26);
    } else {
      li++; ci = 0;
      if (li < lines.length) setTimeout(typeNext, 500);
    }
  }
  setTimeout(typeNext, 600);
}

/* ═══════════════════════════════════════════════════
   16. MAIN INIT
   ═══════════════════════════════════════════════════ */

/* Profile photo upload — clicking the circular frame opens file picker */
function initPhotoUpload() {
  // Upload capability removed - image is now hardcoded to prevent unauthorized changes
}

(function main() {
  initMatrixRain();

  runBootSequence(() => {
    const app = document.getElementById('app');
    app.classList.remove('hidden');

    /* Kick off all systems — defer card reveal one frame so DOM is fully laid out */
    initKeywordTicker();
    startLogTimer(false);
    initMetrics();
    initClock();
    initScrollEffects();
    initTabs();
    checkCardFocus();
    initCursorGlow();
    initTitleGlitch();
    initHeroTypewriter();

    // Defer card reveal until after browser paint so IntersectionObserver has valid rects
    requestAnimationFrame(() => {
      setTimeout(initCardReveal, 100);
    });

    /* Welcome log burst */
    const welcomeLogs = [
      { text: '> PORTFOLIO_SYSTEM: ONLINE', type: 'info' },
      { text: '> SPRING_BOOT: application context loaded', type: 'info' },
      { text: '> KAFKA_BROKER: connected [localhost:9092]', type: 'info' },
      { text: '> PROJECT_FEED: rendering...', type: 'info' },
      { text: '> PROJECTS_INDEXED: 3 entries found', type: 'info' },
    ];
    welcomeLogs.forEach((l, i) => {
      setTimeout(() => pushLog(l.text, l.type), i * 350);
    });
  });
})();
