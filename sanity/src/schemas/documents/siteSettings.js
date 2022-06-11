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
      name: 'menus',
      type: 'object',
      fields: [
        {
          name: 'primary',
          type: 'reference',
          to: [{ type: 'menu' }],
        },
        {
          name: 'footer',
          type: 'reference',
          to: [{ type: 'menu' }],
        },
      ],
    },
  ],
}
