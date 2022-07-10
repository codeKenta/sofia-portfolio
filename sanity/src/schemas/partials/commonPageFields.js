import * as blocks from '../blocks'

const blockNames = Object.keys(blocks)

const blockTypes = blockNames.map((blockName) => ({
  type: blockName,
}))

export default [
  {
    title: 'Title',
    type: 'string',
    name: 'title',
    group: 'content',
    validation: (Rule) => Rule.required(),
    group: 'content',
  },
  {
    title: 'Slug',
    type: 'slug',
    name: 'slug',
    options: {
      source: (doc) => {
        switch (doc._type) {
          /* prefix the slug  for different types */
          // case 'casePage':
          //   return `activities/${doc.title}`

          default:
            return doc.title
        }
      },
      slugify: (input) =>
        input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[&\\#,+()$~%.'":*?<>{}]/g, '')
          .slice(0, 200),
    },
    validation: (Rule) => Rule.required(),
    group: 'content',
  },
  {
    name: 'blocks',
    type: 'array',
    of: blockTypes,
    group: 'content',
  },
  {
    name: 'seo',
    type: 'seo',
    group: 'seo',
  },
]
