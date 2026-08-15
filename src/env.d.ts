/**
 * Global tip tanimlari.
 *
 * trackEvent: BaseLayout.astro icindeki client script'te tanimlanir ve
 * Vercel Analytics'e ozel olay gonderir. Form success dallarindan
 * (iletisim.astro, teklif-al.astro) cagrilabilsin diye window'a asilir.
 * Script yuklenmeden once cagrilma ihtimaline karsi optional.
 */
declare global {
  interface Window {
    trackEvent?: (name: string, props?: Record<string, string | number | boolean | null>) => void;
  }
}

export {};
