/**
 * Proje sayfasının altındaki "diğer projeler" kartları.
 * Projeler ilk kategoriye göre sıralanıp halka yapılır; her sayfa halkadaki
 * sonraki n projeyi gösterir. Böylece her proje en az n sayfadan link alır
 * (eskiden bütün sayfalar aynı ilk 3 projeyi gösteriyordu, yeni eklenenler
 * yalnız liste sayfasından link alıyordu).
 */
interface ProjeGirdisi {
  id: string;
  data: { categories: string[]; order?: number };
}

export function ilgiliProjeler<T extends ProjeGirdisi>(id: string, tum: T[], n = 3): T[] {
  const sirali = [...tum].sort(
    (a, b) =>
      (a.data.categories[0] ?? '').localeCompare(b.data.categories[0] ?? '', 'tr') ||
      (a.data.order ?? 99) - (b.data.order ?? 99) ||
      a.id.localeCompare(b.id),
  );
  const i = sirali.findIndex(p => p.id === id);
  if (i < 0) return sirali.slice(0, n);
  const adet = Math.min(n, sirali.length - 1);
  return Array.from({ length: adet }, (_, k) => sirali[(i + 1 + k) % sirali.length]);
}
