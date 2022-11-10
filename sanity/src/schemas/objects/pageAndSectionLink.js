import LinkInput from '../../components/LinkInput'

export default {
  name: 'pageAndSectionLink',
  title: 'Link',
  type: 'object',
  fields: [
    {
      title: 'Page Link',
      type: 'link',
      name: 'link',
    },
    {
      title: 'Section link',
      name: 'sectionLink',
      type: 'sectionLink',
    },
  ],
}
