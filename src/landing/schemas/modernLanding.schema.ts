import { z } from 'zod';

export const heroSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  description: z.string().optional(),
  backgroundImage: z.string().optional(),
  ctaButtons: z.array(
    z.object({
      text: z.string(),
      url: z.string().optional(),
      variant: z.enum(['primary', 'secondary']).default('primary'),
    })
  ).min(1).max(2),
});

export const testimonialSchema = z.object({
  name: z.string(),
  role: z.string(),
  content: z.string(),
  avatar: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
});

export const ctaSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  primaryButton: z.object({
    text: z.string(),
    url: z.string().optional(),
    variant: z.enum(['primary', 'secondary']).default('primary'),
  }),
  secondaryButton: z
    .object({
      text: z.string(),
      url: z.string().optional(),
      variant: z.enum(['primary', 'secondary']).default('secondary'),
    })
    .optional(),
});

export const modernLandingSchema = z.object({
  // Hero Section
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
    backgroundImage: z.string().optional(),
    ctaButtons: z.array(
      z.object({
        text: z.string(),
        url: z.string().optional(),
        variant: z.enum(['primary', 'secondary']).default('primary'),
      })
    ).min(1).max(2),
  }),
  
  // Features Section (opcional para modernLanding)
  features: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    items: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
      })
    ).min(1).optional(),
  }).optional(),
  
  // Testimonials Section
  testimonials: z.object({
    title: z.string().optional(),
    items: z.array(testimonialSchema).min(1, 'At least one testimonial is required'),
  }),
  
  // Final CTA Section
  finalCta: ctaSchema,
  
  // Global Styles
  theme: z
    .object({
      primaryColor: z.string().default('#4f46e5'),
      secondaryColor: z.string().default('#7c3aed'),
      textColor: z.string().default('#1f2937'),
      backgroundColor: z.string().default('#ffffff'),
    })
    .optional(),
});

export type ModernLandingData = z.infer<typeof modernLandingSchema>;
