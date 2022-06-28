import * as React from 'react'
import PropTypes from 'prop-types'
import useEmblaCarousel from 'embla-carousel-react'
import { styled, useTheme } from '@mui/system'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import { Media, MediaReveal } from '@noaignite/oui'
import { RouterLink, SanityHtml } from '~/containers'
import { linkType, mediaType } from '~/api/utils'
import ContentContainer from '~/components/ContentContainer'
import { ASPECT_RATIOS } from '~/utils/constants'

const Root = styled('section', {
  name: 'DynamicContent',
  slot: 'Root',
})(({ theme }) => ({
  ...theme.mixins.verticalRhythm(2),
  // paddingLeft: 'var(--cia-section-spacing)',
  // paddingRight: 'var(--cia-section-spacing)',
  padding: 'var(--cia-section-spacing)',
}))

const Heading = styled('h1', {
  name: 'Hero',
  slot: 'Heading',
})(({ theme }) => ({
  ...theme.typography.h2,
  margin: 0,
}))

const ContentPlacement = styled('div', {
  name: 'Placement',
  slot: 'ContentPlacement',
})(({ theme }) => ({
  display: 'grid',
  gridGap: theme.spacing(4),
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    gridGap: 50,
  },

  [theme.mixins.customBreakpoint('up', 600)]: {
    gridGap: theme.spacing(4),
  },

  [theme.mixins.customBreakpoint('up', 900)]: {
    gridGap: '10vw',
  },

  [theme.mixins.customBreakpoint('up', 1300)]: {
    gridGap: 180,
  },
}))

const MediaPlacementWrapper = styled('div', {
  name: 'Placement',
  slot: 'MediaWrapper',
})(({ theme }) => ({
  [theme.mixins.customBreakpoint('up', 600)]: {
    // maxWidth: 200,
  },
}))

const EmblaContainer = styled('div', {
  name: 'Slideshow',
  slot: 'EmblaContainer',
})(({ theme }) => ({
  display: 'flex',
  marginTop: theme.spacing(2),
  marginLeft: theme.spacing(-2),
}))

const EmblaSlide = styled('div', {
  name: 'Slideshow',
  slot: 'EmblaSlide',
})(({ theme }) => ({
  position: 'relative',
  flexShrink: 0,
  width: '100%',
  paddingLeft: theme.spacing(1),
  cursor: 'pointer',
  [theme.breakpoints.up('sm')]: {
    width: 'calc(100% / 2)',
  },
  [theme.breakpoints.up('md')]: {
    width: 'calc(100% / 3)',
  },
}))

function DynamicContent(props) {
  const {
    heading,
    text,
    images,
    cta,
    renderIndex,
    placeContentLeft = true,
    backgroundColor,
  } = props
  const theme = useTheme()

  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
  })

  const [displayImageIndex, setDisplayImageIndex] = React.useState(0)

  const onSelectImage = React.useCallback((index) => {
    setDisplayImageIndex(index)
  }, [])

  const displayImage = images[displayImageIndex]

  return (
    <Root
      sx={{
        backgroundColor: backgroundColor || null,
      }}
    >
      <ContentContainer>
        <ContentPlacement>
          <Box
            sx={{
              gridRow: 1,
              gridColumn: placeContentLeft ? 1 : 2,
              minWidth: 290,
            }}
          >
            {heading && <Heading>{heading}</Heading>}

            {text && (
              <Box
                sx={{
                  marginTop: theme.spacing(6),
                  marginBottom: theme.spacing(6),
                }}
              >
                <SanityHtml textBlocks={text} />
              </Box>
            )}

            {cta && cta.url && cta.label && (
              <Button component={RouterLink} href={cta.url} color="inherit" variant="outlined">
                {cta.label}
              </Button>
            )}
          </Box>

          <MediaPlacementWrapper
            sx={{
              gridRow: 1,
              gridColumn: placeContentLeft ? 2 : 1,
            }}
          >
            {displayImage && (
              <Box>
                <MediaReveal {...ASPECT_RATIOS.portrait}>
                  <Media
                    {...ASPECT_RATIOS.portrait}
                    {...(displayImage?.component === 'video'
                      ? {
                          autoPlay: true,
                          muted: true,
                          loop: true,
                          playsInline: true,
                        }
                      : { alt: '' })}
                    {...displayImage}
                    priority={renderIndex === 0}
                  />
                </MediaReveal>

                {images?.length > 1 && (
                  <Box sx={{ overflow: 'hidden' }} ref={emblaRef}>
                    <EmblaContainer>
                      {images?.map((item, idx) => (
                        <EmblaSlide key={idx} onClick={() => onSelectImage(idx)}>
                          <MediaReveal {...ASPECT_RATIOS.portrait}>
                            <Media {...ASPECT_RATIOS.portrait} {...item} />
                          </MediaReveal>
                        </EmblaSlide>
                      ))}
                    </EmblaContainer>
                  </Box>
                )}
              </Box>
            )}
          </MediaPlacementWrapper>
        </ContentPlacement>
      </ContentContainer>
    </Root>
  )
}

DynamicContent.propTypes = {
  cta: PropTypes.shape(linkType),
  heading: PropTypes.string,
  images: PropTypes.arrayOf(mediaType),
  placeContentLeft: PropTypes.bool,
  renderIndex: PropTypes.number.isRequired,
  text: PropTypes.array,
  backgroundColor: PropTypes.string,
}

export default DynamicContent
