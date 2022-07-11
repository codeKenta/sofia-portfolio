import groq from 'groq'
import * as blockQueries from '~/blocks/queries'
import sanityClient from '../sanityClient'

export default async function getPage(uri) {
  const pageQuery = groq`
    "blocks": blocks[] {
      ${Object.entries(blockQueries).map(
        ([key, query]) => `_type == "${key}" => { "name": _type, "props": ${query} }`,
      )}
    },
    seo {
      title,
      description,
      "image": image.asset->url,
    },
    "isDraft": _id in path("drafts.**")
  `

  const sanityPageQuery = uri
    ? `*[_type== "page" && slug.current == $uri ][0] {${pageQuery}}`
    : `*[_type == 'siteSettings'] {...frontpage->{${pageQuery}},}[0]`

  const args = {
    uri,
  }
  return sanityClient.fetch(sanityPageQuery, args)
}
