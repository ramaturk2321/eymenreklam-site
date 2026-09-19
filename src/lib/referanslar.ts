/**
 * Referans müşteriler — tek kaynak.
 * /referanslarimiz/ sayfası, hizmet sayfalarındaki "çalıştığımız markalar" bloğu,
 * ana sayfa şeridi ve llms.txt buradan beslenir.
 *
 * Kural: yalnız TESLİM EDİLMİŞ işler girilir; teklif aşamasındaki müşteri yazılmaz.
 * `hizmetler` anahtarları src/content/hizmetler/*.json dosya adlarıdır.
 */

export type HizmetId =
  | 'tabela'
  | 'uv-baski'
  | 'folyo-giydirme'
  | 'magaza-reklam'
  | 'bez-baski'
  | 'afis-baski'
  | 'dijital-baski'
  | 'sunum-stand'
  | 'grafik-tasarim'
  | 'is-guvenligi';

export interface Referans {
  /** Marka / kurum adı */
  ad: string;
  /** Yaptığımız iş, tek cümle */
  isler: string;
  /** Ölçek: şube sayısı, şehir, m² vb. (varsa) */
  olcek?: string;
  /** Proje sayfası (varsa) — "/" ile bitmeli */
  href?: string;
  /** Hangi hizmet sayfalarında gösterilecek */
  hizmetler: HizmetId[];
  /** Ana sayfa / öne çıkan şeritte görünsün */
  oneCikan?: boolean;
}

export interface Sektor {
  id: string;
  ad: string;
  aciklama: string;
  referanslar: Referans[];
}

export const sektorler: Sektor[] = [
  {
    id: 'perakende',
    ad: 'Perakende & Market Zincirleri',
    aciklama:
      'Çok şubeli markaların tabela, mağaza içi reklam ve kampanya görsellerini tek merkezden, aynı ölçü ve malzeme standardıyla üretiyoruz.',
    referanslar: [
      {
        ad: 'Hakmar / Hakmar Express',
        isler: 'Mağaza cephe tabelaları, kutu harf, insert ve afiş serileri, araç giydirme, özel marka (Haktat) ambalaj tasarımı.',
        olcek: '800+ mağazalı zincir, 2000’den beri süregelen iş birliği',
        href: '/urunlerimiz/hakmar-avm/',
        hizmetler: ['tabela', 'magaza-reklam', 'folyo-giydirme', 'afis-baski', 'dijital-baski', 'grafik-tasarim'],
        oneCikan: true,
      },
      {
        ad: 'Tarım Kredi KOOP Market',
        isler: 'İstanbul şubelerinde yeşil kompozit cephe kaplama, ışıklı kutu harf tabela, yönlendirme ve cam folyo uygulamaları.',
        olcek: 'İstanbul geneli çok şubeli uygulama',
        href: '/projelerimiz/koop-market-magaza-tabela/',
        hizmetler: ['tabela', 'magaza-reklam', 'folyo-giydirme'],
        oneCikan: true,
      },
      {
        ad: 'A101',
        isler: 'Lojistik deposu yönlendirme tabelaları, bölüm isimlikleri ve iş güvenliği levhaları.',
        href: '/projelerimiz/a101-depo/',
        hizmetler: ['tabela', 'is-guvenligi'],
        oneCikan: true,
      },
      {
        ad: 'Bizim Toptan',
        isler: 'Mağaza içi roll-up banner ve stand uygulamaları.',
        href: '/projelerimiz/bizim-toptan-prj/',
        hizmetler: ['sunum-stand', 'magaza-reklam'],
        oneCikan: true,
      },
      {
        ad: 'Civil',
        isler: 'Bursa Nilüfer, Kars ve Sakarya mağazalarında cephe tabelası, kutu harf ve iç mekân görsel uygulamaları.',
        olcek: '3 şehirde mağaza açılışı',
        href: '/projelerimiz/civil-bursa/',
        hizmetler: ['tabela', 'magaza-reklam'],
        oneCikan: true,
      },
      {
        ad: 'PAWCO Super Pet Store',
        isler: 'Kozzy AVM ve Water Garden AVM şubelerinde pleksi ışıklı kutu harf, AVM koridoru lightbox duvarı, neon LED, cam folyo ve mağaza içi panolar.',
        olcek: '2 AVM şubesi, marka standardı dokümanı',
        href: '/projelerimiz/pawco-kozzy-avm/',
        hizmetler: ['tabela', 'magaza-reklam', 'folyo-giydirme'],
        oneCikan: true,
      },
      {
        ad: 'Eve Mağazaları',
        isler: 'Kozmetik mağazalarında kutu harf tabela, vitrin folyo ve cephe giydirme.',
        href: '/projelerimiz/eve-magazalari/',
        hizmetler: ['tabela', 'magaza-reklam', 'folyo-giydirme'],
        oneCikan: true,
      },
      {
        ad: 'Boldy Yemek & Market',
        isler: 'Bulvar 216 Ataşehir mağazasında cephe branda germe ve dijital baskı.',
        href: '/projelerimiz/boldy-bulvar-216/',
        hizmetler: ['bez-baski', 'magaza-reklam'],
        oneCikan: true,
      },
      {
        ad: 'Tatlıköy',
        isler: 'Çerkezköy ve Arnavutköy şubelerinde cephe tabelası üretimi ve montajı.',
        olcek: '3 şube',
        hizmetler: ['tabela'],
      },
      {
        ad: 'Lola Barcelona',
        isler: 'Mağaza cephesi ışıklı kutu harf tabela.',
        href: '/projelerimiz/lola-barcelona/',
        hizmetler: ['tabela'],
      },
      {
        ad: 'Suadiye Marmaris Büfe',
        isler: 'Mağaza tabelası ve reklam uygulaması.',
        href: '/projelerimiz/suadiye-marmaris/',
        hizmetler: ['tabela'],
      },
    ],
  },
  {
    id: 'gida',
    ad: 'Gıda & Hızlı Tüketim',
    aciklama:
      'Fabrika girişinden market rafına kadar: totem, dolap kaplama, palet eteği, ambalaj ve fuar standı.',
    referanslar: [
      {
        ad: 'Ülker',
        isler: 'Promosyon ürünleri için cam üzerine UV baskı ve laminasyon.',
        href: '/projelerimiz/ulker-uv-baski/',
        hizmetler: ['uv-baski'],
        oneCikan: true,
      },
      {
        ad: 'Türk Şeker',
        isler: 'Çiftçi İletişim Noktası cephesi için kutu harf tabela.',
        href: '/projelerimiz/turk-seker/',
        hizmetler: ['tabela'],
        oneCikan: true,
      },
      {
        ad: 'Tatbak',
        isler: 'FOODIST 2026 fuarında 40 m² ada stant, Gebze mağazası kutu harf tabela, cam folyo ve iç mekân görselleri, ticari araç giydirme.',
        href: '/projelerimiz/tatbak-foodist-stant/',
        hizmetler: ['sunum-stand', 'tabela', 'folyo-giydirme'],
        oneCikan: true,
      },
      {
        ad: 'Çamlıbel Süt',
        isler: 'Dağıtım araçları için araç giydirme ve folyo kaplama.',
        href: '/projelerimiz/camlibel-sut/',
        hizmetler: ['folyo-giydirme'],
      },
      {
        ad: 'Doruk Çikolata',
        isler: 'Afiş, broşür, hediye kutusu ve ambalaj tasarımı.',
        href: '/projelerimiz/doruk-tasarim/',
        hizmetler: ['grafik-tasarim', 'dijital-baski'],
      },
      {
        ad: 'Unkar / hak-et',
        isler: 'Fabrika girişi totem tabela ve reyon dondurucu dolap folyo kaplama.',
        href: '/projelerimiz/unkar-totem/',
        hizmetler: ['tabela', 'folyo-giydirme'],
      },
      {
        ad: 'Aytaç',
        isler: 'Dondurulmuş et ürünleri için derin dondurucu dolap kaplama.',
        href: '/projelerimiz/dolap-giydirme/',
        hizmetler: ['folyo-giydirme'],
      },
      {
        ad: 'Asperox',
        isler: 'Sarı Güç kampanyası için palet eteği baskısı.',
        href: '/projelerimiz/palet-etegi/',
        hizmetler: ['dijital-baski', 'magaza-reklam'],
      },
      {
        ad: 'Rençber',
        isler: 'Ticari araç giydirme.',
        href: '/projelerimiz/arac-giydirme-uygulamalari/',
        hizmetler: ['folyo-giydirme'],
      },
    ],
  },
  {
    id: 'sanayi',
    ad: 'Sanayi, Otomotiv & Kurumsal',
    aciklama:
      'Fabrika iç yönlendirme sistemleri, totem ve cephe tabelaları, bayi ve showroom uygulamaları.',
    referanslar: [
      {
        ad: 'Anadolu Isuzu',
        isler: 'Fabrika iç mekân yönlendirme tabela sistemi.',
        href: '/projelerimiz/isuzu-yonlendirme/',
        hizmetler: ['tabela'],
        oneCikan: true,
      },
      {
        ad: 'Beko (Bereket Mobilya bayisi)',
        isler: '3D kutu harf logolu totem tabela ve kampanya paneli.',
        href: '/projelerimiz/beko-bereket-mobilya-totem/',
        hizmetler: ['tabela'],
        oneCikan: true,
      },
      {
        ad: '2Plan Otomotiv',
        isler: 'Eskişehir şubesi totem tabela; Etiler binası cephe branda giydirme ve UV baskı.',
        href: '/projelerimiz/etiler-2plan/',
        hizmetler: ['tabela', 'bez-baski', 'uv-baski'],
        oneCikan: true,
      },
      {
        ad: 'İntema (Eczacıbaşı)',
        isler: 'Mağaza iç mekân yönlendirme tabelası.',
        href: '/projelerimiz/intema/',
        hizmetler: ['tabela'],
        oneCikan: true,
      },
      {
        ad: 'Yıldız Entegre',
        isler: 'VarioClic, VarioDor ve Aryen mağazaları için cephe tabelası.',
        href: '/projelerimiz/yildiz-entegre/',
        hizmetler: ['tabela'],
      },
      {
        ad: 'İnoksan',
        isler: 'Endüstriyel mutfak fuarı standı tasarımı ve uygulaması.',
        href: '/projelerimiz/inoksan/',
        hizmetler: ['sunum-stand'],
      },
      {
        ad: 'Banat Ambalaj',
        isler: 'Fabrika girişi totem tabela.',
        href: '/projelerimiz/banat-totem/',
        hizmetler: ['tabela'],
      },
      {
        ad: 'Som Kağıt',
        isler: 'Ofis duvar giydirme ve kutu harf tabela.',
        href: '/projelerimiz/som-kagit/',
        hizmetler: ['tabela', 'folyo-giydirme'],
      },
      {
        ad: 'Seri Otomotiv',
        isler: 'Kurumsal kimlik tasarımı.',
        hizmetler: ['grafik-tasarim'],
      },
      {
        ad: 'Rent Go',
        isler: 'Araç kiralama ofisi cephe tabelası ve yelken bayrak.',
        href: '/projelerimiz/rent-go/',
        hizmetler: ['tabela', 'bez-baski'],
      },
      {
        ad: 'GRL Marine Electronics',
        isler: 'Fuar standı tasarımı ve uygulaması.',
        href: '/projelerimiz/grl-marine/',
        hizmetler: ['sunum-stand'],
      },
      {
        ad: 'BG Film / A90 Stüdyo',
        isler: 'Stüdyo binası kutu harf tabela.',
        href: '/projelerimiz/bg-film/',
        hizmetler: ['tabela'],
      },
    ],
  },
  {
    id: 'avm',
    ad: 'AVM, Gayrimenkul & İnşaat',
    aciklama:
      'AVM cephe ve totemleri, satış ofisi reklam bantları, konut projesi tabelaları ve billboard tasarımı.',
    referanslar: [
      {
        ad: 'Meydan 77 AVM',
        isler: 'Komple cephe tabelası ve totem tabela.',
        href: '/projelerimiz/meydan-avm/',
        hizmetler: ['tabela'],
        oneCikan: true,
      },
      {
        ad: 'Kiler GYO — Referans Pendik',
        isler: 'Satış ofisi cephesi boyunca dijital baskılı reklam bandı, satış ofisi yazısı ve yol kenarı yönlendirme tabelası.',
        href: '/projelerimiz/kiler-gyo-referans-pendik/',
        hizmetler: ['tabela', 'dijital-baski'],
        oneCikan: true,
      },
      {
        ad: 'Doruk Park Villaları',
        isler: 'Taş duvar üzerine kutu harf tabela.',
        href: '/projelerimiz/doruk-park/',
        hizmetler: ['tabela'],
      },
      {
        ad: 'Sawkoop',
        isler: 'Kutu harf çatı tabelası üretimi ve montajı.',
        href: '/projelerimiz/sawkoop/',
        hizmetler: ['tabela'],
      },
      {
        ad: 'Göktemiz İnşaat',
        isler: 'Billboard reklam tasarımı.',
        href: '/projelerimiz/goktemiz-billboard/',
        hizmetler: ['grafik-tasarim', 'afis-baski'],
      },
      {
        ad: 'ASKO',
        isler: 'LED ekranlı totem tabela 3D tasarımı.',
        href: '/projelerimiz/asko-totem/',
        hizmetler: ['tabela', 'grafik-tasarim'],
      },
    ],
  },
  {
    id: 'hizmet',
    ad: 'Sağlık, Spor, Restoran & Hizmet',
    aciklama:
      'Klinik ve restoran cepheleri, menü panoları, spor tesisi brandaları ve fuar standları.',
    referanslar: [
      {
        ad: 'Züber Padel Club İzmir',
        isler: 'Kort çevresi kuşgözlü PVC branda baskılar, koruma minderleri ve skor tabelası.',
        href: '/projelerimiz/zuber-padel-izmir/',
        hizmetler: ['bez-baski', 'tabela'],
        oneCikan: true,
      },
      {
        ad: 'Mevsim Diş Sağlığı Polikliniği',
        isler: 'Cephe reklam tasarımı ve uygulaması.',
        href: '/projelerimiz/mevsim-dis/',
        hizmetler: ['tabela'],
      },
      {
        ad: 'MedicaBoss & Macka’s Laboratories',
        isler: 'Fuar standı tasarımı ve uygulaması.',
        href: '/projelerimiz/medicaboss/',
        hizmetler: ['sunum-stand'],
      },
      {
        ad: 'Tevfik Usta Kebap',
        isler: 'Restoran cephe tabelası ve iç mekân reklam uygulaması.',
        href: '/projelerimiz/tevfik-usta/',
        hizmetler: ['tabela'],
      },
      {
        ad: 'Keyfet Steakhouse',
        isler: 'Logo, iç mekân ve tabela konsept tasarımı.',
        href: '/projelerimiz/keyfet/',
        hizmetler: ['grafik-tasarim', 'tabela'],
      },
      {
        ad: 'Lazios Pizza',
        isler: 'Işıklı menü panosu ve lightbox tabela.',
        href: '/projelerimiz/lazios/',
        hizmetler: ['tabela', 'magaza-reklam'],
      },
    ],
  },
];

/** Kurumsal sunumda logosu bulunan, sitede ayrı proje sayfası olmayan markalar (yalnız isim). */
export const digerMarkalar = ['Aytemiz', 'Total'];

/** Tüm referanslar düz liste */
export const tumReferanslar: Referans[] = sektorler.flatMap(s => s.referanslar);

/** Bir hizmet sayfasında gösterilecek markalar (öne çıkanlar önce) */
export function hizmetReferanslari(hizmet: HizmetId): Referans[] {
  return tumReferanslar
    .filter(r => r.hizmetler.includes(hizmet))
    .sort((a, b) => Number(!!b.oneCikan) - Number(!!a.oneCikan));
}

/** Ana sayfa şeridi için öne çıkan marka adları */
export const oneCikanMarkalar: Referans[] = tumReferanslar.filter(r => r.oneCikan);

/** Çok şubeli / seri uygulama yaptığımız markalar — kurumsal sayfa ve SSS için */
export const zincirMarkalar = tumReferanslar.filter(r => r.olcek);
