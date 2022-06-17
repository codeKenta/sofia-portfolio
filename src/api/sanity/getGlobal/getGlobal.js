import groq from 'groq'
import sanityClient from '../sanityClient'
import { menuQuery } from '../utils'

export default async function getGlobal() {
  const globalQuery = groq`
  *[_type == "siteSettings"][0] {
     "menus": {
       "primary": primaryMenu.${menuQuery},
       "footer": footerMenu.${menuQuery},
     }
  }
 `
  return sanityClient.fetch(globalQuery)
}
