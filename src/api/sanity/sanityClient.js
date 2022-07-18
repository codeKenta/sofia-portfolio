import createClient from '@sanity/client'
import { createPreviewSubscriptionHook } from 'next-sanity'

export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2021-10-21',
  useCdn: process.env.NODE_ENV !== 'development',
}

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config)

// Set up a preview client with serverless authentication for drafts
export const previewClient = createClient({
  ...config,
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

export const usePreviewSubscription = createPreviewSubscriptionHook({
  ...config,
  useCdn: false,
})

// Helper function for easily switching between normal client and preview client
export const getClient = (usePreview) => (usePreview ? previewClient : sanityClient)
