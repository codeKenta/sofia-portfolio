export default {
  name: 'linkedTagMedia',
  type: 'object',
  fields: [
    {
      title: 'Media',
      name: 'media',
      type: 'media',
    },
    {
      name: 'tag',
      title: 'Hover tag',
      type: 'tag',
      options: {
        includeFromReference: 'caseTag',
      },
    },
    {
      type: 'link',
      name: 'link',
      title: 'Link',
    },
  ],

  preview: {
    select: {
      tag: 'tag',
      media: 'media',
    },
    prepare: ({ tag, media, customHoverText }) => {
      return {
        title: tag?.value || customHoverText,
        media: media?.picture,
      }
    },
  },
}
