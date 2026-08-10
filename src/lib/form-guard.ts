/**
 * Form spam koruması.
 *
 * Tasarım kuralı: gerçek müşteriye TEK BİR ek adım bile çıkarmaz.
 * Captcha yok, ek zorunlu alan yok, "robot değilim" kutusu yok.
 *
 * İki katman çalışır:
 *
 *  1) SERT ENGEL — sadece insan olmasi imkânsız sinyallerde.
 *     - Ekranda görünmeyen tuzak alan doldurulmuş (insan o alana erişemez)
 *     - Form açıldıktan sonra 3 saniyeden kısa sürede gönderilmiş
 *     Bu ikisinde yanlış pozitif riski pratikte sıfırdır.
 *
 *  2) İŞARETLEME — içerik şüpheliyse gönderim YİNE DE YAPILIR,
 *     sadece e-posta konusunun başına [ŞÜPHELİ] eklenir.
 *     Böylece gerçek bir müşteri asla kaybolmaz; Gmail'de filtrelenebilir.
 */

/** Tuzak alanın adı. Tarayıcı otomatik doldurmasının tanımadığı bir isim olmalı. */
const TUZAK_ALAN = 'sirket_web_adresi';

/** Bu süreden hızlı gönderim insan işi değildir. */
const MIN_DOLDURMA_MS = 3000;

/** İçerik puanı bu değere ulaşırsa [ŞÜPHELİ] işareti konur. */
const SUPHE_ESIGI = 2;

/** Soğuk satış / SEO spam'inde tekrar eden kalıplar (hepsi küçük harf). */
const SPAM_KALIPLARI = [
  'website redesign',
  'redesign their websites',
  'we help businesses',
  'i took a quick look',
  'took a look at your site',
  'grab a time',
  'book a call',
  'schedule a call',
  'hop on a call',
  'quick chat',
  'free audit',
  'free consultation',
  'rank higher',
  'first page of google',
  'seo services',
  'digital marketing services',
  'guest post',
  'backlink',
  'link building',
  'increase your traffic',
  'boost your sales',
  'convert better',
  'lead generation',
  'no obligation',
  'unsubscribe',
  // Türkçe soğuk satış kalıpları. Baştaki "İ" harfi toLowerCase() ile
  // bozulduğu için kalıplar bilerek kelime ortasından başlatıldı.
  'sayfaya çıkar',
  'sıralara çıkar',
  'ücretsiz analiz',
  'ücretsiz danışmanlık',
  'toplu mail',
  'toplu sms',
  'reklam ajansımız',
];

export interface GuardSonucu {
  /** true ise gönderim yapılmamalı (kesin bot). */
  engelle: boolean;
  /** İçerik şüpheli ama gönderilecek. */
  supheli: boolean;
  /** Şüphe gerekçeleri — e-postaya not olarak eklenir. */
  gerekceler: string[];
}

export interface FormGuard {
  /** Gönderimi değerlendirir. */
  degerlendir(): GuardSonucu;
  /**
   * Web3Forms'a gönderilecek veriyi hazırlar:
   * tuzak alanı temizler, şüpheliyse konuyu işaretler.
   */
  veriHazirla(sonuc: GuardSonucu): FormData;
}

/**
 * Forma tuzak alanı ekler ve açılış zamanını kaydeder.
 * Sayfa yüklenirken bir kez çağrılmalı.
 */
export function formuKoru(form: HTMLFormElement): FormGuard {
  const acilisZamani = Date.now();

  // Tuzak alan: ekran dışına konumlanır (display:none DEĞİL — akıllı botlar
  // display:none alanları atlar, ekran dışındakileri doldurur).
  // Klavye ve ekran okuyucu erişimine kapalı, yani gerçek kullanıcı göremez.
  const tuzak = document.createElement('input');
  tuzak.type = 'text';
  tuzak.name = TUZAK_ALAN;
  tuzak.tabIndex = -1;
  tuzak.autocomplete = 'off';
  tuzak.setAttribute('aria-hidden', 'true');
  tuzak.style.cssText =
    'position:absolute;left:-9999px;top:0;width:1px;height:1px;opacity:0;pointer-events:none';
  form.appendChild(tuzak);

  return {
    degerlendir(): GuardSonucu {
      if (tuzak.value.trim() !== '') {
        return { engelle: true, supheli: true, gerekceler: ['tuzak alan dolduruldu'] };
      }

      if (Date.now() - acilisZamani < MIN_DOLDURMA_MS) {
        return { engelle: true, supheli: true, gerekceler: ['form 3 saniyeden hızlı gönderildi'] };
      }

      const { puan, gerekceler } = icerikPuani(form);
      return { engelle: false, supheli: puan >= SUPHE_ESIGI, gerekceler };
    },

    veriHazirla(sonuc: GuardSonucu): FormData {
      const veri = new FormData(form);
      veri.delete(TUZAK_ALAN);

      if (sonuc.supheli) {
        const konu = String(veri.get('subject') ?? 'Eymen Reklam — Form');
        veri.set('subject', `[ŞÜPHELİ] ${konu}`);
        veri.set('spam_isareti', sonuc.gerekceler.join(' · '));
      }

      return veri;
    },
  };
}

/** Metin ve telefon alanlarına bakarak şüphe puanı üretir. */
function icerikPuani(form: HTMLFormElement): { puan: number; gerekceler: string[] } {
  let puan = 0;
  const gerekceler: string[] = [];

  const metin = serbestMetin(form);

  // 1) Link — soğuk satış mesajının tek amacı linke tıklatmaktır.
  //    Ama gerçek müşteri de kendi sitesini / görsel bağlantısını yazabilir,
  //    o yüzden tek başına işaretlemeye yetmeyecek kadar düşük puan.
  if (/(https?:\/\/|www\.)/i.test(metin)) {
    puan += 1;
    gerekceler.push('mesajda link var');
  }

  // 2) İngilizce satış kalıbı. Müşterilerimiz Türkçe yazar.
  const kucuk = metin.toLowerCase();
  const eslesen = SPAM_KALIPLARI.filter((kalip) => kucuk.includes(kalip));
  if (eslesen.length > 0) {
    puan += 2;
    gerekceler.push(`İngilizce satış kalıbı: ${eslesen.slice(0, 3).join(', ')}`);
  }

  // 3) Uzun metinde tek bir Türkçe karakter yoksa zayıf bir sinyaldir.
  //    Tek başına işaretlemeye yetmez (klavyesi Türkçe olmayan müşteri olabilir).
  if (metin.length > 120 && !/[çğıöşüÇĞİÖŞÜ]/.test(metin)) {
    puan += 1;
    gerekceler.push('metinde hiç Türkçe karakter yok');
  }

  // 4) Türkiye formatına uymayan telefon — zayıf sinyal.
  const telefon = alanDegeri(form, ['phone', 'telefon']);
  if (telefon && !turkiyeTelefonuMu(telefon)) {
    puan += 1;
    gerekceler.push('telefon Türkiye formatında değil');
  }

  return { puan, gerekceler };
}

/** Formdaki serbest metin alanlarını (textarea + isim/firma) birleştirir. */
function serbestMetin(form: HTMLFormElement): string {
  const parcalar: string[] = [];

  form.querySelectorAll('textarea').forEach((alan) => parcalar.push(alan.value));

  for (const ad of ['name', 'ad_soyad', 'company', 'firma', 'unvan']) {
    const deger = alanDegeri(form, [ad]);
    if (deger) parcalar.push(deger);
  }

  return parcalar.join('\n');
}

function alanDegeri(form: HTMLFormElement, adlar: string[]): string {
  for (const ad of adlar) {
    const alan = form.elements.namedItem(ad);
    if (alan instanceof HTMLInputElement || alan instanceof HTMLTextAreaElement) {
      const deger = alan.value.trim();
      if (deger) return deger;
    }
  }
  return '';
}

/**
 * Kabaca Türkiye numarası mı diye bakar.
 * Bilerek geniş tutuldu: müşteri 0532..., +90 532..., 216 379... hepsi geçerli.
 * Sadece bariz yabancı numaralar elenir.
 */
function turkiyeTelefonuMu(ham: string): boolean {
  let rakam = ham.replace(/\D/g, '');

  if (rakam.startsWith('0090')) rakam = rakam.slice(4);
  else if (rakam.startsWith('90') && rakam.length >= 12) rakam = rakam.slice(2);
  if (rakam.startsWith('0')) rakam = rakam.slice(1);

  // Yerel format: 10 hane ve alan/operatör kodu 2-5 arası (212/216/312/532/545...)
  return rakam.length === 10 && /^[2-5]/.test(rakam);
}
