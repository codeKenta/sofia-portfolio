import * as React from 'react'
import mock from './mock'
import Content from './Content'

export default {
  title: 'Blocks/Content',
  component: Content,
}

const Template = (args) => <Content {...args} />

export const Default = Template.bind({})
Default.args = mock
