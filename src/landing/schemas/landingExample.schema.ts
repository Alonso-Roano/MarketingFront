import z from "zod"

export const hero = z.object({
        hero: z.object({
            title: z.string(),
            subtitle: z.string(),
            image: z.string().url(),
            buttonText: z.string()
        })
    })