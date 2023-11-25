import { MdImage } from 'react-icons/md'
import commonBlockSettings from '../partials/commonBlockSettings'
import previewTitle from '../../utils/previewTitle'

export default {
  ...commonBlockSettings,
  title: 'Case Links',
  name: 'CaseLinks',
  type: 'object',
  preview: previewTitle('Case Links', 'heading', MdImage),

  fieldsets: [
    {
      title: 'CTA Button',
      name: 'cta',
      options: { columns: 1 },
    },
  ],

  fields: [
    {
      name: 'tags',
      title: 'Tags',
      type: 'tags',
      description: 'Use a tag to get cases. This will override the selected cases.',
      options: {
        includeFromReference: 'caseTag',
      },
    },
    {
      name: 'numberOfCases',
      title: 'Number of cases',
      description: 'Number of cases to show',
      type: 'number',
    },
    {
      name: 'cases',
      type: 'array',
      title: 'Selected Cases',

      of: [{ type: 'reference', to: [{ type: 'casePage' }] }],
    },
    {
      name: 'ctaLabel',
      title: 'label',
      type: 'string',
      group: 'content',
      fieldset: 'cta',
    },
    {
      name: 'ctaLink',
      title: 'link',
      type: 'link',
      group: 'content',
      fieldset: 'cta',
    },
  ],
}
