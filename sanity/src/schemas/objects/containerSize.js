export default {
  title: 'Container Size',
  name: 'containerSize',
  type: 'object',
  fields: [
    {
      title: 'Size',
      name: 'size',
      type: 'string',
      options: {
        list: ['large', 'medium', 'small'],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'large',
    },
  ],
}
