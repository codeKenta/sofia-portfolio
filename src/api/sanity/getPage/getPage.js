import groq from 'groq'
import * as blockQueries from '~/blocks/queries'
import { getClient } from '../sanityClient'
import { filterDataToSingleItem } from '../utils'

export default async function getPage(uri, preview) {
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

  const query = uri
    ? `*[_type== "page" || _type == "casePage" && slug.current == $uri ] {${pageQuery}}`
    : `*[_type == 'siteSettings'] {...frontpage->{${pageQuery}}}`

  const params = {
    uri,
  }

  // console.log('\n\n', query, '\n\n')

  const data = await getClient(preview).fetch(query, params)

  if (!data) {
    return null
  }

  const page = filterDataToSingleItem(data, preview)

  return {
    page,
    query,
    params,
  }
}
