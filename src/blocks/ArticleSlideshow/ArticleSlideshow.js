import * as React from 'react'
import PropTypes from 'prop-types'
import useEmblaCarousel from 'embla-carousel-react'
import { styled } from '@mui/system'
import { Typography } from '@mui/material'
import { Media, MediaReveal } from '@noaignite/oui'
import { useTheme } from '@mui/material/styles'
import { ASPECT_RATIOS } from '~/utils/constants'
import { RouterLink } from '~/containers'
import { includeLineBreaks } from '~/utils'

const ArticleSlideshowRoot = styled('section', {
  name: 'ArticleSlideshow',
  slot: 'Root',
})({
  position: 'relative',
  margin: 'var(--cia-section-spacing) 0',
})

const ArticleSlideshowHeader = styled('header', {
  name: 'ArticleSlideshow',
  slot: 'Header',
})(({ theme }) => ({
  paddingLeft: 'var(--cia-container-spacing)',
  paddingRight: 'var(--cia-container-spacing)',
  marginBottom: theme.spacing(2),
  textAlign: 'center',
}))

const ArticleSlideshowMain = styled('div', {
  name: 'ArticleSlideshow',
  slot: 'Main',
})({
  paddingLeft: 'var(--cia-container-spacing)',
  paddingRight: 'var(--cia-container-spacing)',
  overflow: 'hidden',
})

const ArticleSlideshowEmblaContainer = styled('div', {
  name: 'ArticleSlideshow',
  slot: 'EmblaContainer',
})(({ theme }) => ({
  display: 'flex',
  marginLeft: theme.spacing(-2),
}))

const ArticleSlideshowSlide = styled('div', {
  name: 'ArticleSlideshow',
  slot: 'EmblaSlide',
})(() => ({}))

const ArticleSlideshowArticleContent = styled('div', {
  name: 'ArticleSlideshow',
  slot: 'EmblaSlide',
})(({ theme }) => ({
  ...theme.mixins.verticalRhythm(1),
  padding: theme.spacing(2, 0),
}))

function ArticleSlideshow(props) {
  const { entries, heading } = props

  const [emblaRef] = useEmblaCarousel({
    align: 'center',
    containScroll: 'trimSnaps',
  })

  const theme = useTheme()

  const hideCaruselOnSmDwn = entries?.length < 3
  const hideCaruselOnSmUp = entries?.length < 4
  const hideCaruselOnMdUp = entries?.length < 5

  const slides = entries
    .sort(() => Math.random() - 0.5)
    ?.map((item, idx) => (
      <ArticleSlideshowSlide
        sx={{
          position: 'relative',
          flexShrink: 0,
          width: 'calc(100% / 2.3)',
          paddingLeft: theme.spacing(2),
          [theme.breakpoints.up('sm')]: {
            width: entries.length > 3 ? 'calc(100% / 3.3)' : 'calc(100% / 3)',
          },
          [theme.breakpoints.up('md')]: {
            width: entries.length > 4 ? 'calc(100% / 4.3)' : 'calc(100% / 4)',
          },
        }}
        key={idx}
      >
        <article>
          {item.mediaProps && (
            <RouterLink href={item.link}>
              <MediaReveal {...ASPECT_RATIOS.square}>
                <Media
                  sx={{
                    '& img': {
                      transition: 'transform 0.3s ease-in-out',
                    },
                    '& img:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                  {...ASPECT_RATIOS.square}
                  {...item.mediaProps}
                />
              </MediaReveal>
            </RouterLink>
          )}

          <ArticleSlideshowArticleContent>
            {item.subheading && <Typography variant="overline">{item.subheading}</Typography>}

            <Typography
              component="h2"
              variant="h5"
              paragraph
              sx={{
                marginBottom: 0,
              }}
            >
              {includeLineBreaks(item.title)}
            </Typography>

            <Typography variant="body2" sx={{ margin: '0 !important' }} paragraph>
              {item.description}
            </Typography>
          </ArticleSlideshowArticleContent>
        </article>
      </ArticleSlideshowSlide>
    ))

  return (
    <ArticleSlideshowRoot>
      {heading && (
        <ArticleSlideshowHeader>
          <Typography
            component="h3"
            variant="h4"
            sx={{
              [theme.breakpoints.down('sm')]: {
                fontSize: '1rem',
                paddingTop: theme.spacing(1),
              },
            }}
          >
            {heading}
          </Typography>
        </ArticleSlideshowHeader>
      )}

      <ArticleSlideshowMain
        sx={{
          display: !hideCaruselOnSmDwn ? 'none' : 'flex',
          justifyContent: 'center',
          flexDirection: 'row',

          [theme.breakpoints.up('sm')]: {
            display: !hideCaruselOnSmUp ? 'none' : 'flex',
          },

          [theme.breakpoints.up('md')]: {
            display: !hideCaruselOnMdUp ? 'none' : 'flex',
          },
        }}
      >
        {slides}
      </ArticleSlideshowMain>

      <ArticleSlideshowMain
        sx={{
          display: hideCaruselOnSmDwn ? 'none' : 'block',

          [theme.breakpoints.up('sm')]: {
            display: hideCaruselOnSmUp ? 'none' : 'block',
          },

          [theme.breakpoints.up('md')]: {
            display: hideCaruselOnMdUp ? 'none' : 'block',
          },
        }}
      >
        <div ref={emblaRef}>
          <ArticleSlideshowEmblaContainer>{slides}</ArticleSlideshowEmblaContainer>
        </div>
      </ArticleSlideshowMain>
    </ArticleSlideshowRoot>
  )
}

const entryType = PropTypes.shape({
  excerpt: PropTypes.string,
  heading: PropTypes.string,
  mediaProps: PropTypes.object,
  subheading: PropTypes.string,
  url: PropTypes.string,
})

ArticleSlideshow.propTypes = {
  entries: PropTypes.arrayOf(entryType),
  heading: PropTypes.string,
}

export default ArticleSlideshow
