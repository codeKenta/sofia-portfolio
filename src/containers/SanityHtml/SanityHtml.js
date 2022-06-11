import * as React from 'react'
import PropTypes from 'prop-types'
import BlockContent from '@sanity/block-content-to-react'
import { Html } from '~/components'

const SanityHtml = React.forwardRef(function SanityHtml(props, ref) {
  const { textBlocks, ...other } = props

  return (
    <Html ref={ref} {...other}>
      <BlockContent blocks={textBlocks} />
    </Html>
  )
})

SanityHtml.propTypes = {
  textBlocks: PropTypes.array,
}

export default SanityHtml
