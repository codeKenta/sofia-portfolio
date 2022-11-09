import { MdImage } from 'react-icons/md'
import commonBlockSettings from '../partials/commonBlockSettings'
import previewTitle from '../../utils/previewTitle'

export default {
  ...commonBlockSettings,
  title: 'Linked Media Grid',
  name: 'LinkedMediaGrid',
  type: 'object',
  preview: previewTitle('Linked Media Grid', 'heading', MdImage),
  fields: [
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [{ type: 'linkedTagMedia' }],
      group: 'content',
    },
  ],
}
