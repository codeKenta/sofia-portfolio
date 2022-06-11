import * as React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/system'
import { Container } from '@mui/material'
import { SanityHtml } from '~/containers'

const ContentRoot = styled('section', {
  name: 'Content',
  slot: 'Root',
})({
  margin: 'var(--cia-section-spacing) 0',
})

function Content(props) {
  const { text } = props

  return (
    <ContentRoot>
      <Container maxWidth="md">
        <SanityHtml textBlocks={text} />
      </Container>
    </ContentRoot>
  )
}

Content.propTypes = {
  text: PropTypes.string,
}

export default Content
