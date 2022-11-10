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
    // {
    //   title: 'Link',
    //   type: 'link',
    //   name: 'link',
    // },

    {
      title: 'Page and section link',
      name: 'pageAndSectionLink',
      type: 'pageAndSectionLink',
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
