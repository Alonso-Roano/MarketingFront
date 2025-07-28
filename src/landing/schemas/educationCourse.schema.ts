import { z } from 'zod';
import { featureSchema, testimonialSchema, ctaSchema } from './defaultLandingPage.schema';

export const courseModuleSchema = z.object({
  title: z.string(),
  description: z.string(),
  duration: z.string().optional(),
  icon: z.string().optional(),
  lessons: z.array(
    z.object({
      title: z.string(),
      duration: z.string(),
    })
  ).optional(),
});

export const instructorSchema = z.object({
  name: z.string(),
  role: z.string(),
  bio: z.string(),
  avatar: z.string().optional(),
  socialLinks: z.record(z.string()).optional(),
});

export const educationCourseSchema = z.object({
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
  
  // Course Overview
  overview: z.object({
    title: z.string(),
    description: z.string(),
    duration: z.string().optional(),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
    studentsCount: z.number().optional(),
    lastUpdated: z.string().optional(),
    language: z.string().default('English'),
  }),
  
  // What You'll Learn
  learningOutcomes: z.object({
    title: z.string().optional(),
    items: z.array(z.string()).min(3, 'At least 3 learning outcomes are required'),
  }),
  
  // Course Modules
  modules: z.array(courseModuleSchema).min(1, 'At least one module is required'),
  
  // Instructor Section
  instructor: instructorSchema,
  
  // Testimonials Section
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

export type EducationCourseData = z.infer<typeof educationCourseSchema>;