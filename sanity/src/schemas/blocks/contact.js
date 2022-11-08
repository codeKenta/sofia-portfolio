import { MdTextFields } from 'react-icons/md'
import commonBlockSettings from '../partials/commonBlockSettings'
import previewTitle from '../../utils/previewTitle'

export default {
  ...commonBlockSettings,
  title: 'Contact',
  name: 'Contact',
  type: 'object',
  preview: previewTitle('Contact', 'heading', MdTextFields),
  fields: [{ title: 'Show image', name: 'showImage', type: 'boolean', group: 'content' }],
}
