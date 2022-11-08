import * as React from 'react'
import Contact from './Contact'
import mock from './mock'

export default {
  title: 'Blocks/Contact',
  component: Contact,
}

const Template = (args) => <Contact {...args} />

export const Default = Template.bind({})
Default.args = mock
