import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';
import deskStructure from './sanity/deskStructure';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'yourProjectId';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'LeadPass Studio',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [deskTool({ structure: deskStructure }), visionTool()],
  schema: {
    types: schemaTypes
  }
});
