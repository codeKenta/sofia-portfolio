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
            const isLandScape = aspectRatio.width * 1 > aspectRatio.height * 1
            const landscapeItemsSmallStyles = isLandScape ? { gridColumn: '1 / -1' } : {}
            return (
              <Box
                key={outerIndex}
                sx={{
                  display: 'grid',
                  gridGap: theme.spacing(2),
                  gridTemplateColumns: '1fr 1fr',
                  [theme.breakpoints.up('sm')]: {
                    gridTemplateColumns: `repeat(${images?.length}, 1fr)`,
                  },
                }}
              >
                {images?.map((image, innerIndex) => (
                  <MediaReveal
                    sx={{
                      [theme.breakpoints.down('sm')]: {
                        ...landscapeItemsSmallStyles,
                      },
                    }}
                    key={innerIndex}
                    {...aspectRatio}
                  >
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
