import { MdImage } from 'react-icons/md'
import commonBlockSettings from '../partials/commonBlockSettings'
import commonBlockFields from '../partials/commonBlockFields'
import previewTitle from '../../utils/previewTitle'

export default {
  ...commonBlockSettings,
  title: 'Media Grid',
  name: 'MediaGrid',
  type: 'object',
  preview: previewTitle('Media Grid', 'heading', MdImage),
  fields: [
    ...commonBlockFields,
    {
      title: 'Rows',
      name: 'rows',
      type: 'array',
      of: [{ type: 'mediaRowObject' }],
      group: 'content',
    },

    {
      title: 'Top Padding',
      name: 'topPadding',
      type: 'string',
      options: {
        list: ['large', 'small', 'none'],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'large',
      group: 'settings',
    },

    {
      title: 'Bottom Padding',
      name: 'bottomPadding',
      type: 'string',
      options: {
        list: ['large', 'small', 'none'],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'large',
      group: 'settings',
    },
  ],
}
