import { Typography, Button, Box } from '@mui/material'
import { styled } from '@mui/system'
import { Media, MediaReveal } from '@noaignite/oui'
import PropTypes from 'prop-types'
import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import ContentContainer from '~/components/ContentContainer'
import { RouterLink } from '~/containers'
import { ASPECT_RATIOS } from '~/utils/constants'
import ArticleSlideshow from '../ArticleSlideshow'

const Root = styled('section', {
  name: 'DynamicContent',
  slot: 'Root',
})(({ theme }) => ({
  ...theme.mixins.verticalRhythm(2),
  padding: 'var(--cia-section-spacing)',
  paddingBottom: theme.spacing(4),
}))

const Heading = styled('h3', {
  name: 'Hero',
  slot: 'Heading',
})(({ theme }) => ({
  ...theme.typography.h4,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
}))

const GridContainer = styled('div', {
  name: 'GridContainer',
  slot: 'GridContainer',
})(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(2),
  gridRowGap: theme.spacing(3),

  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(3),
    gridRowGap: theme.spacing(4),
  },
}))

const Link = styled(RouterLink, {
  name: 'Link',
  slot: 'Link',
})(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.common.black,
}))

const CTAButton = styled(Button, {
  name: 'CTAButton',
  slot: 'Button',
})(({ theme }) => ({
  marginTop: theme.spacing(4),
  width: '100%',
  gridColumn: '1 / -1',

  [theme.breakpoints.up('sm')]: {
    gridColumn: '1 / 2',
  },
}))

function CaseLinks(props) {
  const { title, tags, cases, allCases, numberOfCases, cta, slideshow } = props

  const tagsValues = tags?.map((tag) => tag.value)

  const filteredCases = tags?.length
    ? allCases.filter((c) => {
        const t = c.tags?.map((tag) => tag.value) || []
        const includesTag = tagsValues.some((value) => t.includes(value))
        return includesTag
      })
    : cases

  const casesToShow = numberOfCases > 0 ? filteredCases.slice(0, numberOfCases) : filteredCases
  const showCta = Boolean(cta.url && cta.label)

  const theme = useTheme()

  if (slideshow) {
    return <ArticleSlideshow heading={title} entries={casesToShow} />
  }
  return (
    <Root>
      <ContentContainer>
        {title && <Heading>{title}</Heading>}

        <GridContainer>
          {casesToShow?.map((c) => (
            <Link href={c.link}>
              {c.mediaProps && (
                <MediaReveal
                  sx={{
                    '& picture': {
                      overflow: 'hidden',
                    },
                  }}
                  key={c.mediaProps}
                  {...ASPECT_RATIOS.square}
                >
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
                    {...c.mediaProps}
                    alt={c.title}
                  />
                </MediaReveal>
              )}

              <Typography
                variant="h4"
                sx={{
                  marginTop: theme.spacing(2),
                }}
              >
                {c.title}
              </Typography>
              <Typography variant="body1">{c.description}</Typography>
            </Link>
          ))}
        </GridContainer>
        {showCta && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: theme.spacing(2),
            }}
          >
            <CTAButton component={RouterLink} href={cta.url} color="inherit" variant="outlined">
              {cta.label}
            </CTAButton>
          </Box>
        )}
      </ContentContainer>
    </Root>
  )
}

CaseLinks.propTypes = {
  title: PropTypes.string,
  tags: PropTypes.array,
  cases: PropTypes.array.isRequired,
  allCases: PropTypes.array.isRequired,
  numberOfCases: PropTypes.number,
  cta: PropTypes.object,
  slideshow: PropTypes.bool,
}

CaseLinks.defaultProps = {
  tags: [],
}

export default CaseLinks
