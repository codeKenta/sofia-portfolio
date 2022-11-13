import * as React from 'react'
import PropTypes from 'prop-types'
import { styled, useTheme } from '@mui/system'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
// import { Media, MediaReveal } from '@noaignite/oui'
import { Media, MediaReveal } from '@noaignite/oui'
import { mediaType } from '~/api/utils'
import ContentContainer from '~/components/ContentContainer'
// import { ASPECT_RATIOS } from '~/utils/constants'
import { LinkedIn } from '~/components/icons'

const Root = styled('section', {
  name: 'Contact',
  slot: 'Root',
})(({ theme }) => ({
  backgroundColor: theme.palette.common.pink,
  ...theme.mixins.verticalRhythm(2),
  padding: 'var(--cia-section-spacing)',
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(4),
  },
}))

const NameHeading = styled('h3', {
  name: 'NameHeading',
  slot: 'NameHeading',
})(({ theme }) => ({
  ...theme.typography.h3,
  margin: 0,
  fontSize: `max(${theme.typography.h3.fontSize}, 3.2vw)`,
  marginBottom: theme.spacing(2),
}))

const StyledMediaReveal = styled(MediaReveal, {
  name: 'Avatar',
  slot: 'Avatar',
})(({ theme }) => ({
  borderRadius: '50%',
  maxWidth: 150,
  maxHeight: 150,
  marginBottom: theme.spacing(2),
  img: {
    borderRadius: '50%',
  },
}))

const Avatar = styled(Media, {
  name: 'Avatar',
  slot: 'Avatar',
})(() => ({
  borderRadius: '50%',
  maxWidth: 150,
  maxHeight: 150,
}))

const LinkedInLink = styled('a', {
  name: 'LinkedInLink',
  slot: 'LinkedInLink',
})(({ theme }) => ({
  color: theme.palette.common.linkedInBlue,
}))

function Contact(props) {
  const { name, email, image, phone, linkedInUrl, showImage, renderIndex } = props
  const theme = useTheme()

  return (
    <Root>
      <ContentContainer>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            alignItems: 'center',
          }}
        >
          {showImage && (
            <StyledMediaReveal>
              <Avatar {...image} priority={renderIndex === 0} />
            </StyledMediaReveal>
          )}

          <NameHeading>{name}</NameHeading>

          {email && <Typography sx={{ fontSize: 21, lineHeight: 1.2 }}>{email}</Typography>}

          {phone && (
            <Typography sx={{ fontSize: 21, lineHeight: 1.2, marginBottom: theme.spacing(2) }}>
              {phone}
            </Typography>
          )}

          {linkedInUrl && (
            <LinkedInLink href={linkedInUrl} target="_blank" rel="noreferrer">
              <LinkedIn />
            </LinkedInLink>
          )}
        </Box>
      </ContentContainer>
    </Root>
  )
}

Contact.propTypes = {
  name: PropTypes.string,
  image: mediaType,
  email: PropTypes.string,
  renderIndex: PropTypes.number.isRequired,
  phone: PropTypes.string,
  showImage: PropTypes.bool,
  linkedInUrl: PropTypes.string,
}

export default Contact
