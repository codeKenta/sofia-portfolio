import * as React from 'react'
import LinkedMediaGrid from './LinkedMediaGrid'
import mock from './mock'

export default {
  title: 'Blocks/LinkedMediaGrid',
  component: LinkedMediaGrid,
}

const Template = (args) => <LinkedMediaGrid {...args} />

export const Default = Template.bind({})
Default.args = mock
