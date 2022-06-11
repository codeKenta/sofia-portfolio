// Source: outfit-international
export default {
  title: 'Media',
  name: 'media',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    {
      title: 'Component',
      name: 'component',
      type: 'string',
      options: {
        list: ['picture', 'video'],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'picture',
    },
    {
      title: 'Picture',
      name: 'picture',
      type: 'image',
      hidden: ({ parent }) => !parent?.component || parent?.component !== 'picture',
      options: {
        collapsible: false,
      },
    },
    {
      titel: 'Video',
      name: 'video',
      type: 'file',
      options: {
        collapsible: false,
      },
      hidden: ({ parent }) => {
        return !parent?.component || parent?.component !== 'video'
      },
    },
  ],
}
