import { z } from 'zod';

export const featureSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
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
    variant: z.enum(['primary', 'secondary', 'outline']).default('primary'),
  }),
  secondaryButton: z
    .object({
      text: z.string(),
      url: z.string().optional(),
      variant: z.enum(['primary', 'secondary', 'outline']).default('secondary'),
    })
    .optional(),
});

export const defaultLandingPageSchema = z.object({
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
    ),
  }),
  
  // Features Section
  features: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    items: z.array(featureSchema).min(3, 'At least 3 features are required'),
  }),
  
  // Testimonials Section (optional)
  testimonials: z
    .object({
      title: z.string(),
      items: z.array(testimonialSchema).min(1, 'At least one testimonial is required'),
    })
    .optional(),
  
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

export type DefaultLandingPageData = z.infer<typeof defaultLandingPageSchema>;
