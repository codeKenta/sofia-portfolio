import { MdImage } from 'react-icons/md'
import commonBlockSettings from '../partials/commonBlockSettings'
import previewTitle from '../../utils/previewTitle'

export default {
  ...commonBlockSettings,
  title: 'Media Grid',
  name: 'MediaGrid',
  type: 'object',
  preview: previewTitle('Media Grid', 'heading', MdImage),
  fields: [

    {
      title: 'Rows',
      name: 'rows',
      type: 'array',
      of: [
        { type: 'mediaRowObject', }
      ],
      group: 'content',
    },
  ],
}

