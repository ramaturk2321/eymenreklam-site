# Eymen Reklam Site Gelistirme Raporu

Tarih: 2026-06-20

Bu not, Eymen Reklam web sitesi icin yapilan ilk teknik, SEO ve donusum odakli incelemenin kalici kaydidir. Sonraki gelistirme turlarinda karar zemini olarak kullanilacak.

## Mevcut Durum

- Proje Astro 6 ve Tailwind CSS 4 ile statik site olarak calisiyor.
- Sayfa kapsami genis: ana sayfa, urunler, urun detaylari, hizmetler, hizmet detaylari, projeler, blog, iletisim ve teklif formu mevcut.
- Icerik yapisi duzenli: urun, hizmet, proje ve blog icerikleri `src/content` koleksiyonlarinda tutuluyor.
- Ortak iletisim ve firma bilgileri `src/lib/site-data.ts` icinde merkezi sekilde yonetiliyor.
- SEO temeli mevcut: canonical, Open Graph, Twitter card, sitemap, robots ve JSON-LD kullaniliyor.
- `npm run build` basarili calisti ve 117 statik sayfa uretti.
- Statik HTML ic link taramasinda kirik ic baglanti bulunmadi.
- Canli site ana mesaji: Pendik/Istanbul merkezli tabela imalati, UV baski, dijital baski, folyo/giydirme ve kurumsal reklam cozumleri.

## Guclu Yanlar

- Gercek proje portfoyu guven veriyor.
- Urun ve hizmet sayisi SEO icin buyuk avantaj.
- Yerel arama niyeti iyi hedeflenmis: Pendik, Istanbul, tabela, UV baski, dijital baski.
- WhatsApp, telefon ve teklif formu CTA'lari sitede gorunur.
- `SEO.astro` icinde LocalBusiness ve Organization JSON-LD bulunuyor.
- Statik mimari hiz, guvenilirlik ve bakim kolayligi sagliyor.

## Zayif Noktalar

- Ana sayfa gorsel dili calisiyor, ancak daha kurumsal ve premium bir uretici algisi verecek sekilde guclendirilebilir.
- Urun katalog filtreleri var, fakat urunlerden teklif akisina gecis daha belirgin olmali.
- Teklif formu detayli; hizli teklif isteyen kullanicilar icin daha kisa bir akis gerekebilir.
- Blog icerik sayisi az. Ticari arama niyetli icerikler artirilmali.
- Urun detay sayfalarinda fiyat, malzeme, olcu, adet ve teklif icin gereken bilgiler daha net bloklar halinde sunulmali.
- Sites/Cloudflare akisi icin `.openai/hosting.json` yok; proje su an Vercel/Astro yapisina gore ayarli gorunuyor.

## SEO Firsatlari

- Urun ve hizmet detaylarina sayfa ozel JSON-LD eklenmeli:
  - `Service`
  - `Product`
  - `FAQPage`
  - `BreadcrumbList`
- Lokasyon odakli sayfalar dusunulmeli:
  - Pendik tabela
  - Tuzla tabela
  - Kartal tabela
  - Gebze tabela
  - Istanbul Anadolu Yakasi tabela
- Ticari niyetli blog basliklari uretilmeli:
  - Kutu harf tabela fiyatini etkileyen faktorler
  - UV baski nedir, hangi yuzeylere uygulanir
  - Arac giydirme yaptirmadan once bilinmesi gerekenler
  - Totem tabela ve cephe tabelasi arasindaki farklar
  - Magaza acilisinda gereken reklam urunleri
- Gorsel alt metinleri proje, urun ve lokasyon baglamiyla daha acik yazilmali.
- Google Search Console verileri varsa sayfa bazli dusuk tiklama/yuksek gosterim firsatlari incelenmeli.

## Donusum Firsatlari

- Ana sayfaya "3 adimda teklif" bolumu eklenmeli:
  1. Olcu ve ihtiyac bilgisi paylasilir.
  2. Tasarim/on izleme ve teklif hazirlanir.
  3. Uretim ve montaj tamamlanir.
- Urun kartlarina "Teklif Al" veya "WhatsApp'tan Sor" CTA'si eklenmeli.
- Urun detay sayfalarinda otomatik urun adli WhatsApp mesaji daha gorunur hale getirilmeli.
- Teklif formunda logo, cephe fotografi veya olcu dosyasi yukleme ihtiyaci degerlendirilmeli.
- Kurumsal guven unsurlari daha yukari tasinmali:
  - 25+ yil tecrube
  - 10.000+ proje
  - 2.500 m2 uretim tesisi
  - kurumsal marka referanslari
  - montaj ve kesif sureci

## Oncelikli Gelistirme Plani

1. Ana sayfa ilk ekranini modernize et.
   - Daha guclu uretim/fabrika vurgusu.
   - Net CTA ayrimi: WhatsApp hizli teklif ve kurumsal teklif.
   - Marka ve proje guven bandi.

2. Urun detay sayfasi sablonunu gelistir.
   - Fiyati etkileyen faktorler.
   - Uygulama alanlari.
   - Teklif icin gereken bilgiler.
   - Daha guclu ilgili urun/proje yonlendirmeleri.

3. Teklif akislarini sadeleştir.
   - Hizli WhatsApp teklif akisi.
   - Detayli kurumsal teklif formu.
   - Form alanlarini kullanici niyetine gore bol.

4. SEO icerik planini baslat.
   - Ilk 10 blog/rehber yazisi ticari niyetli aramalara gore yazilsin.
   - Lokasyon sayfalari kontrollu sekilde acilsin.

5. Structured data genislet.
   - BreadcrumbList.
   - FAQPage.
   - Service/Product sayfa semalari.

6. Hosting stratejisini netlestir.
   - Mevcut Vercel akisi devam edecekse optimize et.
   - Sites ile yayinlanacaksa `.openai/hosting.json` ve uyumlu build/paketleme akisi hazirla.

## Sonuc

Site teknik olarak saglam ve icerik temeli guclu. En yuksek getirili gelistirme alani; daha kurumsal gorsel algi, daha net teklif akisi ve lokasyon/urun odakli SEO iceriklerinin sistemli sekilde artirilmasidir.

