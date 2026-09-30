/* ============================================================
   Атласы невидимого — обложка серии
   ============================================================ */

/*
 * Все тома серии. Чтобы добавить или «выпустить» том, достаточно
 * поправить этот массив: у тома без url кнопка неактивна и стоит
 * статус «в печати».
 */
const VOLUMES = [
  {
    id: 'haema',
    num: 'I',
    code: '616.98',
    title: 'HAEMA',
    subtitle: 'Кровь и вирусы',
    hook: 'Около 8% твоей ДНК — следы древних вирусов.',
    topic: 'ВИЧ, иммунитет, эпидемия',
    style: 'самиздат, ASCII, рваные ксерокопии',
    era: 'самиздат',
    note: 'ксерокопия с ксерокопии',
    kind: 'шейдер',
    tech: 'ASCII-шейдер: трёхмерный вирион переводится в машинописные символы прямо в браузере.',
    effect: 'ascii',
    spine: '#6e1a1a', spineInk: '#efe3cc',
    url: 'https://dmitrylelee.github.io/hiv/',
  },
  {
    id: 'mycelium',
    num: 'II',
    code: '582.28',
    title: 'MYCELIUM',
    subtitle: 'Подземная сеть',
    hook: 'Большинство растений на Земле живут в союзе с грибами.',
    topic: 'грибница, микориза, обмен веществами',
    style: 'ризограф, полевой определитель',
    era: 'ризограф',
    note: 'две краски, мимо приводки',
    kind: 'симуляция',
    tech: 'Симуляция роста гиф: тысячи агентов ищут пищу, след печатается в две краски со сдвигом.',
    effect: 'riso',
    spine: '#2c4a38', spineInk: '#f2c9dc',
    url: 'https://dmitrylelee.github.io/MYCELIUM/',
  },
  {
    id: 'night',
    num: 'III',
    code: '612.821.7',
    title: 'Ночная смена',
    subtitle: 'Сон и мозг',
    hook: 'Треть жизни ты проводишь без сознания. Мозг — нет.',
    topic: 'фазы сна, память, циркадные ритмы',
    style: 'советский научпоп 1960-х',
    era: 'растр 1960-х',
    note: 'растр, как в «Знание — сила»',
    kind: 'симуляция',
    tech: 'Живая гипнограмма: модель циклов сна за ночь, свёрстанная растром и красным кирпичом.',
    effect: 'raster',
    spine: '#1f2b47', spineInk: '#e9c7a0',
    url: 'https://dmitrylelee.github.io/sleep/',
  },
  {
    id: 'mind',
    num: 'IV',
    code: '159.9',
    title: 'Кабинет восприятия',
    subtitle: 'Как устроен разум',
    hook: 'Две одинаковые фигуры: одна кажется великаном, другая — карликом.',
    topic: 'восприятие, эмоции, ошибки мышления',
    style: 'оп-арт, комната Эймса',
    era: 'оп-арт',
    note: 'смотри в глазок',
    kind: 'шейдер',
    tech: 'Three.js и пост-шейдер «оп-арт»: комната Эймса прямоугольна, только пока смотришь из глазка.',
    effect: 'moire',
    spine: '#161514', spineInk: '#f2efe6',
    url: 'https://dmitrylelee.github.io/night_dev/',
  },
  {
    id: 'cabinet',
    num: 'V',
    code: '159.937',
    title: 'Кабинет восприятия',
    subtitle: 'Испытуемый',
    hook: 'Часть того, что ты видишь, мозг дорисовал сам. Проверим на тебе.',
    topic: 'контраст, форма, движение, проекция',
    style: 'бланк теста, кляксы Роршаха',
    era: 'бланк П-4',
    note: 'заполни бланк',
    kind: 'иллюзия',
    tech: 'Бланк испытуемого: 14 стимулов в 7 главах, генератор клякс; ответы остаются только в браузере.',
    effect: 'blot',
    spine: '#e2d9c3', spineInk: '#121212',
    url: 'https://dmitrylelee.github.io/psycho/',
  },
  {
    id: 'blob',
    num: 'VI',
    code: '582.24',
    title: 'BLOB',
    subtitle: 'Слизевик',
    hook: 'У него нет ни одного нейрона. Он повторил схему железных дорог Токио.',
    topic: 'физарум, поиск пути, интеллект без мозга',
    style: 'гранж 90-х, VHS',
    era: 'VHS',
    note: 'переписано с кассеты',
    kind: 'симуляция',
    tech: 'Модель Physarum на GPU: слизевик прокладывает сеть дорог поверх затёртой видеокассеты.',
    effect: 'vhs',
    spine: '#b8961e', spineInk: '#1a1405',
    url: 'https://dmitrylelee.github.io/blob/',
  },
];

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const wide = matchMedia('(min-width: 760px)');
const $ = (s, r = document) => r.querySelector(s);
const byId = id => VOLUMES.find(v => v.id === id);


/* ---------------- Ручная работа: рваные края ---------------- */

// рваный край бумаги: неровная ломаная сверху и снизу
function tear(node, depth = 5) {
  const pts = [];
  const n = 26;
  for (let i = 0; i <= n; i++) pts.push(`${(i / n * 100).toFixed(1)}% ${(Math.random() * depth).toFixed(1)}px`);
  for (let i = n; i >= 0; i--) pts.push(`${(i / n * 100).toFixed(1)}% calc(100% - ${(Math.random() * depth).toFixed(1)}px)`);
  node.style.clipPath = `polygon(${pts.join(',')})`;
}

/* ---------------- Каталог: образцы печати ---------------- */

function el(tag, attrs = {}, children = []) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'text') n.textContent = v;
    else if (k === 'style') for (const [p, val] of Object.entries(v)) n.style.setProperty(p, val);
    else n.setAttribute(k, v);
  }
  for (const c of [].concat(children)) if (c) n.append(c);
  return n;
}

function field(dt, dd) {
  return el('div', {}, [el('dt', { text: dt }), el('dd', { text: dd })]);
}

const TILTS = [-1.6, 1.2, -0.7, 1.8, -1.2, 0.8];

function renderCatalog() {
  const list = $('#catalog');
  VOLUMES.forEach((v, i) => {
    const out = Boolean(v.url);
    const openBtn = el('button', {
      class: 'btn', type: 'button', 'data-open': v.id,
      'aria-label': out ? `Открыть том ${v.num}: ${v.title}` : `Том ${v.num}: ${v.title} — в печати`,
    }, [
      el('span', { text: out ? 'Открыть том' : 'В печати' }),
      out ? el('svg', { class: 'btn-ring', viewBox: '0 0 240 76', 'aria-hidden': 'true', preserveAspectRatio: 'none' }) : null,
    ]);
    if (!out) openBtn.disabled = true;
    const ring = openBtn.querySelector('svg');
    if (ring) ring.innerHTML = '<use href="#h-circle"/>';

    const paper = el('div', { class: 'swatch-paper' }, [
      el('p', { class: 'sw-code mono' }, [el('span', { text: `Т. ${v.num}` }), el('span', { text: v.code })]),
      el('h3', { class: 'sw-title' }, [el('span', { class: 'sw-word', text: v.title }), el('canvas', { class: 'sw-plate', 'aria-hidden': 'true' })]),
      el('p', { class: 'sw-note hand', text: `${v.subtitle} — ${v.note}` }),
      el('p', { class: 'sw-hook', text: v.hook }),
      el('dl', { class: 'sw-meta mono' }, [field('тема', v.topic), field('печать', v.style), field('техника', v.kind)]),
      el('div', { class: 'sw-act' }, [
        openBtn,
        el('span', { class: `stamp ${out ? 'stamp--out' : 'stamp--press'}`, 'aria-hidden': 'true' },
          out ? ['Выдано', el('small', { text: '2026' })] : ['В печати', el('small', { text: 'ждите' })]),
      ]),
    ]);
    tear(paper, 6);
    list.append(el('li', { class: 'swatch', 'data-id': v.id, style: { '--tilt': `${TILTS[i % TILTS.length]}deg`, '--spine': v.spine, '--spine-ink': v.spineInk } }, [
      el('span', { class: 'tape', 'aria-hidden': 'true' }),
      paper,
    ]));
  });

  list.addEventListener('pointerover', e => {
    if (e.pointerType !== 'mouse') return;
    const sw = e.target.closest('.swatch');
    if (!sw || sw.contains(e.relatedTarget)) return;
    peek(byId(sw.dataset.id));
    plateHover(sw.dataset.id, true);
  });
  list.addEventListener('pointerout', e => {
    const sw = e.target.closest('.swatch');
    if (!sw || sw.contains(e.relatedTarget)) return;
    plateHover(sw.dataset.id, false);
  });
  list.addEventListener('focusin', e => {
    const sw = e.target.closest('.swatch');
    if (sw && !sw.contains(e.relatedTarget)) peek(byId(sw.dataset.id));
  });
  list.addEventListener('click', e => {
    const open = e.target.closest('[data-open]');
    if (open && !open.disabled) return openVolume(byId(open.dataset.open));
    const sw = e.target.closest('.swatch');
    if (sw) peek(byId(sw.dataset.id), true); // тап на телефоне — заглянуть
  });
}

function renderHowto() {
  const list = $('#howto');
  for (const v of VOLUMES) {
    list.append(el('li', {}, [
      el('span', { class: 'h-code mono', text: `Т. ${v.num}` }),
      el('span', { class: 'h-name', text: v.title }),
      el('span', { class: 'h-tech' }, [el('span', { class: 'h-kind hand', text: v.kind }), v.tech]),
    ]));
  }
}

function renderTicker() {
  const line = VOLUMES.map(v => v.hook).join('   ✶   ') + '   ✶   ';
  const track = $('#tickerTrack');
  track.append(el('span', { text: line }), el('span', { text: line, 'aria-hidden': 'true' }));
  tear($('.ticker'), 4);
}

/* ============================================================
   «Заглянуть в книгу» — секундная перекраска
   ============================================================ */

const fx = {
  root: $('#fx'),
  canvas: $('#fxCanvas'),
  tag: $('#fxTag'),
  ctx: null, raf: 0, hold: 0, clear: 0, w: 0, h: 0, current: null, last: 0,
};
fx.ctx = fx.canvas.getContext('2d');

function sizeFx() {
  const dpr = Math.min(devicePixelRatio || 1, 1.5);
  fx.w = innerWidth; fx.h = innerHeight;
  fx.canvas.width = Math.round(fx.w * dpr);
  fx.canvas.height = Math.round(fx.h * dpr);
  fx.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

// дешёвый детерминированный шум
function hash(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

const EFFECTS = {
  // I · ASCII-шум, рваные полосы ксерокса
  ascii(c, w, h, t) {
    c.clearRect(0, 0, w, h);
    const cw = 10, ch = 16, ramp = ' .,:;-=+*#%@';
    c.font = '14px "PT Mono", monospace';
    c.textBaseline = 'top';
    const k = t * 0.003;
    for (let y = 0; y < h; y += ch) {
      const band = Math.sin(y * 0.018 + k * 2.1) * 0.5 + 0.5;
      for (let x = 0; x < w; x += cw) {
        const n = (Math.sin(x * 0.011 + k) + Math.sin(y * 0.023 - k * 1.3) + Math.sin((x + y) * 0.007 + k * .7)) / 3;
        let v = (n * 0.5 + 0.5) * 0.75 + band * 0.25 + (hash(x, y + Math.floor(t / 60)) - 0.5) * 0.35;
        v = Math.max(0, Math.min(0.999, (v - 0.38) * 1.7));
        const chr = ramp[Math.floor(v * ramp.length)];
        if (chr === ' ') continue;
        c.fillStyle = v > 0.75 ? 'rgba(12,12,12,.85)' : 'rgba(20,20,20,.55)';
        c.fillText(chr, x, y);
      }
    }
    // рваные полосы, как от плохой ксерокопии
    c.fillStyle = 'rgba(10,10,10,.8)';
    for (let i = 0; i < 4; i++) {
      const y = hash(i, Math.floor(t / 120)) * h;
      c.fillRect(0, y, w, 2 + hash(i + 7, 3) * 5);
    }
  },

  // II · ризограф: зерно двух красок и сдвинутые плашки
  riso(c, w, h, t) {
    c.clearRect(0, 0, w, h);
    const off = Math.sin(t * 0.012) * 6;
    c.globalAlpha = 0.35;
    c.fillStyle = '#ff48b0';
    c.fillRect(w * 0.08 + off, h * 0.12, w * 0.34, h * 0.5);
    c.fillStyle = '#0078bf';
    c.beginPath();
    c.arc(w * 0.72 - off, h * 0.55 + off, Math.min(w, h) * 0.26, 0, Math.PI * 2);
    c.fill();
    c.globalAlpha = 1;
    const seed = Math.floor(t / 50);
    for (let i = 0; i < 2600; i++) {
      const x = hash(i, seed) * w, y = hash(seed, i * 1.7) * h;
      c.fillStyle = i & 1 ? 'rgba(255,72,176,.55)' : 'rgba(0,120,191,.55)';
      c.fillRect(x, y, 2, 2);
    }
  },

  // III · растровая точка и красный кирпич
  raster(c, w, h, t) {
    c.clearRect(0, 0, w, h);
    const step = 9;
    const k = t * 0.0025;
    c.fillStyle = '#b3402a';
    for (let y = 0; y < h + step; y += step) {
      for (let x = (y / step) % 2 ? step / 2 : 0; x < w + step; x += step) {
        const g = x / w * 0.6 + Math.sin(y * 0.01 + k) * 0.25 + 0.15;
        const r = Math.max(0, Math.min(1, g)) * step * 0.55;
        if (r < 0.4) continue;
        c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
      }
    }
    // «кирпич»: плашка, как на обложках журналов 1960-х
    c.save();
    c.translate(w * 0.15, h * 0.62);
    c.rotate(-0.12);
    c.fillStyle = 'rgba(179,64,42,.9)';
    c.fillRect(-w, 0, w * 3, Math.max(60, h * 0.1));
    c.restore();
  },

  // IV · муар: две системы колец
  moire(c, w, h, t) {
    c.clearRect(0, 0, w, h);
    const k = t * 0.0016;
    const R = Math.hypot(w, h);
    c.strokeStyle = 'rgba(255,255,255,.85)';
    c.lineWidth = 2.2;
    const centers = [
      [w * 0.42 + Math.cos(k) * 40, h * 0.5 + Math.sin(k) * 25],
      [w * 0.58 - Math.cos(k * 1.3) * 40, h * 0.5 - Math.sin(k * 0.8) * 30],
    ];
    for (const [cx, cy] of centers) {
      c.beginPath();
      for (let r = 6; r < R; r += 7) {
        c.moveTo(cx + r, cy);
        c.arc(cx, cy, r, 0, Math.PI * 2);
      }
      c.stroke();
    }
  },

  // V · клякса Роршаха растекается по развороту
  blot(c, w, h, t) {
    c.clearRect(0, 0, w, h);
    const grow = Math.min(1, 0.3 + t / 700), sc = Math.min(w, h) / 900;
    c.filter = 'url(#ink-edge)';
    c.fillStyle = 'rgba(22,20,18,.9)';
    c.beginPath();
    // потёки туши: от сгиба наружу, всё тоньше
    for (let s = 0; s < 16; s++) {
      let x = w / 2 - hash(s, 11) * 30 * sc, y = h * (0.18 + hash(11, s) * 0.64);
      let r = (26 + hash(s, 12) * 46) * sc;
      const ang = (hash(s, 13) - 0.5) * 2.2 + Math.PI;
      const steps = Math.round((10 + hash(s, 14) * 22) * grow);
      for (let i = 0; i < steps; i++) {
        const a2 = ang + Math.sin(i * 0.7 + s) * 0.6;
        x += Math.cos(a2) * r * 0.55; y += Math.sin(a2) * r * 0.55;
        r *= 0.93;
        if (r < 1.5) break;
        c.moveTo(x + r, y); c.arc(x, y, r, 0, Math.PI * 2);
        c.moveTo(w - x + r, y); c.arc(w - x, y, r, 0, Math.PI * 2);
        if (hash(i, s) > 0.86) { // брызги
          const bx = x + (hash(s, i) - 0.5) * r * 4, by = y + (hash(i + 1, s) - 0.5) * r * 4, br = r * 0.25;
          c.moveTo(bx + br, by); c.arc(bx, by, br, 0, Math.PI * 2);
          c.moveTo(w - bx + br, by); c.arc(w - bx, by, br, 0, Math.PI * 2);
        }
      }
    }
    c.fill();
    c.filter = 'none';
    c.strokeStyle = 'rgba(212,42,30,.6)'; c.setLineDash([6, 8]);
    c.beginPath(); c.moveTo(w / 2, 0); c.lineTo(w / 2, h); c.stroke(); c.setLineDash([]);
  },

  // VI · VHS: развёртка, полоса трекинга, экранное меню
  vhs(c, w, h, t) {
    c.clearRect(0, 0, w, h);
    c.fillStyle = 'rgba(0,0,0,.22)';
    for (let y = 0; y < h; y += 3) c.fillRect(0, y, w, 1);
    const band = ((t * 0.5) % (h + 120)) - 60;
    const seed = Math.floor(t / 40);
    for (let i = 0; i < 220; i++) {
      const y = band + (hash(i, seed) - 0.5) * 70;
      const x = hash(seed, i) * w;
      c.fillStyle = `rgba(255,255,255,${0.3 + hash(i, i) * 0.5})`;
      c.fillRect(x, y, 20 + hash(i, 2) * 90, 1.5);
    }
    for (let i = 0; i < 3; i++) {
      const y = hash(i, seed) * h;
      c.fillStyle = 'rgba(255,255,255,.08)';
      c.fillRect(0, y, w, 6 + hash(seed, i) * 14);
    }
    c.font = 'bold 26px "PT Mono", monospace';
    c.textBaseline = 'top';
    c.fillStyle = '#fff';
    c.shadowColor = 'rgba(0,0,0,.8)'; c.shadowBlur = 0; c.shadowOffsetX = 2; c.shadowOffsetY = 2;
    c.fillText('▶ PLAY', 24, 22);
    const s = Math.floor(t / 1000), f = Math.floor((t % 1000) / 40);
    c.fillText(`SP  00:0${s}:${String(f).padStart(2, '0')}`, 24, h - 52);
    c.shadowColor = 'transparent'; c.shadowOffsetX = 0; c.shadowOffsetY = 0;
  },
};

function peek(vol, force = false) {
  if (!vol) return;
  const now = performance.now();
  // тот же том подряд не перекрашиваем чаще раза в полторы секунды
  if (!force && fx.current === vol.id && now - fx.last < 1500) return;
  fx.current = vol.id; fx.last = now;

  clearTimeout(fx.hold); clearTimeout(fx.clear); cancelAnimationFrame(fx.raf);
  document.querySelectorAll('.swatch.is-active').forEach(c => c.classList.remove('is-active'));
  document.querySelector(`.swatch[data-id="${vol.id}"]`)?.classList.add('is-active');
  if (hero.p && !hero.pinned) heroSetStyle(HERO_ORDER.indexOf(vol.effect));

  sizeFx();
  document.body.dataset.fx = vol.effect;
  fx.tag.textContent = `Т. ${vol.num} · ${vol.title} — ${vol.style}`;
  fx.root.classList.add('on');
  $('#live').textContent = `Том ${vol.num}: ${vol.title}. ${vol.subtitle}. ${vol.url ? 'Доступен.' : 'В печати.'}`;

  const draw = EFFECTS[vol.effect];
  const dur = reduceMotion.matches ? 700 : 1100;
  const start = now;
  if (reduceMotion.matches) {
    draw(fx.ctx, fx.w, fx.h, 0); // один неподвижный кадр
  } else {
    const loop = t => {
      draw(fx.ctx, fx.w, fx.h, Math.max(0, t - start));
      if (t - start < dur + 300) fx.raf = requestAnimationFrame(loop);
    };
    fx.raf = requestAnimationFrame(loop);
  }
  fx.hold = setTimeout(endPeek, dur);
}

function endPeek() {
  fx.root.classList.remove('on');
  document.querySelectorAll('.swatch.is-active').forEach(c => c.classList.remove('is-active'));
  fx.clear = setTimeout(() => {
    delete document.body.dataset.fx;
    cancelAnimationFrame(fx.raf);
    fx.ctx.clearRect(0, 0, fx.w, fx.h);
  }, 320);
}

/* ============================================================
   Открытие тома
   ============================================================ */

let opening = false;
function openVolume(vol) {
  if (!vol) return;
  if (!vol.url) { peek(vol, true); return; }
  if (opening) return;
  if (reduceMotion.matches) { location.href = vol.url; return; }
  opening = true;
  clearTimeout(fx.hold); endPeek();
  const o = $('#opening');
  const book = $('.book', o);
  book.style.setProperty('--c', vol.spine);
  book.style.setProperty('--ci', vol.spineInk);
  $('.bc-num', o).textContent = `ТОМ ${vol.num}`;
  $('.bc-title', o).textContent = vol.title;
  $('.bc-sub', o).textContent = vol.subtitle;
  $('.bp-code', o).textContent = `Т. ${vol.num} · ${vol.code}`;
  $('.bp-title', o).textContent = vol.subtitle;
  o.classList.remove('run'); void o.offsetWidth; o.classList.add('run');
  setTimeout(() => { location.href = vol.url; }, 1300);
}

// при возврате кнопкой «назад» страница может прийти из bfcache
addEventListener('pageshow', () => {
  opening = false;
  $('#opening').classList.remove('run');
});

/* ============================================================
   3D-полка (Three.js, только при наличии WebGL и широком экране)
   ============================================================ */

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'));
  } catch { return false; }
}

async function initShelf() {
  const host = $('#shelf3d');
  if (!hasWebGL()) return;
  let THREE;
  try { THREE = await import('three'); } catch (err) { return; } // без сети/CDN остаётся список
  try { await document.fonts.ready; } catch {}

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch { return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.prepend(renderer.domElement);
  document.documentElement.classList.add('has-3d');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 2, 0.1, 100);

  scene.add(new THREE.AmbientLight(0xffe2c0, 0.55));
  const key = new THREE.DirectionalLight(0xffd9a8, 1.6);
  key.position.set(-3, 4, 6);
  scene.add(key);
  const rim = new THREE.PointLight(0xffb070, 8, 12);
  rim.position.set(4, 2, 3);
  scene.add(rim);

  // полка
  const wood = new THREE.MeshStandardMaterial({ color: 0x4a2e19, roughness: 0.8 });
  const woodDark = new THREE.MeshStandardMaterial({ color: 0x241509, roughness: 0.9 });
  const SHELF_W = 10.2;
  const board = new THREE.Mesh(new THREE.BoxGeometry(SHELF_W + 0.6, 0.22, 2.4), wood);
  board.position.set(0, -1.61, 0);
  scene.add(board);
  const back = new THREE.Mesh(new THREE.PlaneGeometry(SHELF_W + 0.6, 5.4), woodDark);
  back.position.set(0, 1.0, -1.2);
  scene.add(back);
  for (const sx of [-1, 1]) {
    const side = new THREE.Mesh(new THREE.BoxGeometry(0.22, 5.2, 2.4), wood);
    side.position.set(sx * (SHELF_W / 2 + 0.2), 0.9, 0);
    scene.add(side);
  }

  // корешки
  const dims = [
    { w: 1.2, h: 3.35 }, { w: 1.02, h: 3.0 }, { w: 1.12, h: 3.45 }, { w: 1.12, h: 3.3 }, { w: 1.08, h: 3.15 }, { w: 0.98, h: 2.85 },
  ];
  const pagesMat = new THREE.MeshStandardMaterial({ color: 0xe9dfc6, roughness: 0.95 });
  const books = [];
  const gap = 0.14;
  const total = dims.reduce((s, d) => s + d.w, 0) + gap * (dims.length - 1);
  let x = -total / 2 - 0.6;

  VOLUMES.forEach((v, i) => {
    const d = dims[i];
    const tex = spineTexture(THREE, v, d.w, d.h);
    const cover = new THREE.MeshStandardMaterial({ color: new THREE.Color(v.spine).multiplyScalar(0.8), roughness: 0.7 });
    const spine = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.62, metalness: 0.05 });
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(d.w, d.h, 2.0), [cover, cover, pagesMat, cover, spine, pagesMat]);
    mesh.position.set(x + d.w / 2, -1.5 + d.h / 2, 0);
    mesh.userData = { vol: v, baseX: x + d.w / 2, z: 0, tz: 0, ry: 0, try: 0 };
    scene.add(mesh);
    books.push(mesh);
    x += d.w + gap;
  });

  // подпорка для книг и пара безымянных томов справа — полка «живая»
  const brass = new THREE.MeshStandardMaterial({ color: 0xb8964f, metalness: 0.7, roughness: 0.35 });
  const end = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.6, 1.4), brass);
  end.position.set(x + 0.05, -0.7, 0.1);
  scene.add(end);
  const endBase = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.05, 1.4), brass);
  endBase.position.set(x + 0.32, -1.47, 0.1);
  scene.add(endBase);
  const lean = new THREE.Mesh(new THREE.BoxGeometry(0.55, 2.6, 1.8),
    new THREE.MeshStandardMaterial({ color: 0x3a2a1c, roughness: 0.85 }));
  lean.position.set(x + 1.2, -0.3, -0.1);
  lean.rotation.z = -0.22;
  scene.add(lean);

  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2(9, 9);
  let pointerIn = false;
  let hovered = null;
  let visible = true;
  let running = false;
  const tip = $('#shelfTip');

  function resize() {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // вписываем полку по ширине
    const needW = SHELF_W + 0.9;
    const vFov = THREE.MathUtils.degToRad(camera.fov);
    const dist = Math.max(needW / 2 / Math.tan(vFov / 2) / camera.aspect, 4.3 / 2 / Math.tan(vFov / 2));
    camera.position.set(0, 0.4, dist + 1);
    camera.lookAt(0, 0.1, 0);
    camera.updateProjectionMatrix();
    kick();
  }

  function setHovered(m) {
    if (m === hovered) return;
    hovered = m;
    host.classList.toggle('is-hot', Boolean(m));
    if (m) {
      const v = m.userData.vol;
      tip.hidden = false;
      tip.textContent = `Т. ${v.num} · ${v.code} — ${v.title}, «${v.subtitle}» · ${v.url ? 'выдано' : 'в печати'}`;
      peek(v);
    } else {
      tip.hidden = true;
    }
  }

  function pick() {
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(books, false)[0];
    setHovered(hit ? hit.object : null);
  }

  const canvas = renderer.domElement;
  canvas.addEventListener('pointermove', e => {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    pointerIn = true;
    pick();
    kick();
  });
  canvas.addEventListener('pointerleave', () => { pointerIn = false; ndc.set(9, 9); setHovered(null); kick(); });
  canvas.addEventListener('click', e => {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    pick();
    if (hovered) openVolume(hovered.userData.vol);
  });

  // точка курсора в плоскости корешков
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -1);
  const hitPt = new THREE.Vector3();

  function frame() {
    running = false;
    if (!visible || !wide.matches) return;
    let px = null;
    if (pointerIn) {
      ray.setFromCamera(ndc, camera);
      if (ray.ray.intersectPlane(plane, hitPt)) px = hitPt.x;
    }
    const k = reduceMotion.matches ? 1 : 0.14;
    let moving = false;
    for (const b of books) {
      const u = b.userData;
      let tz = 0, ry = 0;
      if (px !== null) {
        const dx = px - u.baseX;
        const near = Math.max(0, 1 - Math.abs(dx) / 1.9);
        tz = near * 0.22;
        ry = reduceMotion.matches ? 0 : Math.max(-1, Math.min(1, dx)) * near * 0.12;
      }
      if (b === hovered) tz = 0.55;
      u.z += (tz - u.z) * k;
      u.ry += (ry - u.ry) * k;
      b.position.z = u.z;
      b.rotation.y = u.ry;
      if (Math.abs(tz - u.z) > 0.001 || Math.abs(ry - u.ry) > 0.0005) moving = true;
    }
    renderer.render(scene, camera);
    if (moving) kick();
  }
  function kick() {
    if (running) return;
    running = true;
    requestAnimationFrame(frame);
  }

  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); }).observe(host);
  new ResizeObserver(resize).observe(host);
  wide.addEventListener('change', () => { if (wide.matches) resize(); });
  resize();
}

function spineTexture(THREE, v, w, h) {
  const W = 256, H = Math.round(W * h / w);
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d');

  // ткань переплёта
  g.fillStyle = v.spine;
  g.fillRect(0, 0, W, H);
  for (let i = 0; i < 4000; i++) {
    g.fillStyle = Math.random() < 0.5 ? 'rgba(0,0,0,.06)' : 'rgba(255,255,255,.04)';
    g.fillRect(Math.random() * W, Math.random() * H, 2, 1 + Math.random() * 3);
  }
  const shade = g.createLinearGradient(0, 0, W, 0);
  shade.addColorStop(0, 'rgba(0,0,0,.35)');
  shade.addColorStop(0.25, 'rgba(255,255,255,.08)');
  shade.addColorStop(0.7, 'rgba(0,0,0,0)');
  shade.addColorStop(1, 'rgba(0,0,0,.35)');
  g.fillStyle = shade;
  g.fillRect(0, 0, W, H);

  g.fillStyle = v.spineInk;
  g.strokeStyle = v.spineInk;
  // бинты с тиснением
  g.globalAlpha = 0.7;
  for (const y of [60, 72, H - 250, H - 238]) g.fillRect(18, y, W - 36, 4);
  g.globalAlpha = 1;

  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.font = '700 64px "Old Standard TT", "PT Serif", serif';
  g.fillText(v.num, W / 2, 130);

  // название — снизу вверх, как на русских корешках
  const top = v.url ? 170 : 240;
  g.save();
  g.translate(W / 2, (H - 250 + top) / 2);
  g.rotate(-Math.PI / 2);
  const title = v.title.toUpperCase();
  const maxLen = H - 250 - top - 30;
  const fit = lines => {
    let size = 96;
    const font = sz => `700 ${sz}px "Old Standard TT", "PT Serif", serif`;
    g.font = font(size);
    while (Math.max(...lines.map(l => g.measureText(l).width)) > maxLen && size > 20) g.font = font(size -= 4);
    return size;
  };
  // длинное название переносим на две строки
  let lines = [title];
  let size = fit(lines);
  if (size < 56 && title.includes(' ')) {
    const two = title.split(' ');
    const alt = fit([two[0], two.slice(1).join(' ')]);
    if (alt > size) { lines = [two[0], two.slice(1).join(' ')]; size = alt; } else fit(lines);
  }
  const lh = size * 0.95;
  lines.forEach((l, i) => g.fillText(l, 0, -22 - (lines.length - 1 - i) * lh + (lines.length - 1) * lh * 0.35));
  g.font = 'italic 40px "Old Standard TT", "PT Serif", serif';
  g.globalAlpha = 0.85;
  g.fillText(v.subtitle, 0, 50 + (lines.length - 1) * lh * 0.35);
  g.restore();
  g.globalAlpha = 1;

  // библиотечная наклейка с шифром
  const ly = H - 200;
  g.fillStyle = '#efe6d1';
  g.fillRect(34, ly, W - 68, 120);
  g.strokeStyle = 'rgba(0,0,0,.35)';
  g.lineWidth = 3;
  g.strokeRect(40, ly + 6, W - 80, 108);
  g.fillStyle = '#1f1a14';
  g.font = '30px "PT Mono", monospace';
  g.fillText(`Т. ${v.num}`, W / 2, ly + 38);
  g.font = `${v.code.length > 7 ? 26 : 30}px "PT Mono", monospace`;
  g.fillText(v.code, W / 2, ly + 82);

  if (!v.url) {
    // бумажная бандероль «в печати»
    g.save();
    g.translate(W / 2, 196);
    g.rotate(-0.06);
    g.fillStyle = 'rgba(239,230,209,.92)';
    g.fillRect(-W, -22, W * 2, 44);
    g.fillStyle = '#2f4f7a';
    g.font = '700 26px "PT Mono", monospace';
    g.fillText('В ПЕЧАТИ', 0, 2);
    g.restore();
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/* ============================================================
   Печатные формы. Слово набирается «деревянным шрифтом»
   с рваным краем и износом краски, а потом печатается
   в технике тома: ASCII, ризограф, растр, муар, VHS.
   ============================================================ */

const INK = {
  ink: '#1b1916', paper: '#efe7d6', red: '#d42a1e', pink: '#ff48b0',
  blue: '#0078bf', cyan: '#00a9c9', brick: '#c2402a',
};
const PLATE_FONT = '"Oswald", "Arial Narrow", Impact, sans-serif';

function tintOf(mask, color) {
  const c = document.createElement('canvas');
  c.width = mask.width; c.height = mask.height;
  const g = c.getContext('2d');
  g.fillStyle = color; g.fillRect(0, 0, c.width, c.height);
  g.globalCompositeOperation = 'destination-in';
  g.drawImage(mask, 0, 0);
  return c;
}

// p — «печатная форма»: холст, маска слова, краски
function makePlate(canvas, lines, W, maxH = 0, fill = 0.96) {
  const dpr = Math.min(devicePixelRatio || 1, 1.5);
  const probe = document.createElement('canvas').getContext('2d');
  probe.font = `700 100px ${PLATE_FONT}`;
  const w100 = Math.max(...lines.map(l => probe.measureText(l).width));
  let fs = W * fill * 100 / w100;
  const lh = 0.98;
  if (maxH) fs = Math.min(fs, (maxH * 0.8) / (lines.length * lh));
  probe.font = `700 ${fs}px ${PLATE_FONT}`;
  const cap = probe.measureText('Н').actualBoundingBoxAscent || fs * 0.72;
  const padY = fs * 0.22;
  const h = Math.round(maxH || (cap + (lines.length - 1) * fs * lh + padY * 2));
  const w = Math.round(W);

  canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
  canvas.style.width = w + 'px'; canvas.style.height = h + 'px';

  const mask = document.createElement('canvas');
  mask.width = canvas.width; mask.height = canvas.height;
  const m = mask.getContext('2d');
  m.scale(dpr, dpr);
  m.fillStyle = '#fff';
  m.font = `700 ${fs}px ${PLATE_FONT}`;
  m.textAlign = 'center';
  m.textBaseline = 'alphabetic';
  // рваный край оттиска (SVG-фильтр; где не поддерживается — чистый край)
  m.filter = 'url(#ink-edge)';
  const block = cap + (lines.length - 1) * fs * lh;
  const top = (h - block) / 2;
  lines.forEach((l, i) => m.fillText(l, w / 2, top + cap + i * fs * lh));
  m.filter = 'none';
  // износ: краска не легла в случайных точках
  m.globalCompositeOperation = 'destination-out';
  const specks = Math.round(w * h / 170);
  for (let i = 0; i < specks; i++) {
    const r = Math.random() < 0.95 ? Math.random() * 0.9 + 0.3 : Math.random() * 2 + 0.8;
    m.beginPath(); m.arc(Math.random() * w, Math.random() * h, r, 0, Math.PI * 2); m.fill();
  }
  // пара продольных царапин
  m.lineWidth = 0.8;
  for (let i = 0; i < 3; i++) {
    const y = Math.random() * h;
    m.beginPath(); m.moveTo(0, y); m.lineTo(w, y + (Math.random() - 0.5) * 6); m.stroke();
  }

  const probeC = document.createElement('canvas');
  probeC.width = mask.width; probeC.height = mask.height;
  const pg = probeC.getContext('2d', { willReadFrequently: true });
  pg.drawImage(mask, 0, 0);
  const data = pg.getImageData(0, 0, mask.width, mask.height).data;

  const tints = {};
  for (const [k, c] of Object.entries(INK)) tints[k] = tintOf(mask, c);
  const buf = document.createElement('canvas');
  buf.width = mask.width; buf.height = mask.height;

  return { canvas, ctx: canvas.getContext('2d'), w, h, dpr, fs, mask, data, tints, buf };
}

function inMask(p, x, y) {
  const i = ((Math.floor(y * p.dpr) * p.mask.width) + Math.floor(x * p.dpr)) * 4 + 3;
  return p.data[i] > 110;
}

const PLATE_FX = {
  // I · машинописный ASCII поверх бледного оттиска
  ascii(p, g, w, h, t) {
    g.globalAlpha = 0.24;
    g.drawImage(p.tints.ink, 0, 0, w, h);
    g.globalAlpha = 1;
    const cw = Math.max(5, p.fs / 28), ch = cw * 1.6, ramp = '.:-=+*#%@';
    g.font = `${Math.round(ch * 0.95)}px "PT Mono", monospace`;
    g.textBaseline = 'top';
    const k = t * 0.002, tick = Math.floor(t / 90);
    for (let y = 0; y < h; y += ch) {
      for (let x = 0; x < w; x += cw) {
        if (!inMask(p, x + cw / 2, y + ch / 2)) {
          if (hash(x, y + tick) > 0.992) { g.fillStyle = 'rgba(27,25,22,.3)'; g.fillText(ramp[Math.floor(x + y) % 4], x, y); }
          continue;
        }
        const n = (Math.sin(x * 0.02 + k) + Math.sin(y * 0.05 - k * 1.4)) * 0.25 + 0.5;
        const v = Math.min(0.999, n * 0.6 + hash(x, y + tick) * 0.4);
        g.fillStyle = v > 0.82 ? INK.red : INK.ink;
        g.fillText(ramp[Math.floor(v * ramp.length)], x, y);
      }
    }
  },

  // II · ризограф: розовая и синяя краски мимо приводки
  riso(p, g, w, h, t) {
    const o = Math.max(2, p.fs * 0.03);
    const dx = Math.sin(t * 0.003) * o, dy = Math.cos(t * 0.0023) * o * 0.6;
    g.globalCompositeOperation = 'multiply';
    g.drawImage(p.tints.pink, -o + dx, dy, w, h);
    g.drawImage(p.tints.blue, o - dx, -dy, w, h);
    g.globalCompositeOperation = 'source-over';
    const seed = Math.floor(t / 70), n = Math.round(w * h / 260);
    for (let i = 0; i < n; i++) {
      g.fillStyle = i & 1 ? 'rgba(255,72,176,.45)' : 'rgba(0,120,191,.45)';
      g.fillRect(hash(i, seed) * w, hash(seed, i * 1.3) * h, 1.4, 1.4);
    }
  },

  // III · растровая точка кирпичной краской
  raster(p, g, w, h, t) {
    const s = Math.max(4, p.fs / 17), k = t * 0.0022;
    g.fillStyle = INK.brick;
    g.beginPath();
    for (let y = 0, row = 0; y < h + s; y += s, row++) {
      for (let x = row % 2 ? s / 2 : 0; x < w + s; x += s) {
        const inside = inMask(p, Math.min(w - 1, x), Math.min(h - 1, y));
        const tone = inside ? 0.6 + 0.4 * Math.sin(x * 0.012 - k + y * 0.01) : 0.1 * (0.5 + 0.5 * Math.sin(x * 0.01 + k));
        const r = Math.max(0, tone) * s * 0.6;
        if (r < 0.45) continue;
        g.moveTo(x + r, y); g.arc(x, y, r, 0, Math.PI * 2);
      }
    }
    g.fill();
  },

  // IV · муар: две решётки под почти одинаковым углом
  moire(p, g, w, h, t) {
    const b = p.buf.getContext('2d');
    b.setTransform(p.dpr, 0, 0, p.dpr, 0, 0);
    b.globalCompositeOperation = 'source-over';
    b.clearRect(0, 0, w, h);
    b.strokeStyle = INK.ink;
    b.lineWidth = Math.max(1.2, p.fs / 90);
    const k = t * 0.0009, step = Math.max(4, p.fs / 26), L = h * 1.8, X = w * 0.62;
    for (const ang of [0.18 * Math.sin(k), 0.18 * Math.sin(k) + 0.07 + 0.05 * Math.sin(k * 1.7)]) {
      b.save(); b.translate(w / 2, h / 2); b.rotate(ang);
      b.beginPath();
      for (let x = -X; x < X; x += step) { b.moveTo(x, -L / 2); b.lineTo(x, L / 2); }
      b.stroke(); b.restore();
    }
    b.setTransform(1, 0, 0, 1, 0, 0);
    b.globalCompositeOperation = 'destination-in';
    b.drawImage(p.mask, 0, 0);
    g.globalAlpha = 0.1;
    g.drawImage(p.tints.ink, 0, 0, w, h);
    g.globalAlpha = 1;
    g.drawImage(p.buf, 0, 0, w, h);
  },

  // V · клякса Роршаха: тушь растекается симметрично
  blot(p, g, w, h, t) {
    const b = p.buf.getContext('2d');
    b.setTransform(p.dpr, 0, 0, p.dpr, 0, 0);
    b.globalCompositeOperation = 'source-over';
    b.clearRect(0, 0, w, h);
    b.fillStyle = INK.ink;
    const k = t * 0.0012, n = Math.round(w / 5);
    b.beginPath();
    for (let i = 0; i < n; i++) {
      const x = hash(i, 1) * w / 2, y = hash(1, i) * h;
      const r = (0.2 + hash(i, 2) * 0.8) * p.fs * 0.11 * (0.75 + 0.25 * Math.sin(k + i));
      b.moveTo(x + r, y); b.arc(x, y, r, 0, Math.PI * 2);
      b.moveTo(w - x + r, y); b.arc(w - x, y, r, 0, Math.PI * 2);
    }
    b.fill();
    b.setTransform(1, 0, 0, 1, 0, 0);
    b.globalCompositeOperation = 'destination-in';
    b.drawImage(p.mask, 0, 0);
    g.globalAlpha = 0.3;
    g.drawImage(p.tints.ink, 0, 0, w, h);
    g.globalAlpha = 1;
    g.drawImage(p.buf, 0, 0, w, h);
    // ось симметрии — как сгиб листа
    g.strokeStyle = 'rgba(212,42,30,.55)'; g.lineWidth = 1; g.setLineDash([4, 5]);
    g.beginPath(); g.moveTo(w / 2, 0); g.lineTo(w / 2, h); g.stroke(); g.setLineDash([]);
  },

  // VI · стоп-кадр с кассеты, переснятый на ксерокс
  vhs(p, g, w, h, t) {
    const o = Math.max(2, p.fs * 0.025) * (1 + Math.sin(t * 0.02) * 0.4);
    g.globalCompositeOperation = 'multiply';
    g.drawImage(p.tints.red, o, 0, w, h);
    g.drawImage(p.tints.cyan, -o, 0, w, h);
    g.globalCompositeOperation = 'source-over';
    g.globalAlpha = 0.8;
    g.drawImage(p.tints.ink, 0, 0, w, h);
    g.globalAlpha = 1;
    const seed = Math.floor(t / 110), d = p.dpr;
    for (let i = 0; i < 4; i++) {
      const y = hash(i, seed) * h, bh = 3 + hash(seed, i) * p.fs * 0.12, sh = (hash(i + 3, seed) - 0.5) * p.fs * 0.35;
      g.drawImage(g.canvas, 0, y * d, w * d, bh * d, sh, y, w, bh);
    }
    g.fillStyle = 'rgba(239,231,214,.45)';
    for (let y = 0; y < h; y += 3) g.fillRect(0, y, w, 1);
  },
};

function drawPlate(p, effect, t, lens) {
  const { ctx: g, w, h } = p;
  g.setTransform(p.dpr, 0, 0, p.dpr, 0, 0);
  g.globalCompositeOperation = 'source-over';
  g.globalAlpha = 1;
  g.clearRect(0, 0, w, h);
  PLATE_FX[effect](p, g, w, h, reduceMotion.matches ? 1200 : t);
  if (lens) {
    // лупа: под ней чистый оттиск чёрной краской
    const r = Math.max(40, Math.min(p.fs * 0.34, p.h * 0.42));
    g.save();
    g.beginPath(); g.arc(lens.x, lens.y, r, 0, Math.PI * 2); g.clip();
    g.fillStyle = INK.paper; g.fillRect(lens.x - r, lens.y - r, r * 2, r * 2);
    g.drawImage(p.tints.ink, 0, 0, w, h);
    g.restore();
    g.strokeStyle = INK.red; g.lineWidth = 2;
    g.beginPath(); g.arc(lens.x, lens.y, r, 0, Math.PI * 2); g.stroke();
    g.lineWidth = 3; g.lineCap = 'round';
    const a = Math.PI / 4;
    g.beginPath(); g.moveTo(lens.x + Math.cos(a) * r, lens.y + Math.sin(a) * r);
    g.lineTo(lens.x + Math.cos(a) * r * 1.6, lens.y + Math.sin(a) * r * 1.6); g.stroke();
  }
}

/* ---------------- Герой ---------------- */

const HERO_ORDER = VOLUMES.map(v => v.effect);
const HERO_SLOT = 2600;

const hero = {
  p: null, mask: null, idx: 0, since: 0, raf: 0, visible: true, pinned: false, lens: null, last: 0,
};

function sizeHero() {
  const stage = $('#heroStage');
  const W = stage.clientWidth;
  if (!W) return;
  hero.p = makePlate($('#heroCanvas'), ['НЕВИДИМОЕ'], W, 0, 0.995);
  hero.mask = hero.p.mask;
  stage.style.height = hero.p.h + 'px';
  drawPlate(hero.p, HERO_ORDER[hero.idx], performance.now(), hero.lens);
}

function heroSetStyle(i, pin = false) {
  hero.idx = (i + HERO_ORDER.length) % HERO_ORDER.length;
  hero.since = performance.now();
  if (pin) hero.pinned = true;
  const v = VOLUMES.find(x => x.effect === HERO_ORDER[hero.idx]);
  $('#heroEra').textContent = `${v.era} · т. ${v.num}`;
  document.querySelectorAll('.era-btn').forEach((b, j) => b.setAttribute('aria-pressed', String(j === hero.idx)));
  if (reduceMotion.matches && hero.p) drawPlate(hero.p, HERO_ORDER[hero.idx], 0, hero.lens);
}

// кадр раз в ~40 мс; пока страница «перекрашена» или открывается книга — пауза
function heroLoop(now) {
  hero.raf = 0;
  if (!hero.visible || !hero.p) return;
  const busy = opening || fx.root.classList.contains('on');
  if (!busy) {
    if (!hero.pinned && now - hero.since > HERO_SLOT) heroSetStyle(hero.idx + 1);
    if (now - hero.last > 40) { hero.last = now; drawPlate(hero.p, HERO_ORDER[hero.idx], now, hero.lens); }
  } else hero.since += 16;
  hero.raf = requestAnimationFrame(heroLoop);
}

function heroStart() {
  if (!hero.p) return;
  if (reduceMotion.matches) { drawPlate(hero.p, HERO_ORDER[hero.idx], 0, hero.lens); return; }
  if (!hero.raf) hero.raf = requestAnimationFrame(heroLoop);
}

function initHero() {
  const stage = $('#heroStage');
  const eras = $('#eras');
  VOLUMES.forEach((v, i) => {
    const b = el('button', { class: 'era-btn', type: 'button', 'aria-pressed': 'false', title: `${v.title}: ${v.era}` }, [
      el('span', { class: 'mono', text: v.num }), el('span', { class: 'era-name hand', text: v.era }),
    ]);
    b.addEventListener('click', () => { heroSetStyle(i, true); heroStart(); });
    eras.append(b);
  });
  document.documentElement.classList.add('has-plates');
  sizeHero();
  heroSetStyle(0);

  stage.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    const r = $('#heroCanvas').getBoundingClientRect();
    hero.lens = { x: e.clientX - r.left, y: e.clientY - r.top };
    if (reduceMotion.matches) drawPlate(hero.p, HERO_ORDER[hero.idx], 0, hero.lens);
  });
  stage.addEventListener('pointerleave', () => { hero.lens = null; if (reduceMotion.matches) drawPlate(hero.p, HERO_ORDER[hero.idx], 0, null); });

  new IntersectionObserver(([e]) => { hero.visible = e.isIntersecting; if (hero.visible) heroStart(); }).observe(stage);
  let rt, lastW = 0;
  new ResizeObserver(() => {
    if (stage.clientWidth === lastW) return;
    lastW = stage.clientWidth;
    clearTimeout(rt); rt = setTimeout(sizeHero, 80);
  }).observe(stage);
  reduceMotion.addEventListener('change', heroStart);
  heroStart();
}

/* ---------------- Образцы печати в каталоге ---------------- */

const plates = new Map();

function sizePlates() {
  for (const v of VOLUMES) {
    const sw = document.querySelector(`.swatch[data-id="${v.id}"]`);
    const canvas = sw.querySelector('.sw-plate');
    const W = canvas.parentElement.clientWidth;
    if (!W) continue;
    const H = W < 320 ? 104 : 124;
    const words = v.title.toUpperCase().split(' ');
    // длинные названия — в две строки, чтобы буквы не стали мелкими
    const lines = words.length > 1 && v.title.length > 10 ? [words[0], words.slice(1).join(' ')] : [v.title.toUpperCase()];
    const p = makePlate(canvas, lines, W, H, 0.98);
    const prev = plates.get(v.id);
    plates.set(v.id, { p, effect: v.effect, raf: 0, hot: prev?.hot || false });
    drawPlate(p, v.effect, 1200, null);
  }
}

function plateHover(id, on) {
  const s = plates.get(id);
  if (!s) return;
  s.hot = on;
  if (!on || reduceMotion.matches) { cancelAnimationFrame(s.raf); s.raf = 0; drawPlate(s.p, s.effect, 1200, null); return; }
  let last = 0;
  const loop = t => {
    if (!s.hot) return;
    if (t - last > 40) { last = t; drawPlate(s.p, s.effect, t, null); }
    s.raf = requestAnimationFrame(loop);
  };
  if (!s.raf) s.raf = requestAnimationFrame(loop);
}

function initPlates() {
  sizePlates();
  let rt;
  new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(sizePlates, 120); }).observe($('#catalog'));
}

/* ---------------- Старт ---------------- */

renderCatalog();
renderHowto();
renderTicker();
addEventListener('resize', () => { if (fx.root.classList.contains('on')) sizeFx(); });

const hint = $('#hint');
if (!matchMedia('(hover: hover)').matches) {
  hint.textContent = 'коснись образца — заглянешь в том';
}

(async () => {
  try { await Promise.all([document.fonts.load(`700 100px Oswald`), document.fonts.load('16px "PT Mono"')]); await document.fonts.ready; } catch {}
  if (!document.createElement('canvas').getContext('2d')) return;
  initHero();
  initPlates();
})();

if (wide.matches) initShelf();
else wide.addEventListener('change', function once() {
  if (wide.matches) { wide.removeEventListener('change', once); initShelf(); }
});
