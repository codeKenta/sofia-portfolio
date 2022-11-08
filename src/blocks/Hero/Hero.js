import * as React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/system'
import { Button } from '@mui/material'
import { Media, MediaReveal, } from '@noaignite/oui'
import { RouterLink, SanityHtml } from '~/containers'
import { linkType, mediaType } from '~/api/utils'
import ContentContainer from '~/components/ContentContainer'

const Root = styled('section', {
  name: 'Root',
  slot: 'Root',
})(() => ({
  paddingLeft: 'var(--cia-section-spacing)',
}))


const HeroGridContainer = styled('section', {
  name: 'HeroGridContainer',
  slot: 'HeroGridContainer',
})(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: "1.5fr 1fr",
  alignItems: 'center',
  minHeight: 450,
  color: theme.palette.common.black,
  gridGap: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    minHeight: 650,
  },
}))

const HeroContent = styled('div', {
  name: 'Hero',
  slot: 'Main',
})(({ theme }) => ({
  // ...theme.mixins.verticalRhythm(2),
  // ...theme.mixins.contain('sm'),
  maxWidth: 550,
  gridColumn: "1 / -1",
  gridRow: "1",
  zIndex: 200,
  // top: -30,
  position: 'relative',
  [theme.breakpoints.up('sm')]: {
      minWidth: 300,
      gridColumn: 1,
      gridRow: 1,
      // top: -40,
    },
}))


const HeroMediaReveal = styled(MediaReveal, {
  name: 'MediaReveal',
  slot: 'MediaReveal',
})(({theme}) => ({
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
    height: 450,
    width: 450,
    minHeight: 450,
    minWidth: 450,
    borderRadius: '50% 0 0 50%',
    overflow: 'hidden',
  },
}))

const HeroMedia = styled(Media, {
  name: 'HeroMedia',
  slot: 'MediaReveal',
})(() => ({
  height: "100%",
}))

const Circle = styled('div', {
  name: 'Circle',
  slot: 'Circle',
})(({ theme }) => ({
    width: "500px",
    height: "500px",
    display: "block",
    position: 'absolute',
    left: "20%",
    bottom: "-4%",
    background: theme.palette.primary.main,
    borderRadius: '50%',
    zIndex: '-200',
     [theme.breakpoints.up('sm')]: {
        left: "-20%",
        bottom: "-20%",
    },
}))

const ImageWrapper = styled('div', {
  name: 'ImageWrapper',
  slot: 'ImageWrapper',
})(({ theme }) => ({
    height: 300,
    width: 300,
    minHeight: 300,
    minWidth: 300,
    position: 'relative',
    placeSelf: 'end',
    gridColumn: "1 / -1",
    gridRow: 1,
    top: -70,
  [theme.breakpoints.up('sm')]: {
      height: 450,
      width: 450,
      minHeight: 450,
      minWidth: 450,
      top: -120,
    },
}))

const HeroHeading = styled('h1', {
  name: 'Hero',
  slot: 'Heading',
})(({ theme }) => ({
  ...theme.typography.h3,
  margin: 0,
  fontSize: `max(${theme.typography.h3.fontSize}, 3.2vw)`,
  marginBottom: theme.spacing(2),
}))

const HeroButton = styled(Button, {
  name: 'Hero',
  slot: 'Button',
})(() => ({
}))

const ButtonContainer = styled('div', {
  name: 'Hero',
  slot: 'Button',
})(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: "1fr 1fr",
  gridGap: theme.spacing(1),
  marginTop: theme.spacing(4),
}))




function Hero(props) {
  const { heading, excerpt, mediaProps, ctaPrimary, ctaSecondary, renderIndex } = props;

const showPrimaryButton = Boolean(ctaPrimary && ctaPrimary.url && ctaPrimary.label)
  const showSecondaryBtn = Boolean(ctaSecondary && ctaSecondary.url && ctaSecondary.label)

  return (
    <Root>
      <ContentContainer>
        <HeroGridContainer>
            <HeroContent>
              <HeroHeading>{heading}</HeroHeading>

            {excerpt && <SanityHtml textBlocks={excerpt} />}


            { Boolean(showPrimaryButton || showSecondaryBtn) && <ButtonContainer>
                {showPrimaryButton && (
                  <HeroButton
                  component={RouterLink}
                  href={ctaPrimary.url}
                  color="inherit"
                  variant="outlined"
                  >
                    {ctaPrimary.label}
                  </HeroButton>
                )}


                {showSecondaryBtn && (
                  <HeroButton
                  component={RouterLink}
                  href={ctaSecondary.url}
                  color="inherit"
                  variant="outlined"
                  >
                    {ctaSecondary.label}
                  </HeroButton>
                )}
              </ButtonContainer> }
          </HeroContent>


          {mediaProps && (
            <ImageWrapper>
              <Circle />
            <HeroMediaReveal>
              <HeroMedia
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
              </ImageWrapper>
          )}


        </HeroGridContainer>
    </ContentContainer>
  </Root>
  )
}

Hero.propTypes = {
  mediaProps: mediaType,
  renderIndex: PropTypes.number.isRequired,
  heading: PropTypes.string,
  excerpt: PropTypes.array,
  ctaPrimary: PropTypes.shape(linkType),
  ctaSecondary: PropTypes.shape(linkType),
}

export default Hero
