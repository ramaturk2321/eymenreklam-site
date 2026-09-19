import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { URUN_KATEGORILERI } from './lib/kategoriler';

// İç linkler her zaman / ile bitmeli (trailingSlash: 'always') — aksi hâlde her tıklama 308 yönlendirme yapar.
const icLink = z.string().regex(/^\/[^\s]*\/$/, 'İç link "/" ile başlayıp "/" ile bitmeli (örn. /urunlerimiz/totem-tabela/)');


const projeler = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projeler' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    image: z.string(),
    images: z.array(z.string()).optional(),
    categories: z.array(z.string()),
    date: z.string(),
    order: z.number().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    excerpt: z.string(),
    image: z.string(),
    category: z.string(),
    date: z.string(),
    author: z.string().default('Eymen Reklam'),
    published: z.boolean().default(true),
  }),
});

const urunler = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/urunler' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    category: z.enum(URUN_KATEGORILERI),
    categoryHref: icLink,
    shortDesc: z.string(),
    mainImg: z.string(),
    gallery: z.array(z.string()),
    specs: z.array(z.object({
      icon: z.string(),
      label: z.string(),
      value: z.string(),
    })),
    descriptionSections: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      content: z.string().optional(),
      list: z.array(z.object({
        bold: z.string(),
        text: z.string(),
      })).optional(),
    })),
    technicalSpecs: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })),
    faq: z.array(z.object({
      q: z.string(),
      a: z.string(),
    })),
    relatedProducts: z.array(z.object({
      img: z.string(),
      title: z.string(),
      href: icLink,
      category: z.enum(URUN_KATEGORILERI),
    })),
  }),
});

const hizmetler = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/hizmetler' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    heroDesc: z.string(),
    heroImage: z.string().optional(),
    /** H1 için uzun başlık; menü/breadcrumb title'ı kullanmaya devam eder */
    heroTitle: z.string().optional(),
    order: z.number(),
    listIcon: z.string(),
    listDesc: z.string(),
    listFeatures: z.array(z.string()),
    listImage: z.string(),
    facility: z.object({
      title: z.string(),
      description: z.string(),
      stats: z.array(z.object({
        value: z.string(),
        label: z.string(),
      })),
      machines: z.array(z.string()),
      images: z.array(z.string()),
    }).optional(),
    features: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      desc: z.string(),
    })),
    products: z.array(z.object({
      title: z.string(),
      desc: z.string(),
      image: z.string(),
      href: icLink,
    })),
    process: z.array(z.object({
      step: z.string(),
      title: z.string(),
      desc: z.string(),
    })),
    sectors: z.array(z.string()),
    faq: z.array(z.object({
      q: z.string(),
      a: z.string(),
    })),
    /** Gerçek iş fotoğrafları galerisi; href varsa proje/ürün sayfasına gider */
    gallery: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      href: icLink.optional(),
    })).optional(),
    /** "Fiyatı ne belirler" kartları — rakam/fiyat aralığı YAZILMAZ (Ramazan kararı, 19 Eyl 2026) */
    fiyatFaktorleri: z.array(z.object({
      baslik: z.string(),
      aciklama: z.string(),
    })).optional(),
    /** Hizmet bölgesi bloğu */
    bolge: z.object({
      baslik: z.string(),
      metin: z.string(),
      ilceler: z.array(z.string()),
    }).optional(),
  }),
});

export const collections = { projeler, blog, urunler, hizmetler };
