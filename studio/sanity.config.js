import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes/index.js'

export default defineConfig({
  name: 'default',
  title: 'Riti Handlooms Admin Studio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || '15jlzurr',
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.VITE_SANITY_DATASET || 'production',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})
