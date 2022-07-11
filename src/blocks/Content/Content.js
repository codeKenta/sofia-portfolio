import * as React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/system'
import { SanityHtml } from '~/containers'
import ContentContainer from '~/components/ContentContainer'

const ContentRoot = styled('section', {
  name: 'Content',
  slot: 'Root',
})({
  padding: 'var(--cia-section-spacing)',
})

function Content(props) {
  const { text } = props

  return (
    <ContentRoot>
      <ContentContainer small>
        <SanityHtml textBlocks={text} />
      </ContentContainer>
    </ContentRoot>
  )
}

Content.propTypes = {
  text: PropTypes.string,
}

export default Content
