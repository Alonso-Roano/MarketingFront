import { z } from "zod";

export const complex = z.object({
    hero: z.object({
      titulo: z.string(),
      subtitulo: z.string(),
      imagen: z.string(),
      ctaText: z.string()
    }),
    features: z.array(
      z.object({
        icon: z.string(),
        title: z.string(),
        description: z.string()
      })
    ),
    testimonials: z.array(
      z.object({
        nombre: z.string(),
        mensaje: z.string(),
        foto: z.string().url()
      })
    )
  })
