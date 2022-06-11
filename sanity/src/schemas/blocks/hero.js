import commonBlockSettings from '../partials/commonBlockSettings'

export default {
  ...commonBlockSettings,
  fieldsets: [
    {
      title: 'CTA Buttons',
      name: 'cta',
      options: { columns: 2 },
    },
  ],
  name: 'Hero',
  title: 'Hero block',
  type: 'object',
  fields: [
    {
      name: 'mediaProps',
      title: 'Media',
      type: 'advancedMedia',
      group: 'content',
    },
    {
      name: 'heading',
      type: 'string',
      rows: 2,
      group: 'content',
    },
    {
      name: 'excerpt',
      type: 'simpleRichText',
      group: 'content',
    },
    {
      name: 'ctaLabelPrimary',
      title: 'label',
      type: 'string',
      group: 'content',
      fieldset: 'cta',
    },
    {
      name: 'ctaUrlPrimary',
      title: 'link',
      type: 'link',
      group: 'content',
      fieldset: 'cta',
    },

    {
      name: 'ctaLabelSecondary',
      title: 'label',
      type: 'string',
      group: 'content',
      fieldset: 'cta',
    },
    {
      name: 'ctaUrlSecondary',
      title: 'link',
      type: 'link',
      group: 'content',
      fieldset: 'cta',
    },
  ],
  options: {
    editModal: 'fullscreen',
  },
  preview: {
    prepare: () => ({ title: 'Hero' }),
  },
}
