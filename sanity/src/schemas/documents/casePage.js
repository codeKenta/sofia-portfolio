import commonPageFields from '../partials/commonPageFields'
import commonPageSettings from '../partials/commonPageSettings'

export default {
  ...commonPageSettings,
  name: 'casePage',
  title: 'Case Page',
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
