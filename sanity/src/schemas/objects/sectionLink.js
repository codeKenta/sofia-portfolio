import SectionLinkInput from '../../components/SectionLinkInput'

export default {
  name: 'sectionLink',
  title: 'Section link',
  type: 'object',
  fields: [
    {
      title: 'Section ID',
      name: 'section',
      type: 'string',
    },
  ],
  inputComponent: SectionLinkInput,
}
