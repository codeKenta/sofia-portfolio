import SectionLinkInput from '../../components/SectionLinkInput'

export default {
  name: 'sectionLink',
  title: 'Section link',
  type: 'object',
  fields: [
    // {
    //   name: 'reference',
    //   type: 'reference',
    //   weak: true,
    //   to: [{ type: 'page' }],
    // },
    {
      title: 'Section ID',
      name: 'section',
      type: 'string',
    },
  ],
  inputComponent: SectionLinkInput,
}
