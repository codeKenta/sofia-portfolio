export default {
  name: 'siteSettings',
  type: 'document',
  // __experimental_actions: ['update', 'publish'],
   fieldsets: [
    {
      title: 'Contact',
      name: 'contact',
      options: { columns: 1 },
    },
     {
      title: 'Menus and links',
      name: 'menus-and-links',
      options: { columns: 1 },
    },
  ],
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
      fieldset: 'menus-and-links',
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
      fieldset: 'menus-and-links',
      fields: [
        {
          name: 'menuItems',
          type: 'array',
          of: [{ type: 'menuItem' }],
        },
      ],
    },

    {
      title: 'Linkedin',
      name: 'linkedInUrl',
      type: 'link',
      fieldset: 'menus-and-links',
    },

    {
      title: 'Name ',
      name: 'name',
      type: 'string',
      fieldset: 'contact',
    },
    {
      title: 'Phone number',
      name: 'phone',
      type: 'string',
      fieldset: 'contact',

    },
    {
      title: 'Email ',
      name: 'email',
      type: 'email',
      fieldset: 'contact',
    },

    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
    },
  ],
}
