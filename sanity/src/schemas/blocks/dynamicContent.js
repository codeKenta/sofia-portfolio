import { MdOutlineArticle } from 'react-icons/md'
import commonBlockSettings from '../partials/commonBlockSettings'

import previewTitle from '../../utils/previewTitle'

export default {
  ...commonBlockSettings,
  title: 'Dynamic Content',
  name: 'DynamicContent',
  type: 'object',
  fieldsets: [
    {
      title: 'CTA Button',
      name: 'cta',
      options: { columns: 2 },
    },
  ],
  preview: previewTitle('Dynamic Content', 'heading', MdOutlineArticle),
  fields: [
    { title: 'Heading', name: 'heading', type: 'string', group: 'content' },
    { title: 'Text', name: 'text', type: 'simpleRichText', group: 'content' },
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

    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [{ type: 'media' }],
      group: 'content',
    },
    {
      title: 'Place Content',
      name: 'placeContent',
      type: 'string',
      description: 'Placement of text content',
      group: 'content',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
      },
    },
  ],
}
