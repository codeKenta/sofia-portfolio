const breakpoints = [
  { title: 'Extra small (mobile)', value: 'xs' },
  { title: 'Small', value: 'sm' },
  { title: 'Medium (desktop)', value: 'md' },
  { title: 'Large', value: 'lg' },
  { title: 'Extra large', value: 'xl' },
]

export default {
  title: 'Media',
  name: 'advancedMedia',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    {
      title: 'Component',
      name: 'component',
      type: 'string',
      options: {
        list: ['picture', 'video'],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'picture',
    },
    {
      title: 'Breakpoint',
      name: 'breakpoint',
      type: 'string',
      description: 'Limit the view to a specific breakpoint',
      options: {
        list: breakpoints,
      },
    },
    ...breakpoints.map((b) => ({
      title: b.title,
      name: `${b.value}Picture`,
      type: 'image',
      hidden: ({ parent }) =>
        parent?.component !== 'picture' || (parent.breakpoint && parent.breakpoint !== b.value),
    })),
    ...breakpoints.map((b) => ({
      title: b.title,
      name: `${b.value}Video`,
      type: 'file',
      hidden: ({ parent }) =>
        parent?.component !== 'video' || (parent.breakpoint && parent.breakpoint !== b.value),
    })),
  ],
}
