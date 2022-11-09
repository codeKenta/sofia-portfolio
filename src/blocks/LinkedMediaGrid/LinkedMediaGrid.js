import * as React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/system'
import Box from '@mui/material/Box'
import { Media, MediaReveal } from '@noaignite/oui'
import { useTheme } from '@mui/material/styles'
import { Typography } from '@mui/material'
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

const GridContainer = styled('div', {
  name: 'CridContainer',
  slot: 'GridContainer',
})(({ theme }) => ({
  display: 'grid',
  gridGap: theme.spacing(1),
  gridTemplateColumns: `repeat(2, 1fr)`,

  [theme.breakpoints.up('sm')]: {
    gridGap: theme.spacing(2),
    gridTemplateColumns: `repeat(3, 1fr)`,
  },

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: `repeat(4, 1fr)`,
  },
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
})(({ theme }) => ({
  textTransform: 'uppercase',
  color: 'white',
}))

const Link = styled(RouterLink, {
  name: 'Link',
  slot: 'Link',
})(({ theme }) => ({
  position: 'relative',
}))

function LinkedMediaGrid(props) {
  const { images, renderIndex } = props

  return (
    <Root>
      <ContentContainer>
        <GridContainer>
          {images?.map(({ media, tag, link }, innerIndex) => (
            <Link href={link}>
              <MediaReveal key={innerIndex} {...ASPECT_RATIOS.square}>
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
        </GridContainer>
      </ContentContainer>
    </Root>
  )
}

LinkedMediaGrid.propTypes = {
  images: PropTypes.array.isRequired,
  renderIndex: PropTypes.number.isRequired,
}

export default LinkedMediaGrid
