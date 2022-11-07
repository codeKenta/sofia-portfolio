
export default {
  name: 'mediaRowObject',
  type: 'object',
  fields: [
    {
      title: 'Orientation',
      name: 'orientation',
      type: 'string',
      description: 'Set an orientation that will be used for aspect ratio if there is multiple images',
      options: {
        list:  [
          { title: 'Portrait', value: 'portrait' },
          { title: 'Landscape', value: 'landscape' }
        ]
      },
    },
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [{ type: 'media' }],
    },
  ],
}
