export default {
  name: 'linkedTagMedia',
  type: 'object',
  fields: [
    {
      title: 'Page and section link',
      name: 'pageAndSectionLink',
      type: 'pageAndSectionLink',
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'string',
    },
    {
      title: 'Media',
      name: 'media',
      type: 'media',
    },
  ],

  preview: {
    select: {
      media: 'media',
      caption: 'caption',
      heading: 'heading',
    },
    prepare: ({ media, caption, heading }) => {
      return {
        title: heading || caption,
        media: media?.picture,
      }
    },
  },
}
