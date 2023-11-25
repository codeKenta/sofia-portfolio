import { Typography, Button } from '@mui/material'
import { styled } from '@mui/system'
import { Media, MediaReveal } from '@noaignite/oui'
import PropTypes from 'prop-types'
import * as React from 'react'
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
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(1),
}))

const CTAButton = styled(Button, {
  name: 'CTAButton',
  slot: 'Button',
})(() => ({}))

function CaseLinks(props) {
  const { tags, cases, allCases, numberOfCases, cta } = props

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

  return (
    <Root>
      <ContentContainer>
        <GridContainer>
          {casesToShow?.map((c) => (
            <Link href={c.link}>
              {c.image && (
                <MediaReveal key={c.image} {...ASPECT_RATIOS.square}>
                  <Media {...ASPECT_RATIOS.square} {...c.image} alt={c.title} />
                </MediaReveal>
              )}

              <Typography variant="h4">{c.title}</Typography>
              <Typography variant="body1">{c.description}</Typography>
            </Link>
          ))}
        </GridContainer>
        {showCta && (
          <CTAButton component={RouterLink} href={cta.url} color="inherit" variant="outlined">
            {cta.label}
          </CTAButton>
        )}
      </ContentContainer>
    </Root>
  )
}

CaseLinks.propTypes = {
  tags: PropTypes.array,
  cases: PropTypes.array.isRequired,
  allCases: PropTypes.array.isRequired,
  numberOfCases: PropTypes.number,
  cta: PropTypes.object,
}

CaseLinks.defaultProps = {
  tags: [],
}

export default CaseLinks
