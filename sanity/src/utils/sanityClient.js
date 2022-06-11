import sanityClient from 'part:@sanity/base/client'

import { API_VERSION } from './constants'

export default sanityClient.withConfig({ apiVersion: API_VERSION })
