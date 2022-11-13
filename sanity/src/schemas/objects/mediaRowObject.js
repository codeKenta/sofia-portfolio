export default {
  name: 'mediaRowObject',
  type: 'object',
  fields: [
    {
      title: 'Orientation',
      name: 'orientation',
      type: 'string',
      description:
        'Set an orientation that will be used for aspect ratio if there is multiple images',
      options: {
        list: [
          { title: 'Portrait', value: 'portrait' },
          { title: 'Landscape', value: 'landscape' },
          {
            title: 'Auto',
            description: 'Uses the first image in the row as input for aspect ratio',
            value: 'auto',
          },
        ],
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
