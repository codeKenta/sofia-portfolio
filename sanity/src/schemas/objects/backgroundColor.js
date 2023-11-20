export default {
  title: 'Background Color',
  name: 'backgroundColor',
  type: 'object',
  fields: [
    {
      title: 'Background',
      name: 'bg',
      type: 'string',
      options: {
        list: ['white', 'color'],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'white',
    },
  ],
}
