import commonPageFields from '../partials/commonPageFields'
import commonPageSettings from '../partials/commonPageSettings'

export default {
  ...commonPageSettings,
  name: 'casePage',
  title: 'Case Page',
  preview: {
    select: {
      title: 'title',
      media: 'seo.image',
      tags: 'tags',
    },
    prepare: ({ title, media, tags }) => {
      const labels = tags.map((item) => item.label)
      const labelsString = labels.join(', ')

      return {
        title: `${title} ${labelsString}`,
        media,
      }
    },
  },
  fields: [
    ...commonPageFields,
    {
      name: 'tags',
      title: 'Tags',
      type: 'tags',
      options: {
        includeFromReference: 'caseTag',
      },
      group: 'settings',
    },
    {
      name: 'disable',
      title: 'Disable',
      type: 'boolean',
      group: 'settings',
    },
  ],
}
