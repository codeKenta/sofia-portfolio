import * as React from 'react'
import PropTypes from 'prop-types'
import useEmblaCarousel from 'embla-carousel-react'
import { styled } from '@mui/system'
import { Typography } from '@mui/material'
import { Media, MediaReveal } from '@noaignite/oui'
import { useTheme } from '@mui/material/styles'
import { ASPECT_RATIOS } from '~/utils/constants'
import { RouterLink } from '~/containers'

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

const ArticleSlideshowEmblaSlide = styled('div', {
  name: 'ArticleSlideshow',
  slot: 'EmblaSlide',
})(({ theme }) => ({
  position: 'relative',
  flexShrink: 0,
  width: 'calc(100% / 2.5)',
  paddingLeft: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    width: 'calc(100% / 3.2)',
  },
  [theme.breakpoints.up('md')]: {
    width: 'calc(100% / 4)',
  },
}))

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
    align: 'start',
    containScroll: 'trimSnaps',
  })

  const theme = useTheme()

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

      <ArticleSlideshowMain>
        <div ref={emblaRef}>
          <ArticleSlideshowEmblaContainer>
            {entries?.map((item, idx) => (
              <ArticleSlideshowEmblaSlide key={idx}>
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
                    {item.subheading && (
                      <Typography variant="overline">{item.subheading}</Typography>
                    )}

                    <Typography
                      component="h2"
                      variant="h5"
                      paragraph
                      sx={{
                        marginBottom: 0,
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography variant="body2" sx={{ marginTop: 1 }} paragraph>
                      {item.description}
                    </Typography>
                  </ArticleSlideshowArticleContent>
                </article>
              </ArticleSlideshowEmblaSlide>
            ))}
          </ArticleSlideshowEmblaContainer>
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
