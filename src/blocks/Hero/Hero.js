import * as React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/system'
import { Button } from '@mui/material'
import { Media, MediaReveal } from '@noaignite/oui'
import { RouterLink, SanityHtml } from '~/containers'
import linkType from '~/utils/linkType'

const HeroRoot = styled('section', {
  name: 'Hero',
  slot: 'Root',
})(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 550,
  color: theme.palette.common.white, // Use `common.white` as color is based on image not theme mode.
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    minHeight: 650,
  },
}))

const HeroMediaReveal = styled(MediaReveal, {
  name: 'Hero',
  slot: 'MediaReveal',
})(({ theme }) => ({
  ...theme.mixins.absolute(0),
  zIndex: -1,
  '& *:not(style)': {
    height: '100%',
  },
}))

const HeroMain = styled('div', {
  name: 'Hero',
  slot: 'Main',
})(({ theme }) => ({
  ...theme.mixins.verticalRhythm(2),
  ...theme.mixins.contain('sm'),
  paddingLeft: 'var(--cia-container-spacing)',
  paddingRight: 'var(--cia-container-spacing)',
}))

const HeroHeading = styled('h1', {
  name: 'Hero',
  slot: 'Heading',
})(({ theme }) => ({
  ...theme.typography.h3,
  margin: 0,
  fontSize: `max(${theme.typography.h3.fontSize}, 3.2vw)`,
}))

const HeroButton = styled(Button, {
  name: 'Hero',
  slot: 'Button',
})(({ theme }) => ({
  // Makes entire Hero block clickable.
  position: 'static',
  '&:before': {
    ...theme.mixins.absolute(0),
    content: '""',
  },
}))

function Hero(props) {
  const { heading, excerpt, mediaProps, ctaPrimary, ctaSecondary, renderIndex } = props

  return (
    <HeroRoot>
      {mediaProps && (
        <HeroMediaReveal>
          <Media
            {...(mediaProps?.component === 'video'
              ? {
                  autoPlay: true,
                  muted: true,
                  loop: true,
                  playsInline: true,
                }
              : { alt: '' })}
            {...mediaProps}
            priority={renderIndex === 0}
          />
        </HeroMediaReveal>
      )}

      <HeroMain>
        <HeroHeading>{heading}</HeroHeading>

        {excerpt && <SanityHtml textBlocks={excerpt} />}

        {ctaPrimary && ctaPrimary.url && ctaPrimary.label && (
          <HeroButton
            component={RouterLink}
            href={ctaPrimary.url}
            color="inherit"
            variant="outlined"
          >
            {ctaPrimary.label}
          </HeroButton>
        )}

        {ctaSecondary && ctaSecondary.url && ctaSecondary.label && (
          <HeroButton
            component={RouterLink}
            href={ctaSecondary.url}
            color="inherit"
            variant="outlined"
          >
            {ctaSecondary.label}
          </HeroButton>
        )}
      </HeroMain>
    </HeroRoot>
  )
}

Hero.propTypes = {
  mediaProps: PropTypes.object.isRequired,
  renderIndex: PropTypes.number.isRequired,
  heading: PropTypes.string,
  excerpt: PropTypes.array,
  ctaPrimary: PropTypes.shape(linkType),
  ctaSecondary: PropTypes.shape(linkType),
}

export default Hero
