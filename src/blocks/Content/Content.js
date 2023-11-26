import * as React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/system'
import { useTheme } from '@mui/material/styles'
import { SanityHtml } from '~/containers'
import ContentContainer from '~/components/ContentContainer'

const ContentRoot = styled('section', {
  name: 'Content',
  slot: 'Root',
})({
  padding: 'var(--cia-section-spacing)',
})

function Content(props) {
  const { text, place = 'center', backgroundColor, containerSize } = props
  const theme = useTheme()

  return (
    <ContentRoot
      sx={{
        backgroundColor: backgroundColor === 'color' ? theme.palette.common.pink : 'transparent',
      }}
    >
      <ContentContainer place={place} size={containerSize}>
        <SanityHtml textBlocks={text} />
      </ContentContainer>
    </ContentRoot>
  )
}

Content.propTypes = {
  text: PropTypes.string,
  place: PropTypes.string,
  backgroundColor: PropTypes.string,
  containerSize: PropTypes.string,
}

export default Content
