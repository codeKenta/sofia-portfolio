export default {
  name: 'caseTag',
  title: 'Tag',
  type: 'document',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
    },
    {
      name: 'value',
      title: 'Value',
      type: 'string',
      validation: (Rule) => Rule.lowercase(),
    },
  ],
}
