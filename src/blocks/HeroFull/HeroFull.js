import * as React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/system'
import { Button } from '@mui/material'
import { Media, MediaReveal } from '@noaignite/oui'
import { includeLineBreaks } from '~/utils'
import { RouterLink, SanityHtml } from '~/containers'
import { linkType, mediaType } from '~/api/utils'

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

const ButtonContainer = styled('div', {
  name: 'Hero',
  slot: 'Button',
})(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridGap: theme.spacing(1),
  marginTop: theme.spacing(4),
}))

function HeroFull(props) {
  const { mediaProps, heading, excerpt, ctaPrimary, ctaSecondary, renderIndex } = props

  const showPrimaryButton = Boolean(ctaPrimary && ctaPrimary.url && ctaPrimary.label)
  const showSecondaryBtn = Boolean(ctaSecondary && ctaSecondary.url && ctaSecondary.label)
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
        <HeroHeading>{includeLineBreaks(heading)}</HeroHeading>

        {excerpt && <SanityHtml textBlocks={excerpt} />}

        {Boolean(showPrimaryButton || showSecondaryBtn) && (
          <ButtonContainer>
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
          </ButtonContainer>
        )}
      </HeroMain>
    </HeroRoot>
  )
}

HeroFull.propTypes = {
  mediaProps: mediaType,
  renderIndex: PropTypes.number.isRequired,
  heading: PropTypes.string,
  excerpt: PropTypes.array,
  ctaPrimary: PropTypes.shape(linkType),
  ctaSecondary: PropTypes.shape(linkType),
}

export default HeroFull

// import * as React from 'react'
// import PropTypes from 'prop-types'
// import { styled } from '@mui/system'
// import { Button } from '@mui/material'
// import { Media, MediaReveal } from '@noaignite/oui'
// import { RouterLink, SanityHtml } from '~/containers'
// import { linkType, mediaType } from '~/api/utils'
// import ContentContainer from '~/components/ContentContainer'
// import { includeLineBreaks } from '~/utils'

// const Root = styled('section', {
//   name: 'Root',
//   slot: 'Root',
// })(({ theme }) => ({
//   paddingLeft: 'var(--cia-section-spacing)',
//   overflow: 'hidden',
//   position: 'relative',

//   minHeight: 450,
//   color: theme.palette.common.black,
//   gridGap: theme.spacing(2),
//   [theme.breakpoints.up('sm')]: {
//     minHeight: 650,
//   },
// }))

// const HeroGridContainer = styled('section', {
//   name: 'HeroGridContainer',
//   slot: 'HeroGridContainer',
// })(({ theme }) => ({
//   display: 'grid',
//   gridTemplateColumns: '1.5fr 1fr',
//   alignItems: 'center',
// }))

// const HeroContent = styled('div', {
//   name: 'Hero',
//   slot: 'Main',
// })(({ theme }) => ({
//   maxWidth: 550,
//   gridColumn: '1 / -1',
//   gridRow: '1',
//   zIndex: 200,
//   position: 'relative',
//   paddingRight: 'var(--cia-section-spacing)',

//   [theme.breakpoints.up('sm')]: {
//     minWidth: 300,
//     gridColumn: 1,
//     gridRow: 1,
//     paddingRight: 0,
//   },
// }))

// const HeroMediaReveal = styled(MediaReveal, {
//   name: 'MediaReveal',
//   slot: 'MediaReveal',
// })(({ theme }) => ({
//   width: '100%',
//   height: '100%',
// }))

// const HeroMedia = styled(Media, {
//   name: 'HeroMedia',
//   slot: 'MediaReveal',
// })(() => ({
//   transform: 'scale(1.5)',
//   height: '100%',
// }))

// const ImageWrapper = styled('div', {
//   name: 'ImageWrapper',
//   slot: 'ImageWrapper',
// })(({ theme }) => ({
//   position: 'absolute',
//   inset: 0,

//   [theme.breakpoints.up('sm')]: {},
// }))

// const HeroHeading = styled('h1', {
//   name: 'Hero',
//   slot: 'Heading',
// })(({ theme }) => ({
//   ...theme.typography.h3,
//   margin: 0,
//   fontSize: `max(${theme.typography.h3.fontSize}, 3.2vw)`,
//   marginBottom: theme.spacing(2),
// }))

// const HeroButton = styled(Button, {
//   name: 'Hero',
//   slot: 'Button',
// })(() => ({}))

// function HeroFull(props) {
//   const { heading, excerpt, mediaProps, ctaPrimary, ctaSecondary, renderIndex } = props

//   const showPrimaryButton = Boolean(ctaPrimary && ctaPrimary.url && ctaPrimary.label)
//   const showSecondaryBtn = Boolean(ctaSecondary && ctaSecondary.url && ctaSecondary.label)

//   console.log('HELLO')
//   return (
//     <Root>
//       {mediaProps && (
//         <ImageWrapper>
//           <HeroMediaReveal>
//             <HeroMedia
//               {...(mediaProps?.component === 'video'
//                 ? {
//                     autoPlay: true,
//                     muted: true,
//                     loop: true,
//                     playsInline: true,
//                   }
//                 : { alt: '' })}
//               {...mediaProps}
//               priority={renderIndex === 0}
//             />
//           </HeroMediaReveal>
//         </ImageWrapper>
//       )}
//       <ContentContainer>
//         <HeroGridContainer>
//           <HeroContent>
//             <HeroHeading>{includeLineBreaks(heading)}</HeroHeading>

//             {excerpt && <SanityHtml textBlocks={excerpt} />}

//             {Boolean(showPrimaryButton || showSecondaryBtn) && (
//               <ButtonContainer>
//                 {showPrimaryButton && (
//                   <HeroButton
//                     component={RouterLink}
//                     href={ctaPrimary.url}
//                     color="inherit"
//                     variant="outlined"
//                   >
//                     {ctaPrimary.label}
//                   </HeroButton>
//                 )}

//                 {showSecondaryBtn && (
//                   <HeroButton
//                     component={RouterLink}
//                     href={ctaSecondary.url}
//                     color="inherit"
//                     variant="outlined"
//                   >
//                     {ctaSecondary.label}
//                   </HeroButton>
//                 )}
//               </ButtonContainer>
//             )}
//           </HeroContent>
//         </HeroGridContainer>
//       </ContentContainer>
//     </Root>
//   )
// }
