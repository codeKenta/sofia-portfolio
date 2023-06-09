import { MdTextFields } from 'react-icons/md'
import commonBlockSettings from '../partials/commonBlockSettings'
import previewTitle from '../../utils/previewTitle'

const BlockNames = ['Content', 'DynamicContent', 'Heading', 'Hero', 'MediaGrid']

const blockTypes = BlockNames.map((blockName) => ({
  type: blockName,
}))

export default {
  ...commonBlockSettings,
  title: 'Case',
  name: 'Case',
  type: 'object',
  preview: previewTitle('Case', 'heading', MdTextFields),
  fields: [
    { title: 'Heading', name: 'heading', type: 'string', group: 'content' },
    {
      name: 'tags',
      title: 'Tags',
      type: 'tags',
      options: {
        includeFromReference: 'caseTag',
      },
      group: 'settings',
    },
    {
      name: 'blocks',
      type: 'array',
      of: blockTypes,
      group: 'content',
    },
  ],
}
