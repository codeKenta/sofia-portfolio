import groq from 'groq'
import * as blockQueries from '~/blocks/queries'
import { getClient } from '../sanityClient'
import { filterDataToSingleItem } from '../utils'
import getBlocksQuery from '../getBlocksQuery'

export default async function getPage(uri, preview) {
  const pageQuery = groq`
    ${getBlocksQuery(blockQueries)},
    seo {
      title,
      description,
      "image": image.asset->url,
    },
    "isDraft": _id in path("drafts.**")
  `
  const query = uri
    ? `*[_type in ['page', 'casePage']  && slug.current == $uri ] {${pageQuery}}`
    : `*[_type == 'siteSettings'] {...frontpage->{${pageQuery}}}`

  const params = {
    uri,
  }

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
