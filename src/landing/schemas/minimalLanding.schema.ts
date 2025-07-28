import { z } from 'zod';

export const heroSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  backgroundImage: z.string().optional(),
  ctaButton: z.object({
    text: z.string(),
    url: z.string().optional(),
  }),
});

export const testimonialSchema = z.object({
  name: z.string(),
  content: z.string(),
  avatar: z.string().optional(),
});

export const ctaSchema = z.object({
  title: z.string(),
  buttonText: z.string(),
  buttonUrl: z.string().optional(),
});

export const minimalLandingSchema = z.object({
  // Hero Section (simplified)
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
    backgroundImage: z.string().optional(),
    ctaButton: z.object({
      text: z.string(),
      url: z.string().optional(),
    }),
  }),
  
  // Single Testimonial (simplified)
  testimonial: z.object({
    name: z.string(),
    content: z.string(),
    avatar: z.string().optional(),
  }),
  
  // Final CTA (simplified)
  finalCta: z.object({
    title: z.string(),
    buttonText: z.string(),
    buttonUrl: z.string().optional(),
  }),
  
  // Minimal Theme Options
  theme: z
    .object({
      primaryColor: z.string().default('#2563eb'),
      textColor: z.string().default('#1f2937'),
      backgroundColor: z.string().default('#ffffff'),
    })
    .optional(),
});

export type MinimalLandingData = z.infer<typeof minimalLandingSchema>;
