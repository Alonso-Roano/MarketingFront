import { z } from 'zod';

export const navItemSchema = z.object({
  label: z.string(),
  href: z.string(),
  isButton: z.boolean().default(false),
  variant: z.enum(['primary', 'secondary', 'outline', 'ghost']).optional(),
});

export const heroSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  description: z.string().optional(),
  backgroundImage: z.string().optional(),
  overlayOpacity: z.number().min(0).max(100).default(50),
  ctaButtons: z.array(
    z.object({
      text: z.string(),
      url: z.string(),
      variant: z.enum(['primary', 'secondary', 'outline']).default('primary'),
      icon: z.string().optional(),
    })
  ).min(1).max(3),
  features: z.array(
    z.object({
      text: z.string(),
      icon: z.string().optional(),
    })
  ).max(4).optional(),
});

export const featureSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  color: z.string().default('primary'),
  link: z.string().optional(),
});

export const testimonialSchema = z.object({
  name: z.string(),
  role: z.string(),
  content: z.string(),
  avatar: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  company: z.string().optional(),
});

export const pricingPlanSchema = z.object({
  name: z.string(),
  price: z.string(),
  period: z.string(),
  description: z.string().optional(),
  features: z.array(z.string()),
  isPopular: z.boolean().default(false),
  cta: z.object({
    text: z.string(),
    url: z.string(),
  }),
});

export const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const teamMemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
  socialLinks: z.record(z.string()).optional(),
});

export const contactInfoSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  socialMedia: z.record(z.string()).optional(),
});

export const modernLandingSchema = z.object({
  // Navigation
  navigation: z.object({
    logo: z.string(),
    links: z.array(navItemSchema),
    ctaButton: navItemSchema.optional(),
  }),

  // Hero Section
  hero: heroSchema,

  // Features Section
  features: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    items: z.array(featureSchema).min(2),
    layout: z.enum(['grid', 'list', 'cards']).default('grid'),
  }),

  // Pricing Section
  pricing: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    plans: z.array(pricingPlanSchema).min(1),
    disclaimer: z.string().optional(),
  }).optional(),

  // Testimonials
  testimonials: z.object({
    title: z.string().optional(),
    items: z.array(testimonialSchema).min(1),
  }).optional(),

  // Team Section
  team: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    members: z.array(teamMemberSchema).min(1),
  }).optional(),

  // FAQ Section
  faq: z.object({
    title: z.string().optional(),
    items: z.array(faqSchema).min(1),
  }).optional(),

  // CTA Section
  cta: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    buttons: z.array(
      z.object({
        text: z.string(),
        url: z.string(),
        variant: z.enum(['primary', 'secondary', 'outline']).default('primary'),
      })
    ).min(1),
  }).optional(),

  // Footer
  footer: z.object({
    description: z.string().optional(),
    links: z.array(
      z.object({
        title: z.string(),
        items: z.array(navItemSchema),
      })
    ),
    copyright: z.string().optional(),
    contact: contactInfoSchema.optional(),
  }),
});

export type ModernLandingData = z.infer<typeof modernLandingSchema>;
