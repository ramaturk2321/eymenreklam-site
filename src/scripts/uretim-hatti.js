/*
 * Eymen Reklam · Temsili atölye sahnesi (ana sayfa hero'su)
 * src/components/UretimHatti.astro içindeki SVG'yi çizer ve oynatır; Astro paketine girer (küçültülür, dosya adı sürümlü).
 * - 17 istasyon sonsuz bir hat gibi akar; her döngüde iş (harf, baskı, tabela) rastgele seçilir.
 * - Ekran dışındayken ya da "Durdur" ile hem JS döngüsü hem CSS animasyonları durur; "hareketi azalt" tercihinde sabit kare.
 * - Konsoldaki makine değerleri temsilidir; sahte canlı sayaç/istatistik gösterilmez. Mesai bilgisi site-data'dan (data-* ile) gelir.
 */
(() => {
  const NS = "http://www.w3.org/2000/svg";
  const $ = (id) => document.getElementById(id);
  const svg = $("uh-scene"), view = $("uh-view"), root = $("uretim-hatti");
  if (!svg || !view || !root) return;
  // Dil paketi (en/ar): UretimHatti.astro #uh-dil içine {t: sözlük, l: bağlantı haritası} yazar; tr'de boş kalır, metinler aynen çıkar.
  const DIL = root.dataset.dil || "tr";
  let PAKET = {}; if (DIL !== "tr") { try { PAKET = JSON.parse(($("uh-dil") || {}).textContent || "{}"); } catch (_) {} }
  const SOZ = PAKET.t || {}, LINKS = PAKET.l || {};
  const T = (s, ...a) => (SOZ[s] ?? s).replace(/\{(\d+)\}/g, (_, i) => a[+i]);
  const L = (p) => LINKS[p] ?? p;
  const LOC = { tr: "tr-TR", en: "en-GB", ar: "ar-u-nu-latn" }[DIL] || "tr-TR";
  // Aynı Türkçe metnin başka anlamı için bağlamlı anahtar (ör. fırın = oven / bakery)
  const TK = (k, s) => SOZ[k] ?? T(s);
  // RTL sayfada SVG metinleri "start" çapasını sağa almasın; sahne geometrisi LTR çizildi.
  if (DIL === "ar") svg.style.direction = "ltr";
  const reduceMq = matchMedia("(prefers-reduced-motion: reduce)");
  let reduce = reduceMq.matches;
  const YIL = new Date().getFullYear();
  const DENEYIM = root.dataset.deneyim || "25";
  const K = 0.35, S = 0.45, SW = 400;
  const P = (b, u, w) => ({ x: b.e + u - K * w, y: b.f + S * w });
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  const mod = (a, n) => ((a % n) + n) % n;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = (arr, not) => { let v, n = 0; do { v = arr[Math.floor(Math.random() * arr.length)]; } while (arr.length > 1 && v === not && ++n < 20); return v; };
  const seg = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
  const fmt = (n, d = 1) => n.toLocaleString(LOC, { minimumFractionDigits: d, maximumFractionDigits: d });
  const el = (tag, attrs, parent) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; };
  const set = (n, k, v) => { if (n._c === undefined) n._c = {}; if (n._c[k] !== v) { n._c[k] = v; n.setAttribute(k, v); } };
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const mix = (a, b, t) => { const A = hex(a), B = hex(b); return "#" + A.map((v, i) => Math.round(lerp(v, B[i], t)).toString(16).padStart(2, "0")).join(""); };
  const signSvg = (no, label, noWires) => `<g class="sign">${noWires ? "" : '<path d="M120 30V228M280 30V228" stroke="#243047" stroke-width="1.5"/>'}<rect class="sign-plate" x="70" y="228" width="260" height="38" rx="4" fill="#0b1220" stroke="#243047" stroke-width="2"/><text x="86" y="253" font-family="ui-monospace, monospace" font-weight="700" font-size="15" fill="#f97316">${no}</text><text x="114" y="253" font-family="Poppins, sans-serif" font-weight="600" font-size="13" fill="#e2e8f0" letter-spacing="1">${label}</text></g>`;
  const q = (g, sel) => g.querySelector(sel);

  const PF = 'font-family="Poppins, sans-serif"';
  const starPts = (cx, cy, R, r) => { let s = ""; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r : R; s += `${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)} `; } return s; };
  const lookOf = (i) => ({
    shirt: ["#1e3a8a", "#334155", "#7c2d12", "#0f766e", "#475569", "#1d4ed8", "#be123c", "#4d7c0f"][i % 8],
    vest: i % 3 === 0 ? "#f97316" : i % 5 === 1 ? "#facc15" : undefined,
    helmet: i % 4 === 1 ? "#f8fafc" : i % 4 === 3 ? "#f97316" : undefined,
    hair: ["#1f130c", "#3b2314", "#6b4423", "#111827"][i % 4],
    skin: ["#f1c9a5", "#e0ac85", "#c68863", "#8d5a3b"][(i * 3) % 4],
    pants: i % 2 ? "#1e293b" : "#334155",
  });
  function yardSvg(moon) {
    let st = "";
    for (let i = 0; i < 28; i++) { const x = (i * 97.3 + (moon ? 40 : 0)) % 400, y = 16 + ((i * 53.7) % 300); st += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.6 + (i % 3) * 0.35).toFixed(2)}" fill="#e2e8f0" opacity="${(0.35 + (i % 4) * 0.15).toFixed(2)}"/>`; }
    let d = "M-2 560", x = -2, i = moon ? 3 : 0, win = "";
    while (x < 402) {
      const w = 16 + ((i * 37) % 30), h = 400 + ((i * 71) % 110);
      d += ` V${h} H${Math.min(402, x + w)}`;
      for (let k = 0; k < 3; k++) if ((i + k) % 3 === 0 && x + 6 + k * 5 < x + w) win += `<rect x="${(x + 4 + k * 5).toFixed(0)}" y="${h + 10 + k * 14}" width="2.5" height="3" fill="#fde68a" opacity=".45"/>`;
      x += w; i++;
    }
    d += " V560 Z";
    const moonSvg = moon ? '<circle cx="330" cy="90" r="16" fill="#f8fafc" opacity=".9"/><circle cx="324" cy="86" r="3" fill="#cbd5e1"/><circle cx="334" cy="96" r="2" fill="#cbd5e1"/>' : "";
    const lamp = moon ? "" : '<polygon points="344,318 300,560 392,560" fill="#fef3c7" opacity=".05"/><path d="M360 560 V300 H340" stroke="#475569" stroke-width="4" fill="none"/><rect x="334" y="298" width="14" height="6" rx="2" fill="#fef3c7"/>';
    return `<rect x="-2" y="0" width="404" height="560" fill="url(#gSky)"/>${st}${moonSvg}<path d="${d}" fill="#0f1a2e"/>${win}<rect x="-2" y="560" width="404" height="160" fill="#141a26"/><path d="M-2 562 H402" stroke="#334155" stroke-width="3"/><path d="M0 668 H400" stroke="#e2e8f0" stroke-width="3" stroke-dasharray="26 22" opacity=".22"/>${lamp}`;
  }
  /* ---------- Yardımcılar: parçacık, iş motoru, insan ---------- */
  function particles(parent, n, o) {
    const list = [];
    for (let i = 0; i < n; i++) list.push({ c: el("circle", { r: o.r, cx: -99, cy: -99, fill: o.color[i % o.color.length], opacity: 0 }, parent), life: 0 });
    let next = 0;
    return {
      spawn(x, y) {
        const p = list[(next = (next + 1) % n)];
        const a = -Math.PI / 2 + (Math.random() - 0.5) * o.spread, v = o.speed * (0.5 + Math.random() * 0.7);
        Object.assign(p, { x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: o.life, max: o.life });
      },
      step(dt) {
        for (const p of list) {
          if (p.life <= 0) { if (p.shown) { p.c.setAttribute("opacity", 0); p.shown = false; } continue; }
          p.life -= dt; p.vy += o.g * dt; p.x += p.vx * dt; p.y += p.vy * dt;
          p.c.setAttribute("cx", p.x.toFixed(1)); p.c.setAttribute("cy", p.y.toFixed(1));
          p.c.setAttribute("opacity", Math.max(0, p.life / p.max).toFixed(2)); p.shown = true;
        }
      },
    };
  }
  function makeJob(home, segs) {
    let t = 0, pos = { ...home }, z = 1;
    for (const s of segs) {
      s.t0 = t; t += s.dur; s.t1 = t; s.p0 = { ...pos }; s.z0 = z;
      if (s.k === "move") pos = { ...s.to };
      if (s.k === "cut") { s.L = s.path.getTotalLength(); const e = s.path.getPointAtLength(s.L); pos = { u: e.x, w: e.y }; }
      if (s.k === "z") z = s.to;
      s.p1 = { ...pos }; s.z1 = z;
    }
    return { segs, total: t, home };
  }
  function evalJob(j, tc) {
    const o = { u: j.home.u, w: j.home.w, z: 1, cutting: false, prog: [], k: "hold", f: 0, fade: 1 };
    for (const s of j.segs) {
      if (s.k === "cut") o.prog.push(clamp((tc - s.t0) / s.dur, 0, 1));
      if (tc >= s.t0 && tc < s.t1) {
        const f = (tc - s.t0) / s.dur;
        o.k = s.k; o.f = f; o.u = s.p0.u; o.w = s.p0.w; o.z = s.z0;
        if (s.k === "move") { const e = ease(f); o.u = lerp(s.p0.u, s.p1.u, e); o.w = lerp(s.p0.w, s.p1.w, e); }
        else if (s.k === "z") o.z = lerp(s.z0, s.z1, ease(f));
        else if (s.k === "cut") { const pt = s.path.getPointAtLength(f * s.L); o.u = pt.x; o.w = pt.y; o.cutting = true; }
        else if (s.k === "fade") o.fade = 1 - f;
      }
    }
    return o;
  }
  const jobProgress = (j, o) => { let d = 0, a = 0, i = 0; for (const s of j.segs) if (s.k === "cut") { a += s.L; d += s.L * o.prog[i++]; } return a ? d / a : 0; };

  const SKIN = ["#f1c9a5", "#e0ac85", "#c68863", "#8d5a3b"];
  function person(parent, o = {}) {
    const g = el("g", {}, parent), inner = el("g", {}, g);
    const shirt = o.shirt || "#334155", pants = o.pants || "#1e293b", skin = o.skin || SKIN[1];
    const arm = (p) => { el("path", { d: "M0 -80 L0 -53", stroke: shirt, "stroke-width": 6.5, "stroke-linecap": "round" }, p); el("circle", { cx: 0, cy: -50, r: 3.4, fill: skin }, p); };
    const leg = (p) => { el("path", { d: "M0 -46 L0 -5", stroke: pants, "stroke-width": 8, "stroke-linecap": "round" }, p); el("ellipse", { cx: 3, cy: -2.5, rx: 6.2, ry: 3.2, fill: "#0b1220" }, p); };
    const armB = el("g", {}, inner); if (!o.noArms) arm(armB);
    const legB = el("g", {}, inner); leg(legB);
    const legF = el("g", {}, inner); leg(legF);
    el("rect", { x: -10, y: -88, width: 20, height: 46, rx: 8, fill: shirt }, inner);
    if (o.vest) {
      el("rect", { x: -10, y: -86, width: 20, height: 34, rx: 6, fill: o.vest }, inner);
      el("rect", { x: -10, y: -71, width: 20, height: 2.6, fill: "#fef3c7", opacity: 0.9 }, inner);
      el("rect", { x: -10, y: -62, width: 20, height: 2.6, fill: "#fef3c7", opacity: 0.9 }, inner);
    }
    el("rect", { x: -3, y: -94, width: 6, height: 7, fill: skin }, inner);
    el("circle", { cx: 1, cy: -99, r: 9.5, fill: skin }, inner);
    if (o.mask) {
      el("path", { d: "M-10 -110 H9 Q14 -110 14 -104 V-90 Q14 -86 9 -86 H-10 Z", fill: "#1f2937" }, inner);
      g.visor = el("rect", { x: 6, y: -103, width: 8, height: 6, rx: 1, fill: "#065f46" }, inner);
    } else if (o.helmet) {
      el("path", { d: "M-9.5 -100 A10.2 10.2 0 0 1 11 -100 Z", fill: o.helmet }, inner);
      el("rect", { x: -11, y: -101.5, width: 26, height: 3, rx: 1.5, fill: o.helmet }, inner);
      el("circle", { cx: 6.5, cy: -97, r: 1.2, fill: "#0b1220" }, inner);
    } else {
      el("path", { d: "M-9.4 -99 A9.6 9.6 0 0 1 10.4 -102 Q3 -106 -2 -103 Q-6 -101 -9.4 -94 Z", fill: o.hair || "#1f130c" }, inner);
      el("circle", { cx: 6.5, cy: -98, r: 1.2, fill: "#0b1220" }, inner);
    }
    const carry = el("g", {}, inner);
    const armF = el("g", {}, inner); if (!o.noArms) arm(armF);
    const P_ = { g, inner, armB, armF, legB, legF, carry };
    P_.pose = (ph, amp, opt = {}) => {
      const s = Math.sin(ph);
      set(legF, "transform", `rotate(${(s * amp).toFixed(1)} 0 -46)`);
      set(legB, "transform", `rotate(${(-s * amp).toFixed(1)} 0 -46)`);
      const aF = opt.arms !== undefined ? opt.arms : -s * amp * 0.9;
      const aB = opt.armsB !== undefined ? opt.armsB : opt.arms !== undefined ? opt.arms : s * amp * 0.9;
      set(armF, "transform", `rotate(${aF.toFixed(1)} 0 -80)`);
      set(armB, "transform", `rotate(${aB.toFixed(1)} 0 -80)`);
      const bob = amp > 0 ? -Math.abs(Math.cos(ph)) * (amp > 30 ? 3 : 1.6) : 0;
      set(inner, "transform", `translate(0 ${bob.toFixed(1)}) rotate(${(opt.lean || 0).toFixed(1)} 0 0)`);
    };
    P_.pose(0, 0);
    return P_;
  }
  const ITEMS = {
    box: (g) => { el("rect", { x: 12, y: -84, width: 28, height: 22, rx: 1, fill: "#b7791f" }, g); el("rect", { x: 24, y: -84, width: 4, height: 22, fill: "#d69e2e" }, g); },
    roll: (g, c) => { el("rect", { x: -18, y: -80, width: 66, height: 10, rx: 5, fill: "#e2e8f0" }, g); el("rect", { x: -6, y: -80, width: 40, height: 10, fill: c || "#f97316", opacity: 0.85 }, g); },
    panel: (g, c) => { el("rect", { x: 10, y: -96, width: 44, height: 32, rx: 2, fill: c || "#1d4ed8" }, g); el("text", { x: 32, y: -74, "text-anchor": "middle", "font-size": 13, "font-weight": 800, "font-family": "Poppins, sans-serif", fill: "#fff" }, g).textContent = pick(["A", "E", "K", "M", "%"]); },
    letter: (g) => { el("path", { d: "M14 -96 H38 V-90 H22 V-84 H34 V-78 H22 V-72 H38 V-66 H14 Z", fill: "#f97316" }, g); },
    tools: (g) => { el("rect", { x: 12, y: -60, width: 26, height: 15, rx: 2, fill: "#dc2626" }, g); el("path", { d: "M18 -60 V-65 H32 V-60", stroke: "#111827", "stroke-width": 2, fill: "none" }, g); },
    pallet: (g) => {
      el("path", { d: "M6 -58 L20 -8", stroke: "#111827", "stroke-width": 3 }, g);
      el("rect", { x: 18, y: -10, width: 68, height: 5, fill: "#f59e0b" }, g);
      el("circle", { cx: 24, cy: -2, r: 3, fill: "#111827" }, g); el("circle", { cx: 80, cy: -2, r: 3, fill: "#111827" }, g);
      el("rect", { x: 22, y: -18, width: 60, height: 8, fill: "#92400e" }, g);
      el("rect", { x: 24, y: -44, width: 27, height: 26, fill: "#b7791f" }, g); el("rect", { x: 53, y: -40, width: 27, height: 22, fill: "#a16207" }, g); el("rect", { x: 30, y: -62, width: 30, height: 18, fill: "#ca8a04" }, g);
    },
  };

  /* ---------- İstasyonlar ---------- */
  const TR = T; // "const T = this.t" kullanan update() gövdeleri için takma ad
  const LETTERS = {
    E: "M70 25 H190 V55 H105 V85 H170 V115 H105 V145 H190 V175 H70 Z",
    L: "M80 25 H115 V145 H190 V175 H80 Z",
    T: "M60 25 H200 V58 H148 V175 H112 V58 H60 Z",
    H: "M65 25 H100 V85 H160 V25 H195 V175 H160 V115 H100 V175 H65 Z",
    K: "M70 25 H105 V85 L160 25 H200 L135 97 L200 175 H158 L105 112 V175 H70 Z",
    M: "M55 175 V25 H90 L130 90 L170 25 H205 V175 H172 V78 L130 140 L88 78 V175 Z",
    N: "M65 175 V25 H100 L162 120 V25 H195 V175 H162 L100 80 V175 Z",
    Y: "M60 25 H100 L130 80 L160 25 H200 L148 110 V175 H112 V110 Z",
    A: "M60 175 L112 25 H148 L200 175 H165 L153 138 H107 L95 175 Z M118 108 H142 L130 68 Z",
  };
  const LKEYS = Object.keys(LETTERS);
  const stations = [];
  const def = (o) => { stations.push(Object.assign({ t: 0, total: 10, prog: 0 }, o)); };

  /* 01 · TASARIM OFİSİ */
  def({
    name: T("Tasarım Ofisi"), short: T("Tasarım"), link: L("/hizmetlerimiz/grafik-tasarim/"), linkText: T("Grafik tasarım →"),
    desc: T("Her iş burada başlar: ölçü alınır, tabela çizilir, onaylanan dosya üretime gönderilir. Tasarımcımız şu an yeni bir tabela hazırlıyor."),
    total: 10, stillT: 8.2,
    build(g) {
      g.innerHTML = signSvg(this.no, T("TASARIM OFİSİ")) + `
        <rect x="24" y="294" width="352" height="266" fill="#0e192b"/>
        <rect x="44" y="318" width="100" height="64" rx="3" fill="#e5e9ef"/>
        <path d="M54 332h58M54 344h74M54 356h46M54 368h64" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
        <path d="M118 352l5 5 9-11" stroke="#f97316" stroke-width="3" fill="none" stroke-linecap="round"/>
        <g class="clock"><circle cx="186" cy="338" r="17" fill="#f8fafc" stroke="#334155" stroke-width="3"/><g class="ticks"></g>
          <path class="hh" d="M186 338 V328" stroke="#0f172a" stroke-width="2.6" stroke-linecap="round"/><path class="mh" d="M186 338 V324" stroke="#0f172a" stroke-width="1.8" stroke-linecap="round"/><path class="sh" d="M186 340 V323" stroke="#f97316" stroke-width="1"/></g>
        <rect x="226" y="326" width="128" height="5" fill="#334155"/>
        <rect x="232" y="302" width="9" height="24" fill="#f97316"/><rect x="243" y="304" width="9" height="22" fill="#38bdf8"/><rect x="254" y="300" width="9" height="26" fill="#a3e635"/><rect x="265" y="305" width="9" height="21" fill="#f8fafc"/><rect x="298" y="310" width="34" height="16" fill="#64748b"/>
        <rect x="40" y="520" width="26" height="36" rx="2" fill="#9a3412"/>
        <ellipse cx="46" cy="506" rx="7" ry="16" fill="#15803d" transform="rotate(-18 46 506)"/><ellipse cx="60" cy="504" rx="7" ry="17" fill="#22c55e" transform="rotate(20 60 504)"/><ellipse cx="53" cy="498" rx="6" ry="18" fill="#16a34a"/>
        <rect x="92" y="428" width="11" height="62" rx="5" fill="#111827"/>
        <rect x="92" y="486" width="58" height="9" rx="4" fill="#111827"/>
        <path d="M120 495 V540 M100 552 L120 540 L140 552" stroke="#111827" stroke-width="5" fill="none" stroke-linecap="round"/>
        <rect x="140" y="470" width="222" height="9" rx="2" fill="#8b5a2b"/>
        <rect x="150" y="479" width="8" height="81" fill="#3f2a17"/><rect x="300" y="479" width="54" height="78" fill="#243047"/><rect x="306" y="492" width="42" height="3" fill="#475569"/><rect x="306" y="522" width="42" height="3" fill="#475569"/>
        <path d="M114 484 H162" stroke="#1e293b" stroke-width="13" stroke-linecap="round"/>
        <path d="M162 486 V546" stroke="#1e293b" stroke-width="11" stroke-linecap="round"/>
        <ellipse cx="169" cy="549" rx="9" ry="4" fill="#0b1220"/>
        <rect x="104" y="430" width="24" height="56" rx="10" fill="#64748b"/>
        <g class="dhead"><circle cx="117" cy="414" r="12" fill="#1f130c"/><circle cx="121" cy="417" r="10.5" fill="#e0ac85"/><path d="M107 414 A13 13 0 0 1 133 408" stroke="#f97316" stroke-width="3" fill="none"/><rect x="104" y="410" width="6" height="11" rx="2" fill="#f97316"/><circle cx="127" cy="415" r="1.2" fill="#0b1220"/></g>
        <path d="M118 440 L138 464" stroke="#64748b" stroke-width="8" stroke-linecap="round"/>
        <path class="fore" d="M138 464 L182 464" stroke="#64748b" stroke-width="7" stroke-linecap="round"/>
        <circle class="hand" cx="184" cy="464" r="4" fill="#e0ac85"/>
        <rect x="172" y="465" width="54" height="5" rx="1" fill="#334155"/>
        <ellipse cx="240" cy="467" rx="5" ry="3" fill="#475569"/>
        <path d="M256 458 h16 l4 12 h-24 Z" fill="#1f2937"/>
        <rect x="192" y="372" width="142" height="88" rx="4" fill="#0b0f19"/>
        <g class="scr" transform="translate(196 376)">
          <rect width="134" height="78" fill="#1c1c28"/><rect width="134" height="6" fill="#2a2a3a"/>
          <circle cx="4" cy="3" r="1.3" fill="#ef4444"/><circle cx="8" cy="3" r="1.3" fill="#f59e0b"/><circle cx="12" cy="3" r="1.3" fill="#22c55e"/>
          <rect y="6" width="9" height="72" fill="#242434"/>
          <rect x="2.5" y="10" width="4" height="4" fill="#52526a"/><rect x="2.5" y="19" width="4" height="4" fill="#f97316"/><rect x="2.5" y="28" width="4" height="4" fill="#52526a"/><rect x="2.5" y="37" width="4" height="4" fill="#52526a"/>
          <rect x="12" y="9" width="119" height="66" fill="#3a3a4c"/><rect x="17" y="13" width="109" height="58" fill="#fff"/>
          <g class="art">
            <rect class="sr" x="23" y="24" width="0" height="0" rx="2" fill="none" stroke="#3b82f6" stroke-width=".8" stroke-dasharray="2 1.5"/>
            <text class="st" x="74" y="44.5" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="800" font-size="10.5"></text>
            <circle class="lg" cx="28.5" cy="29.5" r="0"/>
          </g>
          <g class="btn" opacity="0"><rect class="bt" x="100" y="62" width="24" height="7" rx="2" fill="#16a34a"/><text x="112" y="67.2" text-anchor="middle" font-family="Poppins, sans-serif" font-size="4.4" font-weight="700" fill="#fff">${T("GÖNDER")}</text></g>
          <g class="toast" opacity="0"><rect x="22" y="31" width="92" height="16" rx="3" fill="#0f172a"/><text class="tt" x="68" y="41.5" text-anchor="middle" font-family="Poppins, sans-serif" font-size="6.2" font-weight="600" fill="#fff"></text></g>
          <path class="cur" d="M0 0 L0 9 L2.5 6.5 L4.5 10.5 L6 9.8 L4 5.8 L7.5 5.8 Z" fill="#fff" stroke="#000" stroke-width=".6"/>
        </g>
        <rect x="316" y="456" width="12" height="14" rx="2" fill="#f97316"/><path d="M328 460 q6 0 6 4 q0 4 -6 4" stroke="#f97316" stroke-width="2" fill="none"/>
        <path class="steam" d="M319 452 q-3 -5 0 -9 q3 -4 0 -8" stroke="#cbd5e1" stroke-width="1.5" fill="none"/><path class="steam d2" d="M325 452 q-3 -5 0 -9 q3 -4 0 -8" stroke="#cbd5e1" stroke-width="1.5" fill="none"/>
        <rect x="24" y="294" width="352" height="266" fill="none" stroke="#2b3950" stroke-width="5"/>
        <path d="M40 298 L110 298 L40 380 Z M170 298 L206 298 L64 470 L40 470 Z" fill="#ffffff" opacity=".03"/>`;
      const ticks = q(g, ".ticks");
      for (let i = 0; i < 12; i++) { const a = (i * Math.PI) / 6; el("path", { d: `M${186 + Math.sin(a) * 13} ${338 - Math.cos(a) * 13} L${186 + Math.sin(a) * 15.5} ${338 - Math.cos(a) * 15.5}`, stroke: "#334155", "stroke-width": i % 3 ? 1 : 2 }, ticks); }
      Object.assign(this, { hh: q(g, ".hh"), mh: q(g, ".mh"), sh: q(g, ".sh"), sr: q(g, ".sr"), stx: q(g, ".st"), lg: q(g, ".lg"), btn: q(g, ".btn"), bt: q(g, ".bt"), toast: q(g, ".toast"), tt: q(g, ".tt"), cur: q(g, ".cur"), fore: q(g, ".fore"), hand: q(g, ".hand"), head: q(g, ".dhead"), art: q(g, ".art") });
    },
    newCycle() {
      this.word = pick([T("KAFE LİMON"), T("ECZANE"), T("BERBER"), T("MARKET 24"), T("OTO YIKAMA"), T("PASTANE"), T("ÇİÇEKÇİ"), T("OPTİK"), T("KUAFÖR")], this.word);
      this.col = pick([["#f97316", "#ffffff", T("Turuncu")], ["#0f766e", "#ffffff", T("Petrol yeşili")], ["#1e3a8a", "#fde68a", T("Lacivert")], ["#dc2626", "#ffffff", T("Kırmızı")], ["#111827", "#f97316", T("Siyah")], ["#fde68a", "#7c2d12", T("Krem")]], this.col);
      this.size = pick(["300 × 80 cm", "450 × 100 cm", "200 × 60 cm", "600 × 120 cm", "120 × 120 cm"]);
      this.target = pick([[T("✓ CNC'ye gönderildi"), T("CNC")], [T("✓ UV baskıya gönderildi"), T("UV baskı")], [T("✓ Branda baskıya gönderildi"), T("Branda")], [T("✓ Folyo kesime gönderildi"), T("Folyo")], [T("✓ Lazer kesime gönderildi"), T("Lazer")]], this.target);
      this.tt.textContent = this.target[0];
    },
    update(dt, vis) {
      const t = this.t;
      this.prog = clamp(t / 7.6, 0, 1);
      if (!vis) return;
      const KF = [[0, 60, 70], [1, 23, 24], [2.2, 120, 56], [2.8, 118, 68], [5.6, 118, 68], [6.2, 108, 70], [7.4, 112, 65], [10, 60, 70]];
      let cx = 60, cy = 70;
      for (let i = 0; i < KF.length - 1; i++) if (t >= KF[i][0] && t < KF[i + 1][0]) { const f = ease(seg(t, KF[i][0], KF[i + 1][0])); cx = lerp(KF[i][1], KF[i + 1][1], f); cy = lerp(KF[i][2], KF[i + 1][2], f); }
      set(this.cur, "transform", `translate(${cx.toFixed(1)} ${cy.toFixed(1)})`);
      const w = t < 1 ? 0 : t < 2.2 ? clamp(cx - 23, 0, 97) : 97, h = t < 1 ? 0 : t < 2.2 ? clamp(cy - 24, 0, 32) : 32;
      set(this.sr, "width", w.toFixed(1)); set(this.sr, "height", h.toFixed(1));
      const fill = seg(t, 2.2, 2.8);
      set(this.sr, "fill", fill > 0 ? this.col[0] : "none"); set(this.sr, "fill-opacity", fill.toFixed(2)); set(this.sr, "stroke-opacity", (1 - fill).toFixed(2));
      const n = t < 2.8 ? 0 : Math.min(this.word.length, Math.floor(seg(t, 2.8, 5.4) * this.word.length) + 1);
      const caret = t > 2.8 && t < 5.8 && Math.floor(t * 3) % 2 === 0 ? "|" : "";
      const txt = this.word.slice(0, n) + caret;
      if (this.stx.textContent !== txt) this.stx.textContent = txt;
      set(this.stx, "fill", this.col[1]);
      set(this.lg, "r", (ease(seg(t, 5.6, 6.2)) * 3.6).toFixed(2)); set(this.lg, "fill", this.col[1]);
      set(this.btn, "opacity", t >= 6.2 ? 1 : 0);
      set(this.bt, "fill", t > 7.4 && t < 7.6 ? "#4ade80" : "#16a34a");
      set(this.toast, "opacity", t < 7.6 ? 0 : t < 9.4 ? Math.min(1, (t - 7.6) * 4).toFixed(2) : 0);
      set(this.art, "opacity", t > 9.4 ? (1 - seg(t, 9.4, 10)).toFixed(2) : 1);
      let hx, hy;
      if (t > 2.8 && t < 5.6) { hx = 186 + Math.sin(t * 31) * 4 + Math.sin(t * 7) * 6; hy = 463 + Math.abs(Math.sin(t * 23)) * 1.5; }
      else { hx = 236 + (cx - 60) * 0.08; hy = 465 + (cy - 60) * 0.05; }
      set(this.fore, "d", `M138 464 L${(hx - 2).toFixed(1)} ${hy.toFixed(1)}`);
      set(this.hand, "cx", hx.toFixed(1)); set(this.hand, "cy", hy.toFixed(1));
      set(this.head, "transform", `rotate(${(Math.sin(t * 0.9) * 2.5).toFixed(1)} 121 426)`);
    },
    tickClock(h, m, s) {
      set(this.hh, "transform", `rotate(${(h % 12) * 30 + m * 0.5} 186 338)`);
      set(this.mh, "transform", `rotate(${m * 6 + s * 0.1} 186 338)`);
      set(this.sh, "transform", `rotate(${s * 6} 186 338)`);
    },
    readout() {
      const t = this.t;
      const st = t < 2.8 ? [T("Çiziyor"), true] : t < 5.6 ? [T("Yazı ekliyor"), true] : t < 7.4 ? [T("Son rötuş"), true] : [T("Onaylandı"), false];
      return { status: st, stats: [[T("Tabela"), this.word], [T("Ölçü"), this.size], [T("Renk"), this.col[2]], [T("Gönderim"), this.target[1]]] };
    },
  });

  /* Rulo baskı (branda ve folyo ortak mekanizma) */
  function rollFeed(o) {
    return {
      panels: [], meters: 0, phase: Math.random() * 2,
      step(dt, feeding, vis) {
        if (feeding) {
          const d = o.speed * dt;
          for (const p of this.panels) p.y += d;
          this.meters += d * o.mPerPx;
          this.phase += dt / o.pass;
        }
        while (this.panels.length && this.panels[0].y > o.y1) this.panels.shift().g.remove();
        let top = this.panels.length ? this.panels[this.panels.length - 1].y : o.y1;
        while (top > o.y0 - o.h * 0.4) { top -= o.h; this.panels.push(o.make(top)); }
        if (vis) for (const p of this.panels) set(p.g, "transform", `translate(${o.x} ${p.y.toFixed(1)})`);
      },
      current() { const p = this.panels.find((p) => p.y <= o.y0 && p.y + o.h > o.y0) || this.panels[0]; return p ? p.label : "—"; },
      carriage() { const ph = mod(this.phase, 2); return { k: 1 - Math.abs(ph - 1), dir: ph < 1 ? 1 : -1 }; },
    };
  }

  /* 02 · BRANDA BASKI */
  const BANNERS = [[T("KAMPANYA"), T("tüm ürünlerde")], [T("%50 İNDİRİM"), T("sezon sonu")], [T("YENİ SEZON"), T("mağazamızda")], [T("SATILIK"), T("sahibinden daire")], [T("AÇILDI!"), T("yeni şubemiz")], [T("HOŞ GELDİNİZ"), T("bayram kampanyası")], [T("FUAR {0}", YIL), T("stant B-12")], [T("KİRALIK"), T("ofis katı")]];
  const BCOL = [["#dc2626", "#fff"], ["#f97316", "#fff"], ["#1d4ed8", "#fde68a"], ["#16a34a", "#fff"], ["#111827", "#f97316"], ["#fde047", "#111827"], ["#7c3aed", "#fff"]];
  def({
    name: T("Branda Baskı · 320 cm"), short: T("Branda"), link: L("/hizmetlerimiz/bez-baski/"), linkText: T("Branda & bez baskı →"),
    desc: T("Cephe brandası, mesh, pankart ve bez afiş 320 cm ene kadar tek parça basılır. Kuşgözü ve kaynak da atölyede yapılır."),
    total: 18, stillT: 6,
    build(g) {
      g.innerHTML = signSvg(this.no, T("BRANDA BASKI · 320 cm")) + `
        <g transform="rotate(8 360 420)"><rect x="344" y="300" width="14" height="150" rx="7" fill="#e2e8f0"/><rect x="344" y="330" width="14" height="80" fill="#dc2626" opacity=".7"/></g>
        <g transform="rotate(4 380 420)"><rect x="366" y="310" width="12" height="140" rx="6" fill="#cbd5e1"/><rect x="366" y="340" width="12" height="60" fill="#1d4ed8" opacity=".7"/></g>
        <rect x="48" y="364" width="304" height="20" rx="10" fill="#e2e8f0"/><rect x="48" y="377" width="304" height="7" rx="3" fill="#b6c2d1"/>
        <path d="M40 452 L28 560 M40 452 L56 560 M360 452 L344 560 M360 452 L372 560 M34 532 H366" stroke="#475569" stroke-width="6" stroke-linecap="round"/>
        <rect x="22" y="382" width="356" height="60" rx="6" fill="url(#gSteel)"/>
        <rect x="22" y="426" width="356" height="16" fill="#334155"/><rect x="44" y="390" width="312" height="4" fill="#64748b"/>
        <rect x="16" y="376" width="32" height="72" rx="5" fill="#cbd5e1"/><rect x="352" y="376" width="32" height="72" rx="5" fill="#cbd5e1"/>
        <rect x="22" y="388" width="6" height="16" fill="#22d3ee"/><rect x="29" y="388" width="6" height="16" fill="#e879f9"/><rect x="36" y="388" width="6" height="16" fill="#facc15"/><rect x="22" y="406" width="20" height="5" fill="#0f172a"/>
        <rect x="358" y="386" width="20" height="13" fill="#0b1220"/><circle cx="368" cy="420" r="3" fill="#4ade80" class="blink"/>
        <g class="car"><rect x="-17" y="392" width="34" height="26" rx="3" fill="#1f2937"/><rect x="-17" y="392" width="34" height="4" fill="#f97316"/><circle cx="-9" cy="408" r="2" fill="#22d3ee"/><circle cx="-3" cy="408" r="2" fill="#e879f9"/><circle cx="3" cy="408" r="2" fill="#facc15"/><circle cx="9" cy="408" r="2" fill="#f8fafc"/></g>
        <rect x="44" y="440" width="312" height="3" fill="#0b1220"/>
        <clipPath id="clipBr"><rect x="48" y="443" width="304" height="86"/></clipPath>
        <g clip-path="url(#clipBr)"><rect x="48" y="443" width="304" height="86" fill="#f1f5f9"/><g class="pan"></g></g>
        <rect x="42" y="526" width="316" height="20" rx="10" fill="#e2e8f0"/><rect x="42" y="526" width="316" height="20" rx="10" fill="url(#gArt)" opacity=".45"/><rect x="42" y="538" width="316" height="8" rx="4" fill="#000" opacity=".15"/>`;
      const pan = q(g, ".pan");
      this.car = q(g, ".car");
      this.feed = rollFeed({
        x: 50, y0: 443, y1: 530, h: 110, speed: 14, pass: 0.8, mPerPx: 0.02,
        make: (y) => {
          const [a, b] = pick(BANNERS), [bg, fg] = pick(BCOL);
          const pg = el("g", {}, pan);
          el("rect", { width: 300, height: 110, fill: bg }, pg);
          el("path", { d: "M0 0 H70 L0 70 Z", fill: fg, opacity: 0.14 }, pg);
          el("circle", { cx: 262, cy: 88, r: 40, fill: fg, opacity: 0.1 }, pg);
          el("text", { x: 150, y: 58, "text-anchor": "middle", "font-family": "Poppins, sans-serif", "font-weight": 800, "font-size": a.length > 10 ? 28 : 34, fill: fg }, pg).textContent = a;
          el("text", { x: 150, y: 80, "text-anchor": "middle", "font-family": "Poppins, sans-serif", "font-weight": 500, "font-size": 12, fill: fg, opacity: 0.9 }, pg).textContent = b;
          for (const x of [8, 150, 292]) el("circle", { cx: x, cy: 8, r: 3, fill: "#cbd5e1", stroke: "#64748b", "stroke-width": 1 }, pg);
          el("path", { d: "M0 109 H300", stroke: "#000", "stroke-opacity": 0.25, "stroke-dasharray": "4 4" }, pg);
          return { g: pg, y, label: a };
        },
      });
    },
    newCycle() { this.total = rnd(15, 21); },
    update(dt, vis) {
      const t = this.t, paused = t > this.total - 2.4 && t < this.total - 0.6;
      this.paused = paused;
      this.feed.step(dt, !paused, vis);
      this.prog = t / this.total;
      if (!vis) return;
      const c = this.feed.carriage();
      this.cx = lerp(this.cx ?? 60, paused ? 368 : 60 + 280 * c.k, paused ? 1 - Math.exp(-dt * 5) : 1);
      set(this.car, "transform", `translate(${this.cx.toFixed(1)} 0)`);
    },
    readout() {
      const c = this.feed.carriage();
      return { status: this.paused ? [T("Kafa temizliği"), false] : [T("Basıyor"), true], stats: [[T("Basılan"), fmt(this.feed.meters) + " m"], [T("İş"), this.feed.current()], [T("Kafa"), this.paused ? T("Park") : c.dir > 0 ? T("Sağa →") : T("← Sola")], [T("En"), T("320 cm")]] };
    },
  });

  /* BEZ BASKI · KALENDER */
  const BEZ = [
    { n: T("Türk bayrağı"), s: `<rect width="122" height="90" fill="#e30a17"/><circle cx="46" cy="45" r="22" fill="#fff"/><circle cx="52" cy="45" r="17.6" fill="#e30a17"/><polygon points="${starPts(74, 45, 9, 3.7)}" fill="#fff" transform="rotate(-18 74 45)"/>` },
    { n: T("Bayram afişi"), s: `<rect width="122" height="90" fill="#15803d"/><text x="61" y="40" text-anchor="middle" ${PF} font-weight="800" font-size="12.5" fill="#fff">${T("BAYRAMINIZ")}</text><text x="61" y="57" text-anchor="middle" ${PF} font-weight="800" font-size="12.5" fill="#fde68a">${T("KUTLU OLSUN")}</text><path d="M8 72 H114" stroke="#fde68a" stroke-width="3"/>` },
    { n: T("Hoş geldiniz"), s: `<rect width="122" height="90" fill="#1d4ed8"/><circle cx="104" cy="16" r="26" fill="#3b82f6"/><text x="61" y="52" text-anchor="middle" ${PF} font-weight="800" font-size="13" fill="#fff">${T("HOŞ GELDİNİZ")}</text>` },
    { n: T("İndirim bezi"), s: `<rect width="122" height="90" fill="#111827"/><text x="61" y="54" text-anchor="middle" ${PF} font-weight="800" font-size="30" fill="#facc15">${T("%40")}</text><text x="61" y="72" text-anchor="middle" ${PF} font-weight="700" font-size="10" fill="#fff">${T("İNDİRİM")}</text>` },
    { n: T("Okul afişi"), s: `<rect width="122" height="90" fill="#f97316"/><text x="61" y="40" text-anchor="middle" ${PF} font-weight="800" font-size="11" fill="#fff">${T("HOŞ GELDİN")}</text><text x="61" y="58" text-anchor="middle" ${PF} font-weight="800" font-size="15" fill="#fff">${T("OKULUM")}</text>` },
  ];
  def({
    name: T("Bez Baskı · Fırın"), short: T("Bez baskı"), link: L("/hizmetlerimiz/bez-baski/"), linkText: T("Branda & bez baskı →"),
    desc: T("Görsel doğrudan kumaşa basılır, ardından 200 °C fırından geçirilerek mürekkep kumaşa sabitlenir. Bayrak, bez afiş, flama ve pankart böyle çıkar."),
    total: 16, stillT: 8,
    build(g) {
      const zz = (y) => { let d = `M232 ${y}`; for (let x = 232; x < 348; x += 8) d += " l4 5 l4 -5"; return d; };
      g.innerHTML = signSvg(this.no, T("BEZ BASKI · FIRIN")) + `
        <path d="M36 432 L30 560 M186 432 L192 560 M33 532 H189" stroke="#475569" stroke-width="5" stroke-linecap="round"/>
        <rect x="20" y="396" width="180" height="38" rx="5" fill="url(#gSteel)"/><rect x="20" y="422" width="180" height="12" fill="#334155"/>
        <rect x="22" y="384" width="32" height="12" rx="2" fill="#cbd5e1"/><rect x="25" y="387" width="5" height="6" fill="#22d3ee"/><rect x="32" y="387" width="5" height="6" fill="#e879f9"/><rect x="39" y="387" width="5" height="6" fill="#facc15"/><rect x="46" y="387" width="5" height="6" fill="#0f172a"/>
        <g class="pcar"><rect x="-11" y="400" width="22" height="17" rx="2" fill="#1f2937"/><rect x="-11" y="400" width="22" height="3" fill="#e879f9"/></g>
        <clipPath id="clipBzP"><rect x="36" y="434" width="148" height="70"/></clipPath>
        <g clip-path="url(#clipBzP)"><rect x="36" y="434" width="148" height="70" fill="#f8fafc"/><g class="ppan"></g></g>
        <path class="inlet" d="M184 452 C200 452, 204 446, 216 446" stroke="#f97316" stroke-width="5" fill="none"/>
        <path d="M224 458 V560 M382 458 V560" stroke="#334155" stroke-width="8"/>
        <rect x="230" y="318" width="20" height="14" fill="#334155"/><rect x="293" y="318" width="20" height="14" fill="#334155"/><rect x="356" y="318" width="20" height="14" fill="#334155"/>
        <g class="shim" opacity=".4"><path d="M240 314 q4 -6 0 -12 q-4 -6 0 -12 M303 314 q4 -6 0 -12 q-4 -6 0 -12 M366 314 q4 -6 0 -12 q-4 -6 0 -12" stroke="#fdba74" stroke-width="1.5" fill="none"/></g>
        <circle cx="300" cy="386" r="86" fill="url(#gHeatR)"/>
        <rect x="214" y="330" width="178" height="128" rx="4" fill="url(#gDark)"/><rect x="214" y="330" width="178" height="5" fill="#f97316"/>
        <rect x="226" y="346" width="130" height="66" rx="3" fill="#1a0d08" stroke="#475569" stroke-width="3"/>
        <path class="coil" d="${zz(356)} ${zz(400)}" stroke="#fb923c" stroke-width="2" fill="none" filter="url(#fGlowSm)"/>
        <path class="belt" d="M229 380 H353" stroke="#f97316" stroke-width="7" stroke-dasharray="16 5"/>
        <rect x="362" y="346" width="24" height="30" rx="2" fill="#0b1220"/><text x="374" y="365" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" font-weight="700" fill="#fb923c">200°</text>
        <circle cx="374" cy="394" r="3" fill="#4ade80" class="blink"/>
        <text x="291" y="436" text-anchor="middle" ${PF} font-weight="700" font-size="12" fill="#fdba74" letter-spacing="4">${T("FIRIN")}</text>
        <rect x="236" y="452" width="134" height="6" rx="3" fill="#111827"/>
        <clipPath id="clipBzF"><rect x="240" y="458" width="126" height="94"/></clipPath>
        <g class="sway"><g clip-path="url(#clipBzF)"><g class="fpan"></g></g></g>`;
      Object.assign(this, { pcar: q(g, ".pcar"), sway: q(g, ".sway"), belt: q(g, ".belt"), coil: q(g, ".coil"), shim: q(g, ".shim"), inlet: q(g, ".inlet") });
      const ppan = q(g, ".ppan"), fpan = q(g, ".fpan");
      this.queue = [];
      this.paper = rollFeed({ x: 49, y0: 434, y1: 506, h: 90, speed: 12, pass: 0.7, mPerPx: 0.015, make: (y) => {
        const d = pick(BEZ); if (this.queue.length < 6) this.queue.push(d);
        const pg = el("g", {}, ppan);
        pg.innerHTML = d.s + `<path d="M0 89 H122" stroke="#000" stroke-opacity=".2" stroke-dasharray="3 3"/>`;
        return { g: pg, y, label: d.n };
      } });
      this.fab = rollFeed({ x: 242, y0: 458, y1: 552, h: 90, speed: 12, pass: 0.7, mPerPx: 0.015, make: (y) => {
        const d = this.queue.shift() || pick(BEZ);
        const pg = el("g", {}, fpan);
        pg.innerHTML = d.s + `<path d="M0 89 H122" stroke="#000" stroke-opacity=".2" stroke-dasharray="3 3"/>`;
        return { g: pg, y, label: d.n, bg: (d.s.match(/fill="(#[0-9a-f]{6})"/) || [])[1] };
      } });
    },
    newCycle() { this.fabric = pick([T("Raşel"), T("Saten"), T("Bayrak kumaşı"), T("Bez")], this.fabric); },
    update(dt, vis) {
      this.paper.step(dt, true, vis); this.fab.step(dt, true, vis);
      this.prog = this.t / this.total;
      if (!vis) return;
      const c = this.paper.carriage();
      set(this.pcar, "transform", `translate(${(44 + 132 * c.k).toFixed(1)} 0)`);
      set(this.belt, "stroke-dashoffset", (-this.t * 18).toFixed(1));
      set(this.coil, "opacity", (0.75 + Math.sin(this.t * 7) * 0.15 + Math.random() * 0.1).toFixed(2));
      set(this.shim, "transform", `translate(0 ${(-Math.abs(Math.sin(this.t * 1.3)) * 5).toFixed(1)})`);
      const cur = this.fab.panels.find((p) => p.y <= 458 && p.y + 90 > 458);
      if (cur && cur.bg) { set(this.belt, "stroke", cur.bg); set(this.inlet, "stroke", cur.bg); }
      set(this.sway, "transform", `translate(303 458) skewX(${(Math.sin(this.t * 1.7) * 3).toFixed(2)}) translate(-303 -458)`);
    },
    readout() { return { status: [T("Baskı + fırın"), true], stats: [[T("Basılan"), fmt(this.fab.meters) + " m"], [T("İş"), this.fab.current()], [T("Fırın"), "200 °C"], [T("Kumaş"), this.fabric]] }; },
  });
  /* 03 · FOLYO BASKI & KESİM */
  const VINYL = [["#facc15", "#111827", T("Sarı")], ["#f8fafc", "#dc2626", T("Beyaz")], ["#1f2937", "#f8fafc", T("Siyah")], ["#f97316", "#ffffff", T("Turuncu")], ["#1d4ed8", "#ffffff", T("Mavi")]];
  def({
    name: T("Folyo Baskı & Kesim"), short: T("Folyo"), link: L("/hizmetlerimiz/folyo-giydirme/"), linkText: T("Folyo & giydirme →"),
    desc: T("Dijital folyo baskı ve plotter kesim: vitrin yazıları, kapı etiketleri, araç ve cam giydirme için harf harf kesilir."),
    total: 10, stillT: 8.8,
    build(g) {
      g.innerHTML = signSvg(this.no, T("FOLYO BASKI & KESİM")) + `
        <rect x="40" y="306" width="160" height="4" fill="#334155"/><rect x="40" y="340" width="160" height="4" fill="#334155"/>
        <rect x="44" y="294" width="46" height="12" rx="6" fill="#facc15"/><rect x="94" y="294" width="46" height="12" rx="6" fill="#ef4444"/><rect x="144" y="294" width="46" height="12" rx="6" fill="#f8fafc"/>
        <rect x="44" y="328" width="46" height="12" rx="6" fill="#1d4ed8"/><rect x="94" y="328" width="46" height="12" rx="6" fill="#16a34a"/><rect x="144" y="328" width="46" height="12" rx="6" fill="#111827" stroke="#334155"/>
        <path d="M40 430 L34 560 M186 430 L192 560 M37 532 H189" stroke="#475569" stroke-width="5" stroke-linecap="round"/>
        <rect x="24" y="394" width="176" height="38" rx="5" fill="url(#gSteel)"/><rect x="24" y="420" width="176" height="12" fill="#334155"/>
        <g class="pcar"><rect x="-11" y="398" width="22" height="17" rx="2" fill="#1f2937"/><rect x="-11" y="398" width="22" height="3" fill="#f97316"/></g>
        <clipPath id="clipFyP"><rect x="34" y="432" width="156" height="64"/></clipPath>
        <g clip-path="url(#clipFyP)"><rect x="34" y="432" width="156" height="64" fill="#f8fafc"/><g class="pan"></g></g>
        <path d="M228 452 L222 560 M372 452 L378 560 M225 532 H375" stroke="#475569" stroke-width="5" stroke-linecap="round"/>
        <clipPath id="clipFyV"><rect x="222" y="450" width="156" height="72"/></clipPath>
        <clipPath id="clipFyR"><rect class="rev" x="222" y="450" width="0" height="72"/></clipPath>
        <g class="vinyl" clip-path="url(#clipFyV)">
          <rect x="222" y="450" width="156" height="72" fill="#f1f5f9"/>
          <rect class="sheet" x="222" y="450" width="156" height="72"/>
          <g clip-path="url(#clipFyR)"><text class="cut" x="300" y="496" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="800" fill="none" stroke="#000" stroke-opacity=".55" stroke-width=".9"></text></g>
          <text class="fill" x="300" y="496" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="800" opacity="0"></text>
        </g>
        <rect x="212" y="426" width="176" height="26" rx="8" fill="#e5e7eb"/><rect x="220" y="446" width="160" height="4" fill="#0b1220"/>
        <rect x="236" y="444" width="10" height="4" fill="#94a3b8"/><rect x="354" y="444" width="10" height="4" fill="#94a3b8"/>
        <circle cx="374" cy="436" r="2.6" fill="#4ade80" class="blink"/>
        <g class="blade"><rect x="-6" y="420" width="12" height="17" rx="2" fill="#1f2937"/><rect x="-6" y="420" width="12" height="3" fill="#f97316"/><path d="M0 437 L-2 443 H2 Z" fill="#94a3b8"/></g>`;
      Object.assign(this, { pcar: q(g, ".pcar"), rev: q(g, ".rev"), sheet: q(g, ".sheet"), cut: q(g, ".cut"), fill: q(g, ".fill"), blade: q(g, ".blade"), vinyl: q(g, ".vinyl") });
      const pan = q(g, ".pan");
      this.feed = rollFeed({
        x: 36, y0: 432, y1: 498, h: 70, speed: 10, pass: 0.6, mPerPx: 0.012,
        make: (y) => {
          const [bg, fg] = pick([["#f8fafc", "#dc2626"], ["#111827", "#facc15"], ["#f97316", "#fff"], ["#0ea5e9", "#fff"], ["#fde68a", "#7c2d12"]]);
          const lbl = pick([T("%30"), T("YENİ"), "SALE", "HOT", T("%20"), T("FIRSAT")]);
          const pg = el("g", {}, pan);
          el("rect", { width: 152, height: 70, fill: "#fff" }, pg);
          el("circle", { cx: 36, cy: 35, r: 24, fill: bg, stroke: fg, "stroke-width": 2 }, pg);
          el("text", { x: 36, y: 40, "text-anchor": "middle", "font-family": "Poppins, sans-serif", "font-weight": 800, "font-size": 12, fill: fg }, pg).textContent = lbl;
          el("rect", { x: 70, y: 18, width: 74, height: 34, rx: 6, fill: fg }, pg);
          el("text", { x: 107, y: 40, "text-anchor": "middle", "font-family": "Poppins, sans-serif", "font-weight": 800, "font-size": 12, fill: bg }, pg).textContent = pick([T("İNDİRİM"), T("KAMPANYA"), T("AÇILIŞ"), "OUTLET"]);
          el("path", { d: "M0 69 H152", stroke: "#94a3b8", "stroke-dasharray": "3 3" }, pg);
          return { g: pg, y, label: lbl };
        },
      });
    },
    newCycle() {
      this.word = pick([T("AÇIK"), T("KAPALI"), T("İNDİRİM"), T("HOŞ GELDİNİZ"), T("ÇEKİNİZ"), T("İTİNİZ"), T("GİRİŞ"), T("ÇIKIŞ"), "WC"], this.word);
      this.vc = pick(VINYL, this.vc);
      const size = Math.min(34, 142 / (this.word.length * 0.66));
      for (const n of [this.cut, this.fill]) { n.textContent = this.word; n.setAttribute("font-size", size.toFixed(1)); n.setAttribute("y", (486 + size * 0.36).toFixed(1)); }
      this.sheet.setAttribute("fill", this.vc[0]); this.fill.setAttribute("fill", this.vc[1]);
    },
    update(dt, vis) {
      const t = this.t;
      this.feed.step(dt, true, vis);
      const r = seg(t, 0.6, 6.6);
      this.rv = r; this.prog = r;
      if (!vis) return;
      const c = this.feed.carriage();
      set(this.pcar, "transform", `translate(${(46 + 132 * c.k).toFixed(1)} 0)`);
      const rx = 226 + r * 148;
      set(this.rev, "width", (rx - 222).toFixed(1));
      const bx = t < 0.6 ? 230 : t < 6.6 ? rx + Math.sin(t * 17) * 7 : lerp(rx, 230, seg(t, 6.6, 7.4));
      set(this.blade, "transform", `translate(${bx.toFixed(1)} 0)`);
      const wd = seg(t, 6.6, 8.0);
      set(this.sheet, "opacity", (1 - wd * 0.88).toFixed(2));
      set(this.fill, "opacity", wd.toFixed(2));
      set(this.cut, "opacity", (1 - wd).toFixed(2));
      set(this.vinyl, "opacity", t > 9.4 ? (1 - seg(t, 9.4, 10)).toFixed(2) : 1);
    },
    readout() {
      const t = this.t;
      const st = t < 0.6 ? [T("Hazırlanıyor"), true] : t < 6.6 ? [T("Kesiyor"), true] : t < 8 ? [T("Ayıklama"), true] : [T("Hazır"), false];
      return { status: st, stats: [[T("Yazı"), this.word], [T("Folyo"), this.vc[2]], [T("Kesim"), T("%{0}", Math.round(this.rv * 100))], [T("Baskı"), fmt(this.feed.meters) + " m"]] };
    },
  });

  /* ARAÇ GİYDİRME */
  const VAN = "M42 520 V462 Q42 440 62 438 L236 434 Q252 434 262 442 L300 470 Q344 476 352 496 V520 Z";
  const LIVERY = [
    { n: T("Eymen servis aracı"), s: `<rect x="30" y="420" width="340" height="110" fill="#e2e8f0"/><path d="M30 494 L370 472 V530 H30 Z" fill="#f97316"/><path d="M30 508 L370 487 V495 L30 516 Z" fill="#fdba74"/><text x="70" y="476" ${PF} font-weight="700" font-size="28" fill="#475569">eymen</text><text x="72" y="500" ${PF} font-weight="800" font-size="14" fill="#fff" letter-spacing="3">REKLAM</text><text x="196" y="478" ${PF} font-weight="800" font-size="30" fill="#f97316">25</text>` },
    { n: T("Kargo aracı"), s: `<rect x="30" y="420" width="340" height="110" fill="#1d4ed8"/><path d="M30 500 C120 470, 220 520, 370 470 V530 H30 Z" fill="#facc15"/><text x="64" y="476" ${PF} font-weight="800" font-size="24" fill="#fff">${T("HIZLI KARGO")}</text><text x="66" y="494" ${PF} font-size="11" fill="#bfdbfe">${T("aynı gün teslimat")}</text>` },
    { n: T("Çiçekçi aracı"), s: `<rect x="30" y="420" width="340" height="110" fill="#16a34a"/><circle cx="210" cy="470" r="18" fill="#f9a8d4"/><circle cx="238" cy="492" r="13" fill="#fde68a"/><circle cx="184" cy="496" r="11" fill="#fff" opacity=".8"/><text x="62" y="480" ${PF} font-weight="800" font-size="22" fill="#fff">${T("ÇİÇEK EVİ")}</text><text x="64" y="498" ${PF} font-size="11" fill="#dcfce7">${T("aynı gün çiçek")}</text>` },
    { n: T("Pizza aracı"), s: `<rect x="30" y="420" width="340" height="110" fill="#dc2626"/><circle cx="220" cy="478" r="30" fill="#facc15"/><circle cx="210" cy="470" r="5" fill="#b91c1c"/><circle cx="230" cy="486" r="5" fill="#b91c1c"/><circle cx="222" cy="462" r="4" fill="#b91c1c"/><text x="62" y="480" ${PF} font-weight="800" font-size="24" fill="#fff">${T("PİZZA")}</text><text x="64" y="500" ${PF} font-weight="700" font-size="13" fill="#fde68a">${T("7/24 SERVİS")}</text>` },
  ];
  def({
    name: T("Araç Giydirme"), short: T("Araç"), link: L("/urunlerimiz/komple-arac-kaplama/"), linkText: T("Araç kaplama →"),
    desc: T("Firma araçları döküm folyo ile baştan sona giydirilir. Folyo raketle yüzeye oturtulur, kenarlar ısıyla sabitlenir."),
    total: 15, stillT: 13.6,
    build(g) {
      g.innerHTML = signSvg(this.no, T("ARAÇ GİYDİRME")) + `
        <rect x="284" y="300" width="98" height="6" fill="#334155"/>
        <rect x="290" y="306" width="12" height="104" rx="6" fill="#f97316"/><rect x="306" y="306" width="12" height="96" rx="6" fill="#1d4ed8"/><rect x="322" y="306" width="12" height="108" rx="6" fill="#f8fafc"/><rect x="338" y="306" width="12" height="92" rx="6" fill="#111827" stroke="#334155"/><rect x="354" y="306" width="12" height="100" rx="6" fill="#dc2626"/>
        <ellipse cx="198" cy="560" rx="180" ry="9" fill="#000" opacity=".35"/>
        <clipPath id="clipVan"><path d="${VAN}"/></clipPath>
        <clipPath id="clipWrap"><rect class="rev" x="30" y="420" width="0" height="120"/></clipPath>
        <path d="${VAN}" fill="#f1f5f9"/>
        <g clip-path="url(#clipVan)"><g clip-path="url(#clipWrap)"><g class="liv"></g></g><rect class="shine" x="-60" y="420" width="22" height="120" fill="#fff" opacity="0"/></g>
        <path d="${VAN}" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
        <path d="M180 438 V516 M236 436 V516" stroke="#0f172a" stroke-opacity=".25" stroke-width="1.5"/>
        <path d="M240 444 L260 446 L292 470 L240 470 Z" fill="#1e3a5f"/><path d="M246 448 L256 448 L268 462 L252 462 Z" fill="#fff" opacity=".12"/>
        <rect x="344" y="482" width="8" height="6" rx="1" fill="#fef3c7"/><rect x="42" y="470" width="4" height="14" fill="#dc2626"/>
        <path d="M76 520 A24 24 0 0 1 124 520 Z M276 520 A24 24 0 0 1 324 520 Z" fill="#0f172a"/>
        <circle cx="100" cy="524" r="19" fill="#0b1220"/><circle cx="100" cy="524" r="8" fill="#94a3b8"/><circle cx="300" cy="524" r="19" fill="#0b1220"/><circle cx="300" cy="524" r="8" fill="#94a3b8"/>
        <rect class="sheet" x="0" y="432" width="12" height="90" fill="#fff" opacity="0"/>
        <circle class="hg" r="18" fill="url(#gHot)" opacity="0"/>
        <g class="crew"></g>`;
      Object.assign(this, { rev: q(g, ".rev"), liv: q(g, ".liv"), shine: q(g, ".shine"), sheet: q(g, ".sheet"), hg: q(g, ".hg") });
      const crew = q(g, ".crew");
      this.h = person(crew, { shirt: "#334155", helmet: "#facc15", skin: SKIN[3] });
      ITEMS.roll(this.h.carry, "#f97316");
      set(this.h.g, "transform", "translate(22 580) scale(.92)");
      this.w = person(crew, { shirt: "#0f766e", vest: "#f97316", hair: "#1f130c", skin: SKIN[1] });
      this.tool = el("rect", { x: 22, y: -100, width: 7, height: 16, rx: 1, fill: "#1d4ed8" }, this.w.carry);
      this.wx = 70;
    },
    newCycle() { this.lv = pick(LIVERY, this.lv); this.liv.innerHTML = this.lv.s; },
    update(dt, vis) {
      const t = this.t, r = seg(t, 1, 10), rx = 44 + 312 * r;
      this.prog = r;
      this.phase = t < 1 ? T("Hazırlık") : t < 10 ? T("Folyo uygulanıyor") : t < 12 ? T("Isıyla sabitleme") : T("Teslime hazır");
      if (!vis) return;
      set(this.rev, "width", (rx - 30).toFixed(1));
      set(this.sheet, "x", rx.toFixed(1)); set(this.sheet, "opacity", t > 1 && t < 10 ? 0.35 : 0);
      const want = t < 1 ? 70 : t < 10 ? rx + 26 : t < 12 ? lerp(380, 80, seg(t, 10, 12)) : 70;
      const moving = Math.abs(want - this.wx) > 0.5;
      this.wx = lerp(this.wx, want, dt > 0 ? 1 - Math.exp(-dt * 6) : 1);
      this.ph = (this.ph || 0) + (moving ? dt * 7 : 0);
      set(this.w.g, "transform", `translate(${this.wx.toFixed(1)} 576) scale(-.95 .95)`);
      const heat = t >= 10 && t < 12, work = t > 1 && t < 12;
      set(this.tool, "fill", heat ? "#dc2626" : "#1d4ed8");
      this.w.pose(this.ph, moving && !work ? 18 : 0, { arms: work ? -110 + (t < 10 ? Math.sin(t * 9) * 8 : 0) : -20, armsB: work ? -95 : 10 });
      set(this.hg, "cx", (this.wx - 26).toFixed(1)); set(this.hg, "cy", 484); set(this.hg, "opacity", heat ? (0.6 + Math.random() * 0.3).toFixed(2) : 0);
      const sh = t > 12 && t < 13.4;
      set(this.shine, "x", sh ? lerp(20, 370, seg(t, 12, 13.4)).toFixed(1) : -60); set(this.shine, "opacity", sh ? 0.3 : 0);
      set(this.liv, "opacity", t > 14.3 ? (1 - seg(t, 14.3, 15)).toFixed(2) : 1);
      this.h.pose(0, 0, { arms: -62 + Math.sin(t) * 3, armsB: -58 });
    },
    readout() { return { status: [this.phase, this.phase !== T("Teslime hazır")], stats: [[T("Araç"), T("Panelvan")], [T("Tasarım"), this.lv.n], [T("Kaplama"), T("%{0}", Math.round(this.prog * 100))], [T("Folyo"), T("Döküm folyo")]] }; },
  });
  /* 04 · CNC ROUTER */
  def({
    name: T("CNC Router"), short: T("CNC"), link: L("/hizmetlerimiz/tabela/"), linkText: T("Tabela imalatı →"),
    desc: T("Kutu harf gövdesi, pleksi yüz ve kompozit panel dosyadan milimetrik kesilir. Her döngüde tezgâhtan başka bir harf çıkıyor."),
    total: 14, stillT: 12.2,
    build(g) {
      g.innerHTML = signSvg(this.no, T("CNC ROUTER")) + `
        <g transform="rotate(-6 372 430)"><rect x="354" y="300" width="10" height="200" fill="#e6ecf3"/><rect x="366" y="310" width="10" height="190" fill="#cbd5e1"/></g>
        <rect x="58" y="505" width="244" height="44" fill="url(#gDark)"/><rect x="58" y="505" width="244" height="5" fill="#f97316"/>
        <rect x="72" y="518" width="60" height="20" rx="2" fill="#0b1220" stroke="#334155"/><circle cx="146" cy="528" r="3" fill="#4ade80" class="blink"/>
        <rect x="64" y="549" width="12" height="12" fill="#1e293b"/><rect x="284" y="549" width="12" height="12" fill="#1e293b"/>
        <path d="M106 400 L36 490 M394 400 L324 490" stroke="#64748b" stroke-width="5" stroke-linecap="round"/>
        <g transform="matrix(1 0 -0.35 0.45 120 400)">
          <rect width="260" height="200" fill="#232d3f"/>
          <path d="M20 0V200M40 0V200M60 0V200M80 0V200M100 0V200M120 0V200M140 0V200M160 0V200M180 0V200M200 0V200M220 0V200M240 0V200" stroke="#2f3b52" stroke-width="2"/>
          <rect x="18" y="12" width="224" height="176" fill="#e6ecf3"/><rect x="18" y="12" width="224" height="176" fill="none" stroke="#b6c2d1" stroke-width="1.5"/>
          <path class="part" fill="#f97316" opacity="0" fill-rule="evenodd"/>
          <path class="cutp" fill="none" stroke="#1e293b" stroke-width="3" stroke-linejoin="round"/>
        </g>
        <polygon points="50,490 310,490 310,505 50,505" fill="#475569"/><polygon points="310,490 380,400 380,415 310,505" fill="#334155"/>
        <g class="dust"></g>
        <g class="gan">
          <path d="M-9 0 L9 0 L6 -100 L-6 -100 Z" fill="url(#gOrange)"/><path d="M279 0 L297 0 L294 -100 L282 -100 Z" fill="url(#gOrange)"/>
          <rect x="-12" y="-110" width="312" height="24" rx="3" fill="url(#gOrange)"/><rect x="-12" y="-110" width="312" height="3" fill="#fed7aa" opacity=".7"/>
          <text x="210" y="-93" font-family="Poppins, sans-serif" font-weight="700" font-size="9" fill="#fff" letter-spacing="2.5" opacity=".9">EYMEN CNC</text>
          <g class="car"><rect x="-17" y="-116" width="34" height="40" rx="3" fill="#e2e8f0"/>
            <g class="zz"><rect x="-11" y="-80" width="22" height="46" rx="4" fill="url(#gSteel)"/><path d="M-7 -72h14M-7 -66h14M-7 -60h14" stroke="#64748b" stroke-width="1.5"/><path d="M-8 -34 L8 -34 L4 -20 L-4 -20 Z" fill="#94a3b8"/><rect x="-3" y="-20" width="6" height="6" fill="#64748b"/><path d="M0 -14 V0" stroke="#e5e7eb" stroke-width="2.4"/></g>
          </g>
        </g>`;
      Object.assign(this, { cutp: q(g, ".cutp"), part: q(g, ".part"), gan: q(g, ".gan"), car: q(g, ".car"), zz: q(g, ".zz") });
      this.dust = particles(q(g, ".dust"), 40, { r: 1.4, color: ["#e2e8f0", "#cbd5e1"], spread: 2.6, speed: 90, g: 220, life: 0.6 });
      this.op = person(g, { shirt: "#1e3a8a", vest: "#f97316", helmet: "#f8fafc", skin: SKIN[2] });
      set(this.op.g, "transform", "translate(24 572) scale(.95)");
    },
    newCycle() {
      this.letter = pick(LKEYS, this.letter);
      const d = LETTERS[this.letter];
      this.cutp.setAttribute("d", d); this.part.setAttribute("d", d);
      const st = this.cutp.getPointAtLength(0);
      this.job = makeJob({ u: 230, w: 192 }, [
        { k: "move", to: { u: st.x, w: st.y }, dur: 1.0 }, { k: "z", to: 0, dur: 0.35 },
        { k: "cut", path: this.cutp, dur: 9.0 }, { k: "z", to: 1, dur: 0.35 },
        { k: "move", to: { u: 230, w: 192 }, dur: 1.0 }, { k: "hold", dur: 1.7 }, { k: "fade", dur: 0.6 },
      ]);
      this.total = this.job.total;
      this.L = this.job.segs[2].L;
      this.cutp.setAttribute("stroke-dasharray", `${this.L} ${this.L}`);
    },
    update(dt, vis) {
      const c = (this.st = evalJob(this.job, this.t));
      this.prog = jobProgress(this.job, c);
      if (vis) {
        const bed = { e: 120, f: 400 }, pl = P(bed, -14, c.w);
        set(this.gan, "transform", `translate(${pl.x.toFixed(2)} ${pl.y.toFixed(2)})`);
        set(this.car, "transform", `translate(${(c.u + 14).toFixed(2)} 0)`);
        set(this.zz, "transform", `translate(0 ${(-c.z * 14).toFixed(2)})`);
        set(this.cutp, "stroke-dashoffset", (this.L * (1 - c.prog[0])).toFixed(1));
        set(this.cutp, "opacity", c.fade.toFixed(2));
        const partOp = c.k === "hold" && c.prog[0] >= 1 ? Math.min(1, c.f * 3) * 0.92 : c.k === "fade" ? 0.92 * c.fade : 0;
        set(this.part, "opacity", partOp.toFixed(2));
        if (c.cutting && dt > 0) { const tp = P(bed, c.u, c.w); this.dust.spawn(tp.x, tp.y); if (Math.random() < 0.6) this.dust.spawn(tp.x, tp.y); }
        this.op.pose(0, 0, { arms: -20 + Math.sin(this.t * 0.7) * 6, armsB: 8 });
      }
      this.dust.step(vis ? dt : 0);
    },
    readout() {
      const c = this.st;
      const st = c.cutting ? [T("Kesiyor"), true] : c.k === "hold" || c.k === "fade" ? [T("Parça hazır"), false] : [T("Konumlanıyor"), true];
      return { status: st, stats: [[T("Parça"), T("“{0}” harfi", this.letter)], ["X", fmt((c.u / 260) * 2050) + " mm"], ["Y", fmt((c.w / 200) * 3050) + " mm"], [T("Mil"), c.z < 0.5 ? T("Dönüyor") : T("Bekliyor")]] };
    },
  });

  /* 05 · LAZER KESİM */
  const LASER = [
    { n: T("“25” yazısı"), p: ["M42 62 C42 32, 102 30, 102 62 C102 88, 44 108, 42 140 H106", "M195 30 H142 L137 78 C160 64, 202 72, 202 104 C202 138, 158 150, 134 130"] },
    { n: T("“34” yazısı"), p: ["M40 42 C60 22, 104 28, 100 58 C98 80, 70 84, 62 86 C92 86, 108 104, 102 126 C94 152, 50 150, 38 132", "M184 150 V30 L128 112 H206"] },
    { n: T("Yıldız"), p: ["M120 22 L140 68 L190 72 L152 104 L164 150 L120 126 L76 150 L88 104 L50 72 L100 68 Z"] },
    { n: T("Kalp"), p: ["M120 148 C60 110, 40 70, 70 45 C95 25, 120 45, 120 62 C120 45, 145 25, 170 45 C200 70, 180 110, 120 148 Z"] },
    { n: T("Ok levha"), p: ["M36 70 H150 V40 L204 88 L150 136 V106 H36 Z"] },
  ];
  def({
    name: T("Lazer Kesim"), short: T("Lazer"), link: L("/urunlerimiz/kutu-harf-tabela/"), linkText: T("Kutu harf tabela →"),
    desc: T("İnce detaylı harf, logo ve pleksi parçalar lazerle temiz kenarlı kesilir. Kapağın amber camı ışını süzer."),
    total: 12, stillT: 10.6,
    build(g) {
      g.innerHTML = signSvg(this.no, T("LAZER KESİM")) + `
        <rect x="52" y="486" width="258" height="64" fill="url(#gDark)"/><polygon points="310,486 372,405 372,470 310,550" fill="#111827"/>
        <rect x="236" y="498" width="60" height="30" rx="3" fill="#0b1220" stroke="#334155"/>
        <text x="266" y="518" text-anchor="middle" font-family="ui-monospace, monospace" font-size="10" fill="#fb923c">LASER</text>
        <circle cx="72" cy="505" r="3" fill="#4ade80" class="blink"/><circle cx="84" cy="505" r="3" fill="#f59e0b"/>
        <circle cx="72" cy="556" r="5" fill="#1e293b"/><circle cx="290" cy="556" r="5" fill="#1e293b"/>
        <polygon points="111,400.5 375,400.5 305,486 41,486" fill="#111827" stroke="#374151" stroke-width="1.5"/>
        <g transform="matrix(1 0 -0.35 0.45 119.5 405)">
          <rect width="240" height="170" fill="#1a2231"/><rect width="240" height="170" fill="url(#pHoney)"/>
          <rect class="mat" x="16" y="14" width="208" height="142" fill="#cfe3f5" opacity=".55"/>
          <path class="c0" fill="none" stroke="#3b1a0b" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
          <path class="c1" fill="none" stroke="#3b1a0b" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
          <path class="h0" fill="none" stroke="#ff9a4d" stroke-width="3" stroke-linecap="round" filter="url(#fSoft)"/>
          <path class="h1" fill="none" stroke="#ff9a4d" stroke-width="3" stroke-linecap="round" filter="url(#fSoft)"/>
        </g>
        <g class="sparks"></g>
        <g class="gan"><rect x="-6" y="-24" width="262" height="10" rx="2" fill="#9ca3af"/><rect x="-6" y="-24" width="262" height="2" fill="#e5e7eb" opacity=".6"/>
          <g class="head"><rect x="-8" y="-32" width="16" height="18" rx="2" fill="#e5e7eb"/><path d="M-4 -14 L4 -14 L1.5 -6 L-1.5 -6 Z" fill="#94a3b8"/>
            <g class="beam"><path d="M0 -6 V0" stroke="#ff5a1f" stroke-width="2.4" filter="url(#fSoft)"/><path d="M0 -6 V0" stroke="#ffd9b8" stroke-width="1"/><circle r="10" fill="url(#gHot)"/></g></g></g>
        <polygon points="111,400.5 375,400.5 375,372 111,372" fill="#f97316" opacity=".06"/>
        <polygon points="111,372 375,372 305,457.5 41,457.5" fill="#fb923c" opacity=".09" stroke="#fb923c" stroke-opacity=".45" stroke-width="1.5"/>
        <polygon points="41,457.5 305,457.5 305,486 41,486" fill="#fb923c" opacity=".16" stroke="#fb923c" stroke-opacity=".5" stroke-width="1.5"/>
        <polygon points="305,457.5 375,372 375,400.5 305,486" fill="#fb923c" opacity=".1" stroke="#fb923c" stroke-opacity=".4" stroke-width="1.5"/>
        <rect x="140" y="464" width="80" height="5" rx="2.5" fill="#cbd5e1" opacity=".8"/>`;
      Object.assign(this, { c: [q(g, ".c0"), q(g, ".c1")], h: [q(g, ".h0"), q(g, ".h1")], gan: q(g, ".gan"), head: q(g, ".head"), beam: q(g, ".beam"), mat: q(g, ".mat") });
      this.sparks = particles(q(g, ".sparks"), 50, { r: 1.2, color: ["#fdba74", "#fff7ed", "#fb923c"], spread: 2.2, speed: 150, g: 420, life: 0.32 });
    },
    newCycle() {
      this.v = pick(LASER, this.v);
      this.mat.setAttribute("fill", pick(["#cfe3f5", "#f5d0a9", "#fecaca", "#e2e8f0"]));
      const segs = [];
      this.c.forEach((p, i) => {
        const d = this.v.p[i];
        p.setAttribute("d", d || "M0 0"); this.h[i].setAttribute("d", d || "M0 0");
        p.setAttribute("visibility", d ? "inherit" : "hidden"); this.h[i].setAttribute("visibility", d ? "inherit" : "hidden");
        if (d) { const s = p.getPointAtLength(0), L = p.getTotalLength(); segs.push({ k: "move", to: { u: s.x, w: s.y }, dur: i ? 0.5 : 0.8 }, { k: "cut", path: p, dur: L / 44 }); }
      });
      segs.push({ k: "move", to: { u: 222, w: 160 }, dur: 0.9 }, { k: "hold", dur: 1.1 }, { k: "fade", dur: 0.5 });
      this.job = makeJob({ u: 222, w: 160 }, segs);
      this.total = this.job.total;
      this.L = this.job.segs.filter((s) => s.k === "cut").map((s) => s.L);
      this.c.forEach((p, i) => { if (this.L[i]) { p.setAttribute("stroke-dasharray", `${this.L[i]} ${this.L[i]}`); this.h[i].setAttribute("stroke-dasharray", `22 ${this.L[i] + 22}`); } });
    },
    update(dt, vis) {
      const l = (this.st = evalJob(this.job, this.t));
      this.prog = jobProgress(this.job, l);
      if (vis) {
        const bed = { e: 119.5, f: 405 }, ll = P(bed, -8, l.w);
        set(this.gan, "transform", `translate(${ll.x.toFixed(2)} ${ll.y.toFixed(2)})`);
        set(this.head, "transform", `translate(${(l.u + 8).toFixed(2)} 0)`);
        set(this.beam, "opacity", l.cutting ? (0.8 + Math.random() * 0.2).toFixed(2) : 0);
        this.L.forEach((L, i) => {
          set(this.c[i], "stroke-dashoffset", (L * (1 - l.prog[i])).toFixed(1)); set(this.c[i], "opacity", l.fade.toFixed(2));
          set(this.h[i], "stroke-dashoffset", (-(l.prog[i] * L - 22)).toFixed(1));
          set(this.h[i], "opacity", l.cutting && l.prog[i] > 0 && l.prog[i] < 1 ? 1 : 0);
        });
        if (l.cutting && dt > 0) { const tp = P(bed, l.u, l.w); this.sparks.spawn(tp.x, tp.y); this.sparks.spawn(tp.x, tp.y); }
      }
      this.sparks.step(vis ? dt : 0);
    },
    readout() {
      const l = this.st;
      const st = l.cutting ? [T("Işın açık"), true] : l.k === "hold" || l.k === "fade" ? [T("Kesim bitti"), false] : [T("Konumlanıyor"), true];
      return { status: st, stats: [[T("Parça"), this.v.n], ["X", fmt((l.u / 240) * 1300) + " mm"], ["Y", fmt((l.w / 170) * 900) + " mm"], [T("Işın"), l.cutting ? T("Açık") : T("Kapalı")]] };
    },
  });

  /* 06 · HARF BÜKME */
  def({
    name: T("Harf Bükme"), short: T("Bükme"), link: L("/urunlerimiz/kutu-harf-tabela/"), linkText: T("Kutu harf tabela →"),
    desc: T("Kutu harfin yan yüzü alüminyum şeritten makinede bükülür. Şerit bobinden sürülür, harfin çevresi köşe köşe kıvrılır."),
    total: 10, stillT: 8.2,
    build(g) {
      const cols = ["#475569", "#64748b", "#7c8ba1", "#94a3b8", "#b6c2d1", "#e2e8f0"];
      let rib = "";
      cols.forEach((c, k) => { rib += `<g transform="translate(0 ${-2 * k})"><g transform="matrix(1 0 -0.35 0.45 110 424)"><path class="rb" transform="translate(40 10) scale(.75)" fill="none" stroke="${c}" stroke-width="5" stroke-linejoin="round"/></g></g>`; });
      g.innerHTML = signSvg(this.no, T("HARF BÜKME")) + `
        <rect x="300" y="300" width="80" height="6" fill="#334155"/><path d="M308 306 V340 M316 306 V336 M324 306 V344" stroke="#94a3b8" stroke-width="3"/>
        <rect x="44" y="396" width="7" height="164" fill="#475569"/><rect x="26" y="552" width="44" height="8" fill="#334155"/>
        <circle cx="47" cy="392" r="30" fill="#cbd5e1"/><circle cx="47" cy="392" r="24" fill="none" stroke="#94a3b8" stroke-width="2"/><circle cx="47" cy="392" r="17" fill="none" stroke="#94a3b8" stroke-width="2"/><circle cx="47" cy="392" r="9" fill="#475569"/>
        <g class="spk"><path d="M47 383 V401 M38 392 H56" stroke="#1e293b" stroke-width="2.5"/></g>
        <path d="M54 364 C120 336, 210 356, 252 390" stroke="#cbd5e1" stroke-width="3" fill="none"/>
        <polygon points="54,496 314,496 314,508 54,508" fill="#475569"/><polygon points="314,496 370,424 370,436 314,508" fill="#334155"/>
        <rect x="62" y="508" width="10" height="52" fill="#334155"/><rect x="296" y="508" width="10" height="52" fill="#334155"/>
        <g transform="matrix(1 0 -0.35 0.45 110 424)"><rect width="260" height="160" fill="#2a3446"/><path d="M0 40H260M0 80H260M0 120H260M65 0V160M130 0V160M195 0V160" stroke="#334155" stroke-width="2"/></g>
        <rect x="262" y="350" width="92" height="74" rx="4" fill="#e5e7eb"/><rect x="262" y="404" width="92" height="5" fill="#f97316"/>
        <rect x="274" y="360" width="44" height="22" rx="2" fill="#0b1220"/><text class="scr" x="296" y="376" text-anchor="middle" font-family="ui-monospace, monospace" font-size="12" font-weight="700" fill="#fb923c">E</text>
        <circle cx="336" cy="370" r="4" fill="#dc2626"/><circle cx="336" cy="384" r="4" fill="#16a34a"/>
        <rect x="246" y="386" width="16" height="10" fill="#475569"/>
        ${rib}
        <g class="hd"><rect x="-4" y="-18" width="8" height="18" rx="2" fill="#f97316"/><circle class="fl" cy="-6" r="7" fill="#fff7ed" opacity="0" filter="url(#fGlowSm)"/></g>`;
      Object.assign(this, { rb: [...g.querySelectorAll(".rb")], hd: q(g, ".hd"), fl: q(g, ".fl"), spk: q(g, ".spk"), scr: q(g, ".scr") });
      this.ang = 0;
    },
    newCycle() {
      this.letter = pick(LKEYS.filter((k) => k !== "A"), this.letter);
      for (const p of this.rb) p.setAttribute("d", LETTERS[this.letter]);
      this.L = this.rb[0].getTotalLength();
      for (const p of this.rb) p.setAttribute("stroke-dasharray", `${this.L} ${this.L}`);
      this.scr.textContent = this.letter;
      this.nb = (LETTERS[this.letter].match(/[HVL]/g) || []).length;
    },
    update(dt, vis) {
      const t = this.t, x = seg(t, 0.5, 7.5), n = this.nb;
      const i = Math.min(n - 1, Math.floor(x * n)), fr = x * n - i;
      const p = x >= 1 ? 1 : (i + ease(clamp(fr * 1.6, 0, 1))) / n;
      this.prog = p; this.step = x >= 1 ? n : i;
      if (!vis) return;
      for (const r of this.rb) { set(r, "stroke-dashoffset", (this.L * (1 - p)).toFixed(1)); set(r, "opacity", t > 9 ? (1 - seg(t, 9, 9.8)).toFixed(2) : 1); }
      const pt = this.rb[0].getPointAtLength(p * this.L), sp = P({ e: 110, f: 424 }, 40 + 0.75 * pt.x, 10 + 0.75 * pt.y);
      set(this.hd, "transform", `translate(${sp.x.toFixed(1)} ${sp.y.toFixed(1)})`);
      set(this.hd, "opacity", t < 7.8 ? 1 : 0);
      set(this.fl, "opacity", x > 0 && x < 1 && fr > 0.62 && fr < 0.8 ? 0.9 : 0);
      if (x > 0 && x < 1 && fr < 0.62) this.ang += dt * 160;
      set(this.spk, "transform", `rotate(${(this.ang % 360).toFixed(1)} 47 392)`);
    },
    readout() {
      const t = this.t;
      const st = t < 0.5 ? [T("Şerit sürülüyor"), true] : t < 7.5 ? [T("Büküyor"), true] : [T("Harf hazır"), false];
      return { status: st, stats: [[T("Harf"), this.letter], [T("Profil"), T("Alüminyum")], [T("Büküm"), `${this.step}/${this.nb}`], [T("Uzunluk"), fmt(this.L * this.prog * 6.2, 0) + " mm"]] };
    },
  });

  /* 07 · VAKUM ŞEKİLLENDİRME */
  const MOLDS = [
    { n: T("Kubbe"), h: (x) => (Math.abs(x - 200) < 70 ? 40 * Math.sqrt(1 - ((x - 200) / 70) ** 2) : 0) },
    { n: T("Işıklı kutu"), h: (x) => (x < 128 || x > 272 ? 0 : x < 142 ? ((x - 128) / 14) * 38 : x > 258 ? ((272 - x) / 14) * 38 : 38) },
    { n: T("Çift kabartma"), h: (x) => Math.max(Math.abs(x - 160) < 36 ? 32 * Math.sqrt(1 - ((x - 160) / 36) ** 2) : 0, Math.abs(x - 240) < 36 ? 32 * Math.sqrt(1 - ((x - 240) / 36) ** 2) : 0) },
    { n: T("Yay pano"), h: (x) => (Math.abs(x - 200) < 86 ? 24 * Math.sqrt(1 - ((x - 200) / 86) ** 2) : 0) },
  ];
  const SHEETS = [["#f1f5f9", T("Beyaz ABS")], ["#bfdbfe", T("Şeffaf PETG")], ["#fca5a5", T("Kırmızı ABS")], ["#fde68a", T("Sarı pleksi")]];
  def({
    name: T("Vakum Şekillendirme"), short: T("Vakum"), link: L("/urunlerimiz/isikli-blok-tabela/"), linkText: T("Işıklı tabela →"),
    desc: T("Levha ısıtılır, kalıp yükselir ve vakum levhayı kalıbın üzerine çeker. Işıklı harf yüzleri ve kabartma logolar böyle çıkar."),
    total: 12, stillT: 7.5,
    build(g) {
      let coil = "M8 390"; for (let x = 8; x < 228; x += 10) coil += " l5 6 l5 -6";
      g.innerHTML = signSvg(this.no, T("VAKUM ŞEKİLLENDİRME")) + `
        <rect x="66" y="300" width="14" height="172" fill="#94a3b8"/><rect x="320" y="300" width="14" height="172" fill="#94a3b8"/>
        <rect x="60" y="294" width="280" height="14" rx="3" fill="#cbd5e1"/><rect x="60" y="294" width="280" height="3" fill="#f97316"/>
        <g class="tbl"><polygon class="mold" fill="#334155" stroke="#475569"/><rect x="112" y="0" width="176" height="10" fill="#94a3b8"/><rect x="150" y="10" width="8" height="30" fill="#64748b"/><rect x="242" y="10" width="8" height="30" fill="#64748b"/></g>
        <rect x="64" y="470" width="272" height="90" fill="url(#gDark)"/><rect x="64" y="470" width="272" height="5" fill="#f97316"/>
        <circle cx="100" cy="515" r="17" fill="#111827" stroke="#475569" stroke-width="2"/><g class="fan"><path d="M100 515 L100 501 M100 515 L112 522 M100 515 L88 522" stroke="#64748b" stroke-width="5" stroke-linecap="round"/></g>
        <rect x="236" y="486" width="86" height="54" rx="3" fill="#0b1220"/>
        <circle cx="258" cy="512" r="13" fill="#f8fafc" stroke="#334155" stroke-width="2"/><path class="ndl" d="M258 512 L258 502" stroke="#dc2626" stroke-width="2" stroke-linecap="round"/>
        <text class="tmp" x="300" y="508" text-anchor="middle" font-family="ui-monospace, monospace" font-size="11" font-weight="700" fill="#fb923c">25°</text>
        <text x="300" y="526" text-anchor="middle" font-family="ui-monospace, monospace" font-size="8" fill="#64748b">°C</text>
        <g class="sheetg"><polygon class="sheet"/></g>
        <rect x="80" y="434" width="240" height="6" fill="#64748b"/><rect x="80" y="445" width="240" height="4" fill="#475569"/>
        <g class="heat"><rect y="366" width="236" height="22" rx="3" fill="#475569"/><path class="coil" d="${coil}" stroke="#7f1d1d" stroke-width="2.5" fill="none"/><rect class="hglow" y="388" width="236" height="34" fill="url(#gHeat)" opacity="0"/></g>
        <rect x="334" y="352" width="60" height="52" rx="4" fill="#334155"/><path d="M344 364h40M344 372h40M344 380h40M344 388h40" stroke="#1e293b" stroke-width="3"/>`;
      Object.assign(this, { tbl: q(g, ".tbl"), mold: q(g, ".mold"), fan: q(g, ".fan"), ndl: q(g, ".ndl"), tmp: q(g, ".tmp"), sheetg: q(g, ".sheetg"), sheet: q(g, ".sheet"), heat: q(g, ".heat"), coil: q(g, ".coil"), hglow: q(g, ".hglow") });
      this.fanA = 0;
    },
    newCycle() {
      this.m = pick(MOLDS, this.m); this.sh = pick(SHEETS, this.sh);
      let pts = "112,0 ";
      for (let x = 112; x <= 288; x += 4) pts += `${x},${(-this.m.h(x)).toFixed(1)} `;
      this.mold.setAttribute("points", pts + "288,0");
    },
    update(dt, vis) {
      const t = this.t;
      const heat = t < 1.6 ? 0 : t < 4.6 ? seg(t, 1.6, 4.6) : t < 6.6 ? 1 : 1 - seg(t, 6.6, 8.6);
      const hx = t < 0.8 ? 340 : t < 1.6 ? lerp(340, 82, ease(seg(t, 0.8, 1.6))) : t < 4.6 ? 82 : lerp(82, 340, ease(seg(t, 4.6, 5.2)));
      const ty = t < 5.2 ? 520 : t < 6 ? lerp(520, 452, ease(seg(t, 5.2, 6))) : t < 8.6 ? 452 : lerp(452, 520, ease(seg(t, 8.6, 9.4)));
      const k = t < 6 ? 0 : ease(seg(t, 6, 6.6));
      const sag = t < 6 ? seg(t, 1.6, 4.6) : 0;
      const vac = t >= 6 && t < 8.6;
      this.temp = 25 + heat * 155; this.vac = vac; this.prog = seg(t, 0, 10.6);
      if (!vis) return;
      this.fanA += dt * (t > 6.6 && t < 9 ? 900 : 60);
      set(this.fan, "transform", `rotate(${(this.fanA % 360).toFixed(0)} 100 515)`);
      set(this.heat, "transform", `translate(${hx.toFixed(1)} 0)`);
      set(this.coil, "stroke", heat > 0.05 && t < 5.2 ? mix("#7f1d1d", "#fb923c", Math.min(1, heat * 1.4)) : "#7f1d1d");
      set(this.hglow, "opacity", t > 1.2 && t < 5 ? (0.3 + 0.7 * Math.min(1, heat * 1.5)).toFixed(2) : 0);
      set(this.tbl, "transform", `translate(0 ${ty.toFixed(1)})`);
      const top = [], bot = [];
      for (let x = 84; x <= 316; x += 8) {
        const s = sag * 7 * Math.sin((Math.PI * (x - 84)) / 232);
        const tgt = x >= 112 && x <= 288 ? 449 - this.m.h(x) - 3 : x < 112 ? lerp(440, 446, (x - 84) / 28) : lerp(446, 440, (x - 288) / 28);
        const y = lerp(440 + s, tgt, k);
        top.push(`${x},${y.toFixed(1)}`); bot.unshift(`${x},${(y + 4).toFixed(1)}`);
      }
      set(this.sheet, "points", top.concat(bot).join(" "));
      set(this.sheet, "fill", mix(this.sh[0], "#fb923c", heat * 0.85));
      set(this.sheet, "fill-opacity", this.sh[0] === "#bfdbfe" ? 0.8 : 1);
      const lift = t > 9.4 ? ease(seg(t, 9.4, 10.6)) : 0;
      set(this.sheetg, "transform", `translate(0 ${(-lift * 44).toFixed(1)})`);
      set(this.sheetg, "opacity", t < 0.8 ? seg(t, 0, 0.8).toFixed(2) : t > 9.4 ? (1 - lift).toFixed(2) : 1);
      set(this.ndl, "transform", `rotate(${vac ? -118 : 0} 258 512)`);
      const tx = Math.round(this.temp) + "°";
      if (this.tmp.textContent !== tx) this.tmp.textContent = tx;
    },
    readout() {
      const t = this.t;
      const st = t < 0.8 ? [T("Levha yükleniyor"), true] : t < 5.2 ? [T("Isıtılıyor"), true] : t < 6.6 ? [T("Şekillendiriyor"), true] : t < 8.6 ? [T("Soğutuluyor"), true] : t < 10.6 ? [T("Parça çıkıyor"), true] : [T("Hazır"), false];
      return { status: st, stats: [[T("Isıtıcı"), Math.round(this.temp) + " °C"], [T("Vakum"), this.vac ? T("−0,8 bar") : "0 bar"], [T("Kalıp"), this.m.n], [T("Malzeme"), this.sh[1]]] };
    },
  });

  /* 08 · UV BASKI */
  const UVART = [
    { n: T("Pleksi afiş"), s: `<rect x="10" y="8" width="260" height="124" fill="url(#gArt)"/><circle cx="210" cy="56" r="34" fill="#fde68a" opacity=".85"/><path d="M10 98 C60 80, 110 118, 160 98 S 240 84, 270 102 V132 H10 Z" fill="#0891b2"/><path d="M10 114 C70 100, 120 130, 180 114 S 250 108, 270 118 V132 H10 Z" fill="#1e3a8a" opacity=".85"/><text x="26" y="52" font-family="Poppins, sans-serif" font-weight="800" font-size="30" fill="#fff">${T("UV BASKI")}</text><text x="28" y="70" font-family="Poppins, sans-serif" font-weight="500" font-size="10" fill="#fff">${T("cam · ahşap · metal · pleksi")}</text>` },
    { n: T("Cam panel"), s: `<rect x="10" y="8" width="260" height="124" fill="#0c4a6e"/><circle cx="60" cy="40" r="26" fill="#38bdf8" opacity=".5"/><circle cx="96" cy="86" r="18" fill="#7dd3fc" opacity=".45"/><circle cx="220" cy="100" r="30" fill="#0ea5e9" opacity=".5"/><text x="140" y="70" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="800" font-size="28" fill="#fff">${T("CAM BASKI")}</text><text x="140" y="88" text-anchor="middle" font-family="Poppins, sans-serif" font-size="10" fill="#e0f2fe">${T("mutfak paneli · 4 mm")}</text>` },
    { n: T("25. yıl panosu"), s: `<rect x="10" y="8" width="260" height="124" fill="#111827"/><path d="M180 8 H270 V132 H120 Z" fill="#f97316" opacity=".9"/><path d="M200 8 H214 L150 132 H136 Z" fill="#fdba74" opacity=".6"/><text x="30" y="96" font-family="Poppins, sans-serif" font-weight="800" font-size="72" fill="#f97316">25</text><text x="118" y="96" font-family="Poppins, sans-serif" font-weight="700" font-size="16" fill="#fff">${T("YIL")}</text><text x="32" y="36" font-family="Poppins, sans-serif" font-weight="600" font-size="16" fill="#cbd5e1">eymen</text>` },
    { n: T("Ahşap menü"), s: `<rect x="10" y="8" width="260" height="124" fill="#92400e"/><path d="M10 30 H270 M10 58 H270 M10 90 H270 M10 118 H270" stroke="#78350f" stroke-width="3" opacity=".6"/><text x="140" y="44" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="800" font-size="24" fill="#fef3c7">${T("MENÜ")}</text><path d="M60 66 H170 M60 82 H150 M60 98 H180 M60 114 H140" stroke="#fef3c7" stroke-width="4" stroke-linecap="round"/><path d="M200 66 H222 M200 82 H222 M200 98 H222 M200 114 H222" stroke="#fdba74" stroke-width="4" stroke-linecap="round"/>` },
  ];
  const UV = { N: 6, y0: 8, h: 124, pass: 1.8, step: 0.22, pre: 0.6, park: 0.8, hold: 1.6, fade: 0.6 };
  UV.bh = UV.h / UV.N; UV.total = UV.pre + UV.N * (UV.pass + UV.step) + UV.park + UV.hold + UV.fade;
  function uvState(tc) {
    const U0 = -30, U1 = 310, s = { u: U0, w: -24, done: 0, band: -1, bx: 10, bw: 0, printing: false, fade: 1, prog: 0, pass: 0, dir: 1 };
    let t = tc; const first = UV.y0 + UV.bh / 2, cyc = UV.pass + UV.step;
    if (t < UV.pre) { s.w = lerp(-24, first, ease(t / UV.pre)); return s; }
    t -= UV.pre;
    if (t < UV.N * cyc) {
      const i = Math.floor(t / cyc), f = t - i * cyc, dir = i % 2 === 0 ? 1 : -1, wc = UV.y0 + UV.bh * i + UV.bh / 2;
      Object.assign(s, { pass: i + 1, dir, done: i, w: wc });
      if (f < UV.pass) {
        const k = f / UV.pass;
        s.u = dir > 0 ? lerp(U0, U1, k) : lerp(U1, U0, k); s.printing = true; s.band = i;
        if (dir > 0) { s.bx = 10; s.bw = clamp(s.u - 10, 0, 260); } else { s.bx = clamp(s.u, 10, 270); s.bw = 270 - s.bx; }
        s.prog = (i + k) / UV.N;
      } else { s.done = i + 1; s.u = dir > 0 ? U1 : U0; s.prog = (i + 1) / UV.N; if (i < UV.N - 1) s.w = lerp(wc, wc + UV.bh, ease((f - UV.pass) / UV.step)); }
      return s;
    }
    t -= UV.N * cyc;
    Object.assign(s, { done: UV.N, prog: 1, pass: UV.N, u: UV.N % 2 === 0 ? U0 : U1 });
    const last = UV.y0 + UV.bh * (UV.N - 1) + UV.bh / 2;
    if (t < UV.park) { s.w = lerp(last, -24, ease(t / UV.park)); return s; }
    t -= UV.park; if (t < UV.hold) return s; t -= UV.hold;
    s.fade = 1 - clamp(t / UV.fade, 0, 1); return s;
  }
  def({
    name: T("UV Baskı · 4×2 m flatbed"), short: T("UV"), link: L("/hizmetlerimiz/uv-baski/"), linkText: T("UV baskı →"),
    desc: T("Cam, ahşap, metal, pleksi ve kompozite doğrudan baskı. Mürekkep UV ışıkla anında kürlenir; gerekirse beyaz altbaskı ve vernik eklenir."),
    total: UV.total, stillT: UV.pre + UV.N * (UV.pass + UV.step) + UV.park + 0.8,
    build(g) {
      g.innerHTML = signSvg(this.no, T("UV BASKI · 4×2 m")) + `
        <rect x="40" y="488" width="262" height="60" fill="url(#gSteel)"/><rect x="40" y="520" width="262" height="6" fill="#334155"/>
        <rect x="56" y="496" width="70" height="18" rx="2" fill="#0b1220"/><rect x="61" y="501" width="10" height="8" fill="#22d3ee"/><rect x="73" y="501" width="10" height="8" fill="#e879f9"/><rect x="85" y="501" width="10" height="8" fill="#facc15"/><rect x="97" y="501" width="10" height="8" fill="#0f172a" stroke="#475569"/><rect x="109" y="501" width="10" height="8" fill="#f8fafc"/>
        <circle cx="290" cy="505" r="3" fill="#4ade80" class="blink"/><rect x="48" y="548" width="12" height="13" fill="#64748b"/><rect x="282" y="548" width="12" height="13" fill="#64748b"/>
        <clipPath id="clipUv" clipPathUnits="userSpaceOnUse"><rect class="ud" x="10" y="8" width="260" height="0"/><rect class="ub" x="10" y="8" width="0" height="0"/></clipPath>
        <g transform="matrix(1 0 -0.35 0.45 79 410)"><rect width="280" height="140" fill="#1f2937"/><rect width="280" height="140" fill="url(#pVac)"/><rect x="10" y="8" width="260" height="124" fill="#f8fafc"/><g class="art" clip-path="url(#clipUv)"></g></g>
        <polygon points="30,473 310,473 310,488 30,488" fill="#94a3b8"/><polygon points="310,473 359,410 359,425 310,488" fill="#64748b"/>
        <g class="gan"><path d="M-8 0 L8 0 L6 -74 L-6 -74 Z" fill="#cbd5e1"/><path d="M352 0 L368 0 L366 -74 L354 -74 Z" fill="#cbd5e1"/>
          <rect x="-12" y="-80" width="384" height="26" rx="3" fill="url(#gSteel)"/><rect x="-12" y="-62" width="384" height="5" fill="#334155"/>
          <g class="car"><ellipse class="spill" rx="40" ry="10" fill="url(#gUv)" opacity="0"/><rect x="-24" y="-58" width="48" height="48" rx="4" fill="#1f2937"/><rect x="-24" y="-58" width="48" height="5" rx="2" fill="#f97316"/>
            <circle cx="-14" cy="-42" r="2.6" fill="#22d3ee"/><circle cx="-7" cy="-42" r="2.6" fill="#e879f9"/><circle cx="0" cy="-42" r="2.6" fill="#facc15"/><circle cx="7" cy="-42" r="2.6" fill="#0f172a" stroke="#64748b" stroke-width=".8"/><circle cx="14" cy="-42" r="2.6" fill="#f8fafc"/>
            <rect x="-18" y="-32" width="36" height="16" rx="2" fill="#111827"/>
            <g class="lamps"><rect x="-33" y="-26" width="9" height="16" rx="2" fill="#c4b5fd"/><rect x="24" y="-26" width="9" height="16" rx="2" fill="#c4b5fd"/></g></g></g>`;
      Object.assign(this, { ud: q(g, ".ud"), ub: q(g, ".ub"), art: q(g, ".art"), gan: q(g, ".gan"), car: q(g, ".car"), spill: q(g, ".spill"), lamps: q(g, ".lamps") });
    },
    newCycle() { this.v = pick(UVART, this.v); this.art.innerHTML = this.v.s; },
    update(dt, vis) {
      const u = (this.st = uvState(this.t));
      this.prog = u.prog;
      if (!vis) return;
      const ul = P({ e: 79, f: 410 }, -40, u.w);
      set(this.gan, "transform", `translate(${ul.x.toFixed(2)} ${ul.y.toFixed(2)})`);
      set(this.car, "transform", `translate(${(u.u + 40).toFixed(2)} 0)`);
      set(this.ud, "height", (u.done * UV.bh).toFixed(2));
      if (u.band >= 0) { set(this.ub, "x", u.bx.toFixed(2)); set(this.ub, "width", u.bw.toFixed(2)); set(this.ub, "y", (UV.y0 + u.band * UV.bh).toFixed(2)); set(this.ub, "height", UV.bh.toFixed(2)); }
      else set(this.ub, "width", 0);
      set(this.art, "opacity", u.fade.toFixed(2));
      set(this.spill, "opacity", u.printing ? 0.9 : 0);
      set(this.lamps, "filter", u.printing ? "url(#fGlowSm)" : "none");
      set(this.lamps, "opacity", u.printing ? 1 : 0.35);
    },
    readout() {
      const u = this.st;
      const st = u.printing ? [T("Baskı · geçiş {0}/{1}", u.pass, UV.N), true] : u.prog >= 1 ? [T("Baskı bitti"), false] : [T("Geçiş hazırlığı"), true];
      return { status: st, stats: [[T("İş"), this.v.n], [T("Geçiş"), `${Math.max(1, u.pass)}/${UV.N}`], [T("UV lamba"), u.printing ? T("Açık") : T("Kapalı")], [T("Tabla"), "4000 × 2000 mm"]] };
    },
  });

  /* LIGHTBOX ÖRNEKLERİ */
  const LB1 = [
    { n: T("Yaz kampanyası"), s: `<rect width="190" height="110" fill="#fb7185"/><rect y="66" width="190" height="44" fill="#0ea5e9"/><circle cx="142" cy="44" r="24" fill="#fde68a"/><path d="M0 72 C40 64, 80 80, 120 70 S 170 64, 190 72" stroke="#e0f2fe" stroke-width="3" fill="none"/><text x="16" y="40" ${PF} font-weight="800" font-size="22" fill="#fff">${T("YAZ")}</text><text x="16" y="56" ${PF} font-weight="700" font-size="11" fill="#fff">${T("İNDİRİMİ")}</text>` },
    { n: T("Burger menü"), s: `<rect width="190" height="110" fill="#111827"/><path d="M110 58 Q140 22 170 58 Z" fill="#f59e0b"/><rect x="108" y="60" width="64" height="7" rx="3" fill="#22c55e"/><rect x="110" y="68" width="60" height="10" rx="4" fill="#7c2d12"/><rect x="108" y="79" width="64" height="4" fill="#facc15"/><path d="M110 84 H170 Q168 94 140 94 Q112 94 110 84 Z" fill="#f59e0b"/><text x="16" y="50" ${PF} font-weight="800" font-size="18" fill="#f97316">${T("EFSANE")}</text><text x="16" y="70" ${PF} font-weight="800" font-size="18" fill="#fff">${T("BURGER")}</text>` },
    { n: T("Diş kliniği"), s: `<rect width="190" height="110" fill="#e0f2fe"/><path d="M130 30 C115 22 100 32 104 50 C107 66 112 86 118 88 C124 90 124 70 132 70 C140 70 140 90 146 88 C152 86 157 66 160 50 C164 32 149 22 134 30 Z" fill="#fff" stroke="#0e7490" stroke-width="2"/><text x="14" y="50" ${PF} font-weight="800" font-size="14" fill="#0e7490">${T("GÜLÜŞ")}</text><text x="14" y="68" ${PF} font-weight="800" font-size="14" fill="#0e7490">${T("TASARIMI")}</text>` },
    { n: T("Otomotiv"), s: `<rect width="190" height="110" fill="#0f172a"/><rect y="80" width="190" height="30" fill="#1e293b"/><path d="M40 84 L56 66 Q64 58 80 58 H116 Q128 58 138 66 L152 74 Q166 76 168 84 Z" fill="#dc2626"/><circle cx="66" cy="86" r="8" fill="#111827" stroke="#94a3b8" stroke-width="2"/><circle cx="144" cy="86" r="8" fill="#111827" stroke="#94a3b8" stroke-width="2"/><text x="95" y="36" text-anchor="middle" ${PF} font-weight="800" font-size="16" fill="#fff">${T("YENİ MODEL")}</text>` },
  ];
  const LB2 = [
    { n: T("Parfüm"), s: `<rect width="66" height="106" fill="#312e81"/><rect x="22" y="40" width="22" height="34" rx="4" fill="#c4b5fd"/><rect x="28" y="32" width="10" height="8" fill="#fde68a"/><text x="33" y="92" text-anchor="middle" ${PF} font-weight="700" font-size="9" fill="#fff">${T("PARFÜM")}</text>` },
    { n: T("Kahve"), s: `<rect width="66" height="106" fill="#78350f"/><path d="M18 42 H46 L43 72 Q42 76 38 76 H26 Q22 76 21 72 Z" fill="#fef3c7"/><path d="M46 48 q8 0 8 7 q0 7 -8 7" stroke="#fef3c7" stroke-width="3" fill="none"/><path d="M26 34 q-3 -5 0 -9 M34 34 q-3 -5 0 -9" stroke="#fde68a" stroke-width="2" fill="none"/><text x="33" y="94" text-anchor="middle" ${PF} font-weight="700" font-size="9" fill="#fff">${T("KAHVE")}</text>` },
    { n: T("Telefon"), s: `<rect width="66" height="106" fill="#0f172a"/><rect x="20" y="24" width="26" height="50" rx="5" fill="#334155"/><rect x="23" y="29" width="20" height="40" rx="2" fill="#38bdf8"/><text x="33" y="92" text-anchor="middle" ${PF} font-weight="700" font-size="9" fill="#fff">${T("YENİ SERİ")}</text>` },
  ];
  const LB3 = [
    { n: "e", s: `<circle r="30" fill="#f97316"/><text y="11" text-anchor="middle" ${PF} font-weight="700" font-size="32" fill="#fff">e</text>` },
    { n: "K", s: `<circle r="30" fill="#0f766e"/><text y="11" text-anchor="middle" ${PF} font-weight="800" font-size="30" fill="#fff">K</text>` },
    { n: "24", s: `<circle r="30" fill="#dc2626"/><text y="9" text-anchor="middle" ${PF} font-weight="800" font-size="24" fill="#fff">24</text>` },
  ];
  def({
    name: T("Lightbox Örnekleri"), short: T("Lightbox"), link: L("/urunlerimiz/lightbox-pano/"), linkText: T("Lightbox pano →"),
    desc: T("Kumaş germe lightbox, ince LED poster çerçevesi ve yuvarlak logo kutusu. Showroom duvarında sırayla yanıyor, her turda içerik değişiyor."),
    total: 12, stillT: 6,
    build(g) {
      g.innerHTML = signSvg(this.no, T("LIGHTBOX ÖRNEKLERİ")) + `
        <rect x="14" y="282" width="372" height="278" fill="#121a2b"/>
        <ellipse class="h0" cx="130" cy="360" rx="150" ry="100" fill="url(#gHalo)" opacity="0"/>
        <ellipse class="h1" cx="280" cy="346" rx="70" ry="90" fill="url(#gHalo)" opacity="0"/>
        <ellipse class="h2" cx="352" cy="352" rx="60" ry="60" fill="url(#gHalo)" opacity="0"/>
        <rect x="30" y="300" width="200" height="120" rx="3" fill="#94a3b8"/>
        <g class="i0" transform="translate(35 305)"></g><rect class="o0" x="35" y="305" width="190" height="110" fill="#0b1220" opacity=".82"/>
        <rect x="244" y="290" width="72" height="112" rx="2" fill="#cbd5e1"/>
        <g class="i1" transform="translate(247 293)"></g><rect class="o1" x="247" y="293" width="66" height="106" fill="#0b1220" opacity=".82"/>
        <circle cx="352" cy="352" r="34" fill="#94a3b8"/>
        <g class="i2" transform="translate(352 352)"></g><circle class="o2" cx="352" cy="352" r="30" fill="#0b1220" opacity=".82"/>
        <text x="130" y="438" text-anchor="middle" ${PF} font-size="10" fill="#94a3b8">${T("Kumaş germe lightbox")}</text>
        <text x="280" y="418" text-anchor="middle" ${PF} font-size="10" fill="#94a3b8">${T("LED poster")}</text>
        <text x="352" y="402" text-anchor="middle" ${PF} font-size="10" fill="#94a3b8">${T("Logo kutusu")}</text>
        <path d="M60 470 H190 V476 H60 Z" fill="#8b5a2b"/><path d="M70 476 V560 M180 476 V560" stroke="#3f2a17" stroke-width="6"/>
        <rect x="80" y="444" width="40" height="26" rx="2" fill="#cbd5e1"/><rect x="83" y="447" width="34" height="20" fill="#fde68a" class="blink"/>
        <rect x="130" y="456" width="44" height="14" rx="1" fill="#e2e8f0"/><rect x="134" y="459" width="36" height="2" fill="#94a3b8"/>
        <g class="crew"></g>`;
      this.ii = [0, 1, 2].map((i) => q(g, ".i" + i));
      this.ov = [0, 1, 2].map((i) => q(g, ".o" + i));
      this.halo = [0, 1, 2].map((i) => q(g, ".h" + i));
      this.cust = person(q(g, ".crew"), { shirt: "#be185d", hair: "#3b2314", skin: SKIN[0], pants: "#334155" });
      set(this.cust.g, "transform", "translate(250 578) scale(-.95 .95)");
    },
    newCycle() {
      this.c = [pick(LB1, this.c && this.c[0]), pick(LB2, this.c && this.c[1]), pick(LB3, this.c && this.c[2])];
      this.c.forEach((c, i) => (this.ii[i].innerHTML = c.s));
    },
    update(dt, vis) {
      const t = this.t;
      const on = [0.8, 1.4, 2.0].map((s, i) => t > s && t < 10 && !(t < s + 0.3 && Math.sin(t * 60 + i) < 0));
      this.cnt = on.filter(Boolean).length; this.prog = this.cnt / 3;
      if (!vis) return;
      this.ov.forEach((o, i) => set(o, "opacity", on[i] ? 0 : 0.82));
      this.halo.forEach((h, i) => set(h, "opacity", on[i] ? 1 : 0));
      this.cust.pose(0, 0, { arms: Math.sin(t * 0.8) * 8 - 12, armsB: 6 });
    },
    readout() { return { status: this.cnt ? [T("Yanıyor"), true] : [T("İçerik değişiyor"), false], stats: [[T("Kumaş lightbox"), this.c[0].n], [T("LED poster"), this.c[1].n], [T("Logo kutusu"), "“" + this.c[2].n + "”"], [T("Yanan"), `${this.cnt}/3`]] }; },
  });
  /* 09 · KAYNAK ATÖLYESİ */
  const FRAMES = [
    { n: T("Totem iskeleti"), seg: [[20, 20, 200, 20], [20, 100, 200, 100], [20, 20, 20, 100], [200, 20, 200, 100], [65, 20, 65, 100], [110, 20, 110, 100], [155, 20, 155, 100]], j: [[20, 20], [200, 20], [20, 100], [200, 100], [65, 20], [65, 100], [110, 20], [110, 100], [155, 20], [155, 100]] },
    { n: T("Pano çerçevesi"), seg: [[14, 14, 206, 14], [14, 106, 206, 106], [14, 14, 14, 106], [206, 14, 206, 106], [14, 60, 206, 60], [14, 14, 110, 60], [110, 60, 206, 106]], j: [[14, 14], [206, 14], [14, 106], [206, 106], [14, 60], [206, 60], [110, 60]] },
  ];
  def({
    name: T("Kaynak Atölyesi"), short: T("Kaynak"), link: L("/urunlerimiz/totem-tabela/"), linkText: T("Totem tabela →"),
    desc: T("Totem ve pano iskeletleri çelik profilden kaynakla çatılır. Ustamız maskesini indirip dikiş dikiş ilerliyor."),
    total: 12, stillT: 3,
    build(g) {
      g.innerHTML = signSvg(this.no, T("KAYNAK ATÖLYESİ")) + `
        <rect x="312" y="294" width="76" height="266" fill="#b91c1c" opacity=".2"/><path d="M324 294V560M338 294V560M352 294V560M366 294V560M380 294V560" stroke="#7f1d1d" stroke-width="1" opacity=".5"/>
        <g transform="translate(34 304)"><path d="M22 0 L44 38 H0 Z" fill="#facc15"/><text x="22" y="33" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="800" font-size="20" fill="#111827">!</text></g>
        <text x="86" y="326" font-family="Poppins, sans-serif" font-weight="700" font-size="11" fill="#facc15" letter-spacing="1.5">${T("KAYNAK ALANI")}</text>
        <text x="86" y="341" font-family="Poppins, sans-serif" font-size="9" fill="#94a3b8">${T("maskesiz girmeyin")}</text>
        <ellipse class="amb" rx="130" ry="100" fill="url(#gArc)" opacity="0"/>
        <rect x="20" y="468" width="20" height="92" rx="9" fill="#15803d"/><rect x="25" y="460" width="10" height="10" fill="#475569"/>
        <rect x="46" y="514" width="46" height="46" rx="3" fill="#1d4ed8"/><circle cx="62" cy="530" r="6" fill="#0b1220"/><rect x="74" y="524" width="12" height="6" fill="#facc15"/>
        <polygon points="120,494 340,494 340,504 120,504" fill="#475569"/><polygon points="340,494 382,440 382,450 340,504" fill="#334155"/>
        <path d="M132 504 V560 M328 504 V560 M364 452 V540" stroke="#334155" stroke-width="8"/>
        <g transform="matrix(1 0 -0.35 0.45 162 440)"><rect width="220" height="120" fill="#2a3446"/><path d="M0 30H220M0 60H220M0 90H220" stroke="#334155" stroke-width="3"/></g>
        <g class="frm"></g><g class="beads"></g>
        <path class="cable" fill="none" stroke="#111827" stroke-width="2.5"/>
        <g class="wld"></g>
        <path class="arm" stroke="#1e293b" stroke-width="7" stroke-linecap="round"/>
        <path class="torch" stroke="#111827" stroke-width="4" stroke-linecap="round"/>
        <circle class="arc" r="4" fill="#f0f9ff" filter="url(#fGlow)" opacity="0"/>
        <ellipse class="flr" rx="90" ry="10" fill="#bae6fd" opacity="0"/>
        <g class="sparks"></g>`;
      Object.assign(this, { amb: q(g, ".amb"), frm: q(g, ".frm"), beads: q(g, ".beads"), cable: q(g, ".cable"), arm: q(g, ".arm"), torch: q(g, ".torch"), arc: q(g, ".arc"), flr: q(g, ".flr") });
      this.sparks = particles(q(g, ".sparks"), 50, { r: 1.3, color: ["#fdba74", "#fef3c7", "#fb923c"], spread: 2.8, speed: 130, g: 380, life: 0.5 });
      this.man = person(q(g, ".wld"), { shirt: "#a16207", pants: "#475569", mask: true, noArms: true });
      this.bed = { e: 162, f: 440 };
    },
    newCycle() {
      this.fr = pick(FRAMES, this.fr);
      this.frm.innerHTML = "";
      const m = el("g", { transform: "matrix(1 0 -0.35 0.45 162 440)" }, this.frm);
      for (const [a, b, c, d] of this.fr.seg) el("path", { d: `M${a} ${b} L${c} ${d}`, stroke: "#64748b", "stroke-width": 8, "stroke-linecap": "square" }, m);
      const hl = el("g", { transform: "translate(0 -2.5)" }, this.frm), m2 = el("g", { transform: "matrix(1 0 -0.35 0.45 162 440)" }, hl);
      for (const [a, b, c, d] of this.fr.seg) el("path", { d: `M${a} ${b} L${c} ${d}`, stroke: "#94a3b8", "stroke-width": 3 }, m2);
      this.beads.innerHTML = "";
      const js = [...this.fr.j].sort(() => Math.random() - 0.5).slice(0, Math.floor(rnd(4, 7)));
      js.sort((a, b) => a[0] - b[0]);
      this.plan = []; let t = 0.4;
      for (const j of js) { const mv = 0.7, wd = rnd(1.2, 2.2); this.plan.push({ j, t0: t, t1: t + mv, t2: t + mv + wd }); t += mv + wd; }
      this.total = t + 1.4;
      this.done = [];
      this.wx = this.wx ?? 170;
    },
    update(dt, vis) {
      const t = this.t;
      let cur = null, prev = null, arcOn = false, tgt;
      for (const p of this.plan) { if (t >= p.t0 && t < p.t2) cur = p; if (t >= p.t2) prev = p; }
      if (cur) {
        const from = prev ? P(this.bed, ...prev.j) : P(this.bed, 60, 60), to = P(this.bed, ...cur.j);
        const f = ease(seg(t, cur.t0, cur.t1));
        tgt = { x: lerp(from.x, to.x, f), y: lerp(from.y, to.y, f) };
        arcOn = t >= cur.t1;
        if (arcOn && !this.done.includes(cur)) { this.done.push(cur); const b = P(this.bed, ...cur.j); cur.bead = el("circle", { cx: b.x.toFixed(1), cy: b.y.toFixed(1), r: 3.4, fill: "#fdba74" }, this.beads); cur.bt = t; }
      } else tgt = prev ? P(this.bed, ...prev.j) : P(this.bed, 60, 60);
      this.arcOn = arcOn; this.nDone = this.plan.filter((p) => t >= p.t2).length;
      this.prog = this.nDone / this.plan.length;
      if (arcOn && dt > 0 && vis) { this.sparks.spawn(tgt.x, tgt.y); if (Math.random() < 0.7) this.sparks.spawn(tgt.x, tgt.y); }
      this.sparks.step(vis ? dt : 0);
      if (!vis) return;
      const wantX = tgt.x - 34, moving = Math.abs(wantX - this.wx) > 1;
      this.wx = lerp(this.wx, wantX, dt > 0 ? 1 - Math.exp(-dt * 5) : 1);
      this.ph = (this.ph || 0) + (moving ? dt * 9 : 0);
      set(this.man.g, "transform", `translate(${this.wx.toFixed(1)} 574)`);
      this.man.pose(this.ph, moving ? 20 : 0, { lean: 10 });
      const sh = { x: this.wx + 4, y: 574 - 80 };
      const hand = { x: tgt.x - 12, y: tgt.y - 12 };
      set(this.arm, "d", `M${sh.x.toFixed(1)} ${sh.y.toFixed(1)} L${hand.x.toFixed(1)} ${hand.y.toFixed(1)}`);
      set(this.torch, "d", `M${hand.x.toFixed(1)} ${hand.y.toFixed(1)} L${tgt.x.toFixed(1)} ${tgt.y.toFixed(1)}`);
      set(this.cable, "d", `M70 516 C90 470, ${(hand.x - 40).toFixed(1)} ${(hand.y + 60).toFixed(1)}, ${hand.x.toFixed(1)} ${hand.y.toFixed(1)}`);
      const fl = arcOn ? 0.55 + Math.random() * 0.45 : 0;
      set(this.arc, "cx", tgt.x.toFixed(1)); set(this.arc, "cy", tgt.y.toFixed(1)); set(this.arc, "r", arcOn ? (3 + Math.random() * 3).toFixed(1) : 0); set(this.arc, "opacity", arcOn ? 1 : 0);
      set(this.amb, "cx", tgt.x.toFixed(1)); set(this.amb, "cy", tgt.y.toFixed(1)); set(this.amb, "opacity", (fl * 0.8).toFixed(2));
      set(this.flr, "cx", tgt.x.toFixed(1)); set(this.flr, "cy", 562); set(this.flr, "opacity", (fl * 0.25).toFixed(2));
      if (this.man.g.visor) set(this.man.g.visor, "fill", arcOn ? "#10b981" : "#065f46");
      for (const p of this.done) if (p.bead) set(p.bead, "fill", mix("#fdba74", "#94a3b8", clamp((t - p.bt - (p.t2 - p.t1)) / 2.5, 0, 1)));
      const fo = t > this.total - 0.5 ? (1 - seg(t, this.total - 0.5, this.total)).toFixed(2) : 1;
      set(this.frm, "opacity", fo); set(this.beads, "opacity", fo);
    },
    readout() {
      return { status: this.arcOn ? [T("Kaynak yapıyor"), true] : this.prog >= 1 ? [T("İskelet hazır"), false] : [T("Sonraki dikişe geçiyor"), true], stats: [[T("Parça"), this.fr.n], [T("Dikiş"), `${this.nDone}/${this.plan.length}`], [T("Yöntem"), T("Gazaltı")], [T("Ark"), this.arcOn ? T("Açık") : T("Kapalı")]] };
    },
  });

  /* 10 · KUTU HARF · LED TEST */
  const WORDS = [
    { w: "eymen", sub: "REKLAM", c: "#fffaf0", sc: "#fb923c", fs: 74, fw: 700 },
    { w: T("KAFE"), sub: T("& PASTANE"), c: "#fde68a", sc: "#fffaf0", fs: 62, fw: 800 },
    { w: T("ECZANE"), sub: "", c: "#ef4444", sc: "#ef4444", fs: 54, fw: 800 },
    { w: T("BERBER"), sub: T("SALON"), c: "#e0f2fe", sc: "#38bdf8", fs: 54, fw: 800 },
    { w: T("MARKET"), sub: T("7/24 AÇIK"), c: "#fffaf0", sc: "#4ade80", fs: 54, fw: 800 },
    { w: T("OPTİK"), sub: T("GÖZLÜK"), c: "#c4b5fd", sc: "#fffaf0", fs: 60, fw: 800 },
  ];
  def({
    name: T("Kutu Harf · LED test"), short: T("Kutu harf"), link: L("/urunlerimiz/kutu-harf-tabela/"), linkText: T("Kutu harf tabela →"),
    desc: T("Montaja çıkmadan önce her harf atölyede yakılır, LED ve trafo kontrol edilir. Sonra İstanbul geneline kendi ekibimizle montaj."),
    total: 10, stillT: 6,
    build(g) {
      g.innerHTML = signSvg(this.no, T("KUTU HARF · LED TEST")) + `
        <path d="M84 440 L62 560 M84 440 L106 560 M316 440 L294 560 M316 440 L338 560 M70 520 H98 M302 520 H330" stroke="#475569" stroke-width="6" stroke-linecap="round"/>
        <ellipse class="halo" cx="200" cy="372" rx="200" ry="90" fill="url(#gHalo)" opacity="0"/>
        <rect x="26" y="302" width="348" height="140" rx="4" fill="#161f30" stroke="#2a364c" stroke-width="2"/>
        <circle cx="40" cy="316" r="2.5" fill="#475569"/><circle cx="360" cy="316" r="2.5" fill="#475569"/><circle cx="40" cy="428" r="2.5" fill="#475569"/><circle cx="360" cy="428" r="2.5" fill="#475569"/>
        <g class="ltr" font-family="Poppins, sans-serif" text-anchor="middle"></g>
        <g font-family="Poppins, sans-serif" font-weight="800" font-size="26" text-anchor="middle" letter-spacing="6"><text class="sb" x="202.5" y="427.5" fill="#0b111c"></text><text class="sf" x="200" y="425"></text></g>
        <path d="M200 442 C200 480, 250 470, 262 500" fill="none" stroke="#0b111c" stroke-width="3"/>
        <rect x="244" y="498" width="56" height="30" rx="3" fill="#334155" stroke="#475569"/>
        <text x="272" y="517" text-anchor="middle" font-family="ui-monospace, monospace" font-size="9" fill="#cbd5e1">12V DC</text><circle class="psu" cx="292" cy="506" r="2.5" fill="#4ade80"/>`;
      Object.assign(this, { ltr: q(g, ".ltr"), sb: q(g, ".sb"), sf: q(g, ".sf"), halo: q(g, ".halo"), psu: q(g, ".psu") });
    },
    newCycle() {
      this.v = pick(WORDS, this.v);
      this.ltr.innerHTML = "";
      this.faces = [];
      const y = this.v.sub ? 384 : 398;
      for (const ch of DIL === "ar" ? [this.v.w] : this.v.w) {
        const cg = el("g", {}, this.ltr);
        const mk = (fill, dx) => { const t = el("text", { x: 200, y, fill, "font-size": this.v.fs, "font-weight": this.v.fw, transform: `translate(${dx} ${dx})` }, cg); t.textContent = ch; return t; };
        mk("#0b111c", 4); mk("#1f2937", 2);
        this.faces.push({ g: cg, f: mk("#3b4658", 0) });
      }
      this.sb.textContent = this.v.sub; this.sf.textContent = this.v.sub;
      this.needLayout = true;
    },
    layout() {
      const w = this.faces.map((o) => o.f.getComputedTextLength());
      if (!w.every((v) => v > 0)) return;
      const gap = 7, total = w.reduce((a, b) => a + b, 0) + gap * (w.length - 1);
      const s = Math.min(1, 330 / total);
      let x = 200 - (total * s) / 2;
      this.faces.forEach((o, i) => {
        const cx = x + (w[i] * s) / 2;
        o.g.setAttribute("transform", s < 1 ? `translate(${cx} 0) scale(${s} 1) translate(-200 0)` : `translate(${cx - 200} 0)`);
        x += (w[i] + gap) * s;
      });
      this.needLayout = false;
    },
    update(dt, vis) {
      const t = this.t, n = this.faces.length;
      const lit = this.faces.map((_, i) => t > 0.8 + i * 0.42 && t < 8.6);
      const subT = 0.8 + n * 0.42 + 0.3;
      let subOn = !!this.v.sub && t > subT && t < 8.6;
      if (t > subT && t < subT + 0.4) subOn = subOn && Math.sin(t * 70) > 0;
      const cnt = lit.filter(Boolean).length + (this.v.sub && t > subT + 0.4 && t < 8.6 ? 1 : 0);
      this.cnt = cnt; this.tot = n + (this.v.sub ? 1 : 0); this.testing = t < 8.6;
      this.prog = cnt / this.tot;
      if (!vis) return;
      if (this.needLayout) this.layout();
      this.faces.forEach((o, i) => { set(o.f, "fill", lit[i] ? this.v.c : "#3b4658"); set(o.f, "filter", lit[i] ? "url(#fGlow)" : "none"); });
      set(this.sf, "fill", subOn ? this.v.sc : "#3a2a20"); set(this.sf, "filter", subOn ? "url(#fGlowSm)" : "none");
      set(this.halo, "opacity", (cnt / this.tot).toFixed(2));
      set(this.psu, "opacity", this.testing ? 1 : 0.3);
    },
    readout() { return { status: this.testing ? [T("Test sürüyor"), true] : [T("Test tamam"), false], stats: [[T("Tabela"), this.v.w.toLocaleUpperCase(LOC)], [T("Yanan"), `${this.cnt}/${this.tot}`], [T("Besleme"), "12 V DC"], [T("Garanti"), T("2 yıl")]] }; },
  });

  /* 11 · SHOWROOM · MONTAJ */
  const SHOPS = [[T("LİMON KAFE"), "#fde68a"], [T("ECZANE"), "#ef4444"], [T("OPTİK"), "#c4b5fd"], [T("ÇİÇEK EVİ"), "#f9a8d4"], [T("PİDE SALONU"), "#fdba74"], [T("KUAFÖR"), "#7dd3fc"], [TK("FIRIN (dükkân)", "FIRIN"), "#fef3c7"]];
  def({
    name: T("Showroom · Montaj"), short: T("Montaj"), link: L("/iletisim/"), linkText: T("Showroom'u ziyaret edin →"),
    desc: T("Showroom'daki örnek cephede montaj ekibi tabelayı makaslı platformla yükseltip yerine sabitliyor, sonra yakıyor."),
    total: 16, stillT: 12,
    build(g) {
      g.innerHTML = signSvg(this.no, T("SHOWROOM · MONTAJ")) + `
        <rect x="170" y="290" width="222" height="8" fill="#273349"/><rect x="170" y="298" width="222" height="262" fill="#1c2638"/>
        <rect x="182" y="312" width="200" height="60" fill="#111a2b" stroke="#2c3a52" stroke-width="2"/>
        <rect x="190" y="392" width="184" height="164" fill="#0b1628"/>
        <rect class="glow" x="190" y="392" width="184" height="164" fill="#fdba74" opacity="0"/>
        <path d="M250 392V556M312 392V556" stroke="#2c3a52" stroke-width="4"/><rect x="312" y="392" width="62" height="164" fill="none" stroke="#2c3a52" stroke-width="3"/><rect x="318" y="468" width="4" height="18" fill="#94a3b8"/>
        <path d="M196 400 L236 400 L196 470 Z M262 400 L282 400 L262 436 Z" fill="#fff" opacity=".04"/>
        <path class="sc" fill="none" stroke="#475569" stroke-width="5" stroke-linecap="round"/>
        <rect x="30" y="538" width="130" height="14" rx="2" fill="#f97316"/><circle cx="48" cy="556" r="6" fill="#111827"/><circle cx="142" cy="556" r="6" fill="#111827"/>
        <g class="plat"><rect x="26" y="-8" width="138" height="8" fill="#f97316"/><g class="crew"></g><path d="M30 -8 V-34 H160 V-8 M30 -22 H160" stroke="#fdba74" stroke-width="2.5" fill="none"/></g>
        <g class="pnl"><rect width="196" height="52" rx="3" fill="#0f172a" stroke="#334155" stroke-width="2"/><text class="pt" x="98" y="35" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="800" font-size="24" fill="#3b4658"></text>
          <g class="scr"><circle cx="6" cy="6" r="1.8" fill="#cbd5e1"/><circle cx="190" cy="6" r="1.8" fill="#cbd5e1"/><circle cx="6" cy="46" r="1.8" fill="#cbd5e1"/><circle cx="190" cy="46" r="1.8" fill="#cbd5e1"/></g></g>
        <circle class="dr" r="5" fill="#fff" opacity="0" filter="url(#fGlowSm)"/>`;
      Object.assign(this, { pnl: q(g, ".pnl"), pt: q(g, ".pt"), scr: q(g, ".scr"), dr: q(g, ".dr"), sc: q(g, ".sc"), plat: q(g, ".plat"), glow: q(g, ".glow") });
      this.man = person(q(g, ".crew"), { shirt: "#1e3a8a", pants: "#64748b", vest: "#f97316", helmet: "#f97316", skin: SKIN[0] });
      set(this.man.g, "transform", "translate(62 -8) scale(.92)");
    },
    newCycle() { this.shop = pick(SHOPS, this.shop); this.pt.textContent = this.shop[0]; this.pt.setAttribute("font-size", Math.min(24, 180 / (this.shop[0].length * 0.66)).toFixed(1)); },
    update(dt, vis) {
      const t = this.t;
      const H = t < 1 ? 24 : t < 4.5 ? lerp(24, 162, ease(seg(t, 1, 4.5))) : t < 7.8 ? 162 : t < 11.3 ? lerp(162, 24, ease(seg(t, 7.8, 11.3))) : 24;
      this.H = H; this.prog = seg(t, 0, 7.8);
      this.phase = t < 1 ? T("Hazırlık") : t < 4.5 ? T("Yükseliyor") : t < 5.7 ? T("Yerleştiriyor") : t < 7.2 ? T("Vidalıyor") : t < 7.8 ? T("Elektrik") : t < 11.3 ? T("İniyor") : T("Tamam");
      if (!vis) return;
      const py = 538 - H;
      set(this.plat, "transform", `translate(0 ${py.toFixed(1)})`);
      let d = ""; const st = 3, sh = H / st;
      for (let i = 0; i < st; i++) { const y0 = 538 - i * sh, y1 = 538 - (i + 1) * sh; d += `M44 ${y0.toFixed(1)} L146 ${y1.toFixed(1)} M146 ${y0.toFixed(1)} L44 ${y1.toFixed(1)} `; }
      set(this.sc, "d", d);
      let px, pyy;
      if (t < 4.5) { px = 84; pyy = py - 66; }
      else if (t < 5.7) { const f = ease(seg(t, 4.5, 5.7)); px = lerp(84, 184, f); pyy = lerp(538 - 162 - 66, 316, f); }
      else { px = 184; pyy = 316; }
      set(this.pnl, "transform", `translate(${px.toFixed(1)} ${pyy.toFixed(1)})`);
      set(this.pnl, "opacity", t > 15.2 ? (1 - seg(t, 15.2, 16)).toFixed(2) : t < 0.4 ? seg(t, 0, 0.4).toFixed(2) : 1);
      set(this.scr, "opacity", t > 5.7 ? 1 : 0);
      const lit = t > 7.2 && t < 15.2 && !(t < 7.6 && Math.sin(t * 60) < 0);
      set(this.pt, "fill", lit ? this.shop[1] : "#3b4658"); set(this.pt, "filter", lit ? "url(#fGlow)" : "none");
      set(this.glow, "opacity", lit ? 0.12 : 0);
      const di = t > 5.7 && t < 7.2 ? Math.min(3, Math.floor(seg(t, 5.7, 7.2) * 4)) : -1;
      if (di >= 0) { const pts = [[190, 322], [374, 322], [190, 362], [374, 362]][di]; set(this.dr, "cx", pts[0]); set(this.dr, "cy", pts[1]); set(this.dr, "opacity", Math.sin(t * 40) > 0 ? 0.9 : 0.3); } else set(this.dr, "opacity", 0);
      const reach = t > 4.5 && t < 7.4;
      this.man.pose(0, 0, { arms: reach ? -130 : t < 4.5 ? -60 : 0, armsB: reach ? -110 : t < 4.5 ? -60 : 0 });
    },
    readout() { return { status: [this.phase, this.phase !== T("Tamam")], stats: [[T("Tabela"), this.shop[0]], [T("Yükseklik"), fmt(this.H * 0.025) + " m"], [T("Adım"), this.phase], [T("Ekip"), T("2 kişi")]] }; },
  });

  /* EKİBİMİZ · 20 KİŞİ */
  def({
    name: T("Ekibimiz"), short: T("Ekip"), link: L("/hakkimizda/"), linkText: T("Hakkımızda →"),
    desc: T("Tasarımdan montaja her adımda kendi ekibimiz çalışıyor. Arada bir hep birlikte size el sallıyorlar."),
    total: 10, stillT: 1.9,
    build(g) {
      g.innerHTML = signSvg(this.no, T("EKİBİMİZ")) + `
        <rect x="50" y="294" width="300" height="48" rx="4" fill="#f97316"/>
        <text x="200" y="319" text-anchor="middle" ${PF} font-weight="800" font-size="17" fill="#fff" letter-spacing="1">${T("EYMEN REKLAM EKİBİ")}</text>
        <text x="200" y="334" text-anchor="middle" ${PF} font-weight="500" font-size="10" fill="#ffedd5">${T("2000'den beri · Pendik")}</text>
        <rect x="18" y="500" width="364" height="14" rx="2" fill="#334155"/><rect x="18" y="514" width="364" height="46" fill="#1e293b"/>
        <g class="back"></g><g class="front"></g>
        <g class="bub" opacity="0"><rect class="bb" y="-26" height="22" rx="11" fill="#fff"/><path d="M-5 -5 L0 4 L5 -5 Z" fill="#fff"/><text class="bt" y="-11" text-anchor="middle" ${PF} font-weight="700" font-size="11" fill="#0f172a"></text></g>`;
      Object.assign(this, { bub: q(g, ".bub"), bb: q(g, ".bb"), bt: q(g, ".bt") });
      const back = q(g, ".back"), front = q(g, ".front");
      this.team = [];
      for (let i = 0; i < 20; i++) {
        const row = i < 10 ? 0 : 1, k = i % 10;
        const p = person(row ? front : back, lookOf(i + 3));
        this.team.push({ p, x: row ? 30 + k * 36 : 46 + k * 34, y: row ? 572 : 502, sc: row ? 0.8 : 0.7, dir: (i * 7) % 3 === 0 ? -1 : 1, next: rnd(1, 9), wav: 0, ph: rnd(0, 6) });
      }
      [...this.team].sort((a, b) => a.x - b.x).forEach((m, i) => (m.ord = i));
    },
    newCycle() {
      this.bubM = pick(this.team, this.bubM);
      const msg = pick([T("Hoş geldiniz!"), T("Merhaba!"), T("Teklif alın!"), T("Kolay gelsin!"), T("Selam!")]);
      this.bt.textContent = msg;
      const w = msg.length * 6.6 + 18;
      this.bb.setAttribute("x", (-w / 2).toFixed(1)); this.bb.setAttribute("width", w.toFixed(1));
    },
    update(dt, vis) {
      const t = this.t;
      let any = false;
      for (const m of this.team) {
        m.next -= dt;
        if (m.next <= 0 && !m.wav) { m.wav = rnd(1.2, 2.2); m.next = rnd(4, 14); }
        if (m.wav) m.wav = Math.max(0, m.wav - dt);
        const s0 = 1 + m.ord * 0.09, big = t > s0 && t < s0 + 0.9, solo = m.wav > 0;
        if (big || solo) any = true;
        if (!vis) continue;
        const bob = big ? -Math.sin(((t - s0) / 0.9) * Math.PI) * 7 : 0;
        set(m.p.g, "transform", `translate(${m.x} ${(m.y + bob).toFixed(1)}) scale(${(m.dir * m.sc).toFixed(2)} ${m.sc})`);
        const wv = Math.sin(t * 14 + m.ph) * 18;
        m.p.pose(0, 0, big ? { arms: -160 + wv, armsB: -150 - wv } : solo ? { arms: -155 + wv, armsB: 6 } : { arms: Math.sin(t + m.ph) * 4, armsB: -Math.sin(t + m.ph) * 4 });
      }
      this.waving = any; this.prog = seg(t, 0, 10);
      if (!vis) return;
      const b = this.bubM, show = t > 4.5 && t < 7.5;
      set(this.bub, "opacity", show ? 1 : 0);
      if (show) set(this.bub, "transform", `translate(${b.x} ${(b.y - 100 * b.sc - 6).toFixed(1)})`);
    },
    readout() { const s = this.waving ? T("El sallıyor") : T("Poz veriyor"); return { status: [s, true], stats: [[T("Kuruluş"), "2000"], [T("Tecrübe"), T("{0} yıl", DENEYIM)], [T("Montaj"), T("Kendi ekibimiz")], [T("Durum"), s]] }; },
  });
  /* SEVKİYAT · RAMPA */
  const TRUCKS = [
    { n: T("Kamyon"), cab: "#f97316", t2: "REKLAM", sc: 1 },
    { n: T("Kamyonet"), cab: "#1d4ed8", t2: T("SEVKİYAT"), sc: 0.84 },
    { n: T("Montaj kamyonu"), cab: "#e2e8f0", t2: T("MONTAJ"), sc: 0.93 },
  ];
  const DEST = [T("Ankara"), T("İzmir"), T("Bursa"), T("Antalya"), T("Kocaeli"), T("Konya"), T("Adana"), T("Samsun"), T("Trabzon"), T("Kayseri"), T("Gaziantep"), T("Eskişehir")];
  def({
    key: "truck", name: T("Sevkiyat · Rampa"), short: T("Sevkiyat"), link: L("/kurumsal-cozumler/"), linkText: T("Kurumsal çözümler →"),
    desc: T("Biten işler kolilenip rampadan kamyona yüklenir, montaj ekibiyle birlikte Türkiye'nin dört bir yanına yola çıkar."),
    total: 22, stillT: 9,
    build(g) {
      const wheel = (x) => `<g transform="translate(${x} -8)"><circle r="14" fill="#0b1220"/><circle r="6" fill="#94a3b8"/><path class="sp" d="M0 -6 V6 M-6 0 H6" stroke="#334155" stroke-width="2"/></g>`;
      g.innerHTML = yardSvg(false) + `
        <rect x="-2" y="140" width="96" height="420" fill="#1c2638"/><path d="M0 170H92M0 200H92M0 230H92M0 260H92M0 290H92M0 320H92M0 350H92" stroke="#223049" stroke-width="2"/>
        <rect x="-2" y="132" width="100" height="10" fill="#273349"/>
        <rect x="12" y="396" width="72" height="104" fill="#3b3222"/><rect x="12" y="396" width="72" height="104" fill="#fde68a" opacity=".12"/>
        <path d="M12 396 H84" stroke="#475569" stroke-width="6"/>
        <text x="48" y="386" text-anchor="middle" ${PF} font-weight="700" font-size="10" fill="#fdba74">${T("RAMPA 2")}</text>
        <rect x="-2" y="500" width="100" height="60" fill="#334155"/>
        <path d="M-2 500 H98" stroke="#facc15" stroke-width="4" stroke-dasharray="10 10"/>
        <rect x="90" y="508" width="8" height="30" fill="#111827"/>
        <g class="boxes"></g>
        <g class="crew"></g>
        <g class="puffs"></g>
        <g class="truck" opacity="0"><g class="tsc">
          <rect x="-4" y="-24" width="266" height="9" fill="#111827"/>
          <rect x="0" y="-122" width="196" height="100" rx="3" fill="#f8fafc"/>
          <rect x="0" y="-44" width="196" height="9" fill="#f97316"/>
          <text x="96" y="-80" text-anchor="middle" ${PF} font-weight="700" font-size="26" fill="#64748b">eymen</text>
          <text class="t2" x="98" y="-56" text-anchor="middle" ${PF} font-weight="800" font-size="13" fill="#f97316" letter-spacing="4">REKLAM</text>
          <rect class="inside" x="1" y="-118" width="16" height="92" fill="#0f172a" opacity="0"/>
          <rect class="door" x="0" y="-120" width="5" height="96" fill="#cbd5e1"/>
          <path class="cab" d="M198 -22 V-98 H232 Q248 -98 254 -80 L262 -58 V-22 Z" fill="#f97316"/>
          <path d="M206 -92 H230 Q241 -92 246 -78 L251 -62 H206 Z" fill="#1e3a5f"/><path d="M210 -88 H218 L212 -66 H210 Z" fill="#fff" opacity=".15"/>
          <rect x="256" y="-44" width="6" height="8" rx="1" fill="#fef3c7"/>
          <rect class="rl" x="-4" y="-46" width="4" height="10" fill="#f8fafc" opacity="0"/><rect x="-4" y="-34" width="4" height="7" fill="#dc2626"/>
          ${wheel(34)}${wheel(62)}${wheel(226)}
          <text class="bip" x="-6" y="-132" ${PF} font-weight="800" font-size="11" fill="#facc15" opacity="0">${T("BİP BİP")}</text>
        </g></g>` + signSvg(this.no, T("SEVKİYAT · RAMPA"), true);
      Object.assign(this, { truck: q(g, ".truck"), tsc: q(g, ".tsc"), t2: q(g, ".t2"), inside: q(g, ".inside"), door: q(g, ".door"), cab: q(g, ".cab"), rl: q(g, ".rl"), bip: q(g, ".bip"), sps: [...g.querySelectorAll(".sp")] });
      this.puff = particles(q(g, ".puffs"), 24, { r: 5, color: ["#64748b", "#94a3b8"], spread: 1.2, speed: 30, g: -12, life: 1.1 });
      const bx = q(g, ".boxes");
      this.boxes = [[18, 478], [42, 478], [18, 456], [42, 456]].map(([x, y]) => { const b = el("g", {}, bx); el("rect", { width: 22, height: 22, rx: 1, fill: "#b7791f" }, b); el("rect", { x: 9, width: 4, height: 22, fill: "#d69e2e" }, b); return { b, x, y }; });
      this.man = person(q(g, ".crew"), { shirt: "#334155", vest: "#facc15", helmet: "#f97316", skin: SKIN[2] });
      this.wa = 0; this.ptx = 460; this.mx = 60;
    },
    newCycle() {
      this.v = pick(TRUCKS, this.v); this.dest = pick(DEST, this.dest);
      set(this.cab, "fill", this.v.cab); this.t2.textContent = this.v.t2;
      set(this.tsc, "transform", `scale(${this.v.sc})`);
    },
    update(dt, vis) {
      const T = this.t;
      let tx, op = 1, rev = false, drive = false;
      if (T < 0.5) { tx = 460; op = seg(T, 0, 0.5); rev = true; }
      else if (T < 4.5) { tx = lerp(460, 96, 1 - Math.pow(1 - seg(T, 0.5, 4.5), 2)); rev = true; }
      else if (T < 12.8) tx = 96;
      else if (T < 17) { const f = seg(T, 12.8, 17); tx = lerp(96, 760, f * f); drive = true; op = tx > 560 ? 1 - seg(tx, 560, 760) : 1; }
      else { tx = 760; op = 0; }
      this.loaded = this.boxes.filter((_, k) => T > 5.2 + k * 1.75 + 1.2 && T < 17.5).length;
      this.phase = T < 4.5 ? TR("Rampaya yanaşıyor") : T < 12.2 ? TR("Yükleniyor") : T < 12.8 ? TR("Kapak kapanıyor") : T < 17 ? TR("Yola çıktı") : TR("Sıradaki araç");
      this.prog = seg(T, 0, 17);
      if (!vis) { this.ptx = tx; this.puff.step(0); return; }
      set(this.truck, "transform", `translate(${tx.toFixed(1)} 560)`); set(this.truck, "opacity", op.toFixed(2));
      this.wa += ((tx - this.ptx) / 14) * 57.3; this.ptx = tx;
      for (const s of this.sps) set(s, "transform", `rotate(${(this.wa % 360).toFixed(0)})`);
      const open = T > 4.8 && T < 12.5;
      set(this.inside, "opacity", open ? 1 : 0); set(this.door, "opacity", open ? 0 : 1);
      set(this.rl, "opacity", rev && Math.floor(T * 3) % 2 ? 1 : 0);
      set(this.bip, "opacity", rev && T > 0.5 && Math.floor(T * 3) % 2 ? 1 : 0);
      if ((drive || rev) && dt > 0 && Math.random() < (drive ? 0.5 : 0.2)) this.puff.spawn(tx + 190 * this.v.sc, 548);
      this.puff.step(dt);
      let manX = 60, carry = false;
      this.boxes.forEach((o, k) => {
        const t0 = 5.2 + k * 1.75, t1 = t0 + 1.2;
        let x = o.x, y = o.y, opb = 1;
        if (T >= t0 && T < t1) { const f = ease(seg(T, t0, t1)); x = lerp(o.x, 104, f); y = lerp(o.y, 470, f); manX = x - 16; carry = true; }
        else if (T >= t1 && T < 17.5) { opb = 0; if (T < t1 + 0.55 && k < 3) manX = lerp(96, 60, seg(T, t1, t1 + 0.55)); }
        else if (T >= 17.5) opb = seg(T, 18, 19);
        set(o.b, "transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`); set(o.b, "opacity", opb.toFixed(2));
      });
      const moving = Math.abs(manX - this.mx) > 0.3;
      this.mdir = manX > this.mx ? 1 : manX < this.mx ? -1 : this.mdir || 1;
      this.mph = (this.mph || 0) + (moving ? dt * 9 : 0);
      this.mx = manX;
      set(this.man.g, "transform", `translate(${manX.toFixed(1)} 500) scale(${0.8 * this.mdir} .8)`);
      this.man.pose(this.mph, moving ? 22 : 0, carry ? { arms: -62, armsB: -58 } : {});
    },
    readout() { return { status: [this.phase, this.phase !== T("Sıradaki araç")], stats: [[T("Araç"), this.v.n], [T("Rota"), T("Pendik → {0}", this.dest)], [T("Yük"), T("{0}/4 koli", this.loaded)], [T("Durum"), this.phase]] }; },
  });
  /* TOTEM MONTAJI · VİNÇ */
  // Totem harfleri dikey tek tek dizilir; Arapçada harf bitişmediği için sözlükte Latin yazım kullanılır (bağlamlı anahtar)
  const TOTEMS = [{ w: TK("OTEL (totem)", "OTEL"), c: "#fde68a" }, { w: TK("AVM (totem)", "AVM"), c: "#fb923c" }, { w: TK("PLAZA (totem)", "PLAZA"), c: "#7dd3fc" }, { w: TK("KAFE (totem)", "KAFE"), c: "#fca5a5" }, { w: TK("SPA (totem)", "SPA"), c: "#c4b5fd" }];
  def({
    name: T("Totem Montajı · Vinç"), short: T("Totem"), link: L("/urunlerimiz/totem-tabela/"), linkText: T("Totem tabela →"),
    desc: T("Büyük totemler vinçle kaldırılır ve beton temele ankrajla oturtulur. İşaretçi usta vinci el işaretiyle yönlendiriyor."),
    total: 22, stillT: 18,
    build(g) {
      const wheel = (x) => `<circle cx="${x}" cy="540" r="13" fill="#0b1220"/><circle cx="${x}" cy="540" r="5" fill="#94a3b8"/>`;
      g.innerHTML = yardSvg(true) + `
        <rect x="384" y="120" width="20" height="440" fill="#1c2638"/>
        <polygon class="spot" points="300,240 236,556 364,556" fill="#fef3c7" opacity="0"/>
        <rect x="270" y="552" width="60" height="10" fill="#64748b"/><circle cx="284" cy="552" r="2" fill="#cbd5e1"/><circle cx="316" cy="552" r="2" fill="#cbd5e1"/>
        <rect x="160" y="600" width="18" height="10" fill="#92400e"/><rect x="316" y="600" width="18" height="10" fill="#92400e"/>
        <path d="M30 532 L14 560 M190 532 L206 560" stroke="#facc15" stroke-width="5"/><rect x="6" y="558" width="18" height="5" fill="#475569"/><rect x="198" y="558" width="18" height="5" fill="#475569"/>
        <rect x="18" y="520" width="182" height="14" fill="#111827"/>
        <path d="M18 520 V480 Q18 470 28 470 H58 Q64 470 64 478 V520 Z" fill="#f97316"/><path d="M24 478 H56 V498 H24 Z" fill="#1e3a5f"/>
        <rect x="64" y="500" width="136" height="20" fill="#ea580c"/>
        <text x="146" y="514" text-anchor="middle" ${PF} font-weight="700" font-size="9" fill="#fff" letter-spacing="1.5">${T("VİNÇ")}</text>
        ${wheel(46)}${wheel(150)}${wheel(178)}
        <rect x="96" y="482" width="34" height="20" rx="3" fill="#fb923c"/>
        <path class="cyl" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
        <path class="b1" stroke="#f97316" stroke-width="13" stroke-linecap="round"/>
        <path class="b2" stroke="#fdba74" stroke-width="8" stroke-linecap="round"/>
        <path class="cbl" stroke="#cbd5e1" stroke-width="1.5"/>
        <g class="tot"><path class="sl" d="M0 0 L-14 14 M0 0 L14 14" stroke="#cbd5e1" stroke-width="1.5"/>
          <rect x="-18" y="14" width="36" height="190" rx="3" fill="#111827" stroke="#334155" stroke-width="2"/>
          <rect x="-14" y="20" width="28" height="36" rx="2" fill="#1f2937"/><circle class="lc" cx="0" cy="38" r="10" fill="#3b4658"/>
          <g class="tl" ${PF} font-weight="800" font-size="20" text-anchor="middle"></g>
          <rect x="-22" y="200" width="44" height="6" fill="#64748b"/></g>
        <g class="hook"><circle r="5" fill="#facc15"/><path d="M0 5 V12 Q0 18 -5 16" stroke="#facc15" stroke-width="2.5" fill="none"/></g>
        <circle class="bolt" r="5" fill="#fff" filter="url(#fGlowSm)" opacity="0"/>
        <g class="crew"></g>` + signSvg(this.no, T("TOTEM MONTAJI · VİNÇ"), true);
      Object.assign(this, { spot: q(g, ".spot"), cyl: q(g, ".cyl"), b1: q(g, ".b1"), b2: q(g, ".b2"), cbl: q(g, ".cbl"), tot: q(g, ".tot"), sl: q(g, ".sl"), lc: q(g, ".lc"), tl: q(g, ".tl"), hook: q(g, ".hook"), bolt: q(g, ".bolt") });
      const crew = q(g, ".crew");
      this.sig = person(crew, { shirt: "#1e3a8a", vest: "#facc15", helmet: "#f8fafc", skin: SKIN[1] });
      set(this.sig.g, "transform", "translate(236 652) scale(-1 1)");
      this.rig = person(crew, { shirt: "#334155", vest: "#f97316", helmet: "#f97316", skin: SKIN[3] });
      set(this.rig.g, "transform", "translate(352 574) scale(-.9 .9)");
    },
    newCycle() {
      this.v = pick(TOTEMS, this.v);
      this.tl.innerHTML = "";
      this.letters = [...this.v.w].map((ch, i) => { const t = el("text", { x: 0, y: 84 + i * 26, fill: "#3b4658" }, this.tl); t.textContent = ch; return t; });
    },
    update(dt, vis) {
      const T = this.t, K2 = (a, b, f) => ({ x: lerp(a.x, b.x, f), y: lerp(a.y, b.y, f) });
      const REST = { x: 196, y: 478 }, UP = { x: 150, y: 150 }, SET = { x: 300, y: 150 };
      let tip, hook, ang = -90, att = true;
      if (T < 2) { tip = K2(REST, UP, ease(seg(T, 0, 2))); hook = { x: tip.x, y: tip.y + 20 }; }
      else if (T < 3.2) { tip = UP; hook = { x: 150, y: lerp(170, 582, ease(seg(T, 2, 3.2))) }; }
      else if (T < 4) { tip = UP; hook = { x: 150, y: 582 }; }
      else if (T < 8) { const f = ease(seg(T, 4, 8)); tip = UP; hook = { x: 150, y: lerp(582, 330, f) }; ang = lerp(-90, 0, f); }
      else if (T < 11) { const f = ease(seg(T, 8, 11)); tip = K2(UP, SET, f); hook = { x: tip.x, y: 330 }; ang = Math.sin(T * 3) * 5 * (1 - f); }
      else if (T < 13) { tip = SET; hook = { x: 300, y: lerp(330, 346, ease(seg(T, 11, 13))) }; ang = 0; }
      else if (T < 14.5) { tip = SET; hook = { x: 300, y: 346 }; ang = 0; }
      else { att = false; tip = K2(SET, REST, ease(seg(T, 14.5, 17.5))); hook = { x: tip.x, y: tip.y + lerp(196, 20, seg(T, 14.5, 15.8)) }; }
      this.hy = hook.y;
      const lit = T > 15.5 && T < 20.8 && !(T < 15.9 && Math.sin(T * 60) < 0);
      this.phase = T < 2 ? TR("Bom kalkıyor") : T < 4 ? TR("Kanca bağlanıyor") : T < 8 ? TR("Kaldırıyor") : T < 11 ? TR("Taşıyor") : T < 13 ? TR("İndiriyor") : T < 14.5 ? TR("Ankraj vidalanıyor") : T < 15.5 ? TR("Kanca çözüldü") : T < 20.8 ? TR("Totem yanıyor") : TR("Sıradaki totem");
      this.prog = seg(T, 0, 15.5);
      if (!vis) return;
      const pv = { x: 112, y: 484 }, mid = K2(pv, tip, 0.55), m2 = K2(pv, tip, 0.5), c3 = K2(pv, tip, 0.3);
      set(this.b1, "d", `M${pv.x} ${pv.y} L${mid.x.toFixed(1)} ${mid.y.toFixed(1)}`);
      set(this.b2, "d", `M${m2.x.toFixed(1)} ${m2.y.toFixed(1)} L${tip.x.toFixed(1)} ${tip.y.toFixed(1)}`);
      set(this.cyl, "d", `M106 500 L${c3.x.toFixed(1)} ${c3.y.toFixed(1)}`);
      set(this.cbl, "d", `M${tip.x.toFixed(1)} ${tip.y.toFixed(1)} L${hook.x.toFixed(1)} ${hook.y.toFixed(1)}`);
      set(this.hook, "transform", `translate(${hook.x.toFixed(1)} ${hook.y.toFixed(1)})`);
      let pos, a;
      if (T < 3.2) { pos = { x: 150, y: 582 }; a = -90; } else if (att) { pos = hook; a = ang; } else { pos = { x: 300, y: 346 }; a = 0; }
      set(this.tot, "transform", `translate(${pos.x.toFixed(1)} ${pos.y.toFixed(1)}) rotate(${a.toFixed(1)})`);
      set(this.tot, "opacity", T < 0.6 ? seg(T, 0, 0.6).toFixed(2) : T > 20.8 ? (1 - seg(T, 20.8, 22)).toFixed(2) : 1);
      set(this.sl, "opacity", T > 3.2 && T < 14.5 ? 1 : 0);
      for (const l of this.letters) { set(l, "fill", lit ? this.v.c : "#3b4658"); set(l, "filter", lit ? "url(#fGlowSm)" : "none"); }
      set(this.lc, "fill", lit ? this.v.c : "#3b4658");
      set(this.spot, "opacity", lit ? 0.07 : 0);
      const bi = T > 13 && T < 14.5 ? Math.floor(T * 4) % 2 : -1;
      set(this.bolt, "opacity", bi >= 0 && Math.sin(T * 40) > 0 ? 0.9 : 0);
      if (bi >= 0) { set(this.bolt, "cx", bi ? 316 : 284); set(this.bolt, "cy", 552); }
      const crane = T < 17.5, wv = Math.sin(T * 6) * 20;
      this.sig.pose(0, 0, crane ? { arms: -150 + wv, armsB: T > 8 && T < 13 ? -90 : 10 } : { arms: 4, armsB: -4 });
      this.rig.pose(0, 0, T > 12 && T < 14.6 ? { arms: -40 + Math.sin(T * 20) * 6, armsB: -30 } : T > 15.5 && T < 17 ? { arms: -155 + wv, armsB: 6 } : { arms: 2, armsB: -2 });
    },
    readout() { return { status: [this.phase, this.phase !== T("Sıradaki totem")], stats: [[T("Totem"), this.v.w], [T("Kanca"), fmt(Math.max(0, (560 - this.hy) * 0.03)) + " m"], [T("Adım"), this.phase], [T("Temel"), T("Beton · ankraj")]] }; },
  });
  /* ---------- Sahne kurulumu ---------- */
  const N = stations.length, W = N * SW;
  const stG = $("uh-stations");
  stations.forEach((s, i) => {
    s.i = i; s.x = i * SW; s.no = String(i + 1).padStart(2, "0");
    s.g = el("g", {}, stG);
    s.build(s.g);
    el("rect", { class: "hit", x: 0, y: 150, width: 400, height: 470, "data-st": i }, s.g);
    s.sign = q(s.g, ".sign");
  });
  const truckSt = stations.find((s) => s.key === "truck"); if (truckSt) stG.appendChild(truckSt.g);
  const bgW = $("uh-bgWall"), bgF = $("uh-bgFloor");
  for (let p = 0; p < 7; p++) {
    const b = p * SW;
    el("path", { d: `M${b} 30V500M${b + 100} 30V500M${b + 200} 30V500M${b + 300} 30V500`, stroke: "#152036", "stroke-width": 2 }, bgW);
    el("rect", { x: b + 150, y: 58, width: 100, height: 44, fill: "#0a1730", stroke: "#1d2940", "stroke-width": 3 }, bgW);
    el("path", { d: `M${b + 200} 58V102M${b + 150} 80H${b + 250}`, stroke: "#1d2940", "stroke-width": 2 }, bgW);
    el("circle", { cx: b + 166, cy: 68, r: 1, fill: "#e2e8f0" }, bgW); el("circle", { cx: b + 228, cy: 90, r: 0.8, fill: "#e2e8f0" }, bgW); el("circle", { cx: b + 214, cy: 66, r: 1.1, fill: "#fef3c7" }, bgW);
    let z = `M${b} 26`; for (let x = 0; x < 400; x += 20) z += ` L${b + x + 10} 6 L${b + x + 20} 26`;
    el("path", { d: z, fill: "none", stroke: "#1a2436", "stroke-width": 2 }, bgW);
    for (const lx of [b + 100, b + 300]) {
      el("polygon", { points: `${lx - 14},146 ${lx + 14},146 ${lx + 120},560 ${lx - 120},560`, fill: "url(#gCone)" }, bgW);
      el("path", { d: `M${lx} 30V124`, stroke: "#243047", "stroke-width": 1.5 }, bgW);
      el("path", { d: `M${lx - 8} 124 H${lx + 8} L${lx + 18} 146 H${lx - 18} Z`, fill: "#1f2937" }, bgW);
      el("ellipse", { cx: lx, cy: 146, rx: 16, ry: 3, fill: "#fff4dc", opacity: 0.9 }, bgW);
    }
    for (let x = 0; x < 400; x += 50) { el("rect", { x: b + x, y: 574, width: 26, height: 3, fill: "#eab308", opacity: 0.28 }, bgF); el("rect", { x: b + x + 12, y: 692, width: 26, height: 3, fill: "#eab308", opacity: 0.2 }, bgF); }
  }

  /* ---------- Ekip ve kedi ---------- */
  const actors = $("uh-actors");
  const CREW = [
    { shirt: "#1e3a8a", vest: "#f97316", helmet: "#f8fafc", skin: SKIN[0] },
    { shirt: "#334155", vest: "#facc15", helmet: "#f97316", skin: SKIN[2] },
    { shirt: "#7c2d12", helmet: "#facc15", skin: SKIN[1] },
    { shirt: "#0f766e", vest: "#f97316", hair: "#3b2314", skin: SKIN[3] },
    { shirt: "#475569", helmet: "#f8fafc", skin: SKIN[1] },
    { shirt: "#1d4ed8", vest: "#facc15", helmet: "#f97316", skin: SKIN[0] },
    { shirt: "#be123c", hair: "#1f130c", skin: SKIN[2] },
    lookOf(20), lookOf(21), lookOf(22), lookOf(25), lookOf(27),
  ];
  const walkers = CREW.map((o, i) => {
    const y = 596 + i * 4;
    return { o, y, sc: 0.82 + (y - 596) / 260, x: rnd(0, W), dir: 1, speed: 45, state: "idle", timer: 0, ph: rnd(0, 6), item: null };
  });
  for (const w of walkers) w.p = person(actors, w.o);
  function giveItem(w) {
    w.p.carry.innerHTML = "";
    w.item = Math.random() < 0.55 ? pick(Object.keys(ITEMS)) : null;
    if (w.item) ITEMS[w.item](w.p.carry, pick(["#f97316", "#1d4ed8", "#dc2626", "#16a34a"]));
  }
  function nextTarget(w) {
    const s = stations[Math.floor(Math.random() * N)];
    let tx = s.x + rnd(40, 360);
    tx += W * Math.round((w.x - tx) / W);
    if (Math.abs(tx - w.x) > 1500) tx = w.x + rnd(-600, 600);
    w.target = tx; w.run = Math.random() < 0.28; w.speed = w.run ? rnd(105, 135) : rnd(38, 56);
    w.state = "walk"; giveItem(w);
  }
  const cat = { x: 640, y: 654, dir: 1, state: "sit", timer: 3, ph: 0, speed: 30, zt: 0 };
  {
    const g = el("g", {}, actors);
    const walk = el("g", {}, g), sit = el("g", {}, g), sleep = el("g", {}, g);
    const legs = [-9, -4, 7, 12].map((x) => { const l = el("g", {}, walk); el("path", { d: `M${x} -8 V0`, stroke: "#d97706", "stroke-width": 2.8, "stroke-linecap": "round" }, l); return { l, x }; });
    const tail = el("path", { d: "M-14 -12 C-24 -14, -27 -24, -23 -31", stroke: "#f59e0b", "stroke-width": 3.4, fill: "none", "stroke-linecap": "round" }, walk);
    el("ellipse", { cx: 0, cy: -12, rx: 15, ry: 6.8, fill: "#f59e0b" }, walk);
    el("path", { d: "M-6 -18 q2 5 0 11 M0 -18.6 q2 5 0 11 M6 -18 q2 5 0 11", stroke: "#b45309", "stroke-width": 1.6, fill: "none" }, walk);
    el("circle", { cx: 15, cy: -18, r: 6.2, fill: "#f59e0b" }, walk);
    el("path", { d: "M10.5 -22 L11.5 -29 L15.5 -23.5 Z M16 -23.5 L20 -29 L20.5 -21.5 Z", fill: "#f59e0b" }, walk);
    el("circle", { cx: 18.2, cy: -19, r: 1, fill: "#111827" }, walk); el("circle", { cx: 21, cy: -17, r: 0.9, fill: "#f472b6" }, walk);
    el("path", { d: "M-6 -2 C-17 0, -19 -9, -11 -10", stroke: "#f59e0b", "stroke-width": 3.2, fill: "none", "stroke-linecap": "round" }, sit);
    el("ellipse", { cx: 1, cy: -13, rx: 8.5, ry: 12, fill: "#f59e0b" }, sit);
    el("path", { d: "M-3 -21 q2 4 0 9 M3 -21 q2 4 0 9", stroke: "#b45309", "stroke-width": 1.5, fill: "none" }, sit);
    el("path", { d: "M5 -8 V0", stroke: "#d97706", "stroke-width": 3, "stroke-linecap": "round" }, sit);
    const sitHead = el("g", {}, sit);
    el("circle", { cx: 6, cy: -28, r: 6.2, fill: "#f59e0b" }, sitHead);
    el("path", { d: "M1.5 -32 L2.5 -39 L6.5 -33.5 Z M7 -33.5 L11 -39 L11.5 -31.5 Z", fill: "#f59e0b" }, sitHead);
    el("circle", { cx: 9, cy: -29, r: 1, fill: "#111827" }, sitHead);
    el("path", { d: "M-10 -3 C-22 -2, -20 -14, -8 -12", stroke: "#f59e0b", "stroke-width": 3.2, fill: "none", "stroke-linecap": "round" }, sleep);
    el("ellipse", { cx: 0, cy: -6, rx: 13, ry: 6.5, fill: "#f59e0b" }, sleep);
    el("path", { d: "M-5 -11 q2 3 0 7 M1 -12 q2 3 0 7", stroke: "#b45309", "stroke-width": 1.5, fill: "none" }, sleep);
    el("circle", { cx: 10, cy: -7, r: 5.5, fill: "#f59e0b" }, sleep);
    el("path", { d: "M6 -11 L7 -16 L10 -12 Z M11 -12 L14 -16 L14.5 -10 Z", fill: "#f59e0b" }, sleep);
    el("path", { d: "M11 -7 q1.5 1 3 0", stroke: "#111827", "stroke-width": 0.8, fill: "none" }, sleep);
    const z = el("text", { x: 14, y: -20, "font-family": "Poppins, sans-serif", "font-weight": 700, "font-size": 10, fill: "#e2e8f0" }, sleep); z.textContent = "z";
    Object.assign(cat, { g, walk, sit, sleep, legs, tail, z, sitHead });
  }
  const CAT_TXT = { walk: T("Geziniyor"), run: T("Kaçıyor!"), sit: T("Oturuyor"), sleep: T("Uyuyor"), follow: T("Peşinde"), catch: T("Koşarak geliyor") };

  /* ---------- Kamera ---------- */
  let camX = 0, vw = 1600, aspect = 2.5, sel = -1, manualUntil = 0, now = 0, vb = 690;
  const wide = () => aspect >= 1.6;
  const autoW = () => (wide() ? 1600 : 440);
  const focusW = () => (wide() ? 1100 : 440);
  const wrapD = (d) => mod(d + W / 2, W) - W / 2;
  const sx = (x) => mod(x - camX + 400, W) - 400;
  function measure() { const r = view.getBoundingClientRect(); if (r.width && r.height) aspect = r.width / r.height; }
  function camStep(dt, instant) {
    const a = instant ? 1 : 1 - Math.exp(-dt * 3.5);
    vw = lerp(vw, sel >= 0 ? focusW() : autoW(), a);
    if (sel >= 0) camX += wrapD(stations[sel].x + 200 - vw / 2 - camX) * a;
    else if (now > manualUntil && !reduce) camX += (wide() ? 36 : 26) * dt;
    camX = mod(camX, W);
    const vh = vw / aspect, cy = !wide() ? 445 : sel >= 0 ? 440 : 370;
    const y = clamp(cy - vh / 2, 0, 720 - vh);
    vb = y + vh;
    set(svg, "viewBox", `0 ${y.toFixed(1)} ${vw.toFixed(1)} ${vh.toFixed(1)}`);
    const off = (-mod(camX, SW) - SW).toFixed(1);
    set(bgW, "transform", `translate(${off} 0)`); set(bgF, "transform", `translate(${off} 0)`);
  }

  /* ---------- Simülasyon ---------- */
  function simulate(dt) {
    for (const s of stations) {
      s.t += dt;
      if (s.t >= s.total) { s.t -= s.total; s.newCycle(); }
      const x = sx(s.x), vis = x > -410 && x < vw + 10;
      if (vis !== s.vis) { s.vis = vis; s.g.setAttribute("visibility", vis ? "visible" : "hidden"); }
      if (vis) set(s.g, "transform", `translate(${x.toFixed(1)} 0)`);
      s.update(dt, vis);
    }
    for (const w of walkers) {
      if (w.state === "walk") {
        const d = w.target - w.x, st = Math.sign(d) * w.speed * dt;
        w.dir = Math.sign(d) || w.dir;
        if (Math.abs(d) <= Math.abs(st)) { w.x = w.target; w.state = "idle"; w.timer = rnd(1.5, 5.5); w.wave = Math.random() < 0.25; }
        else w.x += st;
        w.ph += dt * w.speed * 0.11;
      } else if ((w.timer -= dt) <= 0) nextTarget(w);
      const x = sx(w.x), vis = x > -60 && x < vw + 60;
      if (vis !== w.vis) { w.vis = vis; w.p.g.setAttribute("visibility", vis ? "visible" : "hidden"); }
      if (!vis) continue;
      set(w.p.g, "transform", `translate(${x.toFixed(1)} ${w.y}) scale(${(w.dir * w.sc).toFixed(3)} ${w.sc.toFixed(3)})`);
      const walking = w.state === "walk", amp = walking ? (w.run ? 38 : 24) : 0;
      const carry = w.item && w.item !== "tools";
      w.p.pose(w.ph, amp, { lean: w.run && walking ? 7 : 0, ...(carry ? { arms: -62, armsB: -58 } : walking ? {} : w.wave ? { arms: -155 + Math.sin(now * 14 + w.y) * 18, armsB: 4 } : { arms: Math.sin(now * 2 + w.y) * 10 - 10, armsB: 4 }) });
    }
    cat.timer -= dt;
    {
      const cx0 = sx(cat.x), L = vw * 0.08, R = vw * 0.92;
      if (cx0 < -60 || cx0 > vw + 60) { cat.x = mod(camX + (cx0 < vw / 2 ? -30 : vw + 30), W); cat.state = "catch"; cat.target = rnd(vw * 0.3, vw * 0.7); cat.speed = 120; }
      else if ((cx0 < L || cx0 > R) && cat.state !== "catch" && !reduce) { cat.state = "catch"; cat.target = rnd(vw * 0.35, vw * 0.75); cat.speed = cat.state === "sleep" ? 70 : 85; }
      if (cat.state === "follow" && cat.buddy) { const bx = sx(cat.buddy.x); if (bx < L || bx > R) { cat.state = "sit"; cat.timer = rnd(2, 4); } }
    }
    const runner = walkers.find((w) => w.state === "walk" && w.run && Math.abs(wrapD(w.x - cat.x)) < 50);
    if (runner && cat.state !== "run" && cat.state !== "sleep" && cat.state !== "catch" && sx(cat.x) > vw * 0.3 && sx(cat.x) < vw * 0.7) { cat.state = "run"; cat.dir = Math.sign(wrapD(cat.x - runner.x)) || 1; cat.timer = 1.4; cat.speed = 125; }
    if (cat.timer <= 0 && cat.state !== "catch") {
      const r = Math.random();
      if (r < 0.3) { cat.state = "sit"; cat.timer = rnd(2.5, 6); }
      else if (r < 0.45) { cat.state = "sleep"; cat.timer = rnd(7, 13); }
      else if (r < 0.65) { cat.state = "follow"; cat.buddy = pick(walkers); cat.timer = rnd(6, 10); cat.speed = 48; }
      else { cat.state = "walk"; cat.dir = Math.random() < 0.5 ? -1 : 1; cat.timer = rnd(3, 7); cat.speed = 32; }
    }
    let moving = false;
    if (cat.state === "catch") {
      const d = cat.target - sx(cat.x);
      if (Math.abs(d) < 8) { cat.state = "sit"; cat.timer = rnd(2.5, 6); }
      else { cat.dir = Math.sign(d); cat.x += cat.dir * cat.speed * dt; moving = dt > 0; }
    } else if (cat.state === "walk" || cat.state === "run") { cat.x += cat.dir * cat.speed * dt; moving = dt > 0; }
    else if (cat.state === "follow") {
      const d = wrapD(cat.buddy.x - 36 * cat.buddy.dir - cat.x);
      if (Math.abs(d) > 6) { cat.dir = Math.sign(d); cat.x += cat.dir * Math.min(Math.abs(d), 60 * dt * (Math.abs(d) > 120 ? 2.2 : 1)); moving = dt > 0; }
    }
    cat.x = mod(cat.x, W);
    cat.ph += dt * (cat.state === "run" || cat.state === "catch" ? 18 : 9);
    set(cat.g, "transform", `translate(${sx(cat.x).toFixed(1)} ${(vb - 14).toFixed(1)}) scale(${cat.dir * 1.35} 1.35)`);
    const mode = moving ? "walk" : cat.state === "sleep" ? "sleep" : "sit";
    set(cat.walk, "display", mode === "walk" ? "inline" : "none"); set(cat.sit, "display", mode === "sit" ? "inline" : "none"); set(cat.sleep, "display", mode === "sleep" ? "inline" : "none");
    if (mode === "walk") {
      const A = cat.state === "run" || cat.state === "catch" ? 32 : 22;
      cat.legs.forEach((l, i) => set(l.l, "transform", `rotate(${(Math.sin(cat.ph + (i % 2 ? Math.PI : 0) + (i > 1 ? 1.2 : 0)) * A).toFixed(1)} ${l.x} -8)`));
      set(cat.tail, "transform", `rotate(${(Math.sin(cat.ph * 0.5) * 10 + (cat.state === "run" ? 30 : 0)).toFixed(1)} -14 -12)`);
    } else if (mode === "sit") set(cat.sitHead, "transform", `rotate(${(Math.sin(now * 0.8) * 6).toFixed(1)} 6 -22)`);
    else { cat.zt = (cat.zt + dt) % 2; set(cat.z, "transform", `translate(${(cat.zt * 3).toFixed(1)} ${(-cat.zt * 6).toFixed(1)})`); set(cat.z, "opacity", (1 - cat.zt / 2).toFixed(2)); }
    cat.status = CAT_TXT[moving ? (cat.state === "follow" ? "follow" : cat.state === "run" ? "run" : cat.state === "catch" ? "catch" : "walk") : cat.state === "sleep" ? "sleep" : "sit"];
  }

  /* ---------- Konsol ---------- */
  const tabsEl = $("uh-tabs");
  const mkTab = (i, no, label) => { const b = document.createElement("button"); b.type = "button"; b.className = "station-tab"; b.dataset.st = i; b.setAttribute("aria-pressed", i === -1 ? "true" : "false"); b.innerHTML = `<span class="no">${no}</span>${label}` + (i >= 0 ? `<span class="mini"><i></i></span>` : ""); tabsEl.appendChild(b); return b; };
  const tabs = [mkTab(-1, "00", T("Tüm atölye")), ...stations.map((s, i) => mkTab(i, String(i + 1).padStart(2, "0"), s.short))];
  const minis = stations.map((_, i) => q(tabs[i + 1], ".mini i"));
  const roTitle = $("uh-roTitle"), roStatus = $("uh-roStatus"), roDesc = $("uh-roDesc"), roBar = $("uh-roBar"), roLink = $("uh-roLink");
  const cells = [...$("uh-roStats").children].map((d) => ({ dt: d.querySelector("dt"), dd: d.querySelector("dd") }));
  const txt = (n, v) => { if (n.textContent !== v) n.textContent = v; };
  // Klavye odağı bağlantıdayken hedefi değiştirme (Enter'a basan başka sayfaya gitmesin)
  let bekleyenLink = null;
  const setLink = (s) => { if (document.activeElement === roLink) { bekleyenLink = s; return; } roLink.href = s.link; txt(roLink, s.linkText); };
  roLink.addEventListener("blur", () => { if (bekleyenLink) { const s = bekleyenLink; bekleyenLink = null; setLink(s); } });
  const TF = new Intl.DateTimeFormat("tr-TR", { timeZone: "Europe/Istanbul", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  const istTime = () => { const p = TF.formatToParts(new Date()); const g = (t) => +p.find((x) => x.type === t).value; return [g("hour"), g("minute"), g("second")]; };
  // Mesai (site-data.ts → data-*): Pzt–Cum açılış–kapanış, İstanbul saati
  const hm = (v, d) => { const m = /^(\d{1,2}):(\d{2})$/.exec(v || d); return +m[1] * 60 + +m[2]; };
  const ACILIS = hm(root.dataset.acilis, "08:30"), KAPANIS = hm(root.dataset.kapanis, "18:30");
  const saatYaz = (dk) => `${String(Math.floor(dk / 60)).padStart(2, "0")}:${String(dk % 60).padStart(2, "0")}`;
  const GF = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Istanbul", weekday: "short" });
  const GUN = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0 };
  function mesai(h, m) {
    const g = GUN[GF.format(new Date())], dk = h * 60 + m, isGunu = g >= 1 && g <= 5;
    if (isGunu && dk >= ACILIS && dk < KAPANIS) return [T("Açığız · {0}'a kadar", saatYaz(KAPANIS)), true];
    const bugunAcilacak = isGunu && dk < ACILIS;
    const ne = bugunAcilacak ? T("bugün") : g >= 1 && g <= 4 ? T("yarın") : T("pazartesi");
    return [T("Şu an kapalıyız · {0} {1}", ne, saatYaz(ACILIS)), false];
  }
  let lastNear = -2, shownKey = null;
  // Sekme şeridini kendiliğinden kaydırma: ilk kullanıcı etkileşimine ya da 6 sn'ye kadar bekler
  // (erken programatik kaydırma tarayıcının LCP ölçümünü keser → mobil Lighthouse "NO_LCP"),
  // kullanıcı şeridi elle kaydırdıysa 6 sn dokunmaz.
  let tabsAutoOK = false, tabsManualUntil = 0;
  const tabsAc = () => { tabsAutoOK = true; };
  ["pointerdown", "keydown", "wheel", "touchstart"].forEach((t) => addEventListener(t, tabsAc, { once: true, passive: true }));
  setTimeout(tabsAc, 6000);
  ["pointerdown", "wheel", "touchstart"].forEach((t) => tabsEl.addEventListener(t, () => { tabsManualUntil = performance.now() + 6000; }, { passive: true }));
  const nearest = () => Math.floor(mod(camX + vw / 2, W) / SW);
  function updateConsole() {
    stations.forEach((s, i) => (minis[i].style.width = (clamp(s.prog, 0, 1) * 100).toFixed(0) + "%"));
    const near = nearest();
    if (near !== lastNear) {
      lastNear = near;
      tabs.forEach((b, i) => b.classList.toggle("now", sel < 0 && i - 1 === near));
      const b = tabs[near + 1];
      if (sel < 0 && b && tabsAutoOK && performance.now() > tabsManualUntil) {
        // Yön bağımsız ortalama: RTL'de scrollLeft negatif olduğu için offsetLeft hesabı bozulur
        const tr_ = tabsEl.getBoundingClientRect(), br = b.getBoundingClientRect();
        tabsEl.scrollBy({ left: (br.left + br.width / 2) - (tr_.left + tr_.width / 2), behavior: reduce ? "auto" : "smooth" });
      }
    }
    const [h, m, s] = istTime();
    stations[0].tickClock(h, m, s);
    if (sel < 0) {
      const ns = stations[near];
      const key = "all" + near;
      if (shownKey !== key) { shownKey = key; txt(roTitle, T("Atölye turu")); txt(roDesc, T("Atölyemizin temsili turu; şu an {0} önündeyiz. Sürükleyerek gezinebilir, bir istasyona dokunup yakından izleyebilirsiniz.", ns.name.split(" ·")[0])); setLink(ns); }
      const [ms, acik] = mesai(h, m);
      txt(roStatus, ms); roStatus.classList.toggle("idle", !acik);
      const r = ns.readout();
      [[T("Şu an"), r.status[0]], [T("Kedi"), cat.status], [T("İstasyon"), `${near + 1} / ${N}`], [T("Mesai (Pzt–Cum)"), `${saatYaz(ACILIS)}–${saatYaz(KAPANIS)}`]].forEach((c, i) => { txt(cells[i].dt, c[0]); txt(cells[i].dd, c[1]); });
      roBar.style.width = (clamp(ns.prog, 0, 1) * 100).toFixed(1) + "%";
      return;
    }
    const st = stations[sel], r = st.readout();
    if (shownKey !== sel) { shownKey = sel; txt(roTitle, st.name); txt(roDesc, st.desc); setLink(st); }
    txt(roStatus, r.status[0]); roStatus.classList.toggle("idle", !r.status[1]);
    r.stats.forEach((c, i) => { txt(cells[i].dt, c[0]); txt(cells[i].dd, c[1]); });
    roBar.style.width = (clamp(st.prog, 0, 1) * 100).toFixed(1) + "%";
  }
  function redrawStill() { camStep(0, true); simulate(0); updateConsole(); }
  function select(i) {
    sel = i;
    tabs.forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.st) === sel)));
    stations.forEach((s, n) => s.sign.classList.toggle("sel", n === sel));
    lastNear = -2;
    if (reduce || !raf) redrawStill();
  }
  tabs.forEach((b) => b.addEventListener("click", () => select(Number(b.dataset.st))));

  let drag = null;
  svg.addEventListener("pointerdown", (e) => { if (e.pointerType === "mouse" && e.button !== 0) return; drag = { x: e.clientX, cam: camX, moved: false, id: e.pointerId, target: e.target }; });
  svg.addEventListener("pointermove", (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    if (e.pointerType === "mouse" && !(e.buttons & 1)) { svg.classList.remove("dragging"); drag = null; return; }
    const dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) > 6) { drag.moved = true; svg.classList.add("dragging"); try { svg.setPointerCapture(e.pointerId); } catch (_) {} if (sel >= 0) select(-1); }
    if (drag.moved) { camX = mod(drag.cam - dx * (vw / svg.getBoundingClientRect().width), W); manualUntil = now + 2.5; if (reduce || !raf) redrawStill(); }
  });
  svg.addEventListener("pointerup", () => {
    if (!drag) return;
    if (!drag.moved) { const h = drag.target.closest && drag.target.closest(".hit"); if (h) { const i = Number(h.dataset.st); select(sel === i ? -1 : i); } }
    svg.classList.remove("dragging"); drag = null;
  });
  const dragBitir = () => { svg.classList.remove("dragging"); drag = null; };
  svg.addEventListener("pointercancel", dragBitir);
  svg.addEventListener("lostpointercapture", () => { if (drag && drag.moved) dragBitir(); });
  svg.addEventListener("contextmenu", dragBitir);

  /* ---------- Başlat ---------- */
  stations.forEach((s) => { s.newCycle(); s.t = reduce ? s.stillT : rnd(0, s.total * 0.8); });
  walkers.forEach((w) => { w.timer = rnd(0, 2); giveItem(w); });
  if (reduce) { cat.state = "sleep"; cat.timer = 1e9; walkers.forEach((w) => (w.timer = 1e9)); }

  let raf = 0, last = 0, visible = true, uiT = 1;
  function frame(ts) {
    const dt = last ? Math.min(0.05, (ts - last) / 1000) : 0;
    last = ts; now += dt;
    camStep(dt, false);
    simulate(dt);
    uiT += dt;
    if (uiT > 0.15) { uiT = 0; updateConsole(); }
    raf = requestAnimationFrame(frame);
  }
  let paused = false;
  try { paused = localStorage.getItem("uh-durdur") === "1"; } catch (_) {}
  // Döngü dururken CSS animasyonları (duman, yanıp sönme, nabız) da durur; yoksa ekran dışında bile işlemci harcar.
  const cssDur = (d) => root.classList.toggle("uh-paused", d);
  function start() { if (!raf && visible && !document.hidden && !reduce && !paused) { last = 0; raf = requestAnimationFrame(frame); cssDur(false); } }
  function stop() { cancelAnimationFrame(raf); raf = 0; cssDur(true); }
  const pauseBtn = $("uh-pause");
  const pauseYaz = () => {
    if (!pauseBtn) return;
    pauseBtn.hidden = reduce;
    pauseBtn.setAttribute("aria-pressed", String(paused));
    pauseBtn.setAttribute("aria-label", paused ? T("Animasyonu oynat") : T("Animasyonu durdur"));
    const t = pauseBtn.querySelector(".t"); if (t) t.textContent = paused ? T("Oynat") : T("Durdur");
  };
  if (pauseBtn) pauseBtn.addEventListener("click", () => {
    paused = !paused;
    try { paused ? localStorage.setItem("uh-durdur", "1") : localStorage.removeItem("uh-durdur"); } catch (_) {}
    paused ? stop() : start(); pauseYaz();
  });
  reduceMq.addEventListener("change", (e) => { reduce = e.matches; reduce ? (stop(), redrawStill()) : start(); pauseYaz(); });
  measure();
  redrawStill();
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => { stations.forEach((s) => { if (s.needLayout !== undefined) s.needLayout = true; }); if (reduce) simulate(0); });
  pauseYaz();
  if (paused || reduce) cssDur(true);
  start();
  new ResizeObserver(() => { measure(); if (reduce || !raf) redrawStill(); }).observe(view);
  new IntersectionObserver((es) => { visible = es[0].isIntersecting; visible ? start() : stop(); }).observe(view);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
})();
