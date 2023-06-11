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
            description: 'Uses the first image in the row as input for aspect ratio.',
            value: 'auto',
          },
          {
            title: 'Custom',
            description: 'Add custom ratio for all images in the row.',
            value: 'custom',
          },
        ],
      },
    },
    {
      title: 'Custom Ratio',
      name: 'customRatio',
      type: 'object',
      description: 'Custom aspect ratio, will be applied for all images in the row',
      hidden: ({ parent }) => parent?.orientation !== 'custom',
      fields: [
        {
          title: 'Width',
          name: 'width',
          type: 'number',
        },
        {
          title: 'Height',
          name: 'height',
          type: 'number',
        },
      ],
    },
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [
        {
          type: 'media',
        },
      ],
    },
  ],
}
