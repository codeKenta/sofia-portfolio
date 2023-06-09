import * as React from 'react'

export default function createRenderBlock(variants) {
  function renderBlock({ name, props = {} }, idx, filterTags) {
    const { children: childrenProp, ...other } = props

    const { tags } = other

    if (filterTags?.length && tags?.length) {
      const blockTagValues = tags.map((tag) => tag?.value.toLowerCase())
      const queryTags = filterTags.split(',').map((tag) => tag.toLowerCase())
      const hasTag = queryTags.some((tag) => blockTagValues.includes(tag))

      if (!hasTag) {
        return null
      }
    }

    const Component = variants[name]
    const children = childrenProp ? childrenProp.map(renderBlock) : undefined

    if (!Component) {
      if (process.NODE_ENV === 'development') {
        console.error(`CIA: 🕵️‍♂️ Block not found: %c${name}`, 'font-weight: bold')
      }
      return null
    }

    return (
      <Component key={idx} renderIndex={idx} {...other}>
        {children}
      </Component>
    )
  }

  return renderBlock
}
