import * as React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/system'
import { createRenderBlock } from '~/utils'
import DynamicContent from '../DynamicContent'
import Content from '../Content'
import Heading from '../Heading'
import MediaGrid from '../MediaGrid'

const blockVariants = { DynamicContent, Content, Heading, MediaGrid }

const renderBlock = createRenderBlock(blockVariants)

const CaseRoot = styled('section', {
  name: 'Case',
  slot: 'Root',
})({})

function Case(props) {
  const { blocks, id } = props

  if (!blocks || !blocks.length) {
    return null
  }

  return <CaseRoot id={id}>{blocks?.map((block, idx) => renderBlock(block, idx))}</CaseRoot>
}

Case.propTypes = {
  blocks: PropTypes.array,
  id: PropTypes.string,
}

export default Case
