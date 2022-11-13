import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'

function ContentContainer(props) {
  const { small = false, place = 'center', children } = props

  const placeMargin = {}

  if (place === 'left') {
    placeMargin.marginLeft = '0'
  }

  if (place === 'right') {
    placeMargin.marginRight = '0'
  }

  return (
    <Box
      sx={{
        margin: '0 auto',
        ...placeMargin,
        maxWidth: small ? 525 : 1200,
      }}
    >
      {children}
    </Box>
  )
}

ContentContainer.propTypes = {
  small: PropTypes.bool,
  place: PropTypes.string,
  children: PropTypes.array,
}

export default ContentContainer
