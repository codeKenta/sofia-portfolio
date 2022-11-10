import * as React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/system'
// import Box from '@mui/material/Box'
import { Media, MediaReveal } from '@noaignite/oui'
// import { useTheme } from '@mui/material/styles'
// import { Typography } from '@mui/material'
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
  span: {
    transition: 'opacity 750ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  [theme.breakpoints.down('sm')]: {
    backgroundColor: theme.palette.common.redTransparent,
    span: {
      opacity: '1',
    },
  },

  [theme.breakpoints.up('sm')]: {
    span: {
      opacity: '0',
    },
  },
  backgroundColor: 'rgba(255, 255, 255, 0)',
  position: 'absolute',
  inset: 0,
  display: 'grid',
  placeItems: 'center',
  transition: 'background 750ms cubic-bezier(0.4, 0, 0.2, 1)',

  '&:hover': {
    backgroundColor: theme.palette.common.redTransparent,
    span: {
      opacity: '1',
    },
  },
}))

const Tag = styled('span', {
  name: 'Tag',
  slot: 'Tag',
})(() => ({
  textTransform: 'uppercase',
  color: 'white',
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
          {images?.map(({ media, tag, link }, index) => (
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
                <Tag>{tag}</Tag>
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
