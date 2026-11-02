// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

export default defineConfig({
  site: 'https://nomad.pages.dev',
  // Template files and thumbnails are served as-is from static/ (see CLAUDE.md).
  publicDir: './static',
  redirects: {
    '/docs/': '/',
    '/docs/api/developers/frontends-.ui-folder/': '/docs/api/developers/frontends/'
  },
  integrations: [
    starlight({
      title: 'Nomad.dev',
      description: 'A collection of resources for developers using Nomad Browser',
      logo: { src: './src/assets/logo.png' },
      favicon: '/logo.png',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/knownasilya/nomad' }
      ],
      editLink: { baseUrl: 'https://github.com/knownasilya/nomad.dev/edit/master/' },
      lastUpdated: true,
      customCss: ['./src/styles/custom.css'],
      head: [
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://nomad.pages.dev/opengraph.png' } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' } }
      ],
      sidebar: [
        {
          label: 'Templates',
          items: [
            { label: 'Gallery', slug: 'docs/templates' },
            { autogenerate: { directory: 'docs/templates' } }
          ]
        },
        {
          label: 'API Documentation',
          items: [
            { label: 'Overview', slug: 'docs/api' },
            'docs/api/getting-started-with-nomad',
            'docs/api/faq',
            {
              label: 'Beginner Guides',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'docs/api/beginner' },
                { autogenerate: { directory: 'docs/api/beginner' } }
              ]
            },
            {
              label: 'Intermediate Guides',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'docs/api/intermediate' },
                { autogenerate: { directory: 'docs/api/intermediate' } }
              ]
            },
            {
              label: 'Advanced Guides',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'docs/api/advanced' },
                { autogenerate: { directory: 'docs/api/advanced' } }
              ]
            },
            {
              label: 'APIs',
              items: [
                { label: 'Overview', slug: 'docs/api/apis' },
                { autogenerate: { directory: 'docs/api/apis' } }
              ]
            },
            {
              label: 'Developer Reference',
              items: [
                { label: 'Overview', slug: 'docs/api/developers' },
                { autogenerate: { directory: 'docs/api/developers' } }
              ]
            },
            {
              label: 'Help',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'docs/api/help' },
                { autogenerate: { directory: 'docs/api/help' } }
              ]
            }
          ]
        },
        {
          label: 'Tutorials',
          items: [
            { label: 'Overview', slug: 'docs/tutorials' },
            { autogenerate: { directory: 'docs/tutorials' } }
          ]
        },
        {
          label: 'News',
          collapsed: true,
          items: [
            { label: 'All posts', slug: 'posts' },
            'posts/whats-new-in-1-35',
            'posts/whats-new-in-1-34',
            'posts/whats-new-in-1-33',
            'posts/whats-new-in-1-32',
            'posts/whats-new-in-1-31',
            'posts/whats-new-in-1-30',
            'posts/whats-new-in-1-29',
            'posts/whats-new-in-1-27',
            'posts/codesnip-and-module',
            'posts/hello-world'
          ]
        }
      ]
    })
  ]
})
