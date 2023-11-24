import React from 'react'
import { MdImage } from 'react-icons/md'
import commonBlockSettings from '../partials/commonBlockSettings'
import previewTitle from '../../utils/previewTitle'
import { Preview } from 'part:@sanity/base/preview'
import { PatchEvent, set, unset } from 'part:@sanity/form-builder/patch-event'

export default {
  ...commonBlockSettings,
  title: 'Case Links',
  name: 'CaseLinks',
  type: 'object',
  preview: previewTitle('Case Links', 'heading', MdImage),

  fields: [
    {
      name: 'tags',
      title: 'Tags',
      type: 'tags',
      description: 'Use a tag to get cases. This will override the selected cases.',
      options: {
        includeFromReference: 'caseTag',
      },
    },
    {
      name: 'numberOfCases',
      title: 'Number of cases',
      description: 'Number of cases to show',
      type: 'number',
    },
    {
      name: 'cases',
      type: 'array',
      title: 'Selected Cases',

      of: [{ type: 'reference', to: [{ type: 'casePage' }] }],
    },
  ],
}
