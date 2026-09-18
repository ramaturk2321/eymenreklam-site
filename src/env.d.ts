/**
 * Global tip tanimlari.
 *
 * trackEvent: BaseLayout.astro icindeki client script'te tanimlanir. Donusum
 * olayini IKI hedefe birden gonderir: Vercel Analytics (site analizi) ve
 * GA4/Google Ads (gtag). Form success dallarindan (iletisim.astro,
 * teklif-al.astro) cagrilabilsin diye window'a asilir. Script yuklenmeden
 * once cagrilma ihtimaline karsi optional.
 *
 * gtag / dataLayer: BaseLayout.astro head'indeki is:inline script'te tanimlanir.
 * gtag.js gec yuklendigi icin cagrilar dataLayer'da kuyruklanir.
 */
declare global {
  interface Window {
    trackEvent?: (name: string, props?: Record<string, string | number | boolean | null>) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export {};
