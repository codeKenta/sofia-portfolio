import * as React from 'react'
import Heading from './Heading'
import mock from './mock'

export default {
  title: 'Blocks/Heading',
  component: Heading,
}

const Template = (args) => <Heading {...args} />

export const Default = Template.bind({})
Default.args = mock
