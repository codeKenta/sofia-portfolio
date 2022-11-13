import * as React from 'react'
import PropTypes from 'prop-types'
import useEmblaCarousel from 'embla-carousel-react'
import { styled, useTheme } from '@mui/system'
import { Button, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import { Media, MediaReveal } from '@noaignite/oui'
import { RouterLink, SanityHtml } from '~/containers'
import { linkType, mediaType } from '~/api/utils'
import ContentContainer from '~/components/ContentContainer'
import { ASPECT_RATIOS } from '~/utils/constants'
import { ChevronBack, ChevronForward } from '~/components/icons'

const includeLineBreaks = (str) => str.split(/(\*)/g).map((part) => (part === '*' ? <br /> : part))

const Root = styled('section', {
  name: 'DynamicContent',
  slot: 'Root',
})(({ theme }) => ({
  ...theme.mixins.verticalRhythm(2),
  padding: 'var(--cia-section-spacing)',
}))

const Heading = styled('h1', {
  name: 'Hero',
  slot: 'Heading',
})(({ theme }) => ({
  ...theme.typography.h2,
  margin: 0,
}))

const Caption = styled('h3', {
  name: 'Caption',
  slot: 'Caption',
})(({ theme }) => ({
  ...theme.typography.caption,
  margin: 0,
}))

const ContentPlacement = styled('div', {
  name: 'Placement',
  slot: 'ContentPlacement',
})(() => ({}))

const DisplayImageMediaReveal = styled(MediaReveal)(() => ({}))

const EmblaContainer = styled('div', {
  name: 'Slideshow',
  slot: 'EmblaContainer',
})(({ theme }) => ({
  display: 'flex',
  marginLeft: theme.spacing(-2),
}))

const EmblaSlide = styled('div', {
  name: 'Slideshow',
  slot: 'EmblaSlide',
})(({ theme }) => ({
  cursor: 'pointer',
  position: 'relative',
  flexShrink: 0,
  width: 'calc(100% / 3)',
  paddingLeft: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(1),
  },
}))

const PrevButton = styled(IconButton, {
  name: 'Slideshow',
  slot: 'EmblaPrevButton',
})(() => ({
  paddingLeft: 0,
}))

const NextButton = styled(IconButton, {
  name: 'Slideshow',
  slot: 'EmblaNextButton',
})(() => ({
  paddingRight: 0,
}))

function DynamicContent(props) {
  const {
    heading,
    caption = '',
    id = '',
    text,
    images,
    cta,
    renderIndex,
    placeContent = 'left',
    backgroundColor,
  } = props
  const theme = useTheme()

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
  })

  const [scrollIndex, setScrollIndex] = React.useState(0)

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) {
      if (emblaApi?.canScrollPrev()) {
        setScrollIndex((prev) => prev - 1)
      }
      emblaApi.scrollPrev()
    }
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) {
      if (emblaApi?.canScrollNext()) {
        setScrollIndex((prev) => prev + 1)
      }
      emblaApi.scrollNext()
    }
  }, [emblaApi])

  const canScrollPrev = images?.length > 3 && scrollIndex > 0
  const canScrollNext = images?.length > 3 && scrollIndex < images.length - 3

  const noScrollAvailable = images?.length < 4

  const [displayImageIndex, setDisplayImageIndex] = React.useState(0)

  const onSelectImage = React.useCallback((index) => {
    setDisplayImageIndex(index)
  }, [])

  const displayImage = images?.length && images[displayImageIndex]

  const gridTemplateColumns =
    placeContent === 'right'
      ? ' minmax(auto, 400px) 1fr minmax(auto, 540px)'
      : 'minmax(auto, 540px) 1fr minmax(auto, 400px)'

  return (
    <Root
      id={id}
      sx={{
        backgroundColor: backgroundColor || null,
      }}
    >
      <ContentContainer>
        <ContentPlacement
          sx={{
            display: 'grid',
            gridGap: theme.spacing(2),
            alignItems: 'center',
            gridTemplateColumns: '1fr',
            [theme.breakpoints.up('md')]: {
              gridTemplateColumns,
            },
          }}
        >
          <Box
            sx={{
              [theme.breakpoints.up('md')]: {
                gridRow: 1,
                gridColumn: placeContent === 'right' ? 3 : 1,
              },
            }}
          >
            {caption && (
              <Box
                sx={{
                  maxWidth: 400,
                  marginBottom: theme.spacing(2),
                }}
              >
                <Caption>{includeLineBreaks(caption)}</Caption>
                <Box
                  sx={{
                    marginTop: theme.spacing(2),
                    width: 70,
                    borderBottom: '3px solid black',
                  }}
                />
              </Box>
            )}
            {heading && <Heading>{includeLineBreaks(heading)}</Heading>}

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

          <Box
            sx={{
              [theme.breakpoints.down('md')]: {
                marginTop: theme.spacing(2),
              },
              [theme.breakpoints.up('md')]: {
                gridRow: 1,
                gridColumn: placeContent === 'right' ? 1 : 3,
              },
            }}
          >
            {displayImage && (
              <Box
                sx={{
                  display: 'grid',
                  gridRowGap: theme.spacing(2),
                  gridTemplateColumns: 'auto 1fr auto',
                }}
              >
                <DisplayImageMediaReveal
                  sx={{
                    gridColumn: images?.length > 1 ? '2' : '1 / -1',
                    gridRow: images?.length > 1 ? '2' : '1',
                    [theme.breakpoints.up('md')]: {
                      gridRow: '1',
                    },
                  }}
                  {...ASPECT_RATIOS.portrait}
                >
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
                </DisplayImageMediaReveal>

                {images?.length > 1 && (
                  <React.Fragment>
                    {!noScrollAvailable && (
                      <PrevButton
                        sx={{
                          opacity: canScrollPrev ? '1' : '0.2',
                          cursor: canScrollPrev ? 'pointer' : 'auto',
                          gridRow: '1',
                          gridTemplate: '1',
                          [theme.breakpoints.up('md')]: {
                            gridRow: '2',
                          },
                        }}
                        onClick={scrollPrev}
                      >
                        <ChevronBack />
                      </PrevButton>
                    )}

                    <Box
                      sx={{
                        overflow: 'hidden',
                        gridRow: '1',
                        gridColumn: noScrollAvailable ? '1 / -1' : '2',
                        [theme.breakpoints.up('md')]: {
                          gridRow: '2',
                        },
                      }}
                      ref={emblaRef}
                    >
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

                    {!noScrollAvailable && (
                      <NextButton
                        sx={{
                          opacity: canScrollNext ? '1' : '0.2',
                          cursor: canScrollNext ? 'pointer' : 'auto',
                          gridRow: '1',
                          gridTemplate: '3',
                          [theme.breakpoints.up('md')]: {
                            gridRow: '2',
                          },
                        }}
                        onClick={scrollNext}
                      >
                        <ChevronForward />
                      </NextButton>
                    )}
                  </React.Fragment>
                )}
              </Box>
            )}
          </Box>
        </ContentPlacement>
      </ContentContainer>
    </Root>
  )
}

DynamicContent.propTypes = {
  cta: PropTypes.shape(linkType),
  heading: PropTypes.string,
  caption: PropTypes.string,
  id: PropTypes.string,
  images: PropTypes.arrayOf(mediaType),
  placeContent: PropTypes.string,
  renderIndex: PropTypes.number.isRequired,
  text: PropTypes.array,
  backgroundColor: PropTypes.string,
}

export default DynamicContent
