import { z } from 'zod';

export const programSchema = z.object({
  title: z.string(),
  description: z.string(),
  duration: z.string(),
  price: z.string(),
  features: z.array(z.string()),
  isPopular: z.boolean().default(false),
});

export const testimonialSchema = z.object({
  name: z.string(),
  role: z.string(),
  content: z.string(),
  avatar: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
});

export const healthCoachSchema = z.object({
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
  
  // About Section
  about: z.object({
    title: z.string(),
    content: z.string(),
    image: z.string().optional(),
    stats: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    ).length(3),
  }),
  
  // Programs Section
  programs: z.object({
    title: z.string(),
    subtitle: z.string(),
    items: z.array(programSchema).min(1, 'At least one program is required'),
  }),
  
  // Testimonials Section
  testimonials: z.object({
    title: z.string(),
    items: z.array(testimonialSchema).min(1, 'At least one testimonial is required'),
  }),
  
  // Final CTA Section
  finalCta: z.object({
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
  }),
  
  // Global Styles
  theme: z
    .object({
      primaryColor: z.string().default('#10B981'),
      secondaryColor: z.string().default('#059669'),
      textColor: z.string().default('#1F2937'),
      backgroundColor: z.string().default('#F9FAFB'),
    })
    .optional(),
});

export type HealthCoachData = z.infer<typeof healthCoachSchema>;
