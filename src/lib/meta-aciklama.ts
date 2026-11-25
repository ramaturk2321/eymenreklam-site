// Meta açıklama boyu: Google masaüstünde ~155–160 karakterden sonrasını keser,
// 120'nin altı ise arama sonucunda boş kalır. İçerik dosyalarındaki açıklamalar
// sayfa içinde (kart, giriş paragrafı) de kullanıldığı için orada kısaltılmaz;
// yalnız <meta name="description"> ve og/twitter açıklaması buradan geçer.
export const ACIKLAMA_MIN = 120;
export const ACIKLAMA_MAX = 160;

/** Kısa açıklamaya, 160'a sığan ilk ek cümleyi ekler (uzundan kısaya sıralı adaylar). */
export function aciklamaTamamla(metin: string, ek?: string | string[]): string {
  const m = metin.trim();
  if (!ek || m.length >= ACIKLAMA_MIN) return m;
  const govde = /[.!?…]$/.test(m) ? m : `${m}.`;
  for (const aday of Array.isArray(ek) ? ek : [ek]) {
    const sonuc = `${govde} ${aday}`;
    if (sonuc.length <= ACIKLAMA_MAX) return sonuc;
  }
  return m;
}

/** 160'ı aşan açıklamayı önce cümle, sonra yan cümle, en son kelime sınırından kısaltır. */
export function aciklamaKisalt(metin: string): string {
  const m = metin.trim();
  if (m.length <= ACIKLAMA_MAX) return m;
  const pencere = m.slice(0, ACIKLAMA_MAX);
  // 1) Tam cümle sonu (en az 120 karakter kalsın — daha kısası arama sonucunda boş kalır)
  const cumle = Math.max(pencere.lastIndexOf('. '), pencere.lastIndexOf('! '), pencere.lastIndexOf('? '));
  if (cumle >= ACIKLAMA_MIN) return m.slice(0, cumle + 1);
  // 2) Yan cümle: virgül / noktalı virgül / iki nokta / tire
  const kesit = m.slice(0, ACIKLAMA_MAX - 1);
  const yan = Math.max(kesit.lastIndexOf(', '), kesit.lastIndexOf('; '), kesit.lastIndexOf(': '), kesit.lastIndexOf(' — '), kesit.lastIndexOf('، '));
  if (yan >= ACIKLAMA_MIN) return `${m.slice(0, yan).trimEnd()}…`;
  // 3) Kelime sınırı
  const kelime = kesit.lastIndexOf(' ');
  return `${m.slice(0, kelime > 0 ? kelime : ACIKLAMA_MAX - 1).replace(/[\s,;:—-]+$/, '')}…`;
}
