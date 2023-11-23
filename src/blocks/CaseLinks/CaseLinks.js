import * as React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/system'
import { Media, MediaReveal } from '@noaignite/oui'
import ContentContainer from '~/components/ContentContainer'
import { RouterLink } from '~/containers'
import { ASPECT_RATIOS } from '~/utils/constants'

const Root = styled('section', {
  name: 'DynamicContent',
  slot: 'Root',
})(({ theme }) => ({
  ...theme.mixins.verticalRhythm(2),
  padding: 'var(--cia-section-spacing)',
}))

const FlexContainer = styled('div', {
  name: 'FlexContainer',
  slot: 'FlexContainer',
})(() => ({
  display: 'flex',
  justifyContent: 'center',
  flexFlow: 'row wrap',
}))

const Cover = styled('div', {
  name: 'Cover',
  slot: 'Cover',
})(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  position: 'absolute',
  inset: 0,
  transition: 'background 750ms cubic-bezier(0.4, 0, 0.2, 1)',
  '*': {
    transition: 'opacity 750ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  [theme.breakpoints.down('sm')]: {
    backgroundColor: theme.palette.common.redTransparent,
    '*': {
      opacity: '1',
    },
  },

  [theme.breakpoints.up('sm')]: {
    '*': {
      opacity: '0',
    },
  },

  '&:hover': {
    backgroundColor: theme.palette.common.redTransparent,
    '*': {
      opacity: '1',
    },
  },
}))

const Heading = styled('h3', {
  name: 'Heading',
  slot: 'Heading',
})(({ theme }) => ({
  ...theme.typography.h4,
  margin: 0,
  fontSize: '120%',
  color: 'white',
  textAlign: 'center',
  wordBreak: 'break-word',
}))

const Link = styled(RouterLink, {
  name: 'Link',
  slot: 'Link',
})(({ theme }) => ({
  position: 'relative',
  width: `calc(50% - 10px)`,
  marginBottom: 16,
  marginLeft: 16,
  ':first-of-type': {
    marginLeft: 0,
  },
  ':nth-of-type(3)': {
    marginLeft: 0,
  },

  // reset
  ':nth-child(3), :nth-child(5), :nth-child(7), :nth-child(9), :nth-child(11), :nth-child(13)': {
    marginLeft: 0,
  },

  [theme.breakpoints.up('sm')]: {
    width: `calc(33% - 10px)`,

    // reset
    ':nth-child(3), :nth-child(5), :nth-child(9), :nth-child(11), :nth-child(13)': {
      marginLeft: 16,
    },

    ':nth-child(4), :nth-child(7), :nth-child(10) ': {
      marginLeft: 0,
    },
  },

  [theme.breakpoints.up('md')]: {
    width: `calc(25% - 12px)`,
    marginLeft: 16,

    // reset all previous breakpoints
    ':nth-child(4), :nth-child(7), :nth-child(10)': {
      marginLeft: 16,
    },

    ':nth-child(5), :nth-child(9)': {
      marginLeft: 0,
    },
  },
}))

function LinkedMediaGrid(props) {
  const { images, renderIndex } = props

  return (
    <Root>
      <ContentContainer>
        <FlexContainer>
          {images?.map(({ media, heading, link }, index) => (
            <Link href={link}>
              <MediaReveal key={index} {...ASPECT_RATIOS.square}>
                <Media
                  {...ASPECT_RATIOS.square}
                  {...(media?.component === 'video'
                    ? {
                        autoPlay: true,
                        muted: true,
                        loop: true,
                        playsInline: true,
                      }
                    : { alt: '' })}
                  {...media}
                  priority={renderIndex === 0}
                />
              </MediaReveal>
              <Cover>
                <Heading sx={heading?.length > 10 ? { fontSize: 16 } : {}}>{heading}</Heading>
              </Cover>
            </Link>
          ))}
        </FlexContainer>
      </ContentContainer>
    </Root>
  )
}

LinkedMediaGrid.propTypes = {
  images: PropTypes.array.isRequired,
  renderIndex: PropTypes.number.isRequired,
}

export default LinkedMediaGrid
