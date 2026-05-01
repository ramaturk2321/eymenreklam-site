// Eymen Reklam Kurumsal Tanıtım Sunumu — 14 slayt, 16:9
// Palet: Turuncu #F97316 + Slate #0F172A / #64748B / #F8FAFC + beyaz

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10" x 5.625"
pres.author = "Eymen Reklam";
pres.company = "Eymen Reklam Matbaa Tanıtım İnşaat San. Tic. Ltd. Şti.";
pres.title = "Kurumsal Tanıtım Sunumu";

// ============ PALET ============
const C = {
  primary: "F97316",   // Turuncu
  primaryDk: "C2410C", // Koyu turuncu
  primaryLt: "FFF7ED", // Açık turuncu
  dark: "0F172A",      // Kurumsal koyu lacivert
  darkSoft: "1E293B",  // Biraz daha açık
  mid: "64748B",       // Orta gri
  border: "E2E8F0",    // Border
  light: "F8FAFC",     // Sayfa bg
  white: "FFFFFF",
  success: "10B981",
};

const FH = "Calibri"; // Header
const FB = "Calibri"; // Body

const IMG = {
  fabrika: "tmp-img/fabrika.png",
  hakmar: "tmp-img/hakmar.png",
  a101: "tmp-img/a101.png",
  plan2: "tmp-img/2plan.png",
};

// ============ HELPERS ============
function addFooter(slide, pageNum, total) {
  // Üst turuncu çizgi
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.08,
    fill: { color: C.primary }, line: { color: C.primary, width: 0 },
  });
  // Alt sağ sayfa numarası
  slide.addText(`${pageNum} / ${total}`, {
    x: 9.0, y: 5.30, w: 0.9, h: 0.25,
    fontFace: FB, fontSize: 10, color: C.mid, align: "right",
  });
  // Alt sol küçük marka
  slide.addText("EYMEN REKLAM", {
    x: 0.4, y: 5.30, w: 2.5, h: 0.25,
    fontFace: FH, fontSize: 9, color: C.mid, charSpacing: 2, bold: true,
  });
}

const TOTAL = 14;

// ============ SLIDE 1 — KAPAK ============
(() => {
  const s = pres.addSlide();
  s.background = { color: C.dark };

  // Dikey turuncu aksan çubuğu (sol)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.25, h: 5.625,
    fill: { color: C.primary }, line: { color: C.primary, width: 0 },
  });

  // Üst küçük overline
  s.addText("KURUMSAL TANITIM", {
    x: 0.8, y: 0.9, w: 6, h: 0.4,
    fontFace: FH, fontSize: 13, color: C.primary, bold: true, charSpacing: 8,
  });

  // Büyük başlık
  s.addText("Eymen Reklam", {
    x: 0.8, y: 1.4, w: 8.5, h: 1.1,
    fontFace: FH, fontSize: 64, color: C.white, bold: true, charSpacing: -2,
  });

  // Alt başlık
  s.addText("25 Yıldır Kurumsal Tabela & Baskı Çözümleri", {
    x: 0.8, y: 2.6, w: 8.5, h: 0.6,
    fontFace: FB, fontSize: 26, color: C.white,
  });

  // Turuncu aksan çizgi
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 3.35, w: 1.2, h: 0.06,
    fill: { color: C.primary }, line: { color: C.primary, width: 0 },
  });

  s.addText("1999'dan beri · İstanbul Pendik", {
    x: 0.8, y: 3.5, w: 8.5, h: 0.4,
    fontFace: FB, fontSize: 16, color: "CBD5E1", italic: true,
  });

  // Alt bilgi şeridi
  s.addText([
    { text: "www.eymenreklam.com.tr", options: { color: C.white, bold: true } },
    { text: "   ·   ", options: { color: C.primary } },
    { text: "(0216) 379 07 08", options: { color: C.white } },
    { text: "   ·   ", options: { color: C.primary } },
    { text: "info@eymenreklam.com", options: { color: C.white } },
  ], {
    x: 0.8, y: 5.0, w: 8.5, h: 0.4,
    fontFace: FB, fontSize: 13,
  });
})();

// ============ SLIDE 2 — KİM BİZ ============
(() => {
  const s = pres.addSlide();
  s.background = { color: C.white };
  addFooter(s, 2, TOTAL);

  s.addText("KİM BİZ?", {
    x: 0.5, y: 0.4, w: 9, h: 0.4,
    fontFace: FH, fontSize: 12, color: C.primary, bold: true, charSpacing: 6,
  });

  s.addText("25 Yıllık Üretim Deneyimi", {
    x: 0.5, y: 0.75, w: 9, h: 0.7,
    fontFace: FH, fontSize: 40, color: C.dark, bold: true,
  });

  // Sol kolon metin
  s.addText(
    "Eymen Reklam Matbaa Tanıtım İnşaat San. Tic. Ltd. Şti., 1999'dan beri İstanbul Pendik'te kurumsal tabela imalatı, UV baskı ve dijital baskı alanında hizmet vermektedir.",
    {
      x: 0.5, y: 1.85, w: 5.5, h: 1.2,
      fontFace: FB, fontSize: 16, color: C.darkSoft, paraSpaceAfter: 8,
    }
  );

  s.addText(
    "2.500 m² üretim tesisimizde CNC kesim, lazer kesim, flatbed UV baskı ve büyük format dijital baskı makineleriyle uçtan uca kurumsal projeler üretiyoruz.",
    {
      x: 0.5, y: 3.1, w: 5.5, h: 1.2,
      fontFace: FB, fontSize: 16, color: C.darkSoft,
    }
  );

  // Sağ kolon — renkli kart (özet rozet)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.3, y: 1.85, w: 3.3, h: 2.8,
    fill: { color: C.dark }, line: { color: C.dark, width: 0 },
  });
  // Turuncu üst çubuk
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.3, y: 1.85, w: 3.3, h: 0.15,
    fill: { color: C.primary }, line: { color: C.primary, width: 0 },
  });

  s.addText("1999", {
    x: 6.5, y: 2.15, w: 3, h: 1.1,
    fontFace: FH, fontSize: 78, color: C.primary, bold: true,
  });
  s.addText("Kuruluş", {
    x: 6.5, y: 3.2, w: 3, h: 0.35,
    fontFace: FH, fontSize: 14, color: C.white, charSpacing: 4, bold: true,
  });
  s.addText("İstanbul Pendik / Esenler Mah.", {
    x: 6.5, y: 3.55, w: 3, h: 0.35,
    fontFace: FB, fontSize: 13, color: "CBD5E1",
  });
  s.addText("Matbaa · Tanıtım · İnşaat", {
    x: 6.5, y: 3.95, w: 3, h: 0.35,
    fontFace: FB, fontSize: 13, color: "CBD5E1",
  });
})();

// ============ SLIDE 3 — RAKAMLARLA BİZ ============
(() => {
  const s = pres.addSlide();
  s.background = { color: C.light };
  addFooter(s, 3, TOTAL);

  s.addText("RAKAMLARLA EYMEN REKLAM", {
    x: 0.5, y: 0.4, w: 9, h: 0.4,
    fontFace: FH, fontSize: 12, color: C.primary, bold: true, charSpacing: 6,
  });
  s.addText("25 Yıllık Üretim Gücümüz", {
    x: 0.5, y: 0.75, w: 9, h: 0.7,
    fontFace: FH, fontSize: 38, color: C.dark, bold: true,
  });

  const stats = [
    { num: "25+", label: "YIL", sub: "Üretim Tecrübesi" },
    { num: "10.000+", label: "PROJE", sub: "Tamamlanan İş" },
    { num: "2.500", label: "m² TESİS", sub: "Üretim Alanı" },
    { num: "500+", label: "KURUMSAL", sub: "Müşteri" },
  ];

  stats.forEach((st, i) => {
    const x = 0.5 + i * 2.3;
    // Kart
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.9, w: 2.1, h: 2.7,
      fill: { color: C.white }, line: { color: C.border, width: 1 },
    });
    // Üst turuncu çubuk
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.9, w: 2.1, h: 0.08,
      fill: { color: C.primary }, line: { color: C.primary, width: 0 },
    });
    // Büyük sayı
    s.addText(st.num, {
      x, y: 2.2, w: 2.1, h: 1.1,
      fontFace: FH, fontSize: 54, color: C.primary, bold: true, align: "center",
    });
    // Label
    s.addText(st.label, {
      x, y: 3.35, w: 2.1, h: 0.4,
      fontFace: FH, fontSize: 14, color: C.dark, bold: true, align: "center", charSpacing: 4,
    });
    // Alt çizgi
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.7, y: 3.8, w: 0.7, h: 0.03,
      fill: { color: C.primary }, line: { color: C.primary, width: 0 },
    });
    // Sub
    s.addText(st.sub, {
      x, y: 3.9, w: 2.1, h: 0.4,
      fontFace: FB, fontSize: 13, color: C.mid, align: "center",
    });
  });
})();

// ============ SLIDE 4 — NEDEN EYMEN ============
(() => {
  const s = pres.addSlide();
  s.background = { color: C.white };
  addFooter(s, 4, TOTAL);

  s.addText("NEDEN EYMEN REKLAM?", {
    x: 0.5, y: 0.4, w: 9, h: 0.4,
    fontFace: FH, fontSize: 12, color: C.primary, bold: true, charSpacing: 6,
  });
  s.addText("Kurumsal Alıcılar için 4 Güvence", {
    x: 0.5, y: 0.75, w: 9, h: 0.7,
    fontFace: FH, fontSize: 36, color: C.dark, bold: true,
  });

  const vals = [
    { no: "01", t: "Anahtar Teslim Üretim", d: "Tasarım, üretim ve montaj tek çatı altında. Farklı firmalarla uğraşmayın." },
    { no: "02", t: "2 Yıl Ürün Garantisi", d: "LED, boya ve mekanik aksam 2 yıl garantili. Yazılı garanti belgesi." },
    { no: "03", t: "24 Saatte Teklif Dönüşü", d: "Detaylı kalem bazlı maliyet analizi, 3D ön izleme ve resmi teklif mektubu." },
    { no: "04", t: "KDV Dahil Net Fiyat", d: "Sürpriz maliyet yok. Proforma fatura ile baştan şeffaf fiyat politikası." },
  ];

  vals.forEach((v, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.5 + col * 4.6;
    const y = 1.85 + row * 1.55;
    // Kart bg
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.3, h: 1.35,
      fill: { color: C.light }, line: { color: C.border, width: 1 },
    });
    // Sol turuncu şerit
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.12, h: 1.35,
      fill: { color: C.primary }, line: { color: C.primary, width: 0 },
    });
    // Numara
    s.addText(v.no, {
      x: x + 0.3, y: y + 0.15, w: 0.8, h: 0.5,
      fontFace: FH, fontSize: 30, color: C.primary, bold: true,
    });
    // Başlık
    s.addText(v.t, {
      x: x + 1.15, y: y + 0.18, w: 3.05, h: 0.45,
      fontFace: FH, fontSize: 17, color: C.dark, bold: true,
    });
    // Açıklama
    s.addText(v.d, {
      x: x + 1.15, y: y + 0.62, w: 3.05, h: 0.65,
      fontFace: FB, fontSize: 12, color: C.mid,
    });
  });
})();

// ============ SLIDE 5 — HİZMET KATEGORİLERİ ============
(() => {
  const s = pres.addSlide();
  s.background = { color: C.white };
  addFooter(s, 5, TOTAL);

  s.addText("HİZMETLERİMİZ", {
    x: 0.5, y: 0.4, w: 9, h: 0.4,
    fontFace: FH, fontSize: 12, color: C.primary, bold: true, charSpacing: 6,
  });
  s.addText("Tek Çatı Altında 6 Ana Kategori", {
    x: 0.5, y: 0.75, w: 9, h: 0.7,
    fontFace: FH, fontSize: 36, color: C.dark, bold: true,
  });

  const svc = [
    { t: "Tabela İmalatı", d: "Kutu harf, totem, çatı, ışıklı, neon-LED tabelalar" },
    { t: "UV Baskı", d: "Flatbed UV ile pleksi, cam, ahşap, metal üzerine baskı" },
    { t: "Dijital Baskı", d: "Büyük format afiş, branda, bez pankart, billboard baskıları" },
    { t: "Araç Giydirme", d: "Ticari araç folyo kaplama ve kurumsal filo giydirme" },
    { t: "Folyo & Cam Giydirme", d: "Ofis, mağaza, cam kumlama folyo ve cephe uygulamaları" },
    { t: "Mağaza Reklam", d: "Zincir mağaza görsel kimlik, lansman ve kampanya setleri" },
  ];

  svc.forEach((v, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.5 + col * 3.05;
    const y = 1.85 + row * 1.55;
    // Kart
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 2.85, h: 1.4,
      fill: { color: C.white }, line: { color: C.border, width: 1 },
    });
    // Üst turuncu çubuk
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 2.85, h: 0.08,
      fill: { color: C.primary }, line: { color: C.primary, width: 0 },
    });
    // Turuncu ikon kutusu (placeholder)
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.2, y: y + 0.25, w: 0.5, h: 0.5,
      fill: { color: C.primaryLt }, line: { color: C.primary, width: 0 },
    });
    s.addText((i + 1).toString(), {
      x: x + 0.2, y: y + 0.25, w: 0.5, h: 0.5,
      fontFace: FH, fontSize: 18, color: C.primary, bold: true, align: "center", valign: "middle",
    });
    // Başlık
    s.addText(v.t, {
      x: x + 0.85, y: y + 0.28, w: 1.9, h: 0.4,
      fontFace: FH, fontSize: 15, color: C.dark, bold: true,
    });
    // Açıklama
    s.addText(v.d, {
      x: x + 0.2, y: y + 0.85, w: 2.5, h: 0.5,
      fontFace: FB, fontSize: 11, color: C.mid,
    });
  });
})();

// ============ SLIDE 6 — ÜRETİM TESİSİMİZ ============
(() => {
  const s = pres.addSlide();
  s.background = { color: C.white };
  addFooter(s, 6, TOTAL);

  // Sol yarı — metin
  s.addText("ÜRETİM TESİSİMİZ", {
    x: 0.5, y: 0.4, w: 5, h: 0.4,
    fontFace: FH, fontSize: 12, color: C.primary, bold: true, charSpacing: 6,
  });
  s.addText("2.500 m² Modern Üretim Hattı", {
    x: 0.5, y: 0.75, w: 5, h: 1.3,
    fontFace: FH, fontSize: 32, color: C.dark, bold: true,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.15, w: 0.8, h: 0.04,
    fill: { color: C.primary }, line: { color: C.primary, width: 0 },
  });

  const equip = [
    "CNC kesim ve freze hattı",
    "Fiber lazer metal kesim",
    "Flatbed UV baskı makinesi",
    "Büyük format dijital baskı",
    "LED modül & neon flex montaj",
    "Profesyonel boyahane",
  ];
  s.addText(
    equip.map((e, i) => ({
      text: e,
      options: { bullet: { code: "25A0" }, color: C.darkSoft, breakLine: i < equip.length - 1 },
    })),
    {
      x: 0.5, y: 2.35, w: 5, h: 2.6,
      fontFace: FB, fontSize: 14, paraSpaceAfter: 4,
    }
  );

  // Sağ yarı — fabrika görseli (sizing: cover)
  s.addImage({
    path: IMG.fabrika,
    x: 5.9, y: 0.4, w: 3.8, h: 4.7,
    sizing: { type: "cover", w: 3.8, h: 4.7 },
  });
  // Görsel üstünde turuncu şerit
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.9, y: 0.4, w: 3.8, h: 0.08,
    fill: { color: C.primary }, line: { color: C.primary, width: 0 },
  });
})();

// ============ SLIDE 7 — SÜREÇ ============
(() => {
  const s = pres.addSlide();
  s.background = { color: C.white };
  addFooter(s, 7, TOTAL);

  s.addText("ÜRETİM SÜRECİMİZ", {
    x: 0.5, y: 0.4, w: 9, h: 0.4,
    fontFace: FH, fontSize: 12, color: C.primary, bold: true, charSpacing: 6,
  });
  s.addText("Projeyi 4 Adımda Hayata Geçiriyoruz", {
    x: 0.5, y: 0.75, w: 9, h: 0.7,
    fontFace: FH, fontSize: 34, color: C.dark, bold: true,
  });

  const steps = [
    { no: "01", t: "Keşif & Ölçüm", d: "Ücretsiz saha keşfi, teknik ölçüm ve analiz" },
    { no: "02", t: "3D Tasarım", d: "Ön izleme render'ı, müşteri onayı ve revizyon" },
    { no: "03", t: "Üretim", d: "2.500 m² tesisimizde kalite kontrollü üretim" },
    { no: "04", t: "Montaj & Teslim", d: "Profesyonel ekiple yerinde montaj ve teslim" },
  ];

  steps.forEach((st, i) => {
    const x = 0.5 + i * 2.3;
    // Numara büyük
    s.addText(st.no, {
      x, y: 2.0, w: 2, h: 0.9,
      fontFace: FH, fontSize: 64, color: C.primary, bold: true,
    });
    // Başlık
    s.addText(st.t, {
      x, y: 3.1, w: 2.1, h: 0.4,
      fontFace: FH, fontSize: 17, color: C.dark, bold: true,
    });
    // Açıklama
    s.addText(st.d, {
      x, y: 3.55, w: 2.1, h: 1.2,
      fontFace: FB, fontSize: 12, color: C.mid,
    });
    // Sağ ok (son step hariç)
    if (i < steps.length - 1) {
      s.addShape(pres.shapes.RIGHT_TRIANGLE, {
        x: x + 2.15, y: 2.35, w: 0.15, h: 0.25,
        fill: { color: C.primary }, line: { color: C.primary, width: 0 }, rotate: 30,
      });
    }
  });

  // Alt ince gri çizgi
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.9, w: 9, h: 0.02,
    fill: { color: C.border }, line: { color: C.border, width: 0 },
  });
})();

// ============ SLIDE 8 — REFERANSLAR ============
(() => {
  const s = pres.addSlide();
  s.background = { color: C.light };
  addFooter(s, 8, TOTAL);

  s.addText("KURUMSAL REFERANSLARIMIZ", {
    x: 0.5, y: 0.4, w: 9, h: 0.4,
    fontFace: FH, fontSize: 12, color: C.primary, bold: true, charSpacing: 6,
  });
  s.addText("500+ Kurumsal Müşterimizden Bazıları", {
    x: 0.5, y: 0.75, w: 9, h: 0.7,
    fontFace: FH, fontSize: 32, color: C.dark, bold: true,
  });

  const brands = [
    "HAKMAR", "A101", "İLVE KOZMETİK", "MAKELSAN",
    "CIVIL MAĞAZACILIK", "EVE MAĞAZALARI", "BİZİM TOPTAN", "DORUK",
    "INOKSAN", "ISUZU", "MEYDAN AVM", "ÜLKER",
  ];

  brands.forEach((b, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 0.5 + col * 2.3;
    const y = 1.95 + row * 1.0;
    // Kart
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 2.1, h: 0.85,
      fill: { color: C.white }, line: { color: C.border, width: 1 },
    });
    s.addText(b, {
      x, y, w: 2.1, h: 0.85,
      fontFace: FH, fontSize: 14, color: C.dark, bold: true,
      align: "center", valign: "middle", charSpacing: 2,
    });
  });
})();

// ============ SLIDE 9 — VAKA 1 HAKMAR ============
(() => {
  const s = pres.addSlide();
  s.background = { color: C.white };
  addFooter(s, 9, TOTAL);

  // Sol metin
  s.addText("VAKA ÇALIŞMASI 01", {
    x: 0.5, y: 0.4, w: 5, h: 0.4,
    fontFace: FH, fontSize: 12, color: C.primary, bold: true, charSpacing: 6,
  });
  s.addText("Hakmar Zincir Mağaza", {
    x: 0.5, y: 0.75, w: 5, h: 0.7,
    fontFace: FH, fontSize: 32, color: C.dark, bold: true,
  });
  s.addText("Türkiye Geneli Mağaza Tabela & Kampanya Setleri", {
    x: 0.5, y: 1.5, w: 5, h: 0.4,
    fontFace: FB, fontSize: 14, color: C.mid, italic: true,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.0, w: 0.8, h: 0.04,
    fill: { color: C.primary }, line: { color: C.primary, width: 0 },
  });

  const items = [
    "65. yıl kampanya afiş ve tabela seti",
    "Hakmar Express mağaza tabela & totem",
    "Kurumsal kimlik ikram araçları giydirme",
    "Çok şubeli seri üretim ve montaj",
    "Hızlı teslim ve yerinde uygulama",
  ];
  s.addText(
    items.map((e, i) => ({
      text: e,
      options: { bullet: { code: "25A0" }, color: C.darkSoft, breakLine: i < items.length - 1 },
    })),
    {
      x: 0.5, y: 2.2, w: 5, h: 2.6,
      fontFace: FB, fontSize: 14, paraSpaceAfter: 6,
    }
  );

  // Sağ görsel
  s.addImage({
    path: IMG.hakmar,
    x: 5.9, y: 0.4, w: 3.8, h: 4.7,
    sizing: { type: "cover", w: 3.8, h: 4.7 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.9, y: 0.4, w: 3.8, h: 0.08,
    fill: { color: C.primary }, line: { color: C.primary, width: 0 },
  });
})();

// ============ SLIDE 10 — VAKA 2 A101 ============
(() => {
  const s = pres.addSlide();
  s.background = { color: C.white };
  addFooter(s, 10, TOTAL);

  s.addText("VAKA ÇALIŞMASI 02", {
    x: 0.5, y: 0.4, w: 5, h: 0.4,
    fontFace: FH, fontSize: 12, color: C.primary, bold: true, charSpacing: 6,
  });
  s.addText("A101 Yeni Mağazacılık", {
    x: 0.5, y: 0.75, w: 5, h: 0.7,
    fontFace: FH, fontSize: 32, color: C.dark, bold: true,
  });
  s.addText("Depo Yönlendirme + Mağaza Folyo + Kampanya", {
    x: 0.5, y: 1.5, w: 5, h: 0.4,
    fontFace: FB, fontSize: 14, color: C.mid, italic: true,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.0, w: 0.8, h: 0.04,
    fill: { color: C.primary }, line: { color: C.primary, width: 0 },
  });

  const items = [
    "40+ şubede tek tip yönlendirme sistemi",
    "Depo operasyon folyo ve etiketleme",
    "Mağaza açılış kampanya görselleri",
    "Toplu UV baskı ve ön arka PVC kaplama",
    "Kurumsal kargo entegrasyonlu teslim",
  ];
  s.addText(
    items.map((e, i) => ({
      text: e,
      options: { bullet: { code: "25A0" }, color: C.darkSoft, breakLine: i < items.length - 1 },
    })),
    {
      x: 0.5, y: 2.2, w: 5, h: 2.6,
      fontFace: FB, fontSize: 14, paraSpaceAfter: 6,
    }
  );

  s.addImage({
    path: IMG.a101,
    x: 5.9, y: 0.4, w: 3.8, h: 4.7,
    sizing: { type: "cover", w: 3.8, h: 4.7 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.9, y: 0.4, w: 3.8, h: 0.08,
    fill: { color: C.primary }, line: { color: C.primary, width: 0 },
  });
})();

// ============ SLIDE 11 — VAKA 3 2PLAN ============
(() => {
  const s = pres.addSlide();
  s.background = { color: C.white };
  addFooter(s, 11, TOTAL);

  s.addText("VAKA ÇALIŞMASI 03", {
    x: 0.5, y: 0.4, w: 5, h: 0.4,
    fontFace: FH, fontSize: 12, color: C.primary, bold: true, charSpacing: 6,
  });
  s.addText("2Plan Eskişehir", {
    x: 0.5, y: 0.75, w: 5, h: 0.7,
    fontFace: FH, fontSize: 32, color: C.dark, bold: true,
  });
  s.addText("Bina Cephe Giydirme & UV Baskı Uygulaması", {
    x: 0.5, y: 1.5, w: 5, h: 0.4,
    fontFace: FB, fontSize: 14, color: C.mid, italic: true,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.0, w: 0.8, h: 0.04,
    fill: { color: C.primary }, line: { color: C.primary, width: 0 },
  });

  const items = [
    "Tam cephe branda ve folyo uygulaması",
    "Büyük format UV baskı dayanıklı ürünler",
    "Yüksek iskelede profesyonel montaj",
    "Prestij projesine özel tasarım",
    "Garantili kurumsal kalite",
  ];
  s.addText(
    items.map((e, i) => ({
      text: e,
      options: { bullet: { code: "25A0" }, color: C.darkSoft, breakLine: i < items.length - 1 },
    })),
    {
      x: 0.5, y: 2.2, w: 5, h: 2.6,
      fontFace: FB, fontSize: 14, paraSpaceAfter: 6,
    }
  );

  s.addImage({
    path: IMG.plan2,
    x: 5.9, y: 0.4, w: 3.8, h: 4.7,
    sizing: { type: "cover", w: 3.8, h: 4.7 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.9, y: 0.4, w: 3.8, h: 0.08,
    fill: { color: C.primary }, line: { color: C.primary, width: 0 },
  });
})();

// ============ SLIDE 12 — SERTİFİKA & KALİTE ============
(() => {
  const s = pres.addSlide();
  s.background = { color: C.white };
  addFooter(s, 12, TOTAL);

  s.addText("KALİTE GÜVENCEMİZ", {
    x: 0.5, y: 0.4, w: 9, h: 0.4,
    fontFace: FH, fontSize: 12, color: C.primary, bold: true, charSpacing: 6,
  });
  s.addText("Sertifika ve Kurumsal Güvenceler", {
    x: 0.5, y: 0.75, w: 9, h: 0.7,
    fontFace: FH, fontSize: 34, color: C.dark, bold: true,
  });

  const items = [
    { t: "ISO 9001", d: "Kalite Yönetim Sistemi sertifikalı üretim" },
    { t: "2 Yıl Garanti", d: "LED, boya ve mekanik aksam yazılı garanti altında" },
    { t: "Profesyonel Montaj", d: "Kendi montaj ekibimiz — yüksek iskele dahil" },
    { t: "Net Fiyat", d: "KDV dahil, sürpriz maliyet olmayan şeffaf politika" },
    { t: "Proforma Fatura", d: "Resmi teklif mektubu ve proforma ile belgeli süreç" },
    { t: "24 Saatte Dönüş", d: "Teklif talebinize 24 saat içinde kalem bazlı cevap" },
  ];

  items.forEach((v, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.5 + col * 3.05;
    const y = 1.85 + row * 1.55;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 2.85, h: 1.4,
      fill: { color: C.light }, line: { color: C.border, width: 1 },
    });
    // Checkmark daire
    s.addShape(pres.shapes.OVAL, {
      x: x + 0.2, y: y + 0.2, w: 0.6, h: 0.6,
      fill: { color: C.primary }, line: { color: C.primary, width: 0 },
    });
    s.addText("✓", {
      x: x + 0.2, y: y + 0.2, w: 0.6, h: 0.6,
      fontFace: FH, fontSize: 22, color: C.white, bold: true, align: "center", valign: "middle",
    });
    s.addText(v.t, {
      x: x + 0.95, y: y + 0.25, w: 1.85, h: 0.4,
      fontFace: FH, fontSize: 15, color: C.dark, bold: true,
    });
    s.addText(v.d, {
      x: x + 0.2, y: y + 0.85, w: 2.5, h: 0.5,
      fontFace: FB, fontSize: 11, color: C.mid,
    });
  });
})();

// ============ SLIDE 13 — EKİP & KAPASİTE ============
(() => {
  const s = pres.addSlide();
  s.background = { color: C.white };
  addFooter(s, 13, TOTAL);

  s.addText("EKİP & KAPASİTE", {
    x: 0.5, y: 0.4, w: 9, h: 0.4,
    fontFace: FH, fontSize: 12, color: C.primary, bold: true, charSpacing: 6,
  });
  s.addText("Üretim ve Hizmet Gücümüz", {
    x: 0.5, y: 0.75, w: 9, h: 0.7,
    fontFace: FH, fontSize: 34, color: C.dark, bold: true,
  });

  // Sol — liste
  const items = [
    "Deneyimli grafik tasarım ve 3D render ekibi",
    "Kendi üretim tesisimiz — dış üretime bağımlı değiliz",
    "Türkiye geneli montaj ve servis hizmeti",
    "24 saatte teklif dönüş garantisi",
    "Kurumsal müşteriye özel hesap yöneticisi",
    "Proje süresince tek temas noktası",
  ];
  s.addText(
    items.map((e, i) => ({
      text: e,
      options: { bullet: { code: "25A0" }, color: C.darkSoft, breakLine: i < items.length - 1 },
    })),
    {
      x: 0.5, y: 1.9, w: 5.2, h: 3.2,
      fontFace: FB, fontSize: 15, paraSpaceAfter: 8,
    }
  );

  // Sağ — koyu kart + büyük metin
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.0, y: 1.85, w: 3.7, h: 3.15,
    fill: { color: C.dark }, line: { color: C.dark, width: 0 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.0, y: 1.85, w: 3.7, h: 0.15,
    fill: { color: C.primary }, line: { color: C.primary, width: 0 },
  });
  s.addText("BİZİMLE ÇALIŞAN", {
    x: 6.2, y: 2.15, w: 3.4, h: 0.35,
    fontFace: FH, fontSize: 12, color: C.primary, charSpacing: 4, bold: true,
  });
  s.addText("Kurumsal Müşteri", {
    x: 6.2, y: 2.45, w: 3.4, h: 0.45,
    fontFace: FH, fontSize: 20, color: C.white, bold: true,
  });
  s.addText("500+", {
    x: 6.2, y: 2.95, w: 3.4, h: 1.3,
    fontFace: FH, fontSize: 110, color: C.primary, bold: true,
  });
  s.addText("Zincir mağaza · fabrika · restoran · AVM", {
    x: 6.2, y: 4.3, w: 3.4, h: 0.4,
    fontFace: FB, fontSize: 11, color: "CBD5E1",
  });
})();

// ============ SLIDE 14 — İLETİŞİM ============
(() => {
  const s = pres.addSlide();
  s.background = { color: C.dark };

  // Dikey turuncu aksan
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.25, h: 5.625,
    fill: { color: C.primary }, line: { color: C.primary, width: 0 },
  });

  s.addText("İLETİŞİM", {
    x: 0.8, y: 0.7, w: 6, h: 0.4,
    fontFace: FH, fontSize: 13, color: C.primary, bold: true, charSpacing: 8,
  });
  s.addText("Teklif Almak İçin Bize Ulaşın", {
    x: 0.8, y: 1.15, w: 8, h: 0.9,
    fontFace: FH, fontSize: 42, color: C.white, bold: true,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 2.15, w: 1.0, h: 0.06,
    fill: { color: C.primary }, line: { color: C.primary, width: 0 },
  });

  // Sol kolon — iletişim bilgileri
  const info = [
    { l: "ADRES", v: "Esenler Mah. Çevre Sk. No: 7\nPendik / İSTANBUL" },
    { l: "TELEFON", v: "(0216) 379 07 08\n0535 664 77 52" },
    { l: "E-POSTA", v: "info@eymenreklam.com\ninfo@eymenreklam.com.tr" },
    { l: "WEB", v: "www.eymenreklam.com.tr" },
  ];

  info.forEach((c, i) => {
    const y = 2.45 + i * 0.65;
    s.addText(c.l, {
      x: 0.8, y, w: 1.8, h: 0.3,
      fontFace: FH, fontSize: 11, color: C.primary, bold: true, charSpacing: 4,
    });
    s.addText(c.v, {
      x: 2.6, y, w: 4.5, h: 0.6,
      fontFace: FB, fontSize: 13, color: C.white,
    });
  });

  // Sağ CTA kartı
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.2, y: 2.3, w: 2.4, h: 2.3,
    fill: { color: C.primary }, line: { color: C.primary, width: 0 },
  });
  s.addText("ÜCRETSİZ", {
    x: 7.2, y: 2.55, w: 2.4, h: 0.35,
    fontFace: FH, fontSize: 13, color: C.white, charSpacing: 4, bold: true, align: "center",
  });
  s.addText("KEŞİF", {
    x: 7.2, y: 2.9, w: 2.4, h: 0.55,
    fontFace: FH, fontSize: 32, color: C.white, bold: true, align: "center",
  });
  s.addText("& TEKLİF", {
    x: 7.2, y: 3.45, w: 2.4, h: 0.55,
    fontFace: FH, fontSize: 28, color: C.white, bold: true, align: "center",
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 8.0, y: 4.05, w: 0.8, h: 0.03,
    fill: { color: C.white }, line: { color: C.white, width: 0 },
  });
  s.addText("24 saatte dönüş", {
    x: 7.2, y: 4.15, w: 2.4, h: 0.35,
    fontFace: FB, fontSize: 12, color: C.white, align: "center", italic: true,
  });

  // Alt marka
  s.addText("EYMEN REKLAM · 1999'DAN BERİ KURUMSAL BASKI ÇÖZÜMLERİ", {
    x: 0.8, y: 5.15, w: 8.5, h: 0.3,
    fontFace: FH, fontSize: 10, color: C.primary, charSpacing: 6, bold: true,
  });
})();

// ============ SAVE ============
pres.writeFile({ fileName: "eymen-reklam-kurumsal-sunum.pptx" }).then((file) => {
  console.log("Created:", file);
});
