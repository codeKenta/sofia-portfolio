import { MdImage } from 'react-icons/md'
import commonBlockSettings from '../partials/commonBlockSettings'
import previewTitle from '../../utils/previewTitle'

export default {
  ...commonBlockSettings,
  title: 'Media Row',
  name: 'MediaRow',
  type: 'object',
  preview: previewTitle('Media Row', 'heading', MdImage),
  fields: [
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [{ type: 'media' }],
      group: 'content',
    },
  ],
}
