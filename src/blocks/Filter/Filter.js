import * as React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { styled } from '@mui/system'
import { Chip, IconButton, Box } from '@mui/material'
import { Close as CloseIcon } from '~/components/icons'
import ContentContainer from '~/components/ContentContainer'

const FilterRoot = styled('div', {
  name: 'Filter',
  slot: 'Root',
})({
  padding: 'var(--cia-section-spacing)',
})

const Heading = styled('h1', {
  name: 'Hero',
  slot: 'Heading',
})(({ theme }) => ({
  ...theme.typography.h6,
  margin: 0,
  marginBottom: theme.spacing(2),
  fontWeight: 'normal',
}))

function Filter(props) {
  const { heading, tags } = props

  const router = useRouter()

  const routerTags = router?.query?.tags

  const routerTagsValues = React.useMemo(() => {
    if (typeof routerTags !== 'string') {
      return []
    }

    const splittedTags = routerTags?.split(',')

    if (!splittedTags?.length) {
      return []
    }

    return splittedTags.map((tag) => tag?.toLowerCase())
  }, [routerTags])

  const handleTagClick = (e) => {
    const tag = e?.currentTarget?.dataset?.value

    if (!tag) {
      return
    }

    const { query, pathname } = router

    // Check if the clicked tag is already in the existing tags
    const tagIndex = routerTagsValues.indexOf(tag)

    if (tagIndex > -1) {
      // If the tag is already present, remove it from the array
      routerTagsValues.splice(tagIndex, 1)
    } else {
      // If the tag is not present, add it to the array
      routerTagsValues.push(tag)
    }

    // Join the updated tags array with commas
    const updatedTags = routerTagsValues.join(',')

    const newQuery = {
      ...query,
      tags: updatedTags,
    }

    if (!updatedTags) {
      delete newQuery.tags
    }

    router.replace({ pathname, query: newQuery }, undefined, { shallow: true })
  }

  const hasActiveTags = routerTagsValues?.length > 0

  const handleClearFilter = () => {
    if (hasActiveTags) {
      const { query, pathname } = router

      delete query.tags

      router.replace({ pathname, query }, undefined, { shallow: true })
    }
  }

  return (
    <FilterRoot>
      <ContentContainer>
        {heading && (
          <Heading
            sx={{
              fontWeight: '300',
            }}
          >
            {heading}
          </Heading>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {tags?.map((tag) => {
            const isActive = routerTagsValues.includes(tag?.value?.toLowerCase())

            return (
              <Chip
                data-value={tag?.value}
                key={tag?.label}
                variant={isActive ? 'filled' : 'outlined'}
                color={isActive ? 'primary' : 'default'}
                label={tag?.label}
                onClick={handleTagClick}
                sx={{
                  marginRight: 1,
                }}
              />
            )
          })}
          {hasActiveTags && (
            <IconButton
              onClick={handleClearFilter}
              edge="start"
              size="small"
              aria-label={'Clear filter'}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      </ContentContainer>
    </FilterRoot>
  )
}

Filter.propTypes = {
  heading: PropTypes.string,
  tags: PropTypes.array,
}

export default Filter
