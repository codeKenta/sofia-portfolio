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
  [theme.breakpoints.up('md')]: {},
}))

const paddings = {
  large: 14,
  small: 7,
  none: 0,
}

function MediaGrid(props) {
  const { rows, backgroundColor, containerSize, renderIndex, bottomPadding, topPadding } = props

  const paddingTopValue = paddings?.[topPadding] ?? 14
  const paddingBottomValue = paddings?.[bottomPadding] ?? 14

  const smScreenTopPStyles = bottomPadding === 'none' ? { paddingTop: 0 } : {}
  const smScreenBottomPStyles = bottomPadding === 'none' ? { paddingBottom: 0 } : {}

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

  const hasOneRow = rows?.length === 1
  const shouldBaseContainerWidthOnViewportHeight = hasOneRow

  return (
    <Root
      sx={{
        backgroundColor: backgroundColor === 'color' ? theme.palette.common.pink : 'transparent',
        ...smScreenTopPStyles,
        ...smScreenBottomPStyles,
        [theme.breakpoints.up('md')]: {
          paddingTop: theme.spacing(paddingTopValue),
          paddingBottom: theme.spacing(paddingBottomValue),
        },
      }}
    >
      <ContentContainer size={containerSize}>
        <Box
          sx={
            shouldBaseContainerWidthOnViewportHeight ? { maxWidth: '100vh', margin: '0 auto' } : {}
          }
        >
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
                        gridGap: theme.spacing(2),
                      },
                    }
                  : {
                      gridTemplateColumns: '1fr 1fr',
                      [theme.breakpoints.up('sm')]: {
                        gridTemplateColumns: `repeat(${images?.length}, 1fr)`,
                        gridGap: theme.spacing(2),
                      },
                    }
              return (
                <Box
                  key={outerIndex}
                  sx={{
                    display: 'grid',
                    gridGap: theme.spacing(1),

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
  topPadding: PropTypes.string,
  bottomPadding: PropTypes.string,
}

export default MediaGrid
