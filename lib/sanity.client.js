import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const hasSanity = !!projectId && !!dataset;

export const sanityClient = hasSanity
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-02-01',
      useCdn: true
    })
  : {
      fetch: async () => null
    };
