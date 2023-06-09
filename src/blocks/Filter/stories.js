import * as React from 'react'
import mock from './mock'
import Content from './Case'

export default {
  title: 'Blocks/Case',
  component: Content,
}

const Template = (args) => <Content {...args} />

export const Default = Template.bind({})
Default.args = mock
