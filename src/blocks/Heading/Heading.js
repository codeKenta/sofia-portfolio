import * as React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/system'
import { Typography } from '@mui/material'
import ContentContainer from '~/components/ContentContainer'
import { includeLineBreaks } from '~/utils'

const Root = styled('section', {
  name: 'Heading',
  slot: 'Root',
})(({ theme }) => ({
  ...theme.mixins.verticalRhythm(2),
  padding: 'var(--cia-section-spacing)',
}))

function Heading(props) {
  const { headingType = 'h2', heading, includePaddingBottom = true, id = '' } = props

  return (
    headingType && (
      <Root
        id={id}
        sx={{
          paddingBottom: includePaddingBottom ? 'var(--cia-section-spacing)' : '0',
        }}
      >
        <ContentContainer paddingBottom={includePaddingBottom}>
          <Typography
            sx={{
              hyphens: 'manual',
            }}
            variant={headingType}
          >
            {includeLineBreaks(heading)}
          </Typography>
        </ContentContainer>
      </Root>
    )
  )
}

Heading.propTypes = {
  heading: PropTypes.string.isRequired,
  headingType: PropTypes.string,
  id: PropTypes.string,
  includePaddingBottom: PropTypes.bool,
}

export default Heading
