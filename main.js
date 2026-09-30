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

function el(tag, attrs = {}, children = []) {
  const isSvg = tag === 'svg';
  const n = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', 'svg') : document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'text') n.textContent = v;
    else if (k === 'style') for (const [p, val] of Object.entries(v)) n.style.setProperty(p, val);
    else n.setAttribute(k, v);
  }
  for (const c of [].concat(children)) if (c) n.append(c);
  return n;
}

/* ============================================================
   Картотека: папки с делами. Внутри каждой — лист,
   свёрстанный как титул своего тома.
   ============================================================ */

function field(dt, dd) {
  return el('div', {}, [el('dt', { text: dt }), el('dd', { text: dd })]);
}

// титульные листы томов — в их собственной вёрстке
const SHEETS = {
  haema: () => `
    <p class="s-kicker">tabula I &nbsp;·&nbsp; sanguis</p>
    <pre class="s-ascii" data-text="Кровь"></pre>
    <pre class="s-ascii s-ascii--2" data-text="и вирусы"></pre>
    <p class="s-scrawl">(почти) всё, что нужно знать о ВИЧ</p>
    <p class="s-lead">В одном микролитре твоей крови — несколько сотен CD4&nbsp;T-лимфоцитов. <em>Один из&nbsp;них сейчас станет мишенью.</em></p>`,
  mycelium: () => `
    <div class="s-card">
      <p class="s-kicker">Полевой определитель · Том II · ризографическое издание</p>
      <p class="s-title">MYCELIUM</p>
      <p class="s-latin">atlas fungorum subterraneus</p>
      <p class="s-sub">Подземная сеть: как грибы связывают лес</p>
      <p class="s-marks"><span class="g">надёжно</span><span class="b">обсуждается</span><span class="p">гипотеза</span></p>
      <span class="s-stamp">собрано:<br>30.IX.2026</span>
    </div>`,
  night: () => `
    <div class="s-mast"><span>Научно-популярный атлас</span><span>Выпуск № 1 · ночной</span></div>
    <p class="s-kicker">Сон и мозг: что происходит ночью</p>
    <p class="s-title"><span class="r">Ночная</span><span class="b">смена</span></p>
    <p class="s-third"><b>1/3</b><span>жизни — около трети — человек проводит во&nbsp;сне</span></p>`,
  mind: () => `
    <div class="s-card">
      <p class="s-kicker">Интерактивный атлас · научно-популярный проект</p>
      <p class="s-title">Кабинет восприятия</p>
      <p class="s-sub">Как устроен разум: восприятие, эмоции, ошибки мышления</p>
      <p class="s-note"><i></i>Перед вами комната Эймса. Сдвиньтесь — и&nbsp;иллюзия развалится.</p>
    </div>`,
  cabinet: () => `
    <p class="s-run"><span>← к полке</span><span>Т. V · 159.937</span></p>
    <div class="s-top">
      <div><p class="s-kicker">Том V · психология восприятия</p><p class="s-title">Кабинет восприятия</p></div>
      <canvas class="s-checker" width="120" height="120"></canvas>
    </div>
    <div class="s-form">
      <p><span>Бланк № <b>1076</b></span><span>форма П-4</span></p>
      <p><span>испытуемый</span><span class="dim">можно без имени</span></p>
      <p><span>стимулов</span><span>14 · в 7 главах</span></p>
      <span class="s-stamp">испытуемый</span>
    </div>`,
  blob: () => `
    <p class="s-rec"><i></i>REC ▶ 00:14:32</p>
    <span class="s-tape"></span>
    <p class="s-label">кассета №1 · сторона А</p>
    <p class="s-title" data-chaos="Слизевик"></p>
    <p class="s-sub"><span class="a">разум</span> <span class="b">без</span> <span class="c">мозга</span></p>
    <p class="s-col">Жёлтая плёнка на гнилом бревне умеет находить кратчайший путь в&nbsp;лабиринте. У&nbsp;неё нет ни мозга, ни нейронов — это вообще одна клетка.</p>
    <p class="s-marker">курсор = хлопья овса →</p>`,
};

const TILTS = [-1.2, 0.9, -0.5, 1.3, -0.9, 0.6];
const CHECKOUT = ['03.02', '17.05', '30.09'];

function renderFolders() {
  const list = $('#catalog');
  VOLUMES.forEach((v, i) => {
    const out = Boolean(v.url);
    const sheet = el('a', {
      class: `sheet sheet--${v.id}`, href: v.url || '#', 'data-open': v.id,
      'aria-label': `${v.title}: ${v.subtitle}. Открыть том ${v.num}`,
    });
    sheet.innerHTML = `<div class="s-in">${SHEETS[v.id]()}</div>`;

    const cover = el('div', { class: 'folder-cover', 'aria-hidden': 'true' }, [
      el('div', { class: 'cover-front' }, [
        el('p', { class: 'cf-top mono' }, [el('span', { text: 'Архив невидимого' }), el('span', { text: `дело № ${v.code}` })]),
        el('div', { class: 'cf-label' }, [
          el('span', { class: 'mono', text: `Том ${v.num}` }),
          el('strong', { text: v.title }),
          el('em', { class: 'hand', text: v.subtitle }),
        ]),
        el('p', { class: 'cf-hook', text: v.hook }),
        el('span', { class: 'cf-note hand', text: v.note }),
        el('span', { class: `stamp ${out ? 'stamp--out' : 'stamp--press'}` },
          out ? ['Выдано', el('small', { text: '2026' })] : ['В печати', el('small', { text: 'ждите' })]),
        el('span', { class: 'cf-tie' }),
      ]),
      el('div', { class: 'cover-inside' }, [
        el('p', { class: 'ci-title mono', text: 'Карточка выдачи' }),
        el('div', { class: 'ci-rows' }, CHECKOUT.map((d, k) => el('p', {}, [
          el('span', { class: 'mono', text: `${d}.2026` }),
          el('span', { class: 'hand', text: ['читатель № 7', 'без имени', 'ты'][k] }),
        ]))),
        el('p', { class: 'ci-tech hand', text: v.tech }),
      ]),
    ]);

    const toggle = el('button', { class: 'folder-toggle', type: 'button', 'aria-expanded': 'false', 'aria-label': `Папка «${v.title}» — заглянуть внутрь` });

    const folder = el('li', {
      class: 'folder', 'data-id': v.id,
      style: { '--tilt': `${TILTS[i % TILTS.length]}deg`, '--spine': v.spine, '--spine-ink': v.spineInk, '--tab': `${8 + (i % 3) * 28}%` },
    }, [
      el('div', { class: 'folder-body' }, [
        el('div', { class: 'folder-back' }, [el('span', { class: 'folder-tab mono', text: `Т. ${v.num}` })]),
        sheet,
        cover,
        toggle,
      ]),
      el('div', { class: 'folder-meta' }, [
        el('dl', { class: 'fm-meta mono' }, [field('тема', v.topic), field('печать', v.style)]),
        el('button', { class: 'btn', type: 'button', 'data-open': v.id, ...(out ? {} : { disabled: '' }) }, [
          el('span', { text: out ? 'Открыть том' : 'В печати' }),
        ]),
      ]),
    ]);
    const ring = el('svg', { class: 'btn-ring', viewBox: '0 0 240 76', preserveAspectRatio: 'none', 'aria-hidden': 'true' });
    ring.innerHTML = '<use href="#h-circle"/>';
    folder.querySelector('.btn').append(ring);
    list.append(folder);
  });

  buildSheetArt();

  const setOpen = (f, on) => {
    f.classList.toggle('is-open', on);
    f.querySelector('.folder-toggle').setAttribute('aria-expanded', String(on));
  };
  const closeOthers = f => document.querySelectorAll('.folder.is-open').forEach(o => { if (o !== f) setOpen(o, false); });

  list.addEventListener('pointerover', e => {
    if (e.pointerType !== 'mouse') return;
    const f = e.target.closest('.folder');
    if (!f || f.contains(e.relatedTarget)) return;
    closeOthers(f); setOpen(f, true);
    peek(byId(f.dataset.id));
  });
  list.addEventListener('pointerout', e => {
    if (e.pointerType !== 'mouse') return;
    const f = e.target.closest('.folder');
    if (!f || f.contains(e.relatedTarget)) return;
    setOpen(f, false);
  });
  list.addEventListener('click', e => {
    const f = e.target.closest('.folder');
    if (!f) return;
    const open = e.target.closest('[data-open]');
    if (open && !open.disabled && (open.classList.contains('btn') || f.classList.contains('is-open'))) {
      e.preventDefault();
      return openVolume(byId(open.dataset.open), f);
    }
    // тап по закрытой папке — открыть и заглянуть
    e.preventDefault();
    const on = !f.classList.contains('is-open');
    closeOthers(f); setOpen(f, on);
    if (on) peek(byId(f.dataset.id), true);
  });
  list.addEventListener('focusin', e => {
    const f = e.target.closest('.folder');
    // только клавиатура: при тапе фокус приходит раньше клика и открыл бы папку дважды
    if (f && !f.contains(e.relatedTarget) && e.target.matches(':focus-visible')) { closeOthers(f); setOpen(f, true); }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeOthers(null); });
}

/* ---------- «печать» листов: ASCII, вырезки, шахматка ---------- */

const GENOME = 'ACGU';

// заголовок HAEMA: буквы Playfair, набранные буквами генома
function asciiTitle(pre, text, cols) {
  const c = document.createElement('canvas');
  const x = c.getContext('2d', { willReadFrequently: true });
  const font = s => `900 ${s}px "Playfair Display", "Times New Roman", serif`;
  x.font = font(100);
  const w100 = x.measureText(text).width;
  const ADV = 0.6, ASPECT = 1 / ADV, SS = 5;
  const F = 100 * cols / w100;
  const rows = Math.ceil(F * 1.02 / ASPECT);
  c.width = cols * SS; c.height = rows * SS;
  x.save(); x.scale(SS, SS / ASPECT);
  x.fillStyle = '#fff'; x.font = font(F); x.textBaseline = 'alphabetic';
  x.fillText(text, 0, F * 0.8);
  x.restore();
  const d = x.getImageData(0, 0, c.width, c.height).data;
  let out = '';
  for (let r = 0; r < rows; r++) {
    let line = '';
    for (let col = 0; col < cols; col++) {
      let sum = 0;
      for (let yy = 0; yy < SS; yy++) for (let xx = 0; xx < SS; xx++) sum += d[((r * SS + yy) * c.width + col * SS + xx) * 4 + 3];
      const a = sum / (SS * SS * 255);
      line += a > 0.55 ? GENOME[(Math.random() * 4) | 0] : a > 0.3 ? (Math.random() < 0.5 ? '+' : '*') : a > 0.1 ? (Math.random() < 0.5 ? '.' : ':') : ' ';
    }
    const dx = ((Math.random() - 0.5) * 5).toFixed(1), op = (0.62 + Math.random() * 0.38).toFixed(2);
    out += `<span style="transform:translateX(${dx}px);opacity:${op}">${line.replace(/\s+$/, '') || ' '}</span>`;
  }
  pre.innerHTML = out;
}

// заголовок BLOB: буквы, вырезанные из разных журналов
const CHAOS_FONTS = ['"Dela Gothic One"', '"Sofia Sans Extra Condensed"', '"Rubik Glitch"', '"PT Mono"', '"Dela Gothic One"', '"Sofia Sans Extra Condensed"'];
function chaosTitle(node) {
  const text = node.dataset.chaos;
  let seed = 7;
  const R = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  let i = 0, html = '';
  while (i < text.length) {
    const len = Math.min(text.length - i, 1 + Math.floor(R() * 3));
    const f = CHAOS_FONTS[Math.floor(R() * CHAOS_FONTS.length)];
    const size = (f.includes('Mono') ? 0.6 + R() * 0.3 : 0.7 + R() * 0.55).toFixed(2);
    const rot = ((R() - 0.5) * 14).toFixed(1);
    const inv = R() < 0.25 ? ' inv' : '';
    html += `<span class="cp${inv}" style="font-family:${f.replace(/"/g, "'")};font-size:${size}em;transform:rotate(${rot}deg)${f.includes('Sofia') ? ';font-weight:900' : ''}">${text.slice(i, i + len)}</span>`;
    i += len;
  }
  node.innerHTML = html;
}

// выпуклая шахматка «Кабинета»: клетки, натянутые на шар
function bulgeChecker(canvas) {
  const g = canvas.getContext('2d');
  const n = canvas.width, img = g.createImageData(n, n), cells = 10;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      let u = (x / n) * 2 - 1, v = (y / n) * 2 - 1;
      const r = Math.hypot(u, v);
      if (r < 0.92) { const k = Math.sin(r / 0.92 * Math.PI / 2) * 0.92 / (r || 1); u *= k; v *= k; }
      const cx = Math.floor((u + 1) / 2 * cells), cy = Math.floor((v + 1) / 2 * cells);
      const dark = (cx + cy) % 2 === 0;
      const i = (y * n + x) * 4;
      img.data[i] = dark ? 18 : 226; img.data[i + 1] = dark ? 18 : 217; img.data[i + 2] = dark ? 18 : 195; img.data[i + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
}

function buildSheetArt() {
  const cols = 54;
  document.querySelectorAll('.s-ascii').forEach(pre => asciiTitle(pre, pre.dataset.text, pre.classList.contains('s-ascii--2') ? Math.round(cols * 1.25) : cols));
  document.querySelectorAll('[data-chaos]').forEach(chaosTitle);
  document.querySelectorAll('.s-checker').forEach(bulgeChecker);
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
  fx.clear = setTimeout(() => {
    delete document.body.dataset.fx;
    cancelAnimationFrame(fx.raf);
    fx.ctx.clearRect(0, 0, fx.w, fx.h);
  }, 320);
}

/* ============================================================
   Открытие тома: лист выезжает из папки и разворачивается
   на весь экран, как будто достаёшь дело из архива.
   ============================================================ */

let opening = false;
function openVolume(vol, folder) {
  if (!vol) return;
  if (!vol.url) { peek(vol, true); return; }
  if (opening) return;
  if (reduceMotion.matches) { location.href = vol.url; return; }
  opening = true;
  clearTimeout(fx.hold); endPeek();
  folder = folder || document.querySelector(`.folder[data-id="${vol.id}"]`);
  const go = () => {
    const sheet = folder.querySelector('.sheet');
    const r = sheet.getBoundingClientRect();
    const clone = sheet.cloneNode(true);
    clone.classList.add('sheet--launch');
    Object.assign(clone.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px' });
    document.body.append(clone);
    clone.getBoundingClientRect();
    // равномерный зум к центру экрана: лист «подносят к глазам»
    const k = Math.max(innerWidth / r.width, innerHeight / r.height) * 1.02;
    const dx = innerWidth / 2 - (r.left + r.width / 2), dy = innerHeight / 2 - (r.top + r.height / 2);
    clone.style.transform = `translate(${dx}px, ${dy}px) scale(${k})`;
    setTimeout(() => { location.href = vol.url; }, 720);
  };
  if (!folder.classList.contains('is-open')) {
    folder.classList.add('is-open');
    setTimeout(go, 420);
  } else go();
}

// при возврате кнопкой «назад» страница может прийти из bfcache
addEventListener('pageshow', () => {
  opening = false;
  document.querySelectorAll('.sheet--launch').forEach(n => n.remove());
});

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

/* ---------------- Старт ---------------- */

renderFolders();
renderHowto();
renderTicker();
addEventListener('resize', () => { if (fx.root.classList.contains('on')) sizeFx(); });

const hint = $('#hint');
if (!matchMedia('(hover: hover)').matches) {
  hint.textContent = 'коснись папки — она откроется; коснись листа — войдёшь в том';
}

(async () => {
  try {
    await Promise.all([
      document.fonts.load('700 100px Oswald'), document.fonts.load('16px "PT Mono"'),
      document.fonts.load('900 100px "Playfair Display"', 'Кровь и вирусы'),
    ]);
    await document.fonts.ready;
  } catch {}
  buildSheetArt();
  if (!document.createElement('canvas').getContext('2d')) return;
  initHero();
})();
