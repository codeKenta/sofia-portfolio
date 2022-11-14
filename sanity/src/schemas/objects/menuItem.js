export default {
  name: 'menuItem',
  type: 'object',
  fields: [
    {
      name: 'label',
      type: 'string',
    },
    {
      name: 'url',
      type: 'pageAndSectionLink',
    },

    {
      name: 'menuItems',
      description: 'Add nested menu items',
      type: 'array',
      of: [{ type: 'menuItem' }],
    },
  ],
}
