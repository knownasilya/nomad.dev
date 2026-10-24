import { defineCollection, z } from 'astro:content'
import { docsLoader } from '@astrojs/starlight/loaders'
import { docsSchema } from '@astrojs/starlight/schema'

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      // News posts carry a date and categories.
      extend: z.object({
        date: z.coerce.date().optional(),
        categories: z.array(z.string()).optional()
      })
    })
  })
}
