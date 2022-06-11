import Fieldset from '../../components/Fieldset'

export default {
  title: 'Seo',
  name: 'seo',
  type: 'object',
  inputComponent: Fieldset,
  fields: [
    {
      title: 'Title',
      type: 'string',
      name: 'title',
    },
    {
      title: 'Description',
      type: 'text',
      rows: 5,
      name: 'description',
      validation: (Rule) => Rule.max(120),
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}
