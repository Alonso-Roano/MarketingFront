import { z } from 'zod';

export const teamMemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
  socialLinks: z.record(z.string()).optional(),
});

export const portfolioItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
  category: z.string().optional(),
  url: z.string().optional(),
});

export const serviceSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  features: z.array(z.string()).optional(),
  price: z.string().optional(),
});

export const serviceAgencySchema = z.object({
  // Hero Section
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
    backgroundImage: z.string().optional(),
    ctaButton: z.object({
      text: z.string(),
      url: z.string().optional(),
      variant: z.enum(['primary', 'secondary']).default('primary'),
    }),
  }),
  
  // Services Section
  services: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    items: z.array(serviceSchema).min(1, 'At least one service is required'),
  }),
  
  // Portfolio Section
  portfolio: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    items: z.array(portfolioItemSchema).min(2, 'At least two portfolio items are required'),
  }),
  
  // Team Section
  team: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    members: z.array(teamMemberSchema).min(1, 'At least one team member is required'),
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
  }),
  
  // Global Styles
  theme: z
    .object({
      primaryColor: z.string().default('#2563eb'),
      secondaryColor: z.string().default('#1d4ed8'),
      textColor: z.string().default('#1f2937'),
      backgroundColor: z.string().default('#ffffff'),
    })
    .optional(),
});

export type ServiceAgencyData = z.infer<typeof serviceAgencySchema>;
