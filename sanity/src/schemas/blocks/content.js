import { MdTextFields } from 'react-icons/md'
import commonBlockSettings from '../partials/commonBlockSettings'
import previewTitle from '../../utils/previewTitle'

export default {
  ...commonBlockSettings,
  title: 'Content',
  name: 'Content',
  type: 'object',
  preview: previewTitle('Content', 'heading', MdTextFields),
  fields: [{ title: 'Text', name: 'text', type: 'richText', group: 'content' }],
}
