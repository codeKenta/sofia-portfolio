import * as React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/system'
import Box from '@mui/material/Box'
import { Media, MediaReveal } from '@noaignite/oui'
import { useTheme } from '@mui/material/styles'
import ContentContainer from '~/components/ContentContainer'
import { ASPECT_RATIOS } from '~/utils/constants'

const Root = styled('section', {
  name: 'DynamicContent',
  slot: 'Root',
})(({ theme }) => ({
  ...theme.mixins.verticalRhythm(2),
  padding: 'var(--cia-section-spacing)',
}))

function MediaGrid(props) {
  const { rows, renderIndex } = props
  const theme = useTheme()

  const ratios = React.useMemo(
    () =>
      rows.map(({ images, orientation }) => {
        if (orientation && orientation !== 'auto') {
          return ASPECT_RATIOS?.[orientation] ?? ASPECT_RATIOS.portrait
        }

        const [width, height] = images[0]?.src?.split('-').pop().split('.').shift().split('x') ?? [
          3, 4,
        ]

        return {
          width,
          height,
        }
      }),
    [rows],
  )

  return (
    <Root>
      <ContentContainer>
        <Box sx={{ display: 'grid', gridRowGap: theme.spacing(2) }}>
          {rows?.map(({ images, orientation }, outerIndex) => {
            const chosenRatio = ratios[outerIndex]
            const aspectRatio = images?.length === 1 && !orientation ? {} : chosenRatio

            return (
              <Box
                key={outerIndex}
                sx={{
                  display: 'grid',
                  gridGap: theme.spacing(2),
                  gridTemplateColumns: `${images?.map(() => '1fr').join(' ')}`,
                }}
              >
                {images?.map((image, innerIndex) => (
                  <MediaReveal key={innerIndex} {...aspectRatio}>
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
            )
          })}
        </Box>
      </ContentContainer>
    </Root>
  )
}

MediaGrid.propTypes = {
  rows: PropTypes.instanceOf(Object),
  renderIndex: PropTypes.number.isRequired,
}

export default MediaGrid
