import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'

function ContentContainer(props) {
  const { small = false, children } = props

  return (
    <Box
      sx={{
        margin: '0 auto',
        maxWidth: small ? 525 : 1200,
      }}
    >
      {children}
    </Box>
  )
}

ContentContainer.propTypes = {
  small: PropTypes.bool,
  children: PropTypes.array,
}

export default ContentContainer
