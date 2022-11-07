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
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [{ type: 'media' }],
      group: 'content',
    },
     {
      title: 'Orientation',
      name: 'orientation',
      type: 'string',
      description: 'Set an orientation that will be used for aspect ratio if there is multiple images',
      group: 'content',
      options: {
        list:  [
          { title: 'Portrait', value: 'portrait' },
          { title: 'Landscape', value: 'landscape' }
        ]
      },
    },
  ],
}

