import * as React from 'react'
import { Link } from '@mui/material'
import { styled } from '@mui/system'
import RouterLink from '~/containers/RouterLink'

const AppExitPreviewRoot = styled('div', {
  name: 'AppExitPreview',
  slot: '',
})(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  zIndex: theme?.zIndex?.exitPreview,
  padding: theme.spacing(1),
  paddingRight: theme.spacing(2),
  width: '100%',
  background: 'rgb(0,0,0, 0.5)',
  display: 'flex',
  justifyContent: 'flex-end',
}))

const AppExitPreview = () => (
  <AppExitPreviewRoot>
    <Link
      sx={{ fontWeight: 'bold', color: 'white' }}
      component={RouterLink}
      href={'/api/exit-preview'}
      variant="button"
    >
      Exit preview mode
    </Link>
  </AppExitPreviewRoot>
)

export default AppExitPreview
