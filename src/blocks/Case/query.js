import getBlocksQuery from '~/api/sanity/getBlocksQuery'
import Contact from '~/blocks/Contact/query'
import Content from '~/blocks/Content/query'
import DynamicContent from '~/blocks/DynamicContent/query'
import Heading from '~/blocks/Heading/query'
import Hero from '~/blocks/Hero/query'
import LinkedMediaGrid from '~/blocks/LinkedMediaGrid/query'
import MediaGrid from '~/blocks/MediaGrid/query'

const blockQueries = {
  Contact,
  Content,
  DynamicContent,
  Heading,
  Hero,
  LinkedMediaGrid,
  MediaGrid,
}

export default `
{
  ${getBlocksQuery(blockQueries)},
  tags[],
  id,
}`
