import * as React from 'react'
import DynamicContent from './DynamicContent'
import mock from './mock'

export default {
  title: 'Blocks/DynamicContent',
  component: DynamicContent,
}

const Template = (args) => <DynamicContent {...args} />

export const Default = Template.bind({})
Default.args = mock
