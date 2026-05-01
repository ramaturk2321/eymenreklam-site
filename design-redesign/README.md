# eymenreklam.com.tr — Kurumsal Redesign Paketi

Claude Design'a yapıştırılacak brief. Mevcut site: Astro + Tailwind 4.
Dev server: `npm run dev` → http://localhost:4321

## Mevcut durum (tespit)

Site şu an **zaten modern** ve **turuncu + lacivert** temalı:
- Hero: koyu lacivert zemin, turuncu başlık vurgu
- Kart grid'leri, istatistik bandı, CTA, footer — hepsi var
- Sayfalar: anasayfa, hizmetlerimiz, hizmet alt sayfası, projelerimiz,
  ürün detay, hakkımızda, iletişim, teklif-al, blog

**Redesign değil, kurumsal rötuş** daha doğru: tipografi sıkılaştır,
spacing tutarlandır, daha premium/kurumsal his ver.

## Tespit edilen iyileştirme alanları

1. **Logo**: "eymen REKLAM25" görsel olarak biraz dağınık — tek parça ve
   daha net/okunur olmalı
2. **Hero arka plan**: tesis fotoğrafı yerine daha kurumsal bir görsel
   (animasyonlu geometrik pattern / premium ürün render'ı)
3. **Tipografi**: H1 iyi ama body text ve CTA'lar biraz ince kalıyor
4. **İstatistik bandı**: yatay ama biraz basit — kart-içi ikonlarla süslenebilir
5. **Proje kartları**: görsel büyük ama tıklandığında ne olacağı belirsiz
6. **Müşteri logoları şeridi yok** — kurumsal güven için çok önemli
7. **"Süreç" bölümü yok** — B2B'de: Keşif → Tasarım → Üretim → Montaj görseli
8. **Sertifika / kalite rozetleri yok** — 25 yıl deneyim vurgu zayıf

---

## Claude Design için Screenshot Listesi

Cmd+Shift+4 ile alın, bu klasöre atın:

| # | Dosya | Sayfa |
|---|---|---|
| 1 | `01-home-hero.png` | / (hero + hizmet tabları) |
| 2 | `02-home-stats.png` | / (istatistik bandı) |
| 3 | `03-home-projects.png` | / (projeler grid) |
| 4 | `04-home-cta-footer.png` | / (CTA + footer) |
| 5 | `05-service-detail.png` | /hizmetlerimiz/tabela |
| 6 | `06-projects-list.png` | /projelerimiz |
| 7 | `07-product-detail.png` | /urunlerimiz/kutu-harf-tabela |
| 8 | `08-about.png` | /hakkimizda |
| 9 | `09-contact.png` | /iletisim |
| 10 | `10-quote-form.png` | /teklif-al |

---

## İLK MESAJ — Claude Design'a yapıştırın

```
25 yıllık bir tabela / UV baskı / dijital baskı firmasının kurumsal
web sitesini yeniden tasarlıyorum. Eymen Reklam (İstanbul Pendik, 1999'dan
beri, 10.000+ tamamlanan proje, 500+ kurumsal müşteri).

SIFIRDAN DEĞİL — MEVCUT YAPIYI KURUMSALLAŞTIRMA istiyorum. Ekteki 10
screenshot mevcut halimi gösteriyor. Site Astro + Tailwind 4 üzerinde.

HEDEF KİTLE: KURUMSAL B2B alıcılar (Hakmar, A101 gibi zincir mağaza
sorumluları, zincir restoran operasyon müdürleri, fabrika yöneticileri).
Amaç: teklif formunu doldurtmak veya telefonla aratmak.

REFERANS HISS: Pimaş / Şişecam / Çuhadaroğlu gibi kurumsal üreticilerin
sitesi (ciddi, B2B, az animasyon, bol referans). Ama onlardan DAHA modern.

=== KURUMSAL PALET (ZORUNLU) ===

Ana renkler — TURUNCU + GRİ:
- primary (Turuncu Marka):
  · 50  #FFF7ED
  · 500 #F97316 (ana — buton, link, vurgu)
  · 600 #EA580C (hover)
  · 700 #C2410C (basılı)
- slate (Kurumsal Gri):
  · 50  #F8FAFC (sayfa bg)
  · 100 #F1F5F9
  · 200 #E2E8F0 (border)
  · 700 #334155 (body text)
  · 900 #0F172A (başlık, koyu hero zemin)

Mevcut site bu paleti KULLANIYOR zaten — koru, sadece dengesini düzelt.
Turuncu %10, lacivert %20, beyaz/gri %70 oran hedefi.

Aksesuar (opsiyonel — çok kullanma):
- success #10B981 (garanti rozeti, onay)
- info    #3B82F6 (bilgi ikonları)

=== TİPOGRAFİ ===
- Font: Inter veya Geist (Türkçe karakter düzgün)
- H1: 56-64px, 700 weight, -2% letter-spacing (premium his)
- H2: 40-48px, 600 weight
- Body: 16-18px, 400 weight, line-height 1.6
- Overline (küçük başlık üstü metin): 14px, uppercase, 600, turuncu
  → "KURUMSAL İLETİŞİM", "25 YILLIK PORTFÖY" gibi zaten kullanılıyor,
    korunsun ama daha ince

=== KOMPONENT İYİLEŞTİRMELERİ ===

1. HEADER / NAV
   - Şu an: logo + nav + arama + turuncu CTA. Temiz.
   - İyileştir: sticky olunca arka plan beyazlaşsın + ince shadow;
     aktif nav linki turuncu alt çizgi (dot değil)
   - Dil seçici (TR/EN) daha küçük, diskret

2. HERO
   - Şu an: tesis fotoğrafı + büyük turuncu başlık
   - İyileştir: fotoğrafa koyu mavi overlay (%70) + turuncu aksan
     çizgi; sağ altta küçük "25 yıldır üretimdeyiz" animasyonu;
     iki CTA: "Ücretsiz Teklif Alın" (turuncu dolu) ve "Portföyü
     İnceleyin" (beyaz border). Altında güven rozetleri:
     ★★★★★ Google Reviews + 25 YIL + KALİTE SERTİFİKASI

3. HİZMET TAB'LARI
   - Şu an: hero altında turuncu aktif tab + galeri
   - İyileştir: tab'ların altında ince turuncu underline (mevcut iyi);
     her tab'a küçük ikon ekle (lucide); kart hover'ında turuncu
     alt çizgi uzasın

4. KART (ürün/proje)
   - Şu an: görsel + başlık + altında renk band
   - İyileştir: görsel üst-sol köşeye kategori pill (küçük, turuncu
     arkaplan + beyaz metin); hover'da görsel hafif zoom; başlık
     altında 1 satır açıklama + "Detay →" linki

5. İSTATİSTİK BANDI (25+ / 10.000+ / 2.500m² / 500+)
   - Şu an: basit yatay metin
   - İyileştir: her sayının üstüne küçük ikon (award, folder-check,
     factory, users); sayılar tabular-nums + daha büyük (72px);
     sayma animasyonu scroll'da tetiklenir

6. MÜŞTERİ LOGO ŞERİDİ (YOK — EKLE)
   - "Güvenen Kurumsal Müşterilerimiz" başlığı altında
   - Hakmar, A101, MAKELSAN, İLVE, FB Group gibi logoların gri-scale
     versiyonu, hover'da renkli; sonsuz marquee animasyon

7. SÜREÇ BÖLÜMÜ (YOK — EKLE)
   - "Projeyi Nasıl Hayata Geçiriyoruz?" 4 adım:
     1. Keşif & Ölçüm  2. 3D Tasarım  3. Üretim  4. Montaj
   - Her adım: numara (01/02/03/04 büyük turuncu) + ikon + 2 satır

8. SERTİFİKA / GÜVEN ROZETLERİ (YOK — EKLE)
   - ISO 9001, 25 YIL GARANTİ, KDV DAHİL FİYAT, 24 SAATTE DÖNÜŞ
   - İkonlu rozet grid'i (4'lü), açık gri zemin

9. TEKLİF FORMU
   - Şu an: sol iletişim, sağ form. İyi yapı.
   - İyileştir: formu multi-step yap (3 adım: Firma → Proje → Onay);
     "Neden Kurumsal Teklif?" checklist sağda sticky kalsın;
     submit butonu "Teklifimi Gönder (24 saatte dönüş)"

10. FOOTER
    - Şu an: turuncu CTA bandı + 4 kolon footer + copyright
    - İyileştir: CTA bandında iki telefon numarası ayrı buton; footer
      kolonları aynı kalsın, son satıra "ISO logoları + KVKK + Çerez"
      eklentisi

=== LAYOUT KURALLARI ===
- Max container: 1280px (şu an ~1200, biraz geniş)
- Section padding: py-24 (büyük) → py-16 (orta) → py-12 (küçük)
- Kart gap: 24px
- Mobile-first responsive: breakpoints md:768 / lg:1024 / xl:1280

=== BU İLK MESAJDA İSTEDİĞİM ===

1. Önce yeni ANASAYFA hero + nav + hizmet tabları kesiti (1 ekran boyu)
2. Yeni müşteri logo şeridi mockup
3. Yeni süreç bölümü mockup
4. Yeni stat bandı mockup

Desktop 1440px için tasarla. Sonra mobilde.
```

---

## İKİNCİ MESAJ şablonu — her sayfa için

```
Şimdi [SAYFA] sayfasını yeniden tasarla. Screenshot ek.

Koru: içerik + yapı
Kurumsallaştır: [spesifik iyileştirme listesi]

Aynı design system'e sadık kal.
```

### Sayfa sırası
1. **Anasayfa** (yukarıda)
2. Hizmet detay (`/hizmetlerimiz/tabela`) — hero daha kurumsal, ürün grid altta
3. Ürün detay (`/urunlerimiz/kutu-harf-tabela`) — e-ticaret tarzı galeri + spec
4. Projelerimiz (`/projelerimiz`) — filtre sol sticky, grid sağda
5. Hakkımızda — timeline (1999-2026), ekip, tesis galerisi
6. İletişim — harita büyük, form sağ sticky
7. Teklif-al — multi-step form

---

## Tasarım bittikten sonra

1. Her sayfa için Claude Design'dan **Tailwind JSX** export
2. Astro component'lerine uygula (`src/pages/*.astro`, `src/components/*`)
3. Porto tema yerine bu yapıya geç (WordPress zaten Astro'ya
   migrate edilmiş görünüyor — **bu Astro site canlıya çıkacak mı?**
   Karar ver)
