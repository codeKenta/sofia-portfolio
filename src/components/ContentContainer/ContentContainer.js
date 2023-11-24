import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'

const maxSizes = {
  small: 525,
  medium: 700,
  large: 1200,
}
function ContentContainer(props) {
  const { size = 'large', place = 'center', children } = props

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
        maxWidth: maxSizes[size],
      }}
    >
      {children}
    </Box>
  )
}

ContentContainer.propTypes = {
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  place: PropTypes.string,
  children: PropTypes.array,
}

export default ContentContainer
