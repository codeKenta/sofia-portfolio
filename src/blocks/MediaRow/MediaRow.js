import * as React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/system'
import Box from '@mui/material/Box'
import { Media, MediaReveal } from '@noaignite/oui'
import { useTheme } from '@mui/material/styles'
import { mediaType } from '~/api/utils'
import ContentContainer from '~/components/ContentContainer'
import { ASPECT_RATIOS } from '~/utils/constants'

const Root = styled('section', {
  name: 'DynamicContent',
  slot: 'Root',
})(({ theme }) => ({
  ...theme.mixins.verticalRhythm(2),
  padding: 'var(--cia-section-spacing)',
}))

function MediaRow(props) {
  const { images, renderIndex } = props
  const theme = useTheme()

  const aspectRatio = images?.length === 1 ? {} : ASPECT_RATIOS.portrait

  return (
    <Root>
      <ContentContainer>
        <Box
          sx={{
            display: 'grid',
            gridGap: theme.spacing(2),
            gridTemplateColumns: `${images?.map(() => '1fr').join(' ')}`,
          }}
        >
          {images?.map((image) => (
            <MediaReveal {...aspectRatio}>
              <Media
                {...aspectRatio}
                {...(image?.component === 'video'
                  ? {
                      autoPlay: true,
                      muted: true,
                      loop: true,
                      playsInline: true,
                    }
                  : { alt: '' })}
                {...image}
                priority={renderIndex === 0}
              />
            </MediaReveal>
          ))}
        </Box>
      </ContentContainer>
    </Root>
  )
}

MediaRow.propTypes = {
  images: PropTypes.arrayOf(mediaType),
  renderIndex: PropTypes.number.isRequired,
}

export default MediaRow
