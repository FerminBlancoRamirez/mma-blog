import { defineCollection, z } from "astro:content";
import {glob} from "astro/loaders";

const noticias = defineCollection({
    loader:glob({pattern: "**/*.{md,mdx}", base:"./src/content/noticias"}),
    schema: z.object({
        titulo: z.string(),
        descripcion: z.string(),
        publiDate: z.coerce.date(),
        author: z.string(),
        tag: z.array(z.string()),
        image: z.string(),
    })
});

export const collections = { noticias };