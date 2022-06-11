import * as React from 'react'
import Hero from './Hero'
import mock from './mock'

export default {
  title: 'Blocks/Hero',
  component: Hero,
}

const Template = (args) => <Hero {...args} />

export const Default = Template.bind({})
Default.args = mock
