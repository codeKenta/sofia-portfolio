import LinkInput from '../../components/LinkInput'

export default {
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    {
      name: 'reference',
      type: 'reference',
      weak: true,
      to: [{ type: 'page' }],
    },
    {
      name: 'url',
      type: 'string',
    },
  ],
  inputComponent: LinkInput,
}
