import * as React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/system'
import { Typography } from '@mui/material'
import ContentContainer from '~/components/ContentContainer'

const Root = styled('section', {
  name: 'Heading',
  slot: 'Root',
})(({ theme }) => ({
  ...theme.mixins.verticalRhythm(2),
  padding: 'var(--cia-section-spacing)',
}))

function Heading(props) {
  const { headingType = 'h2', heading } = props

  return (
    headingType && (
      <Root>
        <ContentContainer>
          <Typography variant={headingType}>{heading}</Typography>
        </ContentContainer>
      </Root>
    )
  )
}

Heading.propTypes = {
  headingType: PropTypes.string,
  heading: PropTypes.string.isRequired,
}

export default Heading
