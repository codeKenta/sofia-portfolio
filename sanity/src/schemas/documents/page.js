export default {
  name: 'siteSettings',
  type: 'document',
  // __experimental_actions: ['update', 'publish'],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
  fields: [
    {
      name: 'frontpage',
      type: 'reference',
      to: [{ type: 'page' }],
    },

    {
      title: 'Primary menu',
      name: 'primaryMenu',
      type: 'object',
      fields: [
        {
          name: 'menuItems',
          type: 'array',
          of: [{ type: 'menuItem' }],
        },
      ],
    },

    {
      title: 'Footer menu',
      name: 'footerMenu',
      type: 'object',
      fields: [
        {
          name: 'menuItems',
          type: 'array',
          of: [{ type: 'menuItem' }],
        },
      ],
    },
  ],
}
