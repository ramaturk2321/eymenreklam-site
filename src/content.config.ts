import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projeler = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projeler' }),
  schema: z.object({
    title: z.string(),
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
    description: z.string(),
    category: z.string(),
    categoryHref: z.string(),
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
      href: z.string(),
      category: z.string(),
    })),
  }),
});

const hizmetler = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/hizmetler' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroDesc: z.string(),
    heroImage: z.string().optional(),
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
      href: z.string(),
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
  }),
});

export const collections = { projeler, blog, urunler, hizmetler };
