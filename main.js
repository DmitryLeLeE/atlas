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
    topic: 'ВИЧ, иммунитет, эпидемия',
    style: 'самиздат, ASCII, рваные ксерокопии',
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
    topic: 'грибница, микориза, обмен веществами',
    style: 'ризограф, полевой определитель',
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
    topic: 'фазы сна, память, циркадные ритмы',
    style: 'советский научпоп 1960-х',
    kind: 'симуляция',
    tech: 'Живая гипнограмма: модель циклов сна за ночь, свёрстанная растром и красным кирпичом.',
    effect: 'raster',
    spine: '#1f2b47', spineInk: '#e9c7a0',
    url: 'https://dmitrylelee.github.io/night_dev/',
  },
  {
    id: 'cabinet',
    num: 'IV',
    code: '159.937',
    title: 'Кабинет восприятия',
    subtitle: 'Психология',
    topic: 'восприятие, иллюзии, проекция',
    style: 'оп-арт, кляксы Роршаха',
    kind: 'иллюзия',
    tech: 'Интерактивные иллюзии и генератор симметричных клякс: мозг проверяет сам себя.',
    effect: 'moire',
    spine: '#e2d9c3', spineInk: '#121212',
    url: null,
  },
  {
    id: 'blob',
    num: 'V',
    code: '582.24',
    title: 'BLOB',
    subtitle: 'Слизевик',
    topic: 'физарум, поиск пути, интеллект без мозга',
    style: 'гранж 90-х, VHS',
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

/* ---------------- Каталог ---------------- */

function el(tag, attrs = {}, children = []) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'text') n.textContent = v;
    else if (k === 'style') Object.assign(n.style, v);
    else n.setAttribute(k, v);
  }
  for (const c of [].concat(children)) if (c) n.append(c);
  return n;
}

function field(dt, dd) {
  return el('div', {}, [el('dt', { text: dt }), el('dd', { text: dd })]);
}

function renderCatalog() {
  const list = $('#catalog');
  const frag = document.createDocumentFragment();
  for (const v of VOLUMES) {
    const out = Boolean(v.url);
    const openBtn = el('button', {
      class: 'btn', type: 'button', 'data-open': v.id,
      'aria-label': out ? `Открыть том ${v.num}: ${v.title}` : `Том ${v.num}: ${v.title} — в печати`,
      text: out ? 'Открыть том →' : 'В печати',
    });
    if (!out) openBtn.disabled = true;

    const card = el('li', { class: 'card', 'data-id': v.id, style: { '--spine': v.spine, '--spine-ink': v.spineInk } }, [
      el('div', { class: 'card-spine', 'aria-hidden': 'true' }, [
        el('span', { class: 'cs-num', text: v.num }),
        el('span', { class: 'cs-band' }),
        el('span', { class: 'cs-title', text: v.title }),
        el('span', { class: 'cs-band' }),
      ]),
      el('div', { class: 'card-body' }, [
        el('p', { class: 'card-code mono' }, [
          el('span', { text: `Т. ${v.num} · ${v.code}` }),
        ]),
        el('h3', { class: 'card-title', text: v.title }),
        el('p', { class: 'card-sub', text: v.subtitle }),
        el('dl', { class: 'card-fields' }, [
          field('Тема', v.topic),
          field('Стиль', v.style),
          field('Статус', out ? 'выдано, доступен' : 'в печати'),
        ]),
        el('div', { class: 'card-actions' }, [
          openBtn,
          el('button', { class: 'peek', type: 'button', 'data-peek': v.id, text: 'заглянуть' }),
        ]),
        el('span', { class: `stamp ${out ? 'stamp--out' : 'stamp--press'}`, 'aria-hidden': 'true' },
          out ? ['Выдано', el('small', { text: '2026' })] : ['В печати', el('small', { text: 'ждите' })]),
      ]),
    ]);
    frag.append(card);
  }
  list.append(frag);

  const byId = id => VOLUMES.find(v => v.id === id);

  list.addEventListener('pointerover', e => {
    if (e.pointerType !== 'mouse') return;
    const card = e.target.closest('.card');
    if (!card || card.contains(e.relatedTarget)) return;
    peek(byId(card.dataset.id));
  });
  list.addEventListener('focusin', e => {
    const card = e.target.closest('.card');
    if (card && !card.contains(e.relatedTarget)) peek(byId(card.dataset.id));
  });
  list.addEventListener('click', e => {
    const open = e.target.closest('[data-open]');
    if (open && !open.disabled) return openVolume(byId(open.dataset.open));
    const card = e.target.closest('.card');
    if (card) peek(byId(card.dataset.id), true); // тап на телефоне — заглянуть
  });
}

function renderHowto() {
  const list = $('#howto');
  for (const v of VOLUMES) {
    list.append(el('li', {}, [
      el('span', { class: 'h-code', text: `Т. ${v.num} · ${v.code}` }),
      el('span', { class: 'h-name', text: v.title }),
      el('span', { class: 'h-tech' }, [el('span', { class: 'h-kind', text: v.kind }), v.tech]),
    ]));
  }
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

  // V · VHS: развёртка, полоса трекинга, экранное меню
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
  document.querySelectorAll('.card.is-active').forEach(c => c.classList.remove('is-active'));
  document.querySelector(`.card[data-id="${vol.id}"]`)?.classList.add('is-active');

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
  document.querySelectorAll('.card.is-active').forEach(c => c.classList.remove('is-active'));
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
  const SHELF_W = 8.6;
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
    { w: 1.2, h: 3.35 }, { w: 1.02, h: 3.0 }, { w: 1.12, h: 3.45 }, { w: 1.12, h: 3.3 }, { w: 0.98, h: 2.85 },
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

/* ---------------- Старт ---------------- */

renderCatalog();
renderHowto();
addEventListener('resize', () => { if (fx.root.classList.contains('on')) sizeFx(); });

const hint = $('#hint');
if (!matchMedia('(hover: hover)').matches) {
  hint.textContent = 'Коснитесь карточки, чтобы заглянуть в том. Кнопка — открыть.';
}

if (wide.matches) initShelf();
else wide.addEventListener('change', function once() {
  if (wide.matches) { wide.removeEventListener('change', once); initShelf(); }
});
