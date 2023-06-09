import { MdFilterAlt } from 'react-icons/md'
import commonBlockSettings from '../partials/commonBlockSettings'
import previewTitle from '../../utils/previewTitle'

export default {
  ...commonBlockSettings,
  title: 'Filter',
  name: 'Filter',
  type: 'object',
  preview: previewTitle('Filter', 'heading', MdFilterAlt),
  fields: [
    { title: 'Heading', name: 'heading', type: 'string', group: 'content' },
    {
      name: 'tags',
      description: 'Included tags that will be used to filter blocks',
      title: 'Tags',
      type: 'tags',
      options: {
        includeFromReference: 'caseTag',
      },
      group: 'content',
    },
  ],
}
