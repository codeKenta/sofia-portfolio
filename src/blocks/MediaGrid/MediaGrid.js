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
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(14),
    paddingBottom: theme.spacing(14),
  },
}))

function MediaGrid(props) {
  const { rows, backgroundColor, containerSize, renderIndex } = props

  const theme = useTheme()

  const ratios = React.useMemo(
    () =>
      rows.map(({ images, orientation, customRatio }) => {
        if (orientation === 'custom' && customRatio) {
          return {
            width: customRatio?.width || 1,
            height: customRatio?.height || 1,
          }
        }
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
    <Root
      sx={{
        backgroundColor: backgroundColor === 'color' ? theme.palette.common.pink : 'transparent',
      }}
    >
      <ContentContainer size={containerSize}>
        <Box
          sx={{
            display: 'grid',

            gridGap: theme.spacing(1),
            [theme.breakpoints.up('sm')]: {
              gridGap: theme.spacing(2),
            },
          }}
        >
          {rows?.map(({ images, orientation, minColumns }, outerIndex) => {
            const chosenRatio = ratios[outerIndex]
            const aspectRatio = images?.length === 1 && !orientation ? {} : chosenRatio
            const isLandScape = aspectRatio.width * 1 > aspectRatio.height * 1

            const gridColumnsStyles =
              minColumns > 0
                ? {
                    gridTemplateColumns: `repeat(${minColumns}, 1fr)`,
                    [theme.breakpoints.up('sm')]: {
                      gridTemplateColumns: `repeat(${Math.max(images?.length, minColumns)}, 1fr)`,
                    },
                  }
                : {
                    gridTemplateColumns: '1fr 1fr',
                    [theme.breakpoints.up('sm')]: {
                      gridTemplateColumns: `repeat(${images?.length}, 1fr)`,
                    },
                  }
            return (
              <Box
                key={outerIndex}
                sx={{
                  display: 'grid',
                  gridGap: theme.spacing(1),
                  [theme.breakpoints.up('sm')]: {
                    gridGap: theme.spacing(2),
                  },
                  ...gridColumnsStyles,
                }}
              >
                {images?.map((image, innerIndex) => {
                  const itemsSmallScreenStyles =
                    !minColumns &&
                    (isLandScape || [2, 5, 8, 11].includes(innerIndex) || images.length === 1)
                      ? { gridColumn: '1 / -1' }
                      : {}

                  return (
                    <MediaReveal
                      sx={{
                        [theme.breakpoints.down('sm')]: {
                          ...itemsSmallScreenStyles,
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
                  )
                })}
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
  backgroundColor: PropTypes.string,
  containerSize: PropTypes.string,
  renderIndex: PropTypes.number.isRequired,
}

export default MediaGrid
